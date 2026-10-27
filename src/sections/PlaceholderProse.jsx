import QuoteCard from './QuoteCard.jsx'

/**
 * PlaceholderProse — neutral lorem-ipsum filler that occupies the same space as the live long-form copy
 * (articles, case-study bodies, policies, testimonials) without reproducing it. Deterministic: the same
 * blocks always render the same words, so layouts and screenshots are stable.
 *
 *   <div className="article--content mx-auto flex max-w-[950px] flex-col gap-[20px]">
 *     <PlaceholderProse blocks="p(43) p(9) h2(6) p(17) · QUOTE[orange, 22w] · ul(3: 23/21/23)" />
 *   </div>
 *   <PlaceholderProse blocks={[{ type: 'p', words: 62 }, { type: 'h2', words: 6 }]} />
 *
 * Props:
 *   blocks   array of { type, words, strong?, em?, link?, items?, colour?, author?, role?, seed? } or the
 *            spec notation string. Types: 'p' | 'h2' | 'h3' | 'h4' | 'ul' | 'ol' (items: number[] of
 *            words per li) | 'quote' (rendered as <QuoteCard variant="article">, colour/author/role).
 *            words 0 (or 'p(empty)') renders an empty <p>, which still takes a flex gap like the original.
 *   seed     offset so two sections on one page don't start with identical words (default 0)
 *   className        optional: wrap everything in a <div className={className}>
 *   columnClassName  optional: wrap each run of text blocks in <div className={columnClassName}> and
 *                    render QUOTE blocks between the runs at full width, as the article template does:
 *     <div className="mx-auto flex max-w-[1400px] flex-col gap-[20px] p-[20px] m:p-0">
 *       <PlaceholderProse blocks="…" columnClassName="article--content f-16 m:text-[14px] mx-auto flex w-full max-w-[950px] flex-col gap-[20px]" />
 *     </div>
 * Notation (as used in specs/pages-content.md §5): p(N) h2(N) h3(N strong) p(N em) p(N a) p(empty)
 * ul(k: a/b/c) ol(k: …)  QUOTE[colour, Nw] QUOTE[colour, Nw, author "Name", role "Role"]; '·' separators
 * are ignored.
 *
 * Named exports:
 *   placeholderText(words, seed = 0)  -> string of ~N words (sentence-cased, full stops) for props
 *                                        such as TwoColumnRows paragraphs or testimonial quotes.
 *   parseProse(notation)              -> blocks array
 */
const WORDS = (
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo ' +
  'consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint ' +
  'occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum curabitur pretium ' +
  'tincidunt lacus nulla gravida orci a odio nullam varius turpis et commodo pharetra eros bibendum elit nec ' +
  'luctus magna felis sollicitudin mauris integer'
).split(' ')

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)

export function placeholderText(words, seed = 0, { sentence = true } = {}) {
  const n = Math.max(0, Math.round(words))
  if (!n) return ''
  const out = []
  let start = true
  let sinceStop = 0
  for (let i = 0; i < n; i++) {
    let w = WORDS[(seed * 7 + i * 3 + Math.floor(i / WORDS.length)) % WORDS.length]
    if (start) w = cap(w)
    start = false
    sinceStop++
    const last = i === n - 1
    // sentences of 9-16 words
    if (sentence && !last && sinceStop >= 9 + ((seed + i) % 8)) {
      w += '.'
      start = true
      sinceStop = 0
    } else if (sentence && !last && sinceStop === 6 && (seed + i) % 3 === 0) {
      w += ','
    }
    out.push(w)
  }
  return out.join(' ') + (sentence ? '.' : '')
}

export function parseProse(notation) {
  const blocks = []
  const re = /QUOTE\[([^\]]*)\]|(p|h2|h3|h4|ul|ol)\(([^)]*)\)/g
  let m
  while ((m = re.exec(notation))) {
    if (m[1] != null) {
      const parts = m[1]
      const colour = (parts.match(/^\s*(\w+)/) || [])[1] || 'orange'
      const words = +((parts.match(/(\d+)\s*w/) || [])[1] || 20)
      const author = (parts.match(/author\s+"([^"]*)"/) || [])[1]
      const role = (parts.match(/role\s+"([^"]*)"/) || [])[1]
      blocks.push({ type: 'quote', colour, words, author, role })
      continue
    }
    const type = m[2]
    const arg = m[3].trim()
    if (type === 'ul' || type === 'ol') {
      const list = (arg.split(':')[1] || '').split('/').map((x) => +x.trim()).filter(Boolean)
      const k = +arg.split(':')[0]
      blocks.push({ type, items: list.length ? list : Array(k || 3).fill(12) })
      continue
    }
    blocks.push({
      type,
      words: arg === 'empty' ? 0 : +(arg.match(/\d+/) || [0])[0],
      strong: /\bstrong\b/.test(arg),
      em: /\bem\b/.test(arg),
      link: /\ba\b/.test(arg),
    })
  }
  return blocks
}

function Inline({ block, seed }) {
  const text = placeholderText(block.words, seed, { sentence: block.type === 'p' })
  const shown = block.type === 'p' ? text : cap(text)
  if (!shown) return null
  if (block.link) {
    // a sentence-sized underlined link in the middle of the paragraph (styled by .article--content a)
    const words = shown.split(' ')
    const at = Math.floor(words.length / 3)
    const len = Math.min(4, Math.max(1, words.length - at))
    return (
      <>
        {words.slice(0, at).join(' ')} <a href="#">{words.slice(at, at + len).join(' ')}</a>{' '}
        {words.slice(at + len).join(' ')}
      </>
    )
  }
  if (block.strong) return <strong>{shown}</strong>
  if (block.em) return <em>{shown}</em>
  return shown
}

export default function PlaceholderProse({ blocks = [], seed = 0, className, columnClassName }) {
  const list = typeof blocks === 'string' ? parseProse(blocks) : blocks
  const render = (b, i) => {
    const s = (b.seed ?? seed) + i * 5
    switch (b.type) {
      case 'h2':
      case 'h3':
      case 'h4': {
        const Tag = b.type
        return <Tag key={i}><Inline block={b} seed={s} /></Tag>
      }
      case 'ul':
      case 'ol': {
        const Tag = b.type
        return (
          <Tag key={i}>
            {b.items.map((w, j) => (
              <li key={j}>{placeholderText(w, s + j)}</li>
            ))}
          </Tag>
        )
      }
      case 'quote':
        return (
          <QuoteCard
            key={i}
            variant="article"
            colour={b.colour}
            quote={`"${placeholderText(b.words, s)}"`}
            author={b.author || ''}
            role={b.role || ''}
          />
        )
      default:
        return <p key={i}><Inline block={b} seed={s} /></p>
    }
  }
  let nodes
  if (columnClassName) {
    nodes = []
    let run = []
    const flush = (k) => {
      if (run.length) nodes.push(<div key={`c${k}`} className={columnClassName}>{run}</div>)
      run = []
    }
    list.forEach((b, i) => {
      if (b.type === 'quote') {
        flush(i)
        nodes.push(render(b, i))
      } else run.push(render(b, i))
    })
    flush('end')
  } else nodes = list.map(render)
  return className ? <div className={className}>{nodes}</div> : <>{nodes}</>
}
