Source: https://cadmus.io/

# CLONE SPEC — cadmus.io homepage (`/`)

Measured live on 2026-10-27 with Playwright (Chromium) at **1440x900**, **1280x800** and **390x844**, using `getComputedStyle`/`getBoundingClientRect`, the live CSSOM (all rules dumped), the Gatsby page-data JSON (`/page-data/index/page-data.json`, used for the full copy), and the live JS bundles (component source, which gives exact class names, animation config and behaviour). Assets: see `ASSET_MANIFEST.md` (same folder).

Original stack, for reference: Gatsby (React) + DatoCMS. Hand-written utility CSS (not Tailwind). Libraries in use: **Lenis 1.0.42** (smooth scroll, via `@studio-freight/react-lenis` `ReactLenis root`), **sal.js** (scroll reveals via IntersectionObserver), **Swiper** (two fade carousels, modules EffectFade + Autoplay), **GSAP 3 + ScrollTrigger** (only for the number counters; bundled, not exposed on `window`), `gatsby-plugin-image`. No framer-motion, no Lottie, no AOS.
Third-party: Google Analytics gtag `G-NX12WV0Y3D`, Marker.io widget, Vimeo player. These do not need to be cloned.

Coordinates below are `[x, y(page), width, height]` in CSS px.

---

## 0. Global

### 0.1 Breakpoints used by the original CSS (all `max-width` unless noted)
| Breakpoint | What changes |
|---|---|
| `max-width: 1800px` | hero card row `max-width` 1300 -> 1100 |
| `max-width: 1600px` | hero `min-height` becomes `calc(20px + 100svh)` (otherwise `100svh`); `.t-mt0`/`.t-p0` zero the hero-card spacing |
| `max-width: 1500px` | hero card row `max-width` -> 1000 |
| `min-width: 991px` | Featured-video overlap trick (`margin-top:-25vh; padding-top:21vh`) only applies at >= 991 |
| `max-width: 990px` (also 991, 980) | heading sizes drop (h1/h2 42, h4 26, h5 24, text-xl 60, .h0 42); `grid-4`, `grid-2`, `two-columns`, `spaced-grid` -> 1 column; image cards switch to stacked layout; menu-item padding 20; ROI card padding 24 |
| `max-width: 768px` | `.p40` -> 20px padding; `.m-*` utilities activate (m-hide/m-show, m-p20, m-grid-2...); `grid-3` -> 1 col; nav links hidden, hamburger shown; hero cards `scale(1.15)`; buttons padding `7.5px 20px` |

Tailwind mapping suggestion: add custom screens `t:{max:'1600px'}`, `lg-:{max:'990px'}`, `m:{max:'768px'}` (desktop-first, like the original).

### 0.2 Color tokens (computed)
| Token (orig class) | Value |
|---|---|
| ink / body text `.black` | `#04191F` rgb(4,25,31) |
| cream page bg `.bg-white` / body | `#FCF7EF` rgb(252,247,239) |
| off-white card `.bg-light-grey`, header bar, dropdown, `.bg-card` | `#FFFDFA` rgb(255,253,250) |
| pure white `.bg-pure-white` | `#FFFFFF` |
| maroon `.bg-maroon` `.red` `.bg-ruby` | `#580C1D` rgb(88,12,29) |
| orange `.bg-orange` `.orange` | `#FFC8AE` rgb(255,200,174) |
| light orange `.bg-light-orange` / `.label` chip | `#FFE7DB` rgb(255,231,219) |
| pale yellow `.bg-pale-yellow` | `#FFF5D4` |
| yellow | `#FFE388` |
| pink | `#FFC3F0` |
| blue | `#B6DBFF` |
| lavender | `#C5C5FF` |
| green | `#D1E375` |
| vellum (dividers, dashed borders) | `#CFC0B0` rgb(207,192,176) |
| footer text `.white-100` | `rgba(246,243,238,0.8)` |
| `.white` | `#F7F4F0` |
| image placeholder `.bg-grey` | `rgba(0,0,0,0.1)` |
| marquee / menu dividers | `rgba(22,19,19,0.376)` (= `#16131360`) |
| text selection | bg `#D2FD78`, color `#000` |
| ROI stat glass card bg | `rgba(246,243,238,0.5)`, border `0.85px solid #FCFBF9` |

Connected-products palette (hard-coded in component, keyed by product colour):
| key | section bg | active tab bg |
|---|---|---|
| yellow (Assignments) | `#FFF5D4` | `#FFE388` |
| lavender (Exams) | `#E8E8FF` | `#C5C5FF` |
| pink (Group Work) | `#FFE8FB` | `#FFC3F0` |
| green (Feedback & Marking) | `#F0F5D5` | `#D1E375` |
| blue (Learning Assurance Analytics) | `#E0F0FF` | `#B6DBFF` |

No gradients are used anywhere on the homepage (verified: every section/box `background-image` is `none` except CSS data-URI icons).

### 0.3 Radii, shadows, filters
- Section "sheet" top radius: `border-radius: 32px 32px 0 0` (`.br-t-32`).
- Cards / header bar / dropdown / quote card: `12px`. Images & small cards: `8px`. Buttons / tabs / tags: `4px`.
- Card shadow (`.bg-card`, `.floating-content-card`, `.box-shadow`): `rgba(207,192,176,0.12) 1px 8px 12px 0px`.
- Header bar + dropdown shadow: `rgba(209,189,173,0.15) 1px 8px 12px 0px`.
- `.icon-tag` shadow: `rgba(207,192,176,0.36) 0 0 1px, rgba(207,192,176,0.15) 0 1px 3px`.
- `backdrop-filter: blur(1px)` on `.floating-content-card` and ROI stat card.

### 0.4 Section stacking pattern (important for fidelity)
Almost every section is `position:relative; z-index:2; margin-top:-40px; border-radius:32px 32px 0 0` with its own background, so each section's rounded top overlaps the previous one by 40px ("stacked sheets"). Exceptions are noted per section. A `Spacer` component (`<div class="spacer">`, `height:100px`; `.m-spacer` variant is 60px at <=768) is used inside several sections.

### 0.5 Fonts
| Family | Use | Weights actually used | Source |
|---|---|---|---|
| **"AT Realm Book"** (display serif) | all headings `.h1–.h7`, `.text-xl`, `.serif`, ROI stat number | 400 | `https://cadmus.io/static/AT-Realm-Book-1f33be29df80c47da6c46f50ba24502a.woff2` (+ `.woff` `AT-Realm-Book-10300756a8de1f05ea6710aa023d1ce8.woff`), `font-display: swap`. Fallback in CSS: none (declared as `font-family:"AT Realm Book"`; ROI number uses `"AT Realm Book", serif`) — use `"AT Realm Book", Georgia, serif` |
| **Inter** (variable, opsz 14–32, wght 100–900) | body, nav, buttons, labels | 400, 500, 700 (`<strong>`) | Google Fonts `https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap`; loaded file: `https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwYZ8UA3.woff2` (latin). Stack: `Inter, sans-serif` |
| "AT Realm" 400/500 | declared (`AT-Realm-Regular-e6c57d5a...woff2`, `AT-Realm-Medium-91c136af...woff2`) but **not loaded/used** on homepage | – | skip |
| "STIX Two Text" | @imported but **unused** on homepage | – | skip |

