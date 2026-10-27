import Img from '../../../components/Img.jsx'
import { placeholderText } from '../../../sections/index.js'
import { NEWS_PADS, NEWS_MORE_PADS, STUDY_PADS } from '../data/pads.js'

/** Real one-line excerpt + placeholder padding so the card wraps to the live line count (data/pads.js). */
function padded(text, pad) {
  return pad && pad[0] ? `${text} ${placeholderText(pad[0], pad[1])}` : text
}

/**
 * N3 listing card variants. "news" mirrors Chronicle's extended NewsCard markup, but always renders the
 * tag row and the author <p> (live keeps both, empty, for items without categories / an author).
 * Images fill a fixed-ratio box (4:3 / 7:4), so the box is reserved before the file loads; intrinsic
 * width/height are passed as well.
 */

function ZoomImage({ item }) {
  return (
    <div className="image--zoom relative aspect-[4/3] w-full overflow-hidden rounded-img bg-placeholder">
      <Img
        src={item.image}
        width={item.width}
        height={item.height}
        alt=""
        loading="lazy"
        className="bg-image absolute inset-0 h-full w-full object-cover"
      />
    </div>
  )
}

export function NewsItemCard({ item, more = false }) {
  return (
    <a href={`/news/${item.slug}`}>
      <div className="flex h-full flex-col items-start">
        <div className="image--zoom relative mb-[20px] aspect-[4/3] w-full overflow-hidden rounded-img bg-placeholder">
          <Img src={item.image} width={item.width} height={item.height} alt="" loading="lazy" className="bg-image absolute inset-0 h-full w-full object-cover" />
        </div>
        {/* live renders the tag row (and its 20px margin) even when an item has no categories */}
        <div className="mb-[20px] flex flex-wrap gap-[8px]">
          {item.categories.map((t) => (
            <p key={t} className="tag">{t}</p>
          ))}
        </div>
        <h3 className="type-h6 mb-[20px]">{item.title}</h3>
        <p className="mb-[20px]">{padded(item.excerpt, (more && NEWS_MORE_PADS[item.slug]) || NEWS_PADS[item.slug])}</p>
        <div className="mt-auto flex flex-col">
          <p className="py-[6px]">{item.author}</p>
          <p className="opacity-50">{item.date}</p>
        </div>
      </div>
    </a>
  )
}

/** study: <button> above 980px (opens the popup), <a href="/study/<slug>"> at <=980. */
export function StudyCard({ item, onOpen }) {
  const inner = (
    <>
      <div className="mb-[20px] w-full">
        <ZoomImage item={item} />
      </div>
      <div className="mb-[20px] flex gap-[8px]">
        {item.categories.map((c) => (
          <p key={c} className="tag">{c}</p>
        ))}
      </div>
      <p className="type-h6">{item.title}</p>
      <p>{padded(item.caption, STUDY_PADS[item.slug])}</p>
      <span className="arrow-button transparent mt-[20px]">Read more</span>
    </>
  )
  // live: a single flex column with gap 10 (the gap also applies below the image box)
  const cls = 'flex flex-col items-start gap-[10px] text-left'
  if (onOpen) {
    return (
      <button type="button" className={cls} onClick={() => onOpen(item.slug)}>
        {inner}
      </button>
    )
  }
  return (
    <a className={cls} href={`/study/${item.slug}`}>
      {inner}
    </a>
  )
}

/** guide: also used for Related case studies / guides (button text "Read more", href override). */
export function GuideCard({ item, href = `/guides/${item.slug}`, button = 'Learn more' }) {
  return (
    <a className="flex flex-col items-start" href={href}>
      <div className="mb-[40px] w-full">
        <ZoomImage item={item} />
      </div>
      <p className="type-h6">{item.title}</p>
      <span className="arrow-button transparent mt-[20px]">{button}</span>
    </a>
  )
}

/** video: 7:4 box, no grey bg, no hover. */
export function VideoCard({ item }) {
  return (
    <a className="flex flex-col items-start" href={`/video/${item.slug}`}>
      <div className="relative mb-[20px] aspect-[7/4] w-full overflow-hidden rounded-img">
        <Img
          src={item.image}
          width={item.width}
          height={item.height}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <h3 className="type-h6">{item.title}</h3>
    </a>
  )
}
