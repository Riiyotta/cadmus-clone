/**
 * PricingCard — pages-product N9 card (also the N10 licence card).
 * White, r12, p20, gap 20, no shadow; stretches to the row height. Overline chip (mt20, colour by
 * position), h5 plan name, 14px caption, the overline repeated as .label.clear, ul (mb40; two-col for the
 * licence card), button pushed to the bottom (mt-auto, mb20).
 * Props: overline, chip (bg class; '' = default light orange), name, caption, bullets: string[],
 *        twoCol, button { text, href, style: 'black' | 'outline' }
 * Hover: .arrow-button.black / .arrow-button (global CSS).
 */
export default function PricingCard({ overline, chip = '', name, caption, bullets, twoCol = false, button }) {
  return (
    <div className="pricing--card flex h-full flex-col gap-[20px] rounded-card bg-pure-white p-[20px]">
      <p className={`label mr-auto mt-[20px]${chip ? ` ${chip}` : ''}`}>{overline}</p>
      <p className="type-h5">{name}</p>
      <div>{caption}</div>
      <p className="label clear mr-auto">{overline}</p>
      <ul className={`mb-[40px]${twoCol ? ' two-col' : ''}`}>
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      <div className="mb-[20px] mr-auto mt-auto">
        <a className={button.style === 'outline' ? 'arrow-button' : 'arrow-button black'} href={button.href}>
          {button.text}
        </a>
      </div>
    </div>
  )
}
