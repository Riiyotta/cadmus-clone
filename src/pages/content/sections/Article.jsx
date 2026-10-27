import Spacer from '../../../components/Spacer.jsx'
import Img from '../../../components/Img.jsx'
import { PlaceholderProse, placeholderText } from '../../../sections/index.js'
import { NewsItemCard, GuideCard } from './Cards.jsx'
import { OriginalLink, Tags } from './common.jsx'

/** N4 article shell: white r12 p20 card inside a p20 (m:p0) wrapper. `outer` = wrapper classes. */
export function ArticleShell({ outer = 'p-[20px] m:p-0', children }) {
  return (
    <div className={outer}>
      <div className="relative z-2 rounded-card bg-pure-white p-[20px]">{children}</div>
    </div>
  )
}

/** N5 ArticleHero: grey r8 box, min-height 70vh, photo cover, white card bottom-left. */
export function ArticleHero({ overline, title, caption, image }) {
  return (
    <div className="relative flex min-h-[70vh] flex-col overflow-hidden rounded-img bg-placeholder p-[40px] m:p-[20px]">
      {image && (
        <Img
          src={image.image}
          width={image.width}
          height={image.height}
          alt=""
          className="bg-image absolute inset-0 h-full w-full object-cover"
        />
      )}
      <Spacer className="mt-auto" />
      <div className="relative z-2 mx-auto my-[40px] flex w-full max-w-[1400px] flex-col gap-[20px] m:my-0">
        <div className="hero--card mr-auto mt-auto flex max-w-[650px] flex-col items-start gap-[20px] rounded-card bg-pure-white p-[40px] m:p-[20px]">
          <p className="text-sm-heading marker">
            <span>{overline}</span>
          </p>
          <h1 className="type-h4 m-fs-30">{title}</h1>
          {caption && <p className="f-16 mx-auto my-[20px] max-w-[900px] m:mt-0 m:text-[14px]">{caption}</p>}
        </div>
      </div>
    </div>
  )
}

/** Note block (DatoCmsNote): coloured r12 card with the pin icon. */
const PIN =
  'M26.5486 15.4612L21.4074 20.6197C21.8458 21.838 22.0275 23.8783 20.1391 26.3889C20.007 26.5654 19.8384 26.7113 19.6448 26.8167C19.4511 26.9221 19.237 26.9844 19.017 26.9994C18.9805 26.9994 18.9449 26.9994 18.9084 26.9994C18.7062 26.9995 18.506 26.9596 18.3193 26.8823C18.1325 26.8049 17.9628 26.6915 17.8199 26.5485L13.1796 21.9034L9.08066 26.0052C8.93632 26.1495 8.74056 26.2306 8.53644 26.2306C8.33232 26.2306 8.13655 26.1495 7.99222 26.0052C7.84788 25.8609 7.76679 25.6651 7.76679 25.461C7.76679 25.2569 7.84788 25.0611 7.99222 24.9168L12.0941 20.8178L7.44992 16.1737C7.29727 16.0208 7.17851 15.8375 7.10139 15.6358C7.02427 15.434 6.9905 15.2182 7.00229 15.0025C7.01409 14.7868 7.07117 14.576 7.16983 14.3839C7.26849 14.1917 7.40651 14.0225 7.57492 13.8872C10.0191 11.9151 12.3585 12.3026 13.3825 12.6237L18.5363 7.4517C18.6791 7.3088 18.8487 7.19545 19.0354 7.11812C19.2221 7.04078 19.4222 7.00098 19.6242 7.00098C19.8263 7.00098 20.0264 7.04078 20.213 7.11812C20.3997 7.19545 20.5693 7.3088 20.7122 7.4517L26.5477 13.2862C26.8361 13.5746 26.9982 13.9656 26.9984 14.3735C26.9986 14.7813 26.8368 15.1726 26.5486 15.4612Z'
