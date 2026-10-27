Source: https://cadmus.io/

# CLONE SPEC — content routes (News, Case Studies, ROI study, Teaching guides, Video tutorials, Information)

Measured live 2026-10-27 in an isolated headless Chromium (Playwright 1.63) at **1440x900**, **1280x800** and **390x844** with `getComputedStyle` / `getBoundingClientRect`, the live CSSOM (site CSS is one global stylesheet inlined in every page), Gatsby `page-data.json` for every route, and the **original component source** recovered from the live source maps (`*.js.map` ship `sourcesContent`). Behaviour (filters, Load more, popup, forms) was both read from source and exercised live.

Read with: `/CLONE_SPEC.md` (global tokens §0, fonts, buttons §0.7, motion §0.8, Header §1, Footer §17). Everything here uses those tokens; only new values are listed.

Conventions
- Rects are `[x, y(page), w, h]` CSS px. "@1440" = 1440x900 etc.
- Mapping legend for every section: **(a)** existing component as-is · **(b)** existing component, different content/props/variant (deltas listed) · **(c)** genuinely new section type (full spec in §3).
- Existing homepage components hard-code their copy. Every (b) below therefore means "lift the hard-coded data into props and add the listed variant switches"; markup/classes stay.
- Header (`Header.jsx`) and Footer (`Footer.jsx`) are **(a) as-is on every route** in this file (same `Layout` in source). Footer always overlaps the previous block by 40px (`margin-top:-40px`, z-3).
- Global page fade-in (`.page--transition`, CLONE_SPEC §0.8) applies to all routes. **No sal.js scroll reveals exist on any route in this file** (0 `[data-sal]` elements measured on all 12 pages) except the footer wordmark peel. No GSAP counters on these routes.

---

## 1. Route inventory

### 1.1 Requested routes
| Route | `<title>` | Template (orig) | doc height 1440 / 1280 / 390 |
|---|---|---|---|
| `/news/` | `Cadmus Chronicles \| Cadmus` | `src/pages/news.js` | 4947 / 4813 / 7809 |
| `/news/why-ai-demands-a-redesign-of-assessment/` | `Why AI demands a redesign of assessment—not just a policy response \| Cadmus` | `templates/news.js` | 6642 / 6599 / 10523 |
| `/news/why-ai-proofing-assessments-misses-the-point/` | `Why “AI-proofing” assessments misses the point—and what to design for instead \| Cadmus` | `templates/news.js` | 6726 / 6663 / 10702 |
| `/news/the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it/` | `The degree has always been a signal. AI is changing how we verify it. \| Cadmus` | `templates/news.js` | 5164 / 5120 / 8597 |
| `/case-studies/` | `Case Studies \| Cadmus` | `pages/case-studies.js` | 4705 / 4524 / 7418 |
| `/study/case-study-the-university-of-manchester/` | `The University of Manchester Transitions to Hybrid Learning and Assessment with Cadmus \| Cadmus` | `templates/study.js` | 9124 / 9097 / 13965 |
| `/study/2026-Cadmus-ROI-study/` | `ROI Report \| Cadmus` (+ meta description = seoDescription, see §2.6) | `pages/study/2026-Cadmus-ROI-study.js` | 4370 / 4277 / 6841 |
| `/teacher-guides/` | `Teaching Guides \| Cadmus` | `pages/teacher-guides.js` | 4015 / 3795 / 5777 |
| `/video-tutorials/` | `Video Tutorials \| Cadmus` | `pages/video-tutorials.js` | 4178 / 4026 / 6522 |
| `/information/privacy-policy-au/` | `Privacy Policy (AU) \| Cadmus` | `templates/information.js` | 4884 / 4884 / 7269 |

Title rule (Seo component): `` `${title} | Cadmus` ``. Default meta description: "Cadmus empowers universities to deliver high-quality assessments in a single secure platform."

### 1.2 Child routes discovered (full lists with per-item data in Appendix A)
| Source listing | URL pattern | Count | Template | Notes |
|---|---|---|---|---|
| `/news/` | `/news/<slug>/` | **76** | `templates/news.js` (spec §2.2) | All 76 are rendered in the DOM on load (7 visible, 69 inside a collapsed "Load More" accordion). No pagination, no URL query params. |
| `/case-studies/` | `/study/<slug>/` | **36** | `templates/study.js` (spec §2.4) | Desktop (>980px): card is a `<button>` that opens a **slide-in popup** with the full study; ≤980px: card is a link to `/study/<slug>/`. `/study/2026-Cadmus-ROI-study/` is a separate hand-built page (not in the 36). |
| `/teacher-guides/` | `/guides/<slug>/` | **13** | `templates/guide.js` (spec §2.8) | Note prefix is `/guides/`, not `/teacher-guides/`. |
| `/video-tutorials/` | `/video/<slug>/` | **29 rendered** (24 teacher + 5 student) of 33 CMS videos (4 have `guideType: "unlisted"` and are only reachable by URL) | `templates/video.js` (spec §2.10) | Mobile related-video links inside the video template point to `/video-tutorials/<slug>` (source bug; desktop uses `/video/<slug>`). |
| Footer | `/information/privacy-policy-au/` | 1 | `templates/information.js` | Only information page linked anywhere in header/footer. Footer also links `/trust-centre/` (not an information template; out of scope here). No sitemap is published (`/sitemap-index.xml` returns the 404 page). |

---

## 2. Per-route section lists and component mapping

### 2.1 `/news/` — 3 sections + footer
| # | Section (orig module) | Rect @1440 / 1280 / 390 | Theme | Mapping |
|---|---|---|---|---|
| 1 | NewsBanner | [0,0,1440,770] / [0,0,1280,770] / [0,0,390,490] | bg `#580C1D`, text `#FFC8AE` | **(c) N1** |
| 2 | Listing: CategoryFilter + NewsArticles grid | [0,730,1440,2944] / [0,730,1280,2870] / [0,450,390,5338] | sheet, bg `#FCF7EF` (cream), r 32 top, mt -40, z2, p40 (20) | **(c) N2 + N3** (card variant "news") |
| 3 | CtaWithImage | [0,3634,1440,795] / [0,3560,1280,734] / [0,5748,390,650] | sheet, bg `#FFC8AE` | **(b)** `CaseStudy.jsx` part C (see §4.1) |
| – | Footer | y 4389 / 4255 / 6358 | maroon | (a) |

Copy: captionOne "**Latest News**", title "**The Cadmus Chronicle**", captionTwo "**Est. 2025**". Filter label "**Topics**", reset "**Reset all**". Categories (12, in this order): Product, Academic Integrity, Exam Alternatives, Feedback & Marking, Assessment Design, Product update, Uplifting Educators, Leadership, Teaching & Learning, AI, Student Success, Company. Load toggle "**Load More**" / "**Show Less**". CTA: "**Great outcomes start with high-quality assessments**", buttons "**Book a demo**" → `/request-demo` (solid), "**Get a free trial**" → `/` (outline) — both `target="_blank" rel="noopener noreferrer"`. CTA image `1751189417-frame-1430105575.png` (981x739, local).

Assets: 76 card thumbnails (Appendix A.1) + CTA image + `news-28b75d4aff69441c8f234ffe6e32ab06.svg`. Only the 15 above the fold/first rows are requested on load (Gatsby lazy images).

### 2.2 `/news/<slug>/` — News article template (3 measured instances)
Layout: `Spacer(100)` then `div.p20` (m-p0) > `div.bg-pure-white.br-12.pos-rel.z-2.p20` "article shell" containing all sections below. Page background = body cream `#FCF7EF`; the shell is white `#FFFFFF`, radius 12.

| # | Section | Rect @1440 (why-ai-demands) | Theme | Mapping |
|---|---|---|---|---|
| 0 | Article shell | outer [0,100,1440,6023], shell [20,120,1400,5983]; 1280 shell [20,120,1240,…]; 390 shell [0,100,390,…] (m-p0, shell keeps p20) | white | **(c) N4** |
| 1 | ArticleHero (overline "**News**", marker) | [40,140,1360,630] / 1280 [40,140,1200,560] / 390 [20,120,350,591] | image bg `rgba(0,0,0,.1)` placeholder | **(c) N5** (card = `ImageCard` floating card styling, see N5) |
| 2 | About/Share bar + DownloadAccordion (collapsed) | share [40,810,1360,93]; accordion [40,903,1360,40] | – | **(c) N6** |
| 3 | Spacer 100 | [40,943,1360,100] | – | (a) `Spacer` |
| 4 | Article content (rich text + quote blocks) | [40,1043,1360,4039] | text ink | **(c) N7** (+ Quote block = **(b)** `CaseStudy.jsx` part B, see §4.2) |
| 5 | Categories ("**Category**" + tags) | [245,5142,950,49] (`max-950 mt60 mb60`) | – | **(c) N8** |
| 6 | MoreNews ("**More News**" + "**Load more**" link → `/news`, 3 cards) | [40,5251,1360,…] | – | **(c) N9** (cards = N3 news card) |

Per-page data (hero image = previewImage, all local):
| Slug | Title (h1) | Categories | Hero image | Rich-text structure |
|---|---|---|---|---|
| `why-ai-demands-a-redesign-of-assessment` | Why AI demands a redesign of assessment—not just a policy response | AI, Leadership | `1778213101-surface-xarmm8ffapo-unsplash-2.jpg` (1500x1000) | §5.1 |
| `why-ai-proofing-assessments-misses-the-point` | Why “AI-proofing” assessments misses the point—and what to design for instead | AI, Leadership | `1778212941-pexels-cottonbro-63337352.jpg` (1500x1000) | §5.2 |
| `the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it` | The degree has always been a signal. AI is changing how we verify it. | AI, Leadership | `1778213038-adobestock_354893802-jpg-2.jpg` (1500x792) | §5.3 |

More News (identical query on every article: `allDatoCmsNews(sort: position ASC, limit 3, slug ≠ current)`), i.e. the first 3 of Appendix A.1 excluding the current one; the 4th item used when one is excluded is "Group work is not the problem. Poor design is." (`1754191896-image-container.jpg`, **missing**).
Author/date are **not** shown on the article page (only on cards). The About block's title/content are empty for news (left column renders 0px wide), only the Share block shows.

### 2.3 `/case-studies/` — 3 sections + popup + footer
| # | Section | Rect @1440 / 1280 / 390 | Theme | Mapping |
|---|---|---|---|---|
| 1 | HeroImageBanner (white card on photo) | [0,0,1440,609] / [0,0,1280,609] / [0,0,390,422] | photo `1752370909-rectangle-3470759-1-1.jpg` (3110x1368, **missing**) | **(c) N10** variant "card" |
| 2 | CaseStudies listing (CategoryFilter + grid) | [0,569,1440,2763] / [0,569,1280,2643] / [0,382,390,4914] | sheet bg `#FFFFFF` (`bg-pure-white`), r32, mt-40, z2 | **(c) N2 + N3** (card variant "study") |
| 2b | Spacer 100 with bg `#FFFFFF` (not a sheet) | [0,3332,1440,100] | white | (a) `Spacer` with bg |
| 3 | CtaWithImage | [0,3392,1440,795] / [0,3271,1280,734] / [0,5356,390,650] | sheet `#FFC8AE` | **(b)** CaseStudy part C (§4.1) |
| – | CaseStudyPopup (fixed, off-canvas) | closed: container x=1440 | – | **(c) N11** |

Copy: hero h1 "**Case Studies**", p "**Learn how universities, educators, and students are using Cadmus to solve their biggest teaching and learning challenges.**". Filter label "**Topics**"; categories (5): Hybrid Learning, Student Success, Product, Academic Integrity, Exam Alternatives; "**Reset all**". Card button "**Read more**". Toggle "**Load more**" / "**Show less**" (lower-case l, differs from /news). CTA title as /news; buttons "Book a demo" → `/request-demo`, "Get a free trial" → `/contact`. Card data: Appendix A.2.

### 2.4 `/study/<slug>/` — Case study template (`/study/case-study-the-university-of-manchester/`)
Layout: `div.m-show.pt20` (20px only ≤768) then `div.mth.pt40.p20.m-p0.m-pt40` (margin-top 90 + padding-top 40) > article shell (N4).

| # | Section | Rect @1440 | 390 | Mapping |
|---|---|---|---|---|
| 0 | Article shell | outer [0,90,1440,8516] (mt 90, pt 40), shell [20,130,1400,8456] | outer [0,110,390,12444] | **(c) N4** |
| 1 | ArticleHero overline "**Case Study**" + caption paragraph | [40,150,1360,632]; card [80,330,650,372] | [20,170,350,591]; card [40,322,310,419] | **(c) N5** (with `content`) |
| 2 | About/Share + DownloadAccordion | [40,822,1360,93] + accordion 40 | [20,801,350,73] | **(c) N6** |
| 3 | Highlights | [40,995,1360,191] | – | **(c) N12** |
| 4 | Content (rich text + 4 coloured quotes) | [40,1186,1360,6606] | – | **(c) N7** + Quote **(b)** |
| 5 | Categories (`max-1400 p20 mt20 mb40`, i.e. wider than news) | [40,7812,1360,89] | [20,10938,350,89] | **(c) N8** variant "wide" |
| 6 | MoreGuides "**Related Case Studies**" + "**Load more**" link → `/case-studies` | [40,7941,1360,…] header bar [60,7961,1320,33] | – | **(c) N9** (cards = N3 guide card, button "Read more", href `/study/<slug>`) |

Data: title (h1, uses `heroTitle || title`) "**The University of Manchester Transitions to Hybrid Learning and Assessment with Cadmus**"; caption "**The University of Manchester partnered with Cadmus to transition 65 academic units to hybrid assessment, improving equity, academic integrity, and student success.**"; categories: Product, Student Success; hero `1754525016-christin-hume-hcfwew744z4-unsplash-1-1.jpg` (2545x1696, local); highlights: **83%** "of students accessed feedback" · **96%** "of students utilised assessment resources" · **15.62%** "Average student Turnitin similarity score"; `fullCaseStudy: null` (download form still renders; thank-you text then reads "We'll get back to you shortly."). Related: Notre Dame (`1774844499-sydney-campus-2023-648x400.jpg`), Larissa/MYHC (`1776990049-myhc_368026.jpg`), Toi Ohomai (`1776743411-5f6d0e92b356479ea966a471_toi-ohomai-2.jpg`) — all **missing**. Body structure: §5.4.
The same template content renders inside the CaseStudyPopup (N11) on desktop /case-studies.

### 2.5 `/study/2026-Cadmus-ROI-study/` — 5 sections + footer
| # | Section | Rect @1440 / 1280 / 390 | Theme | Mapping |
|---|---|---|---|---|
| 1 | RoiHero (dark) | [0,0,1440,920] / [0,0,1280,820] / [0,0,390,1061] | bg `#123D69` (rgb 18,61,105), text `#B6DBFF` | **(c) N13a** (stat card = **(b)** `RoiCard.jsx` stat card, blue inner) |
| 2 | RoiWhySection | [0,880,1440,1105] / [0,780,1280,1047] / [0,1021,390,1733] | sheet cream `#FCF7EF`, r32, mt-40, z2 | **(c) N13b** |
| 3 | RoiQuoteBanner | [0,1985,1440,487] / [0,1827,1280,527] / [0,2754,390,589] | section cream (no radius/overlap), banner `#123D69` | **(b)** `CaseStudy.jsx` part B quote, navy variant (§4.2) |
| 4 | RoiVideoSection | [0,2472,1440,807] / [0,2354,1280,832] / [0,3344,390,1169] | cream, not a sheet | **(c) N13c** (click-to-play logic = `FeaturedVideo.jsx`) |
| 5 | RoiFormSection `#roi-form` | [0,3239,1440,612] / [0,3146,1280,612] / [0,4473,390,957] | sheet bg `#B6DBFF`, r32, mt-40 | **(c) N13d** |
| – | Footer | y 3811 / 3719 / 5390 | | (a) |

Copy (exact): hero h1 "**Cadmus Return on Investment Report**"; overline "**independent analysis by Nous Group**" (rendered uppercase); content p1 "**What is the return on investment of modern assessment?**" + p2 (27 words, body copy — placeholder OK); button "**Get the ROI report**" → `#roi-form` (lenis scroll, offset -85); stat "**7.1**" / "**average return on investment**". Why: h2 "**Why ROI in Assessment Matters Now**"; content structure p(22w) · ul 4 items (7/15/15/12 words, each `<li><p>`) · p strong (29w) · p strong (37w) · p (16w); stat "**7.1x**" / "average return on investment"; badges "**impacts retention**", "**impacts revenue**". Quote: "**“Our ROI findings highlight that Cadmus is more than an assessment platform; it is a strategic investment that improves student outcomes.”**" — **Zac Ashkanasy**, "**Nous Group | Principal, Global Head of Higher Education**". Video: h2 "**Watch the ROI briefing with Nous Group**"; content p(11w) · ul 4 items (9 words each) · p(25w); buttons "**Watch the webinar**" (plays video), "**Download the report**" → `#roi-form`. Form: h2 "**Get your copy of the independent ROI report**"; description (34 words); fields "Name*", "University*", "Email*", checkbox "I agree to receive communication from Cadmus. You can unsubscribe at any time.*", submit "**Download report**"; thank-you "**Thank you!**" / "**Your download will begin shortly.**" (PDF opens in new tab 4.5 s after submit).
SEO: title "ROI Report", description "Cadmus Return on Investment Report — independent analysis by Nous Group showing 7.1x average ROI across Australian and UK universities."
Assets (all **missing**): hero `1771385426-screenshot-2026-02-18-at-1-30-17-pm.png` (1558x1080), why photo `1771204444-roi-why-section-photo.jpeg` (2704x3862), video thumb `1771385356-vimeo-cover-image-3.png` (1728x972), `https://cadmus.io/images/roi-quote-pattern.svg`, PDF `1771209273-cadmus-roi-nous-final-report-february-2026.pdf`. Video: `https://vimeo.com/1165567465?share=copy&fl=sv&fe=ci` → embed `https://player.vimeo.com/video/1165567465` (+`?autoplay=1` on play).

### 2.6 `/teacher-guides/` — 3 sections + footer
| # | Section | Rect @1440 / 1280 / 390 | Theme | Mapping |
|---|---|---|---|---|
| 1 | HeroImageBanner (card) | [0,0,1440,634] / [0,0,1280,634] / [0,0,390,441] | photo `1754566198-getty-images-8pqd7fjhu5o-unsplash.jpg` (2736x1824, **missing**) | **(c) N10** "card" |
| 2 | TeachingGuides grid (no filter) | [0,594,1440,2048] / [0,594,1280,1888] / [0,401,390,3254] | sheet `#FFFFFF` | **(c) N3** (card variant "guide") |
| 2b | Spacer 100 bg `#FFFFFF` | [0,2642,1440,100] | white | (a) |
| 3 | CtaWithImage | [0,2702,1440,795] / [0,2542,1280,734] / [0,3715,390,650] | `#FFC8AE` | **(b)** §4.1 (buttons "Book a demo" → `/request-demo`, "Get a free trial" → `/`) |

