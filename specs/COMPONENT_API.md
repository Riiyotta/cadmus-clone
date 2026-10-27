# COMPONENT_API — shared building blocks for the page-group builds

Everything below already exists. **Page agents add new files only** (pages in `src/pages/<group>/`, new
sections in `src/sections/` or `src/pages/<group>/sections/`, routes in their own `routes.jsx`). Do not edit
`src/components/*`, `src/sections/*` (from the foundation pass), `src/motion/*`, `src/index.css` or
`tailwind.config.cjs`. Every existing component's defaults reproduce the homepage exactly (regression-checked).

Copy rule: short UI text (headings, labels, buttons, nav, taglines) exactly as in the specs. Long prose
(article bodies, case-study write-ups, policies, testimonials, bios, paragraphs given as "1p/24w") is
**never copied from the live site**: use `PlaceholderProse` / `placeholderText(words)`.

Imports:
```js
import { ProductHero, QuoteCarousel, Cta, ImageCta, QuoteCard, Values,
         PlaceholderProse, placeholderText, parseProse, SCHEMES, CASE_SCHEMES } from '../../sections/index.js'
import { Reveal, Counter, useSwiperFade, useLenis, scrollToTarget } from '../../motion/index.js'
```

---

## 1. Existing components (`src/components/`)

All props optional. "→" = what the spec mapping uses it for.

### Header, Footer, Hero, Intro, ConnectedProducts
No props. Header/Footer are mounted by `App.jsx` on every route (do not render them in pages).
Hero / Intro / ConnectedProducts are homepage-only. The ConnectedProducts tab-strip classes
(`connected-menu`, `menu-item-wrapper`…) can be copied for educators' DeliveryTypes.

### Spacer
| prop | default | notes |
|---|---|---|
| `mobile60` | false | 60px at <=768 (`.m-spacer`) |
| `className` | '' | background / visibility / sheet, e.g. `bg-pure-white`, `bg-offwhite`, `bg-cream`, `m:hidden`, or universities' sheet spacer `relative z-2 -mt-[40px] rounded-t-sheet bg-cream` |

### ImageCard (layout primitive used by Careers, CaseStudy, ConnectedProducts)
| prop | default | notes |
|---|---|---|
| `src`, `alt` | – | image |
| `flipped` | false | image left (mr-130), card bottom-right |
| `wrapperClass` | '' | e.g. `max-w-[1200px]` |
| `imageClass` | '' | e.g. `bg-placeholder` |
| `ratio` | `'2.6/1'` | `'2/1'` for Oral |
| `cardClass` | `'max-w-[650px]'` | free-form classes in the card max-width slot (Oral `max-w-[550px]`; extra overrides allowed) |
| `children` | – | card content (flex-col gap-20) |

### Careers (generic image-card **section**)
Homepage default: light-orange sheet, flipped, "Careers" overline, h5, Learn more → /careers/.
| prop | default | → |
|---|---|---|
| `image` | homepage screenshot | about: `/assets/1754472361-cadmus-event-june-2025-467-copy.jpg` |
| `bg` | `bg-light-orange` | about Mission `bg-cream`; Oral `bg-orange` / `bg-light-orange`; educators ExpertList (see note) |
| `flipped` | true | about Mission / Oral: false |
| `ratio`, `cardClass` | ImageCard defaults | Oral: `ratio="2/1" cardClass="max-w-[550px]"` |
| `overline` | `'Careers'` | `null` to omit |
| `title`, `titleClass` | homepage h5 / `type-h5 [text-wrap:balance]` | h4 variants: `type-h4 [text-wrap:balance]` |
| `paragraphs` | – | string[]/nodes in `div.f-16 flex-col gap-20` |
| `button` | `{text:'Learn more', href:'/careers/'}` | `null` to omit |
| `children` | – | extra card content before the button (e.g. ExpertList `ul`) |
| `module` | `'ImageCard'` | data-module |
Note: educators ExpertList has an extra centred h5 + `max-1300` wrapper around the image card; build that
section yourself with `<ImageCard flipped wrapperClass="w-full">` inside your own wrapper.

