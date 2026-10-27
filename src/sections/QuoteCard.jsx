import Img from '../components/Img.jsx'
/**
 * QuoteCard — rounded quote card with author block (CaseStudy part B, extracted).
 * Variants:
 *   'case-study' (default) homepage: .quote--background strip (cream lower half), orange card,
 *                maroon text, max-1200.
 *   'article'    rich-text Quote block (pages-content §4.2): .quote--wrapper.<colour> background PNG,
 *                max-1400 full width, my40; author block omitted when author is empty; role opacity .8.
 *   'banner'     RoiQuoteBanner (navy): cream section > max-1400 navy card with roi-quote-pattern.svg,
 *                padding 80/132 (40 <=990, 20 <=768), max-1000 inner, quote 32/40.
 * Props:
 *   quote    text (include the straight/curly quote marks the spec shows)
 *   NOTE quote/author/role default to the homepage quote; for an article quote without author pass author="".
 *   author   name (rendered uppercase)
 *   role     role line
 *   colour   'article' only: 'orange' (default) | 'blue' | 'pink' | 'green'
 */
const HOME = {
  quote:
    '"I highly recommend Cadmus ... Students learn meaningfully in the assessment process because the Cadmus platform provides an educative and supportive workspace that drives successful outcomes."',
  author: 'Professor Gabrielle Finn',
  role: 'Vice-Dean for Teaching, Learning and Students, The University of Manchester',
}

export default function QuoteCard({ variant = 'case-study', quote = HOME.quote, author = HOME.author, role = HOME.role, colour = 'orange' }) {
  if (variant === 'article') {
    return (
      <div className={`quote--wrapper ${colour} my-[40px] w-full max-w-[1400px] overflow-hidden rounded-card p-[40px] m:p-[20px]`}>
        <div className="mx-auto my-[40px] flex max-w-[950px] flex-col items-start gap-[40px]">
          <p className="type-h5">{quote}</p>
          {author && (
            <div className="quote-author flex flex-col gap-[5px] pl-[6px]">
              <p className="text-heading font-medium">{author}</p>
              {role && <p className="f-16 opacity-80">{role}</p>}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'banner') {
    return (
      <section className="relative z-2 bg-cream p-[40px] m:p-[20px]">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative overflow-hidden rounded-card bg-navy px-[132px] py-[80px] text-offwhite lgm:p-[40px] m:p-[20px]">
            <Img src="/assets/roi-quote-pattern.svg" alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="relative mx-auto my-[40px] flex max-w-[1000px] flex-col items-start gap-[40px] m:my-[20px]">
              <p className="font-serif text-[32px] leading-[40px] tracking-[-0.015em]">{quote}</p>
              <div className="roi-quote-author">
                <div className="flex flex-col gap-[5px]">
                  <p className="text-sm-heading font-medium">{author}</p>
                  <p className="f-16">{role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="quote--background px-[40px] pb-[40px] pt-0 m:px-[20px] m:pb-[20px]">
      <div className="relative z-2 mx-auto my-[40px] w-full max-w-[1200px] overflow-hidden rounded-card bg-orange p-[40px] text-maroon m:p-[20px]">
        <div className="mx-auto my-[40px] flex max-w-[950px] flex-col items-start gap-[40px]">
          <p className="type-h5">{quote}</p>
          <div className="quote-author flex flex-col gap-[5px] border-l-2 border-solid border-maroon pl-[10px]">
            <p className="text-heading font-medium text-maroon">{author}</p>
            <p className="f-16">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
