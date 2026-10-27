import Img from './Img.jsx'
/**
 * TwoColumnRows — CLONE_SPEC §11 (+ pages-product §3 "TwoCols", pages-company §1.3). Defaults = homepage.
 * Rows alternate: flipped (text left, image right) / normal (image left). Text blocks carry
 * .fade--up (flipped) / .fade--up.reverse (normal) + data-sal, as on the original.
 * Props:
 *   rows          [{ image, title, body?, paragraphs?, label?, iconTag?, quote?, button? }]
 *                   body        single paragraph string (homepage form)
 *                   paragraphs  string[] / nodes, one <p> each (use instead of body)
 *                   label       overline chip text (p.label, before the h5)
 *                   iconTag     { icon, text } icon-tag chip instead of a label (product overview)
 *                   quote       { text, author } light-orange quote box under the body (uni / edu)
 *                   button      { text, href } outline arrow-button after the body
 *   labelClass    chip colour class for label, e.g. 'bg-yellow' (default: .label's light orange)
 *   startFlipped  default true (row 1 text-left). About: false
 *   rowGap        0 (default, rows overlap -40 as sheets) | 60 (about: gap-60 on the wrapper)
 *   heading       optional centred h4 above the rows (Oral "Phase 1…")
 *   container     'sheet' (default: -mt-40, r32 top) | 'flat' (product-overview: margin 0, radius 0)
 *   standalone    bool, render each row as a bare TwoColumns div with no outer wrapper (careers, contact)
 */
const ROWS = [
  {
    image: '/assets/1752108829-group-1073715452-1.png',
    title: 'Enhanced assessment literacy and quality',
    body: 'Confidently deliver high-quality, consistent assessments that engage students and support deeper learning. With Cadmus, educators spend less time on admin and more time creating impactful experiences—at scale, in any subject.',
  },
  {
    image: '/assets/1752109181-group-1073715735.png',
    title: 'Improved student wellbeing and success',
    body: 'Give students the clarity and confidence they need to thrive. With everything in one place—tools, feedback, and resources—Cadmus helps learners stay focused, reduce stress, and achieve better outcomes.',
  },
  {
    image: '/assets/1752109248-group-1073715298.png',
    title: 'Greater equity and inclusion',
    body: 'More impactful and accessible feedback for every learner. With streamlined communication and progress tracking, Cadmus helps educators support diverse needs and foster connection—without the admin overload.',
  },
  {
    image: '/assets/1752109420-group-1000009165.png',
    title: 'Learning and academic integrity assurance',
    body: 'With less time spent on setup and moderation, it’s easier to support student learning while upholding academic integrity. Our scaffolded, guided assessments prioritise learning over shortcuts—keeping students engaged from the start.',
  },
]

function Row({ row, flipped, labelClass }) {
  const fade = flipped ? 'fade--up' : 'fade--up reverse'
  const paragraphs = row.paragraphs || [row.body]
  return (
    <div data-module="TwoColumns" className="relative -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto max-w-[1200px] m:mb-[20px] m:mt-[40px]">
        <div
          className={`two-columns grid gap-[100px] lgm:grid-cols-1 lgm:gap-[20px] lgm:[grid-template-areas:'content'_'image'] ${
            flipped
              ? "grid-cols-[.45fr_.55fr] [grid-template-areas:'content_image']"
              : "grid-cols-[.55fr_.45fr] [grid-template-areas:'image_content']"
          }`}
        >
          <div className="p-[20px] [grid-area:image] m:p-0">
            <Img src={row.image} alt="" className="w-full" loading="lazy" />
          </div>
          <div className="flex w-full flex-col justify-center [grid-area:content]">
            <div className="flex max-w-[550px] flex-col items-start justify-center gap-[20px]">
              <div data-sal="" className={`${fade} flex flex-col items-start gap-[20px]`}>
                {row.label && <p className={`label mr-auto${labelClass ? ` ${labelClass}` : ''}`}>{row.label}</p>}
                {row.iconTag && (
                  <div className="icon-tag flex items-center gap-[10px] rounded-btn bg-offwhite py-[4px] pl-[4px] pr-[12px] shadow-tag m:m-0">
                    <Img src={row.iconTag.icon} alt="" className="w-[25px] object-contain" />
                    <p className="sm-heading text-[12px] text-ink">{row.iconTag.text}</p>
                  </div>
                )}
                <p className="type-h5 [text-wrap:balance]">{row.title}</p>
              </div>
              <div data-sal="" className={`${fade} flex flex-col`}>
                <div className="f-16 mb-[20px] flex flex-col gap-[20px] m:m-0 m:text-[14px]">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {row.quote && (
                  <div className="w-full rounded-card bg-light-orange p-[20px]">
                    <div className="quote-icon mb-[10px]" />
                    <p className="type-h7 !text-[16px]">{row.quote.text}</p>
                    <div className="mt-[20px] flex justify-between gap-[20px]">
                      <a href="">
                        <p className="text-xs-heading max-w-[350px]">{row.quote.author}</p>
                      </a>
                    </div>
                  </div>
                )}
                {row.button && (
                  <a className="arrow-button mr-auto m:mt-[20px]" href={row.button.href}>{row.button.text}</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function TwoColumnRows({
  rows = ROWS,
  labelClass = '',
  startFlipped = true,
  rowGap = 0,
  heading,
  container = 'sheet',
  standalone = false,
}) {
  const items = rows.map((row, i) => (
    <Row key={row.title} row={row} flipped={i % 2 === 0 ? startFlipped : !startFlipped} labelClass={labelClass} />
  ))
  if (standalone) return <>{items}</>
  const outer =
    container === 'flat'
      ? `relative z-2 flex flex-col ${rowGap === 60 ? 'gap-[60px]' : 'gap-0'} bg-cream`
      : `relative z-2 -mt-[40px] flex flex-col ${rowGap === 60 ? 'gap-[60px]' : 'gap-0'} rounded-t-sheet bg-cream`
  return (
    <div className={outer}>
      <div />
      {heading && (
        <div className="mx-auto mb-[40px] mt-[80px] max-w-[1100px] p-[40px] text-center m:p-[20px]">
          <p className="type-h4 mb-[20px] [text-wrap:balance]">{heading}</p>
        </div>
      )}
      {items}
      <div />
    </div>
  )
}
