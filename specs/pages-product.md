Source: https://cadmus.io/

# CLONE SPEC: product routes + pricing

Routes covered: `/product-overview/`, `/product/assignments/`, `/product/exams/`, `/product/group-work/`, `/product/learning-analytics/`, `/product/marking-feedback/`, `/product/oral_assessment/`, `/pricing/`.

Measured live on 2026-10-27 with Playwright (Chromium, DPR 1) at **1440x900** and **390x844** on every route, plus **1280x800** on `/product-overview/`, `/product/assignments/`, `/product/oral_assessment/` and `/pricing/`. The other four product pages share the assignments template, so 1280 was not re-measured for them and is UNVERIFIED there; expect the same reflow as assignments. Values come from `getComputedStyle`/`getBoundingClientRect` (one batched script per page per width, run after a full scroll so lazy images and sal reveals had fired), the live CSSOM (rule dump), and Gatsby page-data (`/page-data/<route>/page-data.json`) for copy and asset URLs. Rects are `[x, y(page), w, h]` in CSS px.

**Read `/CLONE_SPEC.md` first.** Global tokens, fonts, buttons (`.button`, `.arrow-button`, `.arrow-button.transparent`), sal.js config, Lenis, page fade-in, the Header, the Footer and the stacked-sheet pattern (`margin-top:-40px; border-radius:32px 32px 0 0`) are identical on these routes and are not repeated here. Header and Footer are unchanged on all 8 routes, so (a) reuse them as-is.

Templates on the original: the 6 product pages use one Gatsby template (`src-templates-product-js`) driven by a `colorScheme`. `/product-overview/` and `/pricing/` are one-off pages.

Mapping legend: **(a)** existing component as-is · **(b)** existing component with different props or a variant · **(c)** new section type (full measurements in §2).

---

## 0. Global additions these pages need

### 0.1 Product colour schemes (from CSSOM `.product-<scheme>`, `.product-cta-<scheme>`, `.label.<scheme>`, `.bg-<scheme>`, `.quote .background-element.<scheme>`)
| scheme (page) | Hero bg | Hero text | Accent (label chip, StudyPreview bg, quote `background-element`, CTA bg) | Notes |
|---|---|---|---|---|
| `yellow` (Assignments) | `#3E2E2C` | `#FFE388` | `#FFE388` | |
| `lavender` (Exams) | `#262258` | `#E8E8FF` | `#C5C5FF` | QuoteCarousel section bg = `#E8E8FF` (page-data `videoBackground`); on the other pages it is transparent |
| `pink` (Group Work) | `#820049` | `#FFC3F0` | `#FFC3F0` | |
| `blue` (Learning Analytics) | `#123D69` | `#B6DBFF` | `#B6DBFF` | |
| `green` (Marking & Feedback) | `#455017` | `#F0F5D5` | `#D1E375` | |
| `maroon` (Oral Assessment) | `#87160D` | `#FFE7DB` | label chip falls back to the default `.label` `#FFE7DB` (no `.label.maroon` rule) | CTA bg = cream `#FCF7EF` (`.product-cta-maroon`) |

Add the 6 hero bg colours as Tailwind colours (e.g. `product-yellow` … `product-maroon`). The accents already exist (`yellow`, `lavender`, `pink`, `blue`, `green`, `light-orange`, plus `tab-lavender` `#E8E8FF` and `tab-green` `#F0F5D5` for the text colours).

### 0.2 New typography roles (computed)
| Role (orig class) | Family | Desktop | <=990 | <=768 (390) |
|---|---|---|---|---|
| `.h3` (product/pricing hero h1, overview hero h1) | AT Realm Book | 44px / 1.1 (48.4px), ls normal | 38px / 41.8px | with `.m-30`: **30px / 33px** (product hero, pricing hero); overview hero has no `.m-30`, so **38px / 41.8px** |
| `.h4.m-30` (ProductCta title) | AT Realm Book | 38 / 43.7, ls -0.057px | 26 / 29.9 | **30px / 34.5px**, ls -0.045px |
| `.h6.m-18` (FAQ question) | AT Realm Book | 22 / 27.5, ls -0.033px | – | **18px / 22.5px**, ls -0.027px |
| `.h7` (testimonial name) | AT Realm Book | 20px / 1.25 (25px), ls -0.0015em (-0.03px) | same | same |
| `.italic` (testimonial institution) | **"STIX Two Text", serif**, italic | 22px / 30.8px | same | same |
| `.f-18.at-realm` (feature card title) | AT Realm Book | 18px / 25.2px | same | same |
| `.f-18.m-16` (product hero subtitle) | Inter | 18 / 25.2 | – | 16 / 22.4 |
| `.label` chip | Inter 500 | 13px / 0.7 (9.1px box), ls 0.05em, uppercase, `padding:0 10px`, `display:inline-block` | same | same |
| `.label.clear` | same type, `background:transparent; padding:0` | | | |
| `p.h5.marker` (pricing steps "01.") | AT Realm Book | 30px / **1** (30px), ls -0.045px | same | same |

**STIX Two Text** is now required (pricing testimonials only). The original @imports it from Google Fonts; load `https://fonts.googleapis.com/css2?family=STIX+Two+Text:ital@1&display=swap` (only the italic is used). The exact weights in the original @import are UNVERIFIED.

U+2028 (LINE SEPARATOR) appears inside many CMS titles (shown below as `⏎`). It renders as a forced line break; keep the character or use `<br/>`.

### 0.3 New interaction / motion rules (exact CSS from CSSOM)
- **sal `fade`** (PhaseRelease cards): `[data-sal|=fade]{opacity:0; transition-property:opacity}` → `.sal-animate{opacity:1}`; duration `var(--sal-duration,.2s)` = **0.2s**, ease, no delay. Same sal config as the homepage (threshold 0.5, once).
- **`.fade--up` / `.fade--up.reverse`**: same as homepage TwoColumnRows (0.65s ease, 0.2s delay, ±20px X).
- **`.fade--in-up`** on the overview hero: h1 `data-sal-delay=500`, p `data-sal-delay=600`.
- **ProductHero has no sal** and no load animation (verified: no `[data-sal]` inside it). Only the global page fade-in applies.
- **`.arrow-button.black`** (pricing cards): `background:#04191F; border-color:#04191F; color:#FFFFFF`; `::after` arrow filtered to cream (same filter string as homepage `.arrow-button:hover::after`). **Hover**: `background:transparent; color:#04191F`; `::after{filter:none}` (dark arrow). It inherits `transition: all .3s`.
- **Accordion** (FAQ): `.accordion{display:grid; grid-template-rows:0fr; transition:grid-template-rows .3s}` and `.active{grid-template-rows:1fr}`; `.accordion .content{overflow:hidden; transition:height .4s}`. JS sets inline `style="height:<scrollHeight>px"` on `.content` when open and `0` when closed. The icon swaps background-image plus → minus. **Only one item open at a time**: opening item 2 removed `.active` from item 1 (verified by clicking). All are closed by default. `.title{cursor:pointer; user-select:none}`.
- **`.quote-prev/.quote-next`** (QuoteCarousel arrows): `position:absolute; top:50%; width:35px; aspect-ratio:1; background: <circle-arrow SVG, data-URI> center / 34px auto no-repeat; z-index:2`. Prev: `left:0; transform:translateY(-50%) rotate(180deg)`. Next: `right:0; left:unset; transform:translateY(-50%)`. Swiper adds `.swiper-button-lock{display:none}` when there is only one slide, and **every product page has exactly 1 quote**, so the arrows are never visible. They are also `.m-hide` (hidden <=768).
- **`.chronicles-center-last > :last-child:nth-child(2n+1)`**: `grid-column:1/-1; justify-self:center; max-width:calc(50% - 10px)` (<=990: `max-width:100%`).
- **`.marker`**: `position:relative; line-height:1`; `span{position:relative; z-index:2}`; `::before{content:""; position:absolute; left:0; top:50%; transform:translateY(-50%); width:100%; height:50%; background:#FFC8AE; opacity:.8; z-index:1}` (highlighter bar behind the numerals).
- **`ul`** (global): `display:flex; flex-direction:column; gap:15px; margin-left:20px`; `li` keeps `display:list-item`, `list-style: disc outside`, marker colour `#04191F`. `ul.two-col{flex-flow:wrap}`, `ul.two-col li{width:calc(50% - 10px); padding-right:20px}` (<=768: `width:100%; padding-right:0`).
- **Counters**: case-study stats and pricing ImpactCounter use the same GSAP count-up as the homepage. The live DOM showed mid-animation values (e.g. `75%`, `6m`). The final values are from page-data.

---

## 1. Mapping summary (all routes)

| Section type | Pages | Mapping | Existing component |
|---|---|---|---|
| Header / Footer | all 8 | (a) | `Header`, `Footer` |
| **ProductHero** | 6 product pages | **(c) N1** | – |
| Feature cards grid (inside ProductHighlight; overview "Elevate") | 6 product pages + overview | (b) | `WhyChoose` (title-row variant, 3 or 4 cols) |
| Highlight split (text + 2 buttons + image) | 5 product pages (empty on Oral) | (b) | extract `CaseStudy` §C (the CTA grid) into a shared split component |
| **StudyPreview** | Assignments, Exams, Group Work, LA, M&F | **(c) N2** | – |
| Overview (heading + full-width image) | Assignments, Oral | (b) | `Experience` (image instead of video, sheet styling) |
| TwoCols rows | 6 product pages + overview (2 blocks) | (b) | `TwoColumnRows` (overline chip / icon-tag, N rows, optional heading, optional button) |
| **QuoteCarousel** | Assignments, Exams, Group Work, LA, M&F | **(c) N3** | – |
| **ProductCta** (centred CTA band) | 6 product pages | **(c) N4** | – |
| ImageCard section | Oral (x2) | (b) | `ImageCard` (2:1 image, 550 card, h4, multi-paragraph) |
| **PhaseRelease** | Oral | **(c) N5** | – |
| Chronicles (2-col, centred last) | Oral | (b) | `Chronicle` |
| LogoMarquee | Oral, Pricing | (b) | `LogoMarquee` (bg colour, logo list) |
| **HeroImage** (centred text + image) | Overview | **(c) N6** | – |
| **Seamless video slide** | Overview | **(c) N7** | – |
| **SingleColumn** (full image + half-width text) | Overview | **(c) N8** | – |
| Integrations | Overview, Pricing | (b) | `Integrations` (title/body text) |
| CaseStudy (image card + stats + quote + CTA) | Overview | (b) | `CaseStudy` (quote text/role differ) |
| **PricingHero + PricingCard** | Pricing | **(c) N9** | – |
| **LicenceRow** | Pricing | **(c) N10** (reuses N9 card) | – |
| **GettingStarted** (numbered steps) | Pricing | **(c) N11** | – |
| Help cards | Pricing | (b) | `SolutionCards` (sheet styling, no links) |
| **Testimonials grid** | Pricing | **(c) N12** | – |
| ImpactCounter | Pricing | (a) | `ImpactCounter` (same 7m / 18,000+ / 25m+) |
| **FAQ accordion** | Pricing | **(c) N13** | – |

Recommended build order: data-drive the product template once (N1 to N4 plus the (b) variants) and render all 6 product pages from a per-page data object keyed by `colorScheme`.

---

## 2. New section types (c): full measurements

### N1. ProductHero (`data-module="ProductHero"`), 6 pages
- Wrapper `div.pos-rel.mh-100vha.p40.m-p20.flex.flex-col.pth.product-<scheme>`: `position:relative; display:flex; flex-direction:column; min-height:100svh` (<=1600: `calc(20px + 100svh)`); `padding:90px 40px 40px` (`.pth` = padding-top 90). <=768: `padding:20px` all round. Bg/text per §0.1. First section: no radius, no negative margin.
  - Heights: **920** @1440x900, **820** @1280x800, **864** @390x844 (Oral 882 @390 because its content is taller).