Copy: h1 "**Teaching guides**", p "**We’re here to help you elevate your teaching, so you can support your students’ learning. Check out our guides and resources for every stage of the assessment process.**". Card button "**Learn more**". Toggle "**Load more**" / "**Show less**". Data: Appendix A.3 (13 guides: 4 + 3 + 6 in accordion).

### 2.7 `/video-tutorials/` — 4 sections + footer
| # | Section | Rect @1440 / 1280 / 390 | Theme | Mapping |
|---|---|---|---|---|
| 1 | HeroImageBanner `alt` (no card, orange text on maroon, decorative SVG) | [0,0,1440,549] / [0,0,1280,549] / [0,0,390,382] | bg `#580C1D`, text `#FFC8AE`; `::after` art `videos-6577752a…svg` | **(c) N10** variant "alt" |
| 2 | GuideTypes (2 columns w/ divider) | [0,509,1440,567] / [0,509,1280,567] / [0,342,390,1114] | sheet `#FFFDFA` (`bg-light-grey`) | **(c) N14** |
| 2b | Spacer 100 bg `#FFFDFA` | [0,1075,1440,100] | | (a) |
| 3 | VideoTutorials `#teacher-videos` | [0,1135,1440,1234] / [0,1135,1280,1158] / [0,1515,390,1758] | sheet `#FCF7EF` | **(c) N3** (card variant "video") with section header (= `SolutionCards.jsx` header pattern, see N3) |
| 3b | Spacer 100 bg `#FCF7EF` | [0,2370,1440,100] | | (a) |
| 4 | VideoTutorials `#student-videos` | [0,2430,1440,1130] / [0,2353,1280,1054] / [0,3334,390,1677] | sheet `#FFFFFF` | **(c) N3** "video" |
| 4b | Spacer 100 bg `#FFFFFF` | [0,3560,1440,100] | | (a) |

Copy: h1 "**Video tutorials**", p "**Learn the ropes with these easy to follow video courses. You’ll be working on your assignment in no time.**". GuideTypes col 1: label "**For Educators**" (bg `#FFE7DB`), h3 "**Getting started with Cadmus as an educator**", p "**Get the most out of Cadmus with step-by-step videos designed to support your teaching. Learn how to set up assessments, guide your students, and access insights along the way.**", list title "**What you’ll learn:**" (orange rule), items "How to create and manage assessments in your LMS" / "How to guide students with prompts and resources" / "How to monitor progress and access marking tools", button "**Watch Teacher Tutorials**" → scroll `#teacher-videos`. Col 2: label "**For Students**" (bg `#B6DBFF`), h3 "**Using Cadmus for the first time? Start here.**", p "**Whether you’re working on an assignment or sitting an online exam, these short videos will help you feel prepared and in control. Learn how to get started, use the tools, and submit with confidence.**", "What you’ll learn:" (blue rule), items "How to access your assessments through your LMS" / "How to write and format your work in Cadmus" / "How to submit your work on time", button "**Watch Student Tutorials**" → `#student-videos`. Section 3: h4 "**Teacher videos**", p "**We show you an overview of the Cadmus Teacher and Student Environments. Understand the entire assessment process from creating an assignment and completing work, right through to providing grades and feedback.**". Section 4: h4 "**Student videos**", p "**Take a look at what it's like to complete a Cadmus Assignment. We take you through accessing, writing and submitting your assignment.**". Toggle "**Load More**" / "**Show Less**" (teacher section only; student section has 5 videos = 2 + 3, no toggle). Data: Appendix A.4.

### 2.8 `/guides/<slug>/` — Teaching guide template (child of /teacher-guides; measured `what-is-best-practice-assessment`)
Same as news article (§2.2) with these differences: overline "**Teaching guides**"; instead of About+DownloadAccordion it renders `ShareBar` = `div.flex.mt40.pt20.m-hide` > `div.max-1400.ma.w-100.text-right` > Share block ([40,810,1360,73] @1440; **hidden ≤768**), then `div.mt40` (no Spacer); content uses Note blocks (N7) and inline images; Categories as news (max-950); "More" block = MoreGuides (N9) with header "**Related Case Studies**" (source bug: label is hard-coded) and "Load more" → `/teacher-guides`, cards = guide card variant with button text "**Read more**" → `/guides/<slug>`. Measured page height 11559 @1440, 13608 @390. Hero `1754564667-brooke-cagle-lccfi_26dia-unsplash.jpg` (2736x1824, missing); 7 inline content images from `images.ctfassets.net` (missing, see §7); categories Student Success, Hybrid Learning. Mapping: same as §2.2.

### 2.9 `/information/privacy-policy-au/` — 2 sections + footer
| # | Section | Rect @1440 / 1280 / 390 | Theme | Mapping |
|---|---|---|---|---|
| 1 | SmallHeroBanner | [0,0,1440,368] / [0,0,1280,368] / [0,0,390,322] | bg `#580C1D`, text `#FFC8AE` | **(c) N15** |
| 2 | Policy body (8 titled sections) | [0,328,1440,4037] / same / [0,282,390,5576] | bg `#FCF7EF`, r32 top, mt-40, p40 (20). **No position/z-index** (paints over hero by DOM order) | **(c) N16** |

h1 "**Privacy Policy (AU)**". Section titles (exact, in order): Purpose · What we collect, and why we collect it · Who we share your information with · Information security · Access and correction · Complaints · Compliance and co-operation with regulatory authorities · Changes. Body structure §5.5. No images.

### 2.10 `/video/<slug>/` — Video template (child of /video-tutorials; measured `intro-into-cadmus`)
`Spacer.m-spacer` (100; 60 ≤768) > `div.p20.m-p0.m-pt40` > white shell (N4) > VideoEmbed + VideoContent + `Spacer.m-hide`. **(c) N17**. Height 1608 @1440, 2303 @390. Data per page: title, tagline, Vimeo URL, duration, category title, related videos (same category), resources (empty for intro). Example: "**Intro into Cadmus**" / "See what it's like to use Cadmus for an assignment, as we explore the functionality of the Cadmus Teacher and Student Environments." / `https://player.vimeo.com/video/364235073` / category "**Introduction**" with related: Intro into Cadmus 3:50 · Accessing Cadmus (Canvas) 1:49 · Accessing Cadmus (Blackboard) 1.57 · Accessing Cadmus (D2L) 1:29 · Accessing Cadmus (Moodle) 1:37. Section label "**More Resources And Docs**".

---

## 3. New section types (full measurements)

Shared CSS tokens new to these routes:
| Token | Value |
|---|---|
| navy (ROI) | `#123D69` rgb(18,61,105) |
| ROI pale blue (stat inner, badge inner) | `#E0F0FF` |
| blue | `#B6DBFF` (also ROI text on navy, form section bg) |
| badge icon border | `#5A9CE0` |
| tag border | `rgba(22,19,19,0.2)` |
| ul-link underline | `rgba(22,19,19,0.8)` |
| share-icon bg | `#ECE6DF` rgb(236,230,223) |
| form input border | `#D0D5DD` (ROI form: `#CFC0B0`), placeholder `#667085`, input shadow `rgba(16,24,40,.05) 0 1px 2px`, focus ring `rgba(4,25,31,.08) 0 0 0 4px` + border `#04191F` |
| popup backdrop | `rgba(0,0,0,0.4)` + `backdrop-filter: blur(4px)` |
| note colours | blue `#E8E8FF`/icon bg `#C5C5FF`/icon `#262258`; pink `#FFE8FB`/`#FFC3F0`/`#C95699`; orange `#FFF0E8`/`#FFD7C3`/`#580C1D`; green `#FAFFE8`/`#E7F7A3`/`#455017` |
| `.h3` | AT Realm Book 44px / 1.1 (48.4) ; ≤990 38px; `.m-30` ≤768 → 30px (33px lh) |
| `.h0` | AT Realm Book 90px / 1 , ls -0.025em (-2.25px); ≤980 42px (ls -1.05) |
| `.h2`/`h2` element default | AT Realm Book 58px / 1.1 (≤990 42) — overridden inside rich text |
| `.f-20` | 20px, lh 1.4 (28px) |
| `.tag` | Inter 11px / 1.3 (14.3), 500, uppercase, ls .02em (0.22px), padding 5px 12px, border 1px solid rgba(22,19,19,.2), r 4, colour `#04191F`, `transition: .3s`, height 26.3; `.tag.active` bg `#FFC8AE`. No hover style (verified). |

### N1. NewsBanner (`/news` hero)
- `div.bg-maroon.p40.m-p20.pth`: padding `90px 40px 40px` (≤768 `20px`). 1440 height 770 (fixed by content: spacer 100 + row + spacer 100 with row margin auto = 175px each side inside a 640px cell).
- Inner `max-1400 ma news-banner-grid`: `display:grid; position:relative`, children all `grid-area:1/1` (stacked). @1440 [40,90,1360,640]; @1280 [40,90,1200,640]; @390 [20,120,350,350] (a 100px `.spacer.m-show` precedes it on mobile).
- Layer A (`pos-rel z-2 orange flex flex-col overflow h-100`, colour `#FFC8AE`): Spacer 100 · row (`flex; align-items:center; justify-content:space-between; margin:auto 0`) · Spacer 100.
  - Row @1440: "Latest News" `p.text-heading` [40,404,105,13] · title `p.h0.text-center` [299,365,872,90] · "Est. 2025" [1325,404,75,13]. 
  - ≤768 (`m-col m-gap-20`): column, centred, gap 20: caption [157,220,105,13], h0 42/42 [20,253,378,84] (2 lines), caption [172,357,75,13]. (Measured: the grid track becomes 378px because of the h0 min-content, overflowing 350 by 28px — replicate or clamp; visually it is centred.)
- Layer B `div.news--background`: `background: url(news-28b75d4a…svg) center/contain no-repeat; aspect-ratio: 9/5; max-width:900px; width:100%; margin: 60px auto 80px; opacity:.5` → @1440 [270,150,900,500]; @390 `max-width:100%` → [20,180,378,210].
- No motion.

### N2. CategoryFilter (news + case studies)
- Header row `div.space-between.py6.align-center.mt40.bb1.mb20.gap-20.max-1600.ma.flex`: `padding:6px 0; margin:40px auto 20px (≤768 mt 20); border-bottom:1px dashed #CFC0B0; max-width:1600`. @1440 [40,810,1360,26]; @390 [20,490,350,41]. Left `p.text-heading` "Topics" (13px/13, ls 1.3px, uppercase). Right (≤768 only, `.m-show`): `button.accordion--arrow` 28x28, `background: url(<accordion-arrow svg>) center/contain no-repeat; transition:.5s; hover opacity .5` (icon manifest). The arrow does **not** rotate.
- Body `div.m-accordion.max-1600.ma` > `div.inner.flex.align-start.space-between` (≤768 `flex-direction:column; gap:20px`):
  - Tag group `flex flex-wrap gap-8` (≤768 column, align-start). 12 news tags @1440 occupy [40,856,1304,61] (2 rows); 5 study tags [40,695,675,26].
  - `button.ul-link` "Reset all": `width:60px; white-space:nowrap`, 14px; underline built from `::before` (full width, shrinks right→0 on hover) and `::after` (grows 0→100% from left, `transition: width .3s` + `.1s` delay); 1px `rgba(22,19,19,.8)`, bottom 0. @1440 at x 1344 (news) / 1340 (studies).
  - ≤768 the body is an accordion: `display:grid; grid-template-rows:0fr → 1fr (.active); transition: grid-template-rows .3s; .inner{overflow:hidden}`; closed by default (height 0), toggled by the arrow button.
- Behaviour (from source + verified): state `selected: id[]`; clicking a tag toggles its id; filtered list = all items if none selected, else items whose categories intersect the selection (**OR**). Verified: AI → 13 news; AI + Leadership → 22. "Reset all" clears. Filtering re-slices into 4/3/rest (N3). URL unchanged. The Load-more accordion open state is preserved across filter changes.

### N3. Listing card grid (news / study / guide / video) + Load more
Container: section sheet `p40 (20) pos-rel z-2 mtn40 br-t-32` + bg (news cream `#FCF7EF`, studies/guides white `#FFFFFF`, videos cream/white). Inner `max-1600 ma` with top spacing: news `mt60`; studies `mt40 pt20` (≤768 `mt0`, keeps pt20); guides `mt40`; videos: preceded by header block.
Slicing: items `[0..4)` → **grid-2**, `[4..7)` → **grid-3**, `[7..]` → grid-3 inside collapsed accordion. Videos: `[0..2)` grid-2, `[2..5)` grid-3, `[5..]` accordion.
| Grid | Columns / gaps | Col width 1440 / 1280 / 390 |
|---|---|---|
| `grid-2 row-gap-60 mb60` | 2 cols, gap `60px 20px`, mb 60; ≤990 1 col (row gap 60) | 670 / 590 / 350 |
| `grid-3 row-gap-60 mb60` (news, videos; accordion grids everywhere) | 3 cols, gap `60px 40px`; ≤768 1 col, gap `60px` (news/studies/guides accordion), `40px` with `.m-gap-40` (videos) | 426.66 / 373.33 / 350 |
| `grid-3 mb60` (studies, guides — no row-gap class) | gap `80px 40px`; ≤768 1 col gap 40 | 426.66 / 373.33 / 350 |
Videos: grid-2 also `.m-mb40.m-gap-40` (≤768 gap 40, mb 40).

Load more: `div.accordion--wrapper` (`display:grid; grid-template-rows:0fr → 1fr .active; transition: grid-template-rows .3s` + `.inner{overflow:hidden}`), then `div.flex.justify-center.mt60` (videos `mt40 m-m0`) > button:
- news/studies/guides: `button.arrow-button.down` (outline button, §0.7) with `::after` = down-arrow SVG `width:16px; aspect-ratio:1/1`; `.active::after{transform: rotate(180deg)}` (no transition declared → instant). Size 139x41.6 @1440 (36.6 tall ≤768). @1440 news button [650,3493]; studies 1280 [571,3130].
- videos: plain `button.arrow-button` (right arrow), "Load More"/"Show Less", 153x36.6 @390.
- Behaviour: toggles open/close; label switches. Open heights measured: news 15,647px (69 items) @1440; studies 6,540px (29 items); videos 2,454px (19).
- After the news grid wrapper: `Spacer` 100 (inside the RemainingArticles fragment, news only).

Card variants (all `display:flex; flex-direction:column; align-items:flex-start`; no card bg/shadow):
| Variant | Element | Image box | Below image |
|---|---|---|---|
| **news** (`/news`, MoreNews) | `<a href="/news/<slug>">` | `ratio-4-3 image--zoom pos-rel bg-grey overflow br-8 mb20` (4:3, r8, bg `rgba(0,0,0,.1)`, mb 20) — 670x502.5 / 426.7x320 @1440; 590x442.5 / 373x280 @1280; 350x262.5 @390 | tags row `flex flex-wrap gap-8 mb20` (p.tag each); `h3.h6.mb20` title (22/27.5); `p.mb20` excerpt (14/19.6); `div.flex.flex-col.mta` (pushes to bottom) > `p.py6` author (padding 6 0) + `p.op-50` date (opacity .5). Card heights 813 (grid-2), 697 (grid-3) @1440. |
| **study** (`/case-studies`) | `<button>` ≥981px (opens popup N11) / `<a href="/study/<slug>">` ≤980 | wrapper `w-100 mb20` > same 4:3 box (no mb) | `flex flex-col gap-10`: tags `flex gap-8 mb20` (no wrap); `p.h6` title; `p` caption; `button.arrow-button.mt20.transparent` "Read more" (111x19.6, arrow `translateX(10px)` on hover). Card 782 tall @1440 grid-2. `text-align:left`. |
| **guide** (`/teacher-guides`, Related on study/guide pages) | `<a href="/guides/<slug>">` (or `/study/<slug>` in study Related) | wrapper `w-100 mb40` > 4:3 box | `p.h6` title; `button.arrow-button.mt20.transparent` "Learn more" (Related: "Read more"). Card 609.6 @1440 grid-2, 427 grid-3. |
| **video** | `<a href="/video/<slug>">` | `ratio-7-4 pos-rel overflow br-8 mb20` (7:4, r8, **no** grey bg, no zoom) — 670x382.8 / 426.7x243.8 @1440; 350x200 @390 | `h3.h6` title only. Card 430 / 291 @1440. |
Images: Gatsby `bg-image` absolutely filling the box, `object-fit:cover`. Hover (news/study/guide): `.image--zoom:hover .bg-image { transform: scale(1.015) }`, `transition: transform .65s` (ease). Video cards: no hover. No other hover on cards.
Video section header (`div.mb80.m-mb40.mt20`): `p.h4.text-center` (38/43.7; 26 ≤990) + `p.text-lg.ma.max-750.text-center.mb20.mt20` (16/22.4, max 750, margin 20 auto). Same pattern as `SolutionCards.jsx` header but with mb 80 and max-750. @1440 [40,1195,1360,131].

### N4. Article shell (news / study / guide / video detail)
- Top offset: news/guide `Spacer` 100; study `mth`(90) + `pt40`; video `Spacer.m-spacer` (100/60).
- `div.p20.m-p0` (study: `mth pt40 p20 m-p0 m-pt40`) > `div.bg-pure-white.br-12.pos-rel.z-2.p20`: white `#FFFFFF`, radius 12, padding 20, z-2. @1440 [20,120,1400,…]; @1280 [20,120,1240,…]; @390 [0,100,390,…] (shell p20 → content 350).
- Footer overlaps the shell wrapper's bottom 40px.

### N5. ArticleHero (inside shell)
- `div.pos-rel.p40.bg-grey.m-p20.br-8.overflow.flex.flex-col.mh-70vh`: padding 40 (20 ≤768), bg `rgba(0,0,0,.1)`, r8, overflow hidden, `min-height:70vh` → 630 @900h, 560 @800h, 591 @844h. Hero image absolutely fills (`bg-image`, cover).
- Children: `Spacer.mta` (100, margin-top auto) then `div.max-1400.w-100.mta.mla.mra.pos-rel.z-2.flex.flex-col.gap-20.mb40.mt40.m-m0.m-mt40` (margin 40 0; ≤768 `margin:40px 0 0`).
- Card `div.hero--card.max-650.mra.p40.m-p20.bg-pure-white.br-12.flex.align-start.flex-col.gap-20.mta`: white, r12, padding 40 (20), max-w 650, gap 20, **no shadow**. @1440 news [80,445,650,245]; study [80,330,650,372]; @390 [40,444,310,247].
  - Overline `p.text-sm-heading.marker` (Inter 14px, lh 1 (14px), ls .05em 0.7px, uppercase) > `span.pos-rel.z-2`. **Marker**: `::before` bg `#FFC8AE`, `height:50%; top:50%; transform:translateY(-50%); width:100%; opacity:.8; z-index:1` (a highlighter stripe behind the lower half of the word).
  - `h1.h4.m-30` (38/43.7, ls -0.057px; ≤990 26px; ≤768 30px/34.5).
  - Study only: `p.f-16.max-900.ma.mb20.mt20.m-mt0.m-14` caption (16/22.4; ≤768 14px, mt 0).
