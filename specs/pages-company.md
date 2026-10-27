Source: https://cadmus.io/

# CLONE SPEC: company and solutions pages

Routes: `/solutions/universities/`, `/solutions/educators/`, `/solutions/students/`, `/about/`, `/careers/`, `/contact/`, `/request-demo/`, `/trust-centre/`

Measured live on 2026-10-27. I used an isolated headless Chromium (Playwright 1.63), with one fresh browser context per route per width, at **1440x900**, **1280x800** and **390x844**. Every page was scrolled top to bottom first so that sal reveals and lazy images settled. Values come from `getComputedStyle`/`getBoundingClientRect`, the live CSS (inline `<style>` in the HTML, 875 rules parsed), the page JS chunks (for form and animation logic) and `/page-data/<route>/page-data.json` (for copy and asset URLs).

Rects are `[x, y(page), w, h]` in CSS px. Read this file together with `/CLONE_SPEC.md`. Global tokens, fonts, buttons, sal.js, Lenis, the "stacked sheets" pattern (sections use `margin-top:-40px; border-radius:32px 32px 0 0; position:relative; z-index:2`), the header and the footer are all defined there and **are not repeated here**.

Legend: **(a)** existing component as-is · **(b)** existing component with new props or a variant · **(c)** new section type (fully specified in §2).

---

## 0. Global deltas vs CLONE_SPEC.md

- **Header and Footer are identical** on all 8 pages. Header bar is `[295,20,850,65.x]` @1440 and `[20,20,350,54]` @390. Footer is maroon, `margin-top:-40px`, 559 tall @1440/1280 and 1452 @390. Reuse `Header`/`Footer` as-is.
- **New font used: STIX Two Text** (italic). It was "unused" on the homepage. On these pages it is used by `.f-italic` (educators expert list) and `.italic` (careers leader/team roles). It loads from Google Fonts with the same `@import` already in the original CSS: `https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital,wght@0,400..700;1,400..700&display=swap`. The file loaded is `https://fonts.gstatic.com/s/stixtwotext/v18/YA9Lr02F12Xkf5whdwKf11l0p7u8idfU39NkYg.woff2`.
  - `.f-italic {font-family:"STIX Two Text",serif; font-style:italic}`
  - `.italic {font-family:"STIX Two Text",serif; font-size:22px; font-style:italic}`. Line-height computes to 30.8px. It drops to 18px/25.2px @390 via `.m-18`.
- **New type roles** (not in CLONE_SPEC §0.6):

| Role (class) | Family | Desktop | <=990 / 390 |
|---|---|---|---|
| `.h3` (all page H1s) | AT Realm Book | 44px / 1.1 (48.4px), ls normal | `.h3` -> 38px (<=990). Overridden per hero: `.m-36` -> 36/39.6, `.m-30` -> 30/33 |
| `.h7` (two-column quote text) | AT Realm Book | 20px / 1.25, ls -0.0015em. **Used with `.f-16`, so it computes to 16px / 20px, ls -0.024px** | same |
| `.label` (two-column overline chip) | Inter 500 uppercase | 13px / line-height .7 (9.1px), ls .05em (0.65px), `display:inline-block; padding:0 10px; background:#FFE7DB` (a 9px-tall highlighter strip behind the text) | same |
| `.text-lg` | Inter | 16px (line-height inherits 1.4 -> 22.4px) | `.m-14` variants -> 14/19.6 |
| `.serif` small | already in CLONE_SPEC | | |
| `.h4` @<=990 | | | 26px / 29.9px, ls -0.039px |
| `.h5` @<=990 | | | 24px / 30px, ls -0.036px |
| `.h4.m-30` (CTA title) | | | 30px / 34.5px, ls -0.045px |

- **Colours:** no new global tokens. New values used only inside specific sections:
  - Form greys: `#D0D5DD` (input border), `#667085` (placeholder), `rgba(16,24,40,.05)` (input shadow), `#6B7280`.
  - Case-study dark scheme colours: `#123D69`, `#3E2E2C`, `#262258`, `#455017` (see §2.8).
- **Page `<title>`s:** `For Universities | Cadmus`, `For Educators | Cadmus`, `For Students | Cadmus`, `About Us | Cadmus`, `Careers | Cadmus`, `Contact | Cadmus`, `Request a Demo | Cadmus`, `Trust Centre | Cadmus`.
- **Body bg** is `#FCF7EF` on every page.
- **New `/static/` assets** (Gatsby static, not Dato):
  - `https://cadmus.io/static/timeline-b8ddfa98db0ba7f52f7a680369a4a2b1.svg` (about timeline line)
  - `https://cadmus.io/static/thanks-c7f6b2cb2d83c6fab34c7f407eefb114.svg` (form thank-you illustration)
- **Inline data-URI icons needed** (decoded):
  - `.quote-icon` (25x20, `background-size:contain`): `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="17" fill="none" viewBox="0 0 26 17"><path fill="#04191F" d="m23.392.31.612 1.293c-3.74 2.584-5.576 4.964-5.576 7.208a.93.93 0 0 0 .952.952s.136 0 .476-.136c.408-.068.884-.136 1.292-.136 2.584 0 4.08 1.292 4.08 3.468 0 2.312-1.632 3.875-4.012 3.875-3.06 0-5.44-2.583-5.44-6.051 0-4.08 2.992-8.228 7.616-10.472ZM7.616.31l.612 1.293C4.488 4.187 2.652 6.567 2.652 8.81a.93.93 0 0 0 .952.952s.136 0 .476-.136c.408-.068.884-.136 1.292-.136 2.584 0 4.08 1.292 4.08 3.468 0 2.312-1.632 3.875-4.012 3.875-3.128 0-5.44-2.583-5.44-6.051C0 6.703 2.992 2.555 7.616.31Z"/></svg>`
  - `.arrow-icon` (trust policies): the same arrow SVG as `.arrow-button::after` (CLONE_SPEC), with `aspect-ratio:2.31; background-size:contain; background-position:50%`.
  - `.arrow-button.orange::after`: the same arrow recoloured to fill `#FFC8AE`.
  - `.arrow-button.previous`: `::after{display:none}`. A `::before` shows the same arrow, 30px wide, `transform:rotate(180deg)` (computed `matrix(-1,0,0,-1,0,0)`).
- **Shared hover rules** used on these pages, beyond CLONE_SPEC §0.7:
  - `.carousel-nav:hover {opacity:.7}` (`transition: opacity .3s ease`)
  - `.contact-form-close:hover {opacity:.7}`
  - `.arrow-button.transparent.white::after` gets a cream filter: `brightness(0) saturate(100%) invert(86%) sepia(4%) saturate(1056%) hue-rotate(322deg) brightness(117%) contrast(98%)`. The same filter applies on hover, and the arrow still moves `translateX(10px)`.
  - The orange hero `.arrow-button.orange` uses the generic `.arrow-button:hover` (bg `#04191F`, text cream, arrow cream filter).
  - **No hover rules exist** for: position cards, team cards, support cards, policy links, milestone cards, quote cards. Verified: no matching `:hover` selectors in the CSS.
- **Breakpoints:** the same as CLONE_SPEC. Layout at **1280 is structurally identical to 1440** on every page; containers are `max-width` plus padding, so widths simply shrink. Only section heights change (they are listed per page). Hero heights at 1280 are 820 (`.mh-100vha` = `calc(100svh + 20px)` at <=1600).

---

## 1. Component mapping summary

### 1.1 Existing components reused

| Component | Status | Used on | Props/data needed (see per-page sections for values) |
|---|---|---|---|
| `Header`, `Footer` | (a) | all | none |
| `Chronicle` | (a) | about | Same 3 articles as homepage |
| `Spacer` | (a)/(b) | uni, edu, students, trust | Plain 100px spacer between TwoColumns and the next section (transparent). Universities also needs a **sheet spacer**: `Spacer` with `className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]"` (100px tall cream strip whose rounded top overlaps the hero). Trust uses a pure-white, `m-hide` spacer after the last section. |
| `WhyChoose` (`Success`) | (b) | uni, edu, students, contact | `title`, `items[{icon, text}]` (4 items). Visuals unchanged. Section height 470 (one-line item text) or 451. |
| `LogoMarquee` | (b) | uni, about | `title`, `titleWeight` (uni title is **500**, about is 400), `logos[]` (uni 23, about 24), `bg` (uni cream `#FCF7EF`; about orange `#FFC8AE`). Height 213 at all widths. |
| `TwoColumnRows` | (b) | uni (5 rows), edu (6), students (5), about (3), careers (1, standalone), contact (1, standalone) | See §1.3 |
| `Integrations` | (b) | uni, edu | `title`, `body` only. Tiles identical (6 tiles, same icons). Height 388 @1440 / 404 @1280 / 587 @390. |
| `RoiCard` | (b) | uni | Needs a **bare** variant: no `<section>` wrapper, no top/bottom `Spacer`, no `-mt-20`/`z-3`. The `image-card-wrapper roi-module-light` block sits inside the case-study section (§2.8). Content identical to homepage. Measured @1440: wrapper `[70,5703,1300,570]`, image `[200,5703,1170,450]`, stat card `[1025,5653,260,183]`, content card `[70,5742,650,532]`, p 88. @390: wrapper `[20,8118,350,826]` pt120, card `[30,8458,310,466]` p24. |
| `ImpactCounter` | (b) | about, careers | `bg` orange `#FFC8AE`, `label` "Our Impact so far" (`p.text-heading mb40 mt20`, 13px, which replaces the empty 40px label spacer), `stats[]`, `layout`. See §1.2. |
| `ImageCard` | (b) | about (Mission, Careers), educators (ExpertList) | See §1.2 |
| `Careers` | (b) | about | Add an `image` prop. About uses `1754472361-cadmus-event-june-2025-467-copy.jpg` (homepage uses `1751186547-screenshot...jpg`). Everything else is identical: flipped, light-orange, "Careers" overline, h5 copy, "Learn more" -> `/careers/`. |
| `SolutionCards` | (b) | students (support cards) | See §2.11. This is a "support" variant with enough differences that it may be simpler as its own component, but it is fully specified. |

### 1.2 Variant details

**ImpactCounter (b)**
- Section classes: `p40 m-p20 pos-rel text-center mtn40 bg-orange br-t-32`. About adds `m-pt40` (390 padding `40px 20px 20px`) and has z-index auto. Careers adds `pb40 z-2`.
- Label `p.text-heading.mb40.mt20` "Our Impact so far".
- **About, 3 stats** (`spaced-grid` `1fr auto 1fr`, gap 40, max-1400, mb40): "50+" COUNTRIES · "610,000+" STUDENTS · "25,800+" EDUCATORS. Columns @1440 are 509/263/509. Height 288 @1440/1280 and 502 @390.
- **Careers, 4 stats** use a different container: `div.flex.space-between.pb40.flex-wrap.m-flex-col.gap-40.max-1600.ma.mb40` `[40,4859,1360,135]` @1440, items `flex-col gap10` with natural widths 120/203/230/163. Stats: "10" KEY LOCATIONS · "75+" TALENTED TEAM MEMBERS · "60%" WOMEN IN LEADERSHIP ROLES · "100%" LIFE-LONG LEARNERS. Height 328 @1440 and 645 @390 (column, gap 40).
- Numbers are `.text-xl` 72/72 (60/60 @390). Labels are `.text-heading`.
- Count-up animation: same `data-module="ImpactCounter"` as homepage, so the same GSAP counter is assumed. **UNVERIFIED** that these animate (not sampled).

