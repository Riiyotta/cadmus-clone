import Img from './Img.jsx'
/**
 * Chronicle — CLONE_SPEC §16 The Cadmus Chronicle (3 latest news items at time of measurement).
 * All props default to the homepage.
 * Props:
 *   title       default 'The Cadmus Chronicle'
 *   subtitle    optional p.f-16 centred, max 650 under the title (Oral)
 *   items       [{ title, href, image, tags?, excerpt?, author?, date? }] (default homepage NEWS)
 *   columns     3 (default) | 2 (2 cols x max-1100, odd last tile centred: .chronicles-center-last)
 *   bg          section bg class (default 'bg-cream'; Oral 'bg-light-orange')
 *   button      { text, href, solid? } (default See more -> /news/, outline). solid -> a.button
 *   zoom        bool, image hover zoom on tiles (default false; homepage tiles have no hover)
 *
 * Named export NewsCard: the tile on its own (listing card "news" variant, pages-content N3/N9).
 *   <NewsCard title href image tags={['AI']} excerpt="…" author="…" date="…" zoom />
 *   Without tags/excerpt/author/date/zoom it renders exactly the homepage tile.
 */
const NEWS = [
  {
    title: 'Why “AI-proofing” assessments misses the point—and what to design for instead',
    href: '/news/why-ai-proofing-assessments-misses-the-point/',
    image: '/assets/1778212941-pexels-cottonbro-63337352.jpg',
  },
  {
    title: 'Why AI demands a redesign of assessment—not just a policy response',
    href: '/news/why-ai-demands-a-redesign-of-assessment/',
    image: '/assets/1778213101-surface-xarmm8ffapo-unsplash-2.jpg',
  },
  {
    title: 'The degree has always been a signal. AI is changing how we verify it.',
    href: '/news/the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it/',
    image: '/assets/1778213038-adobestock_354893802-jpg-2.jpg',
  },
]

export function NewsCard({ title, href, image, tags, excerpt, author, date, zoom = false }) {
  const extended = tags?.length > 0 || excerpt || author || date
  return (
    <a href={href}>
      <div className={extended ? 'flex h-full flex-col items-start' : 'flex flex-col items-start'}>
        <div
          className={`relative mb-[20px] aspect-[4/3] w-full overflow-hidden rounded-img bg-placeholder${zoom ? ' image--zoom' : ''}`}
        >
          <Img
            src={image}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover${zoom ? ' bg-image' : ''}`}
            loading="lazy"
          />
        </div>
        {tags?.length > 0 && (
          <div className="mb-[20px] flex flex-wrap gap-[8px]">
            {tags.map((t) => (
              <p key={t} className="tag">{t}</p>
            ))}
          </div>
        )}
        <h3 className={extended ? 'type-h6 mb-[20px]' : 'type-h6'}>{title}</h3>
        {excerpt && <p className="mb-[20px]">{excerpt}</p>}
        {(author || date) && (
          <div className="mt-auto flex flex-col">
            {author && <p className="py-[6px]">{author}</p>}
            {date && <p className="opacity-50">{date}</p>}
          </div>
        )}
      </div>
    </a>
  )
}

export default function Chronicle({
  title = 'The Cadmus Chronicle',
  subtitle,
  items = NEWS,
  columns = 3,
  bg = 'bg-cream',
  button = { text: 'See more', href: '/news/' },
  zoom = false,
}) {
  const two = columns === 2
  return (
    <div data-module="CadmusChronicles" className={`relative z-2 -mt-[40px] rounded-t-sheet ${bg} p-[40px] m:p-[20px]`}>
      <div className="my-[40px] flex flex-col gap-[10px]">
        <p className="type-h4 text-center">{title}</p>
        {subtitle && <p className="f-16 mx-auto max-w-[650px] text-center">{subtitle}</p>}
      </div>
      <div className={`mx-auto mb-[40px] ${two ? 'max-w-[1100px]' : 'max-w-[1400px]'} pb-[20px]`}>
        <div
          className={
            two
              ? 'chronicles-center-last grid grid-cols-2 gap-[20px] lgm:grid-cols-1'
              : 'grid grid-cols-3 gap-[20px] m:grid-cols-1'
          }
        >
          {items.map((n) => (
            <NewsCard key={n.href} {...n} zoom={zoom || n.zoom} />
          ))}
        </div>
        {button && (
          <div className="mt-[60px] flex justify-center">
            <a className={button.solid ? 'button' : 'arrow-button'} href={button.href}>{button.text}</a>
          </div>
        )}
      </div>
    </div>
  )
}
