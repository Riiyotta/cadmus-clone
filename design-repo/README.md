# Cadmus clone: design-repo

An AI-ready description of a **local, personal clone** of the Cadmus marketing site: tokens, primitives, components, 82 section contracts, 25 templates, every one of the 181 served routes, a PageSpec schema with an explicit `mode` (`reference` | `generated`), a semantic validator with generated-mode leakage rules, asset roles, a token catalog and policy, measured section heights, and the verification and adversarial suites that prove those rules reject bad input.

## Status (read this first)

| | |
|---|---|
| version | **1.0.0** (`registry.manifest.json`; `repositoryVersion` is documentation-only, `allowlistVersion` and `pageSpecVersion` are machine-checked) |
| status | **design-review-pending**, `productionApproved: false` |
| review | Built and verified by an AI agent. That is an **agent attestation, not a human sign-off**: no human has reviewed the design-repo, the pinned patterns (asset availability, retrieval eligibility, hero-less templates), the derived source-identity registry, or the empty wrapper-gate whitelist. |
| leakage detection | **String-based.** Generated-mode rules match normalised strings (NFKC, zero-width removal, curly quotes straightened, whitespace collapsed) against plain patterns and one-way hashes. A paraphrase, a translation, a homoglyph that survives NFKC, text inside an image, or a first-name-only reference is not detected. |
| visual parity | **Not measured.** No live-site capture was available, so no live-versus-clone pixel comparison was run and no parity number is claimed. The clone was measured against its own spec and its own structure only. |

## Licensing and brand (load-bearing)

Cadmus is a real, live company. The clone, and therefore this repo, describes someone else's site. Nothing here licenses the source's brand, copy, people or media.

- **Copy** is never stored: contracts carry budgets (words, characters, rendered lines, list sizes); reference examples carry neutral filler of the measured length; source copy, people, organisations, customer domains and CTA labels exist only as one-way hashes (`schema/source-identity-hashes.json`).
- **Assets.** The clone's `public/assets` holds the real wordmark, real university logos, real third-party integration logos, photographs of real people, stock photographs, product screenshots and videos. `assets/asset-roles.json` gives every role a closed `availability` (`reference-only` | `generation-safe` | `blocked-for-generation`), pinned in code. Generated pages use generation-safe roles only.
- **Live endpoints.** A webinar registration form and job-application links are live third-party endpoints (plain links in the clone). `link.live-endpoint` is forbidden in every mode; reference examples replace those hrefs with `#`.
- **Do not publish** this repo, the clone, or any page derived from them, and do not make a repository holding them public.

## What is here

| folder | content |
|---|---|
| `tokens/00-foundation` | colour (every key of the Tailwind config), typography (families, sizes with tablet overrides, line heights, letter spacing, weights), radius, elevation, spacing (every length used 6+ times), breakpoints, z-index, motion durations/easings, icon sizes, `motion-patterns.json`. Each token cites `path:line` and the text that must be on that line. |
| `tokens/10-semantic`, `20-component`, `30-layout`, `themes` | semantic roles, component-scoped aliases, container widths, the single `light` theme |
| `tokens/llm` | `token-catalog.json`, `token-policy.json`, `component-allowlist.json` (what a generator may instantiate and set) |
| `primitives`, `components` | 16 primitives and 14 components, each with a source anchor |
| `sections` | 82 section contracts: `semantic` {id, category} for the AI, `source` {id, file, tag, lines} for provenance, closed `section-contract.schema.json` |
| `templates` | `templates.json` (page shapes as node lists) and `routes.json` (every route mapped once) |
| `compatibility/graph.json` | 14 rhythm/position rules, each with a severity, each implemented in the validator |
| `assets/asset-roles.json` | 28 closed asset/link/copy roles |
| `schema` | `pagespec.schema.json` (generated), `semantic_validate.py`, `synthesize.py`, `build_schema.py`, `source-brand.json`, `source-identity-hashes.json`, `examples/reference` (27), `examples/generated` (24), `tests/adversarial_test.py` |
| `extraction` | `verify_all.py`, `wrapper_gate.py`, `prove_drift.py`, `build_source_brand.py`, `measure_sections.mjs`, `measured-values.json` |