- Inner row `div.max-1600.m-mth.w-100.m-wrap.ma.pos-rel.z-2.flex.align-center.gap-20`: `max-width:1600px; margin:auto` (centres vertically in the column flex); `display:flex; align-items:center; gap:20px; z-index:2`. <=768: `flex-wrap:wrap; margin-top:95px` (measured).
  - Left `div.w-50.m-100` (50%; 100% mobile) > `div.max-600.ma.flex.flex-col.gap-20` (max 600, centred in the column):
    - `p.text-sm-heading.m-mt20`: product name (Inter 14/19.6, ls 0.7px, uppercase, scheme text colour). Mobile margin-top 20.
    - `h1.h3.m-30`: 44/48.4 (30/33 at 390).
    - `p.f-18.m-16.max-900.ma.mb20.mt20.m-m0`: 18/25.2 (16/22.4 mobile), margin 20px 0 (0 mobile).
  - Right `div.w-50.m-100.m-pb40` > `div.image > img`: width 100% of column, natural aspect, no radius (PNG artwork). Mobile: padding-bottom 40.
- Rects (Assignments): **1440** inner `[40,250,1360,470]`, text block `[75,337,600,295]`, image `[730,250,670,470]`. **1280** inner `[40,228,1200,414]`, text `[40,287,590,295]`, image `[650,228,590,414]`. **390** inner `[20,115,350,551]`, text `[20,115,350,246]`, image `[20,381,350,245]` (text above image).
- Image heights vary by page (natural aspect at 670 wide): Exams 482, Group Work 426, LA 465, M&F 490, Oral 653.
- Motion: none (global page fade only). Hover: none.

### N2. StudyPreview (`data-module="StudyPreview"`), 5 pages
- Section `div.mtn40.br-t-32.pos-rel.p40.bg-<accent>`: `padding:40px` (20 mobile); `margin-top:-40px`; radius `32 32 0 0`; `position:relative`, no z-index; bg = accent. Height 653 @1440 (Group Work 690: longer quote, no link), 608 @1280, 804–1054 @390.
- Inner `div.max-1400.ma.mb40.flex.m-wrap.gap-40.pb40.align-center`: `max-width:1400px; margin:0 auto 40px; padding-bottom:40px; display:flex; gap:40px; align-items:center` (wraps <=768). Then `div.pb40.m-hide` (40px, desktop only).
  - **Left** `div.w-50.m-100.flex.flex-col`:
    - Title card `div.max-450.br-8.bg-pure-white.p20.pl40.pr40.gap-20.flex-col.flex.mra.pos-rel.z-2.mr40`: `max-width:450px; background:#FFF; border-radius:8px; padding:20px 40px; display:flex; flex-direction:column; gap:20px; margin-right:40px (auto-right); position:relative; z-index:2`. Contains `p.label.mra.<accent>` "**Case Study**" (chip in the accent colour) and `p.h5` title (30/37.5; 24/30 mobile).
    - Image `div.pl40.w-100.mtn40` (padding-left 40, margin-top -40, so it slides 40px under the title card) > `div.ratio-16-9.bg-grey.br-8.overflow.pos-rel` (16:9, `rgba(0,0,0,.1)`, r8) > `img` absolute cover.
  - **Right** `div.w-50.m-100` > `div.max-550.ma.p20.flex.flex-col.gap-20`:
    - `div.f-18` quote (Inter 18/25.2), with straight double quotes in the copy.
    - `div.quote-author` (`border-left:2px solid #580C1D; padding-left:10px`): `p.text-heading.f-500` name (13/13, ls 1.3px, 500, uppercase) + `p.f-16` role.
    - `div.w-100.flex.mt20` > `a.arrow-button.mra.transparent` "**Read the full Case Study**" → `/study/<slug>/`. Omitted when the CMS has no slug (Group Work).
- Rects: **1440** card `[40,1948,450,144]`, image `[80,2052,620,349]`, quote column `[795,2036,550,278]`. **1280** card `[40,1793,450,144]`, image `[80,1897,540,304]`, right `[675,1858,550,278]`. **390** card `[20,2389,310,159]`, image `[60,2509,310,174]`, right `[20,2723,350,351]` (stacked: card, image, quote).
- Motion: none. Hover: transparent arrow-button only (arrow moves 10px).

### N3. QuoteCarousel (`section.quote`, `data-module="QuoteCarousel"`), 5 pages
- Section `section.p40.pos-rel.z-4.br-t-32.mtn40.quote`: padding 40 (20); `position:relative; z-index:4`; margin-top -40; radius 32 top; **bg transparent** (cream body shows), except Exams `#E8E8FF`. Height 707 @1440, 643 @1280, 912–1017 @390.
- `div.background-element.<accent>`: `position:absolute; left:0; bottom:0; width:100%; height:250px; border-radius:32px 32px 0 0; z-index:1; background:<accent>`. The bottom 250px of the section is accent-coloured and flows into the ProductCta below (same colour), so the white quote card straddles cream and accent.
- Heading `div.max-1400.ma.mt20.mb20.pb20` > `p.h4.text-center.max-800.ma` (800 max, centred).
- Carousel wrapper `div.max-1600.pl80.pr80.m-p0.ma.pos-rel.z-2`: padding 0 80px (0 mobile), z-2. Contains `div.swiper` > `.swiper-wrapper` > 1 `.swiper-slide`, plus `button.m-hide.quote-prev.nav-arrow.left-0` and `button.m-hide.quote-next.nav-arrow.right-0` (hidden, see §0.3).
  - Slide card `div.flex.p20.m-wrap.gap-60.bg-pure-white.br-12.align-center`: `display:flex; gap:60px; padding:20px; background:#FFF; border-radius:12px; align-items:center` (wraps <=768). No shadow.
    - `div.w-40.m-100` > `div.ratio-1-1.m-ratio-16-9.bg-grey.pos-rel.br-8.overflow` (square; 16:9 at <=768) > img cover.
    - `div.w-60.m-100` > `p.ma.h6` quote (AT Realm 22/27.5) + `div.mt40.quote-author.flex.flex-col.m-mb20` (margin-top 40; mobile margin-bottom 20; maroon 2px left border): `p.text-heading.f-500` name + `p.f-16` role.
- Rects: **1440** card `[120,6215,1200,480]`, image `[140,6235,440,440]`, quote text `[640,6321,660,193]`, background-element `[0,6485,1440,250]`. **1280** card `[120,6015,1040,416]`, image `376x376`. **390** card `[20,6567,350,827]`, image `[40,6587,310,174]`, quote `310` wide.
- Motion: none observed. Swiper options (speed, loop, autoplay) are not observable with one slide: UNVERIFIED. With one slide a static card is visually identical.

### N4. ProductCta (`data-module="Cta"`), 6 pages
- Section `div.p40.m-p20.mtn40.br-t-32.pos-rel.z-2.product-cta-<scheme>`: padding 40 (20); margin-top -40; radius 32 top; z-2; bg = accent (Oral: cream `#FCF7EF`).
- Children: `div.spacer.m-spacer` (100; 60 at <=768), content, `div.spacer` (100 at all widths).
- Content `div.max-1100.ma.balance.text-center.flex.flex-col.align-center` (1100 max; `text-wrap:balance`; `margin:0 auto`):
  - `p.h4.m-30.mb20` title (38/43.7; 30/34.5 at 390), margin-bottom 20.
  - `div.text-lg.mb40.flex.flex-col.gap-20` > 1 `p` (16/22.4), margin-bottom 40.
  - `div.flex.gap-20.align-center` > `a.button` + `a.arrow-button`.
- Heights: 513 @1440 and 1280 (2-line title), 469 (Oral, 1-line title), 489 @390. Rect @1440 content `[170,6835,1100,233]`; @1280 `[90,6571,1100,233]`; @390 `[20,7454,350,289]`, buttons 36 tall at 390 (`padding:7.5px 20px`).
- Motion: none.

### N5. PhaseRelease (`data-module="PhaseRelease"`), Oral only
- Section `div.p40.m-p20.bg-white.pos-rel.z-2.mtn40.br-t-32`: cream; padding 40 (20); margin-top -40; radius 32 top; z-2. Height 613 @1440/1280, 977 @390.
- `div.max-1200.ma` > `p.h4.balance.text-center.mb40.mt40` + `div.grid-2.m-col.gap-20.mb60`: grid 2 cols × 590 (gap 20, margin-bottom 60); <=768 `display:flex; flex-direction:column`.
  - Card `div.bg-card.br-12.p40.m-p20.flex.flex-col.gap-20` with `data-sal="fade"`: bg `#FFFDFA`, computed **radius 8px** (`.bg-card` wins over `.br-12`), shadow `rgba(207,192,176,.12) 1px 8px 12px`, padding 40 (20), gap 20. Contents: `p.h6.balance` title; `div.f-16.m-14.flex.flex-col.gap-20` > `p` intro + `ul` (gap 15, margin-left 20, disc) of `li` 16/22.4 (14/19.6 mobile).
- Rects: **1440** grid `[120,2528,1200,349]`, cards `[120,2528,590,349]` and `[730,2528,590,349]`. **1280** grid `[40,2448,1200,349]`. **390** cards `[20,3331,350,396]`, `[20,3747,350,322]`.
- Motion: each card fades in 0.2s when 50% visible (sal `fade`). No hover.

### N6. HeroImage (`data-module="HeroImage"`), Overview
- Wrapper `div.bg-maroon.orange.flex.flex-col`: bg `#580C1D`, text `#FFC8AE`; no padding/radius. Height **1041** @1440 and 1280, **802** @390.
- Children in order:
  1. `div.spacer.m-mt40`: 100px.
  2. `div.p40.mt40.m-p20.max-1100.mla.mta.mra.flex.flex-col.gap-20.text-center.balance`: padding 40 (20), margin-top 40, max 1100, centred, gap 20. Rect `[362,140,716,171]` @1440; `[0,180,390,188]` @390.
     - `h1.h3` (`.fade--in-up`, sal delay 500): 44/48.4 (38/41.8 @390).
     - `p.text-lg` (`.fade--in-up`, sal delay 600): Inter 16/22.4.
  3. `div.p40.m-mt40` > `div.max-900.ma` > image (natural aspect). Rect `[270,351,900,550]` @1440, `[190,351,900,550]` @1280, `[20,428,350,214]` @390.
  4. `div.spacer.m-mt40`: 100px.
- Motion: h1 and p fade-up 20px, 0.65s ease, delays 500 / 600 ms.

### N7. Seamless video slide, Overview (main child 3, no `data-module`)
- Section `div.p40.m-p20.br-t-32.pos-rel.flex.flex-col.bg-orange`: bg `#FFC8AE`; padding 40 (20); radius 32 top; **margin 0** (no -40 overlap; the preceding Elevate section ends with a 100px spacer); no z-index. Height 810 @1440, 778 @1280, 1243 @390.
- `div.mb80.m-mb40.mt40` > `p.h4.max-850.ma.text-center.white-space`: "One platform. ⏎ Every assessment covered." (2 lines; `white-space:break-spaces`).
- `div.max-1500.ma` > `div.product-slide.flex.flex-col.gap-20`:
  - `p.h5` "**Seamless Assessment**" (left-aligned).
  - `div.w-50.m-100.f-16` body (1 paragraph, ~29 words), 50% wide (680 @1440).
  - `div.m-hide > video.w-100` (desktop): `muted autoplay loop playsinline`, intrinsic 1366x274, 2.03 s. Rendered `[40,1949,1360,273]` @1440.
  - `div.m-show > video.w-100` (<=768 only): intrinsic 630x1366, 2.03 s. Rendered `[20,2065,350,759]` @390.
