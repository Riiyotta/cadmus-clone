// Optional re-measure tool for extraction/measured-values.json (sectionHeights + copy metrics).
//
//   PLAYWRIGHT_MODULE=<path to the playwright package> BASE_URL=http://localhost:5190 \
//     node extraction/measure_sections.mjs [--all | --sample] [--viewport 1440x900] > out.json
//
// Needs a running local build of the clone at BASE_URL and a Playwright install whose path is given by
// PLAYWRIGHT_MODULE (never hard-coded here). Waits for `load`, not `networkidle`: the only third-party
// runtime request (Vimeo iframes) keeps the network busy indefinitely.
//
// Each route's <main> is split into section units with structural rules (stacked sheets, the white article
// shell, the rich-text column split at h2/h3/h4 headings, policy sections, wrappers that hold two sections),
// then mapped onto the route's template node list from templates/templates.json. A route whose unit count
// does not match its template is reported under `mismatches` and must be fixed before its heights are used.
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const REPO = join(HERE, '..')
const args = process.argv.slice(2)
const vpArg = args.includes('--viewport') ? args[args.indexOf('--viewport') + 1] : '1440x900'
const [W, H] = vpArg.split('x').map(Number)
const BASE = process.env.BASE_URL || 'http://localhost:5190'
if (!process.env.PLAYWRIGHT_MODULE) {
  console.error('set PLAYWRIGHT_MODULE to the playwright package directory')
  process.exit(2)
}
const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE)
const templates = JSON.parse(readFileSync(join(REPO, 'templates/templates.json'), 'utf8')).templates
const routesDoc = JSON.parse(readFileSync(join(REPO, 'templates/routes.json'), 'utf8'))
// the catch-all fallback has no enumerable route: it is measured through its probe path
const fb = routesDoc.fallback
const routes = routesDoc.routes.map((r) => ({ route: r.path ?? r.route, template: r.template })).concat(fb && fb.probePath ? [{ route: fb.probePath, template: fb.template }] : [])
const only = args.filter((a) => a.startsWith('/'))

let todo = routes
if (only.length) todo = routes.filter((r) => only.includes(r.route))
else if (!args.includes('--all')) {
  const seen = new Set()
  todo = routes.filter((r) => (seen.has(r.template) ? false : seen.add(r.template)))
}