### CaseStudy (§14)
| prop | default |
|---|---|
| `image` | Manchester screenshot |
| `title` | 'The University of Manchester' (node allowed: overview `<>The University<br />of Manchester</>`) |
| `tags` | ['student success','hybrid learning'] |
| `body` | homepage paragraph (node) |
| `link` | `{text:'Read the full Case Study', href:'/study/case-study-the-university-of-manchester/'}` |
| `statsTitle`, `stats` | 'High student experience…', [['89%',…],['+17.6%',…],['96.31%',…]] |
| `quote` | `{}` → QuoteCard props `{ quote, author, role }` (overview: different quote + role) |
| `cta` | `{}` → ImageCta props `{ title, buttons, image }` |

### Chronicle (§16) + `NewsCard`
| prop | default | → |
|---|---|---|
| `title` | 'The Cadmus Chronicle' | |
| `subtitle` | – | Oral subtitle |
| `items` | homepage 3 news | `[{ title, href, image, tags?, excerpt?, author?, date? }]` |
| `columns` | 3 | 2 → max-1100, 2 cols, odd last tile centred (`.chronicles-center-last`), 1 col <=990 |
| `bg` | `bg-cream` | Oral `bg-light-orange` |
| `button` | `{text:'See more', href:'/news/'}` | `{…, solid:true}` → `a.button`; `null` to omit |
| `zoom` | false | image hover scale 1.015 |
`import Chronicle, { NewsCard } from '…/components/Chronicle.jsx'` —
`<NewsCard title href image tags excerpt author date zoom />` is the listing "news" card (pages-content N3/N9).
Without the optional props it is exactly the homepage tile. With them: tags row (`p.tag`), h3.h6 mb20,
excerpt mb20, author (py6) + date (opacity .5) pushed to the bottom (`mt-auto`, card `h-full`).

### Experience (§4)
| prop | default | → |
|---|---|---|
| `title` | homepage | |
| `video` | `/assets/experience.mp4` | |
| `variant` | 'default' | `'overview'` = product "Overview": cream sheet (-40, r32), centred h4, optional subtitle, full-width image |
| `image`, `subtitle` | – | overview only |

### FeaturedVideo (§10)
`vimeo`, `thumbnail`, `title`, `tagline`, `button` ({text,href} | null). The click-to-play pattern is reused
(copied) by the ROI video section.

### ImpactCounter (§7)
| prop | default | → |
|---|---|---|
| `stats` | 7m / 18,000+ / 25m+ | `[[value,label],…]` (GSAP count-up via `Counter`) |
| `label` | – (40px empty spacer) | 'Our Impact so far' (p.text-heading mb40 mt20) |
| `layout` | 'spaced' | 'row' = careers 4-stat flex row (max-1600, gap 40, pb40, column <=768) |
| `bg` | `bg-pure-white` | about/careers `bg-orange` |
| `zIndex` | `z-2` | about `z-auto` |
| `className` | '' | about `m:pt-[40px]`, careers `pb-[40px]` |

### Integrations (§13)
`title` (node allowed for ⏎ breaks), `body`, `tiles` (default 6 tiles; exported as `TILES`).

### LogoMarquee (§8)
| prop | default | → |
|---|---|---|
| `title` | 'Join The World’s Leading Universities' | |
| `titleClass` | '' | universities `font-medium` (weight 500) |
| `logos` | homepage 24 (exported `LOGOS`) | `[[file, href?],…]`; file is a name in `/assets/` or an absolute `/…` path; no href → `href=""` |
| `bg` | `bg-pure-white` | `bg-cream`, `bg-orange`, `bg-light-orange` |

