import { createContext, useContext, useEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { HASH_SCROLL_OFFSET, LENIS_OPTIONS } from './constants.js'

const LenisContext = createContext(null)

/** Mount once at the app root. Smooth-scrolls the window exactly like the original `ReactLenis root`. */
export function LenisProvider({ children, options }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const instance = new Lenis({ ...LENIS_OPTIONS, ...options })
    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })
    setLenis(instance)
    if (import.meta.env.DEV) window.__lenis = instance // QA scripts
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      if (import.meta.env.DEV && window.__lenis === instance) delete window.__lenis
      setLenis(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** The Lenis instance (null until mounted). */
export function useLenis() {
  return useContext(LenisContext)
}

/** Scroll to "#id" (or an element) the way the original's hash links do: Lenis, offset -85px. */
export function scrollToTarget(lenis, target, opts = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: HASH_SCROLL_OFFSET, ...opts })
  else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + HASH_SCROLL_OFFSET })
}
