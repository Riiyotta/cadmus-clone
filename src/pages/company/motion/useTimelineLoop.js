import { useEffect } from 'react'
import gsap from 'gsap'
import { TIMELINE_LOOP as T } from './constants.js'

/**
 * About "The road to now" desktop loop (pages-company §2.13), verbatim from the original:
 *   gsap.set(milestones, { opacity: 0, y: 20 })
 *   const tl = gsap.timeline({ repeat: -1 })
 *   milestones.forEach(m => {
 *     tl.to(m, { opacity: 1, x: 10, duration: 0.4 }, "-=0.2")
 *     tl.to(m, { opacity: 0, x: 20, duration: 0.6, delay: 5 }, "+=0")
 *   })
 * Only one card is visible at a time (~6s each). Starts on mount; skipped when innerWidth <= 768.
 * `containerRef` points at the desktop grid; its `.milestone` children are animated.
 */
export function useTimelineLoop(containerRef) {
  useEffect(() => {
    const root = containerRef.current
    if (!root || window.innerWidth <= T.mobileMax) return
    const milestones = Array.from(root.querySelectorAll('.milestone'))
    if (!milestones.length) return
    const ctx = gsap.context(() => {
      gsap.set(milestones, T.initial)
      const tl = gsap.timeline({ repeat: -1 })
      milestones.forEach((m) => {
        tl.to(m, T.inTween, T.inPosition)
        tl.to(m, T.outTween, T.outPosition)
      })
    }, root)
    return () => ctx.revert()
  }, [containerRef])
}