- Mapping note: the white card is visually the same as `ImageCard`'s `.floating-content-card` minus shadow/blur; Build may reuse its classes.

### N6. Share bar + DownloadAccordion (news & study; guide uses Share only)
- `div.introduction.m-col-reverse.p20.m-p0.mt40.max-1400.ma.flex.gap-20` (≤768 column-reverse, padding 0): left column (title/content/author — empty on all measured pages), right `div.mla.m-100` > Share.
- Share: `flex flex-col gap-10`: `p.text-heading.f-500` "**Share with colleagues**" (13px, 500, ls 1.3px, uppercase) + `div.flex.gap-10.justify-end.m-justify-start` of 4 `div.share-icon` (30x30, `aspect-ratio:1`, bg `#ECE6DF`, r2, icon `background-size:18px auto` centred): linkedin · facebook · twitter · download (`cursor:pointer`). **Icons are not links** (no href/handler) except download, which opens the accordion and lenis-scrolls to it (offset -85). @1440 block [1181,830,199,53]; @390 left-aligned [20,774].
- Guide variant (`ShareBar`): `div.flex.mt40.pt20.m-hide` > `max-1400 ma w-100 text-right` > Share (icons right-aligned [1250..1400,853]); hidden ≤768.
- DownloadAccordion `div.max-1400.ma.p20.m-p0.accordion` (grid rows 0fr→1fr, `.3s`); collapsed height = 40 (its p20). Content `div.mt20.br-12.bg-light-orange.p40.m-p20.gap-20.flex.flex-col.contact-form-container` (bg `#FFE7DB`, r12, 1320x718 @1440):
  - close `button.contact-form-close` 24x24 (svg, hover opacity .7), right-aligned.
  - `grid-2 gap-20` (610/610): left `p.h4.balance.m-30.max-400` "**Download the full Case Study**" + `p.f-16.m-16.max-400` "**Take an in-depth look at how educators have used Cadmus to better deliver assessments.**"; right `form.contact-form` (gap 40): fields (gap 10) Name*, Role*, University*, Email*, Assessment challenge* (textarea, placeholder "Type here...", min-height 120), consent checkbox (18x18, r3, border `#CFC0B0`, checked bg ink + white tick), `button.button` "**Submit**".
  - Inputs: `padding:10px 14px; font:16px/24px Inter; border:1px solid #D0D5DD; r8; bg #FFF; shadow rgba(16,24,40,.05) 0 1px 2px; transition .3s`; labels `f-14 f-500`; wrapper `flex-col gap-8`.
  - Thank-you overlay: absolute, full size, `opacity 0 → 1`, `visibility`, `transition .3s`, z10, inner bg `#FFE7DB` r8: `p.h4` "Thank you!" + `p.f-18.max-400` "Your download will begin shortly." / "We'll get back to you shortly." (no file).
  - Submit = Netlify form POST `/` (form-name `case-study-download`) — out of scope for a static clone; keep markup.

### N7. Article rich text (`Content`) + Note + Quote blocks
- Wrapper `div.max-1400.ma.p20.m-p0.flex.flex-col.gap-20` (@1440 [40,1043,1360,…]).
- **Reading column** `div.max-950.ma.flex.flex-col.gap-20.article--content`: **max-width 950px**, centred (@1440 x 245–1195; @1280 x 165–1115; @390 full 350), `display:flex; flex-direction:column; gap:20px`, Inter **16px / 22.4px** (≤768 **14px / 19.6px**), colour `#04191F`. Paragraph spacing = the 20px flex gap (p has no margins).
| Element | Style (desktop → ≤768) |
|---|---|
| `p` | 16/22.4 → 14/19.6 |
| `h2` | **AT Realm Book** 20px / 1.3 (26px), ls 0.5%, weight 400, `margin-top:20px` (+20 gap = 40 above) → 18px / 23.4 |
| `h3` | **no rule**: Inter 16/22.4 (inherits), weight 400, no margin; CMS wraps in `<strong>` (→ 500) |
| `h4` | Inter 20px/26px, ls 0.5%, `margin-top:20px` → 18/23.4 |
| `ul`, `ol` | `display:flex; flex-direction:column; gap:10px; margin-left:30px`; `li` `list-style: disc outside` (global `ul` rule gives gap 15 + ml 20, overridden here); marker ink |
| `strong`, `b`, `em` | weight **500** (em also italic default) |
| `a` | inherit colour, `text-decoration: underline; text-underline-offset: 3px; transition: opacity .5s`; hover (hover-capable devices) opacity .5 |
| `img` (guides) | `max-width:100%` natural ratio (950x551 measured) |
| `blockquote` | not used on measured pages (UNVERIFIED) |
- **Note** (`DatoCmsNote`): `div.max-950.f-16.ma.my20.br-12.p30.m-p20.flex.flex-col.gap-20.note--wrapper.<colour>`: max 950, margin 20 auto, r12, padding 30 (20), gap 20, 16/22.4, bg by colour (tokens above). Pin icon SVG 34x34 (`rect rx 4.44` fill = icon-bg, path fill = icon colour; path in source `articleContent.js`, copied in the icon manifest). Then `<p>` text. @1440 [245,2014,950,159].
- **Quote** (`DatoCmsQuote`): see §4.2 (b).

### N8. Categories row
- News/guide: `div.max-950.mt60.mb60.ma.flex.flex-col.gap-10` (@1440 [245,5142,950,49]). Study: `div.max-1400.p20.mt20.mb40.ma…` ([40,7812,1360,89]).
- `p.text-heading` "**Category**" + `div.flex.gap-8` of `p.tag` (same tag style, not interactive; `cursor:pointer` from `.tag`).

### N9. MoreNews / MoreGuides ("More" row)
- `div.p20.mb40.m-p0` > `div.max-1600.w-100.ma.flex.flex-col.gap-40`.
- Header `div.py6.bb1.flex.space-between.align-center` (padding 6 0, dashed `#CFC0B0` bottom; @1440 [60,7961,1320,33]): `p.text-heading` ("**More News**" / "**Related Case Studies**") + `a.arrow-button.transparent` "**Load more**" (111x20; → `/news`, `/case-studies` or `/teacher-guides`).
- `div.grid-3` (gap 80/40; ≤768 1 col gap 40) of 3 cards: news variant (MoreNews) / guide variant (MoreGuides, button "Read more"). @1440 cols 413 (inside shell), image 413x310.

### N10. HeroImageBanner (listing heroes)
- `div.pos-rel.p40.m-p20.flex.flex-col.pth` (+ `bg-maroon video--background` for videos): padding `90px 40px 40px` (≤768 20). Children: `Spacer.mt40` (100 + mt40), `div.max-1600.w-100.ma.pos-rel.z-2.flex.flex-col.gap-20`, `Spacer.m-spacer` (100/60), image `bg-image` (absolute cover, full section).
- **card** variant (case-studies, teacher-guides): `div.hero--card.bg-pure-white.p40.m-p20.br-12.max-650.mra.m-mt40.m-gap-10.flex.flex-col.gap-20.mta`: white, r12, padding 40 (20), max 650, gap 20 (≤768 gap 10, mt 40), left-aligned. @1440 [40,230,650,239] (studies) / 264 (guides); @390 [20,200,350,142]/161.
  - `h1.h3.m-30.m-mt0`: 44/48.4 (≤990 38; ≤768 **30/33**).
  - `p.f-18.max-900.ma.m-14.m-m0.mb20.mt20`: 18/25.2, margin 20 0 (≤768 14px/19.6, margin 0).
  - Section heights: 609 (studies) / 634 (guides) @1440 & 1280; 422 / 441 @390.
- **alt** variant (video-tutorials): no card bg/padding, card text `#FFC8AE`; p gets `balance mb60` (margin `0 0 60px`). Section bg `#580C1D`; `::after` decorative art `url(videos-6577…svg) center/cover no-repeat; position:absolute; right:0; bottom:0; width:75% (100% ≤990); height:100%; opacity:.5; z-0`. @1440 h1 [40,230,650,48], p [40,298,650,50]; section 549 tall; @390 382.
- No motion.

