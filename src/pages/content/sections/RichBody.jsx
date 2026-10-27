import Img from '../../../components/Img.jsx'
import { QuoteCard, placeholderText } from '../../../sections/index.js'
import { Note } from './Article.jsx'
import { OriginalLink } from './common.jsx'

/**
 * Per-page placeholder body (data/bodies.js). Mirrors the live rich-text block order; every text block is
 * neutral filler whose word count was measured so it wraps to the live line count at 1440 and 390.
 * Compact block format (block k uses seed k*5; list item j uses k*5+j):
 *   ['p', words, flags?]           flags: 's' strong | 'e' em | 'a' link; words 0 = empty <p> (takes a gap)
 *   ['h2'..'h6', words, flags?]
 *   ['ul' | 'ol', [words, …]]
 *   ['img', src, width, height, hDesktop?, hMobile?]   fixed box heights when the live image isn't fluid
 *   ['q', colour, words, author?, role?]               QuoteCard 'article' (full wrapper width)
 *   ['n', colour, words]                               Note block (DatoCmsNote)
 *   ['nest', words]                                    nested p20 (m:p0) wrapper with a strong paragraph
 *   ['box', hDesktop, hMobile]                         non-text block (table/embed) kept as reserved space
 */
const COLUMN = 'article--content f-16 m:text-[14px] mx-auto flex w-full max-w-[950px] flex-col gap-[20px]'
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

/** Text for a block (exported so the measuring script reproduces it exactly). */
export function blockText(type, words, seed) {
  return type === 'p' ? placeholderText(words, seed) : cap(placeholderText(words, seed, { sentence: false }))
}

function Inline({ type, words, flags = '', seed }) {
  const text = blockText(type, words, seed)
  if (!text) return null
  if (flags.includes('a')) {
    const w = text.split(' ')
    const at = Math.floor(w.length / 3)
    const len = Math.min(4, Math.max(1, w.length - at))
    return (
      <>
        {w.slice(0, at).join(' ')} <a href="#">{w.slice(at, at + len).join(' ')}</a> {w.slice(at + len).join(' ')}
      </>
    )
  }
  if (flags.includes('s')) return <strong>{text}</strong>
  if (flags.includes('e')) return <em>{text}</em>
  return text
}

function Block({ b, seed }) {
  const [t] = b
  if (t === 'ul' || t === 'ol') {
    const Tag = t
    return (
      <Tag>
        {b[1].map((w, j) => (
          <li key={j}>{placeholderText(w, seed + j)}</li>
        ))}
      </Tag>
    )
  }
  if (t === 'img') {
    const [, src, width, height, hd, hm] = b
    if (hd)
      return (
        <div className="rich-box overflow-hidden" style={{ '--hd': `${hd}px`, '--hm': `${hm}px` }}>
          <Img src={src} width={width} height={height} alt="" loading="lazy" className="h-auto" />
        </div>
      )
    return <Img src={src} width={width} height={height} alt="" loading="lazy" className="h-auto w-full" />
  }
  if (t === 'box') return <div className="rich-box" style={{ '--hd': `${b[1]}px`, '--hm': `${b[2]}px` }} />
  if (t === 'nest')
    return (
      <div className="flex flex-col gap-[20px] p-[20px] m:p-0">
        <p>
          <strong>{placeholderText(b[1], seed)}</strong>
        </p>
      </div>
    )
  const Tag = t
  return (
    <Tag>
      <Inline type={t} words={b[1]} flags={b[2]} seed={seed} />
    </Tag>
  )
}

export default function RichBody({ blocks, livePath }) {
  // empty live content field: the wrapper is still rendered (p20 = 40px at desktop), without the link
  if (!blocks.length) return <div className="content-rich mx-auto flex max-w-[1400px] flex-col gap-[20px] p-[20px] m:p-0" />
  const nodes = []
  let run = []
  const flush = (k) => {
    if (run.length) nodes.push(<div key={`c${k}`} className={COLUMN}>{run}</div>)
    run = []
  }
  blocks.forEach((b, k) => {
    const seed = k * 5
    if (b[0] === 'q') {
      flush(k)
      nodes.push(
        <QuoteCard
          key={k}
          variant="article"
          colour={b[1]}
          quote={`"${placeholderText(b[2], seed)}"`}
          author={b[3] || ''}
          // live renders an empty role <p> (0px, +5px gap) when the role is blank; an empty fragment is
          // truthy for QuoteCard's `role &&` check but renders nothing
          role={b[3] && !b[4] ? <></> : b[4] || ''}
        />
      )
    } else if (b[0] === 'n') {
      flush(k)
      nodes.push(<Note key={k} colour={b[1]} words={b[2]} seed={seed} />)
    } else run.push(<Block key={k} b={b} seed={seed} />)
  })
  flush('end')
  return (
    <div className="content-rich mx-auto flex max-w-[1400px] flex-col gap-[20px] p-[20px] m:p-0">
      {nodes}
      {/* pb5 (desktop): the 2 trimmed lines are 44.8px, the link + gap 39.6px */}
      <OriginalLink path={livePath} className="article--content mx-auto w-full max-w-[950px] pb-[5px] m:pb-0" />
    </div>
  )
}