**ImageCard (b)**
- **About Mission** (about S6): section `p40 m-p20 pos-rel z-2 mtn40 br-t-32 bg-white` (cream). Wrapper `image-card-wrapper mb40 mt40 max-1200` `[120,4613,1200,532]`, image left offset (`ml-130`, not flipped) `[250,4613,1070,412]`, card `[120,4872,650,233]` p40. Card content: `p.h4.balance` "We’re on a mission" (38px h4, not h5) + 1 paragraph (29 words) `f-16`. No button. Section 692 @1440 and 669 @390.
- **About Careers** = `Careers` with the new image (see above). Section 692 @1440 and 626 @390.
- **Educators ExpertList** (edu S5): section `bg-orange p40 br-t-32 mtn40 pos-rel z-2` 828 @1440 / 789 @1280 / 1062 @390.
  - Inner `max-1300 ma mt40`. Title `p.h5.text-center.mb60` "Delivered by academic experts for seamless university rollout".
  - Then a **flipped** ImageCard (`image-card-wrapper mb40 mt40 w-100`, no max-width beyond the 1300 parent): image `[70,5609,1170,450]` (2.6:1, `mr-130`), card `[720,5759,650,380]` p40, bottom/right.
  - Card content (gap 20):
    1. `p.f-16.mb20`: the 28-word paragraph (exact: "Our Academic Team handles the full rollout of Cadmus across your institution—minimising workload for assessment teams and educator users, and ensuring smooth adoption for both educators and students.").
    2. `ul.pt20.w-100.list-wrapper.bt1-dashed`: `border-top:1px dashed #CFC0B0; padding-top:20px; display:flex; flex-direction:column; gap:15px`. Five `li.f-italic.f-16` items: STIX Two Text italic 16/22.4, `list-style:disc outside; margin-left:20px`.
  - @390: image `[20,7467,350,280]` (5:4), card `[50,7687,310,542]` p20 `margin:-60px 10px 40px 30px`.

### 1.3 TwoColumnRows (b): required props
The current component hard-codes 4 rows. The markup is exactly the original's (`div[data-module=TwoColumns].p40.m-p20.br-t-32.mtn40.bg-white.pos-rel > div.max-1200.m-mt40.m-mb20.ma > div.two-columns(.flipped)`), so only data and these options are needed:

| Prop | Values seen |
|---|---|
| `rows[]` | `{image, label?, title, paragraphs[], quote?{text, author}, button?{text, href}}` |
| `startFlipped` | uni/edu/students: row 1 is **flipped** (text left, image right), then alternates. About: row 1 is **not** flipped (image left). Single rows: careers flipped, contact flipped. |
| `rowGap` | 0 (default; rows overlap by -40 as sheets). **About uses `gap-60`** on the outer `flex flex-col` wrapper (rows at y 2085 / 2631 / 3229). |
| `standalone` | careers S3 and contact S1 render one `TwoColumns` div directly as a main child (no outer cream wrapper, z-index auto). |

- Grid: `two-columns` 605/495 (normal) or 495/605 (flipped) @1440, gap 100. The image cell has `p20` (images 565 wide). The text cell is `flex-col justify-center` with `max-550` inner and gap 20.
- **Label** (uni, edu): `p.label.mra`. See §0 (13px Inter 500 uppercase, light-orange 9px strip, padding 0 10px). Example rect `[120,1603,298,9]`.
- **Body**: `f-16` (`m-14` -> 14/19.6 @390). The educators "Less admin, more Support" body is wrapped in a `<span>` and is 479 wide.
- **Quote box** (uni and edu rows only), placed below the body:
  - Box: `div.br-12.w-100.p20.bg-light-orange` (r12, p20, `#FFE7DB`), e.g. `[120,1835,495,186]` @1440 and `[20,2177,350,245]` @390.
  - Inside it: `div.quote-icon.mb10` (25x20), then `p.f-16.h7` (AT Realm Book 16px/20px, ls -0.024px, 455 wide), then `div.flex.gap-20.mt20.space-between > p.text-xs-heading.max-350` (author line, Inter 13/18.2, ls .65px, uppercase).
  - The author line sits inside an `<a href="">` (the CMS link is empty, so it resolves to the current page). There is no hover.
- **Button** (about row 2, contact row): `a.arrow-button.m-mt20.mra`. About "Learn more" -> `/`; contact "Contact support " (sic, trailing space) -> `https://support.cadmus.io/kb-tickets/new`.
- Motion: as on the homepage (`fade--up` / `fade--up reverse` on the title and body wrappers, via sal).

### 1.4 New section types (c): built once, shared

| # | New type | Used on |
|---|---|---|
| 2.1 | `HeroBannerAlt` (centred hero, optional full-bleed bg image) | universities, careers, contact, request-demo |
| 2.2 | `ProductHero` (split hero: text left, image right) | educators, students *(also likely on product pages; coordinate with `specs/pages-product.md`)* |
| 2.3 | `Cta` (orange closing CTA) | universities, educators, students, about, careers |
| 2.4 | `Values` (3-col icon/title/text grid) | about, careers, trust-centre (x2) |
| 2.5 | `IntroSplit` (orange, centred h4 + flipped 2-col h4/text/image) | careers, trust-centre |
| 2.6 | `ContentWithBulletPoints` | universities, students |
| 2.7 | `QuoteCarousel` | educators, students |
| 2.8 | `CaseStudyCarousel` (with bare RoiCard above) | universities |
| 2.9 | `ContactForm` | contact, request-demo |
| 2.10 | `DeliveryTypes` | educators |
| 2.11 | `SupportCards` (SolutionCards variant) | students |
| 2.12 | `HeroBanner` (about: headline + wide image strip) | about |
| 2.13 | `Timeline` ("The road to now") | about |
| 2.14 | `Reasons` (numbered list + image) | careers |
| 2.15 | `Leaders` | careers |
| 2.16 | `Positions` | careers |
| 2.17 | `TeamQuotes` | careers |
| 2.18 | `SmallHeroBanner` | trust-centre |
| 2.19 | `Policies` | trust-centre |

---

## 2. New section types: full measurements

### 2.1 HeroBannerAlt (`data-module="HeroBannerAlt"`)
- **Root:** `div.bg-maroon.orange.pos-rel.flex.flex-col.pth` (bg `#580C1D`, text `#FFC8AE`, `padding-top:90px`).
  - The **image variant** adds `.mh-100vha` (`min-height:100svh`, or `calc(100svh+20px)` at <=1600).
  - Heights:
    - Image variant (uni, careers): 920 @1440, 820 @1280, 864 @390.
    - No-image variant (contact, request-demo): 569 @1440/1280, 542 @390.
- **Background image** (image variant only): `div.bg-image` = `position:absolute; inset 0; width/height:100%; object-fit:cover`, covering the whole hero (`[0,0,1440,920]`). There is no overlay or gradient; text sits directly on the photo, and the maroon shows only while it loads.
  - Careers also has a `div.m-show` mobile image (`1754722094-iphone-16-plus-32-1.jpg`, 860x1600 source) covering the hero at <=768.
  - Universities has no mobile image (the empty `m-show` div is rendered) and uses the desktop image cropped by cover.
- **Text block:** `div.p40.m-p20.max-1100.ma.pos-rel.z-2.flex.flex-col.align-center.gap-20.text-center`.
  - Image variant: vertically centred by auto margins (e.g. uni `[170,285,1100,300]`; careers `[391,297,659,275]`, which shrinks to content).
  - No-image variant: a 100px spacer precedes the block, so it lands at `[230,190,980,239]`.
- **Overline** (uni only): `span.sm-heading` (Inter 14/18.2, ls .28px, uppercase) "Cadmus for Higher Education Leaders" `[564,325,312,18]`.
- **H1:** `h1.h3.m-36` AT Realm Book 44/48.4, centred. 36/39.6 @390.
- **Caption:** `p.f-18.m-16.max-900.ma.mb20.m-m0.mt20` Inter 18/25.2 (16/22.4 @390). `margin-top:20px; margin-bottom:20px` (0 @390).
- **Button** (careers only): `div.fade--in-up > button.arrow-button.orange` "Browse careers" `[627,491,185,42]` (37 tall @390).
  - Border 1px `#FFC8AE`, text and arrow `#FFC8AE`.
  - Click: smooth-scroll to `#positions` (the Positions section id). Implementation detail **UNVERIFIED**; assume `lenis.scrollTo('#positions',{offset:-85})` as for other hash links in CLONE_SPEC.
- **Bottom:** `div.spacer.mb40` (100 + 40 margin).
- **Motion** (sal `fade--in-up`, `.65s ease .2s`, translateY 20 -> 0): overline delay 500; h1 600; caption 700; button wrapper 700.

### 2.2 ProductHero (`data-module="ProductHero"`)
- **Root:** `div.pos-rel.mh-100vha.p40.m-p20.flex.flex-col.pth.bg-maroon.orange`, padding `90px 40px 40px` (20 @390). Height 920 / 820 / 864.
- **Row:** `div.max-1600.m-mth.w-100.m-wrap.ma.pos-rel.z-2.flex.align-center.gap-20` `[40,271,1360,428]`. @390: `margin-top:95px`, wraps, `[20,115,350,519]`.
- **Left column:** `div.w-50.m-100` (670) > `div.max-600.ma.flex.gap-20.flex-col` `[75,349,600,272]`:
  - `p.text-sm-heading.m-mt20` (Inter 14/19.6, ls .7px, uppercase). Examples: "Cadmus for Educators" / "Cadmus for Students".
  - `h1.h3.m-30`: 44/48.4, or **30/33 @390**.
  - `p.f-18.m-16.max-900.ma.mb20.mt20.m-m0`: 18/25.2 (16 @390).
- **Right column:** `div.w-50.m-100.m-pb40` with the image at natural aspect (`[730,271,670,428]`, source 923x589). No radius. @390: `[20,370,350,223]`.
- **Motion:** none (no `data-sal` on ProductHero). The image uses gatsby-image's 500ms opacity fade-in only.

### 2.3 Cta (`data-module="Cta"`)
- **Root:** `div.p40.m-p20.mtn40.br-t-32.pos-rel.z-2.bg-orange` (`#FFC8AE`).
- **Height:**
  - 514 @1440/1280, 490 @390 (two-line title).
  - Careers: 470 @1440, 455 @390 (one-line title, single button).
- **Structure:**
  - `div.spacer.m-spacer` (100 / 60 @<=768).
  - `div.max-1100.ma.balance.text-center.flex.flex-col.align-center` `[170,7239,1100,234]` @1440, containing:
    - `p.h4.m-30.mb20`: 38/43.7, 30/34.5 @390.
    - `div.text-lg.mb40.flex.flex-col.gap-20 > p` (16/22.4).
    - `div.flex.gap-20.align-center`: `a.button` (dark, 128-129x41-42; 36 tall @390) and optional `a.arrow-button` (175x41 "Get a free trial", 156 "Try for free").
  - `div.spacer` (100).