function inPage() {
  const cls = (el) => (typeof el.className === 'string' ? el.className : '')
  const rect = (el) => {
    const rc = el.getBoundingClientRect()
    return { y: Math.round(rc.top + scrollY), h: Math.round(rc.height) }
  }
  const disp = (el) => getComputedStyle(el).display
  const isSpacer = (el) => /^(hidden )?(h-\[\d+px\]|pt-\[20px\])/.test(cls(el)) || (el.children.length === 0 && !el.textContent.trim())
  const wordsOf = (s) => (s || '').trim().split(/\s+/).filter(Boolean).length
  const SERIF = /AT Realm|STIX/
  function metrics(root) {
    const m = { headings: [], labels: [], paragraphs: [], ctas: [], images: new Set(), videos: new Set(), iframes: new Set() }
    const seen = new Set()
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
    while (walker.nextNode()) {
      const t = walker.currentNode
      if (!t.textContent.trim()) continue
      let el = t.parentElement
      const cta = el.closest('a.button, a.arrow-button, button.button, button.arrow-button, a.roi-button, button.roi-button')
      if (cta) el = cta
      else {
        const block = el.closest('p, li, h1, h2, h3, h4, h5, h6, blockquote, span, a, div')
        if (block) el = block
      }
      if (seen.has(el)) continue
      seen.add(el)
      const cs = getComputedStyle(el)
      if (cs.display === 'none' || cs.visibility === 'hidden') continue
      const r = el.getBoundingClientRect()
      if (!r.width || !r.height) continue
      const txt = (el.innerText || '').trim()
      const w = wordsOf(txt)
      if (!w) continue
      const size = parseFloat(cs.fontSize)
      const lh = parseFloat(cs.lineHeight) || size * 1.4
      const rec = { w, c: txt.length, size, lines: Math.max(1, Math.round(r.height / lh)) }
      if (cta) m.ctas.push(rec)
      else if (/^H[1-6]$/.test(el.tagName) || size >= 20) m.headings.push({ ...rec, serif: SERIF.test(cs.fontFamily) })
      else if (cs.textTransform === 'uppercase') m.labels.push(rec)
      else m.paragraphs.push(rec)
    }
    root.querySelectorAll('img').forEach((i) => i.getBoundingClientRect().width && m.images.add(i.getAttribute('src')))
    root.querySelectorAll('video').forEach((v) => m.videos.add(v.getAttribute('src')))
    root.querySelectorAll('iframe').forEach((f) => m.iframes.add((f.getAttribute('src') || '').split('?')[0]))
    // repeated-item heuristic: the largest group of visible sibling elements that share a tag and a class string
    // (card grids, accordions, list items, tab strips); 'active' / reveal state classes are ignored
    const normCls = (k) => cls(k).replace(/\b(active|sal-animate|open|fade--in-up|fade--up)\b/g, '').replace(/\s+/g, ' ').trim()
    let items = 0, liItems = 0, nonLiItems = 0
    root.querySelectorAll('*').forEach((c) => {
      if (['svg', 'path', 'g'].includes(c.tagName.toLowerCase())) return
      const groups = new Map()
      for (const k of c.children) {
        if (['BR', 'path', 'svg'].includes(k.tagName)) continue
        const r = k.getBoundingClientRect()
        if (!r.height || getComputedStyle(k).position === 'absolute') continue
        const key = k.tagName + '|' + normCls(k)
        groups.set(key, (groups.get(key) || 0) + 1)
      }
      for (const [key, n] of groups) {
        if (n < 2) continue
        items = Math.max(items, n)
        if (key.startsWith('LI|')) liItems = Math.max(liItems, n)
        else nonLiItems = Math.max(nonLiItems, n)
      }
    })
    const links = [...root.querySelectorAll('a[href]')].slice(0, 120).map((a) => {
      const h = a.getAttribute('href') || ''
      return { href: h.replace(location.origin, ''), ext: /^https?:/.test(h) && !h.startsWith(location.origin), cta: !!(a.matches('.button, .arrow-button, .roi-button')) }
    })
    const attributions = [...root.querySelectorAll('.quote-author, .roi-quote-author')].map((q) => {
      const t = (q.innerText || '').trim()
      return { w: wordsOf(t), c: t.length, lines: 1 }
    }).filter((x) => x.w)
    const stat = (a, k) => ({ count: a.length, maxWords: a.length ? Math.max(...a.map((x) => x.w)) : 0, maxChars: a.length ? Math.max(...a.map((x) => x.c)) : 0, maxLines: a.length ? Math.max(...a.map((x) => x.lines)) : 0, totalWords: a.reduce((x, y) => x + y.w, 0) })
    const hs = m.headings.slice().sort((a, b) => b.size - a.size)
    return {
      title: hs.length ? { maxWords: hs[0].w, maxChars: hs[0].c, maxLines: hs[0].lines, fontSizePx: hs[0].size } : null,
      secondaryHeadings: stat(hs.slice(1)),
      labels: stat(m.labels),
      paragraphs: stat(m.paragraphs),
      ctas: stat(m.ctas),
      attributions: stat(attributions),
      links,
      listItems: items,
      liItems,
      nonLiItems,
      uniqueImages: m.images.size,
      images: [...m.images].slice(0, 60),
      videoSrcs: [...m.videos],
      iframeHosts: [...m.iframes],
      videos: m.videos.size,
      iframes: m.iframes.size,
    }
  }
  const units = []
  const push = (el, kind, extra = {}) => {
    const cs = getComputedStyle(el)
    units.push({ kind, cls: cls(el).slice(0, 48), ...rect(el), inFlow: !['fixed', 'sticky'].includes(cs.position), metrics: metrics(el), ...extra })
  }
  const walk = (el) => {
    for (const c of el.children) {
      if (disp(c) === 'contents') { walk(c); continue }
      const r = rect(c)
      if (r.h === 0 || isSpacer(c)) continue
      const k = cls(c)
      const shell = k.includes('rounded-card bg-pure-white') ? c : c.querySelector(':scope > .rounded-card.bg-pure-white')
      if (shell) {
        // a shell without an article hero (video detail) is one section; otherwise its children are sections
        if (shell.querySelector(':scope > .min-h-\\[70vh\\]')) walk(shell)
        else push(shell, 'unit')
        continue
      }
      if (k.startsWith('mt-[40px]') && c.children.length === 1) { walk(c); continue }
      // ProductHighlight / feature wrapper: a cream sheet whose element children are two sections
      if (k.includes('relative -mt-[40px] flex flex-col rounded-t-sheet bg-cream') && c.children.length >= 2 && !isSpacer(c.lastElementChild) && c.lastElementChild.querySelector('img') && c.lastElementChild.querySelector('.type-h4')) {
        // product highlight: feature grid above, image/text split (the last child) below
        const split = c.lastElementChild
        const sr = rect(split)
        units.push({ kind: 'unit', y: r.y, h: sr.y - r.y, inFlow: true, metrics: metrics(c.firstElementChild) })
        units.push({ kind: 'unit', y: sr.y, h: r.y + r.h - sr.y, inFlow: true, metrics: metrics(split) })
        continue
      }
      // listing sheet that holds the category filter above the card grid
      if (c.querySelector(':scope > .m-accordion')) {
        const kids = [...c.children].filter((x) => rect(x).h > 0)
        const gi = kids.findIndex((x) => x.querySelector('.grid'))
        const top = kids.slice(0, gi), rest = kids.slice(gi)
        const y0 = rect(top[0]).y, y1 = rect(rest[0]).y
        units.push({ kind: 'unit', part: 'filter', y: y0, h: y1 - y0, inFlow: true, metrics: metrics(top[top.length - 1]) })
        units.push({ kind: 'unit', part: 'grid', y: y1, h: r.y + r.h - y1, inFlow: true, metrics: metrics(rest[0]) })
        continue
      }
      // share bar + download accordion are one semantic section
      if (k.startsWith('accordion ') && units.length && units[units.length - 1].cls.startsWith('introduction')) {
        const u = units[units.length - 1]
        u.h = r.y + r.h - u.y
        continue
      }
      if (k.includes('content-rich')) {
        const blocks = []
        for (const b of c.children) {
          if (cls(b).includes('article--content') && !b.textContent.includes('Read the original')) blocks.push(...b.children)
          else blocks.push(b)
        }
        let cur = null
        for (const b of blocks) {
          const head = /^H[2-4]$/.test(b.tagName)
          const rr = rect(b)
          if (rr.h === 0 && !head) continue
          if (b.textContent.includes('Read the original')) { push(b, 'original-link'); cur = null; continue }
          if (!cur || head) {
            cur = { kind: 'chapter', y: rr.y, end: rr.y + rr.h, inFlow: true, blocks: [b] }
            units.push(cur)
          } else { cur.end = Math.max(cur.end, rr.y + rr.h); cur.blocks.push(b) }
        }
        for (const u of units) if (u.blocks) {
          u.h = u.end - u.y
          const wrap = document.createElement('div')
          const words = u.blocks.map((b) => (b.innerText || '').trim().split(/\s+/).filter(Boolean).length)
          const chars = u.blocks.map((b) => (b.innerText || '').trim().length)
          const imgs = u.blocks.reduce((n, b) => n + (b.tagName === 'IMG' ? 1 : b.querySelectorAll('img').length), 0)
          u.metrics = { blocks: u.blocks.length, maxWordsPerBlock: Math.max(0, ...words), maxCharsPerBlock: Math.max(0, ...chars), totalWords: words.reduce((a, b) => a + b, 0),
            headingWords: /^H[2-4]$/.test(u.blocks[0].tagName) ? words[0] : 0, headingChars: /^H[2-4]$/.test(u.blocks[0].tagName) ? chars[0] : 0, images: imgs,
            imageSrcs: u.blocks.flatMap((b) => (b.tagName === 'IMG' ? [b] : [...b.querySelectorAll('img')])).map((i) => i.getAttribute('src')).slice(0, 8) }
          delete u.blocks; delete u.end
          void wrap
        }
        continue
      }
      const policy = c.querySelector(':scope > .max-w-\\[800px\\]')
      if (policy) {
        for (const p of policy.children) {
          if (!rect(p).h) continue
          push(p, p.textContent.includes('Read the original') ? 'original-link' : 'policy')
        }
        continue
      }
      push(c, 'unit')
    }
  }
  walk(document.querySelector('main'))
  const hdr = document.querySelector('header'), ftr = document.querySelector('footer')
  return { docH: document.documentElement.scrollHeight, units, shell: { header: hdr ? { ...rect(hdr), metrics: metrics(hdr) } : null, footer: ftr ? { ...rect(ftr), metrics: metrics(ftr) } : null } }
}

