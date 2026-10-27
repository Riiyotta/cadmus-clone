// Product colour schemes (pages-product §0.1) as Tailwind class names, keyed by the page's colorScheme.
//   hero     ProductHero bg + text
//   accent   label chip / StudyPreview bg / QuoteCarousel band / ProductCta bg
//   chip     TwoColumnRows labelClass ('' = default .label light orange)
//   cta      ProductCta bg (Oral: cream)
// 'brand' = the solutions pages (educators / students): maroon hero, orange text (pages-company §2.2).
export const SCHEMES = {
  yellow: { hero: 'bg-product-yellow text-yellow', accent: 'bg-yellow', chip: 'bg-yellow', cta: 'bg-yellow' },
  lavender: { hero: 'bg-product-lavender text-tab-lavender', accent: 'bg-lavender', chip: 'bg-lavender', cta: 'bg-lavender' },
  pink: { hero: 'bg-product-pink text-pink', accent: 'bg-pink', chip: 'bg-pink', cta: 'bg-pink' },
  blue: { hero: 'bg-product-blue text-blue', accent: 'bg-blue', chip: 'bg-blue', cta: 'bg-blue' },
  green: { hero: 'bg-product-green text-tab-green', accent: 'bg-green', chip: 'bg-green', cta: 'bg-green' },
  maroon: { hero: 'bg-product-maroon text-light-orange', accent: 'bg-light-orange', chip: '', cta: 'bg-cream' },
  brand: { hero: 'bg-maroon text-orange', accent: 'bg-orange', chip: '', cta: 'bg-orange' },
}

// CaseStudyCarousel card schemes (pages-company §2.8): card = dark bg, accent = title/quote mark/border/tiles.
// Text-colour versions are included for the accent (title, svg fill) and the dark colour (tile numbers, rules).
export const CASE_SCHEMES = {
  blue: { card: 'bg-case-blue', accent: 'bg-blue', accentText: 'text-blue', accentBorder: 'border-blue', darkText: 'text-case-blue', darkBorder: 'border-case-blue' },
  red: { card: 'bg-case-red', accent: 'bg-orange', accentText: 'text-orange', accentBorder: 'border-orange', darkText: 'text-case-red', darkBorder: 'border-case-red' },
  yellow: { card: 'bg-case-yellow', accent: 'bg-yellow', accentText: 'text-yellow', accentBorder: 'border-yellow', darkText: 'text-case-yellow', darkBorder: 'border-case-yellow' },
  lavender: { card: 'bg-case-lavender', accent: 'bg-lavender', accentText: 'text-lavender', accentBorder: 'border-lavender', darkText: 'text-case-lavender', darkBorder: 'border-case-lavender' },
  green: { card: 'bg-case-green', accent: 'bg-green', accentText: 'text-green', accentBorder: 'border-green', darkText: 'text-case-green', darkBorder: 'border-case-green' },
}
