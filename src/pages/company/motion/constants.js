// Motion values for the company page group (specs/pages-company.md §2.8, §2.13, §4).

// Swiper "slide" effect (CaseStudyCarousel, QuoteCarousel, About mobile Timeline).
// Swiper's wrapper transition uses the CSS default timing function (`ease`).
export const SWIPER_SLIDE = {
  speed: 850, // ms
  easing: 'ease',
  // Swiper touch defaults: a release counts as a swipe when the drag passes 50% of the slide
  // (longSwipesRatio .5) or when it is a short (<300ms) flick past the 5px threshold.
  longSwipesRatio: 0.5,
  shortSwipeMs: 300,
  threshold: 5,
}

// About mobile Timeline: Swiper autoplay { delay: 3500, disableOnInteraction: false }.
// Swiper waits for transitionEnd before restarting the delay, so the period is 3500 + 850 ms.
export const TIMELINE_AUTOPLAY_DELAY = 3500

// About desktop Timeline (GSAP, verbatim from the about chunk): one milestone visible at a time.
export const TIMELINE_LOOP = {
  initial: { opacity: 0, y: 20 },
  inTween: { opacity: 1, x: 10, duration: 0.4 },
  inPosition: '-=0.2',
  outTween: { opacity: 0, x: 20, duration: 0.6, delay: 5 },
  outPosition: '+=0',
  mobileMax: 768, // the loop is skipped when innerWidth <= 768
}