const b = await chromium.launch()
const page = await b.newPage({ viewport: { width: W, height: H } })
const out = { viewport: `${W}x${H}`, baseUrl: BASE, measured: {}, mismatches: [] }
for (const { route, template } of todo) {
  try {
    await page.goto(BASE + route, { waitUntil: 'load', timeout: 90000 })
  } catch (e) {
    out.slowLoads = (out.slowLoads || []).concat(route) // DOM is measured anyway after the settle wait
  }
  await page.waitForTimeout(1500)
  const r = await page.evaluate(inPage)
  const expected = templates[template].nodes.filter((n) => !n.section.startsWith('shell.'))
  const units = r.units
  const mapped = []
  let ui = 0
  for (const n of expected) {
    if (n.section === 'article.body-chapter') {
      while (ui < units.length && units[ui].kind === 'chapter') mapped.push({ section: n.section, ...units[ui++] })
    } else if (n.section === 'article.policy-section') {
      while (ui < units.length && units[ui].kind === 'policy') mapped.push({ section: n.section, ...units[ui++] })
    } else if (n.section === 'article.original-link') {
      // reference-only node; absent when the article body is empty (no 'Read the original' link is rendered)
      if (units[ui] && units[ui].kind === 'original-link') mapped.push({ section: n.section, ...units[ui++] })
    } else {
      const count = n.repeatable ? (n.minCount ?? n.min) : 1
      for (let i = 0; i < count; i++) {
        if (ui >= units.length) { if (n.required) out.mismatches.push({ route, missing: n.section }); continue }
        mapped.push({ section: n.section, ...units[ui++] })
      }
    }
  }
  if (ui !== units.length) out.mismatches.push({ route, extraUnits: units.slice(ui).map((u) => `${u.kind}:${u.cls}`) })
  out.measured[route] = { template, docHeightPx: r.docH, shell: r.shell, sections: mapped.map(({ cls, ...m }) => m) }
}
await b.close()
console.log(JSON.stringify(out, null, 1))
