import Img from './Img.jsx'
/**
 * SolutionCards (data-module "Cards") — CLONE_SPEC §12 "Improving assessment outcomes". Defaults = homepage.
 * Props:
 *   title     h4 (default 'Improving assessment outcomes for everyone')
 *   subtitle  f-18 line under the title (default homepage copy; null to omit — pricing)
 *   cards     [{ image, title, body?, href? }]  card without href -> no "Learn more" row (pricing)
 *   sheet     bool, cream sheet (-mt-40, r32 top) instead of the flat homepage section (pricing: true)
 *   variant   'default' | 'support' (pages-company §2.11 students SupportCards: h5 + f-16 subtitle,
 *             bg-card p20 cards, 1:1 image, no body, vellum divider, right-aligned "Learn more")
 *   linkText  default 'Learn more'
 */
export const CARDS = [
  {
    image: '/assets/1754018909-image-container.jpg',
    title: 'For universities',
    body: 'Deliver hybrid assessments at scale. Support students, ensure learning and integrity, reduce workloads and unlock actionable insights with rich analytics.',
    href: '/solutions/universities/',
  },
  {
    image: '/assets/1754565200-getty-images-2ccgdt28kk0-unsplash.jpg',
    title: 'For educators',
    body: 'Take the work out of assessment setup, management and marking—leaving more time for proactive student support and enhanced outcomes for everyone.',
    href: '/solutions/educators/',
  },
  {
    image: '/assets/1754544269-vector_layer.png',
    title: 'For students',
    body: 'Clearly understand assessment requirements, draft with academic guidance, get support when you need it most and submit with confidence.',
    href: '/solutions/students/',
  },
]

function SupportCards({ title, subtitle, cards, linkText }) {
  return (
    <section className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto mt-[40px] max-w-[1200px]">
        <div className="mb-[40px] flex flex-col gap-[20px] text-center m:mb-[20px]">
          <p className="type-h5">{title}</p>
          {subtitle && <p className="f-16 m:text-[14px]">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-3 gap-[20px] m:grid-cols-1">
          {cards.map((c) => (
            <div key={c.title} className="flex flex-col gap-[20px] rounded-img bg-offwhite p-[20px] shadow-card">
              <div className="relative aspect-square overflow-hidden rounded-img">
                <Img src={c.image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
              </div>
              <p className="type-h6">{c.title}</p>
              <div className="flex border-t border-solid border-vellum pt-[10px]">
                <a className="arrow-button transparent ml-auto" href={c.href}>{linkText}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function SolutionCards({
  title = 'Improving assessment outcomes for everyone',
  subtitle = 'Assessment solutions for every part of your institution.',
  cards = CARDS,
  sheet = false,
  variant = 'default',
  linkText = 'Learn more',
}) {
  if (variant === 'support') return <SupportCards {...{ title, subtitle, cards, linkText }} />
  return (
    <div
      data-module="Cards"
      className={sheet ? '-mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]' : 'bg-cream p-[40px] m:p-[20px]'}
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[20px]">
        <div className="mx-auto mb-[20px] mt-[40px] flex max-w-[900px] flex-col gap-[20px] text-center">
          <p className="type-h4 whitespace-break-spaces">{title}</p>
          {subtitle && <div className="f-18 whitespace-break-spaces">{subtitle}</div>}
        </div>
        <div className="mb-[40px] grid grid-cols-3 gap-[20px] pb-[40px] m:grid-cols-1">
          {cards.map((c) => (
            <div key={c.title} className="flex flex-col gap-[20px] overflow-hidden rounded-img bg-pure-white p-[15px]">
              <div className="aspect-[2/1] overflow-hidden rounded-img">
                <Img src={c.image} alt="" className="w-full" loading="lazy" />
              </div>
              <p className="type-h6">{c.title}</p>
              <div>{c.body}</div>
              {c.href && (
                <div className="mb-[20px] mt-auto flex">
                  <a className="arrow-button transparent mt-[20px]" href={c.href}>{linkText}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
