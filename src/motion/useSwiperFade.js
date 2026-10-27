import { useCallback, useEffect, useRef, useState } from 'react'
import { SWIPER_FADE } from './constants.js'

/**
 * Reproduces Swiper EffectFade with crossFade:false (what both homepage carousels use):
 * the outgoing slide stays fully opaque while the incoming one fades in over it (300ms, CSS `ease`);
 * going backwards, the current slide fades out to reveal the target underneath.
 * Slides must be stacked in one grid cell / absolutely positioned; spread slideStyle(i) on each.
 *
 *   const fade = useSwiperFade(4, { loop: true, autoplay: true })
 *   <div style={fade.slideStyle(i)} aria-hidden={i !== fade.active}>…</div>
 *   fade.goTo(i) / fade.next() / fade.prev()
 */
export function useSwiperFade(count, { loop = false, autoplay = false, speed = SWIPER_FADE.speed, delay = SWIPER_FADE.autoplayDelay } = {}) {
  const [state, setState] = useState({ active: 0, prev: null, dir: 1, changed: false })

  const goTo = useCallback(
    (index, dirHint) => {
      setState((s) => {
        let i = index
        if (loop) i = ((index % count) + count) % count
        else i = Math.max(0, Math.min(count - 1, index))
        if (i === s.active) return s
        const dir = dirHint ?? (i > s.active ? 1 : -1)
        return { active: i, prev: s.active, dir, changed: true }
      })
    },
    [count, loop]
  )
  const activeRef = useRef(0)
  activeRef.current = state.active
  const goNext = useCallback(() => goTo(activeRef.current + 1, 1), [goTo])
  const goPrev = useCallback(() => goTo(activeRef.current - 1, -1), [goTo])

  // Swiper autoplay: first change `delay` after init, then `delay` after each transitionEnd.
  useEffect(() => {
    if (!autoplay) return
    const t = setTimeout(goNext, delay + (state.changed ? speed : 0))
    return () => clearTimeout(t)
  }, [autoplay, delay, speed, state, goNext])

  const transition = `opacity ${speed}ms ${SWIPER_FADE.easing}`
  const slideStyle = (i) => {
    const { active, prev, dir } = state
    if (!loop) {
      // Swiper order model: every slide up to the active one is opaque, later ones transparent; DOM order stacks.
      return { opacity: i <= active ? 1 : 0, transition, pointerEvents: i === active ? 'auto' : 'none' }
    }
    if (i === active) return { opacity: 1, zIndex: dir > 0 ? 2 : 1, transition: dir > 0 ? transition : 'none', pointerEvents: 'auto' }
    if (i === prev) return { opacity: dir > 0 ? 1 : 0, zIndex: dir > 0 ? 1 : 2, transition: dir > 0 ? 'none' : transition, pointerEvents: 'none' }
    return { opacity: 0, zIndex: 0, transition: 'none', pointerEvents: 'none' }
  }

  return { active: state.active, goTo, next: goNext, prev: goPrev, slideStyle }
}
