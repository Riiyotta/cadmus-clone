import Img from '../components/Img.jsx'
/**
 * QuoteCarousel (section.quote, data-module "QuoteCarousel") — pages-product N3 and pages-company §2.7.
 * Every page on the live site has exactly ONE slide, so Swiper's nav arrows are locked (hidden) and the
 * card is static. This renders that single slide; no carousel behaviour is implemented.
 * Layout: centred h4 (max 800), white card (p20, r12, gap 60): square image (40%; 16:9 <=768) + h6 quote
 * and maroon-bordered author (60%). A 250px accent band (r32 top, z1) sits behind the card's lower part and
 * runs into the CTA below. z-index 4, -mt-40, r32 top.
 * Props:
 *   title   h4 text. Pass '' to keep the empty heading block (students page renders it empty on live)
 *   quote   quote text (h6) — long testimonial prose: use PlaceholderProse's placeholderText(words)
 *   author  name (text-heading, 500)
 *   role    role line (f-16)
 *   image   portrait src (cover)
 *   bg      section bg class: '' transparent (product default), 'bg-tab-lavender' (Exams #E8E8FF),
 *           'bg-cream' (educators), 'bg-light-orange' (students)
 *   band    accent band class (product: scheme accent e.g. 'bg-yellow'; solutions: 'bg-orange')
 */
export default function QuoteCarousel({ title = '', quote, author, role, image, bg = '', band = 'bg-orange' }) {
  return (
    <section
      data-module="QuoteCarousel"
      className={`quote relative z-4 -mt-[40px] rounded-t-sheet p-[40px] m:p-[20px]${bg ? ` ${bg}` : ''}`}
    >
      <div className={`background-element absolute bottom-0 left-0 z-[1] h-[250px] w-full rounded-t-sheet ${band}`} />
      <div className="mx-auto my-[20px] max-w-[1400px] pb-[20px]">
        <p className="type-h4 mx-auto max-w-[800px] text-center">{title}</p>
      </div>
      <div className="relative z-2 mx-auto max-w-[1600px] px-[80px] m:p-0">
        <div className="flex items-center gap-[60px] rounded-card bg-pure-white p-[20px] m:flex-wrap">
          <div className="w-2/5 m:w-full">
            <div className="relative aspect-square overflow-hidden rounded-img bg-placeholder m:aspect-video">
              <Img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div className="w-3/5 m:w-full">
            <p className="type-h6 m-auto">{quote}</p>
            <div className="quote-author mt-[40px] flex flex-col m:mb-[20px]">
              <p className="text-heading font-medium">{author}</p>
              <p className="f-16">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
