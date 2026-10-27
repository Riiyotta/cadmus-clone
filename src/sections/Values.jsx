import Img from '../components/Img.jsx'
import Spacer from '../components/Spacer.jsx'

/**
 * Values (data-module "Values") — pages-company §2.4 (about, careers, trust-centre x2). Not used by the
 * product or content specs.
 * Sheet r32 top, p40 (20), flex-col. Centred h4, optional intro (16px, max 1100, my20), then a 3-col grid
 * (max 1200; column-gap 40, row-gap 80; 1 col gap 40 <=768) of icon (34) / h6 / 14px body (max 400).
 * Props:
 *   title     h4
 *   intro     optional paragraph (trust pages; long copy -> placeholderText)
 *   items     [{ icon, title, text }]
 *   bg        'bg-light-orange' (about, careers) | 'bg-cream' (trust S3) | 'bg-pure-white' (trust S4)
 *   zIndex    'z-auto' (about, careers; default) | 'z-2' (trust)
 *   overlap   bool, -mt-40 (default true; careers false = margin-top 0)
 * NOTE the vertical rhythm is inferred: title mt40, grid mt80 (40 <=768) (spec: "title-to-grid distance is 80px"),
 * trailing Spacer(100). The spec gives only section totals (about 744, careers 764, trust 670 / 1072 @1440);
 * verify against those once real copy lengths are in place.
 */
export default function Values({ title, intro, items = [], bg = 'bg-light-orange', zIndex = 'z-auto', overlap = true }) {
  return (
    <div
      data-module="Values"
      className={`relative ${zIndex} flex flex-col rounded-t-sheet p-[40px] m:p-[20px] ${overlap ? '-mt-[40px] ' : ''}${bg}`}
    >
      <p className="type-h4 mt-[40px] text-center">{title}</p>
      {intro && <p className="f-16 mx-auto my-[20px] max-w-[1100px] text-center [text-wrap:balance]">{intro}</p>}
      <div className="mx-auto mt-[80px] w-full max-w-[1200px] m:mt-[40px]">
        <div className="grid grid-cols-3 gap-x-[40px] gap-y-[80px] m:grid-cols-1 m:gap-[40px]">
          {items.map((it) => (
            <div key={it.title} className="flex flex-col gap-[20px]">
              <Img src={it.icon} alt="" className="h-[34px] w-[34px] object-contain" />
              <p className="type-h6">{it.title}</p>
              <p className="max-w-[400px]">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
      <Spacer />
    </div>
  )
}