- `div.spacer` 100.
- No poster attribute. page-data also has fallback images `1754382126-videoframe_0.png` and `1753697503-frame-1430105875-1.png`, but they are not rendered.

### N8. SingleColumn (`data-module="SingleColumn"`), Overview
- Wrapper `div.p40` (20 mobile): no bg (cream body), no radius, static. Height 966 @1440/1280, 543 @390.
- `div.max-1200.ma > div.w-100 > img` (full width, natural aspect): `[120,3580,1200,668]` @1440, `[40,3568,1200,668]` @1280, `[20,4226,350,195]` @390. No radius.
- Text column `div.w-50.m-100.m-m0.mla.mtn40`: 50% wide, `margin-left:auto`, `margin-top:-40px` (overlaps the image bottom by 40px; no bg); `[720,4208,680,258]` @1440.
  - `div.flex.justify-center.align-start.flex-col.gap-20.max-550.m-mb40`:
    - `div.icon-tag.mt20.m-mb0` (sal `fade--up reverse`): icon 25x25 `1752906773-secondary-adbutton.svg` + `p.sm-heading` "**Group Work**" (12/15.6, ls 0.24px, uppercase). Chip: bg `#FFFDFA`, r4, padding `4px 12px 4px 4px`, `min-width:150px`, tag shadow.
    - `p.h5.balance` (sal `fade--up reverse`) "**Cadmus Group Work**" `[720,4281,281,38]`.
    - `div.fade--up.reverse` (sal) > `div.f-16.flex.flex-col.gap-20.mb20` (1p, ~24 words) + `a.arrow-button.mra` "**Learn more**" → `/product/group-work/` (157x41).
- Motion: three blocks slide in from +20px X with fade, 0.65s ease, 0.2s delay.

### N9. PricingHero + PricingCard, Pricing (main child 0)
- Section `div.p40.bg-orange`: bg `#FFC8AE`; padding 40 (20); first section (no radius/overlap). Height 1239 @1440/1280, 2737 @390.
- Heading `div.p40.max-1100.ma.mth.pos-rel.z-2.flex.flex-col.align-center.gap-20.text-center`: padding 40 (20), margin-top 90, max 1100. `[170,130,1100,239]` @1440.
  - `h1.h3.m-30` "**Scalable, flexible assessment solutions**" (44/48.4; 30/33 @390).
  - `p.f-18.max-900.ma.mb20.mt20.m-mt0.m-16`: 1 paragraph, 24 words (18/25.2; 16/22.4 mobile).
- Grid `div.pricing-cards.max-1300.ma.mt40.grid.grid-3.mb40.gap-20`: 3 cols, gap 20, margin 40 auto; **1440** `[70,409,1300,750]` (cols 420); **1280** `[40,409,1200,750]` (cols 387); **390** 1 col 350, cards 716/716/796 tall.
- **PricingCard** `div.pricing--card.bg-pure-white.p20.br-12.flex.flex-col.gap-20`: `#FFF`, r12, padding 20, gap 20, **no shadow**; cards stretch to equal height (750 @1440).
  1. `p.label.mra.mt20` overline chip, margin-top 20. Chip bg by position: card 1 `#FFE7DB` (default), card 2 `#FFC3F0`, card 3 `#FFE388`; licence card `#B6DBFF`.
  2. `p.h5` plan name (30/37.5; 24/30 mobile).
  3. `div` caption (Inter 14/19.6).
  4. `p.label.clear.mra`: the same overline text repeated as plain uppercase text (transparent, no padding).
  5. `ul.mb40` (gap 15, margin-left 20, margin-bottom 40, disc markers) of `li` 14/19.6.
  6. `div.mta.mra.mb20` (pushed to bottom; margin-bottom 20) > `a.arrow-button.black` (see §0.3). Sizes: "Get started" 155x41, "Request pricing" 185x41 (36 tall @390).
  - Rects @1440: label `[90,449,122,9]`, h5 `[90,478,380,38]`, caption `[90,535,380,39]`, ul `[110,624,360,276]`, button `[90,1078,155,41]`.
- Motion: none. Hover: `.arrow-button.black` only.

### N10. LicenceRow, Pricing (main child 1)
- Section `div.p40.pt0.bg-orange`: `padding:0 40px 40px` (0 20 20); `#FFC8AE`; continues the hero (no radius). Height 638 @1440, 658 @1280, 1026 @390.
- `div.max-1300.ma.mb40.pb40.flex.m-wrap.gap-20` (margin-bottom 40, padding-bottom 40):
  - Left `div.w-50.m-100.flex.flex-col.gap-20` `[70,1239,640,518]` @1440: `p.h5.white-space` "Licences designed to⏎grow with your institution" + `div.white-space.max-550` (Inter 14/19.6, 41 words in one block, `break-spaces`, 5 lines @1440).
  - Right `div.w-50.m-100.m-mt40.license-card` `[730,1239,640,518]` @1440: a PricingCard (N9) whose `ul` is `ul.mb40.two-col` (2 columns of `li`, width `calc(50% - 10px)`, padding-right 20; 1 col at <=768) and whose button is a plain outline `a.arrow-button` "**Contact Sales Team**" → `/contact/` (213x41).
- @1280: left `[40,1239,590,538]`, card `[650,1239,590,538]`. @390: stacked, card `[20,3014,350,649]` (margin-top 40).

### N11. GettingStarted (`data-module="GettingStarted"`), Pricing
- Section `div.p40.bg-pure-white.br-t-32.mtn40`: `#FFFFFF`; padding 40 (20); radius 32 top; margin-top -40; **static** (no position/z-index). Height 480 @1440, 499 @1280, 957 @390.
- `div.mt40.max-1300.ma.text-center.mb40` > `p.h4` "**Getting started with Cadmus is simple**".
- Grid `div.grid.grid-3.gap-60.mb40.pt20.max-1300.ma.pb40`: 3 cols (393 @1440), **gap 60**, padding 20 0 40, margin-bottom 40. `[70,2000,1300,236]` @1440; `[40,2020,1200,255]` @1280; 1 col @390 (gap 60).
  - Step `div.flex.flex-col.gap-20`: `p.h5.marker.mra > span` "01." / "02." / "03." (30/30, highlighter `::before` §0.3; `[70,2020,33,30]`); `p.h6` title; `div` body (14/19.6, ~24–26 words, 1 paragraph).
- Motion: none.

### N12. Testimonials (`data-module="Testimonials"`), Pricing
- Section `div.p40.bg-white.mtn40.pos-rel.z-2.br-t-32`: cream; padding 40 (20); margin-top -40; z-2; radius 32 top. Height 771 @1440, 810 @1280, 1870 @390.
- `div.max-1600.ma.mt40.mb40.pb20` > `p.h4` "**Hear why people love Cadmus**", **left-aligned** (no `.text-center`) `[40,3322,1360,44]`.
- Grid `div.mb40.max-1600.ma.grid.grid-3.gap-40-20.pb40.m-gap-20`: 3 cols × 440 (@1440; 387 @1280), **row-gap 40, column-gap 20** (`gap:40px 20px`; 20 on mobile), padding-bottom 40, margin-bottom 40; 1 col @390.
  - Card `div.flex.bg-pure-white.p20.box-shadow.br-12.flex-col.gap-10`: `#FFF`, r12, padding 20, gap 10, shadow `rgba(207,192,176,.12) 1px 8px 12px`. Contents: `p.h7` name, `p.italic` institution (STIX Two Text italic 22/30.8), `div` quote (14/19.6, straight double quotes). Card heights 214 (row 1) / 214 (row 2) @1440; 233 @1280.
- Motion/hover: none.

### N13. FAQ accordion (`data-module="FAQs"`), Pricing
- Section `div.bg-light-orange.p40.br-t-32.mtn40`: `#FFE7DB`; padding 40 (20); radius 32 top; margin-top -40; static. Height 767 @1440 (all closed), 693 @1280, 933 @390.
- `div.max-1600.ma.mt40.mb40.flex.m-wrap.gap-40`:
  - Left `div.w-50.m-100` > image `1752310381-group-1073715500-1.png` `[40,4501,660,607]` @1440, `[40,4628,580,533]` @1280, `[20,9121,350,322]` @390 (natural aspect, no radius).
  - Right `div.w-50.m-100.m-mb40` (660 @1440):
    - `p.h4.mb40.pb20` "**Frequently Asked Questions**" (margin-bottom 40 + padding-bottom 20).
    - `div.faqs.max-850` > 4 × `div.accordion.mb20.bb1`: `border-bottom:1px dashed #CFC0B0; margin-bottom:20px`. Closed height 49 (1-line question) / 76 (2-line @1280) / 44–66 @390.
      - `div.title.pointer.flex.gap-20.space-between`: `p.h6.m-18.pb20` question (padding-bottom 20) + `div.accordion-icon` 25x25 (plus/minus SVG, stroke `#161313` 80% opacity, 1.5px).
      - `div.content` (height 0 → scrollHeight, `transition:height .4s`) > `div.pt20.with-bold.pb20` (padding 20 0; `strong` 700) > `p` 14/19.6.
    - Measured open state (item 1 @1440): accordion 363 tall, content 314.
- Motion: see §0.3 (one open at a time, height 0.4s, rows 0.3s).

---

## 3. Variant notes for (b) components

**WhyChoose → feature grid.** Used in ProductHighlight and the overview "Elevate" section. Differences from the homepage:
- The card adds a title. Structure: `img.icon.mb20.mt10` 34x34 (overview: `mb20` only, no `mt10`), then `p.f-18.at-realm.mb10` title (AT Realm 18/25.2), then `p.max-400.balance.serif` body (AT Realm 14/19.6). The card is `flex-col` with gap `normal` (spacing comes from the margins), not gap 20.
- Grid: `.grid-3` (product pages, overview) or `.grid-4` (Oral), gap 20, inside `max-1200` (product) / `max-1400` (Oral, overview) with margin-bottom 80. Col widths: 387 @1440 (max-1200), 440 @1440 (overview max-1400), 325 @1440 (Oral grid-4), 285 @1280 (Oral). 1 col @390.
- Heading wrapper `div.mb80.m-mb40.mt40` > `p.h5.balance.max-850.ma.text-center` (Assignments, Exams, Group Work, LA, M&F) or `p.h4…` (Oral, overview). Max 850, centred.
- No own section wrapper inside ProductHighlight; Elevate has its own sheet (cream, -40, r32) and ends with Spacer 100.

**ProductHighlight section** wrapper: `div.p40.m-p20.br-t-32.bg-white.mtn40.pos-rel.flex.flex-col` (cream, r32, -40, position relative, no z-index). It contains the feature grid, then `div > div.max-1400.pb40.ma.grid-2.align-center.gap-20` (the highlight split).

**Highlight split** (extract from `CaseStudy` §C). Grid 2 × 670 @1440 (590 @1280), gap 20, max 1400, padding-bottom 40.
- Left `div.balance.flex.flex-col.gap-20.align-start`: `p.h4.max-650` + `div.f-16.max-650` (1 paragraph) + `div.max-650.mt20.flex.gap-20.m-gap-10.align-center` [`a.button` "**Explore the platform**" → `/product-overview`, `a.arrow-button` "**Book a demo**" → `/request-demo`].
- Right `div.p20.m-p0.m-mb20.m-mt20` > image (natural aspect, 630 wide @1440, 550 @1280, 350 @390).
- Mobile: 1 col, text first. At 390 both buttons wrap their label to 2 lines (55px tall; widths 173 / 167, gap 10).
- **Oral**: the CMS highlight is empty but the markup still renders, producing an empty 100px-tall block (`[40,1489,1360,100]`). Reproduce it as 100px of space so the section height matches (749 @1440).
- Rect @1440 (Assignments): grid `[40,1393,1360,515]`, image `[750,1413,630,435]`.

