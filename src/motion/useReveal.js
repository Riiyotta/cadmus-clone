import { useEffect } from 'react'
import { SAL, SAL_INITIAL_SCAN_DELAY } from './constants.js'

// sal.js-equivalent scroll reveal, driven by the same markup the original uses:
//   <div data-sal data-sal-delay="300" className="fade--in-up">…</div>
// Visual states (opacity/transform/transition) live in CSS (sal.js/dist/sal.css + .fade--* in index.css);
// this only adds `.sal-animate` once an element is >= 50% inside the viewport (rootMargin '0% 50%'), once.

let firstScanDone = false
let activeScan = null

function createScanner() {
  const revealed = new WeakSet()
  const io = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio < SAL.threshold) return
        const el = entry.target
        el.classList.add(SAL.animateClassName)
        revealed.add(el)
        el.dispatchEvent(new CustomEvent(SAL.enterEventName, { bubbles: true, detail: entry }))
        if (SAL.once) observer.unobserve(el)
      })
    },
    { rootMargin: SAL.rootMargin, threshold: SAL.threshold }
  )

  const observe = (el) => {
    if (!el.classList.contains(SAL.animateClassName)) io.observe(el)
  }
  const scan = (root = document) => root.querySelectorAll(SAL.selector).forEach(observe)

  // Picks up [data-sal] nodes rendered after the scan (lazy sections, async data), and puts back
  // `.sal-animate` if a React re-render rewrites className on an already revealed element.
  const mo = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes') {
        const el = m.target
        if (revealed.has(el) && !el.classList.contains(SAL.animateClassName)) el.classList.add(SAL.animateClassName)
        continue
      }
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return
        if (node.matches(SAL.selector)) observe(node)
        scan(node)
      })
    }
  })
  mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] })

  scan()
  return {
    scan,
    disconnect() {
      io.disconnect()
      mo.disconnect()
    },
  }
}

/** Re-scan the document for new [data-sal] elements (normally automatic). */
export function rescanReveals() {
  activeScan?.scan()
}

/**
 * Mount once (MotionRoot does this). Pass something that changes on client-side navigation
 * (e.g. location.pathname) so the new page's [data-sal] elements are observed, like the original's
 * `useEffect(() => sal(options), [path])`.
 */
export function useReveal(routeKey, { initialDelay = SAL_INITIAL_SCAN_DELAY } = {}) {
  useEffect(() => {
    let scanner = null
    const start = () => {
      firstScanDone = true
      scanner = createScanner()
      activeScan = scanner
    }
    const timer = firstScanDone ? (start(), null) : setTimeout(start, initialDelay)
    return () => {
      clearTimeout(timer)
      scanner?.disconnect()
      if (activeScan === scanner) activeScan = null
    }
  }, [routeKey, initialDelay])
}
