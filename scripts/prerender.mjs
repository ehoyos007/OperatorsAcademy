import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const PORT = 4173

const ROUTES = [
  '/',
  '/privacy',
  '/course',
  '/course/claude-ai',
  '/course/claude-code',
  '/course/n8n',
  '/course/putting-it-together',
  '/course/marketing',
  '/course/openclaw',
  '/course/project-system',
]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.xml':  'application/xml; charset=utf-8',
}

if (!existsSync(DIST)) {
  console.error('[prerender] dist/ not found. Run `vite build` first.')
  process.exit(1)
}

// Preserve the original (empty) shell so Vercel can use it for true SPA fallback.
const SHELL = join(DIST, '_spa-shell.html')
if (!existsSync(SHELL)) {
  await copyFile(join(DIST, 'index.html'), SHELL)
}

const server = createServer(async (req, res) => {
  try {
    const urlPath = new URL(req.url, `http://localhost:${PORT}`).pathname
    const filePath = join(DIST, decodeURIComponent(urlPath))
    const ext = extname(filePath)
    try {
      const buf = await readFile(filePath)
      res.writeHead(200, { 'content-type': MIME[ext] || 'application/octet-stream' })
      return res.end(buf)
    } catch {
      const fallback = await readFile(SHELL)
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
      return res.end(fallback)
    }
  } catch (err) {
    res.writeHead(500)
    res.end(String(err))
  }
})

await new Promise((resolve) => server.listen(PORT, resolve))
console.log(`[prerender] static server on :${PORT}`)

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

let ok = 0
const start = Date.now()

for (const route of ROUTES) {
  const page = await browser.newPage()
  const url = `http://localhost:${PORT}${route}`
  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })
    // Wait for React to actually render something into #root.
    await page.waitForFunction(
      'document.getElementById("root") && document.getElementById("root").children.length > 0',
      { timeout: 10000 },
    )
    // Mark the document as prerendered so the client can hydrate instead of re-mount.
    await page.evaluate(() => document.documentElement.setAttribute('data-prerendered', 'true'))
    const html = await page.content()
    const outPath = route === '/'
      ? join(DIST, 'index.html')
      : join(DIST, route.replace(/^\//, ''), 'index.html')
    await mkdir(dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf-8')
    console.log(`[prerender] ${route} → ${outPath.replace(DIST + '/', '')} (${(html.length / 1024).toFixed(1)} kB)`)
    ok++
  } catch (err) {
    console.error(`[prerender] FAILED ${route}:`, err.message)
  } finally {
    await page.close()
  }
}

await browser.close()
server.close()
console.log(`[prerender] done. ${ok}/${ROUTES.length} routes in ${((Date.now() - start) / 1000).toFixed(1)}s`)
process.exit(ok === ROUTES.length ? 0 : 1)