**Experience → Overview** (Assignments, Oral).
- Section `div.p40.bg-white.mtn40.br-t-32.pos-rel`: cream sheet, -40, r32. The homepage Experience has no sheet.
- Inner `div.max-1200.ma.mt40.text-center.pb40` > `p.h4` + optional `p.text-lg.max-900.ma.mt20` subtitle (Oral) + `div.mt40.pt20 > div.image > img` (1200 wide, natural aspect).
- Image rects: Assignments `[120,2705,1200,572]` @1440, `[40,2505,1200,572]` @1280, `[20,3314,350,167]` @390; Oral `[120,4523,1200,675]`.

**TwoColumnRows → TwoCols.** Same row markup, grid, fade--up motion and flipped-first alternation as the homepage. Differences:
- Container: product pages `div.bg-white.pos-rel.z-2.mtn40.br-t-32.flex.flex-col.gap-0` (with -40 and r32). Overview containers have **margin 0 and radius 0**.
- Overline: product pages put `p.label.mra.<accent>` before the h5, inside the first fade block (chip, 20px gap). The overview uses `div.icon-tag.m-m0` (25px icon + `p.sm-heading` 12px) instead.
- Button: overview rows add `a.arrow-button.m-mt20.mra` "**Learn more**" inside the second fade block, after the body.
- Optional heading (Oral): `div.max-1100.ma.text-center.mt80.mb40.p40.m-p20` > `p.h4.balance.mb20`.
- Row count varies (§4). Each product page renders a second, **empty** TwoCols container (height 0), so skip it. On Oral the second container holds the Phase 2 rows.
- Body is 1 paragraph, 16/22.4 (14 mobile).
- Image column 565 wide @1440/1280, natural height.

**ImageCard** (Oral `data-module="ImageCard"` ×2). Section `div.p40.m-p20.pos-rel.z-2.mtn40.br-t-32.bg-orange` (`#FFC8AE`, first) / `.bg-light-maroon` (`#FFE7DB`, second).
- Wrapper `image-card-wrapper mb40 mt40 max-1200`.
- Image `ml-130 ratio-2-1 m-ratio-5-4 br-8`: **2:1** (not 2.6:1), `[250,1669,1070,535]` @1440, `[170,1589,1070,535]` @1280, `[20,2340,350,280]` @390.
- Card `max-550 m-max-300` (**550** max, not 650; mobile max 320, measured 310), padding 40 (20), `[120,1837,550,447]` @1440, `[40,1757,550,447]` @1280, `[30,2560,310,531]` @390 (margin `-60px 10px 40px`).
- Card content: `p.h4.balance` (h4, not h5), `div.text-lg.flex.flex-col.gap-20` with 2 (first card) / 3 (second card) paragraphs, then `a.arrow-button`. Not flipped. Section heights 815 @1440/1280, 931/936 @390.

**Chronicle** (Oral `data-module="CadmusChronicles"`).
- Section bg `#FFE7DB`.
- Header `div.mb40.mt40.flex.flex-col.gap-10`: `p.h4.text-center` + `p.text-lg.text-center.max-650.ma` subtitle.
- Grid wrapper `div.max-1100.ma.mb40.pb20` > `div.grid-2.gap-20.chronicles-center-last`: 2 cols × 540; the 3rd tile is centred on its own row. Rects `[170,3133,540,405]`, `[730,3133,540,405]`, `[450,3633,540,405]` @1440; `[90…]`, `[650…]`, `[370…]` @1280; 1 col 350 (image 350x263) @390.
- Tiles are identical to the homepage (4:3 image, r8, mb20, `h3.h6`).
- Footer button is a **solid** `a.button` "**Keep me updated on Cadmus Oral Assessment**" → `https://33l73.share.hsforms.com/2WbnvGYVES3-L7KmQseNTdw` (352x41 @1440; full-width 350x55 @390), in `div.flex.justify-center.mt60`.
- Section height 1377 @1440/1280, 1517 @390.

**LogoMarquee.** Same animation and sizes. Props:
- `bg`: Oral `#FFE7DB` (`.bg-light-maroon`), Pricing `#FFFFFF`.
- `logos`: Oral = the homepage list (same 24, same order, Exeter linked). Pricing = a different 24-item list with no links (order in §4.8).

**Integrations** (overview, pricing). Same layout; differences:
- Title "**Connect effortlessly with your LMS⏎and uplift every assessment experience**" (2 lines).
- Body is 1 paragraph, ~26 words (starts "Whether you're delivering coursework or high-stakes digital exams,⏎Cadmus fits naturally…").
- Same 6 tiles.

**CaseStudy** (overview).
- Identical structure and stats to the homepage. Final stat values from page-data: **89%**, **+17.6%**, **96.31%** (live DOM showed mid-count values).
- Title has a forced break: "The University⏎of Manchester".
- Quote: `"I highly recommend Cadmus; it has supported our accelerated transition to blended and online learning methods, ensuring the authenticity and integrity of online assessments."`
- Role: "Associate Vice President for Teaching, Learning and Students" (homepage differs).
- CTA part identical: "Great outcomes start with high-quality assessments", Book a demo → `/request-demo`, Get a free trial → `/contact`, image `1751189417-frame-1430105575.png`.

**SolutionCards → pricing "Cards"** (`data-module="Cards"`).
- Section `div.bg-white.p40.br-t-32.mtn40`: cream **sheet** (r32, -40); the homepage version has neither.
- Heading `p.h4.white-space` "**Here to help, every step of the way**", no subtitle.
- Cards identical (`#FFF`, p15, r8, 2:1 image box, `p.h6`, 14px body) but **no "Learn more" link**.
- Card heights 374 @1440, 355–383 @390. Section 657 @1440/1280, 1413 @390.

**ImpactCounter** (pricing): (a) as-is. `p.text-heading.mb40.mt20` empty, same 3 stats (7m / Students, 18,000+ / Teachers, 25m+ / Assessments), white sheet, height 255 @1440, 449 @390.

---

## 4. Per-page specs

Copy rules: headings, labels, buttons and links are exact. Long prose is given as paragraphs/words (`1p/24w`) for placeholder fill.

### 4.1 `/product-overview/`: title "**Product Overview | Cadmus**"
| # | Section | Map | bg | 1440 y (h) | 1280 y (h) | 390 y (h) |
|---|---|---|---|---|---|---|
| 0 | HeroImage | (c) N6 | `#580C1D` | 0 (1041) | 0 (1041) | 0 (802) |
| 1 | Elevate (feature grid, 3 cols) | (b) WhyChoose | `#FCF7EF` | 1001 (556) | 1001 (575) | 762 (939) |
| 2 | Seamless video slide | (c) N7 | `#FFC8AE` | 1557 (810) | 1576 (778) | 1701 (1243) |
| 3 | TwoCols ×2 (icon-tag + button) | (b) TwoColumnRows | `#FCF7EF` | 2367 (1173) | 2354 (1173) | 2944 (1262) |
| 4 | SingleColumn | (c) N8 | transparent | 3540 (966) | 3528 (966) | 4206 (543) |
| 5 | TwoCols ×2 | (b) TwoColumnRows | `#FCF7EF` | 4507 (1040) | 4494 (1040) | 4749 (1209) |
| 6 | Integrations | (b) | `#FFC8AE` | 5507 (388) | 5494 (437) | 5918 (617) |
| 7 | CaseStudy | (b) | `#FFE7DB` | 5855 (1904) | 5891 (1904) | 6495 (2249) |
Document height: 8277 / 8313 / 10156 (plus Footer).

Copy:
- Hero: h1 "**The smarter assessment solution**"; p "**Everything educators need to support, assess and empower students.**"; image `1752535456-frame-1430105485.png`.
- Elevate: h4 "**Elevate assessment quality, consistency,⏎and literacy across your institution**". Cards:
  1. team-blue.svg, "**Increase student progression and success**", 15w.
  2. checkmark.svg, "**Uphold academic integrity with ease**", 11w.
  3. timer.svg, "**Ease workload, support students**", 19w.
- Seamless: h4 "One platform.  ⏎Every assessment covered."; h5 "**Seamless Assessment**"; body 1p/29w; videos (§5).
- TwoCols block 1:
  - Row 1 (flipped, text left): icon-tag secondary-button.svg + "**ASSIGNMENTS**"; h5 "**Cadmus Assignments**"; 1p/20w; "Learn more" → `/product/assignments/`; image `1752537911-group-1073715583.png`.
  - Row 2: icon-tag secondary-wadbutton.svg + "**EXAMS**"; h5 "**Cadmus Exams**"; 1p/20w; → `/product/exams/`; image `1752537937-group-1073715582.png`.
- SingleColumn: "**GROUP WORK**" / "**Cadmus Group Work**" / 1p/24w / "Learn more" → `/product/group-work/`; image `1754542193-group-1073715638.png`.
- TwoCols block 2:
  - Row 1 (flipped): icon-tag awdaw.svg + "**MARKING & FEEDBACK**"; h5 "**Cadmus Marking & Feedback**"; 1p/20w; → `/product/marking-feedback/`; image `1752549961-group-1073715581.png`.
  - Row 2: icon-tag secondadary-button.svg + "**LEARNING ASSURANCE ANALYTICS**"; h5 "**Cadmus Learning⏎Assurance Analytics**"; 1p/25w; → `/product/learning-analytics/`; image `1752537911-group-1073715583.png` (re-used).
- Integrations and CaseStudy: §3.

### 4.2 `/product/assignments/`: title "**Assignments | Cadmus**", scheme `yellow`
| # | Section | Map | bg | 1440 y (h) | 1280 y (h) | 390 y (h) |
|---|---|---|---|---|---|---|
| 0 | ProductHero | (c) N1 | `#3E2E2C` | 0 (920) | 0 (820) | 0 (864) |
| 1 | ProductHighlight (feature grid 3 + split) | (b) WhyChoose + split | `#FCF7EF` | 880 (1068) | 780 (1013) | 824 (1585) |
| 2 | StudyPreview | (c) N2 | `#FFE388` | 1908 (653) | 1753 (608) | 2369 (804) |
| 3 | Overview (image) | (b) Experience | `#FCF7EF` | 2521 (835) | 2321 (835) | 3134 (406) |
| 4 | TwoCols ×6 | (b) TwoColumnRows | `#FCF7EF` | 3316 (2792) | 3116 (2792) | 3500 (2977) |
| 5 | (empty TwoCols container) | skip | – | 0 h | 0 h | 0 h |
| 6 | QuoteCarousel | (c) N3 | transparent + `#FFE388` band | 6028 (707) | 5828 (643) | 6397 (1017) |
| 7 | ProductCta | (c) N4 | `#FFE388` | 6695 (513) | 6431 (513) | 7374 (489) |
Document height 7727 / 7462 / 9275.

Copy:
- Hero: overline "**Assignments**"; h1 "**Run secure, high-quality scaffolded assignments anywhere, anytime**"; p "**Craft, manage, and elevate assignments through one secure platform that guides students to success.**"; image `1752725540-frame-1073715354.png`.
- Features: h5 "**Elevate assessment quality, consistency,⏎and literacy across your institution**".
  1. certificate.svg, "**Increase student progression and success**", 15w.
  2. checkmark.svg, "**Uphold academic integrity with ease**", 10w.
  3. blackboard.svg, "**Ease workload, support students**", 16w.
