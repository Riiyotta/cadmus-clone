import Spacer from '../../../components/Spacer.jsx'
import { parseProse, placeholderText } from '../../../sections/index.js'
import { OriginalLink } from './common.jsx'

/** N15 SmallHeroBanner (information pages): maroon, orange, centred shrink-wrapped title. */
export function SmallHeroBanner({ title }) {
  return (
    <div className="flex flex-col bg-maroon text-orange">
      <Spacer />
      <div className="mx-auto mt-[40px] flex max-w-[1100px] flex-col gap-[20px] p-[40px] text-center [text-wrap:balance] m:p-[20px]">
        <h1 className="type-h3">{title}</h1>
      </div>
      <Spacer />
    </div>
  )
}

/** Placeholder rich text for the policy (list items get a <strong> lead-in, as recorded in §5.5). */
function PolicyBlocks({ notation, seed }) {
  return parseProse(notation).map((b, i) => {
    const s = seed + i * 5
    if (b.type === 'ul' || b.type === 'ol') {
      return (
        <ul key={i}>
          {b.items.map((w, j) => (
            <li key={j}>
              <strong>{placeholderText(3, s + j, { sentence: false })}:</strong>{' '}
              {placeholderText(Math.max(1, w - 3), s + j + 1)}
            </li>
          ))}
        </ul>
      )
    }
    const text = placeholderText(b.words, s)
    if (b.link) {
      const words = text.split(' ')
      return (
        <p key={i}>
          {words.slice(0, 10).join(' ')} <a href="#">{words.slice(10, 13).join(' ')}</a> {words.slice(13).join(' ')}
        </p>
      )
    }
    return <p key={i}>{b.strong ? <strong>{text}</strong> : text}</p>
  })
}

/** N16 Information body: cream sheet (not positioned), 800px reading column of titled sections. */
export function InformationBody({ sections, livePath }) {
  return (
    <div className="-mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto my-[20px] flex max-w-[800px] flex-col gap-[40px]">
        {sections.map((sec, i) => (
          <div key={sec.title} className="flex flex-col gap-[20px]">
            <p className="f-20">{sec.title}</p>
            <div className="privacy-content f-16 flex flex-col gap-[20px] m:text-[14px]">
              <PolicyBlocks notation={sec.body} seed={i * 17} />
            </div>
          </div>
        ))}
        {/* pb8 (desktop): 3 trimmed lines = 67.2px vs link + gap 59.6px */}
        <OriginalLink path={livePath} className="privacy-content pb-[8px] m:pb-0" />
      </div>
      <Spacer />
    </div>
  )
}
