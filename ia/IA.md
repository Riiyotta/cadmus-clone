# cadmus.io clone: information architecture

Source: Local React + Vite clone at /Users/riyaghosh/V3/cadmus (src/routes.jsx, src/pages/**); specs/*.md and CLONE_SPEC.md as secondary reference
Status: **measured-from-code** · production approved: **false**
181 routes · 24 templates · 80 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (News article, Case study article, Video tutorial) account for 145 of 181 routes (80%). The remaining 36 routes span 21 templates.

| template | routes | share |
|---|---:|---:|
| News article | 76 | 42% |
| Case study article | 36 | 20% |
| Video tutorial | 33 | 18% |
| Teaching guide article | 13 | 7% |
| Product page (study variant) | 4 | 2% |
| Homepage | 1 | 1% |
| Product page (study + overview variant) | 1 | 1% |
| Product page (oral variant) | 1 | 1% |
| Product overview | 1 | 1% |
| Pricing | 1 | 1% |
| Solutions: universities | 1 | 1% |
| Solutions: educators | 1 | 1% |
| Solutions: students | 1 | 1% |
| About | 1 | 1% |
| Careers | 1 | 1% |
| Contact | 1 | 1% |
| Request demo | 1 | 1% |
| Trust centre | 1 | 1% |
| News listing | 1 | 1% |
| Case studies listing | 1 | 1% |
| Teacher guides listing | 1 | 1% |
| Video tutorials listing | 1 | 1% |
| ROI study | 1 | 1% |
| Privacy policy (information) | 1 | 1% |

## Page chrome

**181 routes carry chrome = `full`** — Homepage, Product page (study variant), Product page (study + overview variant), Product page (oral variant), Product overview, Pricing, Solutions: universities, Solutions: educators, Solutions: students, About, Careers, Contact, Request demo, Trust centre, News listing, Case studies listing, Teacher guides listing, Video tutorials listing, News article, Case study article, Teaching guide article, Video tutorial, ROI study, Privacy policy (information).

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.header` | SHELL | 24 | 181 | `src/components/Header.jsx` | Mounted by App.jsx above the page transition on every route: 181 routes. |
| `shell.footer` | SHELL | 24 | 181 | `src/components/Footer.jsx` | Mounted by App.jsx after main on every route: 181 routes. |
| `article.hero` | ARTICLE | 3 | 125 | `src/pages/content/sections/Article.jsx > ArticleHero` | News, case-study and guide detail routes: 125 routes. |
| `article.body` | ARTICLE | 3 | 125 | `src/pages/content/sections/RichBody.jsx; fallback src/pages/content/sections/Article.jsx > ArticleBody` | News, case-study and guide detail routes: 125 routes. |
| `article.categories` | ARTICLE | 3 | 125 | `src/pages/content/sections/Article.jsx > Categories` | News, case-study and guide detail routes: 125 routes. |
| `article.more-row` | ARTICLE | 3 | 125 | `src/pages/content/sections/Article.jsx > MoreRow` | News, case-study and guide detail routes: 125 routes. |
| `article.share-download` | ARTICLE | 2 | 112 | `src/pages/content/sections/ShareBar.jsx > ShareWithDownload` | News and case-study detail routes: 112 routes. |
| `article.highlights` | ARTICLE | 1 | 36 | `src/pages/content/sections/Article.jsx > Highlights` | Case-study detail routes: 36 routes. |
| `article.video-detail` | ARTICLE | 1 | 33 | `src/pages/content/sections/VideoDetail.jsx` | Video detail routes, listed and unlisted: 33 routes. |
| `content.two-column-rows` | CONTENT | 11 | 14 | `src/components/TwoColumnRows.jsx` | Homepage, all product pages, product overview, the solutions pages, about, careers and contact: 14 routes. |
| `article.share` | ARTICLE | 1 | 13 | `src/pages/content/sections/ShareBar.jsx > ShareOnly` | Guide detail routes: 13 routes. |
| `conversion.cta-band` | CONVERSION | 8 | 11 | `src/sections/Cta.jsx` | All product pages, the solutions pages, about and careers: 11 routes. |
| `hero.product-split` | HERO | 5 | 8 | `src/sections/ProductHero.jsx` | All product pages (product scheme) and the educators and students solutions pages (brand scheme): 8 routes. |
| `content.feature-grid` | CONTENT | 4 | 7 | `src/components/WhyChoose.jsx (variant=feature)` | All product pages and the product overview: 7 routes. |
| `proof.quote-carousel` | PROOF | 4 | 7 | `src/sections/QuoteCarousel.jsx` | The five non-oral product pages, educators and students: 7 routes. |
| `content.why-choose` | CONTENT | 5 | 5 | `src/components/WhyChoose.jsx (variant=default)` | Homepage, universities, educators, students and contact: 5 routes. |
| `content.integrations` | CONTENT | 5 | 5 | `src/components/Integrations.jsx` | Homepage, product overview, pricing, universities and educators: 5 routes. |
| `proof.logo-marquee` | PROOF | 5 | 5 | `src/components/LogoMarquee.jsx` | Homepage, oral assessment, pricing, universities and about: 5 routes. |
| `proof.study-preview` | PROOF | 2 | 5 | `src/pages/product/sections/StudyPreview.jsx` | The five non-oral product pages: 5 routes. |
| `conversion.highlight-split` | CONVERSION | 2 | 5 | `src/sections/ImageCta.jsx (variant=split)` | The five non-oral product pages: 5 routes. |
| `proof.impact-counter` | PROOF | 4 | 4 | `src/components/ImpactCounter.jsx` | Homepage, pricing, about and careers (careers uses the wide row layout): 4 routes. |
| `content.values` | CONTENT | 3 | 3 | `src/sections/Values.jsx` | About, careers and trust centre (rendered twice on trust centre): 3 routes. |
| `conversion.image-cta-band` | CONVERSION | 3 | 3 | `src/sections/ImageCta.jsx (variant=section)` | News, case-studies and teacher-guides listings: 3 routes. |
| `hero.photo-banner` | HERO | 2 | 2 | `src/pages/company/sections/HeroBannerAlt.jsx (image set)` | Universities and careers: 2 routes. |
| `hero.title-banner` | HERO | 2 | 2 | `src/pages/company/sections/HeroBannerAlt.jsx (image omitted)` | Contact and request-demo: 2 routes. |
| `hero.small-banner` | HERO | 2 | 2 | `src/pages/company/sections/SmallHeroBanner.jsx; duplicate src/pages/content/sections/Information.jsx > SmallHeroBanner` | Trust centre and the privacy information page (two near-identical implementations exist): 2 routes. |
| `hero.listing-photo-card` | HERO | 2 | 2 | `src/pages/content/sections/HeroImageBanner.jsx (variant=card)` | Case-studies and teacher-guides listings: 2 routes. |
| `content.overview-image` | CONTENT | 2 | 2 | `src/components/Experience.jsx (variant=overview)` | Assignments and oral assessment product pages: 2 routes. |
| `content.solution-cards` | CONTENT | 2 | 2 | `src/components/SolutionCards.jsx (variant=default)` | Homepage and pricing: 2 routes. |
| `content.careers-card` | CONTENT | 2 | 2 | `src/components/Careers.jsx (defaults)` | Homepage and about: 2 routes. |
| `content.bullet-points` | CONTENT | 2 | 2 | `src/pages/company/sections/ContentWithBulletPoints.jsx` | Universities and students: 2 routes. |
| `content.intro-split` | CONTENT | 2 | 2 | `src/pages/company/sections/IntroSplit.jsx` | Careers and trust centre: 2 routes. |
| `proof.case-study` | PROOF | 2 | 2 | `src/components/CaseStudy.jsx` | Homepage and product overview: 2 routes. |
| `conversion.contact-form` | CONVERSION | 2 | 2 | `src/pages/company/sections/ContactForm.jsx` | Contact and request-demo: 2 routes. |
| `listing.chronicle` | LISTING | 2 | 2 | `src/components/Chronicle.jsx (columns=3)` | Homepage and about: 2 routes. |
| `listing.category-filter` | LISTING | 2 | 2 | `src/pages/content/sections/CategoryFilter.jsx` | News and case-studies listings: 2 routes. |
| `hero.home-banner` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only: 1 route. |
| `hero.image-centered` | HERO | 1 | 1 | `src/pages/product/sections/HeroImage.jsx` | Product overview only: 1 route. |
| `hero.about-banner` | HERO | 1 | 1 | `src/pages/company/sections/HeroBanner.jsx` | About only: 1 route. |
| `hero.news-banner` | HERO | 1 | 1 | `src/pages/content/sections/NewsBanner.jsx` | News listing only: 1 route. |
| `hero.listing-maroon` | HERO | 1 | 1 | `src/pages/content/sections/HeroImageBanner.jsx (variant=alt)` | Video-tutorials listing only: 1 route. |
| `hero.roi` | HERO | 1 | 1 | `src/pages/content/sections/Roi.jsx > RoiHero` | ROI study page only: 1 route. |
| `content.intro-carousel` | CONTENT | 1 | 1 | `src/components/Intro.jsx` | Homepage only: 1 route. |
| `content.connected-products` | CONTENT | 1 | 1 | `src/components/ConnectedProducts.jsx` | Homepage only: 1 route. |
| `content.support-cards` | CONTENT | 1 | 1 | `src/components/SolutionCards.jsx (variant=support)` | Students only: 1 route. |
| `content.mission-card` | CONTENT | 1 | 1 | `src/components/Careers.jsx (overline=null, flipped=false, button=null)` | About only: 1 route. |
| `content.partnership-image-card` | CONTENT | 1 | 1 | `src/components/Careers.jsx (imageCard props, ratio=2/1)` | Oral assessment product page only: 1 route. |
| `content.phase-release` | CONTENT | 1 | 1 | `src/pages/product/sections/PhaseRelease.jsx` | Oral assessment product page only: 1 route. |
| `content.single-column` | CONTENT | 1 | 1 | `src/pages/product/sections/SingleColumn.jsx` | Product overview only: 1 route. |
| `content.faq` | CONTENT | 1 | 1 | `src/pages/product/sections/Faq.jsx` | Pricing only: 1 route. |
| `content.delivery-types` | CONTENT | 1 | 1 | `src/pages/company/sections/DeliveryTypes.jsx` | Educators only: 1 route. |
| `content.expert-list` | CONTENT | 1 | 1 | `src/pages/company/sections/ExpertList.jsx` | Educators only: 1 route. |
| `content.timeline` | CONTENT | 1 | 1 | `src/pages/company/sections/Timeline.jsx` | About only: 1 route. |
| `content.reasons` | CONTENT | 1 | 1 | `src/pages/company/sections/Reasons.jsx` | Careers only: 1 route. |
| `content.leaders` | CONTENT | 1 | 1 | `src/pages/company/sections/Leaders.jsx` | Careers only: 1 route. |
| `content.policies` | CONTENT | 1 | 1 | `src/pages/company/sections/Policies.jsx` | Trust centre only: 1 route. |
| `content.roi-why` | CONTENT | 1 | 1 | `src/pages/content/sections/Roi.jsx > RoiWhy` | ROI study page only: 1 route. |
| `proof.roi-card` | PROOF | 1 | 1 | `src/components/RoiCard.jsx` | Homepage only (universities embeds a bare copy inside its case-study carousel): 1 route. |
| `proof.testimonials` | PROOF | 1 | 1 | `src/pages/product/sections/Testimonials.jsx` | Pricing only: 1 route. |
| `proof.case-study-carousel` | PROOF | 1 | 1 | `src/pages/company/sections/CaseStudyCarousel.jsx` | Universities only: 1 route. |
| `proof.team-quotes` | PROOF | 1 | 1 | `src/pages/company/sections/TeamQuotes.jsx` | Careers only: 1 route. |
| `proof.quote-banner` | PROOF | 1 | 1 | `src/sections/QuoteCard.jsx (variant=banner)` | ROI study page only: 1 route. |
| `media.experience-video` | MEDIA | 1 | 1 | `src/components/Experience.jsx (variant=default)` | Homepage only: 1 route. |
| `media.featured-video` | MEDIA | 1 | 1 | `src/components/FeaturedVideo.jsx` | Homepage only: 1 route. |
| `media.seamless-slide` | MEDIA | 1 | 1 | `src/pages/product/sections/SeamlessSlide.jsx` | Product overview only: 1 route. |
| `media.roi-video` | MEDIA | 1 | 1 | `src/pages/content/sections/Roi.jsx > RoiVideo` | ROI study page only: 1 route. |
| `pricing.plans-hero` | PRICING | 1 | 1 | `src/pages/product/sections/PricingHero.jsx` | Pricing only: 1 route. |
| `pricing.licence-row` | PRICING | 1 | 1 | `src/pages/product/sections/LicenceRow.jsx` | Pricing only: 1 route. |
| `pricing.getting-started` | PRICING | 1 | 1 | `src/pages/product/sections/GettingStarted.jsx` | Pricing only: 1 route. |
| `conversion.webinar-image-card` | CONVERSION | 1 | 1 | `src/components/Careers.jsx (imageCard2 props, ratio=2/1)` | Oral assessment product page only: 1 route. |
| `conversion.roi-form` | CONVERSION | 1 | 1 | `src/pages/content/sections/Roi.jsx > RoiForm` | ROI study page only: 1 route. |
| `listing.chronicle-two-col` | LISTING | 1 | 1 | `src/components/Chronicle.jsx (columns=2)` | Oral assessment product page only: 1 route. |
| `listing.positions` | LISTING | 1 | 1 | `src/pages/company/sections/Positions.jsx` | Careers only: 1 route. |
| `listing.news-grid` | LISTING | 1 | 1 | `src/pages/content/sections/CardGrid.jsx (variant=news) + src/pages/content/sections/Cards.jsx > NewsItemCard` | News listing only: 1 route. |
| `listing.study-grid` | LISTING | 1 | 1 | `src/pages/content/sections/CardGrid.jsx (variant=study) + src/pages/content/sections/Cards.jsx > StudyCard` | Case-studies listing only: 1 route. |
| `listing.study-popup` | LISTING | 1 | 1 | `src/pages/content/sections/CaseStudyPopup.jsx` | Case-studies listing only (desktop widths): 1 route. |
| `listing.guide-grid` | LISTING | 1 | 1 | `src/pages/content/sections/CardGrid.jsx (variant=guide) + src/pages/content/sections/Cards.jsx > GuideCard` | Teacher-guides listing only: 1 route. |
| `listing.guide-types` | LISTING | 1 | 1 | `src/pages/content/sections/GuideTypes.jsx` | Video-tutorials listing only: 1 route. |
| `listing.video-grid` | LISTING | 1 | 1 | `src/pages/content/Listings.jsx > VideoSection (CardGrid variant=video)` | Video-tutorials listing only (rendered once per audience): 1 route. |
| `article.information-body` | ARTICLE | 1 | 1 | `src/pages/content/sections/Information.jsx > InformationBody` | Privacy information page only: 1 route. |

**33 shared sections** appear in more than one template and belong in a component library.

**47 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Homepage — `template.home`

1 route · `/` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.home-banner` | page-local |
| 3 | CONTENT | `content.intro-carousel` | page-local |
| 4 | MEDIA | `media.experience-video` | page-local |
| 5 | CONTENT | `content.connected-products` | page-local |
| 6 | CONTENT | `content.why-choose` | shared ×5 |
| 7 | PROOF | `proof.impact-counter` | shared ×4 |
| 8 | PROOF | `proof.logo-marquee` | shared ×5 |
| 9 | PROOF | `proof.roi-card` | page-local |
| 10 | MEDIA | `media.featured-video` | page-local |
| 11 | CONTENT | `content.two-column-rows` | shared ×11 |
| 12 | CONTENT | `content.solution-cards` | shared ×2 |
| 13 | CONTENT | `content.integrations` | shared ×5 |
| 14 | PROOF | `proof.case-study` | shared ×2 |
| 15 | CONTENT | `content.careers-card` | shared ×2 |
| 16 | LISTING | `listing.chronicle` | shared ×2 |
| 17 | SHELL | `shell.footer` | shared ×24 |

### Product page (study variant) — `template.product`

4 routes · `/product/exams`, `/product/group-work`, `/product/learning-analytics`, `/product/marking-feedback` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.product-split` | shared ×5 |
| 3 | CONTENT | `content.feature-grid` | shared ×4 |
| 4 | CONVERSION | `conversion.highlight-split` | shared ×2 |
| 5 | PROOF | `proof.study-preview` | shared ×2 |
| 6 | CONTENT | `content.two-column-rows` | shared ×11 |
| 7 | PROOF | `proof.quote-carousel` | shared ×4 |
| 8 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 9 | SHELL | `shell.footer` | shared ×24 |

### Product page (study + overview variant) — `template.product-assignments`

1 route · `/product/assignments` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.product-split` | shared ×5 |
| 3 | CONTENT | `content.feature-grid` | shared ×4 |
| 4 | CONVERSION | `conversion.highlight-split` | shared ×2 |
| 5 | PROOF | `proof.study-preview` | shared ×2 |
| 6 | CONTENT | `content.overview-image` | shared ×2 |
| 7 | CONTENT | `content.two-column-rows` | shared ×11 |
| 8 | PROOF | `proof.quote-carousel` | shared ×4 |
| 9 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 10 | SHELL | `shell.footer` | shared ×24 |

### Product page (oral variant) — `template.product-oral`

1 route · `/product/oral_assessment` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.product-split` | shared ×5 |
| 3 | CONTENT | `content.feature-grid` | shared ×4 |
| 4 | CONTENT | `content.partnership-image-card` | page-local |
| 5 | CONTENT | `content.phase-release` | page-local |
| 6 | LISTING | `listing.chronicle-two-col` | page-local |
| 7 | CONTENT | `content.overview-image` | shared ×2 |
| 8 | CONTENT | `content.two-column-rows` | shared ×11 |
| 9 | CONVERSION | `conversion.webinar-image-card` | page-local |
| 10 | PROOF | `proof.logo-marquee` | shared ×5 |
| 11 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 12 | SHELL | `shell.footer` | shared ×24 |

### Product overview — `template.product-overview`

1 route · `/product-overview` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.image-centered` | page-local |
| 3 | CONTENT | `content.feature-grid` | shared ×4 |
| 4 | MEDIA | `media.seamless-slide` | page-local |
| 5 | CONTENT | `content.two-column-rows` | shared ×11 |
| 6 | CONTENT | `content.single-column` | page-local |
| 7 | CONTENT | `content.integrations` | shared ×5 |
| 8 | PROOF | `proof.case-study` | shared ×2 |
| 9 | SHELL | `shell.footer` | shared ×24 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | PRICING | `pricing.plans-hero` | page-local |
| 3 | PRICING | `pricing.licence-row` | page-local |
| 4 | PRICING | `pricing.getting-started` | page-local |
| 5 | CONTENT | `content.solution-cards` | shared ×2 |
| 6 | CONTENT | `content.integrations` | shared ×5 |
| 7 | PROOF | `proof.testimonials` | page-local |
| 8 | PROOF | `proof.impact-counter` | shared ×4 |
| 9 | PROOF | `proof.logo-marquee` | shared ×5 |
| 10 | CONTENT | `content.faq` | page-local |
| 11 | SHELL | `shell.footer` | shared ×24 |

### Solutions: universities — `template.solutions-universities`

1 route · `/solutions/universities` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.photo-banner` | shared ×2 |
| 3 | PROOF | `proof.logo-marquee` | shared ×5 |
| 4 | CONTENT | `content.why-choose` | shared ×5 |
| 5 | CONTENT | `content.two-column-rows` | shared ×11 |
| 6 | CONTENT | `content.bullet-points` | shared ×2 |
| 7 | CONTENT | `content.integrations` | shared ×5 |
| 8 | PROOF | `proof.case-study-carousel` | page-local |
| 9 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 10 | SHELL | `shell.footer` | shared ×24 |

### Solutions: educators — `template.solutions-educators`

1 route · `/solutions/educators` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.product-split` | shared ×5 |
| 3 | CONTENT | `content.why-choose` | shared ×5 |
| 4 | CONTENT | `content.delivery-types` | page-local |
| 5 | CONTENT | `content.two-column-rows` | shared ×11 |
| 6 | CONTENT | `content.expert-list` | page-local |
| 7 | CONTENT | `content.integrations` | shared ×5 |
| 8 | PROOF | `proof.quote-carousel` | shared ×4 |
| 9 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 10 | SHELL | `shell.footer` | shared ×24 |

### Solutions: students — `template.solutions-students`

1 route · `/solutions/students` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.product-split` | shared ×5 |
| 3 | CONTENT | `content.why-choose` | shared ×5 |
| 4 | CONTENT | `content.two-column-rows` | shared ×11 |
| 5 | CONTENT | `content.bullet-points` | shared ×2 |
| 6 | CONTENT | `content.support-cards` | page-local |
| 7 | PROOF | `proof.quote-carousel` | shared ×4 |
| 8 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 9 | SHELL | `shell.footer` | shared ×24 |

### About — `template.about`

1 route · `/about` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.about-banner` | page-local |
| 3 | PROOF | `proof.impact-counter` | shared ×4 |
| 4 | PROOF | `proof.logo-marquee` | shared ×5 |
| 5 | CONTENT | `content.values` | shared ×3 |
| 6 | CONTENT | `content.two-column-rows` | shared ×11 |
| 7 | CONTENT | `content.timeline` | page-local |
| 8 | CONTENT | `content.mission-card` | page-local |
| 9 | CONTENT | `content.careers-card` | shared ×2 |
| 10 | LISTING | `listing.chronicle` | shared ×2 |
| 11 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 12 | SHELL | `shell.footer` | shared ×24 |

### Careers — `template.careers`

1 route · `/careers` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.photo-banner` | shared ×2 |
| 3 | CONTENT | `content.intro-split` | shared ×2 |
| 4 | CONTENT | `content.reasons` | page-local |
| 5 | CONTENT | `content.two-column-rows` | shared ×11 |
| 6 | CONTENT | `content.values` | shared ×3 |
| 7 | CONTENT | `content.leaders` | page-local |
| 8 | PROOF | `proof.impact-counter` | shared ×4 |
| 9 | LISTING | `listing.positions` | page-local |
| 10 | PROOF | `proof.team-quotes` | page-local |
| 11 | CONVERSION | `conversion.cta-band` | shared ×8 |
| 12 | SHELL | `shell.footer` | shared ×24 |

### Contact — `template.contact`

1 route · `/contact` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.title-banner` | shared ×2 |
| 3 | CONTENT | `content.two-column-rows` | shared ×11 |
| 4 | CONVERSION | `conversion.contact-form` | shared ×2 |
| 5 | CONTENT | `content.why-choose` | shared ×5 |
| 6 | SHELL | `shell.footer` | shared ×24 |

### Request demo — `template.request-demo`

1 route · `/request-demo` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.title-banner` | shared ×2 |
| 3 | CONVERSION | `conversion.contact-form` | shared ×2 |
| 4 | SHELL | `shell.footer` | shared ×24 |

### Trust centre — `template.trust-centre`

1 route · `/trust-centre` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.small-banner` | shared ×2 |
| 3 | CONTENT | `content.intro-split` | shared ×2 |
| 4 | CONTENT | `content.policies` | page-local |
| 5 | CONTENT | `content.values` | shared ×3 |
| 6 | SHELL | `shell.footer` | shared ×24 |

### News listing — `template.news-listing`

1 route · `/news` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.news-banner` | page-local |
| 3 | LISTING | `listing.category-filter` | shared ×2 |
| 4 | LISTING | `listing.news-grid` | page-local |
| 5 | CONVERSION | `conversion.image-cta-band` | shared ×3 |
| 6 | SHELL | `shell.footer` | shared ×24 |

### Case studies listing — `template.case-studies-listing`

1 route · `/case-studies` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.listing-photo-card` | shared ×2 |
| 3 | LISTING | `listing.category-filter` | shared ×2 |
| 4 | LISTING | `listing.study-grid` | page-local |
| 5 | CONVERSION | `conversion.image-cta-band` | shared ×3 |
| 6 | LISTING | `listing.study-popup` | page-local |
| 7 | SHELL | `shell.footer` | shared ×24 |

### Teacher guides listing — `template.teacher-guides-listing`

1 route · `/teacher-guides` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.listing-photo-card` | shared ×2 |
| 3 | LISTING | `listing.guide-grid` | page-local |
| 4 | CONVERSION | `conversion.image-cta-band` | shared ×3 |
| 5 | SHELL | `shell.footer` | shared ×24 |

### Video tutorials listing — `template.video-tutorials-listing`

1 route · `/video-tutorials` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.listing-maroon` | page-local |
| 3 | LISTING | `listing.guide-types` | page-local |
| 4 | LISTING | `listing.video-grid` | page-local |
| 5 | SHELL | `shell.footer` | shared ×24 |

### News article — `template.news-detail`

76 routes · `/news/:slug` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | ARTICLE | `article.hero` | shared ×3 |
| 3 | ARTICLE | `article.share-download` | shared ×2 |
| 4 | ARTICLE | `article.body` | shared ×3 |
| 5 | ARTICLE | `article.categories` | shared ×3 |
| 6 | ARTICLE | `article.more-row` | shared ×3 |
| 7 | SHELL | `shell.footer` | shared ×24 |

### Case study article — `template.study-detail`

36 routes · `/study/:slug` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | ARTICLE | `article.hero` | shared ×3 |
| 3 | ARTICLE | `article.share-download` | shared ×2 |
| 4 | ARTICLE | `article.highlights` | page-local |
| 5 | ARTICLE | `article.body` | shared ×3 |
| 6 | ARTICLE | `article.categories` | shared ×3 |
| 7 | ARTICLE | `article.more-row` | shared ×3 |
| 8 | SHELL | `shell.footer` | shared ×24 |

### Teaching guide article — `template.guide-detail`

13 routes · `/guides/:slug` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | ARTICLE | `article.hero` | shared ×3 |
| 3 | ARTICLE | `article.share` | page-local |
| 4 | ARTICLE | `article.body` | shared ×3 |
| 5 | ARTICLE | `article.categories` | shared ×3 |
| 6 | ARTICLE | `article.more-row` | shared ×3 |
| 7 | SHELL | `shell.footer` | shared ×24 |

### Video tutorial — `template.video-detail`

33 routes · `/video/:slug` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | ARTICLE | `article.video-detail` | page-local |
| 3 | SHELL | `shell.footer` | shared ×24 |

### ROI study — `template.roi-study`

1 route · `/study/2026-Cadmus-ROI-study` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.roi` | page-local |
| 3 | CONTENT | `content.roi-why` | page-local |
| 4 | PROOF | `proof.quote-banner` | page-local |
| 5 | MEDIA | `media.roi-video` | page-local |
| 6 | CONVERSION | `conversion.roi-form` | page-local |
| 7 | SHELL | `shell.footer` | shared ×24 |

### Privacy policy (information) — `template.privacy`

1 route · `/information/privacy-policy-au` · chrome: **full**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×24 |
| 2 | HERO | `hero.small-banner` | shared ×2 |
| 3 | ARTICLE | `article.information-body` | page-local |
| 4 | SHELL | `shell.footer` | shared ×24 |

## Section reference

### SHELL

_App-level chrome mounted once in src/App.jsx around every route, outside any page component._

**`shell.header`** — Fixed site masthead: logo, desktop dropdown navigation, mobile accordion menu, header buttons.

· Mounted by App.jsx above the page transition on every route: 181 routes. · appears on 181 routes · implemented by `src/components/Header.jsx`

**`shell.footer`** — Maroon site footer with link columns and the large wordmark; sits inside PageTransition after main.

· Mounted by App.jsx after main on every route: 181 routes. · appears on 181 routes · implemented by `src/components/Footer.jsx`

### HERO

_The first block of a page: title-bearing banner or split hero that opens the route._

**`hero.home-banner`** — Homepage opening banner (HomepageBanner): headline, caption and actions over the homepage art.

· Homepage only: 1 route. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.product-split`** — Split hero: overline, h1 and body on the left, product image on the right, coloured by a scheme from schemes.js.

· All product pages (product scheme) and the educators and students solutions pages (brand scheme): 8 routes. · appears on 8 routes · implemented by `src/sections/ProductHero.jsx`

**`hero.image-centered`** — Maroon hero with centred h1 and caption above a contained product image.

· Product overview only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/HeroImage.jsx`

**`hero.photo-banner`** — Full-viewport maroon hero with a cover photo behind centred overline, h1, caption and optional scroll button.

· Universities and careers: 2 routes. · appears on 2 routes · implemented by `src/pages/company/sections/HeroBannerAlt.jsx (image set)`

**`hero.title-banner`** — Short maroon banner with spacer, centred h1 and caption, no image.

· Contact and request-demo: 2 routes. · appears on 2 routes · implemented by `src/pages/company/sections/HeroBannerAlt.jsx (image omitted)`

**`hero.about-banner`** — Tall maroon hero with a centred multi-line h1 above an edge-to-edge image strip.

· About only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/HeroBanner.jsx`

**`hero.small-banner`** — Compact maroon band with a single centred h1 between two spacers.

· Trust centre and the privacy information page (two near-identical implementations exist): 2 routes. · appears on 2 routes · implemented by `src/pages/company/sections/SmallHeroBanner.jsx; duplicate src/pages/content/sections/Information.jsx > SmallHeroBanner`

**`hero.news-banner`** — News index masthead: caption, large title and established-date line on maroon.

· News listing only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/NewsBanner.jsx`

**`hero.listing-photo-card`** — Listing hero with a cover photo behind a white card holding h1 and intro.

· Case-studies and teacher-guides listings: 2 routes. · appears on 2 routes · implemented by `src/pages/content/sections/HeroImageBanner.jsx (variant=card)`

**`hero.listing-maroon`** — Listing hero on maroon with decorative art, orange h1 and intro, no card or photo.

· Video-tutorials listing only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/HeroImageBanner.jsx (variant=alt)`

**`hero.roi`** — ROI report opener: h1, body and a scroll-to-form button beside an image with a glass stat card.

· ROI study page only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/Roi.jsx > RoiHero`

### CONTENT

_Explanatory body modules: feature grids, alternating rows, value grids, timelines, FAQs._

**`content.intro-carousel`** — Homepage introduction with an autoplaying fade carousel of statements.

· Homepage only: 1 route. · appears on 1 routes · implemented by `src/components/Intro.jsx`

**`content.connected-products`** — Tabbed product switcher: tab strip whose active tab swaps the panel copy, image and section colour.

· Homepage only: 1 route. · appears on 1 routes · implemented by `src/components/ConnectedProducts.jsx`

**`content.why-choose`** — Success grid: section title over a row of icon + short text items, trailing spacer.

· Homepage, universities, educators, students and contact: 5 routes. · appears on 5 routes · implemented by `src/components/WhyChoose.jsx (variant=default)`

**`content.feature-grid`** — Product feature grid inside a cream sheet: centred heading over cards of icon, sans title and serif body.

· All product pages and the product overview: 7 routes. · appears on 7 routes · implemented by `src/components/WhyChoose.jsx (variant=feature)`

**`content.two-column-rows`** — Alternating image/text rows (TwoCols): optional chip or icon tag, title, body, optional quote box, button or group heading.

· Homepage, all product pages, product overview, the solutions pages, about, careers and contact: 14 routes. · appears on 14 routes · implemented by `src/components/TwoColumnRows.jsx`

**`content.overview-image`** — Cream sheet with a centred h4, optional subtitle and one full-width product image.

· Assignments and oral assessment product pages: 2 routes. · appears on 2 routes · implemented by `src/components/Experience.jsx (variant=overview)`

**`content.solution-cards`** — Heading over a row of image cards with title, optional body and optional Learn-more link.

· Homepage and pricing: 2 routes. · appears on 2 routes · implemented by `src/components/SolutionCards.jsx (variant=default)`

**`content.support-cards`** — Support card row: h5 + subtitle over bordered square-image cards with divider and right-aligned link.

· Students only: 1 route. · appears on 1 routes · implemented by `src/components/SolutionCards.jsx (variant=support)`

**`content.integrations`** — Integrations block: heading and body beside a grid of LMS/tool tiles.

· Homepage, product overview, pricing, universities and educators: 5 routes. · appears on 5 routes · implemented by `src/components/Integrations.jsx`

**`content.careers-card`** — Careers teaser image card: flipped photo with an overlapping card (overline, h5, Learn-more to careers).

· Homepage and about: 2 routes. · appears on 2 routes · implemented by `src/components/Careers.jsx (defaults)`

**`content.mission-card`** — Unflipped image card on cream with an h4 and paragraphs, no overline and no button.

· About only: 1 route. · appears on 1 routes · implemented by `src/components/Careers.jsx (overline=null, flipped=false, button=null)`

**`content.partnership-image-card`** — Orange wide-ratio image card: h4, two paragraphs and a read-more link to a news item.

· Oral assessment product page only: 1 route. · appears on 1 routes · implemented by `src/components/Careers.jsx (imageCard props, ratio=2/1)`

**`content.phase-release`** — Phased roadmap: centred heading over two cards, each with title, intro and bullet list.

· Oral assessment product page only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/PhaseRelease.jsx`

**`content.single-column`** — Full-width image with a half-width text column (icon tag, h5, body, link) overlapping its lower edge.

· Product overview only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/SingleColumn.jsx`

**`content.faq`** — FAQ accordion beside an image on a light-orange sheet.

· Pricing only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/Faq.jsx`

**`content.bullet-points`** — Centred h5 (+ optional subtitle) over a cover image beside a dashed bullet list.

· Universities and students: 2 routes. · appears on 2 routes · implemented by `src/pages/company/sections/ContentWithBulletPoints.jsx`

**`content.delivery-types`** — Centred h5, a strip of product links styled like the connected-products tabs, then a full-width image.

· Educators only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/DeliveryTypes.jsx`

**`content.expert-list`** — Orange sheet: centred h5 over a flipped image card whose card holds a paragraph and an italic list.

· Educators only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/ExpertList.jsx`

**`content.values`** — Values grid: title, optional intro, multi-column icon + title + text items, trailing spacer.

· About, careers and trust centre (rendered twice on trust centre): 3 routes. · appears on 3 routes · implemented by `src/sections/Values.jsx`

**`content.timeline`** — Company timeline on a maroon sheet, looping through dated milestones.

· About only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/Timeline.jsx`

**`content.intro-split`** — Orange sheet: centred h4, then a flipped grid of h4 + paragraphs (+ optional button) and a cover image.

· Careers and trust centre: 2 routes. · appears on 2 routes · implemented by `src/pages/company/sections/IntroSplit.jsx`

**`content.reasons`** — Centred h4 over a tall image beside a numbered list of reasons.

· Careers only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/Reasons.jsx`

**`content.leaders`** — Leadership intro plus a two-column grid of photo, name, role and bio.

· Careers only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/Leaders.jsx`

**`content.policies`** — Labelled auto-fit grid of policy links, each with title, description and arrow.

· Trust centre only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/Policies.jsx`

**`content.roi-why`** — Cream sheet: h2, paragraphs and list beside a glass image card carrying badges and a stat card.

· ROI study page only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/Roi.jsx > RoiWhy`

### PROOF

_Social proof and evidence: logos, impact stats, quotes, testimonials, case-study blocks._

**`proof.impact-counter`** — Count-up row of headline impact statistics with optional label.

· Homepage, pricing, about and careers (careers uses the wide row layout): 4 routes. · appears on 4 routes · implemented by `src/components/ImpactCounter.jsx`

**`proof.logo-marquee`** — Title over an infinitely scrolling strip of university logos.

· Homepage, oral assessment, pricing, universities and about: 5 routes. · appears on 5 routes · implemented by `src/components/LogoMarquee.jsx`

**`proof.roi-card`** — Standalone ROI module section: image card with glass stat card and link to the ROI report.

· Homepage only (universities embeds a bare copy inside its case-study carousel): 1 route. · appears on 1 routes · implemented by `src/components/RoiCard.jsx`

**`proof.case-study`** — Composite case-study block: image card with tags, body and stats, a straddling quote card, then an image CTA.

· Homepage and product overview: 2 routes. · appears on 2 routes · implemented by `src/components/CaseStudy.jsx`

**`proof.study-preview`** — Accent sheet with a titled case-study image card beside a quote, author and optional link.

· The five non-oral product pages: 5 routes. · appears on 5 routes · implemented by `src/pages/product/sections/StudyPreview.jsx`

**`proof.quote-carousel`** — Single-slide quote card: image beside quote, author and role, over a coloured band.

· The five non-oral product pages, educators and students: 7 routes. · appears on 7 routes · implemented by `src/sections/QuoteCarousel.jsx`

**`proof.testimonials`** — Cream sheet with a left-aligned heading over a grid of name / institution / quote cards.

· Pricing only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/Testimonials.jsx`

**`proof.case-study-carousel`** — Centred heading, a bare ROI card, then a looping swiper of coloured case-study slides.

· Universities only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/CaseStudyCarousel.jsx`

**`proof.team-quotes`** — Grid of staff cards: photo, name, role and quote.

· Careers only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/TeamQuotes.jsx`

**`proof.quote-banner`** — Navy patterned banner with one large quote, author and role.

· ROI study page only: 1 route. · appears on 1 routes · implemented by `src/sections/QuoteCard.jsx (variant=banner)`

### MEDIA

_Blocks whose primary payload is a video (inline loop or click-to-play embed)._

**`media.experience-video`** — Heading over a looping inline product video.

· Homepage only: 1 route. · appears on 1 routes · implemented by `src/components/Experience.jsx (variant=default)`

**`media.featured-video`** — Click-to-play Vimeo embed with thumbnail, title, tagline and optional button.

· Homepage only: 1 route. · appears on 1 routes · implemented by `src/components/FeaturedVideo.jsx`

**`media.seamless-slide`** — Orange sheet: centred h4, then a slide of h5, half-width body and a looping muted video.

· Product overview only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/SeamlessSlide.jsx`

**`media.roi-video`** — ROI report click-to-play video section.

· ROI study page only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/Roi.jsx > RoiVideo`

### PRICING

_Plan cards and onboarding steps specific to the pricing route._

**`pricing.plans-hero`** — Orange pricing opener: centred heading block over a row of plan cards.

· Pricing only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/PricingHero.jsx`

**`pricing.licence-row`** — Continuation of the pricing opener: text column beside a licence card with list and button.

· Pricing only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/LicenceRow.jsx`

**`pricing.getting-started`** — Centred heading over numbered onboarding steps.

· Pricing only: 1 route. · appears on 1 routes · implemented by `src/pages/product/sections/GettingStarted.jsx`

### CONVERSION

_Blocks whose job is a call to action: CTA bands, image CTAs, forms, sign-up cards._

**`conversion.cta-band`** — Centred closing CTA band: heading, body and one or two buttons on a coloured background.

· All product pages, the solutions pages, about and careers: 11 routes. · appears on 11 routes · implemented by `src/sections/Cta.jsx`

**`conversion.highlight-split`** — Split inside the product highlight sheet: title, body and two buttons beside an image.

· The five non-oral product pages: 5 routes. · appears on 5 routes · implemented by `src/sections/ImageCta.jsx (variant=split)`

**`conversion.image-cta-band`** — Orange sheet with spacers around a heading + two-button card beside an image.

· News, case-studies and teacher-guides listings: 3 routes. · appears on 3 routes · implemented by `src/sections/ImageCta.jsx (variant=section)`

**`conversion.webinar-image-card`** — Light-orange wide-ratio image card: h4, paragraphs and a registration button.

· Oral assessment product page only: 1 route. · appears on 1 routes · implemented by `src/components/Careers.jsx (imageCard2 props, ratio=2/1)`

**`conversion.contact-form`** — Static stand-in contact form with native validation and a thank-you overlay.

· Contact and request-demo: 2 routes. · appears on 2 routes · implemented by `src/pages/company/sections/ContactForm.jsx`

**`conversion.roi-form`** — ROI report download form at the end of the ROI page.

· ROI study page only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/Roi.jsx > RoiForm`

### LISTING

_Collection indexes and teasers: filters, card grids, news tiles, job lists, popups over a grid._

**`listing.chronicle`** — News teaser: title, three-column news tiles and a See-more link to the news index.

· Homepage and about: 2 routes. · appears on 2 routes · implemented by `src/components/Chronicle.jsx (columns=3)`

**`listing.chronicle-two-col`** — News teaser variant: title + subtitle, two-column tiles with centred last tile, solid sign-up button.

· Oral assessment product page only: 1 route. · appears on 1 routes · implemented by `src/components/Chronicle.jsx (columns=2)`

**`listing.positions`** — Open-roles grid of job cards followed by a get-in-touch block.

· Careers only: 1 route. · appears on 1 routes · implemented by `src/pages/company/sections/Positions.jsx`

**`listing.category-filter`** — Topic chip filter with reset that narrows the card grid below it.

· News and case-studies listings: 2 routes. · appears on 2 routes · implemented by `src/pages/content/sections/CategoryFilter.jsx`

**`listing.news-grid`** — Load-more grid of news cards (tags, title, excerpt, author, date).

· News listing only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/CardGrid.jsx (variant=news) + src/pages/content/sections/Cards.jsx > NewsItemCard`

**`listing.study-grid`** — Load-more grid of case-study cards that open the popup on desktop and link out below it.

· Case-studies listing only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/CardGrid.jsx (variant=study) + src/pages/content/sections/Cards.jsx > StudyCard`

**`listing.study-popup`** — Desktop off-canvas panel that renders the full case-study detail content over the listing.

· Case-studies listing only (desktop widths): 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/CaseStudyPopup.jsx`

**`listing.guide-grid`** — Load-more grid of teaching-guide cards.

· Teacher-guides listing only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/CardGrid.jsx (variant=guide) + src/pages/content/sections/Cards.jsx > GuideCard`

**`listing.guide-types`** — Two audience columns (chip, h5, body, learn-list) whose buttons scroll to the matching video section.

· Video-tutorials listing only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/GuideTypes.jsx`

**`listing.video-grid`** — Sheet with centred title + intro over a load-more grid of video cards for one audience.

· Video-tutorials listing only (rendered once per audience): 1 route. · appears on 1 routes · implemented by `src/pages/content/Listings.jsx > VideoSection (CardGrid variant=video)`

### ARTICLE

_Blocks inside the white article shell of a collection detail route._

**`article.hero`** — Tall rounded photo box with a white card holding overline, title and optional caption.

· News, case-study and guide detail routes: 125 routes. · appears on 125 routes · implemented by `src/pages/content/sections/Article.jsx > ArticleHero`

**`article.share-download`** — Share links with a download action that expands an accordion lead form; optional author/about column.

· News and case-study detail routes: 112 routes. · appears on 112 routes · implemented by `src/pages/content/sections/ShareBar.jsx > ShareWithDownload`

**`article.share`** — Right-aligned share links only, hidden on mobile.

· Guide detail routes: 13 routes. · appears on 13 routes · implemented by `src/pages/content/sections/ShareBar.jsx > ShareOnly`

**`article.highlights`** — Labelled row of large highlight values with marker labels.

· Case-study detail routes: 36 routes. · appears on 36 routes · implemented by `src/pages/content/sections/Article.jsx > Highlights`

**`article.body`** — Reading-column rich text with headings, lists, notes and inline article quote cards (QuoteCard variant=article).

· News, case-study and guide detail routes: 125 routes. · appears on 125 routes · implemented by `src/pages/content/sections/RichBody.jsx; fallback src/pages/content/sections/Article.jsx > ArticleBody`

**`article.categories`** — Category label with a row of tag chips.

· News, case-study and guide detail routes: 125 routes. · appears on 125 routes · implemented by `src/pages/content/sections/Article.jsx > Categories`

**`article.more-row`** — Related-items row: dashed header with label and load-more link over three cards.

· News, case-study and guide detail routes: 125 routes. · appears on 125 routes · implemented by `src/pages/content/sections/Article.jsx > MoreRow`

**`article.video-detail`** — Video detail: click-to-play embed beside a category-related list, then title, tagline and resources header.

· Video detail routes, listed and unlisted: 33 routes. · appears on 33 routes · implemented by `src/pages/content/sections/VideoDetail.jsx`

**`article.information-body`** — Policy body: numbered headed sections of placeholder rich text.

· Privacy information page only: 1 route. · appears on 1 routes · implemented by `src/pages/content/sections/Information.jsx > InformationBody`