<!-- counts:start -->
```json
{
 "tokensInCatalog": 280,
 "foundationTokens": 201,
 "layoutTokens": 17,
 "semanticTokens": 40,
 "componentTokens": 22,
 "motionPatterns": 17,
 "primitives": 16,
 "components": 14,
 "sections": 82,
 "sectionsRetrievalIneligible": 2,
 "templates": 25,
 "templateFamilies": 12,
 "routes": 181,
 "assetRoles": 28,
 "assetRolesGenerationSafe": 13,
 "graphRules": 14,
 "allowlistEntries": 112,
 "referenceExamples": 27,
 "generatedExamples": 24,
 "themes": 1,
 "measuredRoutes1440": 182,
 "wrapperWhitelistEntries": 0
}
```
<!-- counts:end -->

Counts are recomputed from disk by `extraction/verify_all.py` (COUNTS) and must equal the manifest and this block.

## Sources of truth and how they were reconciled

Built from the clone's `src/` (React + Vite + Tailwind), `CLONE_SPEC.md`, `ASSET_MANIFEST.md`, `specs/*.md`, the root `ia/` and the existing stub templates and measurement script. The stub was treated as a first draft: all 181 routes were re-derived from the router (`src/routes.jsx` plus the three group `routes.jsx` files) and the slugs of `src/pages/content/data/*.js` (76 news, 36 case studies, 13 guides, 33 videos of which 4 are routable but unlisted), and every one of the 182 measured pages (181 routes plus the catch-all probe path) was mapped onto its template by structure, with 0 mismatches. One real delta from the stub: an article whose body is empty renders no body chapter and no original-link row, so those article nodes carry `referenceMinCount: 0` / `required: false`. `ia/` was updated to the same section ids and decomposition (see `ia/README.md`).

`extraction/verify_all.py` re-derives the route table, the source-brand registry and every citation from the sibling clone when it is present and degrades to warnings when the folder is used alone.

## Templates (25, 12 families) and routes (181)

Templates group pages by semantic purpose, not by matching wrappers: the six product pages share one component but are three templates because their section lists differ; news, case-study and guide articles are three templates because their frames differ (case studies add a highlights row, guides a share-only bar); the video page is its own shape.

