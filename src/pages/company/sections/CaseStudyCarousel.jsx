import Img from '../../../components/Img.jsx'
import Spacer from '../../../components/Spacer.jsx'
import RoiCard from '../../../components/RoiCard.jsx'
import { CASE_SCHEMES } from '../../../sections/index.js'
import SlideCarousel from '../motion/SlideCarousel.jsx'

/**
 * CaseStudyCarousel — pages-company §2.8 (universities S8). Cream sheet (-mt-40, r32, z2, p40/20):
 *   centred h4, RoiCard (bare), then a Swiper slide carousel (loop, speed 850, autoHeight, arrows, drag).
 * The Spacers around the RoiCard and after the carousel are inferred from the measured rects
 * (title bottom 5604 -> RoiCard 5703 -> carousel 6373; section ends 141px after the carousel).
 * Props: title, slides [{ name, scheme, quote, person, role, link?, image {src,width,height}, highlights [[n, label]] }]
 */
function QuoteMark({ className }) {
  return (
    <svg width="19.6" height="14" viewBox="0 0 26 18" fill="none" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="m23.392.31.612 1.293c-3.74 2.584-5.576 4.964-5.576 7.208a.93.93 0 0 0 .952.952s.136 0 .476-.136c.408-.068.884-.136 1.292-.136 2.584 0 4.08 1.292 4.08 3.468 0 2.312-1.632 3.875-4.012 3.875-3.06 0-5.44-2.583-5.44-6.051 0-4.08 2.992-8.228 7.616-10.472ZM7.616.31l.612 1.293C4.488 4.187 2.652 6.567 2.652 8.81a.93.93 0 0 0 .952.952s.136 0 .476-.136c.408-.068.884-.136 1.292-.136 2.584 0 4.08 1.292 4.08 3.468 0 2.312-1.632 3.875-4.012 3.875-3.128 0-5.44-2.583-5.44-6.051C0 6.703 2.992 2.555 7.616.31Z"
      />
    </svg>
  )
}

function Slide({ s }) {
  const c = CASE_SCHEMES[s.scheme]
  return (
    <div className={`case-study-card relative z-2 mx-auto grid max-w-[1300px] grid-cols-2 gap-[20px] rounded-card ${c.card} m:flex m:flex-col m:gap-0`}>
      <div className="rounded-card p-[20px]">
        <p className={`type-h4 mb-[40px] [text-wrap:balance] m:mb-[20px] ${c.accentText}`}>{s.name}</p>
        <QuoteMark className={`mb-[10px] block ${c.accentText}`} />
        <p className="f-16 mb-[20px] max-w-[600px] text-warm-white">{s.quote}</p>
        <div className={`case-study-quote-author mb-[20px] flex flex-col gap-[5px] border-l-[3px] border-solid pl-[10px] text-warm-white ${c.accentBorder}`}>
          <p className="text-heading font-medium">{s.person}</p>
          <p className="f-16 opacity-80">{s.role}</p>
        </div>
        {s.link && (
          <div className="flex items-start text-warm-white">
            <a className="arrow-button transparent white mb-[40px] mr-auto m:mb-[20px]" href={s.link}>
              Read the full Case Study
            </a>
          </div>
        )}
        <p className="text-heading mb-[20px] text-warm-white">Highlights</p>
        <div className="flex gap-[16px] m:flex-col">
          {s.highlights.map(([n, label]) => (
            <div
              key={label}
              className={`flex w-full flex-col items-center justify-center rounded-card p-[20px] text-center ${c.accent}`}
            >
              <p className={`type-h3 mb-[10px] ${c.darkText}`}>{n}</p>
              <p className={`w-full border-t border-solid pt-[10px] text-ink [text-wrap:balance] ${c.darkBorder}`}>{label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-[20px] m:hidden">
        <div className="relative flex h-full w-full overflow-hidden rounded-img p-[40px] m:aspect-[5/4] m:p-[20px]">
          <Img
            src={s.image.src}
            width={s.image.width}
            height={s.image.height}
            alt=""
            draggable="false"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

export default function CaseStudyCarousel({ title, slides = [] }) {
  return (
    <div className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <p className="type-h4 mb-[40px] mt-[40px] text-center m:mb-[20px]">{title}</p>
      <Spacer />
      <RoiCard bare />
      <Spacer />
      <div className="relative mx-auto max-w-[1600px]">
        <div className="mx-[40px] m:m-0">
          <SlideCarousel
            className="swiper-autoheight"
            autoHeight
            slides={slides.map((s) => (
              <Slide key={s.name} s={s} />
            ))}
            renderNav={({ prev, next }) => (
              <>
                <button type="button" aria-label="Previous slide" className="carousel-nav carousel-nav--prev" onClick={prev}>
                  <span className="arrow-button previous shrink-0">Prev</span>
                </button>
                <button type="button" aria-label="Next slide" className="carousel-nav carousel-nav--next" onClick={next}>
                  <span className="arrow-button shrink-0">Next</span>
                </button>
              </>
            )}
          />
        </div>
      </div>
      {/* live: div.spacer.m-mt40 (40px top margin at <=768, below the arrows) */}
      <Spacer className="m:mt-[40px]" />
    </div>
  )
}