- Split: h4 "**An all-in-one assessment⏎platform built on best practice**"; 1p/25w; buttons "Explore the platform" / "Book a demo"; image `1752726493-product-analyse.png`.
- StudyPreview: "**Scaffolded assessments⏎to support students**"; quote 1p/32w; "**Patrick Stoddart**", "Senior Manager of Academic and Learning Systems Support, University of Melbourne"; → `/study/case-study-the-university-of-melbourne-enhancing-digital-quality/`; image `1752621891-rectangle-3470759-1.jpg`.
- Overview: h4 "**Built for the full range of assessment types**"; image `1752728657-table-1.png`.
- TwoCols (overline | title | body | image). Row 1 is flipped (text left), then alternating:
  1. MULTI-ASSESSMENT FORMATS | "Build assessments⏎in minutes, not hours" | 1p/24w | `1752726608-group-1073715740.png`
  2. CUSTOMISABLE TOOLS | "Tools to format⏎assessments your way" | 1p/19w | `1752726637-group-1073715586.png`
  3. PRE-BUILT SKILL MODULES | "Help students build academic skills from the start" | 1p/21w | `1752726701-group-1073715585.png`
  4. ONE DASHBOARD | "See student progression in real time" | 1p/29w | `1752726744-group-1073715720.png`
  5. SUPPORT INDIVIDUAL NEEDS | "Make managing students simple" | 1p/27w | `1752726787-group-1073715694.png`
  6. TIME-SAVING TOOLS | "Save hours on marking" | 1p/24w | `1754529640-group-1073715692.png`
- Quote: h4 "**See how top educators are using Cadmus to transform assessment**"; quote 1p/56w; "**Professor David Sadler**", "Deputy Vice-Chancellor Education (former), University of Western Australia"; image `1757993623-david-sadlercard-image.jpg`.
- CTA: h4 "**Provide the structure to success⏎with high-quality, scaffolded assessments**"; 1p/24w; "Book a demo" → `/request-demo`, "Get a free trial" → `/contact`.

### 4.3 `/product/exams/`: title "**Exams | Cadmus**", scheme `lavender`
| # | Section | Map | bg | 1440 y (h) | 390 y (h) |
|---|---|---|---|---|---|
| 0 | ProductHero | (c) N1 | `#262258` | 0 (920) | 0 (864) |
| 1 | ProductHighlight | (b) | `#FCF7EF` | 880 (997) | 824 (1478) |
| 2 | StudyPreview | (c) N2 | `#C5C5FF` | 1837 (653) | 2262 (850) |
| 3 | TwoCols ×6 | (b) | `#FCF7EF` | 2450 (2904) | 3072 (3323) |
| 4 | (empty TwoCols) | skip | – | 0 | 0 |
| 5 | QuoteCarousel | (c) N3 | **`#E8E8FF`** + `#C5C5FF` band | 5274 (707) | 6315 (962) |
| 6 | ProductCta | (c) N4 | `#C5C5FF` | 5941 (513) | 7237 (489) |
Document height 6973 / 9138. No Overview section.

Copy:
- Hero: overline "**Exams**"; h1 "**Secure, smart, scalable exams that evolve with you**"; p "**Deliver secure, flexible digital exams at scale, on campus or online. Cadmus makes it easy to run high-quality assessments that uphold integrity, support diverse learners, and drive meaningful outcomes.**"; image `1754525760-exams.png`.
- Features: h5 "**Deliver secure digital exams online⏎or on campus at scale**".
  1. learning.svg, "**Smarter digital exams at scale**", 13w.
  2. checkmark.svg, "**Designed for every learner**", 12w.
  3. timer.svg, "**Build once, use forever**", 10w.
- Split: h4 "**Deliver smarter, fairer digital exams at scale**"; 1p/29w; same 2 buttons; image `1754525988-frame-1430105262.png`.
- StudyPreview: "**Shifting to smarter, more secure exams**"; 1p/49w; "**Tash Clutterbuck**", "Course Coordinator, School of Nursing and Midwifery, University of Notre Dame Australia"; → `/study/case-study-the-university-of-notre-dame/`; image `1752721470-rectangle-3470759.jpg`.
- TwoCols:
  1. MIXED-MODE QUESTION TYPES | "Design the right exam for every outcome" | 1p/33w | `1752721728-group-1073715739.png`
  2. POWERFUL QUESTION LIBRARY | "Build it once,⏎reuse it forever" | 1p/22w | `1754526099-group-1073715332.png`
  3. RICH EXAM CONFIGURATION SETTINGS | "Tailor the experience to every learner" | 1p/30w | `1754527560-group-1073715333.png`
  4. LOCKED BROWSER CAPABILITIES | "Keep students focused with secure exam settings" | 1p/21w | `1754527561-group-1073715702.png`
  5. CUSTOM ACCESS CODES | "Control who has access to every exam" | 1p/29w | `1754527560-group-1073715703.png`
  6. LEARNING ASSURANCE ANALYTICS | "Ensure every student is genuinely engaged" | 1p/22w | `1752722311-group-1073715698.png`
- Quote: h4 "**Learn how universities are delivering on-campus and online exams using Cadmus**"; 1p/53w; "**Associate Professor Kati Tonkin**", "Chair, Board of Studies (Society and Culture), University of Western Australia"; image `1757993855-imgbtn_campustours.jpg`.
- CTA: same title and buttons as Assignments ("Book a demo", "Get a free trial").

### 4.4 `/product/group-work/`: title "**Group Work | Cadmus**", scheme `pink`
| # | Section | Map | bg | 1440 y (h) | 390 y (h) |
|---|---|---|---|---|---|
| 0 | ProductHero | (c) N1 | `#820049` | 0 (920) | 0 (864) |
| 1 | ProductHighlight | (b) | `#FCF7EF` | 880 (1027) | 824 (1512) |
| 2 | StudyPreview (no link) | (c) N2 | `#FFC3F0` | 1867 (690) | 2296 (893) |
| 3 | TwoCols ×5 | (b) | `#FCF7EF` | 2517 (2386) | 3149 (2538) |
| 4 | (empty TwoCols) | skip | – | 0 | 0 |
| 5 | QuoteCarousel | (c) N3 | transparent + `#FFC3F0` band | 4824 (707) | 5607 (967) |
| 6 | ProductCta | (c) N4 | `#FFC3F0` | 5491 (513) | 6534 (489) |
Document height 6522 / 8434.

Copy:
- Hero: overline "**Group Work**"; h1 "**Effortless group work, real-world readiness**"; p "**All aspects of group work into one connected platform—from group creation and task management, to peer feedback and insights. Built to save educators time and set students up for real-world collaboration.**"; image `1752621785-group-1073715331-1.png`.
- Features: h5 "**Transform how students collaborate,⏎and how educators manage group assessments**".
  1. learning.svg, "**Simplify group setup**", 10w.
  2. checkmark.svg, "**Track collaboration with ease**", 12w.
  3. handshake.svg, "**Build real-world teamwork skills**", 12w.
- Split: h4 "**How Cadmus supports a collaborative learning environment**"; 1p/24w; image `1752621856-group-1073715358-1.png`.
- StudyPreview: "**Driving better student outcomes with insights that matter**"; 1p/55w; "**Bronwyn Alton**", "Principal Academic Staff Member, Toi Ohomai Institute of Technology"; **no button**; image `1752626702-rectangle-3470759.jpg`.
- TwoCols:
  1. GROUP ASSIGNING | "Quick and easy⏎group formation" | 1p/26w | `1754528219-group-1073715745v1.png`
  2. GROUP TASK MANAGEMENT | "Make collaboration⏎clear and structured" | 1p/27w | `1752628698-group-1073715341.png`
  3. PROGRESS TRACKER | "Stay on top of progress⏎without micromanaging" | 1p/24w | `1754528296-group-1073715576.png`
  4. COLLABORATIVE TOOLS | "Connect and collaborate in real time" | 1p/26w | `1752628781-group-1073715710.png`
  5. EVALUATION TOOLS | "Promote reflection, fairness and student growth" | 1p/26w | `1752628828-group-1073715710-1.png`
- Quote: h4 "**See how top educators are using Cadmus to transform assessment**"; 1p/55w; "**Bronwyn Alton**" (same role); image `1772165082-screenshot-2025-02-13-at-5-07-44-pm-2.jpg`.
- CTA: same title; buttons "**Book a demo**" → `/request-demo`, "**Try for free**" → `/contact`.

### 4.5 `/product/learning-analytics/`: title "**Learning Analytics | Cadmus**", scheme `blue`
| # | Section | Map | bg | 1440 y (h) | 390 y (h) |
|---|---|---|---|---|---|
| 0 | ProductHero | (c) N1 | `#123D69` | 0 (920) | 0 (864) |
| 1 | ProductHighlight | (b) | `#FCF7EF` | 880 (1002) | 824 (1568) |
| 2 | StudyPreview | (c) N2 | `#B6DBFF` | 1842 (653) | 2352 (981) |
| 3 | TwoCols ×5 | (b) | `#FCF7EF` | 2455 (2398) | 3293 (2515) |
| 4 | (empty TwoCols) | skip | – | 0 | 0 |
| 5 | QuoteCarousel | (c) N3 | transparent + `#B6DBFF` band | 4773 (707) | 5728 (939) |
| 6 | ProductCta | (c) N4 | `#B6DBFF` | 5440 (513) | 6627 (489) |
Document height 6472 / 8528.

Copy:
- Hero: overline "**Learning Analytics**" (the `title` field; verify the casing renders uppercase via CSS); h1 "**Bring clarity and confidence⏎to learning outcomes**"; p "**Cadmus tracks the full assessment journey, not just the final submission. Get real-time visibility into how students build their work and take the guesswork out of academic integrity.**"; image `1752717843-group-1073715353.png`.
- Features: h5 "**Focus on students, not paperwork**".
  1. certificate.svg, "**Assurance with trust and understanding**", 14w.
  2. heart.svg, "**See how, not just what, students learn**", 13w.
  3. book.svg (`1753010802-book.svg`; not the hero `1753779248-book.svg`), "**Stay focused on learning, not loopholes**", 13w.
- Split: h4 "**Built for integrity, ⏎designed for learning**"; 1p/30w; image `1752717997-group-1073715357-1.png`.
- StudyPreview: "**Supporting authentic learning with rich insights**"; 1p/61w; "**Megan Wesphalen**", "Lecturer, School of Nursing and Midwifery, University of Notre Dame Australia"; → `/study/case-study-the-university-of-notre-dame/`; image `1752718290-rectangle-3470759.jpg`.
- TwoCols:
  1. ASSESSMENT TEMPLATES | "Design assessments⏎that drive real learning" | 1p/20w | `1752718919-group-1000009147.png`
  2. CLASS MANAGEMENT ANALYTICS | "Understand student progression before submission" | 1p/23w | `1752719273-group-1073715737.png`
  3. LEARNING ASSURANCE ANALYTICS | "Analyse the process,⏎not just the final result" | 1p/26w | `1752718957-group-1000009166.png`
  4. AI EDUCATION & MITIGATION | "Navigate AI with confidence" | 1p/25w | `1754528006-group-1073715742.png`
  5. ASSESSMENT CONSTRUCTION ANALYTICS | "Investigate potential AI misuse" | 1p/23w | `1752719028-group-1073715743.png`
- Quote: h4 "**Read how educators are using Cadmus to ensure assure student learning at scale**" (sic); 1p/50w; "**David Israel**", "Executive Director, Global Education Strategy, University of Melbourne"; image `1757920606-david-israel.jpg`.
- CTA: same title; "Book a demo" / "Get a free trial".