- Buttons are centred `[558,7431,325,42]` and stay on one row @390 (`[34,10507,323,36]`).
- **Copy:**
  - uni / edu / students: title "Provide the structure to success with high-quality, scaffolded assessments". Body (1 sentence, exact): "Whether you're rolling out assignments, delivering exams, or reporting on results, Cadmus gives you time and clarity to uplift assessment for better learning outcomes."
    - uni buttons: "Book a demo" -> `/request-demo`, "Get a free trial" -> `/contact`.
    - edu and students buttons: "Book a demo" -> `/request-demo`, "Try for free" -> `/contact`.
  - about: same title. Body uses "…reporting on **outcomes**…" (24 words). Buttons "Book a demo" -> `/` and "Try for free" -> `/` (sic, CMS links are `/`).
  - careers: title "Could we be your next assignment?" (CMS has a U+2028 line separator after "be"). Body 32 words, 1 paragraph. Single `a.button` "Join our talent pool" -> `/contact`.
- **Motion:** none.

### 2.4 Values (`data-module="Values"`)
- **Root:** `div.p40.m-p20.br-t-32.pos-rel.flex.flex-col.mtn40` plus a background:

| Page | bg | z-index |
|---|---|---|
| about | `#FFE7DB` light-orange | auto |
| careers | `#FFE7DB` | auto; **margin-top 0** (no overlap) |
| trust S3 | `#FCF7EF` cream | 2 |
| trust S4 | `#FFFFFF` pure white | 2 |

- **Title:** `p.h4.text-center` (e.g. about `[40,1441,1360,44]`).
- **Optional intro** (trust only): `p.text-lg.ma.max-1100.balance.text-center.mb20.mt20` (16/22.4), 44 / 24 words.
- **Grid:** `div.max-1200.ma > div.grid-3` (`repeat(3,1fr)`, `column-gap:40px; row-gap:80px`; 373.33px columns @1440). The title-to-grid distance is 80px (about title bottom 1485 -> grid 1565).
  - @<=768: 1 column, gap 40 (about grid `[20,1649,350,1162]`).
- **Item:** `div.flex.flex-col.gap-20`: `img` icon 34x34 (`.icon`, contain; sources 36x36 SVG), `p.h6` (22/27.5), `p.max-400` Inter 14/19.6.
- **Section heights:**

| Page / section | 1440 | 390 |
|---|---|---|
| about | 744 | 1412 |
| careers | 764 | 1231 |
| trust S3 | 670 | 1214 |
| trust S4 | 1072 | 2206 |

- **Motion:** none. No hover.

### 2.5 IntroSplit (careers S1, trust S1; no data-module)
- **Root:** `div.p40.m-p20.bg-orange.br-t-32.mtn40.pos-rel` (z auto).
  - Careers: 806 @1440, 747 @1280, 817 @390.
  - Trust: 849, 791, 820.
- **Container:** `div.max-1400.ma.mt20.mb40.pb20`.
- **Title:** `p.h4.mb60.m-mb0.mt40.text-center.balance.max-800.ma` `[320,960,800,44]`.
- **Grid:** `div.two-columns.m-col.flipped.m-col-reverse.mb40.pt20` (`.45fr .55fr` -> 567/693 @1440, gap 100, `pt20 mb40`).
  - Text cell: `div.flex.justify-center.align-start.flex-col.gap-20.max-550` (550 wide) containing:
    - `p.h4.balance` (left-aligned 38px h4, e.g. `[40,1165,550,131]` 3 lines).
    - `div.text-lg.flex.m-14.flex-col.gap-20` paragraphs.
    - Optional `button.arrow-button` "Browse careers" (scrolls to `#positions`), `[40,1423,185,42]`.
  - Image cell: `div.pos-rel.overflow.ratio-3-2.h-100.br-8` (693x462, r8) with a cover image.
- **@390:** column-reverse, so the image comes first `[20,964,350,233]`, then the text (gap 40).
- **Motion:** none (no sal).

### 2.6 ContentWithBulletPoints (`data-module="ContentWithBulletPoints"`, `<section>`)
- Always preceded by a plain 100px `Spacer` (`div.spacer`, transparent) which follows the TwoColumns block.
- **Root:** `section.bg-light-grey.p40.br-t-32.mtn40.pos-rel.z-2` (bg `#FFFDFA`).
  - uni: 802 @1440, 769 @1280, 1047 @390.
  - students: 738, 704, 954.
- **Container:** `div.max-1300.ma.mt40.flex.flex-col.gap-60`.
  - Header: `div.ma.m-m0.flex.flex-col.gap-20.align-center.text-center` containing `p.h5` and an optional `p.f-16.balance` subtitle (uni: 28 words, given in §1.2; students: none).
  - Grid: `div.grid.grid-2.gap-40` (630/630 @1440).
    - Image: `div.pos-rel.br-8.overflow.h-100.ratio-3-2` (630x420, r8, image cover; source 654x353).
    - List: `ul.flex.flex-col.gap-20` of `li.bullet-point` (Inter 14/19.6). Each li has `border-bottom:1px dashed #04191F; padding:0 0 20px 20px; position:relative; list-style:none`, and a `::before` dot: `5x5; border-radius:100%; background:#000; left:0; top:7.5px`. Single-line li is 41 tall.
- **@390:** 1 column, gap 40. Image `[20,6636,350,233]`, list below.

