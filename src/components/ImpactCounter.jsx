import { Counter } from '../motion/index.js'

/**
 * ImpactCounter — CLONE_SPEC §7. GSAP count-up from 0 (src/motion/Counter.jsx). Defaults = homepage.
 * Props:
 *   stats      [[value, label], ...] (default 7m / 18,000+ / 25m+)
 *   label      optional p.text-heading (mb40 mt20) above the grid, e.g. 'Our Impact so far'.
 *              Omitted -> the homepage's empty 40px label spacer.
 *   layout     'spaced' (default: 1fr auto 1fr grid, max-1400, 1 col <=990)
 *              'row'    (careers 4 stats: flex space-between wrap, gap 40, max-1600, pb40; column <=768)
 *   bg         default 'bg-pure-white' (about/careers 'bg-orange')
 *   zIndex     default 'z-2' (about: 'z-auto')
 *   className  extra section classes (about 'm:pt-[40px]'; careers 'pb-[40px]')
 */
const STATS = [
  ['7m', 'Students'],
  ['18,000+', 'Teachers'],
  ['25m+', 'Assessments'],
]

export default function ImpactCounter({ stats = STATS, label, layout = 'spaced', bg = 'bg-pure-white', zIndex = 'z-2', className = '' }) {
  const grid =
    layout === 'row'
      ? 'mx-auto mb-[40px] flex max-w-[1600px] flex-wrap justify-between gap-[40px] pb-[40px] m:flex-col'
      : 'spaced-grid mx-auto mb-[40px] grid max-w-[1400px] grid-cols-[1fr_auto_1fr] gap-[40px] lgm:grid-cols-1'
  return (
    <div
      data-module="ImpactCounter"
      className={`relative ${zIndex} -mt-[40px] rounded-t-sheet ${bg} p-[40px] text-center m:p-[20px]${className ? ` ${className}` : ''}`}
    >
      {label ? (
        <p className="text-heading mb-[40px] mt-[20px]">{label}</p>
      ) : (
        /* Empty p.text-heading in the original; its collapsed margins = 40px. */
        <div className="h-[40px]" />
      )}
      <div className={grid}>
        {stats.map(([value, text]) => (
          <div key={text} className="flex flex-col gap-[10px]">
            <Counter value={value} className="type-xl counter" />
            <p className="text-heading">{text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