### 4.6 `/product/marking-feedback/`: title "**Marking & Feedback | Cadmus**", scheme `green`
| # | Section | Map | bg | 1440 y (h) | 390 y (h) |
|---|---|---|---|---|---|
| 0 | ProductHero | (c) N1 | `#455017` | 0 (920) | 0 (864) |
| 1 | ProductHighlight | (b) | `#FCF7EF` | 880 (917) | 824 (1470) |
| 2 | StudyPreview | (c) N2 | `#D1E375` | 1757 (653) | 2254 (1054) |
| 3 | TwoCols ×7 | (b) | `#FCF7EF` | 2369 (3314) | 3268 (3428) |
| 4 | (empty TwoCols) | skip | – | 0 | 0 |
| 5 | QuoteCarousel | (c) N3 | transparent + `#D1E375` band | 5604 (707) | 6616 (912) |
| 6 | ProductCta | (c) N4 | `#D1E375` | 6271 (513) | 7488 (489) |
Document height 7302 / 9389.

Copy:
- Hero: overline "**Marking & Feedback**"; h1 "**Less admin. More insight.⏎Better feedback.**"; p "**Everything educators need to grade efficiently and at scale while maintaining connection with each student. Reduce load, maintain consistency and support student growth through smarter marking.**"; image `1752719753-group-1073715353.png`.
- Features: h5 "**Focus on students, not paperwork**".
  1. profile.svg, "**Insights that improve teaching**", 14w.
  2. timer.svg, "**Teach more, mark less**", 17w.
  3. star.svg, "**Improve feedback quality**", 15w.
- Split: h4 "**Mark faster while staying⏎focused on student growth**"; 1p/25w; image `1754528860-frame-1430105239.png`.
- StudyPreview: "**A solution that truly supports educator needs**"; 1p/75w; "**Dr Kevin Sobel-Read**", "Associate Professor, Deputy Dean, Director of Teaching and Learning, School of Law and Justice, University of Newcastle"; → `/study/case-study-the-university-of-newcastle/`; image `1752718290-rectangle-3470759.jpg`.
- TwoCols:
  1. AI-ASSISTED MARKING | "AI that works for you,⏎not instead of you" | 1p/27w | `1754528966-group-1073715578.png`
  2. FLEXIBLE MARKING | "Mark your way,⏎with more focus" | 1p/24w | `1754528007-group-1073715577.png`
  3. ONE-CLICK MODERATION | "Moderate once,⏎apply everywhere" | 1p/27w | `1754529067-group-1073715348.png`
  4. IN-LINE ANNOTATION | "Mark smarter, not harder" | 1p/26w | `1754529158-group-1073715712.png`
  5. CUSTOMISABLE RUBRICS | "Make rubrics do the heavy lifting" | 1p/24w | `1752720689-group-1073715715.png`
  6. DETAILED ANALYTICS | "Insights that improve teaching" | 1p/24w | `1754529192-group-1073715718.png`
  7. RULE-BASED FEEDBACK RELEASE | "Feedback that fits your flow" | 1p/24w | `1754529243-group-1073715717.png`
- Quote: h4 "**See how top educators are using Cadmus to ⏎transform assessment**"; 1p/44w; "**Professor Angela Hill**", "Deputy Vice-Chancellor, Edith Cowan University"; image `1757920437-angela-sqaure-1024x891.jpg`.
- CTA: same title; "Book a demo" / "**Try for free**" → `/contact`.

### 4.7 `/product/oral_assessment/`: title "**Oral Assessment | Cadmus**", scheme `maroon`
| # | Section | Map | bg | 1440 y (h) | 1280 y (h) | 390 y (h) |
|---|---|---|---|---|---|---|
| 0 | ProductHero | (c) N1 | `#87160D` | 0 (920) | 0 (820) | 0 (882) |
| 1 | ProductHighlight (grid-4, empty split) | (b) | `#FCF7EF` | 880 (749) | 780 (769) | 842 (1478) |
| 2 | ImageCard (orange) | (b) ImageCard | `#FFC8AE` | 1589 (815) | 1509 (815) | 2280 (931) |
| 3 | PhaseRelease | (c) N5 | `#FCF7EF` | 2364 (613) | 2284 (613) | 3172 (977) |
| 4 | CadmusChronicles | (b) Chronicle | `#FFE7DB` | 2937 (1377) | 2857 (1377) | 4109 (1517) |
| 5 | Overview (image + subtitle) | (b) Experience | `#FCF7EF` | 4274 (1003) | 4194 (1003) | 5586 (546) |
| 6 | TwoCols ×4 + heading "Phase 1" | (b) TwoColumnRows | `#FCF7EF` | 5238 (2521) | 5157 (2521) | 6092 (2805) |
| 7 | TwoCols ×2 + heading "Phase 2" | (b) TwoColumnRows | `#FCF7EF` | 7719 (1286) | 7639 (1286) | 8857 (1426) |
| 8 | ImageCard (light orange) | (b) ImageCard | `#FFE7DB` | 8964 (815) | 8884 (815) | 10244 (936) |
| 9 | LogoMarquee | (b) | `#FFE7DB` | 9779 (213) | 9699 (213) | 11180 (213) |
| 10 | ProductCta | (c) N4 | `#FCF7EF` | 9972 (469) | 9892 (469) | 11373 (496) |
Document height 10960 / 10880 / 13281. No StudyPreview or QuoteCarousel on this page.

Copy:
- Hero: overline "**Oral Assessment**"; h1 "**Deliver structured oral assessment with your existing assessment workflows**"; p is 2 sentences / 30w (starts "Design, deliver, and manage targeted oral assessment moments…"); image `1771973006-group-1073715744.png`.
- Features: **h4** "**Precision oral assurance for assessment in an AI-enabled world**"; grid-4:
  1. targeted-assurance.svg, "**Targeted oral assurance**", 26w.
  2. learning.svg, "**Assurance of learning, not surveillance**", 30w.
  3. academic.svg, "**Built for real academic practice**", 28w.
  4. ai-support.svg, "**Human-led assurance with AI support**", 28w.
- Highlight split: empty (100px block, §3).
- ImageCard 1: h4 "**Built with universities, for universities.**"; 2p (31w + 31w); "**Read more**" → `https://cadmus.io/news/cadmus-oral-assessment-working-group/`; image `1772167129-screenshot-2025-02-13-at-5-07-44-pm-2.jpg`.
- PhaseRelease: h4 "**Start simple, scale with confidence.**".
  - Card 1: "**Available Late May 2026 (Phase 1)**", intro 1p/16w, bullets: "Consistent prompts aligned to learning outcomes" · "No scheduling or additional systems required" · "Embedded marking and moderation workflows" · "Scalable, low-friction implementation".
  - Card 2: "**Designed to evolve late 2026 (Phase 2)**", intro 1p/14w, bullets: "Link oral responses to student work" · "Tailor prompts to context and learning outcomes" · "AI-assisted support to deliver wide scale oral assessment".
- Chronicles: h4 "**Stay close to Cadmus Oral Assessment**"; subtitle "**Latest product updates, upcoming webinars and news straight to your inbox.**". Tiles:
  1. "Detection to design: Why secure assessment now demands oral assurance" → `/news/detection-to-design-why-secure-assessment-now-demands-oral-assurance/` (`1770082005-getty-images-ofpozrbdv8g-unsplash.jpg`)
  2. "Beyond proctoring: How Cadmus is redefining secure assessment" → `/news/beyond-proctoring-how-cadmus-is-redefining-secure-assessment/` (`1769470107-adobestock_733092520-1.jpeg`)
  3. "Cadmus convenes a working group to develop a new approach to oral assurance for secure assessment" → `/news/cadmus-oral-assessment-working-group/` (`1754564986-surface-8hplpr3hebu-unsplash.jpg`, already local)
  - Button "Keep me updated on Cadmus Oral Assessment" (HubSpot URL above).
- Overview: h4 "**Built for a range of assessment use cases**"; subtitle "**Cadmus Oral Assessment supports proportionate, defensible oral assurance across disciplines, cohort sizes and assessment designs.**"; image `1773882874-vivas-webpage-asset.png`.
- TwoCols block 1, heading "**Phase 1: Available Late May 2026**". Chips are default `#FFE7DB`.
  1. CREATION (DESIGN) | "Create oral assessment moments aligned to learning outcomes" | 1p/57w (contains 4 `<br>`) | `1771973005-building-a-vivas-task.png`
  2. DELIVERY AND INTEGRITY | "Run secure oral assessment without surveillance or scheduling" | 1p/63w (2 `<br>`) | `1771973005-group-1073715744-1.png`
  3. MARKING & MODERATION | "Streamline marking and moderation at scale" | 1p/19w | `1771973006-moderation.png`
  4. PEDAGOGY PARTNERSHIP | "Turn oral assessment into a powerful learning moment" | 1p/18w | `1771973007-marking.png`
- TwoCols block 2, heading "**Phase 2: Coming late 2026/2027**":
  1. LINKED ASSESSMENT | "Connect oral explanation to student work" | 1p/23w | `1771973582-linked-assessment-settings.png`
  2. USE CADMUS AI | "Scale oral assessment design with AI-assisted support" | 1p/52w | `1771973005-task-builder-linked-assessment-journey.png`
- ImageCard 2: h4 "**Stay up to date with Cadmus Oral Assessment**"; 3p (24w, 16w, and "Can’t attend live? Register your interest to receive the recording and materials."); "**Vivas Webinar Registration**" → `https://33l73.share.hsforms.com/2WbnvGYVES3-L7KmQseNTdw`; image `1771920685-vivas-registration.jpg`.
- LogoMarquee: "Join The World’s Leading Universities", homepage logo list.
- CTA: h4 "**A new standard for oral assessment at scale**"; 1p/26w; "**Book a demo**" → `/request-demo`, "**Vivas Webinar Registration**" → `/request-demo` (sic: the live href is `/request-demo`).

### 4.8 `/pricing/`: title "**Pricing | Cadmus**"
| # | Section | Map | bg | 1440 y (h) | 1280 y (h) | 390 y (h) |
|---|---|---|---|---|---|---|
| 0 | PricingHero + 3 cards | (c) N9 | `#FFC8AE` | 0 (1239) | 0 (1239) | 0 (2737) |
| 1 | LicenceRow | (c) N10 | `#FFC8AE` | 1239 (638) | 1239 (658) | 2737 (1026) |
| 2 | GettingStarted | (c) N11 | `#FFFFFF` | 1837 (480) | 1856 (499) | 3723 (957) |
| 3 | Help cards | (b) SolutionCards | `#FCF7EF` | 2276 (657) | 2315 (657) | 4639 (1413) |
| 4 | Integrations | (b) | `#FFC8AE` | 2894 (388) | 2933 (437) | 6012 (617) |
| 5 | Testimonials | (c) N12 | `#FCF7EF` | 3242 (771) | 3329 (810) | 6589 (1870) |
| 6 | ImpactCounter | (a) | `#FFFFFF` | 3973 (255) | 4100 (255) | 8419 (449) |
| 7 | LogoMarquee | (b) | `#FFFFFF` | 4228 (213) | 4355 (213) | 8868 (213) |
| 8 | FAQs | (c) N13 | `#FFE7DB` | 4421 (767) | 4548 (693) | 9061 (933) |
Document height 5706 / 5759 / 11406.

Copy:
- Hero: h1 "**Scalable, flexible assessment solutions**"; caption 1p/24w.
- Cards (overline | name | caption | bullets | button):
  1. "**For Starting**" | "**Pilot**" | "Perfect for institutions exploring the value Cadmus brings before scaling up." | 5 bullets (15, 15, 16, 13, 6 words; last is "Dedicated success team to support implementation.") | "**Get started**" → `/contact/`
  2. "**for flexibility**" (lower-case in CMS, uppercased by CSS) | "**Pay-Per-User**" | "Access Cadmus on a per student user basis, meaning you only pay for what you use." | 5 bullets (first 4 identical to Pilot; 5th "Dedicated project success team to support implementation.") | "**Request pricing**" → `/contact/`
  3. "**For Scaling**" | "**Enterprise**" | "Ideal for universities ready to roll out Cadmus⏎institution-wide." | 9 bullets: "Full platform access institution-wide, with unlimited scaling capabilities." · "Dedicated platform training and onboarding." · "Full access to rich assessment template gallery." · "Access to academic skills development, long-form written assessment and open-book exams." · "Access to student progression and Learning Assurance Analytics." · "Access to marking and feedback tools." · "Dedicated project success team to support implementation and upscaling of product." · "Access to optional add-ons to enhance student and educator experience." · "24/7 real-time support." | "**Request pricing**" → `/contact/`
