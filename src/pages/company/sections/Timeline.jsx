import Img from '../../../components/Img.jsx'
import { useRef } from 'react'
import SlideCarousel from '../motion/SlideCarousel.jsx'
import { useTimelineLoop } from '../motion/useTimelineLoop.js'
import { TIMELINE_AUTOPLAY_DELAY } from '../motion/constants.js'

/**
 * Timeline ("The road to now") — pages-company §2.13 (about S5). Maroon sheet (-mt-40, r32, z2), text
 * warm-white, padding 40 0. Desktop: 4-col grid of milestone cards with the GSAP one-at-a-time loop.
 * <=768: Swiper slide carousel (loop, speed 850, autoplay 3500, spaceBetween 20), slide = p20 + card.
 * Then the timeline line SVG (.timeline, global CSS).
 * Props: title, items [{ year, body, image {src,width,height} }]
 */
function Milestone({ m }) {
  return (
    <div className="milestone flex flex-col rounded-card bg-light-orange p-[10px] pb-[20px] text-maroon">
      <div className="relative aspect-[3/2] overflow-hidden rounded-card bg-placeholder">
        <Img
          src={m.image.src}
          width={m.image.width}
          height={m.image.height}
          alt=""
          draggable="false"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <p className="type-h5 mt-[10px]">{m.year}</p>
      <div>{m.body}</div>
    </div>
  )
}

export default function Timeline({ title, items = [] }) {
  const gridRef = useRef(null)
  useTimelineLoop(gridRef)
  return (
    <div className="relative z-2 -mt-[40px] rounded-t-sheet bg-maroon py-[40px] text-warm-white">
      <p className="type-h4 mt-[40px] pb-[20px] text-center m:mb-0">{title}</p>
      <div className="mx-[40px] mb-[40px] pb-[20px] m:m-0 m:p-0">
        <div ref={gridRef} className="mx-auto grid max-w-[1600px] grid-cols-4 gap-[20px] m:hidden">
          {items.map((m) => (
            <Milestone key={m.year} m={m} />
          ))}
        </div>
        <div className="mb-[20px] hidden m:block">
          <SlideCarousel
            spaceBetween={20}
            autoplay={{ delay: TIMELINE_AUTOPLAY_DELAY }}
            slideClassName="p-[20px]"
            slides={items.map((m) => (
              <Milestone key={m.year} m={m} />
            ))}
          />
        </div>
      </div>
      <div className="timeline mb-[40px]" />
      <div className="pb-[40px] m:hidden" />
    </div>
  )
}
