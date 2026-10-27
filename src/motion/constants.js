// Motion values measured on the live cadmus.io bundle + computed styles (2026-10-27).
// Keep every number here traceable to the original; page builders should not hard-code their own.

// Lenis 1.0.42 options, verbatim from the original layout chunk (ReactLenis root).
export const LENIS_OPTIONS = {
  duration: 1.2,
  orientation: 'vertical',
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 1,
  smoothTouch: false,
}

// Offset used by every in-page "#hash" scroll on the original (lenis.scrollTo(hash, { offset: -85 })).
export const HASH_SCROLL_OFFSET = -85

// sal.js config as resolved on the original (gatsby-plugin-scroll-reveal, options { once: true }).
export const SAL = {
  selector: '[data-sal]',
  animateClassName: 'sal-animate',
  rootMargin: '0% 50%',
  threshold: 0.5,
  once: true,
  enterEventName: 'sal:in',
}

// The original initialises sal in a useEffect after Gatsby hydration, so on a hard load the reveals
// start this long after first paint (measured 360-950ms across 4 cold loads, median ~600ms). In this
// SPA, first paint and mount coincide, so the first scan is deferred by the same amount; on client-side
// route changes the original runs sal immediately, so later scans use 0.
export const SAL_INITIAL_SCAN_DELAY = 600

// GSAP 3.13.0 + ScrollTrigger counter (verbatim from the original Counter component).
export const COUNTER = {
  duration: 1.5,
  ease: 'power2.out',
  start: 'top 88%',
  toggleActions: 'play none none none',
}

// .page--transition: fadeIn 0.5s ease 0.5s forwards on mount; fadeOut 0.5s ease, navigate after 500ms.
export const PAGE_FADE_OUT_MS = 500

// Swiper EffectFade (crossFade: false) defaults used by both homepage carousels.
export const SWIPER_FADE = {
  speed: 300, // ms, Swiper default `speed`; slide transition-timing-function stays CSS `ease`
  easing: 'ease',
  autoplayDelay: 3000, // waits for transitionEnd, so the period between changes is 3000 + 300 ms
}
