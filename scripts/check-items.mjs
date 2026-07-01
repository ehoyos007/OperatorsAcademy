#!/usr/bin/env node
/**
 * check-items.mjs — validates the merged Explore catalog.
 *
 * Lightweight substitute for a unit suite (this repo has no test runner): it
 * asserts the data pipeline (items.generated.json + content.js → items.js) is
 * internally consistent, so a malformed record fails the build gate instead of
 * silently rendering broken UI. Run: node scripts/check-items.mjs
 */
import { items, getItem } from '../src/data/items.js';

const KINDS = new Set(['skill', 'agent', 'plugin', 'hook']);
const CATS = new Set(['session', 'quality', 'database', 'planning', 'vision', 'build', 'content']);
const errors = [];
const seen = new Set();

for (const it of items) {
  const id = `${it.origin}:${it.slug}`;
  if (!it.slug) errors.push(`missing slug on ${JSON.stringify(it).slice(0, 60)}`);
  if (seen.has(it.slug)) errors.push(`duplicate slug: ${it.slug}`);
  seen.add(it.slug);
  if (!KINDS.has(it.kind)) errors.push(`${id}: bad kind "${it.kind}"`);
  if (!CATS.has(it.categoryKey)) errors.push(`${id}: bad categoryKey "${it.categoryKey}"`);
  if (it.origin === 'oa' && !['free', 'premium'].includes(it.tier)) errors.push(`${id}: oa item needs free|premium tier, got "${it.tier}"`);
  if (!it.operator?.tagline) errors.push(`${id}: empty operator.tagline`);
  if (!it.operator?.setupPrompt) errors.push(`${id}: empty operator.setupPrompt`);
  if (!it.technical?.installCommand) errors.push(`${id}: empty technical.installCommand`);
  // seeAlso must resolve to a real item
  for (const s of it.seeAlso || []) {
    if (!getItem(s)) errors.push(`${id}: seeAlso "${s}" does not resolve`);
    if (s === it.slug) errors.push(`${id}: seeAlso references itself`);
  }
  // ecosystem integrity: independent + sourced
  if (it.origin === 'ecosystem') {
    if (!it.notAffiliated) errors.push(`${id}: ecosystem item must set notAffiliated:true`);
    if (!it.source?.url) errors.push(`${id}: ecosystem item must have source.url`);
  }
}

const oa = items.filter((i) => i.origin === 'oa').length;
const eco = items.filter((i) => i.origin === 'ecosystem').length;
console.log(`[check-items] ${items.length} items (${oa} OA + ${eco} ecosystem), ${seen.size} unique slugs`);

if (errors.length) {
  console.error(`[check-items] FAILED — ${errors.length} problem(s):`);
  for (const e of errors) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log('[check-items] OK — catalog is internally consistent.');