### 2.7 QuoteCarousel (`data-module="QuoteCarousel"`, `<section>`)
- **Root:** `section.p40.pos-rel.z-4.br-t-32.mtn40.quote`, with an inline `style="background:#fcf7ef"` (educators) or `#ffe7db` (students). Padding 40, or 20 @390.
  - Height: edu 664 / 600 / 877; students 620 / 556 / 817 (@1440 / 1280 / 390).
  - **z-index 4** (above the next CTA's overlap).
- **Title block:** `div.max-1400.ma.mt20.mb20.pb20 > p.h4.text-center.max-800.ma`. Educators: "Hear why educators love Cadmus".
  - Students: **the title renders empty on live** (the `p` is 0 tall although page-data `hearTitle` = "Hear why students love Cadmus"), so the block is only 20px tall. Clone it empty to match.
- **Carousel container:** `div.max-1600.pl80.pr80.m-p0.ma.pos-rel.z-2` (padding 0 80; 0 @390) > Swiper.
- **Slide card:** `div.flex.p20.m-wrap.gap-60.bg-pure-white.br-12.align-center` `[120,6711,1200,480]` @1440 (white, r12, p20, gap 60).
  - Image column `div.w-40.m-100` > `div.ratio-1-1.m-ratio-16-9.bg-grey.pos-rel.br-8.overflow` (440x440 @1440; 310x174 16:9 @390), image cover (source 1000x1250).
  - Text column `div.w-60.m-100` (660):
    - `p.ma.h6`: the quote (AT Realm 22/27.5, ls -.033; 48 words, 1 paragraph, starts and ends with straight double quotes).
    - `div.mt40.quote-author.flex.flex-col.m-mb20`: `border-left:2px solid #580C1D; padding-left:10px; margin-top:40px`. Contains `p.text-heading.f-500` "Tash Clutterbuck" (13/13, ls 1.3, w500 uppercase) and `p.f-16` "Lecturer, School of Nursing and Midwifery, University of Notre Dame Australia".
- **Background band:** `div.background-element.orange` = `position:absolute; bottom:0; left:0; width:100%; height:250px; background:#FFC8AE; border-radius:32px 32px 0 0; z-index:1`. This orange band sits behind the lower part of the white card and leads into the orange CTA.
- **Nav:** `button.m-hide.quote-prev/quote-next.nav-arrow`. They are hidden (Swiper adds `swiper-button-lock` because there is only 1 slide), so don't render them visibly.
- **Swiper:** `slidesPerView 1, spaceBetween 20, loop true, speed 850, effect slide`, no autoplay. Only 1 testimonial on both pages, so it is effectively static.
- **@390:** the card wraps vertically `[20,8996,350,717]` (edu); the 60 gap becomes the vertical gap.

### 2.8 CaseStudyCarousel (universities S8; no data-module on the section)
- **Section root:** `div.pos-rel.mtn40.br-t-32.z-2.p40.m-p20.bg-white` (cream). 1700 @1440, 1703 @1280, 2335 @390.
- **Order inside the section:**
  1. Title `p.h4.text-center.mb40.m-mb20.mt40` "Hear why university leaders trust Cadmus" `[40,5520,1360,44]`.
  2. **RoiCard (bare variant)** (§1.1).
  3. The carousel.
- **Carousel wrapper:** `div.max-1600.ma.pos-rel` `[40,6373,1360,626]` > `div.mx40.m-m0` (margin 0 40) > `div.swiper.swiper-autoheight` (1280 wide @1440).
- **Swiper params:** `slidesPerView 1, spaceBetween 0, loop true, speed 850, effect slide, autoHeight true`, no autoplay, touch enabled.
- **Slide card:** `div.max-1300.br-12.case-study-card.pos-rel.z-2.ma.grid-2.m-gap-0.m-col`: grid 630/630, gap 20, r12, bg = scheme dark colour. @390 it becomes a flex column with gap 0.
- **Left column `div.p20.br-12`:**
  - `p.h4.mb40.m-mb20.balance` (university name, colour = accent; 26/29.9 @390).
  - Inline SVG quote mark 19.6x14 (`viewBox 0 0 26 18`, fill = accent), `mb10`.
  - `p.f-16.white.max-600.mb20`: quote text, colour `#F7F4F0`. Word counts: Manchester 65, Notre Dame 49, RMIT 101, UWA 90, Canberra 88. Each is 1 paragraph; use placeholder text.
  - `div.flex.white.gap-5.flex-col.pl6.case-study-quote-author.mb20`: `border-left:3px solid accent; padding-left:10px`. Contains `p.text-heading.f-500` (name) and `p.f-16.op-80` (role, opacity .8).
  - `div.flex.white.align-start > a.arrow-button.mb40.m-mb20.mra.transparent.white` "Read the full Case Study" (203x20; the arrow has a cream filter). Omitted when there is no link (Canberra).
  - `p.text-heading.white.mb20` "Highlights".
  - `div.flex.m-col.gap-16`: 3 stat tiles `div.p20.w-100.br-12.flex.flex-col.align-center.justify-center.text-center`, each 186 wide (310 @390), bg = accent. Each tile contains:
    - `p.h3.mb10` number: 44/48.4 (38/41.8 @390), colour = card dark colour.
    - `p.bt1.pt10.w-100.balance` label: Inter 14/19.6 ink, `border-top:1px solid <card dark colour>`, `padding-top:10px`.
- **Right column** `div.p20.m-hide` (hidden <=768) > `div.p40.flex.m-ratio-5-4.h-100.w-100.m-p20.pos-rel.br-8.overflow` containing an absolute cover image (590x586 for slide 1). Image height follows the left column.
- **Colour schemes** (measured):

| `colourScheme` | card bg (dark) | accent (title, quote svg, author border, tiles) |
|---|---|---|
| blue | `#123D69` | `#B6DBFF` |
| red | `#580C1D` | `#FFC8AE` |
| yellow | `#3E2E2C` | `#FFE388` |
| lavender | `#262258` | `#C5C5FF` |
| green | `#455017` | `#D1E375` |

- **Slides** (in order): name / scheme / highlights / person / role / link

| # | Name | Scheme | Highlights (number — label) | Person | Role | Link |
|---|---|---|---|---|---|---|
| 1 | The University of Manchester | blue | 89% — positive student experience · 96.31% — student pass rate · +17.6 — increase in student experience score | Professor Gabrielle Finn | Associated Vice President for Teaching, Learning and Students | `/study/case-study-the-university-of-manchester/` |
| 2 | The University of Notre Dame Australia | red | 0 — breaches of academic misconduct · 82.2% — positive student experience · 77% — students found Cadmus very easy to use | Tash Clutterbuck | Lecturer, School of Nursing and Midwifery | `/study/case-study-the-university-of-notre-dame/` |
| 3 | RMIT | yellow | 84.6% — exams transitioned to in-semester tasks or open-book assessments · +1.8% — increase in student pass rates when working in Cadmus · 100% — student pass rate | Ishpal Sandhu | Principal Advisor Learning and Teaching (Secondment), College of Business and Law | `/study/rmit-university/` |
| 4 | University of Western Australia | lavender | 97% — educators reported enhanced assessment design abilities · 92% — reduced academic integrity investigations · 89.29% — positive student experience | Professor David Sadler | Deputy Vice-Chancellor, Education (former) | `/study/case-study-the-university-of-western-australia/` |
| 5 | University of Canberra | green | 82.2% — positive student experience · +4.7% — increase in grade average scores · +5.9% — increase in pass rates | Stephanie Watts | Lecturer, Faculty of Education | none |

- **Nav buttons:** `button.carousel-nav.carousel-nav--prev/--next`.
  - 50x50, `position:absolute; top:50%; transform:translateY(-50%); left:-25px / right:-25px` (relative to the max-1600 wrapper), `z-index:10`, `transition:opacity .3s`, `:hover{opacity:.7}`.
  - Each contains an outlined `arrow-button` (111x41 "Prev" with `::before` reversed arrow; 112x41 "Next" with `::after` arrow). It overflows the 50px button and is centred on it: measured prev pill `[-15,6666,111,41]` (partly off-screen at 1440), next `[1344,6666,112,41]`.
  - @<=768: `top:auto; bottom:-60px; transform:none`, prev `left:30px`, next `right:30px`. Measured pills `[20,10072,111,36]` and `[259,10072,112,36]`.

### 2.9 ContactForm (`data-module="ContactForm"`, `<section id="contact">`)
See §5 for fields and behaviour.
- **Root:** `section.p40.m-p20.br-t-32.mtn40.pos-rel.z-2`. bg orange `#FFC8AE` (contact, `name="contact-form"`) or light-orange `#FFE7DB` (request-demo, `name="demo-form"`).
- **Height:** 818 @1440/1280, 1002 @390.
- **Container:** `div.max-1100.ma.pb40` `[170,…,1100,718]`.
  - Heading block `div.max-700.mt20.pb20.ma.text-center.balance`: `p.h4.mb20` "Chat to the team" + `p.text-lg` "We'd love to discuss your institution's goals and take you through the Cadmus platform."
  - `div.contact-form-container.mt40.mb20.pos-rel` (relative; hosts the overlay), containing:
    - `form.contact-form` `[170,1218,1100,512]`.
    - `div.thank-you-overlay` (absolute, covers the form).

### 2.10 DeliveryTypes (educators S2; no data-module)
- **Root:** `section.bg-pale-yellow.p40.br-t-32.mtn40.pos-rel.z-2` (`#FFF5D4`). 978 @1440/1280, 548 @390.
- **Container:** `div.max-1200.ma.mt40.flex.flex-col.gap-20`:
  - `p.h5.text-center.mb20` "Supporting the delivery of every assessment type".
  - `menu.w-100.mb20.flex.connected-menu` (overflow auto; native horizontal scroll at mobile). **Reuse ConnectedProducts' tab-strip styling**: `.menu-item-wrapper` (`padding-inline:31px`, 20 @<=990; `border-right:1px solid rgba(22,19,19,.376)`; first `padding-left:0; justify-content:flex-start`; last no border, `padding-right:0; justify-content:flex-end`; `flex-grow:1; flex-shrink:0`).
    - Items are **links** (`a.menu-item.bg-pure-white`): always white, no active state, r4, `padding:4px 12px 4px 4px`, gap 10. Each holds `img.icon.small` 30x30 and `span.sm-heading` (14/18.2, ls .28, uppercase).
    - Items @1440: Assignments `[120,1448,161,38]`, Exams `[345,…,107]`, Group Work `[514,…,155]`, Feedback & Marking `[733,…,217]`, Learning Assurance Analytics `[1013,…,307]`.
    - Links: `/product/assignments/`, `/product/exams/`, `/product/group-work/`, `/product/marking-feedback/`, `/product/learning-analytics/`.
    - The CMS titles have a leading space (" Assignments").
  - Image `div.pos-rel.overflow` with the image full-width at natural ratio `[120,1526,1200,583]` (source 1468x713 served; original 5321x2584). No radius.
  - `div.spacer` (100).
- **@390:** strip items at x 20, 222, 370, 566, 824 (scrolls horizontally); image 350 wide.

### 2.11 SupportCards (students S5; SolutionCards "support" variant)
- **Root:** `section.bg-white.p40.br-t-32.mtn40.pos-rel.z-2` (cream). 825 @1440/1280, 1654 @390.
- **Container:** `div.max-1200.ma.mt40`.
  - Header `div.flex.flex-col.gap-20.mb40.m-mb20.text-center`: `p.h5` "Need support with Cadmus?" + `p.f-16.m-14` "View our Student User Guides".
  - Grid: `div.grid-3.gap-20` (386.66 columns; 1 column @<=768).
- **Card** `div.bg-card.p20.br-12.flex.flex-col.gap-20` (`#FFFDFA`; r8, because `.bg-card` sets 8 and wins; shadow `1px 8px 12px rgba(207,192,176,.12)`). 387x485 @1440, 350x448 @390.
  - Square image `div.pos-rel.ratio-1-1.br-8.overflow` (347x347; source 764x764).
  - `p.h6` title.
  - `div.pt10.bt1.border-red.flex` (`border-top:1px solid #CFC0B0; padding-top:10px`) > `a.arrow-button.transparent.mla` "Learn more" (right-aligned, 116x20).
- **Differences vs homepage SolutionCards:** bg-card instead of pure white; p20 not p15; 1:1 image not 2:1; no body text; divider line; link right-aligned.
- **Cards:**
  1. "Completing exams in Cadmus" -> `https://cadmus.io/video/getting-started-for-students/`
  2. "Accessing grades and feedback" -> `/video/grades-and-feedback/`
  3. "Submitting your assesssment" (sic, triple s) -> `/video/submitting/`

### 2.12 HeroBanner (about; `data-module="HeroBanner"`)
- **Root:** `div.bg-maroon.orange.mh-100vha.flex.flex-col`. 920 / 820 / 864.
- **Children, in order:**
  1. `div.spacer.m-spacer` (100 / 60).
  2. Text block `div.p40.m-p20.max-1100.mla.mth.mta.mra.flex.flex-col.gap-20.text-center.balance` `[257,190,926,177]` (`margin-top:90px`). It contains `h1.fade--in-up.h3.m-36` (sal delay 300) wrapping a `<p>` with a `<br>`: "Built with research.<br>Focused on students. Trusted by educators." 44/48.4 -> 36/39.6 @390, `[297,230,846,97]`.
  3. `div.spacer.m-hide` (100).
  4. Desktop image `div.m-hide.mb60.mba.fade--in` (sal delay 500; `.fade--in` = opacity 0 -> 1, `.65s ease .2s`) > gatsby image `w-100 ratio-9-2` `[0,467,1440,320]` (source `1750939194-group-1000006108.png` 2592x573), edge to edge, no radius.
  5. Mobile image `div.m-show.fade--in` (delay 500) > image `w-100 mb60` `[0,309,390,260]` (`1753358572-frame-1430105874-3.png`, 1075x718).

### 2.13 Timeline ("The road to now"; about S5; no data-module)
- **Root:** `div.pt40.pb40.bg-maroon.white.br-t-32.mtn40.pos-rel.z-2` (bg `#580C1D`, colour `#F7F4F0`, padding 40 0). 779 @1440, 765 @1280, 727 @390.
- **Title:** `p.mt40.h4.pb20.text-center.m-mb0` "The road to now" `[0,3875,1440,64]`.
- **Container:** `div.pb20.mb40.ml40.mr40.m-m0.m-p0`.
  - Desktop (hidden <=768): `div.max-1600.m-hide.ma.grid.grid-4.gap-20` (4 x 325 @1440, gap 20).
  - Mobile: `div.m-show.mb20 > .swiper`.
- **Milestone card:** `div.milestone.bg-light-orange.flex.flex-col.p10.br-12.red.pb20` (bg `#FFE7DB`, text `#580C1D`, padding `10px 10px 20px`, r12). 325x398 @1440, 350x388-408 @390.
  - `div.ratio-3-2.bg-grey.br-12.overflow.pos-rel` image (305x203, r12, cover).
  - `p.h5.mt10` year (30/37.5; 24/30 @390).
  - `div.lh-5` body (Inter 14/19.6).
- **Milestones:** "2018" (34 words), "2019-2022" (29), "2023" (30), "2025" (33). Each body is 1 paragraph; use placeholder text.
- **Timeline line:** `div.timeline.mb40`: full width, `aspect-ratio:1725/68` (1440x57 @1440), `background:url(/static/timeline-b8dd….svg) center/contain no-repeat`. At <=990: `aspect-ratio:530/68; background-size:auto 100%`. Then `div.pb40.m-hide`.
- **Desktop animation** (GSAP, from the about chunk; skipped when `innerWidth<=768`):
  ```js
  gsap.set(milestones, { opacity: 0, y: 20 });
  const tl = gsap.timeline({ repeat: -1 });
  milestones.forEach(m => {
    tl.to(m, { opacity: 1, x: 10, duration: 0.4 }, "-=0.2");
    tl.to(m, { opacity: 0, x: 20, duration: 0.6, delay: 5 }, "+=0");
  });
  ```
  - Ease is the GSAP default (`power1.out`).
  - Result: **only one card is visible at a time**, cycling 2018 -> 2019-2022 -> 2023 -> 2025, about 6s each. The visible card sits at translate(10px,20px). The other grid slots stay empty (opacity 0). The cycle starts on mount, not on scroll (verified: card 1 visible immediately, and it began fading at ~5.4s).
- **Mobile:** Swiper `slidesPerView 1, spaceBetween 20, loop, speed 850, autoplay {delay:3500, disableOnInteraction:false}`. Each slide is `div.p20` wrapping a milestone (slide 390 wide; card `[20,5271,350,408]`).

### 2.14 Reasons (careers S2; `data-module="Reasons"`)
- **Root:** `div.p40.m-p20.bg-white.br-t-32.mtn40.pos-rel` (cream, z auto). 750 @1440, 808 @1280, 1187 @390.
- **Container:** `div.max-1400.ma`.
  - Title `p.h4.text-center.mt40.pb20.mb40.m-mb20.balance` "Five reasons to join Cadmus".
  - Grid `div.two-columns.equal` (`1fr 1fr`, areas "image content", gap 100 -> 630/630).
    - Image `div.pos-rel.overflow.ratio-5-4.h-100.br-8` (630x526, r8).
    - Content `div.w-100.flex.flex-col.justify-center > div.w-100.flex.flex-col.gap-20`, holding 5 items `div.flex.flex-col.gap-20`:
      - `p.flex.gap-20.align-center` containing `span` number (AT Realm Book 30px/30px, ls -0.045px; 24/24 @390) and `p.h6` title.
      - `p` body (Inter 14/19.6; 26/24/24/30/29 words, 1 paragraph each).
- **Items:** "01." Be part of something bigger · "02." Learn and grow quickly · "03." Work with a creative, mission-driven team · "04." Embrace flexibility · "05." Enjoy our work perks.
- **@<=990:** areas "content" then "image" (text first, image after: `[20,2489,350,280]`), gap 40.

### 2.15 Leaders (careers S5; no data-module)
- **Root:** `div.p40.m-p20.mtn40.br-t-32.pos-rel.z-2.bg-white`. 1091 @1440, 1069 @1280, 1602 @390.
- **Container:** `div.max-1600.ma.mt40`.
  - Intro `div.max-800.ma.text-center.mb60.mt20`: `p.h4.mb20` "Our people are the heart of the Cadmus story" + `div.text-lg.m-14.flex.flex-col.gap-20` with 2 paragraphs (34 words placeholder, then exactly "Meet our lead mark makers.").
  - Grid `div.grid-2.gap-20.mb40` (670/670; 1 column @<=990). Each item:
    - `div.ratio-16-9.br-8.pos-rel.overflow.mb20` (670x377).
    - `p.h4.mb10` name.
    - `p.italic.mb10` role (STIX italic 22/30.8).
    - Empty `p.text-sm-heading.m-mb20.mb20` (0 tall but keeps the 20 margin).
    - `div.flex.flex-col.gap-20.balance.m-14.text-lg.mb40` bio (1 paragraph: Herk 95 words, Brigitte 90).
- **People:** "Herk Kailis" / "Founder and Co-CEO"; "Brigitte Elliott" / "Co-CEO".

### 2.16 Positions (careers S7; `section#positions`)
- **Root:** `section.bg-light-grey.mtn40.p40.m-p20.br-t-32.pos-rel.z-2` (`#FFFDFA`, **`id="positions"`**). 894 @1440/1280, 1237 @390.
- **Container:** `div.max-1200.ma.mt40`:
  - `p.h4.text-center.mb40` "Positions at Cadmus".
  - `div.grid-3.gap-20` (386.66 columns; 1 column @<=768).
  - Footer block `div.max-800.ma.text-center.flex.flex-col.gap-20.align-center.mt40.pt20.m-p0`:
    - `p.f-16` "Can’t find the right role?"
    - `p.f-16.mb20.balance`, exact: "Interested in joining the Cadmus team but don’t see the right opportunity? Join our talent pool—we’ll keep your resume on file and let you know when a suitable role becomes available."
    - `a.arrow-button` "Get in touch" -> `/contact/`.
- **Card** `a.br-12.drop-shadow.p20.flex.flex-col.gap-10`: inline bg from CMS `#FFE7DB`, r12, shadow `1px 8px 12px rgba(207,192,176,.12)`. 387x157 (185 when the title wraps).
  - `img.icon.small` 30x30 (`1754360991-frame-1272638844.svg`).
  - `p.h6.mb20` title.
  - `div.flex.align-center.gap-10.mta` (bottom row): department `p` (Inter 14) and `p.mla` date (right).
  - No hover. `target` attribute **UNVERIFIED** (links are absolute workable.com URLs).
- **Cards** (title · department · date · href):
  1. Brand & Community Manager · Commercial · 01.10.2026 · `https://apply.workable.com/cadmus-io/j/0ED5B2CF52/`
  2. Senior Product Designer · Product · 01.10.2026 · `https://apply.workable.com/cadmus-io/j/7537B56A80`
  3. Head of Partner Success · Commercial · 01.10.2026 · `https://apply.workable.com/cadmus-io/j/879245F3D5/`
  4. Learning Support Specialist - Americas · Commercial · 01.10.2026 · `https://apply.workable.com/cadmus-io/j/B83DE7F306`

### 2.17 TeamQuotes (careers S8; no data-module)
- **Root:** `div.p40.m-p20.br-t-32.mtn40.bg-white.pos-rel.z-2`. 943 @1440, 931 @1280, 1965 @390.
- **Container:** `div.max-1600.ma.mt40.mb40.pb20`:
  - `p.h4.mb60.mt20` "Hear from our team" (**left-aligned**, `[40,5968,1360,44]`).
  - `div.grid-3.gap-20.mb20` (440 columns; 1 column @<=768).
- **Card** `div.p15.br-8.bg-pure-white` (440x639 @1440; 350x539-578 @390):
  - `div.ratio-5-4.br-8.pos-rel.overflow.mb20` (410x328).
  - `p.h4.mb10.m-mb20` name.
  - `p.italic.m-18.mb20` role (STIX italic 22/30.8 -> 18/25.2 @390).
  - `div.flex.flex-col.m-14.m-mb20.gap-20.text-lg` quote (1 paragraph, 42/44/52 words, wrapped in straight quotes).
- **People:** "Chris Renwick" / "Head of University Partnerships (APAC)"; "Sophie Newton" / "Chief Financial Officer"; "Jess Ashman" / "Director of Learning".

### 2.18 SmallHeroBanner (trust; `data-module="SmallHeroBanner"`)
- **Root:** `div.bg-maroon.orange.flex.flex-col`. 368 @1440/1280, 322 @390.
- **Children:** `div.spacer` (100), then `div.p40.mt40.m-p20.max-1100.mla.mta.mra.flex.flex-col.gap-20.text-center.balance` `[560,140,321,128]` containing `h1.h3` "Trust Centre" (44/48.4 -> 38/41.8 @390), then `div.spacer` (100).
- **Motion:** none.

### 2.19 Policies (trust S2; no data-module)
- **Root:** `div.p40.br-t-32.m-p20.text-center.bg-light-orange.mtn40.pos-rel.z-2` (`#FFE7DB`). 692 @1440, 752 @1280, 1638 @390.
- **Children:**
  - `p.text-heading.mb60.mt40` "Our Policies".
  - `div.grid-5.max-1600.ma.mb80`: `grid-template-columns:repeat(auto-fit,minmax(200px,.5fr)); column-gap:40px; row-gap:80px`. That gives 5 x 240 @1440, so 5 items on row 1 and 2 on row 2 (left-aligned). 1 column @<=990.
- **Item** `a.max-300.m-ma.flex.flex-col.align-center.gap-20`: `p.h5` title (30/37.5 centred), `p.f-16` description, `div.arrow-icon.mta` (40x17). No hover.
- **Items:**
  - Terms & Conditions (AU) → `/information/terms-and-conditions/`
  - Terms & Conditions (UK) → `/information/terms-and-conditions-uk/`
  - Privacy (AU) → `/information/privacy-policy-au/`
  - Privacy (UK) → `/information/privacy-policy-uk/`
  - Privacy (CA) → `/information/privacy-policy-ca/`
  - Privacy (US) → `/information/privacy-policy-us/`
  - Accessibility → `/information/accessibility/`
  - Descriptions (exact):
    - "Our standard customer terms and conditions in Australia"
    - "… in the UK"
    - "How we meet privacy and compliance standards in Australia" (has a U+2028 after "and")
    - "… in the UK" / "… in Canada" / "… in the US"
    - "How we make the Cadmus experience accessible to everyone"

---

## 3. Per-page section lists

Each row gives: main child · mapping · bg · rect @1440 (y,h) / @390 (y,h) · content.

### 3.1 `/solutions/universities/`: "For Universities | Cadmus"
docH: 8132 @1440, 8018 @1280, 12074 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | HeroBannerAlt (image) | c 2.1 | maroon + photo | 0/920 | 0/864 | overline "Cadmus for Higher Education Leaders"; H1 "Elevate assessment quality and outcomes institution-wide"; caption "Deliver consistent, high-quality hybrid assessments at scale."; image `1754472675-full-image-page-header.jpg` (3456x1846) |
| 1 | Sheet spacer | b Spacer | cream | 880/100 | 824/100 | (§1.1) |
| 2 | LogoMarquee | b | cream | 980/213 | 924/213 | title "Trusted by leading universities globally" (w500). 23 logos in order: exeter (link `https://www.exeter.ac.uk`), rmit_university_logo-2, usq-logo, bondlogo, zayed, acu-logo, logo-uon, 094c1cda…-1 (1754543826), kcl-logo, maynooth, avd9ij1nl, uog_colour, manchester, uni-of-canberra, uwa, flinders, liverpool-john-moores, images-2-1, logusc, notre-dame, rmit_university_logo-1, adelaide, 626ba0db (all already in `public/assets`) |
| 3 | WhyChoose | b | cream | 1173/470 | 1117/873 | title "Transform your assessment workflow institution-wide"; items: `1771922317-academic.svg` "Support diverse disciplines and delivery modes with scalable, best-practice assessment design." · `1753953967-frame-1321315074.svg` "Streamline the student and educator experience in assessment." · `1753954008-frame-1321315076.svg` "Understand learner journeys through rich end-to-end data." · `1753954034-frame-1272638758.svg` "Reduce educator workloads, freeing them up to focus on what matters." |
| 4 | TwoColumnRows (5) | b | cream | 1603/2666 | 1950/4315 | start flipped; labels + quotes (table below) |
| 5 | Spacer | a | – | 4269/100 | 6264/100 | |
| 6 | ContentWithBulletPoints | c 2.6 | `#FFFDFA` | 4329/802 | 6324/1047 | title "Delivered by academic experts for seamless university rollout"; subtitle (§1.2); image `1754034503-frame-1321314721.jpg`; bullets: "End-to-end assessment redesign and digital setup." · "Tailored platform training for faculty and students." · "Full-scale implementation and adoption support." · "Ongoing local support from dedicated specialists." · "Comprehensive reporting to understand assessment performance." |
| 7 | Integrations | b | orange | 5092/388 | 7331/587 | title "Securely integrated into your existing university ecosystem"; body (exact): "Whether you're delivering coursework or high-stakes digital exams, Cadmus fits naturally within your institutional workflows. Our integrations make it easy streamline assessment delivery without adding complexity." |
| 8 | Title + RoiCard(bare) + CaseStudyCarousel | c 2.8 (+b RoiCard) | cream | 5440/1700 | 7878/2335 | §2.8 |
| 9 | Cta | c 2.3 | orange | 7099/514 | 10173/490 | §2.3 |

TwoColumns rows (label · title · body words · quote words · author · image (natural)):
1. Scaffolded pre-built assessments · Elevate assessment quality across your institution · 25 words · quote 26 words · "Professor David Sadler, Former Deputy Vice-Chancellor (Education), University of Western Australia" · `1753241737-group-1073715572.png` (1158x769) — flipped
2. Guided student environment · Boost student progression and success among diverse cohorts · 24 · 21 · "Professor Gabrielle Finn, Associate Vice President for Teaching, Learning and Students, The University of Manchester" · `1753241820-group-1073715735.png` (1047x986)
3. Class management analytics · Free up educators to focus on what matters most · 32 · 24 · "Associate Professor Kati Tonkin, Chair, Board of Studies (Society and Culture), University of Western Australia" · `1754472911-group-1073715749.png` (1235x795) — flipped
4. Learning Assurance Analytics · Protect academic integrity without disrupting the student experience · 30 · 34 · "David Israel, Executive Director, Global Education Strategy, University of Melbourne" · `1753241871-group-1073715575-1.png` (1027x764)
5. Learner journey insights · Unlock strategic insights with institution-wide assessment analytics · 35 · 37 · "Associate Professor Kati Tonkin Chair, Board of Studies (Society and Culture), University of Western Australia" · `1754201284-frame-1430105971.png` (1031x868) — flipped

Row heights @1440: 498 / 652 / 561 / 560 / 596. Quote-box heights: 186 / 205 / 205 / 226 / 226.

Not rendered although present in page-data: `solutionTitle` and `productSlides` (5 product slides with `1754472727/791/821/851-screenshot…jpg` images). Do not build these.

Motion: hero sal (500/600/700); TwoColumns fade--up; marquee scroll; RoiCard as homepage; carousel on click/drag only.

### 3.2 `/solutions/educators/`: "For Educators | Cadmus"
docH: 8223 @1440, 8037 @1280, 11594 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | ProductHero | c 2.2 | maroon | 0/920 | 0/864 | overline "Cadmus for Educators"; H1 "Assessment delivery and success made simple"; caption (exact): "Cadmus takes the work out of high-quality assessment setup, management, and marking, enabling more time for proactive student support and enhanced success."; image `1753250367-rectangle-3470840-1.png` |
| 1 | WhyChoose | b | cream | 880/451 | 824/883 | title "A trusted end-to-end assessment solution that supports educators"; items: `1753248209-frame-1000009089.svg` "Deliver high-quality assessments in minutes, not hours." · `1753010687-shooting-star.svg` (have) "Remove the need for multiple systems and frequent student emails." · `1771922317-ai-support.svg` "Manage entire cohorts with real-time insights." · `1753010829-checkmark.svg` "Reduce marking and feedback workload with AI-automated features." |
| 2 | DeliveryTypes | c 2.10 | `#FFF5D4` | 1291/978 | 1667/548 | icons `1754047032-a.svg`, `1752906564-secondary-wadbutton.svg` (have), `1754047105-seconadwdary-button.svg`, `1752906960-awdaw.svg` (have), `1752907049-secondadary-button.svg` (have); image `1754047189-frame-1430105748.png` |
| 3 | TwoColumnRows (6) | b | cream | 2229/3143 | 2175/5052 | start flipped; labels + quotes (table below) |
| 4 | Spacer | a | – | 5372/100 | 7227/100 | |
| 5 | ExpertList | b ImageCard (§1.2) | orange | 5432/828 | 7287/1062 | image `1754475357-screenshot-2025-02-13-at-5-07-44-pm-1-1.jpg`; same 5 list items as uni bullets |
| 6 | Integrations | b | orange | 6219/388 | 8309/587 | same copy as universities |
| 7 | QuoteCarousel | c 2.7 | cream (inline) | 6567/664 | 8856/877 | title "Hear why educators love Cadmus"; image `1758000553-excellence-in-education-tash-clutterbuck-2-min.jpg` |
| 8 | Cta | c 2.3 | orange | 7191/514 | 9693/490 | "Try for free" variant |

TwoColumns rows (label · title · body words · quote words · author · image):
1. End-To-End delivery · All your assessments, just one platform · 36 · 42 · "Stephanie Watts, Lecturer, Education, University of Canberra" · `1753325132-group-1073715572.png` — flipped
2. Quality Assessment design · Set up and deploy assessments in minutes · 25 · 24 · "Associate Professor Kati Tonkin, Board of Studies (Society and Culture), University of Western Australia" · `1754529640-group-1073715736.png`
3. Less admin, more Support · Streamline assessment administration · 35 · 29 · "Professor Fiona Smyth, Deputy Dean and Vice Dean for Teaching, Learning and Students, Faculty of Humanities, The University of Manchester" · `1754529640-group-1073715680.png` — flipped
4. Classroom analytics · Manage cohort success with ease and efficiency · 42 · 37 · "Dr Robert Cowan, Director of Teaching Philosophy, University of Glasgow" · `1753325354-group-1073715573.png`
5. Streamlined learning assurance · Reduce workload attributed to academic misconduct · 24 · 49 · "Ishpal Sandhu, Principal Advisor Learning and Teaching (Secondment), College of Business and Law, RMIT" · `1754529641-group-1073715580.png` — flipped
6. AI integration · Streamline moderating & marking with AI-automated features · 29 · 49 · "Renee Pinkneym, Deputy National Undergraduate Program Coordinator, University of Notre Dame AUSTRALIA" · `1754196733-frame-1430106018.png`

Row heights @1440: 560 / 579 / 581 / 541 / 560 / 562.

Not rendered: `students`/`teachers`/`assessments` counters, `trustedTitle` and `logos` (6 old logo files). Do not build.

### 3.3 `/solutions/students/`: "For Students | Cadmus"
docH: 6958 @1440, 6761 @1280, 9522 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | ProductHero | c 2.2 | maroon | 0/920 | 0/864 | overline "Cadmus for Students"; H1 "Less assessment stress, greater student success"; caption (exact): "Clearly understand assessment requirements, draft assessments with academic guidance, receive support when you need it most and submit with confidence."; image `1753250181-rectangle-3470840.png` |
| 1 | WhyChoose | b | cream | 880/451 | 824/853 | title "Why students should use Cadmus"; items (CMS uses U+2028 line breaks): `1753248209-frame-1000009089.svg` "Step-by-step instructions that guide you through assessment" · `1753248280-frame-1321315074.svg` "Academic support resources embedded in your workspace" · `1753248339-frame-1272638843.svg` "Automated academic guidance lets you submit with confidence" · `1753248386-frame-1272638758.svg` "Educator feedback directly in your workspace" |
| 2 | TwoColumnRows (5) | b | cream | 1291/2513 | 1637/2618 | start flipped; **no labels, no quotes**; 1 paragraph each |
| 3 | Spacer | a | – | 3803/100 | 4255/100 | |
| 4 | ContentWithBulletPoints | c 2.6 | `#FFFDFA` | 3863/738 | 4315/954 | title "One seamless space for academic success" (no subtitle); image `1754034503-frame-1321314721.jpg`; bullets: "All your resources, feedback and support tools all in one place." · "A calmer, more focused way to approach assessments." · "A proven way to enhance confidence, reduce anxiety and showcase what you’ve learnt." · "Assessment tasks that mirror the challenges and problem-solving you’ll face in your future career." · "Support and feedback are available when you need them, so you’re never left stuck or unsure." |
| 5 | SupportCards | b SolutionCards / c 2.11 | cream | 4561/825 | 5230/1654 | images `1754048249-vector_layer-2.jpg`, `1754048279-vector_layer-1.jpg`, `1754048291-vector_layer.jpg` |
| 6 | QuoteCarousel | c 2.7 | `#FFE7DB` (inline) | 5346/620 | 6844/817 | empty title; same testimonial as educators |
| 7 | Cta | c 2.3 | orange | 5926/514 | 7621/490 | "Try for free" variant |

TwoColumns rows (title · body words · image):
1. Assessment made easier—because everyone learns differently · 27 · `1754551261-frame-1430106068.png` — flipped
2. Less stress, stronger success · 38 · `1754529641-d.png`
3. Help when and where you need it · 37 · `1754551261-frame-1430105998.png` — flipped
4. Learning assurance without the stress · 38 · `1754551261-group-1073715800.png`
5. Streamlined feedback for better outcomes · 25 · `1754551261-group-1073715804.png` — flipped

Row heights @1440: 532 / 560 / 564 / 543 / 514.

### 3.4 `/about/`: "About Us | Cadmus"
docH: 7599 @1440, 7473 @1280, 10327 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | HeroBanner | c 2.12 | maroon | 0/920 | 0/864 | §2.12 |
| 1 | ImpactCounter | b | orange | 880/288 | 824/502 | 3 stats (§1.2) |
| 2 | LogoMarquee | b | **orange** | 1168/213 | 1326/213 | title "Trusted by The World’s Leading Universities" (w400). 24 logos in order: rmit-2, usq, bond, zayed, acu, uon, 1754543826-094c1cda, kcl, maynooth, **`1754543096-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png` (missing)**, avd9ij1nl, uog, manchester, canberra, melbourne, uwa, flinders, ljmu, images-2-1, logusc, notre-dame, rmit-1, adelaide, 626ba0db |
| 3 | Values | c 2.4 | `#FFE7DB` | 1361/744 | 1519/1412 | title "Our values"; 6 items (icon · title · body words): `1753010925-star.svg` Love learning (18) · `1753010937-clap.svg` Do it with quality (21) · `1753010687-shooting-star.svg` (have) Show you care (22) · `1753010910-heart.svg` Be resilient (19) · `1753010947-lightbulb.svg` Challenge assumptions (20) · `1753010966-handshake.svg` Show humility (19) |
| 4 | TwoColumnRows (3) | b | cream | 2065/1769 | 2891/2271 | **start NOT flipped, rowGap 60**; no labels or quotes. Row 1 "A better way to assess, built with universities": 3 paragraphs (36/24/32 words), image `1751189182-title.png`. Row 2 (flipped) "Designed with industry, for industry.": 2 paragraphs (20/25), button "Learn more" -> `/`, image `1751189227-tadwitle.png`. Row 3 "The Cadmus story so far": 3 paragraphs (22/20/21), image `1751189417-frame-1430105575.png` (have). Row heights 526 / 578 / 546. |
| 5 | Timeline | c 2.13 | maroon | 3795/779 | 5121/727 | images `1753397134-vector_layer-1.jpg`, `1753397173-image-container.jpg`, `1753397204-image-container-1.jpg`, `1753397248-image-container-2.jpg` |
| 6 | ImageCard (Mission) | b | cream | 4533/692 | 5809/669 | image `1754472416-cadmus-event-june-2025-496-2-copy.jpg` |
| 7 | Careers | b (image prop) | `#FFE7DB` | 5185/692 | 6438/626 | image `1754472361-cadmus-event-june-2025-467-copy.jpg` |
| 8 | Chronicle | a | cream | 5837/770 | 7024/1441 | same 3 news items as homepage |
| 9 | Cta | c 2.3 | orange | 6567/514 | 8426/490 | about copy variant (§2.3) |

Note: the about Values and ImpactCounter sections have z-index auto (they still use `mtn40` and the radius). Stacking still works because each later sibling paints over the earlier one.

### 3.5 `/careers/`: "Careers | Cadmus"
docH: 7780 @1440, 7646 @1280, 11847 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | HeroBannerAlt (image + button) | c 2.1 | maroon + photo | 0/920 | 0/864 | H1 "Careers at Cadmus"; caption "Join our growing team and make your mark on the future of learning."; button "Browse careers" -> `#positions`; images `1751282246-full-image-page-header.jpg` (desktop), `1754722094-iphone-16-plus-32-1.jpg` (<=768) |
| 1 | IntroSplit | c 2.5 | orange | 880/806 | 824/817 | title "Make your mark on the future of learning"; h4 "At Cadmus, we’re a team of mark makers shaping a new era of assessment."; paragraphs (exact): "Learners as well as doers, we thrive on empowering educators and students to grow and succeed at every step of the assessment process." / "Join our growing team and make your mark on the future of learning."; button "Browse careers" (`#positions`); image `1751282421-vector_layer.jpg` |
| 2 | Reasons | c 2.14 | cream | 1646/750 | 1601/1187 | image `1751282453-frame-1321314721.jpg` |
| 3 | TwoColumns (standalone, 1 row) | b | cream | 2355/616 | 2749/752 | flipped; title "Cadmus Connect"; 3 paragraphs (19/30/32 words); image `1751282465-frame-1073715652.png` |
| 4 | Values | c 2.4 | `#FFE7DB`, mt 0 | 2971/764 | 3501/1231 | title "Our values"; 5 items (icon · title · body words): star "Sharp and self-directed." (25) · clap "Mission before ego." (25) · shooting-star "In it for the long game." (26) · heart "Fearless enough to have a real go." (22) · lightbulb "Brilliant at something we're not." (31) |
| 5 | Leaders | c 2.15 | cream | 3695/1091 | 4692/1602 | images `1754632369-herk-kailis-headshot.jpg`, `1756867901-brig_photoshopped-min.png` |
| 6 | ImpactCounter (4 stats) | b | orange | 4746/328 | 6254/645 | §1.2 |
| 7 | Positions | c 2.16 | `#FFFDFA` | 5034/894 | 6859/1237 | icon `1754360991-frame-1272638844.svg` |
| 8 | TeamQuotes | c 2.17 | cream | 5888/943 | 8056/1965 | images `1762496064-img_6289.jpg`, `1754624201-sophie-newton-1.jpeg`, `1775533753-1718224455340.jpeg` |
| 9 | Cta | c 2.3 | orange | 6791/470 | 9980/455 | careers variant |

Hero motion: h1 600, caption 700, button 700.

### 3.6 `/contact/`: "Contact | Cadmus"
docH: 2779 @1440/1280, 4283 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | HeroBannerAlt (no image) | c 2.1 | maroon | 0/569 | 0/542 | H1 "Get in touch with us"; caption (31 words, 1 sentence, exact): "The Cadmus team can provide a product demonstration, guide you on a suitable licence option, or create a tailored assessment design and services package to help your university teach with purpose." (trailing nbsp) |
| 1 | TwoColumns (standalone, 1 row) | b | cream | 529/524 | 502/535 | flipped; title "Need support?"; body (exact): "If you’re an educator or student user needing product support, visit the Cadmus Support Library or speak with a Cadmus Support Team Member here."; button "Contact support" -> `https://support.cadmus.io/kb-tickets/new`; image `1751189182-title.png` |
| 2 | `div.m-mt40` | – | – | 0 tall | 0 tall | empty (40px top margin only <=768) |
| 3 | ContactForm `contact-form` | c 2.9 | orange | 1012/818 | 1037/1002 | §5 |
| 4 | WhyChoose | b | cream | 1790/470 | 1999/873 | title "We’re here to set you up for success." (trailing nbsp); items: `1753010668-certificate.svg` (have) "Enhance assessment quality to shape student learning outcomes." · `1753010802-book.svg` "Provide students with a guided assessment working environment." · `1753010819-blackboard.svg` "Access assessment progress data to proactively support students ahead of submission" · `1753010829-checkmark.svg` "Streamline educator workloads, enabling more time for student support" |

The footer follows directly (no Cta).

### 3.7 `/request-demo/`: "Request a Demo | Cadmus"
docH: 1865 @1440/1280, 2915 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | HeroBannerAlt (no image) | c 2.1 | maroon | 0/569 | 0/542 | H1 "Request a demo"; caption identical to contact |
| 1 | ContactForm `demo-form` | c 2.9 | `#FFE7DB` | 529/818 | 502/1002 | same fields; thank-you panel is orange |

### 3.8 `/trust-centre/`: "Trust Centre | Cadmus"
docH: 4111 @1440, 4112 @1280, 7451 @390.

| # | Section | Map | bg | 1440 y/h | 390 y/h | Content |
|---|---|---|---|---|---|---|
| 0 | SmallHeroBanner | c 2.18 | maroon | 0/368 | 0/322 | "Trust Centre" |
| 1 | IntroSplit | c 2.5 | orange | 328/849 | 282/820 | title "Cadmus is trusted by top-ranked universities across the globe."; h4 "Uplifting assessment requires trust"; 2 paragraphs (23/22 words); no button; image `1754475527-vector_layer-1.jpg` |
| 2 | Policies | c 2.19 | `#FFE7DB` | 1138/692 | 1061/1638 | §2.19 |
| 3 | Values | c 2.4 | cream | 1790/670 | 2659/1214 | title "Secure by design"; intro 44 words; items (icon · title · body words): `1753011256-pinkshield.svg` Specialist security team (43) · `1753011278-cctv.svg` Continuous learning & improvement (33) · `1753011293-incognito.svg` Access management (41) |
| 4 | Values | c 2.4 | `#FFFFFF` | 2420/1072 | 3833/2206 | title "Enterprise-grade security and control features"; intro 24 words; items (icon · title · body words): `1753011306-orangecheck.svg` Access and authentication (41) · `1771922318-learning.svg` Team administration (67) · `1753011328-key.svg` SAML Single Sign-On (SSO) (40) · `1753011342-fingerprint.svg` Role-Based Access Control (50) · `1753011356-lock.svg` Two-step authentication (37) · `1753011034-timer.svg` Session management & access policies (42) |
| 5 | Spacer | b (`bg-pure-white m-hide`) | white | 3492/100 | hidden | |

---

## 4. Motion summary (all pages)
- **sal reveals** (CLONE_SPEC config): HeroBannerAlt (§2.1 delays), about HeroBanner (h1 300, image `fade--in` 500), and TwoColumns rows (`fade--up` / `fade--up reverse`). Nothing else on these pages uses `data-sal`.
- **GSAP:**
  - About Timeline loop (§2.13).
  - ImpactCounter count-up assumed (UNVERIFIED).
  - RoiCard has no GSAP.
- **Swiper:**
  - CaseStudyCarousel: slide, speed 850, loop, autoHeight, arrows.
  - QuoteCarousel: slide, speed 850, loop, single slide.
  - About mobile timeline: slide, speed 850, loop, autoplay 3500.
- **CSS marquee:** LogoMarquee, as homepage.
- **Gatsby-image** placeholder fade (`opacity 500ms linear`) on all CMS images. Optional to replicate.
- **No** scroll-driven parallax, no sticky elements, and no header changes on these pages.

---

## 5. Forms (contact and request-demo): one shared `ContactForm`
- **Backend: Netlify Forms, not HubSpot.**
  - The `<form>` has `name="contact-form"` or `"demo-form"`, `method="POST"`, `data-netlify="true"` and `netlify-honeypot="bot-field"`. It contains hidden inputs `form-name` (value = form name) and `bot-field`.
  - The submit handler (from `component---src-pages-contact-js-960fce9c648091b7d9b6.js`) calls `e.preventDefault()` and then `fetch("/", {method:"POST", headers:{"Content-Type":"application/x-www-form-urlencoded"}, body:new URLSearchParams(new FormData(form)).toString()})`.
  - `.then(() => { setSubmitted(true); setTimeout(() => form.reset(), 500) })`, and `.catch(e => alert(e))`.
  - No HubSpot script, portal or form id is loaded (verified in the network log: only gtag plus first-party chunks).
- **Static stand-in:** keep identical markup; on submit, `preventDefault()` and set the overlay to `.active` without any network call.
- **Layout:** `div.form-grid` is `display:grid; grid-template-columns:1fr 1fr; gap:24px` (538/538 @1440 inside 1100). It is 1 column at <=990. The textarea wrapper spans 2 columns (1 at <=990).
- **Fields**, in DOM order. Each sits in a `div.input-wrapper` (`flex-col gap:8px`); the label is `label.text-lg` (Inter 16/22.4, ink).

| # | Label | Element | name/id | type | placeholder | required | Rect @1440 (control) |
|---|---|---|---|---|---|---|---|
| 1 | "Name*" | input | name | text | "Your name" | yes | `[170,1249,538,46]` |
| 2 | "Role*" | select (in `div.select-container`) | role | select-one | first option "Please Select" (disabled, value "", selected) | yes | `[732,1249,538,46]` |
| 3 | "Email*" | input | email | email | "Your email" | yes | `[170,1349,538,46]` |
| 4 | "University*" | input | university | text | "Your University" | yes | `[732,1349,538,46]` |
| 5 | "Assessment challenge*" | textarea (`.contact-textarea`) | assessment | – | "Type here...." | yes | `[170,1450,1100,120]` |

- **Role options** (label -> value):
  - University Leader -> `Senior stakeholder`
  - Technologist -> `Technical stakeholders`
  - Faculty Leader -> `Faculty stakeholder`
  - Economic Buyer -> `Economic Buyer`
  - Learning Designer -> `T&L stakeholder`
  - Academic / Educator -> `Teacher`
  - Student -> `Student`
  - Other -> `Other`
  - Marketing -> `Marketing`
  - Shareholder -> `Shareholder`
  - Examination Stakeholder -> `Examination Stakeholder` (value **UNVERIFIED**, truncated in capture)
- **Control style** (`.contact-input`):
  - `background:#fff; border:1px solid #D0D5DD; border-radius:8px; box-shadow:0 1px 2px rgba(16,24,40,.05); font:400 16px/24px Inter; color:#04191F; padding:10px 14px; transition:all .3s ease`. Height 46.
  - Placeholder `#667085`.
  - The select has `appearance:none; background-image:none; padding-right:40px`. **No chevron is rendered**: the CSS styles a `.select-container svg` (`#6B7280`, right 16px) but the component renders no svg. Clone it without an arrow to match live.
  - Textarea: `min-height:120px; resize:vertical`.
- **Focus:** `border-color:#04191F; box-shadow:0 1px 2px rgba(16,24,40,.05), 0 0 0 4px rgba(4,25,31,.08); outline:none` (transitions .3s). Verified by focusing the Name input.
- **Validation:** native HTML5 only (`required`, `type=email`). On submitting empty, the browser focuses the first invalid field and shows its native bubble ("Please fill out this field."). There is no custom error text or error styling (border stays `#D0D5DD`).
- **Disclaimer:** `p.max-550.mt40` (Inter 14/19.6, ink `#04191F`; the `.form-disclaimer` grey class is not applied). Text: "Fields marked with an asterisk (*) are required. By clicking submit, you agree to our Terms of Service and Privacy Policy." Plain text, no links. Rect `[170,1610,550,39]`.
- **Submit:** `button.button.mt40` "Submit" (`type=submit`), 88x42 @1440 (88x37 @390). Standard `.button` dark style and hover.
- **Thank-you overlay:** `div.thank-you-overlay` = `position:absolute; inset:0; display:flex; opacity:0; visibility:hidden; z-index:10; transition:all .3s ease`. `.active` sets `opacity:1; visibility:visible`.
  - Inside: `div.thank-you-content.p60.m-p20` (r8, `flex-col`, `height:100%`; `justify-content:center` at <=990). bg is light-orange `#FFE7DB` for `contact-form` and orange `#FFC8AE` for `demo-form`. So the panel always contrasts with the section bg.
  - Close row: `div.flex.mb40.m-mb20 > button.mla.contact-form-close`. 24x24, transparent, circular "x" data-URI icon (`#04191F`), `:hover{opacity:.7}`. Click sets `.active` off.
  - Then `div.grid-2.m-col.m-center.h-100` (480/480, gap 20):
    - Left: `p.h4` "Thank you" and `p.text-lg.max-450` "Your details have been successfully submitted and a member of our team will be in touch soon."
    - Right: `div.thank-you-image` (`aspect-ratio:1.45` (1 at <=990), `background:url(/static/thanks-c7f6….svg) center/contain no-repeat`, 480x331).
- **390:** fields stack at 350 wide (rows at y 1232 / 1332 / 1432 / 1533; textarea 1633). Disclaimer `[20,1824,350,59]`, submit `[20,1922,88,37]`. Form container 727 tall.

---

## 6. Missing assets (not in `/public/assets`; do not download, listed for the asset agent)
Only assets that actually **render** on these 8 pages are listed (page-data-only assets are excluded). "Size" is the rendered size @1440 (or @390 where marked).

| Asset URL | Used on | Rendered size |
|---|---|---|
| https://www.datocms-assets.com/163564/1754472675-full-image-page-header.jpg | universities hero | 1440x920 cover |
| https://www.datocms-assets.com/163564/1771922317-academic.svg | universities Why | 34x34 |
| https://www.datocms-assets.com/163564/1753953967-frame-1321315074.svg | universities Why | 34x34 |
| https://www.datocms-assets.com/163564/1753954008-frame-1321315076.svg | universities Why | 34x34 |
| https://www.datocms-assets.com/163564/1753954034-frame-1272638758.svg | universities Why | 34x34 |
| https://www.datocms-assets.com/163564/1753241737-group-1073715572.png | universities two-col 1 | 565x375 |
| https://www.datocms-assets.com/163564/1753241820-group-1073715735.png | universities two-col 2 | 565x532 |
| https://www.datocms-assets.com/163564/1754472911-group-1073715749.png | universities two-col 3 | 565x364 |
| https://www.datocms-assets.com/163564/1753241871-group-1073715575-1.png | universities two-col 4 | 565x420 |
| https://www.datocms-assets.com/163564/1754201284-frame-1430105971.png | universities two-col 5 | 565x476 |
| https://www.datocms-assets.com/163564/1754034503-frame-1321314721.jpg | universities + students bullets | 630x420 |
| https://www.datocms-assets.com/163564/1754422014-the-university-of-manchester-min_1219152588.jpg | universities case study 1 | 590x586 |
| https://www.datocms-assets.com/163564/1754570799-frame-1430106095.jpg | universities case study 2 | 590x582 |
| https://www.datocms-assets.com/163564/1754570679-frame-1430106091.jpg | universities case study 3 | 590x715 |
| https://www.datocms-assets.com/163564/1754570715-frame-1430106092.jpg | universities case study 4 | 590x670 |
| https://www.datocms-assets.com/163564/1754570737-frame-1430106093.jpg | universities case study 5 | 590x549 |
| https://www.datocms-assets.com/163564/1753250367-rectangle-3470840-1.png | educators hero | 670x428 |
| https://www.datocms-assets.com/163564/1753248209-frame-1000009089.svg | educators + students Why | 34x34 |
| https://www.datocms-assets.com/163564/1771922317-ai-support.svg | educators Why | 34x34 |
| https://www.datocms-assets.com/163564/1753010829-checkmark.svg | educators Why, contact Why | 34x34 |
| https://www.datocms-assets.com/163564/1754047032-a.svg | educators delivery strip | 30x30 |
| https://www.datocms-assets.com/163564/1754047105-seconadwdary-button.svg | educators delivery strip | 30x30 |
| https://www.datocms-assets.com/163564/1754047189-frame-1430105748.png | educators delivery image | 1200x583 |
| https://www.datocms-assets.com/163564/1753325132-group-1073715572.png | educators two-col 1 | 565x376 |
| https://www.datocms-assets.com/163564/1754529640-group-1073715736.png | educators two-col 2 | 565x459 |
| https://www.datocms-assets.com/163564/1754529640-group-1073715680.png | educators two-col 3 | 565x416 |
| https://www.datocms-assets.com/163564/1753325354-group-1073715573.png | educators two-col 4 | 565x421 |
| https://www.datocms-assets.com/163564/1754529641-group-1073715580.png | educators two-col 5 | 565x396 |
| https://www.datocms-assets.com/163564/1754196733-frame-1430106018.png | educators two-col 6 | 565x442 |
| https://www.datocms-assets.com/163564/1754475357-screenshot-2025-02-13-at-5-07-44-pm-1-1.jpg | educators expert list | 1170x450 |
| https://www.datocms-assets.com/163564/1758000553-excellence-in-education-tash-clutterbuck-2-min.jpg | educators + students quote | 440x440 |
| https://www.datocms-assets.com/163564/1753250181-rectangle-3470840.png | students hero | 670x428 |
| https://www.datocms-assets.com/163564/1753248280-frame-1321315074.svg | students Why | 34x34 |
| https://www.datocms-assets.com/163564/1753248339-frame-1272638843.svg | students Why | 34x34 |
| https://www.datocms-assets.com/163564/1753248386-frame-1272638758.svg | students Why | 34x34 |
| https://www.datocms-assets.com/163564/1754551261-frame-1430106068.png | students two-col 1 | 565x412 |
| https://www.datocms-assets.com/163564/1754529641-d.png | students two-col 2 | 565x440 |
| https://www.datocms-assets.com/163564/1754551261-frame-1430105998.png | students two-col 3 | 565x444 |
| https://www.datocms-assets.com/163564/1754551261-group-1073715800.png | students two-col 4 | 565x423 |
| https://www.datocms-assets.com/163564/1754551261-group-1073715804.png | students two-col 5 | 565x394 |
| https://www.datocms-assets.com/163564/1754048249-vector_layer-2.jpg | students support card 1 | 347x347 |
| https://www.datocms-assets.com/163564/1754048279-vector_layer-1.jpg | students support card 2 | 347x347 |
| https://www.datocms-assets.com/163564/1754048291-vector_layer.jpg | students support card 3 | 347x347 |
| https://www.datocms-assets.com/163564/1750939194-group-1000006108.png | about hero strip (desktop) | 1440x320 |
| https://www.datocms-assets.com/163564/1753358572-frame-1430105874-3.png | about hero (<=768) | 390x260 @390 |
| https://www.datocms-assets.com/163564/1754543096-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png | about logo marquee | 150x40 |
| https://www.datocms-assets.com/163564/1753010925-star.svg | about + careers Values | 34x34 |
| https://www.datocms-assets.com/163564/1753010937-clap.svg | about + careers Values | 34x34 |
| https://www.datocms-assets.com/163564/1753010910-heart.svg | about + careers Values | 34x34 |
| https://www.datocms-assets.com/163564/1753010947-lightbulb.svg | about + careers Values | 34x34 |
| https://www.datocms-assets.com/163564/1753010966-handshake.svg | about Values | 34x34 |
| https://www.datocms-assets.com/163564/1751189182-title.png | about two-col 1, contact two-col | 565x404 |
| https://www.datocms-assets.com/163564/1751189227-tadwitle.png | about two-col 2 | 565x458 |
| https://www.datocms-assets.com/163564/1753397134-vector_layer-1.jpg | about timeline 2018 | 305x203 |
| https://www.datocms-assets.com/163564/1753397173-image-container.jpg | about timeline 2019-2022 | 305x203 |
| https://www.datocms-assets.com/163564/1753397204-image-container-1.jpg | about timeline 2023 | 305x203 |
| https://www.datocms-assets.com/163564/1753397248-image-container-2.jpg | about timeline 2025 | 305x203 |
| https://www.datocms-assets.com/163564/1754472416-cadmus-event-june-2025-496-2-copy.jpg | about mission card | 1070x412 |
| https://www.datocms-assets.com/163564/1754472361-cadmus-event-june-2025-467-copy.jpg | about careers card | 1070x412 |
| https://www.datocms-assets.com/163564/1751282246-full-image-page-header.jpg | careers hero (desktop) | 1440x920 cover |
| https://www.datocms-assets.com/163564/1754722094-iphone-16-plus-32-1.jpg | careers hero (<=768) | 390x864 cover |
| https://www.datocms-assets.com/163564/1751282421-vector_layer.jpg | careers intro split | 693x462 |
| https://www.datocms-assets.com/163564/1751282453-frame-1321314721.jpg | careers reasons | 630x526 |
| https://www.datocms-assets.com/163564/1751282465-frame-1073715652.png | careers Cadmus Connect | 565x496 |
| https://www.datocms-assets.com/163564/1754632369-herk-kailis-headshot.jpg | careers leaders | 670x377 |
| https://www.datocms-assets.com/163564/1756867901-brig_photoshopped-min.png | careers leaders | 670x377 |
| https://www.datocms-assets.com/163564/1754360991-frame-1272638844.svg | careers positions icon | 30x30 |
| https://www.datocms-assets.com/163564/1762496064-img_6289.jpg | careers team | 410x328 |
| https://www.datocms-assets.com/163564/1754624201-sophie-newton-1.jpeg | careers team | 410x328 |
| https://www.datocms-assets.com/163564/1775533753-1718224455340.jpeg | careers team | 410x328 |
| https://www.datocms-assets.com/163564/1753010802-book.svg | contact Why | 34x34 |
| https://www.datocms-assets.com/163564/1753010819-blackboard.svg | contact Why | 34x34 |
| https://www.datocms-assets.com/163564/1754475527-vector_layer-1.jpg | trust intro split | 693x462 |
| https://www.datocms-assets.com/163564/1753011256-pinkshield.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1753011278-cctv.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1753011293-incognito.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1753011306-orangecheck.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1771922318-learning.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1753011328-key.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1753011342-fingerprint.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1753011356-lock.svg | trust Values | 34x34 |
| https://www.datocms-assets.com/163564/1753011034-timer.svg | trust Values | 34x34 |
| https://cadmus.io/static/timeline-b8ddfa98db0ba7f52f7a680369a4a2b1.svg | about timeline line | 1440x57 |
| https://cadmus.io/static/thanks-c7f6b2cb2d83c6fab34c7f407eefb114.svg | form thank-you overlay | 480x331 |
| https://fonts.gstatic.com/s/stixtwotext/v18/YA9Lr02F12Xkf5whdwKf11l0p7u8idfU39NkYg.woff2 | STIX Two Text italic (educators list, careers roles) | font |

Already present and reused: all university logos except `1754543096-…`; the 6 integration tiles; `1753010668-certificate.svg`, `1753010687-shooting-star.svg`; the product strip icons `1752906564/1752906960/1752907049`; `1771212504-roi-university-library.jpg`; `1751189417-frame-1430105575.png`; the 3 Chronicle images.

Dato images are served via `?auto=format&w=<n>`; I recorded the base URLs. Rendered natural sizes are in the table.

---

## 7. UNVERIFIED / not measured
- Whether the about/careers ImpactCounter numbers count up (assumed same GSAP as homepage; not sampled).
- The "Browse careers" scroll mechanism and offset (assumed Lenis `scrollTo('#positions', {offset:-85})`).
- `target` attribute on careers position links and on support-card links (not captured).
- The value attribute of the last Role option ("Examination Stakeholder").
- Behaviour on a real Netlify submit (not performed; the clone must not submit).
- Hover/active states of the Swiper drag cursor (Swiper defaults; `grabCursor:false`).
- The 1280 inner rects of new sections were captured (raw JSON) but are not listed individually. The structure is identical to 1440 with fluid widths; section heights at 1280 are given per page.
