import Img from './Img.jsx'
import Spacer from './Spacer.jsx'

/**
 * RoiCard — CLONE_SPEC §9 ROI module (light). Sits above the featured video (z-3, -20px top margin).
 * Defaults = homepage.
 * Props:
 *   bare     bool, render only the .image-card-wrapper block (no <section>, no Spacers, no -mt/z-3);
 *            universities places it inside its case-study section (pages-company §1.1)
 *   image    default '/assets/1771212504-roi-university-library.jpg'
 *   stat     { number, label } (default 7.1x / average return on investment)
 *   title    default 'Proven impact. Independently validated.'
 *   body     node rendered inside div.f-16 flex-col gap-16 (default: homepage two paragraphs)
 *   button   { text, href } dark roi-button (default Read the ROI report)
 *
 * Named export StatCard — the glass stat card on its own (pages-content §4.3):
 *   <StatCard number="7.1" label="average return on investment" tone="blue"
 *             position="absolute right-[-20px] top-[80px] z-3" mobile="m:relative …" />
 *   tone 'orange' (inner #FFE7DB, default) | 'blue' (inner #E0F0FF, ROI page)
 *   position / mobile: positioning classes (defaults = homepage placement)
 */
export function StatCard({
  number = '7.1x',
  label = 'average return on investment',
  tone = 'orange',
  position = 'absolute right-[85px] top-[-50px] z-3',
  mobile = 'lgm:left-[33%] lgm:right-auto lgm:top-0',
}) {
  return (
    <div className={`roi-hero__stat-card ${position} rounded-card border-[0.85px] border-solid border-glass-border bg-glass p-[12px] shadow-card backdrop-blur-[1px] ${mobile}`}>
      <div className={`rounded-card ${tone === 'blue' ? 'bg-roi-pale' : 'bg-light-orange'} px-[12px] pb-[24px] pt-[12px] text-center text-ink`}>
        <p className="roi-hero__stat-number font-serif text-[64px] leading-[72px] tracking-[-0.01em] m:text-[40px] m:leading-[50px]">{number}</p>
        <p className="roi-hero__stat-label mx-auto mt-[8px] max-w-[211px] text-[16px] uppercase leading-[1.3] tracking-[0.05em]">
          {label}
        </p>
      </div>
    </div>
  )
}

const BODY = (
  <>
    <p>
      <strong className="font-bold">
        Cadmus delivers measurable improvements in student retention and outcomes with independently modelled financial returns for universities.
      </strong>
    </p>
    <p>An independent return on investment analysis by Nous Group estimates a 7.1× weighted average ROI for universities using Cadmus.</p>
  </>
)

export default function RoiCard({
  bare = false,
  image = '/assets/1771212504-roi-university-library.jpg',
  stat = { number: '7.1x', label: 'average return on investment' },
  title = 'Proven impact. Independently validated.',
  body = BODY,
  button = { text: 'Read the ROI report', href: '/study/2026-Cadmus-ROI-study/' },
}) {
  const card = (
    <div data-module="RoiHero (light)" className="image-card-wrapper roi-module-light relative mx-auto w-full max-w-[1300px] pb-[120px] lgm:px-0 lgm:pb-[20px] lgm:pt-[120px]">
      <div className="image-card-image ml-[130px] aspect-[2.6/1] w-[calc(100%-130px)] overflow-hidden rounded-img lgm:m-0 lgm:aspect-[5/4] lgm:w-full">
        <Img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>

      <StatCard number={stat.number} label={stat.label} />

      <div className="floating-content-card absolute bottom-0 left-0 z-2 max-w-[650px] rounded-card bg-pure-white p-[88px] shadow-card backdrop-blur-[1px] lgm:static lgm:mx-[10px] lgm:mb-0 lgm:mt-[-60px] lgm:max-w-[calc(100%-40px)] lgm:p-[24px]">
        <div className="flex flex-col items-start gap-[40px]">
          <p className="type-h4 [text-wrap:balance] lgm:!text-[24px] lgm:!leading-[30px] lgm:!tracking-[-0.01em]">
            {title}
          </p>
          <div className="f-16 flex flex-col gap-[16px]">{body}</div>
          <a className="roi-button roi-button--dark" href={button.href}>
            {button.text}
          </a>
        </div>
      </div>
    </div>
  )
  if (bare) return card
  return (
    <section className="roi-module-light-section relative z-3 -mt-[20px] p-[40px] m:p-[20px]">
      <Spacer />
      {card}
      <Spacer />
    </section>
  )
}
