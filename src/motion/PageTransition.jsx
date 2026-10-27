import { useEffect, useRef } from 'react'
import { PAGE_FADE_OUT_MS } from './constants.js'
import { scrollToTarget, useLenis } from './LenisProvider.jsx'

const defaultNavigate = (url) => window.location.assign(url)

/**
 * Wraps <main> + <footer> (header stays outside), like the original's `.page--transition`.
 * - On mount / when `routeKey` changes: scrolls to top and plays fadeIn (0.5s ease, 0.5s delay).
 * - Clicking a same-origin <a> without target: fadeOut 0.5s, then onNavigate(url) after 500ms
 *   (pass your router's navigate; default is a full page load). Same-path links do nothing,
 *   "#hash" links on the current page scroll with Lenis (offset -85).
 */
export default function PageTransition({ routeKey, onNavigate = defaultNavigate, children }) {
  const ref = useRef(null)
  const lenis = useLenis()
  const navRef = useRef(onNavigate)
  navRef.current = onNavigate

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [routeKey])

  useEffect(() => {
    let timer
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest?.('a[href]')
      if (!a || a.hasAttribute('target') || a.hasAttribute('download')) return
      const url = new URL(a.getAttribute('href'), window.location.href)
      if (url.origin !== window.location.origin || !/^https?:$/.test(url.protocol)) return
      const samePath = url.pathname.replace(/\/$/, '') === window.location.pathname.replace(/\/$/, '')
      if (samePath && url.hash) {
        e.preventDefault()
        scrollToTarget(lenis, url.hash)
        return
      }
      e.preventDefault()
      if (samePath && url.search === window.location.search) return
      const el = ref.current
      if (el) {
        el.classList.remove('fade--in')
        el.classList.add('fade--out')
      }
      clearTimeout(timer)
      timer = setTimeout(() => navRef.current(url.pathname + url.search + url.hash), PAGE_FADE_OUT_MS)
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      clearTimeout(timer)
    }
  }, [lenis])

  // key -> a fresh element per route, so the fadeIn keyframes restart (the original remounts its layout).
  return (
    <div key={routeKey} ref={ref} className="page--transition fade--in">
      {children}
    </div>
  )
}
