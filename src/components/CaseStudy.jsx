import ImageCard from './ImageCard.jsx'
import ImageCta from '../sections/ImageCta.jsx'
import QuoteCard from '../sections/QuoteCard.jsx'
import { Counter } from '../motion/index.js'

/**
 * CaseStudy — CLONE_SPEC §14: A. image card + stats, B. quote straddling orange -> cream (QuoteCard),
 * C. CTA (ImageCta variant 'case-study'). All props default to the homepage.
 * Props:
 *   image       part A image (default Manchester screenshot)
 *   title       part A h5 (string or node; overview uses a forced break: <>The University<br />of Manchester</>)
 *   tags        string[] separated by vellum dividers (default student success | hybrid learning)
 *   body        part A paragraph (string or node)
 *   link        { text, href } transparent arrow link (default Read the full Case Study)
 *   statsTitle  f-12 line above the stats
 *   stats       [[value, label], ...] GSAP counters (default 89% / +17.6% / 96.31%)
 *   quote       { quote, author, role } -> QuoteCard (default homepage quote)
 *   cta         ImageCta props { title, buttons, image } (default homepage CTA)
 */
const STATS = [
  ['89%', 'positive student experience'],
  ['+17.6%', 'increase in student experience score'],
  ['96.31%', 'student pass rate'],
]

const BODY = (
  <>
    In an environment that required rapid, high-quality deployment of online assessment, educators were able{'  '}to achieve standout results in student success rates and educator satisfaction.
  </>
)

export default function CaseStudy({
  image = '/assets/1752118990-screenshot-2025-02-13-at-5-07-44-pm-1-1.jpg',
  title = 'The University of Manchester',
  tags = ['student success', 'hybrid learning'],
  body = BODY,
  link = { text: 'Read the full Case Study', href: '/study/case-study-the-university-of-manchester/' },
  statsTitle = 'High student experience and improved outcomes',
  stats = STATS,
  quote = {},
  cta = {},
}) {
  return (
    <section className="relative z-2 -mt-[40px] rounded-t-sheet bg-light-orange">
      {/* A */}
      <div className="p-[40px] m:p-[20px]">
        <ImageCard wrapperClass="max-w-[1200px]" imageClass="bg-placeholder" src={image}>
          <p className="type-h5 [text-wrap:balance]">{title}</p>
          <div className="text-xs-heading flex flex-wrap items-center gap-[10px]">
            {tags.flatMap((t, i) => [
              i > 0 && <span key={`d${i}`} className="divider block h-[12px] w-px bg-vellum" />,
              <span key={t}>{t}</span>,
            ])}
          </div>
          <p className="f-16 mb-[20px]">{body}</p>
          <a className="arrow-button transparent" href={link.href}>
            {link.text}
          </a>
        </ImageCard>

        <div className="flex flex-col gap-[20px] text-center">
          <p className="f-12">{statsTitle}</p>
          <div className="mx-auto mt-[20px] flex w-full max-w-[900px] justify-between gap-[60px] m:flex-wrap m:justify-center">
            {stats.map(([value, label]) => (
              <div key={label} className="flex w-full max-w-[275px] flex-col items-center">
                <Counter value={value} className="type-xl counter" />
                <p className="f-12 w-full max-w-[275px]">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* B */}
      <QuoteCard {...quote} />

      {/* C */}
      <ImageCta {...cta} />
    </section>
  )
}