Global text rendering: `-webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; font-synthesis: none`.

### 0.6 Typography roles (computed; desktop -> <=990/768)
| Role (class) | Family | Size / line-height | Letter-spacing | Weight | Transform | Mobile (390) |
|---|---|---|---|---|---|---|
| Body (`body`) | Inter | 14px / 1.4 (19.6px) | normal | 400 | – | same |
| H1 hero (`h1.h1`) | AT Realm Book | 65px / 1.1 (71.5px) | normal | 400 | – | 42px / 46.2px |
| `.h4` (most section titles) | AT Realm Book | 38px / 1.15 (43.7px) | -0.0015em (-0.057px) | 400 | – | 26px / 29.9px |
| `.h5` | AT Realm Book | 30px / 1.25 (37.5px) | -0.0015em (-0.045px) | 400 | – | 24px / 30px |
| `.h6` (card titles, news titles) | AT Realm Book | 22px / 1.25 (27.5px) | -0.0015em (-0.033px) | 400 | – | same |
| `.text-xl` (counters) | AT Realm Book | 72px / 1 | -0.02em (-1.44px) | 400 | – | 60px / 60px |
| `.serif` small (Why cards) | AT Realm Book | 14px / 19.6px | normal | 400 | – | same |
| ROI stat number `.roi-hero__stat-number` | AT Realm Book | 64px / 72px | -0.01em | 400 | – | 40px / 50px (<=768) |
| ROI card title (`.roi-module-light .h4`) | AT Realm Book | 38px / 43.7px | -0.057px | 400 | – | 24px / 30px, ls -0.01em (<=990) |
| `.f-18` lead | Inter | 18px / 25.2px | normal | 400 | – | same |
| `.f-16` / `.text-lg` body | Inter | 16px / 22.4px | normal | 400 | – | TwoColumns body 14px (`.m-14`) |
| `.f-14 .lh-15` | Inter | 14px / 21px | normal | 400 | – | same |
| `.f-13` footer | Inter | 13px / 18.2px | normal | 400 | – | same |
| `.f-12` stat captions | Inter | 12px / 16.8px | normal | 400 | uppercase | same |
| `.text-heading` (eyebrows, counter labels, marquee title) | Inter | 13px / 1 (13px) | 0.1em (1.3px) | 400 | uppercase | same |
| `.sm-heading` (tab labels) | Inter | 14px / 1.3 (18.2px) | 0.02em (0.28px) | 400 | uppercase | same |
| `.icon-tag .sm-heading` (hero card tag) | Inter | 12px / 15.6px | 0.24px | 400 | uppercase | **8px** (`!important`, <=990) |
| `.text-sm-heading` (overline "Careers") | Inter | 14px / 19.6px | 0.05em (0.7px) | 400 | uppercase | same |
| `.text-xs-heading` (footer col labels, case-study tags) | Inter | 13px / 18.2px | 0.05em (0.65px) | 400 | uppercase | same |
| `.label` chip (dropdown/mobile menu headings) | Inter | 13px / 0.7 (9.1px) | 0.05em | 500 | uppercase | same |
| ROI stat label | Inter | 16px / 1.3 (20.8px) | 0.05em (0.8px) | 400 | uppercase | same |
| Nav buttons | Inter | 14px / 19.6px | normal | 400 | – | (hidden) |
| Buttons `.button`, `.arrow-button` | Inter | 14px / 19.6px | normal | 400 (header button 500) | – | same |
| `.roi-button` | Inter | 16px / 18px | normal | 400 | – | same |

`white-space: break-spaces` on intro/experience/cards titles (`.white-space`). `text-wrap: balance` on `.balance` (hero text block, card titles, Why grid, CTA).

### 0.7 Buttons & link hover states (exact CSS)
- `.button` (solid ink): `display:flex; align-items:center; justify-content:center; gap:10px; padding:10px 20px; border:0.8px solid #04191F; border-radius:4px; background:#04191F; color:#FCF7EF; font-size:14px; transition: all 0.3s` (ease). **Hover**: `background:transparent; color:#04191F` (border stays). Height measured 41px. <=768: `padding:7.5px 20px`.
- `.button.header-button` ("Book a demo" in nav): `background:#580C1D; font-weight:500; padding:10px 20px`. **Hover**: `background:#04191F; color:#FCF7EF`. (Chromium renders the 0.8px border as 0.5px at DPR1.)
- `.arrow-button` (outline): same box as `.button` but `border:0.8px solid currentColor; background:none; color:inherit`; `::after` = arrow SVG (data-URI, see manifest), `width:30px; aspect-ratio:2.31/1` (30x12.98), `transition: filter .3s`. **Hover**: `background:#04191F; border-color:#04191F; color:#FCF7EF`, arrow recoloured to cream via `filter: brightness(0) saturate(100%) invert(89%) sepia(24%) saturate(200%) hue-rotate(323deg) brightness(108%) contrast(98%)`. Measured: "Learn more" 157x41, "See more" 144x41, "Get a free trial" 175x41.
- `.arrow-button.transparent` (text link + arrow): no border, padding 0. **Hover**: arrow `transform: translateX(10px)` with `transition: transform .3s`; colours unchanged.
- `.roi-button.roi-button--dark`: `inline-flex; gap:12px; padding:9px 24px; border:1px solid #04191F; border-radius:4px; background:#04191F; color:#FFFDFA; font:16px/18px Inter; transition: opacity .2s`. **Hover**: `opacity:.85`. Measured 197x38.
- `.hover-wh` (footer links): `transition: color .3s`, hover `color:#FFFFFF`.
- `.hover-ma` (dropdown links): `transition: color .3s`, hover `color:#580C1D`.
- `.mobile-menu-link:hover`: `opacity:.7` (no transition declared).
- `.connected-menu .menu-item`: `transition: background-color .3s` (no hover rule; only `.active`).
- Cards, news tiles, logos: **no hover effects** on the homepage (no matching rules).

