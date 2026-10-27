import Img from '../components/Img.jsx'
import Spacer from '../components/Spacer.jsx'

/**
 * ImageCta — text + buttons left, illustration right (CaseStudy part C, extracted).
 * Variants:
 *   'case-study' (default) homepage CaseStudy part C: cream strip, max-1200 grid, Spacer(100/60) after.
 *   'section'    CtaWithImage (pages-content §4.1, /news /case-studies /teacher-guides): own sheet
 *                (bg-orange, -mt-40, r32, z2, p40/20), Spacer(100) before and after, max-1400 grid.
 *   'split'      ProductHighlight split (pages-product §3): no wrapper (render it inside the
 *                ProductHighlight sheet), max-1400 grid pb40, title + f-16 body + buttons (mt20, gap 20/10).
 * Props:
 *   variant   see above
 *   title     h4 (default 'Great outcomes start with high-quality assessments')
 *   body      'split' only: paragraph (string or node) under the title
 *   buttons   [{ text, href, style: 'solid'|'outline', newTab? }]
 *             default Book a demo (/request-demo, solid) + Get a free trial (/contact, outline), both newTab
 *   image     default '/assets/1751189417-frame-1430105575.png'
 *   bg        'section' variant bg class (default 'bg-orange')
 *   empty     'split' only: render the Oral page's empty 100px highlight block instead
 */
const BUTTONS = [
  { text: 'Book a demo', href: '/request-demo', style: 'solid', newTab: true },
  { text: 'Get a free trial', href: '/contact', style: 'outline', newTab: true },
]

function Buttons({ buttons, className }) {
  return (
    <div className={className}>
      {buttons.map((b) => (
        <a
          key={b.text}
          href={b.href}
          {...(b.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={b.style === 'outline' ? 'arrow-button' : 'button'}
        >
          {b.text}
        </a>
      ))}
    </div>
  )
}

export default function ImageCta({
  variant = 'case-study',
  title = 'Great outcomes start with high-quality assessments',
  body,
  buttons = BUTTONS,
  image = '/assets/1751189417-frame-1430105575.png',
  bg = 'bg-orange',
  empty = false,
}) {
  if (variant === 'split') {
    if (empty) return <div className="h-[100px]" />
    return (
      <div>
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 items-center gap-[20px] pb-[40px] lgm:grid-cols-1">
          <div className="flex flex-col items-start gap-[20px] [text-wrap:balance]">
            <p className="type-h4 max-w-[650px]">{title}</p>
            {body && <div className="f-16 max-w-[650px]">{body}</div>}
            <Buttons buttons={buttons} className="mt-[20px] flex max-w-[650px] items-center gap-[20px] m:gap-[10px]" />
          </div>
          <div className="p-[20px] m:my-[20px] m:p-0">
            <Img src={image} alt="" className="w-full" loading="lazy" />
          </div>
        </div>
      </div>
    )
  }

  const grid = (maxW, imageCell) => (
    <div className={`mx-auto grid ${maxW} grid-cols-2 items-center gap-[20px] lgm:grid-cols-1`}>
      <div className="flex flex-col items-start [text-wrap:balance]">
        <p className="type-h4 mb-[20px] max-w-[650px]">{title}</p>
        <Buttons buttons={buttons} className="flex max-w-[650px] items-center gap-[20px]" />
      </div>
      <div className={imageCell}>
        <Img src={image} alt="" className="w-full" loading="lazy" />
      </div>
    </div>
  )

  if (variant === 'section') {
    return (
      <div className={`relative z-2 -mt-[40px] rounded-t-sheet ${bg} p-[40px] m:p-[20px]`}>
        <Spacer />
        {grid('max-w-[1400px]', 'p-[20px]')}
        <Spacer />
      </div>
    )
  }

  return (
    <div className="bg-cream">
      <div className="relative z-2 px-[40px] pb-[40px] pt-0 m:p-[20px]">{grid('max-w-[1200px]', 'p-[20px] m:mt-[20px]')}</div>
      <Spacer mobile60 />
    </div>
  )
}