### RoiCard (§9) + `StatCard`
| prop | default | → |
|---|---|---|
| `bare` | false | universities: only the `image-card-wrapper` block, no section / spacers / -mt / z-3 |
| `image`, `stat {number,label}`, `title`, `body` (node), `button {text,href}` | homepage | |
`import RoiCard, { StatCard } from '…/components/RoiCard.jsx'` —
`<StatCard number label tone="orange|blue" position="…" mobile="…" />`: the glass stat card; `tone="blue"`
gives the ROI page's `#E0F0FF` inner; `position`/`mobile` are the positioning classes.

### SolutionCards (§12)
| prop | default | → |
|---|---|---|
| `title`, `subtitle` | homepage | pricing: 'Here to help, every step of the way', `subtitle={null}` |
| `cards` | homepage 3 (exported `CARDS`) | `[{image,title,body?,href?}]`; no `href` → no Learn more row |
| `sheet` | false | pricing true (cream sheet -40 r32) |
| `variant` | 'default' | `'support'` = students SupportCards (§2.11): h5 + f-16 subtitle, bg-card p20 cards, 1:1 image, divider, right-aligned link |
| `linkText` | 'Learn more' | |

### TwoColumnRows (§11)
| prop | default | → |
|---|---|---|
| `rows` | homepage 4 | `[{ image, title, body? | paragraphs?, label?, iconTag?{icon,text}, quote?{text,author}, button?{text,href} }]` |
| `labelClass` | '' (light-orange chip) | product scheme chip, e.g. `SCHEMES.yellow.chip` |
| `startFlipped` | true | about: false |
| `rowGap` | 0 | about: 60 |
| `heading` | – | Oral "Phase 1…" / "Phase 2…" h4 block |
| `container` | 'sheet' | product-overview: 'flat' (no -40 / radius) |
| `standalone` | false | careers / contact single row rendered directly as a main child |
Motion is built in (`.fade--up` / `.fade--up.reverse` + `data-sal` on the title and body blocks).

### WhyChoose (§6)
| prop | default | → |
|---|---|---|
| `title`, `items` | homepage | company pages: `[{icon,text}]` (4) |
| `variant` | 'default' | `'feature'` = product feature grid (centred h5/h4 in mb80/mt40 block, cards icon+f-18 AT Realm title+serif body, mb80) |
| `titleClass` | `type-h5` | feature: Oral/overview `type-h4` |
| `columns` | 3 | feature: Oral 4 |
| `maxWidth` | `max-w-[1200px]` | feature: Oral/overview `max-w-[1400px]` |
| `iconTop` | true | feature: overview false (no mt10) |
| `bare` | false | feature inside ProductHighlight |
| `spacer` | true | trailing Spacer(100) |
| `className` | '' | |

**ProductHighlight composition** (product pages; build in your page, no new component needed):
```jsx
<div className="relative -mt-[40px] flex flex-col rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
  <WhyChoose variant="feature" bare title={…} items={[{ icon, title, text: placeholderText(15) }, …]} />
  <ImageCta variant="split" title={…} body={placeholderText(25)} image="…"
    buttons={[{ text: 'Explore the platform', href: '/product-overview', style: 'solid' },
              { text: 'Book a demo', href: '/request-demo', style: 'outline' }]} />   {/* Oral: <ImageCta variant="split" empty /> */}
</div>
```
Measured in a harness: @1440 grid cols 386.7, split grid 1360x515, image 630x435; @1280 image 550x380;
@390 buttons wrap to 173x56. Height is 1049 vs 1068 live with 2-line card bodies (real copy wraps to 3).

---

## 2. Shared sections (`src/sections/`)

None have scroll reveals (the spec says static); hovers come from the global button classes.

### ProductHero — pages-product N1, pages-company §2.2
`scheme` ('yellow'|'lavender'|'pink'|'blue'|'green'|'maroon' product; 'brand' = solutions maroon/orange),
`overline`, `title` (node ok), `body`, `image`, `imageAlt`. Verified @1440 Assignments: hero 920, row
[40,250,1360,470], text [75,337,600,295], image [730,250,670,470]; @1280 820 / [650,228,590,414];
@390 864, row [20,115,350,551], h1 30/33.