### N11. CaseStudyPopup (desktop /case-studies)
- Backdrop `div.popup-backdrop`: `position:fixed; inset 0 (top/left 0, 100%x100%); background: rgba(0,0,0,.4); backdrop-filter: blur(4px); opacity 0 → 1; visibility hidden → visible; transition: .65s (all, ease); z-998; cursor:pointer` (click closes).
- Container `div.popup-container`: `position:fixed; inset: 112px 20px 20px auto; width: calc(100% - 180px); z-999; transform: translateX(calc(100% + 20px)) → translateX(0) (.active); transition: transform .85s cubic-bezier(.4,0,.2,1); pointer-events none → auto`. Measured open @1440 [160,112,1260,768]; @1280 width 1100. ≤980: `inset: 85px 20px 20px; width: calc(100% - 40px)` (popup isn't used ≤980 since cards are links).
- `div.popup-content.br-12`: `height:100%; overflow-y:auto; scrollbar hidden`; inside: white shell (r12, p20) with the full study template (N5 hero 1220x655, N6, N12, N7, N8, N9). Scroll height 5562 for Notre Dame.
- Open: `body.style.overflow = hidden`, `data-lenis-prevent` on body, popup scrolled to top after 50 ms. Close: Escape key, backdrop click (no close button). Content: looked up from a static query of all 36 studies (no fetch). Related = first 3 studies ≠ current.

### N12. Highlights (study)
- `div.introduction.p20.m-p0.m-mb40.mt40.max-1400.w-100.ma.flex.flex-col.gap-20` (@1440 [40,995,1360,191]).
- Header `div.bb1.w-100.py6` > `p.text-heading.op-80` "**Highlights**" (opacity .8).
- `div.max-1400.w-100.ma.gap-20.mt20.grid.grid-3`: 3 cols gap 20, mt 20 (≤768 1 col). Each `flex flex-col text-center highlight`: `p.ma.h1` value (AT Realm Book **65px/71.5**; ≤990 42) + `p.ma.text-heading.marker` label (13px uppercase, ls 1.3px) with marker stripe colours by position: 1 `#FFC3F0`, 2 `#C5C5FF`, 3 `#B6DBFF` (opacity .8, 50% height).
- Static (no count-up). Similar intent to `ImpactCounter.jsx` but different type sizes/marker; treat as new.

### N13. ROI page sections
**N13a RoiHero** — `div.roi-hero.pos-rel.mh-100vha.p40.m-p20.flex.flex-col.pth`: bg `#123D69`, colour `#B6DBFF`, min-height 100svh (≤1600: calc(20px+100svh)) → 920 @1440x900, 820 @1280x800, 1061 @390 (content-driven), padding 90/40/40 (≤768 20).
- Inner `max-1600 m-mth w-100 m-wrap ma pos-rel z-2 flex align-center roi-hero__inner`: `gap:70px` (≤990 20), margin auto (vertically centred), ≤768 wraps, `margin-top:95px`. @1440 [40,261,1360,447].
- Left `w-50` (645 @1440, 565 @1280, 100% ≤768) > `max-600 ma flex flex-col gap-40`: `h1.h3` **48px/52px, ls -0.02em (-0.96px)** (stays 48 on mobile, 3 lines at 350); `p.text-sm-heading` **16px / 1.3, ls .025em (0.4px)** uppercase; `div.f-18.m-16.max-550.mb20.m-m0` (18/25.2, ≤768 16) two `<p>`; `button.roi-button.roi-button--light` "Get the ROI report" + arrow SVG 37x16 (`currentColor`): `inline-flex; gap 12; padding 9px 24px; border 1px solid #B6DBFF; bg #B6DBFF; colour #04191F; 16px/18px Inter; r4; transition opacity .2s; hover opacity .85` → 235x38.
- Right `w-50 pos-rel roi-hero__image-col` (≤768 `flex-col`, pb 40): image `roi-hero__image` r8, `box-shadow: rgba(0,0,0,.2) 0 4px 20px` (645x447 @1440; 565x392 @1280; 350x243 @390). Stat card `roi-hero__stat-card roi-hero__stat-pos`: **= RoiCard stat glass card** (`padding 12; bg rgba(246,243,238,.5); border .85px solid #FCFBF9; r12; shadow rgba(207,192,176,.12) 1px 8px 12px; backdrop-filter blur(1px)`), positioned `absolute; right:-20px; top:80px; z-3` → [1159,341,261,184] @1440; ≤768 `position:relative; order:-1; align-self:flex-end; right:20px; margin-bottom:-30px` → [89,627,261,162] (above the image, overlapping it by 30). Inner `roi-hero__stat-inner`: **bg `#E0F0FF`** (homepage variant uses `#FFE7DB`), r12, padding `12px 12px 24px`, ink, centred: number 64/72 ls -0.64 (≤768 40/50) "7.1", label 16/20.8 ls .8px uppercase max 211, mt 8.
**N13b RoiWhySection** — `section.roi-why-section.bg-white.br-t-32.mtn40.pos-rel.z-2.p40.m-p20` + `max-1400 ma mt40` + Spacer 100 at end.
- `flex m-wrap roi-why__inner m-gap-20 align-center`: gap **100** (≤990 20). Left `w-50` (630 @1440) > `max-550 flex-col gap-40`: `h2.h4` **40px/46px, ls -0.015em (-0.6px)** (no mobile reduction measured: 40px @390); `div.f-18.m-16.flex-col.gap-20.with-bold` (18/25.2; ≤768 16): p, `ul` (`gap:12px; margin-left:20px`, li `<p>`), `strong` 700.
- Right `w-50 roi-why__image-wrapper` (relative; ≤990 mb 60): `roi-glass-card roi-why__image-card` (`padding 16; bg rgba(246,243,238,.5); border 1.656px solid #FCFBF9; r16; shadow rgba(207,192,176,.12) 2px 16px 23px; backdrop-filter blur(2px)`) containing photo (img r10) → card [770,960,630,885] @1440, [690,888,550,771] @1280, [20,2089,350,485] @390.
- Badges layer `roi-why__badges` (absolute inset 0, z-3, pointer-events none):
  - retention `left:-70px; top:55%` (≤990 left 0, top 48%) → [700,1447,277,84] @1440.
  - revenue `right:-70px; top:20%` (≤990 right 0, top 16%) → [1212,1137,258,84].
  - stat `bottom:-60px; left:30%` (≤990 bottom -50, left 50%, translateX(-50%)) → [959,1722,261,184] @1440; [108,2442,175,182] @390 (label wraps 3 lines).
  - Badge = glass card (as above, 16 padding) > `roi-why__badge-inner`: `inline-flex; align-items:center; gap 14; padding 10; bg #E0F0FF; colour #123D69; r5; shadow rgba(22,19,19,.3) 0 0 .28px, rgba(22,19,19,.15) 0 .56px 1.69px` > icon box 30x30 (`bg #B6DBFF; border .76px solid #5A9CE0; r2`, inline SVG 14x16 / 18x18 fill `#123D69`, paths in source `roiReport.js`) + text 16px/1.3 ls .05em uppercase.
**N13c RoiVideoSection** — `section.roi-video-section.bg-white.p40.m-p20.pos-rel.z-2` (cream, no radius) > `max-1400 ma mt40 mb40` > `flex m-wrap roi-video__inner m-gap-40 align-center` (gap 100; ≤990 40) + Spacer 100.
- Left `w-50`: `roi-video__thumbnail` (r8, overflow hidden, relative, pointer) thumbnail 630x354 @1440 (550x309 @1280; 350x197 @390) + play button: `absolute; centre (translate -50%,-50%); 84x84 (56 ≤768); r50%; bg rgba(255,255,255,.9); shadow rgba(0,0,0,.15) 0 4px 16px; z2; transition transform .3s`; triangle `::after` border `14px 0 14px 24px` navy (≤768 10/0/10/17), ml 4. Hover on thumbnail → play button `scale(1.05)`. Click / "Watch the webinar" → thumbnail replaced by `<iframe class="w-100 ratio-16-9">` with `?autoplay=1` (same pattern as `FeaturedVideo.jsx`).
- Right `w-50` > `flex-col gap-40`: `h2.h4` 40/46 ls -0.6; `div.f-18.m-16.flex-col.gap-20` (p, ul gap 15 ml 20, p); buttons row `flex gap-20 m-wrap`: `roi-button--dark` (bg ink, text `#FFFDFA`, hover opacity .85; 190x38) and `roi-button--outline` (transparent, border/text ink, + dark arrow SVG; hover bg ink / text cream, `transition: background-color .2s, color .2s`; 252x38).
**N13d RoiFormSection** — `section#roi-form.roi-form-section.br-t-32.mtn40.pos-rel.z-2.p40.m-p20`: bg `#B6DBFF`; `max-1200 ma mt40 mb40` ([120,3319,1200,352] @1440; [40,3226,1200] @1280) + Spacer 100.
- `flex m-wrap roi-form__inner m-gap-40 align-start` gap 100 (≤990 40). Left `w-40` (380) > `flex-col gap-40`: `h2.h3.balance` **48/52 ls -0.96** + `p.f-18.m-16`. Right `w-60 flex-grow pos-rel` (720): form (as N6; fields Name*, University*, Email*, consent; input border `#CFC0B0`; inputs 720x46; field wrappers 73.6 tall, gap 10) + `button.button` "Download report" (152x41.6; hover transparent/ink). Thank-you overlay r8, bg `#B6DBFF`.

### N14. GuideTypes (video-tutorials)
- `div.bg-light-grey.p40.pos-rel.z-2.m-p20.mtn40.br-t-32` (bg `#FFFDFA`) then a separate `Spacer.bg-light-grey` (100).
- `div.grid-2.gap-60.max-1400.ma.mt40.with-divider`: 2 cols (650/650 @1440), gap 60, mt 40; ≤990 1 col. Divider `::after`: 1px `#CFC0B0`, `height:80%`, centred (`left:50%; top:50%; translateY(-50%)`), hidden ≤991.
- Column > `max-550 ma w-100 flex flex-col align-start gap-20` (@1440 [90,589,550,447]):
  - `p.label` chip (Inter 13px/0.7 = 9.1px tall, 500, ls .05em, uppercase, padding 0 10, bg `#FFE7DB`; 2nd column `.blue` `#B6DBFF`).
  - `h3.h5.balance.max-450` (30/37.5; ≤990 24/30).
  - `p.lh-15` 14px / 21px.
  - `div.w-100.mt20` > `p.text-xs-heading.w-100.pb10.bb1.solid.border-orange|border-blue` (13/18.2 ls .65 uppercase, pb 10, **solid** 1px bottom border `#FFC8AE` / `#B6DBFF`) + `ul.list.pt20` (global ul: `flex-col gap 15; margin-left 20`, pt 20; li disc).
  - `button.arrow-button.mt20.black`: bg ink, border ink, text `#FFFFFF`, arrow cream-filtered; hover → transparent bg, ink text, arrow unfiltered. 242x41.6 (36.6 ≤768). Click → `lenis.scrollTo('#teacher-videos' | '#student-videos', {offset:-85})`.

### N15. SmallHeroBanner (information pages)
- `div.bg-maroon.orange.flex.flex-col` (no padding): Spacer 100 · `div.p40.mt40.m-p20.max-1100.mla.mta.mra.flex.flex-col.gap-20.text-center.balance` (@1440 [498,140,444,128]; shrink-wraps the title) · Spacer 100. Height 368 (322 @390).
- `h1.h3` 44/48.4 (38/41.8 at ≤990 — measured 38px @390, no m-30 here).

### N16. Information body (privacy)
- `div.bg-white.br-t-32.mtn40.p40.m-p20` (cream, r32 top, mt -40; not positioned) > `div.max-800.mt20.mb20.ma.flex.flex-col.gap-40` (**reading column 800px**, @1440 x 320–1120) + Spacer 100.
- Each section `flex flex-col gap-20`: `p.f-20` title (Inter 20/28) + `div.privacy-content.text-lg.m-14` (`flex-col gap 20`; 16/22.4, ≤768 14/19.6): `ol/ul` `flex-col gap 10; margin-left 20px` (li disc); `strong/em/bold` 500; `a` underline offset 3, opacity .5 hover (.5s).

### N17. Video template
- VideoEmbed `div.grid-70-30.gap-20.mb40`: `grid-template-columns: .7fr .3fr; gap 20` (≤990 1 col) → 938 / 402 @1440. Left: `<iframe class="w-100 ratio-16-9 br-12 overflow">` 938x527.6 (350x197 @390), `allow="autoplay; fullscreen; picture-in-picture"`. Right (`m-hide`): `div.mta.w-100.flex.flex-col.gap-20` bottom-aligned: header row `flex gap-10` = `p.sm-heading` category (14/18.2 ls .28 uppercase) + rule `div.mta.w-100.h-1.bg-vellum` (1px `#CFC0B0`, aligned to bottom of the label); list `flex-col gap-10` of `a.link` rows: `flex align-center space-between gap-20` (`op-50` unless current) > [`div.video-play` (9.6px wide, aspect 4/5, SVG) + `p` title] + `div.mla > p` duration. Rows 19.6 tall.
- VideoContent `div.grid-70-30.mb60` (gap 40 → 924/396): left `flex-col gap-40`: `div.flex-col.gap-10.max-550` > `p.h5` title (30/37.5; 24/30 ≤990) + `p.f-16` tagline; mobile-only copy of the related list (`m-show`, links to `/video-tutorials/<slug>` — source bug); `div.flex-col.gap-20.w-100.max-1000` > `p.text-xs-heading.w-100.pb10.bb1.border-orange` "More Resources And Docs" (**dashed** orange bottom, since no `.solid`) + `div.grid-3.gap-20` of resource tiles (`br-12 p20 flex-col gap-40`, inline bg = CMS hex; `img.icon.small` 30px; `p.h7.balance` AT Realm Book 20px/1.25). Resources empty on the measured page.
- Then `Spacer.m-hide` (100, hidden ≤768).

---

## 4. Variants of existing components ((b) details)

### 4.1 `CaseStudy.jsx` part C → **CtaWithImage**
Used on `/news`, `/case-studies`, `/teacher-guides`. Same inner markup as homepage part C (h4 `max-650 mb20`; buttons `button` + `arrow-button`, both `target=_blank rel=noopener noreferrer`; image cell `p20` with the frame PNG) **but**:
| Prop / property | Homepage (part C) | CtaWithImage |
|---|---|---|
| wrapper | inside case-study section, `bg-cream`, `padding:0 40px 40px` | its own sheet: `p40 m-p20 bg-orange mtn40 br-t-32 pos-rel z-2` (bg `#FFC8AE`) |
| spacers | `Spacer.m-spacer` after (100/60) | `Spacer` (100) **before and after** grid (100 also on mobile) |
| grid max-width | 1200 | **1400** (`max-1400 ma grid-2 align-center gap-20`; ≤990 1 col) |
| title class | `p.h4 mb20 max-650` | same |
| buttons | Book a demo → `/request-demo`; Get a free trial → `/contact` | per page: `/news` & `/teacher-guides` second button → `/`; `/case-studies` → `/contact` |
Measured @1440: grid [40,3774,1360,515], left col 670 (title [40,3957,650,87]), buttons [40,4064,129,42] + [189,4064,176,42], image cell [730,3774,670,515] → image 630x475. @1280 section 734 tall, grid 454. @390 section 650, grid 410 (image below text, image cell 350 wide).
Props: `{ title, buttons:[{title,link}], image, bgClass='bg-orange', maxWidth=1400, spacers='both' }`.

### 4.2 `CaseStudy.jsx` part B quote card → **Quote block** (rich text) and **RoiQuoteBanner**
Shared structure: rounded card, padding 40 (20), inner `max-950 ma my40 flex flex-col align-start gap-40`, `p.h5` quote, `.quote-author` (`flex-col gap 5; border-left 2px; padding-left 10` + `pl6` = 6px in articles) with `p.text-heading.f-500` name and `p.f-16` role.
| Property | Homepage quote | Article Quote block (`quote--wrapper.<colour>`) | RoiQuoteBanner |
|---|---|---|---|
| outer | `quote--background` strip with cream lower half | none; block sits in the rich-text column wrapper | `section.p40.m-p20.bg-white.pos-rel.z-2` > `max-1400 ma` |
| card width | max 1200 | **max 1400**, full wrapper width (1320 @1440, 1160 @1280, 350 @390), `my40` | 1360 @1440 (max-1400) |
| background | `#FFC8AE` flat | `background: url(/static/quote-<colour>-….png) center/cover no-repeat` (orange/blue/pink/green PNGs); radius 12; overflow hidden | `#123D69` + `<img src="/images/roi-quote-pattern.svg">` absolutely covering (object-fit cover), r12 |
| text colour | `#580C1D` | orange: `#580C1D`; blue/pink/green: `#FFFDFA` (author border same colour) | `#FFFDFA` |
| padding | 40 (20) | 40 (20) | **80px 132px** (≤990 40; ≤768 20) |
| inner | max 950, my 40 | max 950, my 40 | **max 1000**, my 40 (≤768 my 20) |
| quote type | h5 30/37.5 | h5 30/37.5 (24/30 ≤990) | **32/40, ls -0.015em (-0.48px)** (`m-24` doesn't win; 32 @390) |
| author | border-left 2px, name 13px 500 ls 1.3 | same + role `op-80` (opacity .8); author block omitted when author empty (all 3 news articles) | no border; `::before` 1px `rgba(255,255,255,.5)` vertical line 40px tall, gap 8; name `p.text-sm-heading.f-500` (14px ls .7 500 uppercase); role `f-16` |
Measured article quote @1440: [60,1538,1320,272] (22-word quote, no author); study quotes 540 (65w + author), 390, 690 (126w). @390: 300–1228 tall.
Props: `{ quote, author, role, colour: 'orange'|'blue'|'pink'|'green'|'navy', width: 1200|1400 }`.

### 4.3 `RoiCard.jsx` stat glass card → ROI hero/why stat
Identical glass outer; inner bg `#E0F0FF` instead of `#FFE7DB`; positions per N13a/N13b. Number text "7.1" (hero) / "7.1x" (why). Props: `{ number, label, tone: 'orange'|'blue' }`.

### 4.4 `Chronicle.jsx` tile vs listing cards
The homepage Chronicle tile (`a > 4:3 image mb20 + h3.h6`) is the minimal form of the N3 news card. Build can extend Chronicle's tile into a `NewsCard` with optional `tags`, `excerpt`, `author`, `date`, `zoom` (adds `.image--zoom` hover) and reuse it for N3/N9. Chronicle itself has no hover; N3 cards do (image scale 1.015).

### 4.5 `Spacer.jsx`
Used as-is everywhere; needs an optional `className` for background (`bg-pure-white`, `bg-light-grey`, `bg-white`) on the listing pages.

### 4.6 `FeaturedVideo.jsx`
Click-to-play logic (thumbnail → iframe `?autoplay=1`) reused by N13c; layout differs (two-column, custom play button).

---

## 5. Rich-text structures (placeholder guidance; do not transcribe)
Notation: `p(N)` paragraph of ~N words; `h2(N)` heading; `ul(k: a/b/c)` list with k items of a/b/c words; `strong`/`em`/`a` = inline formatting present; `QUOTE[colour, Nw]` quote block (author shown only if non-empty).

### 5.1 why-ai-demands-a-redesign-of-assessment (https://cadmus.io/news/why-ai-demands-a-redesign-of-assessment/)
p(43) p(9) p(77) h2(6) p(17) p(55) · QUOTE[orange, 22w] · p(44) p(61) h2(11) p(38) p(72) p(53) · QUOTE[orange, 27w] · p(37) h2(12) p(55) p(85) p(18) p(29) p(39) p(46) p(46) h2(3) p(39) · QUOTE[orange, 28w] · p(77) p(36) h2(3) p(52) p(74) p(67) · QUOTE[orange, 31w] · p(1) p(39 strong)

### 5.2 why-ai-proofing-assessments-misses-the-point (https://cadmus.io/news/why-ai-proofing-assessments-misses-the-point/)
p(59) p(5) p(52) p(19) h2(7) p(8) p(50) p(93) p(45) p(empty) · QUOTE[green, 13w] · h2(4) p(21) p(30) p(8) p(86) · QUOTE[green, 39w] · p(21) h2(6) p(62) p(53) p(38) h2(5) p(49) p(7) h3(2) p(84) h3(2) p(78) h3(2) p(90) h3(2) p(72) h3(3) p(90) h2(3) p(36) p(59) p(48) p(53) · QUOTE[green, 16w] · p(51 strong)

### 5.3 the-degree-has-always-been-a-signal… (https://cadmus.io/news/the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it/)
Single content block, no quotes: p(11) p(52) p(15) p(23) h2(4) p(32) p(17) p(42) p(45) p(31) h2(6) p(9) p(21) p(68) p(86) p(66) p(9 strong) h2(5) p(31) p(9) p(63) p(60 a) p(61) p(23) p(40) p(57) p(27 strong) h2(2) p(41) p(10) p(54) p(22) p(21) p(1) p(42 em). (h2 contents are wrapped in `<span>`.)

### 5.4 case-study-the-university-of-manchester (https://cadmus.io/study/case-study-the-university-of-manchester/)
h3(6 strong) p(40) p(17) ul(3: 23/21/23) p(31) p(empty) · QUOTE[blue, 65w, author "Professor Gabrielle Finn", role "Vice Dean for Teaching, Learning and Students, The University of Manchester"] · h3(2 strong) p(35) h4(4) p(61) h4(4) p(86 em) h4(3) p(99) p(empty) · QUOTE[pink, 83w, same author/role] · h3(2 strong) p(16) p(35) h4(4) p(31) h4(6) p(48) h4(4) p(28) h4(2) p(37) h4(5) p(49) h4(3) p(43) h3(5 strong) p(28) h4(2 em) p(16) h4(3) p(28) h4(3) p(29) p(53) h4(7) p(17) p(53) p(empty) · QUOTE[orange, 43w, author "Student", role "The University of Manchester "] · h4(2) h4(3) p(37) p(33) p(empty) · QUOTE[green, 126w, author "Fiona Smyth", role "Deputy Dean and Vice Dean for Teaching, Learning and Students, Faculty of Humanities, The University of Manchester "] · h4(2) h4(5) p(35) p(22) p(24) ul(5: 9/15/15/9/21) p(empty)
(Exact h3/h4 headings visible in the measurement: "The University of Manchester’s Assessment Challenge", "Cadmus Solution", "Workload and Cost Efficiencies", "Greater Equity and Inclusion", "Enhanced Academic Integrity", "Cadmus Approach".) Empty `<p>`s render as 0-height flex items but still add a 20px gap.

### 5.5 privacy-policy-au (https://cadmus.io/information/privacy-policy-au/)
Purpose: p(58) p(24) · What we collect…: p(38) p(8 strong) p(36) ul(1: 40) p(47) ul(2: 22/19) p(8 strong) p(12) ul(5: 78/35/68/82/30) · Who we share…: p(25) p(6 strong) p(50 strong) p(36) p(28 strong) p(7 strong) p(67) p(34) p(52 strong) p(34 strong) ul(4: 11/10/10/22) · Information security: p(25) ul(3: 8/24/21) p(18) p(37) · Access and correction: p(45) p(50) p(16) · Complaints: p(36 a) p(35) · Compliance…: p(39) · Changes: p(53). List items begin with a `<strong>` lead-in ("Account and user information:" etc.).

### 5.6 Guide template example (what-is-best-practice-assessment)
Content blocks: content (1150 chars, p + a) · QUOTE[orange, no author] · content (h2, p with em + a, h3, h2…) · NOTE[blue] · content (6505 chars incl. 3 inline images) · NOTE[pink] · content (4526 chars incl. 3 images) · QUOTE[orange] · content (h3 + ul…). Not further transcribed.

---

## 6. Motion & interaction summary (these routes)
| Element | Trigger | Animation |
|---|---|---|
| Page | load / internal nav | global `.page--transition` fade (0.5s ease, 0.5s delay); out 0.5s then navigate (links without `target`) |
| Smooth scroll | – | Lenis (global); anchor buttons use `lenis.scrollTo(hash,{offset:-85})` (ROI "Get the ROI report"/"Download the report", GuideTypes buttons, share-download) |
| Listing card image | hover | `transform: scale(1.015)`, `transition: transform .65s` (ease) |
| `.arrow-button.transparent` | hover | arrow `translateX(10px)`, `.3s` |
| `.arrow-button` / `.black` / `.roi-button*` | hover | §0.7 + N13/N14 rules |
| Load more accordion | click | `grid-template-rows 0fr↔1fr`, `.3s`; label swap; down-arrow rotate 180° (instant) |
| Mobile Topics accordion | click arrow | same grid-rows `.3s` |
| Tag filter | click | `.tag.active` bg `#FFC8AE` (`transition: .3s`) ; list re-renders instantly |
| Reset all | hover | underline swap (`width .3s`, `.1s` delay on the incoming line) |
| Download accordion (articles) | click download share icon | grid-rows `.3s` + lenis scroll; close button `opacity .7` hover |
| Form thank-you | submit | overlay `opacity/visibility .3s` |
| Case-study popup | card click (≥981) | slide-in `transform .85s cubic-bezier(.4,0,.2,1)`; backdrop fade `.65s` + blur 4px |
| ROI video | hover / click | play button `scale(1.05)` `.3s`; click swaps to autoplay iframe |
| Footer wordmark | scroll | peel (global) |
No IntersectionObserver reveals, no GSAP, no Swiper on these routes.

---

## 7. Missing assets (not in `/Users/riyaghosh/V3/cadmus/public/assets`; not downloaded)
Datocms URLs accept `?auto=format&w=<n>`; the live site requests widths up to 1440/1500. Already local and used here: `1778212941-pexels-cottonbro-63337352.jpg`, `1778213101-surface-xarmm8ffapo-unsplash-2.jpg`, `1778213038-adobestock_354893802-jpg-2.jpg`, `1751189417-frame-1430105575.png`, `1754525016-christin-hume-hcfwew744z4-unsplash-1-1.jpg`, and a few card thumbnails flagged in Appendix A.
Icons that are CSS data-URIs (share icons, accordion arrow, down arrow, video-play, form close, orange arrow) and the note pin SVG are in `/Users/riyaghosh/V3/cadmus/specs/pages-content-icons.md`.

154 missing files (8 site-static + 139 Dato images/PDF + 7 Contentful images in guide rich text). Card thumbnails for all listing items are included.

| # | absolute URL | local filename | used on |
|---|---|---|---|
| 1 | https://cadmus.io/static/news-28b75d4aff69441c8f234ffe6e32ab06.svg | `news-28b75d4aff69441c8f234ffe6e32ab06.svg` | /news hero background art (`.news--background`) |
| 2 | https://cadmus.io/static/quote-orange-05a043526a9ba63e3288b55f61449cbb.png | `quote-orange-05a043526a9ba63e3288b55f61449cbb.png` | `.quote--wrapper.orange` bg (articles, guides, studies) |
| 3 | https://cadmus.io/static/quote-blue-957f632b8897618c6f412d7c5953b757.png | `quote-blue-957f632b8897618c6f412d7c5953b757.png` | `.quote--wrapper.blue` bg |
| 4 | https://cadmus.io/static/quote-pink-5433987367504c30e20624b6ec94d864.png | `quote-pink-5433987367504c30e20624b6ec94d864.png` | `.quote--wrapper.pink` bg |
| 5 | https://cadmus.io/static/quote-green-c27af1235b744a182aceb7c1d536a919.png | `quote-green-c27af1235b744a182aceb7c1d536a919.png` | `.quote--wrapper.green` bg |
| 6 | https://cadmus.io/static/videos-6577752a69196bbaeb790fd48d44f324.svg | `videos-6577752a69196bbaeb790fd48d44f324.svg` | /video-tutorials hero `::after` art |
| 7 | https://cadmus.io/images/roi-quote-pattern.svg | `roi-quote-pattern.svg` | ROI quote banner pattern (159x150 intrinsic) |
| 8 | https://cadmus.io/static/thanks-c7f6b2cb2d83c6fab34c7f407eefb114.svg | `thanks-c7f6b2cb2d83c6fab34c7f407eefb114.svg` | `.thank-you-image` (declared; not rendered on these routes) |
| 9 | https://www.datocms-assets.com/163564/1752372581-image-container.jpg | `1752372581-image-container.jpg` | /case-studies |
| 10 | https://www.datocms-assets.com/163564/1754422014-the-university-of-manchester-min_1219152588.jpg | `1754422014-the-university-of-manchester-min_1219152588.jpg` | /case-studies |
| 11 | https://www.datocms-assets.com/163564/1754569087-frame-1430106077.jpg | `1754569087-frame-1430106077.jpg` | /case-studies |
| 12 | https://www.datocms-assets.com/163564/1754570100-frame-1430106078.jpg | `1754570100-frame-1430106078.jpg` | /case-studies |
| 13 | https://www.datocms-assets.com/163564/1754570155-frame-1430106079.jpg | `1754570155-frame-1430106079.jpg` | /case-studies |
| 14 | https://www.datocms-assets.com/163564/1754570253-frame-1430106080.jpg | `1754570253-frame-1430106080.jpg` | /case-studies |
| 15 | https://www.datocms-assets.com/163564/1754570293-frame-1430106081.jpg | `1754570293-frame-1430106081.jpg` | /case-studies |
| 16 | https://www.datocms-assets.com/163564/1754570395-frame-1430106082.jpg | `1754570395-frame-1430106082.jpg` | /case-studies |
| 17 | https://www.datocms-assets.com/163564/1754570425-frame-1430106083.jpg | `1754570425-frame-1430106083.jpg` | /case-studies |
| 18 | https://www.datocms-assets.com/163564/1754570462-frame-1430106084.jpg | `1754570462-frame-1430106084.jpg` | /case-studies |
| 19 | https://www.datocms-assets.com/163564/1754570495-frame-1430106085.jpg | `1754570495-frame-1430106085.jpg` | /case-studies |
| 20 | https://www.datocms-assets.com/163564/1754570529-frame-1430106086.jpg | `1754570529-frame-1430106086.jpg` | /case-studies |
| 21 | https://www.datocms-assets.com/163564/1754570555-frame-1430106087.jpg | `1754570555-frame-1430106087.jpg` | /case-studies |
| 22 | https://www.datocms-assets.com/163564/1754570590-frame-1430106088.jpg | `1754570590-frame-1430106088.jpg` | /case-studies |
| 23 | https://www.datocms-assets.com/163564/1754570652-frame-1430106090.jpg | `1754570652-frame-1430106090.jpg` | /case-studies |
| 24 | https://www.datocms-assets.com/163564/1754570679-frame-1430106091.jpg | `1754570679-frame-1430106091.jpg` | /case-studies |
| 25 | https://www.datocms-assets.com/163564/1754570715-frame-1430106092.jpg | `1754570715-frame-1430106092.jpg` | /case-studies |
| 26 | https://www.datocms-assets.com/163564/1754570737-frame-1430106093.jpg | `1754570737-frame-1430106093.jpg` | /case-studies |
| 27 | https://www.datocms-assets.com/163564/1754570764-frame-1430106094.jpg | `1754570764-frame-1430106094.jpg` | /case-studies |
| 28 | https://www.datocms-assets.com/163564/1754570799-frame-1430106095.jpg | `1754570799-frame-1430106095.jpg` | /case-studies |
| 29 | https://www.datocms-assets.com/163564/1757993855-imgbtn_campustours.jpg | `1757993855-imgbtn_campustours.jpg` | /case-studies |
| 30 | https://www.datocms-assets.com/163564/1758865826-bond-university-1-min.jpg | `1758865826-bond-university-1-min.jpg` | /case-studies |
| 31 | https://www.datocms-assets.com/163564/1758869181-notre-dame-seng-jsr50508-edit-scaled.jpg | `1758869181-notre-dame-seng-jsr50508-edit-scaled.jpg` | /case-studies |
| 32 | https://www.datocms-assets.com/163564/1763420379-rankings22_l.jpg | `1763420379-rankings22_l.jpg` | /case-studies |
| 33 | https://www.datocms-assets.com/163564/1770945985-final-0769-805x858.jpg | `1770945985-final-0769-805x858.jpg` | /case-studies |
| 34 | https://www.datocms-assets.com/163564/1776663347-discover-banner-image.jpg | `1776663347-discover-banner-image.jpg` | /case-studies |
| 35 | https://www.datocms-assets.com/163564/1774844499-sydney-campus-2023-648x400.jpg | `1774844499-sydney-campus-2023-648x400.jpg` | /case-studies, /study/case-study-the-university-of-manchester |
| 36 | https://www.datocms-assets.com/163564/1776743411-5f6d0e92b356479ea966a471_toi-ohomai-2.jpg | `1776743411-5f6d0e92b356479ea966a471_toi-ohomai-2.jpg` | /case-studies, /study/case-study-the-university-of-manchester |
| 37 | https://www.datocms-assets.com/163564/1776990049-myhc_368026.jpg | `1776990049-myhc_368026.jpg` | /case-studies, /study/case-study-the-university-of-manchester |
| 38 | https://images.ctfassets.net/mqkprtnmtb76/1EgyKNjX9isGV2RWg11DKG/0a767e9db69b8e7971b97e16c9dac5be/guide-best-practice-6.jpg | `guide-best-practice-6.jpg` | /guides/what-is-best-practice-assessment |
| 39 | https://images.ctfassets.net/mqkprtnmtb76/1So3U53Yg0gngNBbyfR4qo/f383c45f3d9bb6b4af94833f2ae6784b/guide-best-practice-2.jpg | `guide-best-practice-2.jpg` | /guides/what-is-best-practice-assessment |
| 40 | https://images.ctfassets.net/mqkprtnmtb76/26kA7wecvS8bq9ekoxdsmt/f82d8bc30ae2f13707341261abe0de37/guide-best-practice-3.jpg | `guide-best-practice-3.jpg` | /guides/what-is-best-practice-assessment |
| 41 | https://images.ctfassets.net/mqkprtnmtb76/4QkVBlGUa9hKOVPOBGDuTN/27cb13d437cfa30a2db052bb3dda562e/guide-best-practice-7.jpg | `guide-best-practice-7.jpg` | /guides/what-is-best-practice-assessment |
| 42 | https://images.ctfassets.net/mqkprtnmtb76/5yNC1zv0o0xYb6Mh448MD8/765c4b9caf6e7d1e8df2adde49ec5953/guide-best-practice-4.jpg | `guide-best-practice-4.jpg` | /guides/what-is-best-practice-assessment |
| 43 | https://images.ctfassets.net/mqkprtnmtb76/755Veenl3T4UAEfMgorf9X/80e5f951519af45221cd20e4ed714da6/guide-best-practice-1.jpg | `guide-best-practice-1.jpg` | /guides/what-is-best-practice-assessment |
| 44 | https://images.ctfassets.net/mqkprtnmtb76/7joMkRd2Zc23AXNmRldlct/9480ee6f5ca021b811cf663d3b0f79fc/guide-best-practice-5.jpg | `guide-best-practice-5.jpg` | /guides/what-is-best-practice-assessment |
| 45 | https://www.datocms-assets.com/163564/1754564667-brooke-cagle-lccfi_26dia-unsplash.jpg | `1754564667-brooke-cagle-lccfi_26dia-unsplash.jpg` | /guides/what-is-best-practice-assessment |
| 46 | https://www.datocms-assets.com/163564/1751282421-vector_layer.jpg | `1751282421-vector_layer.jpg` | /news |
| 47 | https://www.datocms-assets.com/163564/1751282453-frame-1321314721.jpg | `1751282453-frame-1321314721.jpg` | /news |
| 48 | https://www.datocms-assets.com/163564/1751704405-image-container.png | `1751704405-image-container.png` | /news |
| 49 | https://www.datocms-assets.com/163564/1751704477-image-container-1.png | `1751704477-image-container-1.png` | /news |
| 50 | https://www.datocms-assets.com/163564/1751704570-image-container-3.png | `1751704570-image-container-3.png` | /news |
| 51 | https://www.datocms-assets.com/163564/1752719273-group-1073715737.png | `1752719273-group-1073715737.png` | /news |
| 52 | https://www.datocms-assets.com/163564/1752721263-exams-1.png | `1752721263-exams-1.png` | /news |
| 53 | https://www.datocms-assets.com/163564/1753397134-vector_layer-1.jpg | `1753397134-vector_layer-1.jpg` | /news |
| 54 | https://www.datocms-assets.com/163564/1753397173-image-container.jpg | `1753397173-image-container.jpg` | /news |
| 55 | https://www.datocms-assets.com/163564/1753397204-image-container-1.jpg | `1753397204-image-container-1.jpg` | /news |
| 56 | https://www.datocms-assets.com/163564/1753779521-image-container-3.jpg | `1753779521-image-container-3.jpg` | /news |
| 57 | https://www.datocms-assets.com/163564/1754331274-article-080523-01.jpg | `1754331274-article-080523-01.jpg` | /news |
| 58 | https://www.datocms-assets.com/163564/1754472361-cadmus-event-june-2025-467-copy.jpg | `1754472361-cadmus-event-june-2025-467-copy.jpg` | /news |
| 59 | https://www.datocms-assets.com/163564/1754472821-screenshot-2025-02-13-at-5-07-44-pm-3.jpg | `1754472821-screenshot-2025-02-13-at-5-07-44-pm-3.jpg` | /news |
| 60 | https://www.datocms-assets.com/163564/1754472851-screenshot-2025-02-13-at-5-07-44-pm-4.jpg | `1754472851-screenshot-2025-02-13-at-5-07-44-pm-4.jpg` | /news |
| 61 | https://www.datocms-assets.com/163564/1754475527-vector_layer-1.jpg | `1754475527-vector_layer-1.jpg` | /news |
| 62 | https://www.datocms-assets.com/163564/1754540155-cadmus-event-june-2025-48-copy-1.jpg | `1754540155-cadmus-event-june-2025-48-copy-1.jpg` | /news |
| 63 | https://www.datocms-assets.com/163564/1754540305-getty-images-n1iez7woc1c-unsplash-1.jpg | `1754540305-getty-images-n1iez7woc1c-unsplash-1.jpg` | /news |
| 64 | https://www.datocms-assets.com/163564/1754547662-pexels-kampus-5940828.jpg | `1754547662-pexels-kampus-5940828.jpg` | /news |
| 65 | https://www.datocms-assets.com/163564/1754565281-kateryna-hliznitsova-ye7hwgyte4a-unsplash.jpg | `1754565281-kateryna-hliznitsova-ye7hwgyte4a-unsplash.jpg` | /news |
| 66 | https://www.datocms-assets.com/163564/1754565531-adobestock_1198309077.jpg | `1754565531-adobestock_1198309077.jpg` | /news |
| 67 | https://www.datocms-assets.com/163564/1754565735-robert-bye-cyvk_z2pyxg-unsplash.jpg | `1754565735-robert-bye-cyvk_z2pyxg-unsplash.jpg` | /news |
| 68 | https://www.datocms-assets.com/163564/1758076101-blog-article-thumbnail-copy.jpg | `1758076101-blog-article-thumbnail-copy.jpg` | /news |
| 69 | https://www.datocms-assets.com/163564/1758211315-adobestock_577860219-1.png | `1758211315-adobestock_577860219-1.png` | /news |
| 70 | https://www.datocms-assets.com/163564/1758858937-charles-sturt-university.jpg | `1758858937-charles-sturt-university.jpg` | /news |
| 71 | https://www.datocms-assets.com/163564/1758864866-the-9th-coworking-qeagaujw_fw-unsplash-1-min-2.jpg | `1758864866-the-9th-coworking-qeagaujw_fw-unsplash-1-min-2.jpg` | /news |
| 72 | https://www.datocms-assets.com/163564/1758868347-winthrop-hall-uwa.jpg | `1758868347-winthrop-hall-uwa.jpg` | /news |
| 73 | https://www.datocms-assets.com/163564/1759383331-templates-2x.webp | `1759383331-templates-2x.webp` | /news |
| 74 | https://www.datocms-assets.com/163564/1759384951-slide-74-1-11zon.jpg | `1759384951-slide-74-1-11zon.jpg` | /news |
| 75 | https://www.datocms-assets.com/163564/1759387127-pexels-thisisengineering-3861963-1-11zon.jpg | `1759387127-pexels-thisisengineering-3861963-1-11zon.jpg` | /news |
| 76 | https://www.datocms-assets.com/163564/1759467250-article-290121-main.jpg | `1759467250-article-290121-main.jpg` | /news |
| 77 | https://www.datocms-assets.com/163564/1759474976-1752535456-frame-1430105485.avif | `1759474976-1752535456-frame-1430105485.avif` | /news |
| 78 | https://www.datocms-assets.com/163564/1762299399-cadmus-x-uom-forum-oct-2025-0092-1-1-11zon.jpg | `1762299399-cadmus-x-uom-forum-oct-2025-0092-1-1-11zon.jpg` | /news |
| 79 | https://www.datocms-assets.com/163564/1764289240-screenshot-2025-11-28-at-10-20-29-am.png | `1764289240-screenshot-2025-11-28-at-10-20-29-am.png` | /news |
| 80 | https://www.datocms-assets.com/163564/1767828390-christian-velitchkov-mxz64b8-3h0.jpg | `1767828390-christian-velitchkov-mxz64b8-3h0.jpg` | /news |
| 81 | https://www.datocms-assets.com/163564/1768261029-pexels-kampus-5940712.jpg | `1768261029-pexels-kampus-5940712.jpg` | /news |
| 82 | https://www.datocms-assets.com/163564/1768788932-pexels-thisisengineering-3861963_2_optimized_1000.jpg | `1768788932-pexels-thisisengineering-3861963_2_optimized_1000.jpg` | /news |
| 83 | https://www.datocms-assets.com/163564/1769470107-adobestock_733092520-1.jpeg | `1769470107-adobestock_733092520-1.jpeg` | /news |
| 84 | https://www.datocms-assets.com/163564/1770082005-getty-images-ofpozrbdv8g-unsplash.jpg | `1770082005-getty-images-ofpozrbdv8g-unsplash.jpg` | /news |
| 85 | https://www.datocms-assets.com/163564/1770605714-victoria-heath-b7crdcwfnfu-unsplash-3.jpg | `1770605714-victoria-heath-b7crdcwfnfu-unsplash-3.jpg` | /news |
| 86 | https://www.datocms-assets.com/163564/1772418402-ba_14855.jpg | `1772418402-ba_14855.jpg` | /news |
| 87 | https://www.datocms-assets.com/163564/1773885321-vimeo-cover-image-5.png | `1773885321-vimeo-cover-image-5.png` | /news |
| 88 | https://www.datocms-assets.com/163564/1774920315-pexels-artempodrez-8518848-1.jpg | `1774920315-pexels-artempodrez-8518848-1.jpg` | /news |
| 89 | https://www.datocms-assets.com/163564/1775528240-kateryna-hliznitsova-io-afxstgdy-unsplash-2.jpg | `1775528240-kateryna-hliznitsova-io-afxstgdy-unsplash-2.jpg` | /news |
| 90 | https://www.datocms-assets.com/163564/1775528308-teacreativelife-soo-chung-9p-xfprly-unsplash1.jpg | `1775528308-teacreativelife-soo-chung-9p-xfprly-unsplash1.jpg` | /news |
| 91 | https://www.datocms-assets.com/163564/1776408753-tim-gouw-1k9t5yiz2wu-unsplash-1.jpg | `1776408753-tim-gouw-1k9t5yiz2wu-unsplash-1.jpg` | /news |
| 92 | https://www.datocms-assets.com/163564/1777944825-docusign-akkhzqylej4-unsplash_2_optimized_1000.jpg | `1777944825-docusign-akkhzqylej4-unsplash_2_optimized_1000.jpg` | /news |
| 93 | https://www.datocms-assets.com/163564/1782398290-hero-image.avif | `1782398290-hero-image.avif` | /news |
| 94 | https://www.datocms-assets.com/163564/1783661168-reducing-educator-workload-starts-with-assessment-design-2.jpg | `1783661168-reducing-educator-workload-starts-with-assessment-design-2.jpg` | /news |
| 95 | https://www.datocms-assets.com/163564/1784861908-h3hkka.jpeg | `1784861908-h3hkka.jpeg` | /news |
| 96 | https://www.datocms-assets.com/163564/1790737626-lr-the-pa-university-of-waikato-03.webp | `1790737626-lr-the-pa-university-of-waikato-03.webp` | /news |
| 97 | https://www.datocms-assets.com/163564/1752370909-rectangle-3470759-1-1.jpg | `1752370909-rectangle-3470759-1-1.jpg` | /news, /case-studies |
| 98 | https://www.datocms-assets.com/163564/1754569023-frame-1430106076.jpg | `1754569023-frame-1430106076.jpg` | /news, /case-studies |
| 99 | https://www.datocms-assets.com/163564/1754570624-frame-1430106089.jpg | `1754570624-frame-1430106089.jpg` | /news, /case-studies |
| 100 | https://www.datocms-assets.com/163564/1754570852-frame-1430106096.jpg | `1754570852-frame-1430106096.jpg` | /news, /case-studies |
| 101 | https://www.datocms-assets.com/163564/1758867088-the-university-of-melbourne.jpg | `1758867088-the-university-of-melbourne.jpg` | /news, /case-studies |
| 102 | https://www.datocms-assets.com/163564/1758869177-notre-dame-seng-jsr50508-edit-scaled.jpg | `1758869177-notre-dame-seng-jsr50508-edit-scaled.jpg` | /news, /case-studies |
| 103 | https://www.datocms-assets.com/163564/1758869826-the-university-of-newcastle.jpg | `1758869826-the-university-of-newcastle.jpg` | /news, /case-studies |
| 104 | https://www.datocms-assets.com/163564/1754191896-image-container.jpg | `1754191896-image-container.jpg` | /news, /news/why-ai-demands-a-redesign-of-assessment, /news/why-ai-proofing-assessments-misses-the-point, /news/the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it |
| 105 | https://www.datocms-assets.com/163564/1754566145-image-container02.png | `1754566145-image-container02.png` | /news, /teacher-guides |
| 106 | https://www.datocms-assets.com/163564/1751793152-image-container-5.jpg | `1751793152-image-container-5.jpg` | /news, /teacher-guides, /guides/what-is-best-practice-assessment |
| 107 | https://www.datocms-assets.com/163564/1771204444-roi-why-section-photo.jpeg | `1771204444-roi-why-section-photo.jpeg` | /study/2026-Cadmus-ROI-study |
| 108 | https://www.datocms-assets.com/163564/1771209273-cadmus-roi-nous-final-report-february-2026.pdf | `1771209273-cadmus-roi-nous-final-report-february-2026.pdf` | /study/2026-Cadmus-ROI-study |
| 109 | https://www.datocms-assets.com/163564/1771385356-vimeo-cover-image-3.png | `1771385356-vimeo-cover-image-3.png` | /study/2026-Cadmus-ROI-study |
| 110 | https://www.datocms-assets.com/163564/1771385426-screenshot-2026-02-18-at-1-30-17-pm.png | `1771385426-screenshot-2026-02-18-at-1-30-17-pm.png` | /study/2026-Cadmus-ROI-study |
| 111 | https://www.datocms-assets.com/163564/1751793205-image-container-2.jpg | `1751793205-image-container-2.jpg` | /teacher-guides |
| 112 | https://www.datocms-assets.com/163564/1751793220-image-container-1.jpg | `1751793220-image-container-1.jpg` | /teacher-guides |
| 113 | https://www.datocms-assets.com/163564/1751793234-image-container.jpg | `1751793234-image-container.jpg` | /teacher-guides |
| 114 | https://www.datocms-assets.com/163564/1754564494-image-container.png | `1754564494-image-container.png` | /teacher-guides |
| 115 | https://www.datocms-assets.com/163564/1754565090-image-container-3.png | `1754565090-image-container-3.png` | /teacher-guides |
| 116 | https://www.datocms-assets.com/163564/1754565090-image-container-5.png | `1754565090-image-container-5.png` | /teacher-guides |
| 117 | https://www.datocms-assets.com/163564/1754565091-image-container-1.png | `1754565091-image-container-1.png` | /teacher-guides |
| 118 | https://www.datocms-assets.com/163564/1754565937-image-containervs.png | `1754565937-image-containervs.png` | /teacher-guides |
| 119 | https://www.datocms-assets.com/163564/1754566198-getty-images-8pqd7fjhu5o-unsplash.jpg | `1754566198-getty-images-8pqd7fjhu5o-unsplash.jpg` | /teacher-guides |
| 120 | https://www.datocms-assets.com/163564/1754566275-image-container03.png | `1754566275-image-container03.png` | /teacher-guides |
| 121 | https://www.datocms-assets.com/163564/1751793170-image-container-4.jpg | `1751793170-image-container-4.jpg` | /teacher-guides, /guides/what-is-best-practice-assessment |
| 122 | https://www.datocms-assets.com/163564/1751793187-image-container-3.jpg | `1751793187-image-container-3.jpg` | /teacher-guides, /guides/what-is-best-practice-assessment |
| 123 | https://www.datocms-assets.com/163564/1754558192-vimeo-cover-image-1.png | `1754558192-vimeo-cover-image-1.png` | /video-tutorials |
| 124 | https://www.datocms-assets.com/163564/1754558192-vimeo-cover-image-2.png | `1754558192-vimeo-cover-image-2.png` | /video-tutorials |
| 125 | https://www.datocms-assets.com/163564/1754558192-vimeo-cover-image-3.png | `1754558192-vimeo-cover-image-3.png` | /video-tutorials |
| 126 | https://www.datocms-assets.com/163564/1754558192-vimeo-cover-image.png | `1754558192-vimeo-cover-image.png` | /video-tutorials |
| 127 | https://www.datocms-assets.com/163564/1754563263-vimeo-cover-image-1.png | `1754563263-vimeo-cover-image-1.png` | /video-tutorials |
| 128 | https://www.datocms-assets.com/163564/1754563263-vimeo-cover-image-2.png | `1754563263-vimeo-cover-image-2.png` | /video-tutorials |
| 129 | https://www.datocms-assets.com/163564/1754563263-vimeo-cover-image-3.png | `1754563263-vimeo-cover-image-3.png` | /video-tutorials |
| 130 | https://www.datocms-assets.com/163564/1754563263-vimeo-cover-image-4.png | `1754563263-vimeo-cover-image-4.png` | /video-tutorials |
| 131 | https://www.datocms-assets.com/163564/1754563263-vimeo-cover-image.png | `1754563263-vimeo-cover-image.png` | /video-tutorials |
| 132 | https://www.datocms-assets.com/163564/1754570085-vimeo-cover-image-1.png | `1754570085-vimeo-cover-image-1.png` | /video-tutorials |
| 133 | https://www.datocms-assets.com/163564/1754570115-vimeo-cover-image-2.png | `1754570115-vimeo-cover-image-2.png` | /video-tutorials |
| 134 | https://www.datocms-assets.com/163564/1754570147-vimeo-cover-image-3.png | `1754570147-vimeo-cover-image-3.png` | /video-tutorials |
| 135 | https://www.datocms-assets.com/163564/1754570170-vimeo-cover-image-4.png | `1754570170-vimeo-cover-image-4.png` | /video-tutorials |
| 136 | https://www.datocms-assets.com/163564/1754570248-vimeo-cover-image-2.png | `1754570248-vimeo-cover-image-2.png` | /video-tutorials |
| 137 | https://www.datocms-assets.com/163564/1754570248-vimeo-cover-image-4.png | `1754570248-vimeo-cover-image-4.png` | /video-tutorials |
| 138 | https://www.datocms-assets.com/163564/1754570248-vimeo-cover-image-5.png | `1754570248-vimeo-cover-image-5.png` | /video-tutorials |
| 139 | https://www.datocms-assets.com/163564/1754570248-vimeo-cover-image-6.png | `1754570248-vimeo-cover-image-6.png` | /video-tutorials |
| 140 | https://www.datocms-assets.com/163564/1754570248-vimeo-cover-image-7.png | `1754570248-vimeo-cover-image-7.png` | /video-tutorials |
| 141 | https://www.datocms-assets.com/163564/1754570249-vimeo-cover-image-1.png | `1754570249-vimeo-cover-image-1.png` | /video-tutorials |
| 142 | https://www.datocms-assets.com/163564/1754570249-vimeo-cover-image-3.png | `1754570249-vimeo-cover-image-3.png` | /video-tutorials |
| 143 | https://www.datocms-assets.com/163564/1754570249-vimeo-cover-image.png | `1754570249-vimeo-cover-image.png` | /video-tutorials |
| 144 | https://www.datocms-assets.com/163564/1754570647-vimeo-cover-image-2.png | `1754570647-vimeo-cover-image-2.png` | /video-tutorials |
| 145 | https://www.datocms-assets.com/163564/1754570647-vimeo-cover-image-5.png | `1754570647-vimeo-cover-image-5.png` | /video-tutorials |
| 146 | https://www.datocms-assets.com/163564/1754570647-vimeo-cover-image.png | `1754570647-vimeo-cover-image.png` | /video-tutorials |
| 147 | https://www.datocms-assets.com/163564/1754570648-vimeo-cover-image-3.png | `1754570648-vimeo-cover-image-3.png` | /video-tutorials |
| 148 | https://www.datocms-assets.com/163564/1754570648-vimeo-cover-image-4.png | `1754570648-vimeo-cover-image-4.png` | /video-tutorials |
| 149 | https://www.datocms-assets.com/163564/1754571623-vimeo-cover-image-1.png | `1754571623-vimeo-cover-image-1.png` | /video-tutorials |
| 150 | https://www.datocms-assets.com/163564/1754571623-vimeo-cover-image-2.png | `1754571623-vimeo-cover-image-2.png` | /video-tutorials |
| 151 | https://www.datocms-assets.com/163564/1754572178-vimeo-cover-image.png | `1754572178-vimeo-cover-image.png` | /video-tutorials |
| 152 | https://www.datocms-assets.com/163564/1758170009-aacsb-video-frame.png | `1758170009-aacsb-video-frame.png` | /video-tutorials |
| 153 | https://www.datocms-assets.com/163564/1758249972-02.png | `1758249972-02.png` | /video-tutorials |
| 154 | https://www.datocms-assets.com/163564/1758521431-screenshot-2025-09-22-at-3-33-19-pm.png | `1758521431-screenshot-2025-09-22-at-3-33-19-pm.png` | /video-tutorials |

---

## 8. UNVERIFIED / not measured
- Note blocks were measured only on the guide page (desktop); note colours other than blue/pink were taken from CSS, not seen rendered.
- `blockquote`, `ol`, `img` inside news/study rich text: no instances on measured pages (img only on guide).
- Popup (N11) at 1280 measured only for container width (1100); content layout inside popup at 1280 not measured. Popup was not exercised ≤980 (not used there by design).
- Form submissions (Netlify) and the 4.5 s PDF auto-open were read from source, not executed.
- Vimeo player internals (cross-origin iframe).
- Video template at 1280 and resource tiles (empty on the measured page) — layout from source/CSS only.
- Guide template and video template were measured on one instance each at 1440 and 390 only.
- Hover states on tags: none exist (verified computed bg/colour unchanged on hover).
- The other 73 news articles / 35 studies / 12 guides / 28 videos were not individually measured; they share the templates above and differ only in data (Appendix A) and rich-text length.

---

## Appendix A — Child route data (from page-data; display order = CMS `position`)
`previewImage` filenames are under `https://www.datocms-assets.com/163564/`; "**missing**" = not in public/assets.

### A.1 News items (76, CMS order = display order; image base URL `https://www.datocms-assets.com/163564/`)
| # | date | title | author | categories | href | excerpt (truncated) | previewImage |
|---|---|---|---|---|---|---|---|
| 1 | Jun 2026 | Why “AI-proofing” assessments misses the point—and what to design for instead | Nick Bareham, Chief Growth Officer, Cadmus | AI, Leadership | `/news/why-ai-proofing-assessments-misses-the-point/` | This article challenges the idea of “AI-proofing” assessment, arguing that restriction and detection strategie… | `1778212941-pexels-cottonbro-63337352.jpg` 1500x1000  |
| 2 | May 2026 | Why AI demands a redesign of assessment—not just a policy response | Brigitte Elliott, Co-CEO, Cadmus | AI, Leadership | `/news/why-ai-demands-a-redesign-of-assessment/` | This article argues that AI has exposed a deeper structural weakness in higher education assessment: the relia… | `1778213101-surface-xarmm8ffapo-unsplash-2.jpg` 1500x1000  |
| 3 | May 2026 | The degree has always been a signal. AI is changing how we verify it. | Herk Kailis, Founder & Co-CEO, Cadmus | AI, Leadership | `/news/the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it/` | This piece explores how AI has fundamentally disrupted the university degree as a trusted signal of capability… | `1778213038-adobestock_354893802-jpg-2.jpg` 1500x792  |
| 4 | May 2026 | Group work is not the problem. Poor design is. | Cadmus | Assessment Design, Student Success | `/news/group-work-is-not-the-problem-poor-design-is/` | This article explores how challenges in group work are often linked to assessment design, rather than student… | `1754191896-image-container.jpg` 1196x1330 **missing** |
| 5 | May 2026 | How to reduce marking time without compromising feedback quality | Cadmus | Teaching & Learning, Feedback & Marking | `/news/how-to-reduce-marking-time-without-compromising-feedback-quality/` | Marking often feels constrained by a trade-off between speed and feedback quality. This article examines how t… | `1777944825-docusign-akkhzqylej4-unsplash_2_optimized_1000.jpg` 2262x1508 **missing** |
| 6 | Apr 2026 | Using data to identify at-risk students early | Cadmus | Student Success | `/news/using-data-to-identify-at-risk-students-early/` | A practical piece for educators on identifying at-risk students earlier by looking beyond final submissions. I… | `1776408753-tim-gouw-1k9t5yiz2wu-unsplash-1.jpg` 2048x1369 **missing** |
| 7 | Apr 2026 | Why universities agree with design-led integrity—but still struggle to move beyond detection | Nick Bareham, Chief Growth Officer, Cadmus | Academic Integrity, Leadership | `/news/why-universities-agree-with-design-led-integritybut-still-struggle-to-move-beyond/` | In this piece, Nick Bareham explores the gap between institutional belief and purchasing behaviour—and why pro… | `1775528308-teacreativelife-soo-chung-9p-xfprly-unsplash1.jpg` 1500x844 **missing** |
| 8 | Apr 2026 | What a design-led model of academic integrity actually looks like in practice | Brigitte Elliott, Co-CEO, Cadmus | Academic Integrity, Leadership | `/news/what-a-design-led-model-of-academic-integrity-actually-looks-like-in-practice/` | In this piece, Cadmus Co-CEO Brigitte Elliott puts language to a growing shift in the sector: from treating ac… | `1775528240-kateryna-hliznitsova-io-afxstgdy-unsplash-2.jpg` 1500x1001 **missing** |
| 9 | Mar 2026 | Why detection-first integrity strategies are becoming a sunk cost for universities | Herk Kailis, Founder & Co-CEO, Cadmus | Academic Integrity, Leadership | `/news/why-detection-first-integrity-strategies-are-becoming-a-sunk-cost-for-universities/` | In this article, Founder & Co-CEO Herk Kailis puts language to a growing tension across institutions: as the m… | `1754544713-istock-2208695167-1-1-1.png` 930x1394  |
| 10 | Mar 2026 | How we use data at Cadmus | Cadmus | Product | `/news/data-at-cadmus/` | Being online creates new opportunities to understand how learning happens. Discover how Cadmus uses data to su… | `1774920315-pexels-artempodrez-8518848-1.jpg` 1500x844 **missing** |
| 11 | Mar 2026 | Introducing Cadmus Oral Assessment: Scalable assurance for an AI‑enabled world |  | Product update, Company | `/news/introducing-cadmus-oral-assessment-scalable-assurance-for-an-aienabled-world/` | Cadmus introduces Oral Assessment: a new approach to strengthening assessment assurance in an AI-enabled world… | `1773885321-vimeo-cover-image-5.png` 1920x1080 **missing** |
| 12 | Mar 2026 | The hidden lever for student success: Assessment design | Cadmus | Student Success, Assessment Design | `/news/the-hidden-lever-for-student-success-assessment-design/` | Assessments shape how students learn: where they focus their effort, how they approach research and writing, a… | `1753397134-vector_layer-1.jpg` 603x588 **missing** |
| 13 | Mar 2026 | Cadmus convenes a working group to develop a new approach to oral assurance for secure assessment |  | Company, Product update | `/news/cadmus-oral-assessment-working-group/` | Cadmus has convened a global Working Group of universities across APAC and the UK to collaboratively design a… | `1754564986-surface-8hplpr3hebu-unsplash.jpg` 3000x2000  |
| 14 | Mar 2026 | From bold ideas to real assessment change: What we heard at the Universities Australia Solutions Summit | Cadmus | Academic Integrity, Assessment Design, Teaching & Learning, Student Success | `/news/from-bold-ideas-to-real-assessment-change-what-we-heard-at-ua/` | Last week in Canberra, the Universities Australia Solutions Summit delivered on its promise of big ideas, bold… | `1772418402-ba_14855.jpg` 2000x1333 **missing** |
| 15 | Feb 2026 | Independent ROI analysis: What the findings mean for Universities |  | Assessment Design, Company | `/news/cadmus-roi-analysis/` | Independent analysis by Nous Group confirms a clear link: stronger assessment design improves student outcomes… | `1758869826-the-university-of-newcastle.jpg` 1280x540 **missing** |
| 16 | Feb 2026 | Secure assessment: From policy to practice | Cadmus | Assessment Design, Leadership, Teaching & Learning | `/news/secure-assessment-from-policy-to-practice/` | This article examines how Australian universities can translate assessment policy intent into sustainable prac… | `1770605714-victoria-heath-b7crdcwfnfu-unsplash-3.jpg` 4608x3072 **missing** |
| 17 | Feb 2026 | Detection to design: Why secure assessment now demands oral assurance | Cadmus | Academic Integrity, Exam Alternatives | `/news/detection-to-design-why-secure-assessment-now-demands-oral-assurance/` | In an era where AI has weakened writing as a sole integrity signal, this article examines how layered assessme… | `1770082005-getty-images-ofpozrbdv8g-unsplash.jpg` 2160x1863 **missing** |
| 18 | Jan 2026 | Beyond proctoring: How Cadmus is redefining secure assessment | Cadmus | Academic Integrity, Exam Alternatives | `/news/beyond-proctoring-how-cadmus-is-redefining-secure-assessment/` | Traditional exam proctoring is becoming less effective in the age of generative AI, prompting a shift toward a… | `1769470107-adobestock_733092520-1.jpeg` 1500x1000 **missing** |
| 19 | Jan 2026 | Process-driven assessment isn’t more work—it’s better design | Jess Ashman, Director of Learning, Cadmus | Assessment Design, Teaching & Learning, AI | `/news/process-driven-assessment-isnt-more-work-its-better-design/` | This final article in our three-part series explores how process-driven assessment can embed formative feedbac… | `1768788932-pexels-thisisengineering-3861963_2_optimized_1000.jpg` 2261x1508 **missing** |
| 20 | Jan 2026 | Learning-centred rubrics in the age of AI | Jess Ashman, Director of Learning, Cadmus | Teaching & Learning, Assessment Design, AI | `/news/learning-centred-rubrics-in-the-age-of-ai/` | In an AI-rich higher education context, learning-centred, process-aware rubrics matter more than ever because… | `1768261029-pexels-kampus-5940712.jpg` 3854x2570 **missing** |
| 21 | Jan 2026 | Your guide to designing assessments in the age of AI | Jess Ashman, Director of Learning, Cadmus | Assessment Design, Academic Integrity, AI | `/news/your-guide-to-designing-assessments-in-the-age-of-gen-ai/` | As generative AI reshapes higher education, traditional assessment models are being put to the test. This arti… | `1759384951-slide-74-1-11zon.jpg` 6720x4480 **missing** |
| 22 | Jan 2026 | Academic integrity in 2026: Moving beyond detection tools | Cadmus | Assessment Design, Academic Integrity, AI | `/news/academic-integrity-in-2026-moving-beyond-detection-tools/` | As universities navigate AI, hybrid learning, and growing assessment complexity, academic integrity is being r… | `1767828390-christian-velitchkov-mxz64b8-3h0.jpg` 6649x4912 **missing** |
| 23 | Nov 2025 | Cadmus Takes First Place in APUC Framework Agreement |  | Company | `/news/cadmus-takes-first-place-in-apuc-framework-agreement/` | We're excited to announce that we have been awarded the first place in APUC’s Framework Agreement. As a result… | `1764289240-screenshot-2025-11-28-at-10-20-29-am.png` 1150x780 **missing** |
| 24 | Oct 2025 | The future of assessment in a shifting higher education landscape: Lessons from the Teaching & Learning Forum | Cadmus | AI, Leadership, Student Success, Teaching & Learning | `/news/the-future-of-assessment-in-a-shifting-higher-education-landscape/` | Discover how universities across Australia are reimagining assessment to foster integrity, authenticity, and s… | `1762299399-cadmus-x-uom-forum-oct-2025-0092-1-1-11zon.jpg` 4989x3326 **missing** |
| 25 | Sep 2025 | Cadmus secures backing to safeguard university learning in the age of AI | Cadmus | Company | `/news/cadmus-secures-backing-to-safeguard-university-learning-in-the-age-of-ai/` | Cadmus has secured backing from SEEK Investments and Glitch Capital. With this investment, we’ll continue to a… | `1758076101-blog-article-thumbnail-copy.jpg` 1584x1188 **missing** |
| 26 | Aug 2025 | Reimagining assessment in the age of generative AI—The strategic role of Cadmus | Brigitte Elliott, Co-CEO, Cadmus | AI, Teaching & Learning | `/news/reimagining-assessment-in-the-age-of-generative-ai-the-strategic-role-of-cadmus/` | Cadmus positions AI as a tool to enhance—rather than erode—intellectual growth. Building on its expertise in w… | `1754565735-robert-bye-cyvk_z2pyxg-unsplash.jpg` 2448x1632 **missing** |
| 27 | Jul 2025 | From AI prohibition to integration—or why universities must pick up the pace | Mary Curnock Cook CBS, Chair of the Emerge/Jisc HE Edtech Advisory Board, and Bess Brennan, Chief Marketing Officer, Cadmus | AI, Leadership, Student Success | `/news/weekend-reading-from-ai-prohibition-to-integration-or-why-universities-must-pick/` | Discover how Coventry University and Imperial College are leading the shift from prohibiting to integrating AI… | `1754540155-cadmus-event-june-2025-48-copy-1.jpg` 2951x1967 **missing** |
| 28 | Feb 2025 | Generative AI in education: Navigating risks, opportunities, and the future of learning | Bess Brennan, Chief Marketing Officer, Cadmus | Exam Alternatives, Academic Integrity, Company, Student Success | `/news/ai-in-education-navigating-risks-opportunities-and-the-future-of-learning/` | Cadmus was thrilled to attend the Universities Australia Conference to discuss Generative AI Frameworks and So… | `1751704405-image-container.png` 792x594 **missing** |
| 29 | Feb 2025 | AI for everyone—but not everything | Mary Curnock Cook CBS, Chair of the Emerge/Jisc HE Edtech Advisory Board, and Bess Brennan, Chief Marketing Officer, Cadmus | AI, Leadership, Student Success | `/news/ai-for-everyone-but-not-everything/` | See how universities are crafting clear, co‑created generative AI policies—embracing AI as a legitimate learni… | `1754525016-christin-hume-hcfwew744z4-unsplash-1-1.jpg` 2545x1696  |
| 30 | Jan 2025 | How can teachers support students through exams? | Cadmus | Teaching & Learning | `/news/how-can-teachers-support-students-through-exams/` | The challenges of hybrid learning continue to be felt this upcoming exam period. Here are some tips for educat… | `1754475527-vector_layer-1.jpg` 1388x908 **missing** |
| 31 | Oct 2024 | How the University of Melbourne moved to digital in-place exams at scale | Bess Brennan, Chief Marketing Office, Cadmus | Exam Alternatives, Leadership, Company | `/news/how-the-university-of-melbourne-moved-to-digital-in-place-exams-at-scale/` | Using Cadmus, the University of Melbourne has scaled up secure, on-campus digital assessments running tens of… | `1754570852-frame-1430106096.jpg` 1576x1189 **missing** |
| 32 | Jun 2024 | Using AI to think with students, not for them | Mary Curnock Cook CBS, Chair of the Emerge/Jisc HE Edtech Advisory Board, and Bess Brennan, Chief Marketing Officer, Cadmus | AI, Student Success, Leadership | `/news/using-ai-to-think-with-students-not-for-them/` | Amid growing AI adoption in higher education, forward-thinking institutions are reimagining assessment design… | `1753397173-image-container.jpg` 604x589 **missing** |
| 33 |  | The world’s leading universities invest in Cadmus to support student success in assessment with emergence of AI | Bess Brennan, Chief Marketing Officer, Cadmus |  | `/news/the-world-s-leading-universities-invest-in-cadmus-to-support-student-success-in-a/` | Cadmus is pleased to announce the finalisation of our latest investment round of $2M, supported by leading hig… | `1754331274-article-080523-01.jpg` 1100x600 **missing** |
| 34 |  | Cadmus’s established AI detection capabilities combat ChatGPT | Bess Brennan, Chief Marketing Officer, Cadmus | Product, Student Success, Academic Integrity, Company | `/news/cadmus-established-ai-detection-capabilities-combat-chatgpt/` | As the higher education sector implements solutions that mitigate students’ use of AI such as ChatGPT, Cadmus… | `1751704570-image-container-3.png` 792x594 **missing** |
| 35 |  | How Michael uses Cadmus for authentic connection with his students | Bess Brennan, Chief Marketing Officer, Cadmus | Product, Student Success | `/news/how-michael-uses-cadmus-for-authentic-connection-with-his-students/` | If you're looking to introduce your students to Cadmus, it's important to share the benefits of the platform w… | `1751704477-image-container-1.png` 792x594 **missing** |
| 36 |  | Identifying and mitigating risks of AI in authentic assessment practices | Herk Kailis, CEO + Founder, Cadmus | Academic Integrity, Student Success, Leadership | `/news/identifying-and-mitigating-risks-of-ai-in-authentic-assessment-practices/` | Within Cadmus, educators have access to real-time analytics, monitoring the process of students’ development o… | `1751282421-vector_layer.jpg` 925x605 **missing** |
| 37 |  | How do students benefit from using Cadmus? | Cadmus | Product | `/news/how-do-students-benefit-from-using-cadmus/` | If you're looking to introduce your students to Cadmus, it's important to share the benefits of the platform w… | `1754565531-adobestock_1198309077.jpg` 4128x2752 **missing** |
| 38 |  | 3 tips for introducing students to Cadmus | Cadmus | Teaching & Learning | `/news/3-tips-for-introducing-students-to-cadmus/` | We've put together a few ideas for ensuring your students have a successful experience using Cadmus in their u… | `1754569023-frame-1430106076.jpg` 1543x1159 **missing** |
| 39 |  | A student’s perspective: immersion & engagement in online learning | Cadmus | Student Success | `/news/a-students-perspective-immersion-engagement-in-online-learning/` | Student success depends largely on engagement and motivation. Here’s a student’s take on how even simple techn… | `1754547662-pexels-kampus-5940828.jpg` 2052x1368 **missing** |
| 40 |  | 4 ways Cadmus can save time and stress for large student cohorts | Jess Ashman, Head of Learning, Cadmus | Student Success | `/news/4-ways-cadmus-can-save-time-and-stress-for-large-student-cohorts/` | We recap the highlights from using Cadmus at Charles Sturt University, shared by three academics at the annual… | `1758858937-charles-sturt-university.jpg` 1400x931 **missing** |
| 41 |  | Unpacking rubrics: a guide to best practice and common types | Jess Ashman, Head of Learning, Cadmus | Teaching & Learning | `/news/unpacking-rubrics-a-guide-to-best-practice-and-common-types/` | Rubrics are critical for setting task expectations and providing rich feedback to students. Follow these tips… | `1754565818-pexels-vazhnik-7864534.jpg` 4096x2732  |
| 42 |  | The importance of support and teacher training in the rise of EdTech | Cadmus | Leadership | `/news/the-importance-of-support-and-teacher-training-in-the-rise-of-edtech/` | Successful EdTech implementations need thoughtful training to guide teachers towards success. Here are a few w… | `1754540305-getty-images-n1iez7woc1c-unsplash-1.jpg` 2485x1656 **missing** |
| 43 |  | Our top tips for students working in Cadmus | Cadmus | Product | `/news/our-top-tips-for-students-working-in-cadmus/` | Help your students get familiar with some of our best features so they can get the most out of their time work… | `1758867088-the-university-of-melbourne.jpg` 1000x667 **missing** |
| 44 |  | Using Cadmus to support students affected by COVID-19 | Cadmus | Assessment Design | `/news/using-cadmus-to-support-students-affected-by-covid-19/` | We're sharing some practical ideas and examples for using Cadmus to support students through this online teach… | `1758864866-the-9th-coworking-qeagaujw_fw-unsplash-1-min-2.jpg` 5516x3957 **missing** |
| 45 |  | Scaffolding strategies to guide student learning | Cadmus | Teaching & Learning | `/news/scaffolding-strategies-to-guide-student-learning/` | We all want our students to feel supported in their learning. Here are a few ways you can use scaffolding to h… | `1758211315-adobestock_577860219-1.png` 1658x1044 **missing** |
| 46 |  | Academic integrity with Cadmus | Cadmus | Teaching & Learning | `/news/academic-integrity-with-cadmus/` | Academic Integrity can sometimes be hard to define or understand. Keep reading to learn how Cadmus supports yo… | `1758868347-winthrop-hall-uwa.jpg` 1440x807 **missing** |
| 47 |  | Cadmus templates explained | Cadmus | Product | `/news/cadmus-templates-explained/` | Our templates are designed to help you create best practice assignment instructions. Learn how you can use the… | `1759383331-templates-2x.webp` 1300x866 **missing** |
| 48 |  | Support at Cadmus | Cadmus | Company | `/news/support-at-cadmus/` | Our Support Team help our users get the most out of using Cadmus. Learn more about how they work and their com… | `1759384951-slide-74-1-11zon.jpg` 6720x4480 **missing** |
| 49 |  | 4 benefits of using Cadmus for more than exam alternatives | Cadmus | Product, Exam Alternatives | `/news/4-benefits-of-using-cadmus-for-more-than-exam-alternatives/` | Make the most of every assessment in your subject. See how valuable Cadmus can be for in-semester tasks — not… | `1754566396-kateryna-hliznitsova-ylacfjwry6c-unsplash.jpg` 2961x1977  |
| 50 |  | Can your technology choices create better online learning spaces? | Brigitte Elliott, Co-CEO, Cadmus | Leadership | `/news/can-your-technology-choices-create-better-online-learning-spaces/` | Most of the learning technologies adopted during the pandemic focus on workflows, not pedagogical improvement.… | `1759387127-pexels-thisisengineering-3861963-1-11zon.jpg` 7952x5304 **missing** |
| 51 |  | Choosing the right assessment platform | Cadmus | Product | `/news/choosing-the-right-assessment-platform/` | What is an online assessment platform? Which is best for your university? We take a look at assessment platfor… | `1754566145-image-container02.png` 780x585 **missing** |
| 52 |  | Designing assessment templates with Jess Ashman | Jess Ashman, Head of Learning (AU), Cadmus | Assessment Design | `/news/designing-assessment-templates-with-jess-ashman/` | Learn more about how we create assessment templates for academics. Our Learning Support Manager, Jess, talks u… | `1759383331-templates-2x.webp` 1300x866 **missing** |
| 53 |  | What is assessment for learning? | Cadmus | Teaching & Learning | `/news/what-is-assessment-for-learning/` | We go back to basics, breaking down the principles behind assessment for learning and how universities can emb… | `1754472821-screenshot-2025-02-13-at-5-07-44-pm-3.jpg` 1796x845 **missing** |
| 54 |  | Student perspectives on online learning | Cadmus | Student Success | `/news/student-perspectives-on-online-learning/` | We've taken a deeper look at how students are feeling about online learning, pulling together student feedback… | `1754565281-kateryna-hliznitsova-ye7hwgyte4a-unsplash.jpg` 3008x2008 **missing** |
| 55 |  | 5 features your assessment platform needs to support learning | Cadmus |  | `/news/5-features-your-assessment-platform-needs-to-support-learning/` | Assessment platforms need to provide more than just workflow benefits. We break down the functionality you nee… | `1753397204-image-container-1.jpg` 604x589 **missing** |
| 56 |  | Lessons on privacy, proctoring, and online exams | Cadmus | Leadership | `/news/lessons-on-privacy-proctoring-and-online-exams/` | Despite what these tools may claim, remote invigilation isn’t the only answer to upholding academic integrity… | `1754565818-pexels-vazhnik-7864534.jpg` 4096x2732  |
| 57 |  | Cadmus joins AWS EdStart | Cadmus | Company | `/news/cadmus-joins-aws-edstart/` | We're excited to announce that Cadmus is a member of the AWS EdStart Accelerator Program, providing us with te… | `1759467250-article-290121-main.jpg` 1100x600 **missing** |
| 58 |  | Introducing Cadmus Insights | Cadmus | Product | `/news/introducing-cadmus-insights/` | Access up-to-date learning analytics from the all new Insights page in Cadmus. Understand student engagement r… | `1751282453-frame-1321314721.jpg` 790x638 **missing** |
| 59 |  | Prioritising online teaching into China | Cadmus | Teaching & Learning | `/news/prioritising-online-teaching-into-china/` | If you’re an administrator, learning designer, or teacher, you’ll be feeling the pressure of developing online… | `1754540305-getty-images-n1iez7woc1c-unsplash-1.jpg` 2485x1656 **missing** |
| 60 |  | Say hello to the new teacher environment | Cadmus | Product | `/news/say-hello-to-the-new-teacher-environment/` | We've made improvements to the way you create and manage your assessments. Check out what's new in the Teacher… | `1754570624-frame-1430106089.jpg` 1576x1183 **missing** |
| 61 |  | Academic skills with international students | Cadmus | Teaching & Learning | `/news/academic-skills-with-international-students/` | How are you developing students' academic skills? We've got some practical tips and ideas for supporting stude… | `1754191896-image-container.jpg` 1196x1330 **missing** |
| 62 |  | Thinking about using Cadmus? | Cadmus | Product | `/news/thinking-about-using-cadmus/` | Don't take our word for it — see what other teachers have to say about using Cadmus in their subjects. They sh… | `1759474976-1752535456-frame-1430105485.avif` 1587x970 **missing** |
| 63 |  | 3 ways to improve scientific report assessments | Cadmus | Assessment Design | `/news/3-ways-to-improve-scientific-report-assessments/` | Academic Teaching Specialist, Rebecca Hull, shares her experiences and ideas around enhancing the delivery and… | `1754472851-screenshot-2025-02-13-at-5-07-44-pm-4.jpg` 1796x845 **missing** |
| 64 |  | The cost of a flawed approach to academic integrity | Herk Kailis, Co-CEO + Founder, Cadmus | Company | `/news/the-cost-of-a-flawed-approach-to-academic-integrity/` | Cadmus CEO and Founder, Herk Kailis, discusses the consequences of adopting a punitive attitude towards academ… | `1754472361-cadmus-event-june-2025-467-copy.jpg` 3063x2041 **missing** |
| 65 |  | How can we be more learning-oriented? | Cadmus | Teaching & Learning | `/news/how-can-we-be-more-learning-oriented/` | We give you an introduction to the ideas behind learning-orientation, including student engagement with feedba… | `1752370909-rectangle-3470759-1-1.jpg` 3110x1368 **missing** |
| 66 |  | How often do you assess your assessments? | Cadmus | Teaching & Learning | `/news/how-often-do-you-assess-your-assessments/` | By taking a broader approach to your teaching evaluation you can improve your assessments and empower students… | `1751793152-image-container-5.jpg` 780x585 **missing** |
| 67 |  | Can assessment boost student engagement? | Cadmus | Assessment Design | `/news/can-assessment-boost-student-engagement/` | Getting students to engage with their learning can be a challenge. Learn how assessment design can motivate st… | `1758869177-notre-dame-seng-jsr50508-edit-scaled.jpg` 2560x1708 **missing** |
| 68 |  | Step students through: scaffolded assessment With Cadmus | Cadmus | Assessment Design | `/news/step-students-through-scaffolded-assessment-with-cadmus/` | Scaffolding helps students feel supported through an assessment. By designing a learning journey for students… | `1753779521-image-container-3.jpg` 440x600 **missing** |
| 69 |  | Attitudes towards assessment: moving away from exams | Cadmus | Teaching & Learning | `/news/attitudes-towards-assessment-moving-away-from-exams/` | Assessment design shapes student learning. When we place all the focus on an end-of-semester exam, what does t… | `1752721263-exams-1.png` 798x575 **missing** |
| 70 |  | Using Cadmus to improve your assessments | Cadmus | Assessment Design | `/news/using-cadmus-to-improve-your-assessments/` | Moving your existing assignments into Cadmus is a great way to gain insight into how your students are working… | `1752719273-group-1073715737.png` 1019x828 **missing** |
| 71 |  | Summative meets formative: time-limited assessment in Cadmus | Cadmus | Assessment Design | `/news/summative-meets-formative-time-limited-assessment-in-cadmus/` | Who said summative assessments couldn't be formative, too? Learn how to use Cadmus to create authentic, time-l… | `1758869826-the-university-of-newcastle.jpg` 1280x540 **missing** |
| 72 |  | Keep students engaged: continuous assessment in Cadmus | Cadmus | Assessment Design | `/news/keep-students-engaged-continuous-assessment-in-cadmus/` | Working assessment into tutorials is a great way to facilitate ongoing student engagement. Keep reading to lea… | `1751282453-frame-1321314721.jpg` 790x638 **missing** |
| 73 | Jun 2026 | Lessons from working with leading global institutions: What it really takes to deliver assessment at scale | Jess Ashman, Director of Learning, Cadmus | Assessment Design, Teaching & Learning | `/news/lessons-from-working-with-leading-global-institutions/` | This article explores how the next opportunity in assessment reform lies in delivery: turning well-designed ap… | `1782398290-hero-image.avif` 1740x1160 **missing** |
| 74 | Jul 2026 | Reducing educator workload starts with assessment design | Cadmus | Teaching & Learning, Assessment Design | `/news/reducing-educator-workload-starts-with-assessment-design/` |  | `1783661168-reducing-educator-workload-starts-with-assessment-design-2.jpg` 5760x3840 **missing** |
| 75 | Jul 2026 | Greater visibility across the assessment journey | Cadmus | Product, Student Success, Feedback & Marking | `/news/greater-visibility-across-the-assessment-journey/` | This article explores how signs of student struggle —stalled drafts, uneven group participation—often emerge w… | `1784861908-h3hkka.jpeg` 1280x853 **missing** |
| 76 | Sep 2026 | Assessment, Ako and Assurance: Lessons from the Waikato Forum | Jess Ashman, Director of Learning, Cadmus | AI, Leadership, Student Success, Teaching & Learning | `/news/lessons-from-the-waikato-forum-2026/` | Assessment in higher education is coming back to design. The questions getting attention now are the old ones:… | `1790737626-lr-the-pa-university-of-waikato-03.webp` 2720x1700 **missing** |

### A.2 Case studies (36)
| # | title | categories | href | caption (truncated) | previewImage |
|---|---|---|---|---|---|
| 1 | The University of Notre Dame Australia Enables Agile Assurance of Learning at Scale | Student Success, Academic Integrity, Product | `/study/the-university-of-notre-dame-australia-enables-agile-assurance-of-learning/` | How the University of Notre Dame Australia is scaling integrity-led assessment across the institution, strengt… | `1774844499-sydney-campus-2023-648x400.jpg` 648x400 **missing** |
| 2 | How Larissa Strengthened Integrity and Confidence in Large-Scale Nursing Assessment | Student Success, Hybrid Learning | `/study/how-larissa-strengthened-integrity-and-confidence-in-large-scale-nursing-assessment/` | For Larissa Cameron, Lecturer in the School of Nursing, Midwifery and Paramedicine, delivering assessment in M… | `1776990049-myhc_368026.jpg` 1440x1024 **missing** |
| 3 | Toi Ohomai Institute of Technology Makes Group Work Visible, Accountable, and Teachable | Student Success, Product | `/study/toi-ohomai-makes-group-work-visible-accountable-teachable/` | At Toi Ohomai Institute of Technology, group work was redesigned to move beyond final submission and focus on… | `1776743411-5f6d0e92b356479ea966a471_toi-ohomai-2.jpg` 1350x900 **missing** |
| 4 | Queen Mary University of London transforms assessment for the AI era | Student Success | `/study/queen-mary-university-of-london-transforms-assessment-for-the-ai-era/` | How QMUL is redesigning assessment for the AI era improving student outcomes, increasing engagement, and scali… | `1776663347-discover-banner-image.jpg` 1000x667 **missing** |
| 5 | How Stephen Uses Cadmus to Strengthen Team-Based Assessment in Health & Medical Sciences | Student Success, Hybrid Learning | `/study/how-stephen-strengthened-team-based-assessment-in-medicine/` | For Stephen Bested, Program Coordinator in Postgraduate Health and Medical Sciences at The University of Notre… | `1774844499-sydney-campus-2023-648x400.jpg` 648x400 **missing** |
| 6 | How Michelle Strengthened Reflective Assessment in Education | Student Success, Hybrid Learning | `/study/how-michelle-strengthened-reflective-assessment-in-education/` | For Michelle Hilton-Moon, National Lead for Professional Experience in the School of Education at The Universi… | `1758869181-notre-dame-seng-jsr50508-edit-scaled.jpg` 2560x1708 **missing** |
| 7 | How Kosta Strengthened Authentic Assessment in Social Justice | Student Success, Hybrid Learning | `/study/how-kosta-strengthened-authentic-assessment-in-social-justice/` | For Kosta Lucas, Lecturer in Social Justice at The University of Notre Dame Australia, embedding authentic, mu… | `1770945985-final-0769-805x858.jpg` 805x858 **missing** |
| 8 | Zayed University Leads Assessment Innovation with Integrity-Assured Digital Learning | Student Success, Academic Integrity | `/study/zayed-university-assessment-innovation/` | Zayed University transforms assessment with Cadmus, strengthening integrity, boosting student engagement, and… | `1763420379-rankings22_l.jpg` 1500x924 **missing** |
| 9 | Bond University Increases Student Support While Decreasing Educator Workload | Student Success, Academic Integrity | `/study/bond-university-increases-student-support/` | Bond University scales authentic assessment with Cadmus, boosting student success and reducing educator worklo… | `1758865826-bond-university-1-min.jpg` 3436x2290 **missing** |
| 10 | The University of Melbourne Runs In-Place, Digital Exams at Scale in Exam Halls | Exam Alternatives | `/study/the-university-of-melbourne-runs-in-place-digital-exams-at-scale-in-exam-halls/` | The University of Melbourne (UoM) implemented in-place digital exams at scale using co-designed Cadmus pedagog… | `1758867088-the-university-of-melbourne.jpg` 1000x667 **missing** |
| 11 | The University of Western Australia Runs In-Place Digital Exams in Lecture Theatres | Exam Alternatives | `/study/the-university-of-western-australia-runs-in-place-digital-exams/` | The University of Western Australia partners with Cadmus to pilot in-person digital exams using students’ own… | `1757993855-imgbtn_campustours.jpg` 792x576 **missing** |
| 12 | The University of Notre Dame Runs In-Place Digital Exams in Tutorial Rooms | Exam Alternatives | `/study/the-university-of-notre-dame-runs-in-place-digital-exams/` | The University of Notre Dame Australia enhanced academic integrity and student experience by using Cadmus to d… | `1758869177-notre-dame-seng-jsr50508-edit-scaled.jpg` 2560x1708 **missing** |
| 13 | The University of Newcastle Delivers In-Place, Invigilated Digital Exams in Computer Labs | Exam Alternatives | `/study/the-university-of-newcastle-delivers-in-place-invigilated-digital-exams-in-comput/` | The University of Newcastle, Australia (UoN) piloted Cadmus’s in-place, invigilated digital exam functionality… | `1758869826-the-university-of-newcastle.jpg` 1280x540 **missing** |
| 14 | The University of Notre Dame | Exam Alternatives, Hybrid Learning | `/study/case-study-the-university-of-notre-dame/` | The University of Notre Dame Australia partnered with Cadmus to deliver secure in-place digital exams, achievi… | `1754570799-frame-1430106095.jpg` 1573x1174 **missing** |
| 15 | Edith Cowan University | Exam Alternatives, Academic Integrity | `/study/case-study-edith-cowan-university/` | Through COVID-19, Edith Cowan University decided to move away from exams and online proctoring, instead using… | `1752372581-image-container.jpg` 1188x891 **missing** |
| 16 | The University of Manchester Transitions to Hybrid Learning and Assessment with Cadmus | Product, Student Success | `/study/case-study-the-university-of-manchester/` | The University of Manchester partnered with Cadmus to transition 65 academic units to hybrid assessment, impro… | `1754422014-the-university-of-manchester-min_1219152588.jpg` 1048x700 **missing** |
| 17 | Charles Sturt University | Student Success, Product | `/study/case-study-charles-sturt-university/` | Through a first-year retention project, Charles Sturt University used Cadmus to create supportive assessment e… | `1754569023-frame-1430106076.jpg` 1543x1159 **missing** |
| 18 | How Ross Uses Cadmus for Engaging Assessment Alternatives | Student Success, Hybrid Learning | `/study/teacher-stories-ross-monaghan/` | Ross  Monaghan from Deakin University shares how he transformed a traditional assessment into an innovative “e… | `1754569087-frame-1430106077.jpg` 1568x1178 **missing** |
| 19 | The University of Melbourne | Academic Integrity, Student Success | `/study/case-study-the-university-of-melbourne-enhancing-digital-quality/` | With ambitious goals to transform the digital learning experience for students, The University of Melbourne im… | `1754570100-frame-1430106078.jpg` 1567x1180 **missing** |
| 20 | How Paul Uses Cadmus to Continually Improve Assessments | Student Success, Hybrid Learning | `/study/teacher-stories-paul-jensen/` | Deputy Dean Paul Jensen of the University of Melbourne reflects on how effortlessly transitioning a take‑home… | `1754570155-frame-1430106079.jpg` 1570x1180 **missing** |
| 21 | How Sheona Thomson Uses Cadmus to Provide Regular Feedback to Students | Student Success, Hybrid Learning | `/study/teacher-stories-sheona-thomson/` | Senior Lecturer Sheona Thomson from QUT’s School of Design describes how shifting from a flawed journal tool t… | `1754570253-frame-1430106080.jpg` 1570x1177 **missing** |
| 22 | How Alice Uses Cadmus to Take a Learning-Centred Approach to Plagiarism | Academic Integrity, Student Success | `/study/teacher-stories-alice-payne/` | Alice Payne from Queensland University of Technology transformed the integrity and learning outcomes in her de… | `1754570293-frame-1430106081.jpg` 1567x1180 **missing** |
| 23 | How Michael Uses Cadmus to Easily Manage Multiple Assessments | Product | `/study/teacher-stories-michael-vitale/` | At the University of Melbourne, Michael Vitale revolutionized assessment in his class using Cadmus, moving fro… | `1754570395-frame-1430106082.jpg` 1567x1180 **missing** |
| 24 | How Andrew Ewing Uses Cadmus to Reflect on His Teaching Using Learning Analytics | Hybrid Learning, Product | `/study/teacher-stories-andrew-ewing/` | At Edith Cowan University, Andrew Ewing leveraged Cadmus and its learning‑analytics dashboard to rethink how s… | `1754570425-frame-1430106083.jpg` 1568x1180 **missing** |
| 25 | How Megan Lloyd Uses Cadmus to Develop Her Students' Scientific Writing Skills | Student Success | `/study/teacher-stories-megan-lloyd/` | Using Cadmus, Megan Lloyd transformed lab-based science assignments into a semester-long scaffolded sequence t… | `1754570462-frame-1430106084.jpg` 1567x1192 **missing** |
| 26 | How Lois Balmer Uses Cadmus to Shift Thinking From Final Product to Process | Student Success | `/study/teacher-stories-lois-balmer/` | At Edith Cowan University, Lois Balmer adopted Cadmus to replace lab books with an online, process-driven work… | `1754570495-frame-1430106085.jpg` 1567x1192 **missing** |
| 27 | How Gina Richards Uses Cadmus to Scaffold Assessments to Support Students | Student Success, Exam Alternatives | `/study/teacher-stories-gina-richards/` | Gina Richards at Edith Cowan University uses Cadmus to break a single essay into a scaffolded three‑part assig… | `1754570529-frame-1430106086.jpg` 1568x1192 **missing** |
| 28 | How Loretta Smith Uses Cadmus to Focus and Track Student Engagement | Student Success | `/study/teacher-stories-loretta-smith/` | At QUT, Loretta Smith turned Cadmus into a classroom focal point: students loved the centralized layout, tutor… | `1754570555-frame-1430106087.jpg` 1580x1183 **missing** |
| 29 | How Trisha Downing Uses Cadmus to Deliver Assessments to 2000 Students | Exam Alternatives | `/study/teacher-stories-trisha-downing/` | At the University of Melbourne, Trisha Downing scaled Cadmus across a massive cohort, using scaffolded deliver… | `1754570590-frame-1430106088.jpg` 1580x1183 **missing** |
| 30 | How Andrew Zur Uses Cadmus to Streamline the Assessment Experience | Exam Alternatives | `/study/teacher-stories-andrew-zur/` | Andrew Zur at the University of Melbourne streamlined the assessment experience using Cadmus delivering course… | `1754570624-frame-1430106089.jpg` 1576x1183 **missing** |
| 31 | How Jenny Kaighin Uses Cadmus to Support Development of Academic Skills | Student Success | `/study/teacher-stories-jenny-kaighin/` | Using Cadmus, Jenny Kaighin transformed first-year assessment delivery—students embraced the intuitive writing… | `1754570652-frame-1430106090.jpg` 1580x1183 **missing** |
| 32 | RMIT University | Exam Alternatives | `/study/rmit-university/` | RMIT University partners with Cadmus to scale authentic assessment, leading to over 16,800 submissions, higher… | `1754570679-frame-1430106091.jpg` 1570x1183 **missing** |
| 33 | The University of Western Australia | Academic Integrity | `/study/case-study-the-university-of-western-australia/` | The University of Western Australia partnered with Cadmus to reform assessment design and strengthen academic… | `1754570715-frame-1430106092.jpg` 1475x1111 **missing** |
| 34 | The University of Canberra | Student Success, Hybrid Learning | `/study/case-study-the-university-of-canberra/` | The University of Canberra partnered with Cadmus to support diverse student success through inclusive, digital… | `1754570737-frame-1430106093.jpg` 1576x1174 **missing** |
| 35 | The University of Newcastle | Exam Alternatives, Hybrid Learning | `/study/case-study-the-university-of-newcastle/` | The University of Newcastle piloted Cadmus’s in-place digital exams across law students, achieving a positive… | `1754570764-frame-1430106094.jpg` 1573x1174 **missing** |
| 36 | The University of Melbourne | Student Success, Exam Alternatives | `/study/case-study-the-university-of-melbourne-digital-exams/` | Discover how The University of Melbourne partnered with Cadmus to deliver over 39,000 digital exams—achieving… | `1754570852-frame-1430106096.jpg` 1576x1189 **missing** |

### A.3 Teaching guides (13)
| # | title | href | previewImage |
|---|---|---|---|
| 1 | What is 'Best Practice' Assessment? | `/guides/what-is-best-practice-assessment/` | `1754564494-image-container.png` 781x585 **missing** |
| 2 | Understanding Cadmus Templates | `/guides/understanding-cadmus-templates/` | `1751793152-image-container-5.jpg` 780x585 **missing** |
| 3 | Marking and Moderation with Groups | `/guides/marking-and-moderation-with-groups/` | `1751793170-image-container-4.jpg` 780x585 **missing** |
| 4 | Using Cadmus Insights to Support Your Teaching | `/guides/using-insights-to-support-your-teaching/` | `1751793187-image-container-3.jpg` 780x585 **missing** |
| 5 | Provide Extra Support with Resources | `/guides/provide-extra-support-with-resources/` | `1751793205-image-container-2.jpg` 523x392 **missing** |
| 6 | Managing Your Class Pre-Submission | `/guides/managing-your-class-pre-submission/` | `1751793220-image-container-1.jpg` 523x392 **missing** |
| 7 | Using Cadmus Analytics | `/guides/using-cadmus-analytics/` | `1751793234-image-container.jpg` 523x392 **missing** |
| 8 | Your Pre-Release Checklist | `/guides/your-pre-release-checklist/` | `1754566275-image-container03.png` 780x585 **missing** |
| 9 | Embed More Learning Into Assessments | `/guides/embed-more-learning-into-assessments/` | `1754565937-image-containervs.png` 1560x1170 **missing** |
| 10 | Creating Your First Cadmus Assessment | `/guides/creating-your-first-cadmus-assessment/` | `1754566145-image-container02.png` 780x585 **missing** |
| 11 | Using Drafts for Formative Feedback | `/guides/using-drafts-for-formative-feedback/` | `1754565091-image-container-1.png` 1560x1170 **missing** |
| 12 | Effective Feedback Ideas with Cadmus | `/guides/effective-feedback-ideas-with-cadmus/` | `1754565090-image-container-3.png` 1560x1170 **missing** |
| 13 | Principles of Good Feedback | `/guides/principles-of-good-feedback/` | `1754565090-image-container-5.png` 1560x1170 **missing** |

### A.4 Videos (33; `guideType` teacher=24, student=5, unlisted=4 — unlisted are not rendered on /video-tutorials)
| # | guideType | position | title | duration | href | thumbnail |
|---|---|---|---|---|---|---|
| 1 | teacher | 1 | Intro into Cadmus | 3:50 | `/video/intro-into-cadmus/` | `1754558192-vimeo-cover-image.png` 2880x1620 **missing** |
| 2 | teacher | 8 | Setting Up |  | `/video/setting-up/` | `1754558192-vimeo-cover-image-3.png` 2880x1620 **missing** |
| 3 | teacher | 9 | Grading and Feedback |  | `/video/grading-and-feedback/` | `1754558192-vimeo-cover-image-1.png` 2880x1620 **missing** |
| 4 | teacher | 10 | Insights |  | `/video/insights/` | `1754558192-vimeo-cover-image-2.png` 2880x1620 **missing** |
| 5 | teacher | 11 | Accessing Cadmus (Canvas) | 1:49 | `/video/accessing-cadmus-canvas/` | `1754570085-vimeo-cover-image-1.png` 2880x1620 **missing** |
| 6 | teacher | 12 | Accessing Cadmus (Blackboard) | 1.57 | `/video/accessing-cadmus-blackboard/` | `1754570115-vimeo-cover-image-2.png` 2880x1620 **missing** |
| 7 | teacher | 13 | Accessing Cadmus (D2L) | 1:29 | `/video/accessing-cadmus-d2l/` | `1754570147-vimeo-cover-image-3.png` 2880x1620 **missing** |
| 8 | teacher | 14 | Accessing Cadmus (Moodle) | 1:37 | `/video/accessing-cadmus-moodle/` | `1754570170-vimeo-cover-image-4.png` 2880x1620 **missing** |
| 9 | student | 15 | Intro to the Student Environment |  | `/video/intro-to-the-student-environment/` | `1754563263-vimeo-cover-image.png` 1920x1080 **missing** |
| 10 | student | 16 | Submitting |  | `/video/submitting/` | `1754563263-vimeo-cover-image-1.png` 1920x1080 **missing** |
| 11 | student | 17 | Grades and Feedback |  | `/video/grades-and-feedback/` | `1754563263-vimeo-cover-image-2.png` 1920x1080 **missing** |
| 12 | student | 18 | Why should I work in Cadmus? |  | `/video/why-should-i-work-in-cadmus/` | `1754563263-vimeo-cover-image-3.png` 1920x1080 **missing** |
| 13 | student | 19 | Completing Exams in Cadmus |  | `/video/getting-started-for-students/` | `1754563263-vimeo-cover-image-4.png` 1920x1080 **missing** |
| 14 | teacher | 20 | Requirements (Canvas) | 2:36 | `/video/requirements-canvas/` | `1754570249-vimeo-cover-image.png` 2880x1620 **missing** |
| 15 | teacher | 21 | Requirements (Blackboard, Moodle, D2L) | 2:29 | `/video/requirements-blackboard-moodle-d2l/` | `1754570249-vimeo-cover-image-1.png` 2880x1620 **missing** |
| 16 | teacher | 22 | Instructions | 1:25 | `/video/instructions/` | `1754570248-vimeo-cover-image-2.png` 2880x1620 **missing** |
| 17 | teacher | 23 | Customising Templates | 3:37 | `/video/customising-templates/` | `1754570249-vimeo-cover-image-3.png` 2880x1620 **missing** |
| 18 | teacher | 24 | Resources | 1:02 | `/video/resources/` | `1754570248-vimeo-cover-image-4.png` 2880x1620 **missing** |
| 19 | teacher | 25 | Releasing and Editing | 00:53 | `/video/releasing-and-editing/` | `1754570248-vimeo-cover-image-5.png` 2880x1620 **missing** |
| 20 | teacher | 26 | Drafting | 1:14 | `/video/drafting/` | `1754570248-vimeo-cover-image-6.png` 2880x1620 **missing** |
| 21 | teacher | 27 | Setting up Exams | 6:29 | `/video/setting-up-exams/` | `1754570248-vimeo-cover-image-7.png` 2880x1620 **missing** |
| 22 | teacher | 28 | Introducing Students to Cadmus | 3:32 | `/video/introducing-students-to-cadmus/` | `1754572178-vimeo-cover-image.png` 2880x1620 **missing** |
| 23 | teacher | 29 | Marking with Turnitin and Cadmus | 2:04 | `/video/marking-with-turnitin-and-cadmus/` | `1754570647-vimeo-cover-image.png` 2880x1620 **missing** |
| 24 | teacher | 30 | Marking with Speedgrader + Cadmus | 2:04 | `/video/marking-with-speedgrader-cadmus/` | `1754570647-vimeo-cover-image-2.png` 2880x1620 **missing** |
| 25 | teacher | 31 | Anonymous Marking | 1:13 | `/video/anonymous-marking/` | `1754570648-vimeo-cover-image-3.png` 2880x1620 **missing** |
| 26 | teacher | 32 | Setting up Groups | 1:29 | `/video/setting-up-groups/` | `1754570648-vimeo-cover-image-4.png` 2880x1620 **missing** |
| 27 | teacher | 33 | Importing Groups from a Spreadsheet | 2:17 | `/video/importing-groups-from-a-spreadsheet/` | `1754570647-vimeo-cover-image-5.png` 2880x1620 **missing** |
| 28 | teacher | 34 | Using Activity Reports for Academic Integrity | 3:53 | `/video/using-activity-reports-for-academic-integrity/` | `1754571623-vimeo-cover-image-1.png` 2880x1620 **missing** |
| 29 | teacher | 35 | Using Assessment Reports for Academic Integrity | 5:52 | `/video/using-assessment-reports-for-academic-integrity/` | `1754571623-vimeo-cover-image-2.png` 2880x1620 **missing** |
| 30 | unlisted | 36 |  | 30 minutes | `/video/mitigating-course-repetition-x-student-success/` | `1758249972-02.png` 3840x2160 **missing** |
| 31 | unlisted | 37 | Cadmus Presents: Student Success at Scale – How Leading Business Schools Harness Cadmus for Outcomes. |  | `/video/aacsb-conference-snapshot/` | `1758170009-aacsb-video-frame.png` 1062x589 **missing** |
| 32 | unlisted | 39 | King's College London x Cadmus Teaching & Learning Forum |  | `/video/kcl-teaching-learning-forum/` | `1754637423-download.png` 2880x1620  |
| 33 | unlisted | 40 | AACSB x Cadmus: Student Success at Scale: How Leading Business Schools Harness Cadmus for Outcomes |  | `/video/aacsb-student-success-at-scale/` | `1758521431-screenshot-2025-09-22-at-3-33-19-pm.png` 1442x812 **missing** |