### 0.8 Global motion
- **Smooth scroll (Lenis 1.0.42)**: `ReactLenis root` options `{ duration: 1.2, orientation: 'vertical', easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, wheelMultiplier: 1, smoothTouch: false }`. `<html class="lenis lenis-smooth">`. The connected-products tab strip has `data-lenis-prevent` (native horizontal scroll). Internal `#hash` links scroll via `lenis.scrollTo(hash, {offset:-85})`.
- **Page fade-in**: `main` + `footer` are wrapped in `.page--transition` (header is outside it). On load: `opacity:0` -> `animation: fadeIn 0.5s ease 0.5s forwards` (0->1). On internal link click: `fadeOut 0.5s ease forwards` then navigate after 500ms (only relevant if you clone navigation).
- **sal.js scroll reveals** — config: `{ threshold: 0.5, rootMargin: '0% 50%', once: true, animateClassName: 'sal-animate', selector: '[data-sal]' }` (element must be 50% visible; animates once). Classes:
  - `.fade--in-up`: from `opacity:0; transform: translateY(20px)` -> `opacity:1; transform:none`; `transition: all 0.65s ease`; delay = `data-sal-delay` (ms). `.fade--in-up.fast` starts at `translateY(30px)` (15px at <=768).
  - `.fade--up`: from `opacity:0; transform: translateX(-20px)`; `.fade--up.reverse` from `translateX(20px)`; `transition: all 0.65s ease 0.2s`.
  - `.logo--peel` (footer wordmark): child starts `translateY(100%)` inside `overflow:hidden`, -> `none`; `transition: transform 0.75s ease 0.2s`.
  - Only 15 elements on the page use sal (listed per section below).
- **Counters (GSAP)**: each number animates from 0 to its value: `gsap.to(obj, { current: target, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' } })`. Text formatting: keeps prefix (non-digits before number) and suffix (non-digits after); suffix containing `k`/`m`/`b` multiplies target by 1e3/1e6/1e9 and displays `(value/1e6).toFixed(decimals)+suffix`; preserves decimal places of the source; if no k/m/b suffix and value >= 1000 uses `toLocaleString()` (e.g. `18,000+`). Initial text is `prefix + "0" + suffix` (e.g. `0m`, `0+`, `0m+`, `0%`, `+0%`).

---

## 1. Header / Navbar (`header.masthead`)

Structure: `header.masthead` (fixed) > `.header--bar` > `.flex.p12.space-between.align-center.gap-20` > [logo link] [nav buttons] [CTA / hamburger]; mobile menu (`.menu-wrapper`) sits inside `.header--bar` below that row. Dropdown panels are rendered as a sibling of `header` (also fixed).

- `header`: `position:fixed; top:0; left:0; width:100%; z-index:11; background:transparent`. Height 105 at desktop (20 margin + 65 bar + 20).
- `.header--bar`: `background:#FFFDFA; border-radius:12px; box-shadow: rgba(209,189,173,.15) 1px 8px 12px 0; color:#04191F; margin:20px auto; max-width:850px; width:calc(100% - 40px)`.
  - 1440: `[295,20,850,65]`; 1280: `[215,20,850,65]`; 390: `[20,20,350,54]`.
