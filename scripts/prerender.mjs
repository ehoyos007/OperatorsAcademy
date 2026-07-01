import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import { existsSync, readdirSync } from 'node:fs'
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
  '/course/building-blocks',
  '/course/putting-it-together',
  '/course/openclaw',
  '/course/project-system',
]

// Append Explore routes (index + one page per catalog item). Loaded defensively:
// content.js is plain JS (no JSON-import attribute) so it's safe on any Node, and
// any read failure just skips explore prerendering rather than breaking the build.
try {
  const gen = JSON.parse(await readFile(join(__dirname, '..', 'src', 'data', 'items.generated.json'), 'utf-8'))
  const slugs = new Set(gen.map((i) => i.slug))
  try {
    const content = await import('../src/data/content.js')
    for (const e of content.ecosystem || []) if (e?.slug) slugs.add(e.slug)
  } catch { /* ecosystem picks optional */ }
  ROUTES.push('/explore', ...[...slugs].map((s) => `/explore/${s}`))
  console.log(`[prerender] + ${slugs.size + 1} explore routes`)
} catch (err) {
  console.warn('[prerender] skipping explore routes — could not load catalog:', err.message)
}

// Append Guides routes (index + one per guide file).
try {
  const gslugs = readdirSync(join(__dirname, '..', 'src', 'guides', 'content'))
    .filter((f) => f.endsWith('.js'))
    .map((f) => f.replace(/\.js$/, ''))
  ROUTES.push('/guides', ...gslugs.map((s) => `/guides/${s}`))
  console.log(`[prerender] + ${gslugs.length + 1} guide routes`)
} catch (err) {
  console.warn('[prerender] skipping guide routes:', err.message)
}

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

// Prerendering is an SEO enhancement, NOT required for the site to work:
// vercel.json rewrites every route to _spa-shell.html, which client-renders.
// Some CI/build environments (e.g. Vercel) lack the system libraries headless
// Chrome needs (libnspr4.so etc.), so launching can fail. When it does, we skip
// prerendering and exit 0 so the deploy still succeeds with the SPA fallback.
let browser
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
} catch (err) {
  const firstLine = String(err.message).split('\n')[0]
  console.warn(`[prerender] SKIPPED — could not launch headless Chrome: ${firstLine}`)
  console.warn('[prerender] Deploy continues with the client-rendered SPA fallback (_spa-shell.html).')
  server.close()
  process.exit(0)
}

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
// Never fail the build over prerendering — routes that weren't prerendered fall
// back to the client-rendered SPA shell. Warn on partial, but always exit 0.
if (ok < ROUTES.length) {
  console.warn(`[prerender] ${ROUTES.length - ok} route(s) not prerendered — they will use the SPA fallback.`)
}
process.exit(0)