### QuoteCarousel — pages-product N3, pages-company §2.7
`title` ('' keeps the empty block — students), `quote`, `author`, `role`, `image`, `bg` ('' product,
`bg-tab-lavender` Exams, `bg-cream` educators, `bg-light-orange` students), `band` (scheme accent /
`bg-orange`). One static slide (every live page has exactly one; arrows are locked/hidden). Verified @1440
707 tall, card 1200x480, image 440, quote column 660; @1280 643, 1040x416, 376; @390 image 310x174 (16:9).

### Cta — company §2.3 Cta and product N4 ProductCta (same markup)
`title`, `body`, `buttons` ([{text,href,style:'solid'|'outline'}], default Book a demo → /request-demo +
Get a free trial → /contact), `bg` (`bg-orange` default; product `SCHEMES[s].cta`). Verified @1440 513.8,
content 1100x233.8; @1280 same. Careers: `buttons={[{ text: 'Join our talent pool', href: '/contact', style: 'solid' }]}`.

### ImageCta — CaseStudy part C, extracted
`variant`: 'case-study' (homepage) | 'section' (CtaWithImage on /news, /case-studies, /teacher-guides:
orange sheet, Spacer before+after, max-1400) | 'split' (ProductHighlight split; `empty` → Oral's 100px
block). Props `title`, `body` (split), `buttons` ([{text,href,style,newTab}]; default both newTab like the
original), `image`, `bg` (section). Verified 'section' @1440 794.6 (grid 1360x515), @1280 734.3, @390 649.9.
For /news and /teacher-guides the second button is "Get a free trial" → `/` (per spec).

### QuoteCard — CaseStudy part B, extracted
`variant`: 'case-study' (homepage strip) | 'article' (rich-text Quote block; `colour` orange|blue|pink|green
background PNGs; author block omitted when `author=""`; role at opacity .8) | 'banner' (ROI navy quote
section, pattern SVG, 32/40 quote). Props `quote`, `author`, `role`, `colour`. Defaults are the homepage
quote, so pass `author=""` for author-less article quotes. Verified: article 22-word quote, no author
272.5 tall (spec 272); banner @1440 487, @1280 527.

### Values — pages-company §2.4 (about, careers, trust x2; not used by product/content)
`title`, `intro`, `items` [{icon,title,text}], `bg`, `zIndex` ('z-auto' default; trust 'z-2'), `overlap`
(careers false). Verified (about, 6 items) @1440/1280 744.3, @390 1411.6. Rhythm (title mt40, grid mt80 /
40 <=768, trailing Spacer) is inferred from totals; re-check trust/careers heights.

### PlaceholderProse (+ `placeholderText`, `parseProse`)
```jsx
<div className="mx-auto flex max-w-[1400px] flex-col gap-[20px] p-[20px] m:p-0">
  <PlaceholderProse
    blocks="p(43) p(9) p(77) h2(6) p(17) p(55) · QUOTE[orange, 22w] · p(44) h3(6 strong) ul(3: 23/21/23) p(60 a) p(empty)"
    columnClassName="article--content f-16 m:text-[14px] mx-auto flex w-full max-w-[950px] flex-col gap-[20px]" />
</div>
```
- `blocks`: the specs' notation string (pages-content §5) or `[{type:'p'|'h2'|'h3'|'h4'|'ul'|'ol'|'quote', words, items, strong, em, link, colour, author, role}]`.
- `columnClassName`: wraps runs of text in the reading column; QUOTE blocks render between runs at full width
  (QuoteCard 'article'). Without it everything renders flat (wrap it yourself).
- `className`: wrap everything in one div. `seed`: vary words between sections.
- `placeholderText(words, seed)` → string of exactly `words` words (sentence-cased) for props such as
  TwoColumnRows `paragraphs`, testimonial quotes, bios, Values text, FAQ answers.