- Inner row: `display:flex; justify-content:space-between; align-items:center; gap:20px; padding:12px` (15px at <=768).
- Logo: `<a href="/">` with `margin-left:10px` (0 at <=768) containing `div.logo--main`: `width:105px; aspect-ratio:115/25` (105x23), maroon "Cadmus" wordmark SVG as background (`ASSET_MANIFEST.md` §4 `.logo--main`).
- Nav (hidden <=768): `display:flex; gap:20px`; 4 `<button class="with-dropdown">`: **Products**, **Solutions**, **Resources**, **About Us** (Inter 14px/19.6, #04191F). Each: `display:flex; align-items:center; gap:5px` + `::after` chevron 12x12 (data-URI). Measured at 1440: Products `[524,43,76,20]`, Solutions `[620,43,78,20]`, Resources `[718,43,87,20]`, About Us `[825,43,78,20]`.
- CTA (hidden <=768): `a.button.header-button` "**Book a demo**" -> `/contact/`; `[1005,32,128,41]`.
- **Scroll behaviour**: none. Verified bar position/background/shadow identical at scrollY 0 and 2000; no hide-on-scroll, no shrink, no backdrop-filter.

### Dropdowns (desktop)
- Trigger: **click** (toggle) on a nav button; clicking a different button switches; `mousedown` outside closes. No hover-open. No open/close animation (conditionally rendered).
- Panel `.product--dropdown`: `position:fixed; top:120px; left:<button center x>px; transform:translateX(-50%); width:100%; max-width:250px; background:#FFFDFA; border-radius:12px; box-shadow: rgba(209,189,173,.15) 1px 8px 12px; overflow:hidden; z-index:11`. Inner `padding:20px; display:flex; flex-direction:column; gap:10px`.
- Group headings: `<div class="mb10"><span class="label">…</span></div>` (chip: bg `#FFE7DB`, padding `0 10px`, 13px/0.7 Inter 500, ls .05em, uppercase).
- Links: Inter 14px/19.6 `.hover-ma`.
- Contents (measured):
  - **Products** (250x356 @1440): [label PRODUCTS] Product Overview `/product-overview/` · Assignments `/product/assignments/` · Exams `/product/exams/` · Group Work `/product/group-work/` · Marking & Feedback `/product/marking-feedback/` · Learning Assurance Analytics `/product/learning-analytics/` · Oral Assessment `/product/oral_assessment/` · [label `mb10 mt10` PRICING] Plans & Pricing `/pricing/`
  - **Solutions** (250x158): [SOLUTIONS] For Universities `/solutions/universities/` · For Educators `/solutions/educators/` · For Students `/solutions/students/`
  - **Resources** (250x376; panel uses `gap:20px` between 3 groups, each group `flex-col gap:10px`): [RESOURCES] Case Studies `/case-studies/` · News `/news/` · Help Docs `https://support.cadmus.io` — [LEARN] Teaching Guides `/teacher-guides/` · Video Tutorials `/video-tutorials/` — [SUPPORT] Contact Support `/contact/` · Request a Demo `/request-demo/`
  - **About Us** (250x129): [ABOUT US] Our Story `/about/` · Careers & Culture `/careers/`

### Mobile menu (<=768)
- `button.hamburger-menu` 24x24, `background-size:20px auto`, maroon 3-line SVG; `.open` swaps to an X SVG (both in manifest). Measured `[331,35,24,24]`.
- `.menu-wrapper`: `display:grid; grid-template-rows:0fr` -> `.active` `1fr`; `transition: grid-template-rows .35s`; child `overflow:hidden`. Expands the header bar itself (bar 54px -> 331px tall with all collapsed; 578px with Products expanded).
- Content: `padding:20px 15px; display:flex; flex-direction:column; gap:40px; align-items:flex-start`.
- 4 accordion items, each: `button.label` (closed: class `label clear` = transparent bg, padding 0; open: chip bg `#FFE7DB`, padding `0 10px`) + `.mobile-submenu` (grid-rows 0fr->1fr, `.35s`) containing `flex-col gap:10px; padding:20px 0` (Products: `padding-bottom:0`). Only one open at a time (clicking the open one closes it).
  - PRODUCTS: Product Overview, Assignments, Exams, Group Work, **Feedback & Marking** (note: differs from desktop "Marking & Feedback"), Learning Assurance Analytics, Oral Assessment, Plans & Pricing
  - SOLUTIONS: For Universities, For Educators, For Students
  - RESOURCES: Case Studies, News, Teaching Guides, Video Tutorials, Contact Support (`/contact`), Request a Demo, Help Docs (`https://support.cadmus.io`)
  - ABOUT US: Our Story, Careers & Culture
  - then `a.button.header-button` "Book a demo" -> `/contact` (128x41).
- Links Inter 14px, `.mobile-menu-link` (hover opacity .7; active route colour #580C1D). Clicking a link closes the menu.

---

## 2. Hero — `HomepageBanner` (main child 1)

- Wrapper: `bg #580C1D; color #FFC8AE; display:flex; flex-direction:column; overflow:hidden; min-height:100svh` (<=1600: `calc(20px + 100svh)`). No negative margin / radius (first section). Measured height: 920 @1440x900, 820 @1280x800, 864 @390x844.
- **Text block**: `max-width:1100px; padding:40px (20 <=768); margin: auto auto 0 auto` (margin-top auto pushes it down; <=768 `margin-bottom:40px`); `flex-col; gap:20px; text-align:center; text-wrap:balance`. @1440 `[291,76,858,287]`.
  - `h1.h1` "**Uplifting Assessment**" — margin-top 90px (`.mth`); 65px/71.5 (42/46.2 mobile); color #FFC8AE. `[331,206,778,72]` @1440. sal `fade--in-up`, delay **300ms**.
  - `p.f-18` "**Cadmus enables universities to deliver assessments end-to-end, in one streamlined platform.**" 18px/25.2. sal `fade--in-up`, delay **400ms**.
- **Card row container**: `width:100%; margin:auto; margin-top:40px` (0 at <=1600); `padding:40px` (<=768: `0 0 40px`).
  - `.hero-card--wrapper`: `display:flex; gap:12px` (5px <=768); `max-width:1000px` (<=1500) / 1100 (<=1800) / 1300 (>1800); `margin:40px auto 0` (0 at <=768); <=768 `transform: scale(1.15)`.
  - 4 cards, each `flex: 1` equal width (241px @1440/1280; 108px @390 before scale). Cards at index 0 and 2 get `margin-top:40px` (20 at <=768) (+ `padding-top:20px` above 1600, 0 below) -> staggered "up/down" rhythm: cards 1 & 3 sit 40px higher.
  - Card inner: `border-radius:8px; overflow:hidden; position:relative; padding:20px` (10px at <=768) `; display:flex; aspect-ratio:3/4` (241x321). Photo absolutely fills (`object-fit:cover`).
  - Tag pinned to bottom-left (`margin-top:auto; z-index:2`): `.icon-tag.small` — `display:flex; align-items:center; gap:10px; background:#FFFDFA; border-radius:4px; padding:4px 12px 4px 4px; box-shadow: rgba(207,192,176,.36) 0 0 1px, rgba(207,192,176,.15) 0 1px 3px`. Icon 25x25 (<=990: 10px wide). Label `.sm-heading` 12px (8px <=990), color #04191F.
  - Cards (order, label, icon, photo): 1 **Create** (book.svg, kateryna-hliznitsova-hakuz2yubdm) · 2 **Mark** (edit.svg, istock-2208695167) · 3 **Manage** (bolt.svg, christin-hume) · 4 **Analyse** (graph-pink.svg, thisisengineering).
  - Each card: sal `fade--in-up fast` (from translateY 30px; 15px mobile), delays **600 / 700 / 800 / 900 ms** (600 + 100*i), duration 0.65s ease.
  - @1440 card rects: `[220,443,241,321]`, `[473,403,241,321]`, `[726,443,241,321]`, `[979,403,241,321]`. @1280 row starts x=140.
- Below cards: a 40px spacer (`div.mb40`, hidden <=768).

## 3. Introduction (main child 2)
- `bg #FCF7EF; padding:40px 40px 0 (20px 20px 0 <=768); border-radius:32px 32px 0 0; margin-top:-40px`. No z-index. Height 652 @1440/1280, 461 @390.
- Inner: `max-width:1000px; margin:40px auto 0; text-align:center; flex-col; gap:40px`.
  - `p.h4` "**Secure, supportive assessment anywhere, anytime**" (38/43.7; 26/29.9 mobile).
  - `div.f-16` (max-width 900, centered) "**Run online or in-place, high-quality assessments through one secure platform that guides students to success and improves assessment outcomes.**"
  - **Swiper** (max-width 1000): `effect:'fade'` (crossFade false), `autoplay:{delay:3000, disableOnInteraction:false}`, `loop:true`, `speed:300`, 1 slide per view, touch enabled, no pagination/arrows. 4 slides, each a product UI screenshot (a/b/c/d-frame PNGs) at full width, natural height (~403px @1000 wide; 350x141 mobile). Slide bg #FCF7EF.

## 4. Experience (main child 3)
- No background (shows body cream), `padding:40px` (0 at <=768), `text-align:center`. No radius/negative margin.
- Inner `max-width:1100px; margin:40px auto; flex-col; gap:40px` (20 mobile, +`padding-bottom:40px` mobile).
  - `p.h4` (max-width 900, `margin-bottom:20px`; mobile `padding:20px; margin:0`) "**A connected experience for educators and students**"
  - `<video muted autoplay loop playsinline src=…1107306103…mp4>` `width:100%; max-width:1000px; margin:auto`. Rendered 1000x464 (@1440), 390x181 (@390). Intrinsic 2240x1040, 2.09 s loop.

## 5. Connected products (main child 4)
- `padding:40px (20); border-radius:32px 32px 0 0; margin-top:-40px; position:relative; z-index:2; background: <active product section bg>` (initially `#FFF5D4`). Background swaps instantly on tab change (inline style, no transition). Height 873 @1440, 888 @390.
- Inner `max-width:1200px; margin:auto`.
  - Title wrapper `text-center flex-col gap:40px; margin:40px 0` (mb 20 mobile): `p.h4` (max-width 900) "**With connected products**".
  - **Tab strip** `<menu class="connected-menu">`: `display:flex; align-items:center; width:100%; overflow-x:auto; scrollbar-width:none; margin-bottom:20px`; CSS var `--menu-bg` = active tab colour.
    - Each `.menu-item-wrapper`: `display:flex; align-items:center; justify-content:center; flex:1 0 auto; padding-inline:31px` (20 <=990); `border-right:1px solid rgba(22,19,19,.376)`; first: `justify-content:flex-start; padding-left:0`; last: `justify-content:flex-end; padding-right:0; border:none`. Height 38. @1440 widths 193/170/218/280/338.
    - `.menu-item`: `display:flex; align-items:center; gap:10px; padding:4px 12px 4px 4px; border-radius:4px; cursor:pointer; transition: background-color .3s`; `.active` bg = `var(--menu-bg)`. Icon `<img>` 30x30; label `span.sm-heading` (14px uppercase).
    - Tabs: **Assignments**, **Exams**, **Group Work**, **Feedback & Marking**, **Learning Assurance Analytics**. On mobile the strip overflows and scrolls horizontally (total ~1111px in 350px).
  - **Swiper** (`effect:'fade'`, `slidesPerView:1`, `allowTouchMove:false`, `speed:300`, no autoplay, no loop). Clicking tab i -> `swiper.slideTo(i)` and sets active state/colours.
  - Each slide = **image-card** layout (same layout reused in sections 8, 12, 13):
    - `.image-card-wrapper`: `position:relative; max-width:1400px (constrained to 1200); margin:40px auto; padding-bottom:120px` (20 <=990); background = section colour.
    - `.image-card-image`: `margin-left:130px; width:calc(100% - 130px); aspect-ratio:2.6/1; border-radius:8px; overflow:hidden` -> 1070x412 @1440/1280. <=990: `width:100%; margin:0; aspect-ratio:5/4` (350x280 @390).
    - `.floating-content-card`: `position:absolute; left:0; bottom:0; margin-bottom:40px; z-index:2; padding:40px (20 <=768); background:#FFF; border-radius:12px; max-width:650px; box-shadow: rgba(207,192,176,.12) 1px 8px 12px; backdrop-filter: blur(1px)`. @1440 `[120,2658,650,315]` (card 3 shorter: 271). <=990: `position:static; margin:-60px 10px 40px; max-width:calc(100% - 40px)` (m-max-300 -> 320) -> 310 wide @390.
    - Card content `flex-col; align-items:flex-start; gap:20px`: `p.h4.balance` title; `div.text-lg` (16px) body; `a.arrow-button` "Learn more".
  - Slide copy:
    | Tab | Title | Body | Link |
    |---|---|---|---|
    | Assignments | Streamline assignments, boost success | Simplify assignment creation, gain insights into student progression with tasks, and proactively support student wellbeing and outcomes—all in one powerful end-to-end platform. | `/product/assignments` |
    | Exams | Deliver smarter, fairer digital exams at scale | Whether online or on campus, Cadmus makes secure assessments simple—from customisable question types and learner-focused features, to integrity tools that support every student, every step of the way. | `/product/exams/` |
    | Group Work | Collaboration made simple | All aspects of group work in one connected platform: from group creation and shared tasks to feedback and performance insights. It’s our real-world project management tool, built for education. | `/product/group-work/` |
    | Feedback & Marking | Effortless marking with greater impact | Everything educators need to grade efficiently at scale while staying connected to students. Reduce cognitive load, maintain consistency and support growth through smarter marking and powerful feedback tools. | `/product/marking-feedback/` |
    | Learning Assurance Analytics | Built for integrity, designed for learning | With real-time progress insights, Learning Assurance Analytics and clear AI usage guidance, Cadmus helps institutions foster learning, not just catch misconduct. It's a smarter, fairer way to ensure integrity. | `/product/learning-analytics/` |
    (Live hrefs render with trailing slash, e.g. `/product/assignments/`.)

## 6. Why choose Cadmus — `Success` (main child 5)
- `padding:40px (20); margin-top:-40px; border-radius:32px 32px 0 0; position:relative; z-index:2; bg #FCF7EF`. Height 470 @1440, 873 @390.
- `p.h5` centered, `margin: 40px 0 60px` (mb 40 mobile): "**Why choose Cadmus for your institution?**"
- Grid `max-width:1300px; margin:auto`: `.grid-4` `grid-template-columns:repeat(4,1fr); gap:20px` -> 310px cols @1440, 285 @1280; 1 col (350) at <=990.
- Card `.bg-card`: `bg #FFFDFA; border-radius:8px; box-shadow: rgba(207,192,176,.12) 1px 8px 12px; padding:20px; display:flex; flex-direction:column; gap:20px`. Height 153 @1440. Icon `<img>` 34x34. Text `p.serif` (AT Realm Book 14px/19.6, max-width 400).
  1. certificate.svg — "Increased assessment quality and consistency institution-wide."
  2. shooting-star.svg — "Enhanced student wellbeing, outcomes and experience in assessment."
  3. team-blue.svg — "Greater equity and inclusion, empowering students from all backgrounds to thrive."
  4. profile.svg — "Reduced misconduct, with rich insights into the student learning and construction process."
- A 100px spacer closes the section.

## 7. Impact counter (main child 6)
- `padding:40px (20); text-align:center; margin-top:-40px; bg #FFFFFF; position:relative; z-index:2; border-radius:32px 32px 0 0`. Height 255 @1440, 449 @390.
- An **empty** `p.text-heading` with `margin:20px 0 40px` (its margins collapse -> effective 40px gap before the grid). Recreate as 40px space.
- Grid `.spaced-grid`: `grid-template-columns: 1fr auto 1fr; gap:40px; max-width:1400px; margin:0 auto 40px` -> cols 528.25/223.5/528.25 @1440; 448.25/223.5/448.25 @1280; single column <=990.
- Each item `flex-col; gap:10px`: number `p.text-xl` (72px; 60 mobile) + label `p.text-heading`.
  - **7m** / STUDENTS · **18,000+** / TEACHERS · **25m+** / ASSESSMENTS — all GSAP count-up (see 0.8).

## 8. Logo marquee — `LogoMarquee` (main child 7)
- `bg #FFFFFF; margin-bottom:20px`; not a "sheet" (no radius/negative margin). Height 213.
- `h2.text-heading` (13px, ls 1.3px, uppercase, centered) `padding-top:20px; margin-bottom:40px`: "**Join The World’s Leading Universities**".
- `.logo-marquee--wrapper` `overflow:hidden; max-width:100vw` > `.logo-marquee--inner` `display:flex; flex-wrap:nowrap; gap:20px; width:max-content; animation: scroll 100s linear infinite`.
  - `@keyframes scroll { 100% { transform: translate(calc(-25% - 5px)); } }` — direction **right-to-left**, the 24-logo list is rendered **4 times** (96 items) so -25% is one full list. Measured inner width 18,316px -> ~4,584px per 100s ≈ **45.8 px/s**. Never pauses (no hover pause).
  - Item `a.logo-wrapper`: `border-right:1px solid rgba(22,19,19,.376); padding-right:20px`; `target=_blank`. Logo `img.logo`: `height:40px; max-width:150px; object-fit:contain` -> 150x40 box. Stride 191px.
  - Logo order (24): Exeter (href `https://www.exeter.ac.uk`), 626ba0db…, Adelaide, RMIT (1), Notre Dame Australia, USC (logusc), RMIT (2), USQ, Bond, images-2-1, Liverpool John Moores, Zayed, ACU, Flinders, UWA, Melbourne, Canberra, Manchester, UoN, UoG, avd9ij1nl, 094c1cda…, Maynooth, KCL. All others have `href=""`. Files in manifest.
- Followed by a 100px spacer (inside the section).

## 9. ROI module (main child 8, `<section class="roi-module-light-section">`)
- `padding:40px (20); position:relative; z-index:3; margin-top:-20px` (rule `.logo-marquee + .roi-module-light-section`). Transparent bg (cream body shows). No radius. Content: Spacer(100) + card + Spacer(100). Height 850 @1440, 812 @1280, 1066 @390.
- `.image-card-wrapper.roi-module-light`: `max-width:1300px; margin:auto; position:relative; padding-bottom:120px` (<=990: `padding:120px 0 20px`).
  - Image: `margin-left:130px; aspect-ratio:2.6/1; border-radius:8px; overflow:hidden` -> 1170x450 @1440, 1070x412 @1280; mobile 350x280 (5:4). Photo: roi-university-library.jpg.
  - **Stat glass card** `.roi-hero__stat-card--light`: `position:absolute; right:85px; top:-50px; z-index:3; padding:12px; background:rgba(246,243,238,.5); border:0.85px solid #FCFBF9; border-radius:12px; box-shadow: rgba(207,192,176,.12) 1px 8px 12px; backdrop-filter: blur(1px)` — 260x183 @1440 at `[1025,4042]`. <=990: `left:33%; right:auto; top:0` (235x161 @390).
    - Inner: `bg #FFE7DB; border-radius:12px; padding:12px 12px 24px; text-align:center; color:#04191F`: `p.roi-hero__stat-number` "**7.1x**" (64/72; static text, not animated) + `p.roi-hero__stat-label` "**AVERAGE RETURN ON INVESTMENT**" (`margin-top:8px; max-width:211px`).
  - Content card: `.floating-content-card` (absolute bottom-left, **no** bottom margin here) `bg #FFF; border-radius:12px; max-width:650px; padding:88px` (<=990: 24px, gap 32, static, margin -60px 10px 0). 650x532 @1440.
    - `flex-col; align-items:flex-start; gap:40px`:
      - `p.h4.balance` "**Proven impact. Independently validated.**"
      - `div.f-16` (flex-col gap 16): `<p><strong>Cadmus delivers measurable improvements in student retention and outcomes with independently modelled financial returns for universities.</strong></p><p>An independent return on investment analysis by Nous Group estimates a 7.1× weighted average ROI for universities using Cadmus.</p>` (strong = 700).
      - `a.roi-button.roi-button--dark` "**Read the ROI report**" -> `/study/2026-Cadmus-ROI-study/`.

## 10. Featured video (main child 9)
- `bg #FFC8AE; padding:40px (20); border-radius:32px 32px 0 0; position:relative; z-index:2`. At >= 991px: `margin-top:-25vh; padding-top:21vh` (so it slides **under** the ROI section, which has z-index 3) — measured margin -225/padding-top 189 @900h, -200/168 @800h. <=990: normal `margin-top:-40px`. Height 1113 @1440x900, 560 @390.
- Inner `max-width:1000px; margin:40px auto; padding-bottom:20px` > `flex-col gap:10px; margin-bottom:40px`:
  - Video box: `aspect-ratio:9/5; position:relative; overflow:hidden; border-radius:8px; margin-bottom:20px; cursor:pointer` (1000x556 @1440; 350x194 @390). Contains the Vimeo iframe (absolute, full size) underneath the thumbnail image (absolute, cover). `::after` play icon: centered, 60x60 (40 <=768), `border-radius:100%`, `pointer-events:none`, `z-index:2` (SVG in manifest). Click -> thumbnail removed, iframe src `+?autoplay=1`, play icon removed.
  - `h3.h4` "**King's College London x Cadmus Teaching & Learning Forum**" (1000 wide, 2 lines @1440).
  - empty `p.f-14` (tagline is empty).
  - `a.arrow-button` (`margin-top:10px; margin-right:auto`) "**See more**" -> `/video-tutorials/`.

## 11. Two columns x4 (main child 10)
- Outer: `bg #FCF7EF; position:relative; z-index:2; margin-top:-40px; border-radius:32px 32px 0 0; display:flex; flex-direction:column; gap:0`. Starts with an empty div and ends with an empty div. Total height 2187 @1440.
- Each row (`TwoColumns`): `padding:40px (20); border-radius:32px 32px 0 0; margin-top:-40px; bg #FCF7EF; position:relative` (rows visually merge since same colour; the rounded edges are invisible). Row heights @1440: 580, 653, 579, 536.
  - Inner `max-width:1200px; margin:auto` (<=768: `margin:40px auto 20px`).
  - `.two-columns`: `display:grid; gap:100px`.
    - Rows 1 & 3 (index 0, 2) = **flipped**: `grid-template-areas:"content image"; grid-template-columns:.45fr .55fr` -> 495px text left, 605px image right.
    - Rows 2 & 4 = normal: `"image content"; .55fr .45fr` -> image left 605, text right 495.
    - <=990: single column, areas `"content" "image"` (text first), gap 20.
  - Image cell: `padding:20px` (0 <=768), image `width:100%` natural height (565 wide @1440).
  - Text cell: `width:100%; display:flex; flex-direction:column; justify-content:center` > `flex-col; align-items:flex-start; gap:20px; max-width:550px`:
    - Block A (sal): `p.h5.balance` title.
    - Block B (sal): `div.f-16` (14px <=768; flex-col gap 20; mb 20) body.
    - Motion: both blocks `.fade--up` (`opacity 0`, `translateX(-20px)` on flipped rows / `translateX(+20px)` (`.reverse`) on normal rows) -> visible; `transition: all .65s ease .2s`; trigger 50% visible, once.
  - Copy:
    1. (flipped, image right) **Enhanced assessment literacy and quality** — Confidently deliver high-quality, consistent assessments that engage students and support deeper learning. With Cadmus, educators spend less time on admin and more time creating impactful experiences—at scale, in any subject.
    2. (image left) **Improved student wellbeing and success** — Give students the clarity and confidence they need to thrive. With everything in one place—tools, feedback, and resources—Cadmus helps learners stay focused, reduce stress, and achieve better outcomes.
    3. (flipped) **Greater equity and inclusion** — More impactful and accessible feedback for every learner. With streamlined communication and progress tracking, Cadmus helps educators support diverse needs and foster connection—without the admin overload.
    4. (image left) **Learning and academic integrity assurance** — With less time spent on setup and moderation, it’s easier to support student learning while upholding academic integrity. Our scaffolded, guided assessments prioritise learning over shortcuts—keeping students engaged from the start.
  - No buttons in these rows.

## 12. Cards — "Improving assessment outcomes" (main child 11)
- `bg #FCF7EF; padding:40px (20)`. **No** radius / negative margin. Height 763 @1440, 1617 @390.
- Inner `max-width:1200px; margin:auto; flex-col; gap:20px`.
  - Header `max-width:900px; margin:40px auto 20px; text-align:center; flex-col; gap:20px`: `p.h4` "**Improving assessment outcomes for everyone**" + `div.f-18` "**Assessment solutions for every part of your institution.**"
  - Grid `grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:40px; padding-bottom:40px` -> 386.66px cols; 1 col <=768.
  - Card: `bg #FFF; display:flex; flex-direction:column; gap:20px; padding:15px; border-radius:8px; overflow:hidden` (387x434 @1440).
    - Image box `aspect-ratio:2/1; border-radius:8px; overflow:hidden` (357x178); image inside is `width:100%` at natural aspect, top-aligned and clipped (not object-fit cover).
    - `p.h6` title; `div` body 14px; then `div.flex.mta.mb20` > `a.arrow-button.transparent` (`margin-top:20px`) "Learn more" (116x20).
  - Cards: **For universities** — Deliver hybrid assessments at scale. Support students, ensure learning and integrity, reduce workloads and unlock actionable insights with rich analytics. -> `/solutions/universities/` · **For educators** — Take the work out of assessment setup, management and marking—leaving more time for proactive student support and enhanced outcomes for everyone. -> `/solutions/educators/` · **For students** — Clearly understand assessment requirements, draft with academic guidance, get support when you need it most and submit with confidence. -> `/solutions/students/`

## 13. Integrations (main child 12, `<section>`)
- `bg #FFC8AE; padding:40px (20); border-radius:32px 32px 0 0; margin-top:-40px; position:relative; z-index:2`. Ends with 100px spacer. Height 388 @1440, 437 @1280, 617 @390.
- Inner `max-width:1600px; margin:40px auto 0; display:flex; align-items:center; gap:40px` (wraps <=768).
  - Left `width:40%` (100% mobile) `flex-col gap:20px`: `h2.h5` "**Cadmus seamlessly integrates with your current technology ecosystem**" + `p.f-14.lh-15` (14px/21px) "**Whether you're delivering coursework or high-stakes exams, Cadmus fits naturally within your existing institutional workflows. Our integrations make it easy to streamline assessment delivery without added complexity.**"
  - Right `width:60%` grid 3 cols, gap 20 (mobile: 2 cols, gap 10). Cols 250.66 @1440, 218.66 @1280, 170 @390.
  - Tile: `bg #FFF; padding:20px (15 mobile); border-radius:12px; flex-col gap:10px` (no shadow — `shadow-sm` has no rule). Row `flex; align-items:center; gap:10px`: icon 34x34 (24 mobile, image cover) + `h3.f-18` (13px mobile) title. Tiles 251x74 @1440.
  - Tiles: **Gradebook, Canvas, Moodle, Blackboard, D2L Brightspace, Grammarly**.

## 14. Case study (main child 13, `<section>`)
- `bg #FFE7DB; border-radius:32px 32px 0 0; margin-top:-40px; position:relative; z-index:2`. No outer padding. Height 1904 @1440, 2279 @390. Three parts:
- **A. Image card + stats** (`div.p40`, 20 mobile):
  - image-card wrapper (`max-width:1200px; margin:40px auto; padding-bottom:120px`): image `ml-130`, `bg rgba(0,0,0,.1)`, 2.6:1, radius 8 (1070x412). Content card (abs bottom-left, mb 40, p40, white, r12, max 650, shadow, blur 1px) `[120,9176,650,302]`:
    - `p.h5.balance` "**The University of Manchester**"
    - Tags row `flex wrap gap:10px; align-items:center; .text-xs-heading`: "STUDENT SUCCESS" `|` "HYBRID LEARNING" — divider `span.divider` 1x12px `#CFC0B0`.
    - `p.f-16` (mb 20) "In an environment that required rapid, high-quality deployment of online assessment, educators were able  to achieve standout results in student success rates and educator satisfaction." (double space is in the source)
    - `a.arrow-button.transparent` "**Read the full Case Study**" -> `/study/case-study-the-university-of-manchester/`
  - Stats `text-center flex-col gap:20px`: `p.f-12` uppercase "**High student experience and improved outcomes**"; row `display:flex; justify-content:space-between; gap:60px; max-width:900px; margin:20px auto 0` (wrap + center on mobile). Items `flex-col align-center; max-width:275px` (260 wide @1440):
    - **89%** — POSITIVE STUDENT EXPERIENCE · **+17.6%** — INCREASE IN STUDENT EXPERIENCE SCORE · **96.31%** — STUDENT PASS RATE (all `text-xl` GSAP counters; captions `p.f-12` uppercase).
- **B. Quote** `.quote--background` (`padding:0 40px 40px`, relative; `::after` = cream `#FCF7EF` block covering the **bottom 50%** of this strip, z-index 0, so the quote card straddles orange -> cream):
  - Card `max-width:1200px; margin:40px auto; bg #FFC8AE; color #580C1D; border-radius:12px; padding:40px (20); overflow:hidden; position:relative; z-index:2` (1200x353 @1440).
  - Inner `max-width:950px; margin:40px auto; flex-col; align-items:flex-start; gap:40px`:
    - `p.h5` "\"I highly recommend Cadmus ... Students learn meaningfully in the assessment process because the Cadmus platform provides an educative and supportive workspace that drives successful outcomes.\"" (with literal straight double quotes)
    - Author `div.quote-author` `flex-col gap:5px; border-left:2px solid #580C1D; padding-left:10px`: `p.text-heading` 500 "**PROFESSOR GABRIELLE FINN**"; `p.f-16` "Vice-Dean for Teaching, Learning and Students, The University of Manchester".
- **C. CTA** (`div.bg-white` = cream bg) > `padding:0 40px 40px` (20 mobile) relative z2:
  - `max-width:1200px; margin:auto; display:grid; grid-template-columns:1fr 1fr; align-items:center; gap:20px` (1 col <=990).
  - Left `flex-col align-start; text-wrap:balance`: `p.h4` (max 650, mb 20) "**Great outcomes start with high-quality assessments**"; buttons `flex gap:20px; align-items:center`: `a.button` "**Book a demo**" -> `/request-demo` and `a.arrow-button` "**Get a free trial**" -> `/contact` (both `target="_blank" rel="noopener noreferrer"`).
  - Right `padding:20px` (mobile `margin-top:20px`): illustration frame-1430105575.png (550x414 @1440).
  - Then `Spacer.m-spacer` (100px; 60px <=768).

## 15. Careers image card (main child 14)
- `padding:40px (20); position:relative; z-index:2; margin-top:-40px; border-radius:32px 32px 0 0; bg #FFE7DB`. Height 692 @1440.
- Same image-card layout but **flipped**: image `margin-right:130px` (left-aligned, 1070x412), content card `.flipped` `left:auto; right:0` (`[670,11088,650,255]` @1440). Mobile: card `margin-left:auto; margin-right:10px` (static).
- Card content `flex-col align-start gap:20px`: `p.text-sm-heading` "**CAREERS**"; `p.h5.balance` "**Join our growing team and make your mark on the future of learning.**"; `a.arrow-button` "**Learn more**" -> `/careers/`.

## 16. The Cadmus Chronicle (main child 15)
- `padding:40px (20); position:relative; z-index:2; margin-top:-40px; border-radius:32px 32px 0 0; bg #FCF7EF`. Height 769 @1440.
- Header `margin:40px 0; flex-col; gap:10px`: `p.h4.text-center` "**The Cadmus Chronicle**".
- `max-width:1400px; margin:0 auto 40px; padding-bottom:20px`; grid 3 cols gap 20 (440px cols @1440, 386.66 @1280; 1 col <=768).
  - Tile = `<a href="/news/<slug>/">` > `flex-col align-start`: image box `aspect-ratio:4/3; bg rgba(0,0,0,.1); border-radius:8px; overflow:hidden; margin-bottom:20px` (440x330; image cover) + `h3.h6` title.
  - 1. "Why “AI-proofing” assessments misses the point—and what to design for instead" -> `/news/why-ai-proofing-assessments-misses-the-point/`
  - 2. "Why AI demands a redesign of assessment—not just a policy response" -> `/news/why-ai-demands-a-redesign-of-assessment/`
  - 3. "The degree has always been a signal. AI is changing how we verify it." -> `/news/the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it/`
  - (These are the 3 latest CMS news items at time of measurement.)
- `flex justify-center; margin-top:60px`: `a.arrow-button` "**See more**" -> `/news/` (144x41).

## 17. Footer (`footer`)
- `padding:40px (20); bg #580C1D; color:rgba(246,243,238,.8); border-radius:32px 32px 0 0; margin-top:-40px; position:relative; z-index:3; font-size:13px` (line-height 18.2). Height 559 @1440/1280, 1452 @390.
- Mobile only (`.m-show`): emblem `div.emblem-footer` 85x85 centred, `margin-top:40px`, then 100px spacer.
- Row `display:flex; margin-top:40px (0 mobile); gap:40px` (wraps on mobile):
  - Info column `max-width:300px; width:100%; flex-col`:
    - Socials `flex gap:20px; margin-bottom:20px`: LinkedIn `https://www.linkedin.com/company/cadmus-io`, X `https://x.com/cadmus_io`, Facebook `https://www.facebook.com/cadmus.io` — each a 20x20 `div.social-icon` (data-URI SVGs), `target=_blank`.
    - "Copyright © 2026 Cadmus" (year = `new Date().getFullYear()`)
    - "Made with [love-icon 15x15 inline-block] by [Lovework Studio](https://lovework.studio)" (link `.hover-wh`, `target=_blank`)
    - "Illustrations by Tyler Russell"
  - Links grid `max-width:1100px; width:100%; margin-left:auto; grid 4 cols; gap:20px` (240px cols @1440, 200 @1280; mobile 1 col, gap 40). Each column `flex-col gap:10px`; heading `label.orange.text-xs-heading` (color `#FFC8AE`, 13px, ls .05em, uppercase, `margin-bottom:10px`); links `.hover-wh`:
    - **PRODUCTS**: Product Overview `/product-overview/` · Assignments `/product/assignments/` · Exams `/product/exams/` · Group Work `/product/group-work/` · Marking & Feedback `/product/marking-feedback/` · Learning Assurance Analytics `/product/learning-analytics/` · Oral Assessment `/product/oral_assessment/` · Plans & Pricing `/pricing/`
    - **SOLUTIONS**: For Universities `/solutions/universities/` · For Educators `/solutions/educators/` · For Students `/solutions/students/`
    - **RESOURCES**: Case Studies `/case-studies/` · News `/news/` · Teacher Guides `/teacher-guides/` · Video Tutorials `/video-tutorials/` · Request a Demo `/request-demo/` · Contact Support `https://support.cadmus.io/kb-tickets/new` · Help Docs `https://support.cadmus.io`
    - **ABOUT US**: Our Story `/about/` · Careers & Culture `/careers/` · Privacy Policy `/information/privacy-policy-au/` · Trust Centre `/trust-centre/` · Contact Us `https://support.cadmus.io/kb-tickets/new`
- 100px spacer.
- Bottom bar `display:flex; justify-content:space-between`: left `div.emblem-footer` 85x85 (hidden <=768); right `div.logo--peel` (overflow hidden, sal) > `<a href="/">` > `div.logo--footer` `width:425px; aspect-ratio:425/85` (mobile `width:calc(100vw - 40px)` -> 350x70). Peel animation: wordmark slides up from `translateY(100%)`, `transform .75s ease .2s`, triggers when 50% visible.

---

## 18. Reflow summary @390 (<=768)
- Header: bar 350x54, logo + hamburger only.
- Hero: h1 42px; text block padding 20 + mb 40; card row gap 5, scale(1.15) (overflows edges slightly: visual `[-29,508,449,167]`), cards stagger 20px, tag text 8px.
- All `.p40` sections -> 20px padding. Section sheets keep 32px radius and -40px overlap.
- Image-card layouts: image full width 5:4 (350x280), card below overlapping by 60px with 10px side inset, 20px padding.
- Grids -> 1 column (Why, counters, two-columns [text above image], cards, chronicle, footer links); integrations -> 2 cols.
- Connected tabs scroll horizontally; tab padding-inline 20.
- Featured video: normal flow (no 25vh overlap).
- Footer: centred emblem on top, stacked columns, full-width wordmark.

## 19. Page vertical rhythm (section tops, page Y)
| # | Section | 1440x900 | 1280x800 | 390x844 |
|---|---|---|---|---|
| 1 | Hero | 0 (h 920) | 0 (820) | 0 (864) |
| 2 | Intro | 880 (652) | 780 (652) | 824 (461) |
| 3 | Experience | 1532 (728) | 1432 (728) | 1325 (341) |
| 4 | Connected | 2220 (873) | 2120 (873) | 1665 (888) |
| 5 | Why | 3053 (470) | 2953 (470) | 2513 (873) |
| 6 | Counter | 3484 (255) | 3384 (255) | 3346 (449) |
| 7 | Marquee | 3739 (213) | 3639 (213) | 3795 (213) |
| 8 | ROI | 3952 (850) | 3852 (812) | 4008 (1066) |
| 9 | Featured video | 4577 (1113) | 4463 (1092) | 5034 (560) |
| 10 | Two columns | 5649 (2187) | 5515 (2187) | 5553 (2159) |
| 11 | Cards | 7837 (763) | 7702 (763) | 7712 (1617) |
| 12 | Integrations | 8559 (388) | 8425 (437) | 9289 (617) |
| 13 | Case study | 8907 (1904) | 8821 (1904) | 9866 (2279) |
| 14 | Careers | 10772 (692) | 10686 (692) | 12105 (625) |
| 15 | Chronicle | 11423 (769) | 11337 (757) | 12690 (1440) |
| 16 | Footer | 12152 (559) | 12054 (559) | 14091 (1452) |
| | Document height | 12711 | 12612 | 15543 |

## 20. UNVERIFIED / not measurable
- Vimeo player internals (iframe is cross-origin): player UI, controls and its own poster are Vimeo's; only the embed URL/ID and wrapper behaviour were verified. Playback after click was not exercised.
- Exact sub-pixel rendering of the 0.8px button borders differs by DPR (Chromium at DPR1 reports 0.5px).
- Lenis touch behaviour on real mobile devices (`smoothTouch:false` per config; not device-tested).
- The `swiper` fade transition timing curve uses Swiper's default (CSS `transition-duration: 300ms`, ease); not separately timed.
- The connected-products tab click behaviour was derived from component source (`slideTo(i)` + state); colours of all five states were taken from that source, only the initial (yellow) state was measured live.
- AT Realm is a commercial typeface; it is downloadable from the live URL, but licensing for reuse is the user's responsibility (foundry not verified).