| template | family | routes | nodes | in-flow sections (x n = repeated n times, * = repeatable, ? = optional) |
|---|---|---|---|---|
| `template.home` | home | 1 | 17 | `hero.home-banner`, `content.intro-carousel`, `media.experience-video`, `content.connected-products`, `content.why-choose`, `proof.impact-counter`, `proof.logo-marquee`, `proof.roi-card`, `media.featured-video`, `content.two-column-rows`, `content.solution-cards`, `content.integrations`, `proof.case-study`, `content.careers-card`, `listing.chronicle` |
| `template.product` | product | 4 | 9 | `hero.product-split`, `content.feature-grid`, `conversion.highlight-split`, `proof.study-preview`, `content.two-column-rows`, `proof.quote-carousel`, `conversion.cta-band` |
| `template.product-assignments` | product | 1 | 10 | `hero.product-split`, `content.feature-grid`, `conversion.highlight-split`, `proof.study-preview`, `content.overview-image`, `content.two-column-rows`, `proof.quote-carousel`, `conversion.cta-band` |
| `template.product-oral` | product | 1 | 12 | `hero.product-split`, `content.feature-grid`, `content.partnership-image-card`, `content.phase-release`, `listing.chronicle-two-col`, `content.overview-image`, `content.two-column-rows x2`, `conversion.webinar-image-card`, `proof.logo-marquee`, `conversion.cta-band` |
| `template.product-overview` | product | 1 | 10 | `hero.image-centered`, `content.feature-grid`, `media.seamless-slide`, `content.two-column-rows`, `content.single-column`, `content.two-column-rows`, `content.integrations`, `proof.case-study` |
| `template.pricing` | pricing | 1 | 11 | `pricing.plans-hero`, `pricing.licence-row`, `pricing.getting-started`, `content.solution-cards`, `content.integrations`, `proof.testimonials`, `proof.impact-counter`, `proof.logo-marquee`, `content.faq` |
| `template.solutions-universities` | solutions | 1 | 10 | `hero.photo-banner`, `proof.logo-marquee`, `content.why-choose`, `content.two-column-rows`, `content.bullet-points`, `content.integrations`, `proof.case-study-carousel`, `conversion.cta-band` |
| `template.solutions-educators` | solutions | 1 | 10 | `hero.product-split`, `content.why-choose`, `content.delivery-types`, `content.two-column-rows`, `content.expert-list`, `content.integrations`, `proof.quote-carousel`, `conversion.cta-band` |
| `template.solutions-students` | solutions | 1 | 9 | `hero.product-split`, `content.why-choose`, `content.two-column-rows`, `content.bullet-points`, `content.support-cards`, `proof.quote-carousel`, `conversion.cta-band` |
| `template.about` | company | 1 | 12 | `hero.about-banner`, `proof.impact-counter`, `proof.logo-marquee`, `content.values`, `content.two-column-rows`, `content.timeline`, `content.mission-card`, `content.careers-card`, `listing.chronicle`, `conversion.cta-band` |
| `template.careers` | company | 1 | 12 | `hero.photo-banner`, `content.intro-split`, `content.reasons`, `content.two-column-rows`, `content.values`, `content.leaders`, `proof.impact-counter`, `listing.positions`, `proof.team-quotes`, `conversion.cta-band` |
| `template.contact` | conversion-form | 1 | 6 | `hero.title-banner`, `content.two-column-rows`, `conversion.contact-form`, `content.why-choose` |
| `template.request-demo` | conversion-form | 1 | 4 | `hero.title-banner`, `conversion.contact-form` |
| `template.trust-centre` | company | 1 | 6 | `hero.small-banner`, `content.intro-split`, `content.policies`, `content.values x2` |
| `template.news-listing` | listing | 1 | 6 | `hero.news-banner`, `listing.category-filter`, `listing.news-grid`, `conversion.image-cta-band` |
| `template.case-studies-listing` | listing | 1 | 7 | `hero.listing-photo-card`, `listing.category-filter`, `listing.study-grid`, `conversion.image-cta-band`, `listing.study-popup?` |
| `template.teacher-guides-listing` | listing | 1 | 5 | `hero.listing-photo-card`, `listing.guide-grid`, `conversion.image-cta-band` |
| `template.video-tutorials-listing` | listing | 1 | 5 | `hero.listing-maroon`, `listing.guide-types`, `listing.video-grid x2` |
| `template.news-detail` | article | 76 | 8 | `hero.article`, `article.share-download`, `article.body-chapter*`, `article.original-link?`, `article.categories`, `article.more-row` |
| `template.study-detail` | article | 36 | 9 | `hero.article`, `article.share-download`, `article.highlights`, `article.body-chapter*`, `article.original-link?`, `article.categories`, `article.more-row` |
| `template.guide-detail` | article | 13 | 8 | `hero.article`, `article.share`, `article.body-chapter*`, `article.original-link?`, `article.categories`, `article.more-row` |
| `template.video-detail` | video-detail | 33 | 3 | `article.video-detail` |
| `template.roi-study` | report | 1 | 7 | `hero.roi`, `content.roi-why`, `proof.quote-banner`, `media.roi-video`, `conversion.roi-form` |
| `template.privacy` | legal | 1 | 5 | `hero.small-banner`, `article.policy-section*`, `article.original-link?` |
| `template.not-built-fallback` | fallback | 0 | 3 | `utility.not-built` |

`template.not-built-fallback` documents the router catch-all (unknown paths and unknown collection slugs): it is not instantiable in either mode and is measured only through a probe path.

## Semantic decisions (baseline R6/R7/R8)

