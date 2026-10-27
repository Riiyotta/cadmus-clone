import Spacer from '../components/Spacer.jsx'

/**
 * Cta (data-module "Cta") — closing CTA band. One component for pages-company §2.3 "Cta" and
 * pages-product N4 "ProductCta" (same markup; only the bg differs).
 * Sheet: -mt-40, r32 top, z2, p40 (20). Spacer 100/60, centred max-1100 block (balance), Spacer 100.
 * Content: h4 (30/34.5 at <=768) mb20, one 16px paragraph mb40, buttons row gap 20.
 * Props:
 *   title    h4 (string or node; <br /> for ⏎)
 *   body     paragraph (string or node)
 *   buttons  [{ text, href, style: 'solid'|'outline' }]
 *            default: Book a demo -> /request-demo (solid) + Get a free trial -> /contact (outline)
 *   bg       bg class: 'bg-orange' (company default) | scheme accent for product pages
 *            ('bg-yellow', 'bg-lavender', 'bg-pink', 'bg-blue', 'bg-green'; Oral 'bg-cream')
 * Motion: none (static on live).
 */
const BUTTONS = [
  { text: 'Book a demo', href: '/request-demo', style: 'solid' },
  { text: 'Get a free trial', href: '/contact', style: 'outline' },
]

export default function Cta({ title, body, buttons = BUTTONS, bg = 'bg-orange' }) {
  return (
    <div data-module="Cta" className={`relative z-2 -mt-[40px] rounded-t-sheet p-[40px] m:p-[20px] ${bg}`}>
      <Spacer mobile60 />
      <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center [text-wrap:balance]">
        <p className="type-h4 m-fs-30 mb-[20px]">{title}</p>
        <div className="f-16 mb-[40px] flex flex-col gap-[20px]">
          <p>{body}</p>
        </div>
        <div className="flex items-center gap-[20px]">
          {buttons.map((b) => (
            <a key={b.text} href={b.href} className={b.style === 'outline' ? 'arrow-button' : 'button'}>
              {b.text}
            </a>
          ))}
        </div>
      </div>
      <Spacer />
    </div>
  )
}