export function Note({ colour = 'blue', words = 30, seed = 0 }) {
  return (
    <div className={`note--wrapper ${colour} f-16 mx-auto my-[20px] flex w-full max-w-[950px] flex-col gap-[20px] rounded-card p-[30px] m:p-[20px]`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" className="pin">
        <rect width="34" height="34" rx="4.44444" />
        <path d={PIN} />
      </svg>
      <p>{placeholderText(words, seed)}</p>
    </div>
  )
}

const COLUMN = 'article--content f-16 m:text-[14px] mx-auto flex w-full max-w-[950px] flex-col gap-[20px]'

/**
 * N7 article content: max-1400 wrapper (gap 20) > reading column(s) max-950 with quote blocks at full
 * wrapper width. `blocks` = PlaceholderProse notation, or `segments` = [{prose}|{note,words}|{image,…}].
 * Ends with the "Read the original on cadmus.io" link (`livePath`).
 */
export function ArticleBody({ blocks, segments, livePath }) {
  const list = segments || [{ prose: blocks }]
  return (
    <div className="mx-auto flex max-w-[1400px] flex-col gap-[20px] p-[20px] m:p-0">
      {list.map((s, i) => {
        if (s.note) return <Note key={i} colour={s.note} words={s.words} seed={i * 11} />
        if (s.image)
          return (
            <div key={i} className={COLUMN}>
              <Img src={s.image} width={s.width} height={s.height} alt="" loading="lazy" className="h-auto" />
            </div>
          )
        return <PlaceholderProse key={i} blocks={s.prose} seed={i * 13} columnClassName={COLUMN} />
      })}
      <OriginalLink path={livePath} />
    </div>
  )
}

/** N8 Categories row. variant 'narrow' (news/guide, max-950 my60) | 'wide' (study, max-1400 p20). */
export function Categories({ items, variant = 'narrow' }) {
  // live renders the row (label only) even when the item has no categories
  if (!Array.isArray(items)) return null
  return (
    <div
      className={
        variant === 'wide'
          ? 'mx-auto mb-[40px] mt-[20px] flex max-w-[1400px] flex-col gap-[10px] p-[20px]'
          : 'mx-auto my-[60px] flex max-w-[950px] flex-col gap-[10px]'
      }
    >
      <p className="text-heading">Category</p>
      <Tags items={items} className="flex gap-[8px]" />
    </div>
  )
}

/**
 * N9 MoreNews / MoreGuides row: header (label + "Load more" link) and 3 cards.
 * kind 'news' -> news cards; 'guide' -> guide cards ("Read more", hrefBase).
 */
export function MoreRow({ label, link, items, kind = 'news', hrefBase = '/guides/' }) {
  return (
    <div className="mb-[40px] p-[20px] m:p-0">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-[40px]">
        <div className="flex items-center justify-between border-b border-dashed border-vellum py-[6px]">
          <p className="text-heading">{label}</p>
          <a className="arrow-button transparent" href={link}>Load more</a>
        </div>
        <div className="grid grid-cols-3 gap-x-[40px] gap-y-[80px] m:grid-cols-1 m:gap-[40px]">
          {items.map((item) =>
            kind === 'news' ? (
              <NewsItemCard key={item.slug} item={item} more />
            ) : (
              <GuideCard key={item.slug} item={item} href={`${hrefBase}${item.slug}`} button="Read more" />
            )
          )}
        </div>
      </div>
    </div>
  )
}

/** N12 Highlights (study): static values with coloured marker labels. */
export function Highlights({ items }) {
  // live renders the header even when the highlights list is empty
  if (!Array.isArray(items)) return null
  return (
    <div className="introduction mx-auto mt-[40px] flex w-full max-w-[1400px] flex-col gap-[20px] p-[20px] m:mb-[40px] m:p-0">
      <div className="w-full border-b border-dashed border-vellum py-[6px]">
        <p className="text-heading opacity-80">Highlights</p>
      </div>
      <div className="mx-auto mt-[20px] grid w-full max-w-[1400px] grid-cols-3 gap-[20px] m:grid-cols-1">
        {items.map(([value, label]) => (
          <div key={label} className="highlight flex flex-col text-center">
            <p className="type-h1 mx-auto">{value}</p>
            <p className="text-heading marker mx-auto">
              <span>{label}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
