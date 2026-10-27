import Img from './Img.jsx'
import Spacer from './Spacer.jsx'

/**
 * WhyChoose (data-module "Success") — CLONE_SPEC §6. All props default to the homepage.
 * Props:
 *   title       section title (default 'Why choose Cadmus for your institution?')
 *   items       [{ icon, text, title? }] (default homepage 4 items). Also accepts the legacy [icon, text] tuples.
 *   variant     'default' (homepage / company pages: h5 title, grid-4, serif text, gap-20 cards)
 *               'feature' (pages-product §3 feature grid: centred h5/h4 max-850 in div.mb80.m-mb40.mt40,
 *                cards = icon (mb20 [+mt10]) + f-18 AT Realm title (mb10) + serif body, grid-3|4, mb80)
 *   --- feature-variant options ---
 *   titleClass  default 'type-h5' (Oral / overview use 'type-h4')
 *   columns     3 (default; 1 col <=768) | 4 (1 col <=990)
 *   maxWidth    grid max-width class, default 'max-w-[1200px]' (Oral/overview 'max-w-[1400px]')
 *   iconTop     bool, icon gets mt10 (product pages true; overview false). Default true
 *   bare        bool, render without the section sheet (inside ProductHighlight). Default false
 *   --- both ---
 *   spacer      bool, trailing Spacer(100) inside the section (default true; ignored when bare)
 *   className   extra classes on the section (e.g. 'z-auto')
 */
const ITEMS = [
  ['/assets/1753010668-certificate.svg', 'Increased assessment quality and consistency institution-wide.'],
  ['/assets/1753010687-shooting-star.svg', 'Enhanced student wellbeing, outcomes and experience in assessment.'],
  ['/assets/1753010700-team-blue.svg', 'Greater equity and inclusion, empowering students from all backgrounds to thrive.'],
  ['/assets/1753010720-profile.svg', 'Reduced misconduct, with rich insights into the student learning and construction process.'],
]

const norm = (it) => (Array.isArray(it) ? { icon: it[0], text: it[1] } : it)

function FeatureGrid({ title, titleClass, items, columns, maxWidth, iconTop }) {
  const cols = columns === 4 ? 'grid-cols-4 lgm:grid-cols-1' : 'grid-cols-3 m:grid-cols-1'
  return (
    <>
      <div className="mb-[80px] mt-[40px] m:mb-[40px]">
        <p className={`${titleClass} mx-auto max-w-[850px] text-center [text-wrap:balance]`}>{title}</p>
      </div>
      <div className={`mx-auto mb-[80px] w-full ${maxWidth}`}>
        <div className={`grid ${cols} gap-[20px]`}>
          {items.map(norm).map((it) => (
            <div key={it.icon + it.title} className="flex flex-col rounded-img bg-offwhite p-[20px] shadow-card">
              <Img src={it.icon} alt="" className={`h-[34px] w-[34px] object-contain mb-[20px]${iconTop ? ' mt-[10px]' : ''}`} />
              {it.title && <p className="f-18 at-realm mb-[10px]">{it.title}</p>}
              <p className="type-serif max-w-[400px] [text-wrap:balance]">{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default function WhyChoose({
  title = 'Why choose Cadmus for your institution?',
  items = ITEMS,
  variant = 'default',
  titleClass = 'type-h5',
  columns = 3,
  maxWidth = 'max-w-[1200px]',
  iconTop = true,
  bare = false,
  spacer = true,
  className = '',
}) {
  if (variant === 'feature') {
    const grid = <FeatureGrid {...{ title, titleClass, items, columns, maxWidth, iconTop }} />
    if (bare) return grid
    return (
      <div data-module="Success" className={`relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px] ${className}`}>
        {grid}
        {spacer && <Spacer />}
      </div>
    )
  }
  return (
    <div data-module="Success" className={`relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]${className ? ` ${className}` : ''}`}>
      <p className="type-h5 mb-[60px] mt-[40px] text-center m:mb-[40px]">{title}</p>
      <div className="mx-auto max-w-[1300px]">
        <div className="grid grid-cols-4 gap-[20px] [text-wrap:balance] lgm:grid-cols-1">
          {items.map(norm).map(({ icon, text }) => (
            <div key={icon} className="flex flex-col gap-[20px] rounded-img bg-offwhite p-[20px] shadow-card">
              <Img src={icon} alt="" className="w-[34px] object-contain" />
              <p className="type-serif max-w-[400px]">{text}</p>
            </div>
          ))}
        </div>
      </div>
      {spacer && <Spacer />}
    </div>
  )
}
