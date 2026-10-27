import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SWIPER_SLIDE } from './constants.js'

/**
 * SlideCarousel — Swiper `effect: 'slide'` stand-in (slidesPerView 1).
 * Loop is done the way Swiper does it: a clone of the last slide before the first and of the first after
 * the last; after a transition lands on a clone, the track jumps (no transition) to the real slide.
 *
 * Props:
 *   slides         array of nodes (one per slide)
 *   loop           default true
 *   speed          ms, default 850
 *   spaceBetween   px between slides, default 0
 *   autoHeight     bool: viewport height follows the active slide (animated over `speed`)
 *   autoplay       null | { delay }: next slide `delay` ms after each transition end (disableOnInteraction false)
 *   className      classes on the viewport (div.swiper)
 *   slideClassName classes on each slide wrapper (div.swiper-slide)
 *   renderNav      ({ prev, next }) => nodes rendered after the viewport (nav buttons)
 */
export default function SlideCarousel({
  slides,
  loop = true,
  speed = SWIPER_SLIDE.speed,
  spaceBetween = 0,
  autoHeight = false,
  autoplay = null,
  className = '',
  slideClassName = '',
  renderNav,
}) {
  const count = slides.length
  const looped = loop && count > 1
  const list = looped ? [slides[count - 1], ...slides, slides[0]] : slides
  const offset = looped ? 1 : 0

  const [pos, setPos] = useState(offset) // index in `list`
  const [animate, setAnimate] = useState(false)
  const [drag, setDrag] = useState(0)
  const [height, setHeight] = useState(null)
  const moving = useRef(false)
  const slideRefs = useRef([])
  const viewportRef = useRef(null)
  const dragState = useRef(null)
  const suppressClick = useRef(false)

  const go = useCallback(
    (delta) => {
      if (moving.current || count < 2) return
      setPos((p) => {
        const n = p + delta
        if (!looped && (n < 0 || n > count - 1)) return p
        moving.current = true
        setAnimate(true)
        return n
      })
    },
    [count, looped]
  )
  const next = useCallback(() => go(1), [go])
  const prev = useCallback(() => go(-1), [go])

  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return
    moving.current = false
    setAnimate(false)
    if (looped) {
      if (pos === 0) setPos(count)
      else if (pos === count + 1) setPos(1)
    }
    setTick((t) => t + 1)
  }
  // tick changes once per finished transition (drives autoplay restarts)
  const [tick, setTick] = useState(0)

  // autoHeight: measure the active slide
  const measure = useCallback(() => {
    if (!autoHeight) return
    const el = slideRefs.current[pos]
    if (el) setHeight(el.offsetHeight)
  }, [autoHeight, pos])
  useLayoutEffect(measure, [measure])
  useEffect(() => {
    if (!autoHeight) return
    const ro = new ResizeObserver(measure)
    slideRefs.current.forEach((el) => el && ro.observe(el))
    return () => ro.disconnect()
  }, [autoHeight, measure, count])

  // autoplay
  useEffect(() => {
    if (!autoplay || count < 2) return
    const t = setTimeout(next, autoplay.delay)
    return () => clearTimeout(t)
  }, [autoplay, count, next, tick])

  // touch / mouse drag
  const width = () => viewportRef.current?.offsetWidth || 1
  const onPointerDown = (e) => {
    if (count < 2 || moving.current || (e.pointerType === 'mouse' && e.button !== 0)) return
    dragState.current = { x: e.clientX, y: e.clientY, t: performance.now(), active: false, id: e.pointerId }
  }
  const onPointerMove = (e) => {
    const s = dragState.current
    if (!s || s.id !== e.pointerId) return
    const dx = e.clientX - s.x
    const dy = e.clientY - s.y
    if (!s.active) {
      if (Math.abs(dx) < SWIPER_SLIDE.threshold) return
      if (Math.abs(dy) > Math.abs(dx)) {
        dragState.current = null // vertical scroll wins
        return
      }
      s.active = true
      viewportRef.current?.setPointerCapture?.(e.pointerId)
    }
    setDrag(dx)
  }
  const onPointerUp = (e) => {
    const s = dragState.current
    dragState.current = null
    if (!s || !s.active) return
    const dx = e.clientX - s.x
    const quick = performance.now() - s.t < SWIPER_SLIDE.shortSwipeMs
    suppressClick.current = true
    setDrag(0)
    if (Math.abs(dx) > width() * SWIPER_SLIDE.longSwipesRatio || quick) {
      go(dx < 0 ? 1 : -1)
    } else {
      setAnimate(true) // snap back
      setTimeout(() => setAnimate(false), speed)
    }
  }
  const onClickCapture = (e) => {
    if (suppressClick.current) {
      e.preventDefault()
      e.stopPropagation()
      suppressClick.current = false
    }
  }

  const gap = spaceBetween
  const trackStyle = {
    display: 'flex',
    alignItems: autoHeight ? 'flex-start' : undefined,
    gap: gap ? `${gap}px` : undefined,
    transform: `translate3d(calc(${-pos} * (100% + ${gap}px) + ${drag}px), 0, 0)`,
    transition: animate ? `transform ${speed}ms ${SWIPER_SLIDE.easing}` : 'none',
  }

  return (
    <>
      <div
        ref={viewportRef}
        className={`swiper relative overflow-hidden ${className}`}
        style={{
          height: autoHeight && height != null ? `${height}px` : undefined,
          transition: autoHeight ? `height ${speed}ms ${SWIPER_SLIDE.easing}` : undefined,
          touchAction: 'pan-y',
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onClickCapture={onClickCapture}
        onDragStart={(e) => e.preventDefault()}
      >
        <div className="swiper-wrapper" style={trackStyle} onTransitionEnd={onTransitionEnd}>
          {list.map((node, i) => {
            const clone = looped && (i === 0 || i === list.length - 1)
            return (
              <div
                key={i}
                ref={(el) => (slideRefs.current[i] = el)}
                className={`swiper-slide w-full shrink-0 ${slideClassName}`}
                aria-hidden={i !== pos || clone ? 'true' : undefined}
                {...(i !== pos ? { inert: '' } : {})}
              >
                {node}
              </div>
            )
          })}
        </div>
      </div>
      {renderNav?.({ prev, next })}
    </>
  )
}