- **No whole-page section.** The former whole-body article section is decomposed into heading-bounded `article.body-chapter` nodes (repeatable) and the policy page into `article.policy-section` nodes; the largest in-flow section on any page holds 55% of its page (/case-studies `listing.study-grid`, a card grid that is the body of a listing page; wrapper-gate warnings, no errors).
- **HERO is the page-opening composition only.** 13 contracts are HERO: homepage banner, split product hero, centred image hero, photo and title banners, about banner, small banner, news banner, two listing heroes, report hero, article header and the pricing opener; exactly one per page, none on the video page and the fallback. The tallest is 1240px (pricing.plans-hero on `/pricing`).
- **Category honesty.** Calls to action, forms and registration cards are `CONVERSION`; news and teaser rows are `LISTING`; nothing is classed as a features/capabilities category that is editorial. Categories: ARTICLE 9, CONTENT 25, CONVERSION 6, HERO 13, LISTING 10, MEDIA 4, PRICING 2, PROOF 10, SHELL 2, UTILITY 1.
- **Same purpose, different DOM.** Two implementations of the small banner (company and information pages), three uses of one image-card component (careers teaser, mission, partnership/registration) and the logo/marquee reuse are separate contracts only where purpose or position differs; `source.id` never equals `semantic.id`.
- **Composite kept on purpose.** `proof.case-study` is one rounded sheet in the DOM (image card with statistics, a straddling quote, a closing image call to action); it is documented as a composite in its contract.
- **Retrieval-ineligible** (`retrievalEligible: false`, reason required, pinned in code in both validators): `listing.study-popup` (fixed off-canvas panel, an overlay node) and `utility.not-built` (router fallback). The header's dropdowns and mobile menu are part of `shell.header`.
- **Reference-only node.** `article.original-link` exists only because the clone replaces long-form copy with placeholder text and links to the original; it is dropped in generated mode (`REFERENCE_ONLY_NODE`).
- **Page colour scheme.** The scheme-coloured sections of a page (split hero, study preview, quote card, call-to-action band) must share one scheme variant (`SCHEME_CONSISTENT`).

## PageSpec, modes and generated-mode rules (R1, R2, R4, R5)

