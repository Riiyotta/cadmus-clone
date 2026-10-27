import Img from './Img.jsx'
import { useRef } from 'react'
import { useSwiperFade } from '../motion/index.js'

// CLONE_SPEC §3. Fade carousel: autoplay 3000ms, disableOnInteraction false, loop, speed 300, touch swipe.
const SLIDES = [
  '/assets/1754544929-a-frame-1430106069.png',
  '/assets/1754545399-b-frame-1430106070.png',
  '/assets/1754545430-c-frame-1430106071.png',
  '/assets/1754545481-d-frame-1430106072.png',
]

export default function Intro() {
  // Swiper fade, crossFade false, speed 300ms ease, loop; autoplay 3000ms after each transitionEnd.
  const fade = useSwiperFade(SLIDES.length, { loop: true, autoplay: true })
  const index = fade.active
  const startX = useRef(null)

  const onPointerDown = (e) => {
    startX.current = e.clientX
  }
  const onPointerUp = (e) => {
    if (startX.current == null) return
    const dx = e.clientX - startX.current
    startX.current = null
    if (Math.abs(dx) < 30) return
    if (dx < 0) fade.next()
    else fade.prev()
  }

  return (
    <div
      data-module="Introduction"
      className="-mt-[40px] rounded-t-sheet bg-cream px-[40px] pb-0 pt-[40px] m:px-[20px] m:pt-[20px]"
    >
      <div className="mx-auto mb-0 mt-[40px] flex max-w-[1000px] flex-col gap-[40px] text-center">
        <p className="type-h4 mx-auto whitespace-break-spaces">Secure, supportive assessment anywhere, anytime</p>
        <div className="f-16 mx-auto max-w-[900px] whitespace-break-spaces">
          Run online or in-place, high-quality assessments through one secure platform that guides students to success and improves assessment outcomes.
        </div>
        <div
          className="intro-carousel mx-auto grid w-full max-w-[1000px] touch-pan-y select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (startX.current = null)}
        >
          {SLIDES.map((src, i) => (
            <div
              key={src}
              aria-hidden={i !== index}
              className="intro-slide bg-cream [grid-area:1/1]"
              style={fade.slideStyle(i)}
            >
              <Img src={src} alt="" draggable="false" className="w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
