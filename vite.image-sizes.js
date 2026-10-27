// Vite plugin: exposes the intrinsic pixel size of every image (and mp4 video) in public/assets as
// `virtual:image-sizes` ({ '/assets/x.png': [w, h] }). <Img> (src/components/Img.jsx) uses it to emit
// width/height attributes so each image's box is reserved before it loads, the same way the original's
// gatsby-image "constrained" wrapper reserves it (sizer: max-width W + a blank W x H svg).
import fs from 'node:fs'
import path from 'node:path'

const ID = 'virtual:image-sizes'
const RID = '\0' + ID

function pngSize(b) {
  if (b.length > 24 && b.readUInt32BE(0) === 0x89504e47) return [b.readUInt32BE(16), b.readUInt32BE(20)]
}
function gifSize(b) {
  if (b.toString('ascii', 0, 3) === 'GIF') return [b.readUInt16LE(6), b.readUInt16LE(8)]
}
function jpgSize(b) {
  if (b[0] !== 0xff || b[1] !== 0xd8) return
  let i = 2
  while (i + 9 < b.length) {
    if (b[i] !== 0xff) { i++; continue }
    const m = b[i + 1]
    if (m === 0xd8 || m === 0x01 || (m >= 0xd0 && m <= 0xd7) || m === 0xff) { i += m === 0xff ? 1 : 2; continue }
    const len = b.readUInt16BE(i + 2)
    // SOF0..SOF15 except DHT(c4), JPG(c8), DAC(cc)
    if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]
    i += 2 + len
  }
}
function webpSize(b) {
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return
  const c = b.toString('ascii', 12, 16)
  if (c === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]
  if (c === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
  if (c === 'VP8L') {
    const n = b.readUInt32LE(21)
    return [1 + (n & 0x3fff), 1 + ((n >> 14) & 0x3fff)]
  }
}
function avifSize(b) {
  const i = b.indexOf('ispe')
  if (i > 0) return [b.readUInt32BE(i + 8), b.readUInt32BE(i + 12)]
}
// Only SVGs with explicit absolute width/height have an intrinsic size the browser uses as-is;
// viewBox-only SVGs are skipped so their rendering is left untouched.
function svgSize(b) {
  const tag = b.toString('utf8', 0, 4000).match(/<svg\b[^>]*>/i)
  if (!tag) return
  const num = (a) => {
    const m = tag[0].match(new RegExp(`\\s${a}\\s*=\\s*["']\\s*([\\d.]+)\\s*(px)?\\s*["']`, 'i'))
    return m ? parseFloat(m[1]) : null
  }
  const w = num('width'), h = num('height')
  if (w && h) return [w, h]
}
// mp4/mov: first track header (tkhd) with a non-zero size; width/height are 16.16 fixed point.
function mp4Size(b) {
  let i = -1
  while ((i = b.indexOf('tkhd', i + 1)) > 0) {
    const v = b[i + 4]
    const o = i + 4 + (v === 1 ? 88 : 76)
    if (o + 8 > b.length) return
    const w = b.readUInt32BE(o) / 65536, h = b.readUInt32BE(o + 4) / 65536
    if (w > 0 && h > 0) return [Math.round(w), Math.round(h)]
  }
}
const PARSERS = { png: pngSize, gif: gifSize, jpg: jpgSize, jpeg: jpgSize, webp: webpSize, avif: avifSize, svg: svgSize, mp4: mp4Size, mov: mp4Size }

function scan(dir) {
  const out = {}
  let files = []
  try { files = fs.readdirSync(dir) } catch { return out }
  for (const f of files) {
    const parse = PARSERS[path.extname(f).slice(1).toLowerCase()]
    if (!parse) continue
    try {
      const s = parse(fs.readFileSync(path.join(dir, f)))
      if (s && s[0] > 0 && s[1] > 0) out[`/assets/${f}`] = s
    } catch {}
  }
  return out
}

export default function imageSizes() {
  let dir
  return {
    name: 'image-sizes',
    configResolved(c) { dir = path.join(c.publicDir, 'assets') },
    resolveId(id) { if (id === ID) return RID },
    load(id) { if (id === RID) return `export default ${JSON.stringify(scan(dir))}` },
    configureServer(server) {
      // New assets dropped into public/assets get picked up on the next page load.
      server.watcher.add(dir)
      const bust = (f) => {
        if (!f.startsWith(dir)) return
        const m = server.moduleGraph.getModuleById(RID)
        if (m) server.moduleGraph.invalidateModule(m)
      }
      server.watcher.on('add', bust)
      server.watcher.on('change', bust)
      server.watcher.on('unlink', bust)
    },
  }
}