- Deterministic output. Empty `p(empty)` renders an empty `<p>` (still takes the 20px flex gap, like live).

### schemes.js
`SCHEMES[scheme] = { hero, accent, chip, cta }` (product + 'brand'); `CASE_SCHEMES[scheme] = { card,
accent, accentText, accentBorder, darkText, darkBorder }` for the universities CaseStudyCarousel.

---

## 3. Motion API (`src/motion/`, mounted once in App.jsx)

- **Reveals (sal.js equivalent)**: write the original markup — `<div data-sal="" data-sal-delay="500" className="fade--in-up">`
  — or `<Reveal variant="fade--in-up" delay={500}>`. Variants: `fade--in-up` (+`fast`), `fade--up`
  (+`reverse`), `fade--in`, `logo--peel`. Threshold .5, once. Scanned automatically per route (incl. late
  renders). Delays/durations must be multiples of 50. PhaseRelease's sal `fade` (opacity, 0.2s) uses sal.css:
  `data-sal="fade"`.
- **Counter**: `<Counter value="610,000+" className="type-xl counter" />` (GSAP count-up, top 88%, 1.5s power2.out).
- **useSwiperFade(count, {loop, autoplay, speed, delay})** → `{active, goTo, next, prev, slideStyle(i)}` (fade carousels).
  No slide-effect carousel exists yet (CaseStudyCarousel / mobile Timeline need one; speed 850).
- **Lenis**: `useLenis()`; `scrollToTarget(lenis, '#positions')` (offset -85). In-page `<a href="#id">` links
  are handled automatically by PageTransition.
- **PageTransition**: internal `<a>` clicks fade out 0.5s then navigate; external/`target` links untouched.
- Constants: `LENIS_OPTIONS`, `SAL`, `COUNTER`, `SWIPER_FADE`, `HASH_SCROLL_OFFSET`, `PAGE_FADE_OUT_MS`.
- Remember: Tailwind's running dev server only picks up **new files** after `tailwind.config.cjs` is touched
  (`touch tailwind.config.cjs`); `npm run build` is unaffected.

---

## 4. Tokens (`tailwind.config.cjs`, `src/index.css`)

Screens (desktop-first): `w18` <=1800, `t` <=1600, `w15` <=1500, `lgm` <=990, `m` <=768, `dk` >=991.

Colours (use as `bg-*`, `text-*`, `border-*`; no raw hex in JSX):
- Homepage: `ink cream offwhite pure-white maroon orange light-orange pale-yellow yellow pink blue lavender green tab-yellow tab-lavender tab-pink tab-green tab-blue vellum footer-text warm-white placeholder divider selection glass glass-border`
- Product hero bgs: `product-yellow #3E2E2C`, `product-lavender #262258`, `product-pink #820049`, `product-blue #123D69`, `product-green #455017`, `product-maroon #87160D`. Hero text: yellow / tab-lavender / pink / blue / tab-green / light-orange.
- CaseStudyCarousel cards: `case-blue case-red case-yellow case-lavender case-green` (accents: blue, orange, yellow, lavender, green).
- ROI: `navy #123D69`, `roi-pale #E0F0FF`, `roi-badge-border #5A9CE0`, `roi-quote-line`, `play-white`.
- Forms: `form-border #D0D5DD`, `form-placeholder #667085`, `form-icon #6B7280` (ROI form border = `vellum`).
- Content: `tag-border`, `ul-link`, `share-bg #ECE6DF`, `backdrop rgba(0,0,0,.4)`, `accordion-icon`, notes `note-{blue|pink|orange|green}`, `note-*-icon-bg`, `note-*-icon`.
Fonts: `font-serif` (AT Realm Book), `font-sans` (Inter), `font-stix` (STIX Two Text italic, `/fonts/STIXTwoText-Italic.woff2`).
Radii: `rounded-sheet 32`, `card 12`, `img 8`, `btn 4`, `glass 16`, `photo 10`, `badge 5`, `checkbox 3`, `icon 2`.
Shadows: `shadow-card`, `bar`, `tag`, `input`, `input-focus`, `roi-image`, `glass-lg`, `badge`, `play`.
z-index: `z-2 z-3 z-4 z-10 z-11 z-998 z-999` (+ Tailwind defaults).

