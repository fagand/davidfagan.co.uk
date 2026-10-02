// Regenerates the per-page Open Graph cards in images/og/ (1200x630 JPEG).
// og-home.jpg is the original homepage card and is not touched by this script.
//
//   node scripts/build-og-images.mjs
//
// This repo has no package.json, so Playwright is borrowed from the sibling
// workRoot checkout (run `npm install` there once). Headings use Inter from
// Google Fonts when online and fall back to the system sans-serif otherwise.
import { createRequire } from 'node:module'
import { readFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(resolve(root, '..', 'workRoot', 'package.json'))
let chromium
try { ({ chromium } = require('@playwright/test')) } catch { throw new Error('Playwright not found. Run `npm install` in ../workRoot first.') }

const outDir = join(root, 'images', 'og')
const logo = `data:image/png;base64,${readFileSync(join(root, 'favicon', 'android-chrome-512x512.png')).toString('base64')}`

const cards = [
  { file: 'og-services', title: 'Services', sub: 'Photography, work tools, graphic design and web development.' },
  { file: 'og-about', title: 'About', sub: 'Web developer, graphic designer and photographer based in Glasgow, Scotland.' },
  { file: 'og-photos', title: 'Photography', sub: 'Landscape, portrait, travel and event photography from Glasgow.' },
  { file: 'og-designs', title: 'Graphic Design', sub: 'Brand identities, logos, digital art and more.' },
  { file: 'og-videos', title: 'Videos', sub: 'Travel, sport and creative videography projects.' },
  { file: 'og-privacy', title: 'Privacy', sub: 'How davidfagan.co.uk handles personal information.' },
  { file: 'og-cookies', title: 'Cookies', sub: 'Which cookies this site uses, who sets them, and how to avoid them.' },
]

const html = (c) => `<!doctype html><html><head><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Inter:wght@500;800&display=swap" rel="stylesheet"></head>
<body style="margin:0;width:1200px;height:630px;overflow:hidden;position:relative;color:#a99bd0;font-family:Inter,system-ui,-apple-system,'Segoe UI',sans-serif;background:
  radial-gradient(520px 360px at 78% 42%,rgba(60,60,150,.55),transparent 70%),
  radial-gradient(520px 300px at 0% 100%,rgba(130,40,110,.45),transparent 70%),
  linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px) 0 0/60px 60px,
  linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px) 0 0/60px 60px,#06060d">
  <div style="position:absolute;left:58px;top:36px;font:600 15px/1 Inter,system-ui,sans-serif;letter-spacing:.2em;text-transform:uppercase;color:#a99bd0">Glasgow, Scotland</div>
  <img src="${logo}" width="84" height="84" alt="" style="position:absolute;right:58px;top:26px">
  <div style="position:absolute;left:58px;right:58px;top:150px">
    <div style="display:inline-block;font-size:${c.title.length > 12 ? 128 : 160}px;font-weight:800;line-height:1.05;letter-spacing:-.04em;padding-bottom:12px;background:linear-gradient(90deg,#c084fc,#ec4899);-webkit-background-clip:text;background-clip:text;color:transparent">${c.title}.</div>
    <div style="margin-top:34px;max-width:880px;font-size:32px;line-height:1.5;font-weight:500">${c.sub.replace('&', '&amp;')}</div>
  </div>
  <div style="position:absolute;left:58px;bottom:44px;font:600 22px/1 Inter,system-ui,sans-serif;letter-spacing:.06em;color:#7d71a3">davidfagan.co.uk</div>
</body></html>`

mkdirSync(outDir, { recursive: true })
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const card of cards) {
  await page.setContent(html(card), { waitUntil: 'networkidle' }).catch(() => undefined)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(outDir, `${card.file}.jpg`), type: 'jpeg', quality: 88 })
  console.log('wrote', `images/og/${card.file}.jpg`)
}
await browser.close()