- LicenceRow: h5 "Licences designed to⏎grow with your institution"; body 41w. Card: "**For extra support**" | "**+ Add-ons**" | caption 20w | bullets: "Dedicated platform training and onboarding" · "Dedicated project success team to support implementation" · "Assessment redesign services" · "Quizzes" · "Group work functionality" · "Multi-format assessment" · "Locked-down browser functionality to run secure, in-place digital exams" | "**Contact Sales Team**" → `/contact/`.
- GettingStarted:
  - 01. "**Implementation and onboarding**" (26w)
  - 02. "**Dedicated project success team**" (26w)
  - 03. "**Succession planning & rich reporting**" (24w)
- Help cards:
  - "**Local support**" (38w, `1754544269-vector_layer.png`)
  - "**Tailored support**" (34w, `1754544310-vector_layer.png`)
  - "**Comprehensive educator training**" (33w, `1754544285-vector_layer-1.png`)
- Integrations: overview text (§3).
- Testimonials (name | institution | words):
  - Keith Murfin | University of the Sunshine Coast | 40w
  - Sharon Crooks | Massey University | 28w
  - Dr William Finlay | University of Glasgow | 45w
  - Darlyn Chutuape | Toi Ohama Institute of Technology | 45w
  - Intifar Chowdhury | Flinders University | 45w
  - Dr Alison Taylor | Bond University | 49w
- ImpactCounter: 7m Students · 18,000+ Teachers · 25m+ Assessments.
- LogoMarquee (no links), order:
  1. **1750938776-rmit_university_logo-1.png** (missing locally)
  2. rmit_university_logo-2
  3. usq-logo
  4. bondlogo
  5. zayed
  6. acu
  7. logo-uon
  8. 094c1cda
  9. kcl
  10. maynooth
  11. avd9ij1nl
  12. uog_colour
  13. manchester
  14. uni-of-canberra
  15. university-of-melbourne
  16. uwa
  17. flinders
  18. liverpool-john-moores
  19. images-2-1
  20. logusc
  21. notre-dame
  22. rmit_university_logo-1 (1754542661)
  23. adelaide
  24. 626ba0db
- FAQs (question | answer):
  1. "**What are the differences between the Cadmus licences?**" | 3 blocks / 122w, with bold "Pilot", "Enterprise", "Pay-Per-User"
  2. "**How do I know which licence is best suited to my university?**" | 1p/101w
  3. "**Is there a minimum contract term?**" | 1p/56w
  4. "**Is there a limit on the number of Cadmus users?**" | 1p/74w, contains an `em`

---

## 5. Assets

All URLs are `https://www.datocms-assets.com/163564/<file>` (Gatsby serves them with `?auto=format&w=…`). Sizes in the table are rendered size @1440 plus the served raster size; the page-data originals are larger. The two Overview videos are Vimeo progressive MP4s (signed URLs; may expire). Data-URI icons used by these routes (quote arrows, accordion plus/minus) are in the live CSS: `.quote-prev/.quote-next` and `.accordion-icon` / `.accordion.active .accordion-icon`. They are not files.

**Already in `/Users/riyaghosh/V3/cadmus/public/assets` (42):** all 6 integration icons, all 5 product tab icons (secondary-*.svg, awdaw.svg), certificate / team-blue / profile svgs, Manchester case-study image + CTA illustration (`1751189417…`), `1754544269-vector_layer.png`, `1754564986-surface-8hplpr3hebu-unsplash.jpg`, and all 24 homepage logos (incl. `1750938797-exeter.png`).