Type classes (index.css): `type-h0` (90/1, 42 <=980), `type-h1` (65), `type-h2` (58/1.1, 42), `type-h3`
(44/1.1, 38 <=990), `type-h4` (38), `type-h5` (30), `type-h6` (22), `type-h7` (20/1.25), `type-xl`,
`type-serif`, `type-italic` (STIX 22/30.8), `f-italic`, `f-20`, `f-18`, `f-16`, `f-14-lh15`, `f-13`, `f-12`,
`text-heading`, `sm-heading`, `text-sm-heading`, `text-xs-heading`, `label` (+ any `bg-*` for scheme chips;
`label clear`), `at-realm`, `with-bold`. Mobile size overrides (<=768, line-height ratio kept):
`m-fs-36 m-fs-30 m-fs-24 m-fs-18 m-fs-16 m-fs-14` (= original `.m-36` etc.; renamed because Tailwind's `m-14/m-16/m-36` are margins).

Global classes (index.css; exact original CSS): buttons `button`, `button header-button`, `arrow-button`
(+ `transparent`, `transparent white`, `black`, `orange`, `down` (+`active`), `previous`), `roi-button`
(+ `roi-button--dark`, `--light`, `--outline`); links `hover-wh`, `hover-ma`, `hover-or`, `ul-link`;
`image--zoom` + `bg-image`; `marker` (+ `.highlight:nth-child` colours); `tag` (+`active`);
`quote-author`, `quote-icon`, `quote-prev/quote-next`, `quote--wrapper {orange|blue|pink|green}`,
`roi-quote-author`; lists: global `ul` (flex-col gap 15, ml 20, disc), `ul.two-col`, `list-wrapper`,
`bullet-point`, `article--content`, `privacy-content`; grids: `chronicles-center-last`, `with-divider`;
accordions: `accordion` (+`active`, `.title`, `.content`), `accordion-icon` (plus/minus), `accordion--wrapper`
(+`.inner`), `m-accordion`, `accordion--arrow`; icons: `share-icon {facebook|linkedin|twitter|download}`,
`video-play`, `timeline`, `carousel-nav` (+`--prev/--next`), `contact-form-close`, `with--play`;
notes `note--wrapper {blue|pink|orange|green}` (+ `.pin` svg); forms `contact-form` (`.form-grid`,
`.textarea-wrapper`, `.input-wrapper`, `.select-container`), `contact-input`, `contact-textarea`,
`custom-checkbox`, `thank-you-overlay` (+`active`, `.thank-you-content`, `.thank-you-image`),
`contact-form-container`.

---

## 5. Assets

- Images, SVG icons, videos, PDFs: `public/assets/<datocms-filename>` → `src="/assets/<file>"`.
- `specs/asset-map.tsv`: original URL → local path → status (`ok` downloaded, `skip` already present,
  `FAIL` = the bare base URL row only). Look up a file by its Dato name (e.g. `1752725540-frame-1073715354.png`).
- Site statics are local too: `/assets/quote-{orange,blue,pink,green}-….png`, `/assets/news-28b7….svg`,
  `/assets/videos-6577….svg`, `/assets/thanks-c7f6….svg`, `/assets/timeline-b8dd….svg`,
  `/assets/roi-quote-pattern.svg`, `/assets/1771209273-cadmus-roi-nous-final-report-february-2026.pdf`.
- Data-URI icons are CSS variables in `src/index.css` (`--svg-*`) behind the classes above.
- Fonts: `public/fonts/` (AT-Realm-Book, Inter-var, STIXTwoText-Italic).
