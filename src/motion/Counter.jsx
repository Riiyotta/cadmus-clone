import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { COUNTER } from './constants.js'

gsap.registerPlugin(ScrollTrigger)
if (import.meta.env.DEV) window.__ScrollTrigger = ScrollTrigger // QA scripts read trigger positions

// The original's images reserve their box (gatsby-image placeholders), so trigger positions never go
// stale. Here lazy <img>s without fixed boxes can shift the page after ScrollTrigger measured it, so
// re-measure when the document height changes. Done synchronously in the ResizeObserver callback
// (after layout, before the scroll event that scroll-anchoring fires), otherwise the anchored scroll
// would fire stale triggers early. Installed once, on first Counter mount.
let heightWatcher = null
function watchDocumentHeight() {
  if (heightWatcher || typeof ResizeObserver === 'undefined') return
  let lastHeight = document.body.scrollHeight
  heightWatcher = new ResizeObserver(() => {
    const h = document.body.scrollHeight
    if (h === lastHeight) return
    lastHeight = h
    ScrollTrigger.refresh()
  })
  heightWatcher.observe(document.body)
}

// Port of the original Counter's parse/format (including its quirks, e.g. "7m" shows raw
// "523412m" for the first ~110ms until the value passes 1e6, and toLocaleString() above 1000).
export function parseCounter(value) {
  const str = String(value)
  const prefix = str.match(/^[^\d.]*/)?.[0] || ''
  const suffix = str.match(/[^\d.]*$/)?.[0] || ''
  const num = str.replace(/^[^\d.]*/, '').replace(/[^\d.]*$/, '').replace(/,/g, '')
  const s = suffix.toLowerCase()
  const mult = s.includes('k') ? 1e3 : s.includes('m') ? 1e6 : s.includes('b') ? 1e9 : 1
  const hasDecimals = num.includes('.')
  return {
    targetValue: (parseFloat(num) || 0) * mult,
    prefix,
    suffix,
    hasDecimals,
    decimalPlaces: (hasDecimals && num.split('.')[1]?.length) || 0,
  }
}

export function formatCounter(e, t) {
  const r = t.hasDecimals ? e.toFixed(t.decimalPlaces) : Math.round(e)
  const s = t.suffix.toLowerCase()
  let n = r
  if (s.includes('k') && e >= 1e3) n = (r / 1e3).toFixed(t.decimalPlaces)
  else if (s.includes('m') && e >= 1e6) n = (r / 1e6).toFixed(t.decimalPlaces)
  else if (s.includes('b') && e >= 1e9) n = (r / 1e9).toFixed(t.decimalPlaces)
  else if (!s.includes('k') && !s.includes('m') && !s.includes('b') && r >= 1e3) n = parseInt(r).toLocaleString()
  return `${t.prefix}${n}${t.suffix}`
}

/**
 * GSAP count-up from 0 to `value` when the element's top crosses 88% of the viewport
 * (1.5s, power2.out, plays once). Renders `prefix0suffix` before it fires, like the original.
 *   <Counter value="18,000+" className="type-xl counter" />
 */
export default function Counter({ value, as: Tag = 'p', className = 'type-xl counter', ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !value) return
    watchDocumentHeight()
    const parsed = parseCounter(value)
    el.textContent = `${parsed.prefix}0${parsed.suffix}`
    const state = { current: 0 }
    const tween = gsap.to(state, {
      current: parsed.targetValue,
      duration: COUNTER.duration,
      ease: COUNTER.ease,
      scrollTrigger: { trigger: el, start: COUNTER.start, toggleActions: COUNTER.toggleActions },
      onUpdate: () => {
        el.textContent = formatCounter(state.current, parsed)
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [value])

  return <Tag ref={ref} className={className} data-counter={value} {...rest} />
}