A PageSpec requires `mode`. `reference` reconstructs a served route (real asset paths as evidence, neutral copy, real site routes); `generated` is a new page for someone else. In generated mode the semantic validator rejects, each under its own rule: `GENERATED_MODE_BRAND` (brand, product names, tagline, credited studio, hashed organisations), `GENERATED_MODE_CTA`, `GENERATED_MODE_COPY` (hashed source copy; copyRole must be `copy.original`), `GENERATED_MODE_URL` (source domains, social profiles, non-reserved absolute URLs, reused site routes, hashed customer domains), `GENERATED_MODE_ASSET` (blocked/reference-only roles and source file paths), `GENERATED_MODE_PERSON` (hashed real names and person photos), `GENERATED_MODE_RATING` (review handles, scores and the source's own rating claim) and `GENERATED_MODE_STORE`; live form endpoints are rejected in every mode (`LIVE_ENDPOINT_ALL_MODES`). The patterns are derived by `extraction/build_source_brand.py` from literals in `src/` (each group carries evidence rows and self-test samples); no human has reviewed them.

`schema/examples/generated` holds one generation-safe example per instantiable template (fictional brand, original filler copy, `generate:` asset refs, reserved `.example` URLs, no real people); `schema/examples/reference` holds one reference example per non-collection route plus a representative per collection template. `schema/synthesize.py` also builds a minimal and a rich generated control for every template inside the adversarial suite, so a new template needs no new control code.

## Tokens (R10)

`tokens/llm/token-catalog.json` (280 tokens) is regenerated from the token files and compared by `verify_all`; `token-policy.json` lists categories, raw-value restrictions, unsupported fonts and the one per-node override a PageSpec may carry (`style.surface`, only on the sections that render those surfaces: connected-products, values, impact counters, logo marquee). The validator rejects unknown tokens, raw hex/rgb, arbitrary lengths, unsupported fonts and invalid combinations. Token values come from `tailwind.config.cjs` and `src/index.css`; nothing is invented.

## Motion (closed vocabulary)

17 patterns, each citing the clone (scroll reveals, count-up, auto-fading carousel, tabs fade, sliding carousel, timeline loop, accordion, nav dropdown, click-to-play, looping video, logo marquee, footer wordmark peel, off-canvas panel, smooth scrolling). The clone never reads `prefers-reduced-motion` (`sourceHonoursReducedMotion` is false everywhere), so every `reducedMotionFallback` is prescriptive for generated pages. The node motion object is closed (no invented fields).

## Responsive behaviour (R11)

CSS breakpoints recorded from the Tailwind config: `<=1800`, `<=1600`, `<=1500`, `<=990` (tablet and below: grids collapse, image cards stack and overlap by 60px, headings shrink), `<=768` (mobile: hamburger accordion menu, hero cards scaled 1.15, padding 40px to 20px) and `>=991`. Each section contract carries `responsive[]` (range, behaviour phrase, `path:line` citation) derived from the utility classes in its source lines (no class names are stored), and `measuredHeightsPx` at 1440, plus 768 and 390 for one route per template (`measured-values.json` `responsiveSamples`). Typography overrides at 990/768 live in the font-size tokens' `responsive` entries.

## Wrapper-height gate (R9)

`extraction/measured-values.json` holds `sectionHeights` at **1440px for all 182 pages** measured with `extraction/measure_sections.mjs`; `extraction/wrapper_gate.py` (called by `verify_all`) pins HERO warn 1800px / fail 3000px and a page-share warn 50% / fail 60% in code. The whitelist is empty (0 entries); any future entry needs `reviewedBy`, a 30+ character justification and a `maxHeightPx`, and an agent reviewer must write "agent attestation, not a human sign-off". Current result: max HERO 1240px; max share 54.6%; three card-grid listings warn above 50%, nothing fails.

## Measurement and copy budgets

Budgets are counts recorded per rendered section unit at 1440px (words, characters, rendered lines, list sizes, image/video counts). Text elements are attributed to contract fields by typography role (largest heading, uppercase label, paragraph, button-styled link, quote author) and a few sections have documented overrides, so budgets are **heuristics, deliberately permissive** (maximum observed over every route that renders the section). List sizes keep the measured count as the upper bound and a permissive lower bound (1 for a required list, else 0), because one observation per section cannot show how few items a section may carry. Controls and icon lists that are not anchors (share icons, the filter reset, the header and footer wordmarks) have list sizes read from cited source lines. Inline article images are counted but their paths are not recorded per chapter.

## Verify

```bash
pip install jsonschema                         # the only third-party Python dependency
python3 extraction/verify_all.py               # schemas, examples, routes, templates, allowlist parity, graph, pins, tokens, motion,
                                               # provenance, citations, asset refs, no-source-copy, source brand, counts, entry points, gate, hygiene
python3 schema/tests/adversarial_test.py       # controls pass, every mutation is rejected with its expected rule
python3 extraction/prove_drift.py --scratch DIR   # DIR = an existing empty directory outside this folder; proves each check fails on injected drift
python3 <skill>/scripts/baseline_audit.py --repo .   # the mechanical R1-R14 floor
```

Without the sibling clone (`src/`, `public/`, config files next to this folder) the source-dependent checks print warnings instead of failing; the adversarial real-source cases report SKIPPED.

To re-measure (optional; needs a production build of the clone and a Playwright install): in the clone, `npm ci`, `npx vite build --outDir <scratch dir>`, `npx vite preview --outDir <scratch dir> --port 5602`, then `PLAYWRIGHT_MODULE=<path to the playwright package> BASE_URL=http://localhost:5602 node extraction/measure_sections.mjs --all > out.json` (also `--sample --viewport 390x844`). The tool never hard-codes a browser path. Run `extraction/build_source_brand.py --check` after changing clone copy.

## Not done / limits

- No live-site capture, so **no visual parity number** and no per-section parity gate result; a parity harness could not be run.
- No human review of anything in this repo; the source-identity registry is unreviewed and string-based.
- Reference examples use neutral filler copy and real asset paths as evidence; they do not reproduce source copy.
- The clone's article, case-study, guide and policy bodies are placeholder text in the clone itself, so contracts describe their structure and size, not real long-form content.
- Clone check (R12, partial): a clean `npm ci` + `vite build` + `vite preview` of the clone served all 181 routes and the fallback, which were then measured. No live-versus-clone parity harness result exists (see Status).
- No IR (`*.ir.json`) is generated or touched.
- Dev dependencies of the clone (Tailwind, Vite) are not vendored; delivery is the clone's lockfile clean install.
