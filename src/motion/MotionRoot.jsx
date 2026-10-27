import { LenisProvider } from './LenisProvider.jsx'
import { useReveal } from './useReveal.js'

function RevealScanner({ routeKey }) {
  useReveal(routeKey)
  return null
}

/**
 * Mount once around the whole app. Provides Lenis smooth scroll and the sal-equivalent reveal scanner.
 * Pass `routeKey` (e.g. location.pathname) once a router exists so each page's [data-sal] elements
 * are scanned after client-side navigation.
 */
export default function MotionRoot({ routeKey = 'static', lenisOptions, children }) {
  return (
    <LenisProvider options={lenisOptions}>
      {children}
      <RevealScanner routeKey={routeKey} />
    </LenisProvider>
  )
}