### Missing assets (85: 83 images + 2 videos)
| # | File | Absolute URL | Used on | Where / rendered size |
|---|---|---|---|---|
| 1 | `1750938776-rmit_university_logo-1.png` | https://www.datocms-assets.com/163564/1750938776-rmit_university_logo-1.png | /pricing/ | LogoMarquee 150x40 @1440, natural 226x80 |
| 2 | `1752310381-group-1073715500-1.png` | https://www.datocms-assets.com/163564/1752310381-group-1073715500-1.png | /pricing/ | FAQs 660x607 @1440, natural 1310x1204 |
| 3 | `1754544285-vector_layer-1.png` | https://www.datocms-assets.com/163564/1754544285-vector_layer-1.png | /pricing/ | Cards 357x190 @1440, natural 600x320 |
| 4 | `1754544310-vector_layer.png` | https://www.datocms-assets.com/163564/1754544310-vector_layer.png | /pricing/ | Cards 357x190 @1440, natural 400x213 |
| 5 | `1752535456-frame-1430105485.png` | https://www.datocms-assets.com/163564/1752535456-frame-1430105485.png | /product-overview/ | HeroImage 900x550 @1440, natural 1440x880 |
| 6 | `1752537911-group-1073715583.png` | https://www.datocms-assets.com/163564/1752537911-group-1073715583.png | /product-overview/ | section 3 565x489 @1440, natural 1380x1194 |
| 7 | `1752537937-group-1073715582.png` | https://www.datocms-assets.com/163564/1752537937-group-1073715582.png | /product-overview/ | section 3 565x525 @1440, natural 1162x1079 |
| 8 | `1752549961-group-1073715581.png` | https://www.datocms-assets.com/163564/1752549961-group-1073715581.png | /product-overview/ | section 5 565x391 @1440, natural 1352x936 |
| 9 | `1753010829-checkmark.svg` | https://www.datocms-assets.com/163564/1753010829-checkmark.svg | /product-overview/, /product/assignments/, /product/exams/, /product/group-work/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 10 | `1753011034-timer.svg` | https://www.datocms-assets.com/163564/1753011034-timer.svg | /product-overview/, /product/exams/, /product/marking-feedback/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 11 | `1753697503-frame-1430105875-1.png` | https://www.datocms-assets.com/163564/1753697503-frame-1430105875-1.png | /product-overview/ | page-data only (mobile video fallback; not rendered) |
| 12 | `1754382126-videoframe_0.png` | https://www.datocms-assets.com/163564/1754382126-videoframe_0.png | /product-overview/ | page-data only (video fallback image; not rendered) |
| 13 | `1754542193-group-1073715638.png` | https://www.datocms-assets.com/163564/1754542193-group-1073715638.png | /product-overview/ | SingleColumn 1200x668 @1440 (lazy; intrinsic size per page-data) |
| 14 | `1752621891-rectangle-3470759-1.jpg` | https://www.datocms-assets.com/163564/1752621891-rectangle-3470759-1.jpg | /product/assignments/ | StudyPreview 620x349 @1440, natural 655x540 |
| 15 | `1752725540-frame-1073715354.png` | https://www.datocms-assets.com/163564/1752725540-frame-1073715354.png | /product/assignments/ | ProductHero 670x470 @1440, natural 1197x839 |
| 16 | `1752726493-product-analyse.png` | https://www.datocms-assets.com/163564/1752726493-product-analyse.png | /product/assignments/ | ProductHighlight 630x435 @1440, natural 1440x995 |
| 17 | `1752726608-group-1073715740.png` | https://www.datocms-assets.com/163564/1752726608-group-1073715740.png | /product/assignments/ | TwoCols 565x338 @1440, natural 1205x720 |
| 18 | `1752726637-group-1073715586.png` | https://www.datocms-assets.com/163564/1752726637-group-1073715586.png | /product/assignments/ | TwoCols 565x445 @1440 (lazy; intrinsic size per page-data) |
| 19 | `1752726701-group-1073715585.png` | https://www.datocms-assets.com/163564/1752726701-group-1073715585.png | /product/assignments/ | TwoCols 565x393 @1440, natural 1031x718 |
| 20 | `1752726744-group-1073715720.png` | https://www.datocms-assets.com/163564/1752726744-group-1073715720.png | /product/assignments/ | TwoCols 565x367 @1440, natural 1023x665 |
| 21 | `1752726787-group-1073715694.png` | https://www.datocms-assets.com/163564/1752726787-group-1073715694.png | /product/assignments/ | TwoCols 565x367 @1440, natural 1012x657 |
| 22 | `1752728657-table-1.png` | https://www.datocms-assets.com/163564/1752728657-table-1.png | /product/assignments/ | Overview 1200x572 @1440, natural 1440x685 |
| 23 | `1753010819-blackboard.svg` | https://www.datocms-assets.com/163564/1753010819-blackboard.svg | /product/assignments/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 24 | `1754529640-group-1073715692.png` | https://www.datocms-assets.com/163564/1754529640-group-1073715692.png | /product/assignments/ | TwoCols 565x402 @1440, natural 1039x739 |
| 25 | `1757993623-david-sadlercard-image.jpg` | https://www.datocms-assets.com/163564/1757993623-david-sadlercard-image.jpg | /product/assignments/ | QuoteCarousel 440x440 @1440 (lazy; intrinsic size per page-data) |
| 26 | `1752721470-rectangle-3470759.jpg` | https://www.datocms-assets.com/163564/1752721470-rectangle-3470759.jpg | /product/exams/ | StudyPreview 620x349 @1440, natural 655x540 |
| 27 | `1752721728-group-1073715739.png` | https://www.datocms-assets.com/163564/1752721728-group-1073715739.png | /product/exams/ | TwoCols 565x525 @1440, natural 1162x1079 |
| 28 | `1752722311-group-1073715698.png` | https://www.datocms-assets.com/163564/1752722311-group-1073715698.png | /product/exams/ | TwoCols 565x280 @1440 (lazy; intrinsic size per page-data) |
| 29 | `1754525760-exams.png` | https://www.datocms-assets.com/163564/1754525760-exams.png | /product/exams/ | ProductHero 670x482 @1440, natural 1440x1035 |
| 30 | `1754525988-frame-1430105262.png` | https://www.datocms-assets.com/163564/1754525988-frame-1430105262.png | /product/exams/ | ProductHighlight 630x421 @1440, natural 1440x962 |
| 31 | `1754526099-group-1073715332.png` | https://www.datocms-assets.com/163564/1754526099-group-1073715332.png | /product/exams/ | TwoCols 565x365 @1440, natural 1440x930 |
| 32 | `1754527560-group-1073715333.png` | https://www.datocms-assets.com/163564/1754527560-group-1073715333.png | /product/exams/ | TwoCols 565x483 @1440, natural 1318x1127 |
| 33 | `1754527560-group-1073715703.png` | https://www.datocms-assets.com/163564/1754527560-group-1073715703.png | /product/exams/ | TwoCols 565x439 @1440, natural 1440x1118 |
| 34 | `1754527561-group-1073715702.png` | https://www.datocms-assets.com/163564/1754527561-group-1073715702.png | /product/exams/ | TwoCols 565x332 @1440, natural 1290x759 |
| 35 | `1757993855-imgbtn_campustours.jpg` | https://www.datocms-assets.com/163564/1757993855-imgbtn_campustours.jpg | /product/exams/ | QuoteCarousel 440x440 @1440, natural 792x576 |
| 36 | `1771922318-learning.svg` | https://www.datocms-assets.com/163564/1771922318-learning.svg | /product/exams/, /product/group-work/, /product/oral_assessment/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 37 | `1752621785-group-1073715331-1.png` | https://www.datocms-assets.com/163564/1752621785-group-1073715331-1.png | /product/group-work/ | ProductHero 670x426 @1440, natural 760x483 |
| 38 | `1752621856-group-1073715358-1.png` | https://www.datocms-assets.com/163564/1752621856-group-1073715358-1.png | /product/group-work/ | ProductHighlight 630x413 @1440, natural 1434x941 |
| 39 | `1752626702-rectangle-3470759.jpg` | https://www.datocms-assets.com/163564/1752626702-rectangle-3470759.jpg | /product/group-work/ | StudyPreview 620x349 @1440, natural 655x539 |
| 40 | `1752628698-group-1073715341.png` | https://www.datocms-assets.com/163564/1752628698-group-1073715341.png | /product/group-work/ | TwoCols 565x464 @1440, natural 963x791 |
| 41 | `1752628781-group-1073715710.png` | https://www.datocms-assets.com/163564/1752628781-group-1073715710.png | /product/group-work/ | TwoCols 565x390 @1440, natural 1005x694 |
| 42 | `1752628828-group-1073715710-1.png` | https://www.datocms-assets.com/163564/1752628828-group-1073715710-1.png | /product/group-work/ | TwoCols 565x356 @1440 (lazy; intrinsic size per page-data) |
| 43 | `1753010966-handshake.svg` | https://www.datocms-assets.com/163564/1753010966-handshake.svg | /product/group-work/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 44 | `1754528219-group-1073715745v1.png` | https://www.datocms-assets.com/163564/1754528219-group-1073715745v1.png | /product/group-work/ | TwoCols 565x367 @1440, natural 670x435 |
| 45 | `1754528296-group-1073715576.png` | https://www.datocms-assets.com/163564/1754528296-group-1073715576.png | /product/group-work/ | TwoCols 565x409 @1440, natural 659x477 |
| 46 | `1772165082-screenshot-2025-02-13-at-5-07-44-pm-2.jpg` | https://www.datocms-assets.com/163564/1772165082-screenshot-2025-02-13-at-5-07-44-pm-2.jpg | /product/group-work/ | QuoteCarousel 440x440 @1440, natural 1221x587 |
| 47 | `1752717843-group-1073715353.png` | https://www.datocms-assets.com/163564/1752717843-group-1073715353.png | /product/learning-analytics/ | ProductHero 670x465 @1440, natural 803x557 |
| 48 | `1752717997-group-1073715357-1.png` | https://www.datocms-assets.com/163564/1752717997-group-1073715357-1.png | /product/learning-analytics/ | ProductHighlight 630x426 @1440, natural 1380x934 |
| 49 | `1752718290-rectangle-3470759.jpg` | https://www.datocms-assets.com/163564/1752718290-rectangle-3470759.jpg | /product/learning-analytics/, /product/marking-feedback/ | StudyPreview 620x349 @1440, natural 655x540 |
| 50 | `1752718919-group-1000009147.png` | https://www.datocms-assets.com/163564/1752718919-group-1000009147.png | /product/learning-analytics/ | TwoCols 565x401 @1440, natural 732x519 |
| 51 | `1752718957-group-1000009166.png` | https://www.datocms-assets.com/163564/1752718957-group-1000009166.png | /product/learning-analytics/ | TwoCols 565x390 @1440, natural 684x472 |
| 52 | `1752719028-group-1073715743.png` | https://www.datocms-assets.com/163564/1752719028-group-1073715743.png | /product/learning-analytics/ | TwoCols 565x325 @1440, natural 987x567 |
| 53 | `1752719273-group-1073715737.png` | https://www.datocms-assets.com/163564/1752719273-group-1073715737.png | /product/learning-analytics/ | TwoCols 565x459 @1440 (lazy; intrinsic size per page-data) |
| 54 | `1753010802-book.svg` | https://www.datocms-assets.com/163564/1753010802-book.svg | /product/learning-analytics/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 55 | `1753010910-heart.svg` | https://www.datocms-assets.com/163564/1753010910-heart.svg | /product/learning-analytics/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 56 | `1754528006-group-1073715742.png` | https://www.datocms-assets.com/163564/1754528006-group-1073715742.png | /product/learning-analytics/ | TwoCols 565x424 @1440, natural 1336x1002 |
| 57 | `1757920606-david-israel.jpg` | https://www.datocms-assets.com/163564/1757920606-david-israel.jpg | /product/learning-analytics/ | QuoteCarousel 440x440 @1440, natural 240x240 |
| 58 | `1752719753-group-1073715353.png` | https://www.datocms-assets.com/163564/1752719753-group-1073715353.png | /product/marking-feedback/ | ProductHero 670x490 @1440, natural 772x565 |
| 59 | `1752720689-group-1073715715.png` | https://www.datocms-assets.com/163564/1752720689-group-1073715715.png | /product/marking-feedback/ | TwoCols 565x360 @1440, natural 1007x642 |
| 60 | `1753010925-star.svg` | https://www.datocms-assets.com/163564/1753010925-star.svg | /product/marking-feedback/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 61 | `1754528007-group-1073715577.png` | https://www.datocms-assets.com/163564/1754528007-group-1073715577.png | /product/marking-feedback/ | TwoCols 565x474 @1440, natural 1336x1122 |
| 62 | `1754528860-frame-1430105239.png` | https://www.datocms-assets.com/163564/1754528860-frame-1430105239.png | /product/marking-feedback/ | ProductHighlight 630x341 @1440, natural 1440x778 |
| 63 | `1754528966-group-1073715578.png` | https://www.datocms-assets.com/163564/1754528966-group-1073715578.png | /product/marking-feedback/ | TwoCols 565x439 @1440 (lazy; intrinsic size per page-data) |
| 64 | `1754529067-group-1073715348.png` | https://www.datocms-assets.com/163564/1754529067-group-1073715348.png | /product/marking-feedback/ | TwoCols 565x388 @1440, natural 1020x700 |
| 65 | `1754529158-group-1073715712.png` | https://www.datocms-assets.com/163564/1754529158-group-1073715712.png | /product/marking-feedback/ | TwoCols 565x367 @1440, natural 990x643 |
| 66 | `1754529192-group-1073715718.png` | https://www.datocms-assets.com/163564/1754529192-group-1073715718.png | /product/marking-feedback/ | TwoCols 565x368 @1440 (lazy; intrinsic size per page-data) |
| 67 | `1754529243-group-1073715717.png` | https://www.datocms-assets.com/163564/1754529243-group-1073715717.png | /product/marking-feedback/ | TwoCols 565x358 @1440, natural 1036x656 |
| 68 | `1757920437-angela-sqaure-1024x891.jpg` | https://www.datocms-assets.com/163564/1757920437-angela-sqaure-1024x891.jpg | /product/marking-feedback/ | QuoteCarousel 440x440 @1440 (lazy; intrinsic size per page-data) |
| 69 | `1769470107-adobestock_733092520-1.jpeg` | https://www.datocms-assets.com/163564/1769470107-adobestock_733092520-1.jpeg | /product/oral_assessment/ | CadmusChronicles 540x405 @1440, natural 1440x960 |
| 70 | `1770082005-getty-images-ofpozrbdv8g-unsplash.jpg` | https://www.datocms-assets.com/163564/1770082005-getty-images-ofpozrbdv8g-unsplash.jpg | /product/oral_assessment/ | CadmusChronicles 540x405 @1440, natural 1440x1242 |
| 71 | `1771920685-vivas-registration.jpg` | https://www.datocms-assets.com/163564/1771920685-vivas-registration.jpg | /product/oral_assessment/ | ImageCard 1070x535 @1440, natural 1468x979 |
| 72 | `1771922317-academic.svg` | https://www.datocms-assets.com/163564/1771922317-academic.svg | /product/oral_assessment/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 73 | `1771922317-ai-support.svg` | https://www.datocms-assets.com/163564/1771922317-ai-support.svg | /product/oral_assessment/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 74 | `1771922317-targeted-assurance.svg` | https://www.datocms-assets.com/163564/1771922317-targeted-assurance.svg | /product/oral_assessment/ | ProductHighlight 34x34 @1440, natural 36x36 |
| 75 | `1771973005-building-a-vivas-task.png` | https://www.datocms-assets.com/163564/1771973005-building-a-vivas-task.png | /product/oral_assessment/ | TwoCols 565x499 @1440, natural 1440x1271 |
| 76 | `1771973005-group-1073715744-1.png` | https://www.datocms-assets.com/163564/1771973005-group-1073715744-1.png | /product/oral_assessment/ | TwoCols 565x551 @1440, natural 1374x1340 |
| 77 | `1771973005-task-builder-linked-assessment-journey.png` | https://www.datocms-assets.com/163564/1771973005-task-builder-linked-assessment-journey.png | /product/oral_assessment/ | TwoCols 565x500 @1440 (lazy; intrinsic size per page-data) |
| 78 | `1771973006-group-1073715744.png` | https://www.datocms-assets.com/163564/1771973006-group-1073715744.png | /product/oral_assessment/ | ProductHero 670x653 @1440, natural 1374x1340 |
| 79 | `1771973006-moderation.png` | https://www.datocms-assets.com/163564/1771973006-moderation.png | /product/oral_assessment/ | TwoCols 565x480 @1440, natural 1440x1222 |
| 80 | `1771973007-marking.png` | https://www.datocms-assets.com/163564/1771973007-marking.png | /product/oral_assessment/ | TwoCols 565x408 @1440 (lazy; intrinsic size per page-data) |
| 81 | `1771973582-linked-assessment-settings.png` | https://www.datocms-assets.com/163564/1771973582-linked-assessment-settings.png | /product/oral_assessment/ | TwoCols 565x362 @1440, natural 778x498 |
| 82 | `1772167129-screenshot-2025-02-13-at-5-07-44-pm-2.jpg` | https://www.datocms-assets.com/163564/1772167129-screenshot-2025-02-13-at-5-07-44-pm-2.jpg | /product/oral_assessment/ | ImageCard 1070x535 @1440, natural 1186x556 |
| 83 | `1773882874-vivas-webpage-asset.png` | https://www.datocms-assets.com/163564/1773882874-vivas-webpage-asset.png | /product/oral_assessment/ | Overview 1200x675 @1440, natural 1440x810 |
| 84 | video 1107330055 (desktop, 1366x274, 2.03 s loop) | https://player.vimeo.com/progressive_redirect/playback/1107330055/rendition/720p/file.mp4?loc=external&signature=b467c01a3d9f43984adee6b2afc21f75e626bc5a5e562b4995307974826cd550 | /product-overview/ | Seamless section, `div.m-hide`, 1360x273 @1440 |
| 85 | video 1107332047 (mobile, 630x1366, 2.03 s loop) | https://player.vimeo.com/progressive_redirect/playback/1107332047/rendition/720p/file.mp4?loc=external&signature=09907087bdb6ca71741e0ec6a2c0602a3d632ae9d6370075125268d91dde3c9b | /product-overview/ | Seamless section, `div.m-show`, 350x759 @390 |

---

## 6. UNVERIFIED / not measured
- 1280 layout for Exams, Group Work, Learning Analytics and Marking & Feedback was not measured. They use the Assignments template, so apply the Assignments 1280 reflow.
- QuoteCarousel Swiper options (speed, loop, autoplay, effect). Every page has a single slide and the arrows are `swiper-button-lock` (hidden), so behaviour with more than one slide was not observable.
- ProductHero vertical position depends on image height. Rects are given for Assignments; other pages' image heights are listed in N1.
- FAQ open/close was exercised on item 1 → 2 only. The 0.4s height transition timing curve uses the default `ease` (no explicit timing function in the CSS).
- The exact STIX Two Text @import weights.
- Hover states other than those listed (cards, tiles, chips, testimonial cards, chronicle tiles): no `:hover` rules exist for these classes in the CSSOM, so treat them as no hover.
- The Exams TwoCols first-row chip measured at x=100 (others x=120). Small internal offset, not investigated.
- Copy marked "(sic)" is reproduced from the live site as-is.
