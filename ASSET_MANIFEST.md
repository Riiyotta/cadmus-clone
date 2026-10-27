Source: https://cadmus.io/

# Asset Manifest — cadmus.io homepage

Measured live on 2026-10-27 (Playwright, Chromium). Saved copy cross-referenced: `/Users/riyaghosh/V3/cadmus/Uplifting Assessment _ Cadmus_files/`.

Notes
- All CMS images are served from DatoCMS (imgix): `https://www.datocms-assets.com/163564/<file>`. The live page appends `?auto=format&w=<W>` (and sometimes `&dpr=0.5`); (`auto=format` lets imgix negotiate the output format; the served format was not inspected.) The files in the saved `_files` folder are the **full-resolution originals** (pixel sizes verified with `sips`, they match the CMS intrinsic sizes below), so they can be used directly.
- Gatsby `GatsbyImage` is used everywhere (blur-up base64 placeholder, then main image fades in; placeholder `opacity` 0 -> image `opacity` 1). A plain `<img>` with `object-fit: cover` is an acceptable stand-in.
- "Rendered @1440" sizes come from `getBoundingClientRect()` at a 1440x900 viewport.

## 1. MISSING — must be downloaded

| What | Live URL | Notes |
|---|---|---|
| Experience section video (MP4, 2240x1040, 2.09 s loop, muted autoplay) | https://player.vimeo.com/progressive_redirect/playback/1107306103/rendition/1080p/file.mp4?loc=external&signature=664f1bda6cdb6d8ab29b6a8cf67f4e594ea7171e2ec7fab65c5ef8d0866d0ea1 | Vimeo video ID **1107306103**. Signed URL redirects (302) to vimeocdn; download it once and serve locally (e.g. `public/videos/experience.mp4`). |
| Font: AT Realm Book (woff2) — the only display face actually used | https://cadmus.io/static/AT-Realm-Book-1f33be29df80c47da6c46f50ba24502a.woff2 | 25,696 bytes. woff fallback: https://cadmus.io/static/AT-Realm-Book-10300756a8de1f05ea6710aa023d1ce8.woff . Commercial font; licensing is the user's responsibility. |
| Font: AT Realm Regular 400 (declared, NOT loaded on homepage) | https://cadmus.io/static/AT-Realm-Regular-e6c57d5a17f7b9e20fc820747ccceb86.woff2 | optional (woff: `/static/AT-Realm-Regular-9b1997b56450c6250db20bb155e5ef7e.woff`) |
| Font: AT Realm Medium 500 (declared, NOT loaded on homepage) | https://cadmus.io/static/AT-Realm-Medium-91c136aff7fbf4014663ff9a52cca0aa.woff2 | optional (woff: `/static/AT-Realm-Medium-a70b7afc5f5532958cd11cd5d88c795e.woff`) |
| Font: Inter variable, normal, latin (loaded) | https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcviYwYZ8UA3.woff2 | Or simply use the Google Fonts CSS: `https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap` |
| Font: Inter variable, normal, latin-ext | https://fonts.gstatic.com/s/inter/v20/UcCo3FwrK3iLTcvsYwYZ8UA3J58.woff2 | only needed for extended glyphs |
| Favicon 32x32 | https://cadmus.io/favicon-32x32.png?v=e5feca92ebbb9bc6e0e882e2844cf455 | Also `/icons/icon-{48,72,96,144,192,256,384,512}x...png` and `/manifest.webmanifest` |
| (optional) Experience fallback image | https://www.datocms-assets.com/163564/1751950625-group-1073715637-1.png | 4212x1658. Only shown if the video were absent; not rendered on live page. |

Not needed: STIX Two Text is @imported by the site CSS but no homepage element uses it (status `unloaded`). `2045141092-...-d` in `_files` is only an 80x45 Vimeo poster thumbnail (the page shows the Dato thumbnail `1754637423-download.png` instead).

## 2. Video / embeds

| Section | Kind | ID / URL | Behaviour |
|---|---|---|---|
| Experience ("A connected experience...") | `<video muted autoplay loop playsinline>` | Vimeo progressive file, video ID 1107306103 (URL above) | Rendered 1000x464 @1440 (`w-100 max-1000 ma`), natural 2240x1040. No poster, no controls. |
| Featured video (King's College London) | `<iframe>` Vimeo player | **1107995826** — `https://player.vimeo.com/video/1107995826` (saved copy: `_files/1107995826.html`) | iframe is absolutely positioned (`bg-image`) underneath a GatsbyImage thumbnail. Whole 9:5 box has a centred play-button pseudo element. On click: thumbnail is removed and iframe `src` becomes `https://player.vimeo.com/video/1107995826?autoplay=1`. iframe attrs: `frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen`. |

## 3. CMS images per section (top to bottom)

### Hero (HomepageBanner)
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Hero | Card photo – Create | https://www.datocms-assets.com/163564/1754525021-kateryna-hliznitsova-hakuz2yubdm-unsplash-1.jpg | JPG | 2234x3346 | 241x321 (cover, ratio 3:4) | YES `1754525021-kateryna-hliznitsova-hakuz2yubdm-unsplash-1.jpg` |
| Hero | Card tag icon – Create | https://www.datocms-assets.com/163564/1753779248-book.svg | SVG | 18x18 | 25x25 | YES `1753779248-book.svg` |
| Hero | Card photo – Mark | https://www.datocms-assets.com/163564/1754544713-istock-2208695167-1-1-1.png | PNG | 930x1394 | 241x321 (cover, ratio 3:4) | YES `1754544713-istock-2208695167-1-1-1.png` |
| Hero | Card tag icon – Mark | https://www.datocms-assets.com/163564/1753779437-edit.svg | SVG | 18x18 | 25x25 | YES `1753779437-edit.svg` |
| Hero | Card photo – Manage | https://www.datocms-assets.com/163564/1754525016-christin-hume-hcfwew744z4-unsplash-1-1.jpg | JPG | 2545x1696 | 241x321 (cover, ratio 3:4) | YES `1754525016-christin-hume-hcfwew744z4-unsplash-1-1.jpg` |
| Hero | Card tag icon – Manage | https://www.datocms-assets.com/163564/1753779505-bolt.svg | SVG | 18x18 | 25x25 | YES `1753779505-bolt.svg` |
| Hero | Card photo – Analyse | https://www.datocms-assets.com/163564/1754525016-thisisengineering-dxe_fqxsxuu-unsplash-1.jpg | JPG | 1458x2186 | 241x321 (cover, ratio 3:4) | YES `1754525016-thisisengineering-dxe_fqxsxuu-unsplash-1.jpg` |
| Hero | Card tag icon – Analyse | https://www.datocms-assets.com/163564/1753779552-graph-pink.svg | SVG | 18x18 | 25x25 | YES `1753779552-graph-pink.svg` |

### Introduction (fade carousel, autoplay 3s)
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Introduction | Slide 1 | https://www.datocms-assets.com/163564/1754544929-a-frame-1430106069.png | PNG | 3606x1455 | 1000x~403 | YES `1754544929-a-frame-1430106069.png` |
| Introduction | Slide 2 | https://www.datocms-assets.com/163564/1754545399-b-frame-1430106070.png | PNG | 4808x1940 | 1000x~403 | YES `1754545399-b-frame-1430106070.png` |
| Introduction | Slide 3 | https://www.datocms-assets.com/163564/1754545430-c-frame-1430106071.png | PNG | 3645x1455 | 1000x~403 | YES `1754545430-c-frame-1430106071.png` |
| Introduction | Slide 4 | https://www.datocms-assets.com/163564/1754545481-d-frame-1430106072.png | PNG | 4207x1698 | 1000x~403 | YES `1754545481-d-frame-1430106072.png` |

### Experience
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Experience | Fallback image (NOT rendered on live page because video is set) | https://www.datocms-assets.com/163564/1751950625-group-1073715637-1.png | PNG | 4212x1658 | not rendered | **MISSING** |

### Connected products (tabs + fade swiper)
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Connected | Tab icon – Assignments | https://www.datocms-assets.com/163564/1752906459-secondary-button.svg | SVG | 31x30 | 30x30 | YES `1752906459-secondary-button.svg` |
| Connected | Slide image – Assignments | https://www.datocms-assets.com/163564/1754564986-surface-8hplpr3hebu-unsplash.jpg | JPG | 3000x2000 | 1070x412 (cover) | YES `1754564986-surface-8hplpr3hebu-unsplash.jpg` |
| Connected | Tab icon – Exams | https://www.datocms-assets.com/163564/1752906564-secondary-wadbutton.svg | SVG | 31x30 | 30x30 | YES `1752906564-secondary-wadbutton.svg` |
| Connected | Slide image – Exams | https://www.datocms-assets.com/163564/1754566396-kateryna-hliznitsova-ylacfjwry6c-unsplash.jpg | JPG | 2961x1977 | 1070x412 (cover) | YES `1754566396-kateryna-hliznitsova-ylacfjwry6c-unsplash.jpg` |
| Connected | Tab icon – Group Work | https://www.datocms-assets.com/163564/1752906773-secondary-adbutton.svg | SVG | 31x30 | 30x30 | YES `1752906773-secondary-adbutton.svg` |
| Connected | Slide image – Group Work | https://www.datocms-assets.com/163564/1757918035-kateryna-hliznitsova-ye7hwgyte4a-unsplash-3-min.jpg | JPG | 6016x4016 | 1070x412 (cover) | YES `1757918035-kateryna-hliznitsova-ye7hwgyte4a-unsplash-3-min.jpg` |
| Connected | Tab icon – Feedback & Marking | https://www.datocms-assets.com/163564/1752906960-awdaw.svg | SVG | 31x30 | 30x30 | YES `1752906960-awdaw.svg` |
| Connected | Slide image – Feedback & Marking | https://www.datocms-assets.com/163564/1757917806-adobestock_291474059-1-min.jpeg | JPEG | 6720x4480 | 1070x412 (cover) | YES `1757917806-adobestock_291474059-1-min.jpeg` |
| Connected | Tab icon – Learning Assurance Analytics | https://www.datocms-assets.com/163564/1752907049-secondadary-button.svg | SVG | 31x30 | 30x30 | YES `1752907049-secondadary-button.svg` |
| Connected | Slide image – Learning Assurance Analytics | https://www.datocms-assets.com/163564/1754565818-pexels-vazhnik-7864534.jpg | JPG | 4096x2732 | 1070x412 (cover) | YES `1754565818-pexels-vazhnik-7864534.jpg` |

### Why choose Cadmus (Success)
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Why | Icon – Certificate | https://www.datocms-assets.com/163564/1753010668-certificate.svg | SVG | 36x36 | 34x34 | YES `1753010668-certificate.svg` |
| Why | Icon – Shooting Star | https://www.datocms-assets.com/163564/1753010687-shooting-star.svg | SVG | 36x36 | 34x34 | YES `1753010687-shooting-star.svg` |
| Why | Icon – Team (blue) | https://www.datocms-assets.com/163564/1753010700-team-blue.svg | SVG | 36x36 | 34x34 | YES `1753010700-team-blue.svg` |
| Why | Icon – Profile | https://www.datocms-assets.com/163564/1753010720-profile.svg | SVG | 36x36 | 34x34 | YES `1753010720-profile.svg` |

### Logo marquee (23 logos, list repeated x4 = 92 items in DOM)
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Marquee | Logo (link https://www.exeter.ac.uk) | https://www.datocms-assets.com/163564/1750938797-exeter.png | PNG | 275x80 | max 150x40, object-fit contain | YES `1750938797-exeter.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542545-626ba0db1dc4c3b537787e04-1.png | PNG | 750x200 | max 150x40, object-fit contain | YES `1754542545-626ba0db1dc4c3b537787e04-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542557-adelaide_university_logo-svg.png | PNG | 834x200 | max 150x40, object-fit contain | YES `1754542557-adelaide_university_logo-svg.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542661-rmit_university_logo-1.png | PNG | 566x200 | max 150x40, object-fit contain | YES `1754542661-rmit_university_logo-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542675-university-of-notre-dame-australia-transp-logo.png | PNG | 776x200 | max 150x40, object-fit contain | YES `1754542675-university-of-notre-dame-australia-transp-logo.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542743-logusc.png | PNG | 584x200 | max 150x40, object-fit contain | YES `1754542743-logusc.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754544021-rmit_university_logo-2.png | PNG | 496x200 | max 150x40, object-fit contain | YES `1754544021-rmit_university_logo-2.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543992-usq-logo.png | PNG | 510x200 | max 150x40, object-fit contain | YES `1754543992-usq-logo.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543959-bondlogo_primary_fullcolour_cmyk-1-1.png | PNG | 532x200 | max 150x40, object-fit contain | YES `1754543959-bondlogo_primary_fullcolour_cmyk-1-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542826-images-2-1.png | PNG | 686x200 | max 150x40, object-fit contain | YES `1754542826-images-2-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542894-liverpool-john-moores-university.png | PNG | 534x200 | max 150x40, object-fit contain | YES `1754542894-liverpool-john-moores-university.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543932-zayed-university-1.png | PNG | 656x200 | max 150x40, object-fit contain | YES `1754543932-zayed-university-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543906-acu-logo-300x139-1-1.png | PNG | 556x200 | max 150x40, object-fit contain | YES `1754543906-acu-logo-300x139-1-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542957-flinders_university_logo_horizontal_rgb_master-1.png | PNG | 682x200 | max 150x40, object-fit contain | YES `1754542957-flinders_university_logo_horizontal_rgb_master-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542974-university_of_western_australia_logo-freelogovectors-net.png | PNG | 608x200 | max 150x40, object-fit contain | YES `1754542974-university_of_western_australia_logo-freelogovectors-net.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754542990-university-of-melbourne.png | PNG | 750x200 | max 150x40, object-fit contain | YES `1754542990-university-of-melbourne.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543008-uni-of-canberra-logo.png | PNG | 784x200 | max 150x40, object-fit contain | YES `1754543008-uni-of-canberra-logo.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543028-manchester_university_logo-2-1.png | PNG | 642x200 | max 150x40, object-fit contain | YES `1754543028-manchester_university_logo-2-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543854-logo-uon-1.png | PNG | 600x200 | max 150x40, object-fit contain | YES `1754543854-logo-uon-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543065-uog_colour-1.png | PNG | 642x200 | max 150x40, object-fit contain | YES `1754543065-uog_colour-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543084-avd9ij1nl.png | PNG | 900x200 | max 150x40, object-fit contain | YES `1754543084-avd9ij1nl.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543826-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png | PNG | 730x200 | max 150x40, object-fit contain | YES `1754543826-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543130-maynooth.png | PNG | 474x200 | max 150x40, object-fit contain | YES `1754543130-maynooth.png` |
| Marquee | Logo (empty href) | https://www.datocms-assets.com/163564/1754543150-kcl-logo.png | PNG | 300x200 | max 150x40, object-fit contain | YES `1754543150-kcl-logo.png` |

### ROI module
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| ROI | Background photo | https://www.datocms-assets.com/163564/1771212504-roi-university-library.jpg | JPG | 4096x2731 | 1170x450 (cover) | YES `1771212504-roi-university-library.jpg` |

### Featured video
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Featured video | Thumbnail (covers Vimeo iframe until click) | https://www.datocms-assets.com/163564/1754637423-download.png | PNG | 2880x1620 | 1000x556 (cover, ratio 9:5) | YES `1754637423-download.png` |

### Two columns (4 rows)
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Two columns | Illustration – Enhanced assessment literacy and quality | https://www.datocms-assets.com/163564/1752108829-group-1073715452-1.png | PNG | 1312x1068 | 565 wide, natural height | YES `1752108829-group-1073715452-1.png` |
| Two columns | Illustration – Improved student wellbeing and success | https://www.datocms-assets.com/163564/1752109181-group-1073715735.png | PNG | 1395x1315 | 565 wide, natural height | YES `1752109181-group-1073715735.png` |
| Two columns | Illustration – Greater equity and inclusion | https://www.datocms-assets.com/163564/1752109248-group-1073715298.png | PNG | 1358x1104 | 565 wide, natural height | YES `1752109248-group-1073715298.png` |
| Two columns | Illustration – Learning and academic integrity assurance | https://www.datocms-assets.com/163564/1752109420-group-1000009165.png | PNG | 1350x993 | 565 wide, natural height | YES `1752109420-group-1000009165.png` |

### Cards (Improving outcomes)
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Cards | Card image – For universities | https://www.datocms-assets.com/163564/1754018909-image-container.jpg | JPG | 1177x604 | 357 wide, clipped to 357x178 (ratio 2:1 box) | YES `1754018909-image-container.jpg` |
| Cards | Card image – For educators | https://www.datocms-assets.com/163564/1754565200-getty-images-2ccgdt28kk0-unsplash.jpg | JPG | 2784x1856 | 357 wide, clipped to 357x178 (ratio 2:1 box) | YES `1754565200-getty-images-2ccgdt28kk0-unsplash.jpg` |
| Cards | Card image – For students | https://www.datocms-assets.com/163564/1754544269-vector_layer.png | PNG | 600x320 | 357 wide, clipped to 357x178 (ratio 2:1 box) | YES `1754544269-vector_layer.png` |

### Integrations
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Integrations | Icon – Gradebook | https://www.datocms-assets.com/163564/1752117443-frame.png | PNG | 128x128 | 34x34 | YES `1752117443-frame.png` |
| Integrations | Icon – Canvas | https://www.datocms-assets.com/163564/1752117464-frame-1.png | PNG | 128x128 | 34x34 | YES `1752117464-frame-1.png` |
| Integrations | Icon – Moodle | https://www.datocms-assets.com/163564/1752117483-frame-2.png | PNG | 128x128 | 34x34 | YES `1752117483-frame-2.png` |
| Integrations | Icon – Blackboard | https://www.datocms-assets.com/163564/1752117502-frame-3.png | PNG | 128x128 | 34x34 | YES `1752117502-frame-3.png` |
| Integrations | Icon – D2L Brightspace | https://www.datocms-assets.com/163564/1752117521-frame-4.png | PNG | 128x128 | 34x34 | YES `1752117521-frame-4.png` |
| Integrations | Icon – Grammarly | https://www.datocms-assets.com/163564/1752117542-frame-5.png | PNG | 128x128 | 34x34 | YES `1752117542-frame-5.png` |

### Case study block
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Case study | Image card photo | https://www.datocms-assets.com/163564/1752118990-screenshot-2025-02-13-at-5-07-44-pm-1-1.jpg | JPG | 1060x448 | 1070x412 (cover) | YES `1752118990-screenshot-2025-02-13-at-5-07-44-pm-1-1.jpg` |
| Case study CTA | CTA illustration | https://www.datocms-assets.com/163564/1751189417-frame-1430105575.png | PNG | 981x739 | 550x414 | YES `1751189417-frame-1430105575.png` |

### Careers image card
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Careers | Photo | https://www.datocms-assets.com/163564/1751186547-screenshot-2025-02-13-at-5-07-44-pm-2.jpg | JPG | 2394x894 | 1070x412 (cover) | YES `1751186547-screenshot-2025-02-13-at-5-07-44-pm-2.jpg` |

### Cadmus Chronicle
| Section | Role | Live URL (original, no query) | Fmt | Intrinsic (CMS) | Rendered @1440 | In saved _files? |
|---|---|---|---|---|---|---|
| Chronicle | Preview – Why “AI-proofing” assessments misses the point—and | https://www.datocms-assets.com/163564/1778212941-pexels-cottonbro-63337352.jpg | JPG | 1500x1000 | 440x330 (cover, ratio 4:3) | YES `1778212941-pexels-cottonbro-63337352.jpg` |
| Chronicle | Preview – Why AI demands a redesign of assessment—not just a | https://www.datocms-assets.com/163564/1778213101-surface-xarmm8ffapo-unsplash-2.jpg | JPG | 1500x1000 | 440x330 (cover, ratio 4:3) | YES `1778213101-surface-xarmm8ffapo-unsplash-2.jpg` |
| Chronicle | Preview – The degree has always been a signal. AI is changin | https://www.datocms-assets.com/163564/1778213038-adobestock_354893802-jpg-2.jpg | JPG | 1500x792 | 440x330 (cover, ratio 4:3) | YES `1778213038-adobestock_354893802-jpg-2.jpg` |

## 4. Inline SVGs (CSS data-URIs) — not files; embed as-is

These are `background-image: url("data:image/svg+xml;base64,...")` in the live CSS. Decoded source below. None exist as files in `_files` (they live inside the inlined CSS of the saved HTML). Usage/size noted in CLONE_SPEC.md.

### `.logo--main`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="113" height="24" fill="none" viewBox="0 0 113 24"><path fill="#580C1D" d="M19.518 9.4c-1.475-4.282-4.66-6.733-8.257-6.733-3.596 0-6.935 2.933-6.935 7.8 0 5.133 3.368 9.9 8.487 9.9 2.662 0 4.96-1.269 6.176-3.034V21.6c-1.354 1.333-3.732 2.4-6.969 2.4C4.426 24 0 17.933 0 11.867 0 4.767 5.35.033 12.02.033c2.684 0 5.396.655 7.498 2.104V9.4ZM22.791 7.977C23.944 7.374 25.932 6.6 28.58 6.6c4.59 0 6.704 2.133 6.704 5.167V18.9c0 2.667.428 3.812 1.156 4.6h-4.36c-.264-.533-.528-1.4-.594-2.767C30.89 22.3 29.406 24 26.63 24c-3.17 0-4.92-1.833-4.92-4.533 0-2.1 1.288-3.7 4.425-4.667l2.443-.733c1.784-.534 2.808-.767 2.808-2.334 0-1.366-.76-2.6-2.907-2.6-2.84 0-4.486 1.772-5.69 3.689V7.978h.001Zm8.596 7.21c-.385.704-.76.81-2.312 1.246l-1.42.4c-1.387.434-1.948 1.234-1.948 2.3 0 1.067.726 2 2.344 2 1.618 0 3.336-1.033 3.336-3.966v-1.98ZM37.348 15.133c0-5.6 3.864-8.533 7.893-8.533 1.65 0 3.17.467 4.359 1.667V7.234c0-3.652-.87-4.582-1.354-4.9L53.53 0v18c0 3.233.25 4.242 1.189 5.5h-4.492c-.33-.7-.462-1.4-.528-2.5-.892 2.033-3.071 3-5.085 3-4.657 0-7.266-4.2-7.266-8.867ZM49.6 14.9c0-3.136-1.126-5.9-3.93-5.9-2.18 0-4.161 2.133-4.161 5.633s1.53 6.167 4.081 6.167c2.325 0 4.01-2.027 4.01-5.9ZM84.367 17.967V13.8c0-3.52-.77-4.415-1.354-4.933l5.251-2.334v10.334c0 2.533.925 3.866 2.84 3.866 2.015 0 3.501-1.9 3.501-5.2V13.8c0-3.671-.893-4.569-1.354-4.933l5.284-2.334v12.234c0 2.533.462 4.166 1.156 4.733h-4.392c-.33-.867-.529-1.767-.595-3.333C94.242 21.833 92.326 24 89.585 24c-3.633 0-5.218-2.433-5.218-6.033ZM111.91 12.396c-.495-1.467-2.378-3.363-4.789-3.363-1.221 0-2.212.7-2.212 1.867 0 .833.495 1.3 1.783 1.833l2.345.967c2.345 1 3.963 2.133 3.963 4.966 0 3.5-2.939 5.334-6.176 5.334-1.981 0-4.392-.6-5.416-1.467v-4.9c.84 1.621 2.675 3.933 5.416 3.933 1.354 0 2.609-.6 2.609-2.066 0-1-.76-1.533-2.246-2.167l-2.245-.933c-1.949-.834-3.6-2.2-3.6-4.7 0-3.1 2.476-5.1 6.076-5.1 1.667 0 3.444.477 4.492.993v4.802ZM77.184 17.567v-3.63c0-2.5-.793-4.004-2.642-4.004-1.726 0-3.401 1.507-3.401 5.167v2.467c0 4.355.462 5.214.957 5.933h-5.812c.492-.72.925-1.578.925-5.933v-3.63c0-2.5-.826-4.004-2.642-4.004-1.817 0-3.402 1.507-3.402 5.167v2.467c0 4.355.462 5.214.958 5.933h-5.813c.493-.72.925-1.578.925-5.933v-3.9c0-3.934-.906-4.582-1.32-4.934l4.887-2.2.198 3.867c.248-.833.842-1.775 1.705-2.508.863-.734 1.994-1.259 3.315-1.259 2.642 0 4.227 1.5 4.888 3.767a6.34 6.34 0 0 1 1.775-2.508c.858-.734 1.973-1.259 3.31-1.259 3.6 0 5.12 2.467 5.12 6.067v4.867c0 4.355.461 5.214.957 5.933H76.26c.493-.72.925-1.578.925-5.933Z"/></svg>
```

### `.hamburger-menu`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" fill="none" viewBox="0 0 25 24"><path stroke="#580C1D" stroke-linecap="square" stroke-width="2.5" d="M23.516 2H2m21.516 10H2m21.516 10H2"/></svg>
```

### `.hamburger-menu.open`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21"><path stroke="#580C1D" stroke-linecap="square" stroke-width="2.5" d="M2 19 18.97 2.03M2 2l16.97 16.97"/></svg>
```

### `.arrow-button::after`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="34" height="16" fill="none" viewBox="0 0 34 16"><path fill="#04191F" stroke="#04191F" stroke-width=".218" d="m33.563 8.422-.074.025c-1.807.636-3.126 1.501-3.995 2.613-.867 1.11-1.292 2.474-1.292 4.125v.109h-.798v-.11c0-3.16 1.827-5.706 4.28-6.61H.892v-.778h30.79C29.23 6.9 27.405 4.44 27.405 1.185v-.11h.798v.11c0 1.7.425 3.065 1.292 4.162.868 1.098 2.187 1.94 3.995 2.575l.074.025v.475Z"/></svg>
```

### `.quote-icon`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="26" height="17" fill="none" viewBox="0 0 26 17"><path fill="#04191F" d="m23.392.31.612 1.293c-3.74 2.584-5.576 4.964-5.576 7.208a.93.93 0 0 0 .952.952s.136 0 .476-.136c.408-.068.884-.136 1.292-.136 2.584 0 4.08 1.292 4.08 3.468 0 2.312-1.632 3.875-4.012 3.875-3.06 0-5.44-2.583-5.44-6.051 0-4.08 2.992-8.228 7.616-10.472ZM7.616.31l.612 1.293C4.488 4.187 2.652 6.567 2.652 8.81a.93.93 0 0 0 .952.952s.136 0 .476-.136c.408-.068.884-.136 1.292-.136 2.584 0 4.08 1.292 4.08 3.468 0 2.312-1.632 3.875-4.012 3.875-3.128 0-5.44-2.583-5.44-6.051C0 6.703 2.992 2.555 7.616.31Z"/></svg>
```

### `.love-icon`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" fill="none" viewBox="0 0 13 12"><path fill="#F7F4F0" fill-opacity=".8" d="M9.554.275C8.08.275 6.78 1.363 6.576 2.71H6.42C6.215 1.363 4.916.275 3.443.275 1.473.275 0 1.755 0 3.567c0 2.704 3.056 5.138 6.405 7.705h.186c3.353-2.567 6.405-5.001 6.405-7.705 0-1.813-1.473-3.292-3.446-3.292h.004ZM6.498 9.93C4.697 8.493 1.176 6.138 1.176 3.567c0-1.346.878-2.236 2.192-2.236S5.575 2.39 5.653 3.99h1.69c.078-1.601 1.001-2.66 2.285-2.66 1.284 0 2.192.89 2.192 2.236 0 2.567-3.524 4.926-5.326 6.362h.004Z"/></svg>
```

### `.social-icon.facebook`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21"><path fill="#FFC8AE" d="M10 .075C4.477.075 0 4.57 0 10.112c0 4.707 3.229 8.656 7.584 9.741V13.18H5.522v-3.067h2.062V8.79c0-3.416 1.54-5 4.882-5 .634 0 1.727.126 2.174.25v2.78a12.807 12.807 0 0 0-1.155-.037c-1.64 0-2.273.623-2.273 2.244v1.085h3.266l-.561 3.067h-2.705v6.896c4.951-.6 8.788-4.832 8.788-9.963C20 4.569 15.523.075 10 .075Z"/></svg>
```

### `.social-icon.linkedin`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" fill="none" viewBox="0 0 20 21"><path fill="#FFC8AE" d="M18.52.075H1.477C.66.075 0 .72 0 1.517V18.63c0 .797.66 1.445 1.477 1.445H18.52c.816 0 1.48-.648 1.48-1.441V1.517C20 .72 19.336.075 18.52.075ZM5.934 17.118h-2.97V7.571h2.97v9.547ZM4.449 6.271a1.72 1.72 0 1 1-.006-3.44 1.72 1.72 0 0 1 .006 3.44Zm12.594 10.847h-2.965v-4.64c0-1.106-.02-2.532-1.543-2.532-1.543 0-1.777 1.207-1.777 2.453v4.72H7.797V7.57h2.844v1.305h.039c.394-.75 1.363-1.543 2.804-1.543 3.004 0 3.559 1.977 3.559 4.547v5.238Z"/></svg>
```

### `.social-icon.twitter`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" fill="none" viewBox="0 0 22 21"><path fill="#FFC8AE" d="M17.326.075H20.7l-7.37 8.472L22 20.075h-6.789l-5.317-6.992-6.084 6.992H.434l7.883-9.061L0 .075h6.961l4.806 6.391 5.56-6.39Zm-1.184 17.97h1.87L5.945 1.998H3.94l12.203 16.045Z"/></svg>
```

### `.emblem-footer`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="87" height="88" fill="none" viewBox="0 0 87 88"><path fill="#FFC8AE" d="M29.619 53.89s.54-.03 1.322-.26c9.24-2.3 17.841-5.43 24.052-13.529C62.008 30.952 68.522 16.3 86.736.266 36.015 25.82 23.32 46.562 0 87.222l7.39-3.152L17.4 66.134C31.505 63.902 39.768 59.806 47.1 51.25c-7.223 3.87-17.482 2.64-17.482 2.64Z"/></svg>
```

### `.logo--footer`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="408" height="87" fill="none" viewBox="0 0 408 87"><path fill="#FFC8AE" d="M70.86 33.847C65.557 18.427 54.097 9.603 41.16 9.603c-12.938 0-24.949 10.561-24.949 28.085 0 18.483 12.118 35.647 30.532 35.647 9.577 0 17.84-4.567 22.216-10.922v15.363c-4.87 4.802-13.425 8.642-25.067 8.642C16.568 86.417.648 64.573.648 42.728.648 17.164 19.894.12 43.892.12 53.543.12 63.3 2.477 70.86 7.694v26.153ZM82.637 28.724c4.147-2.171 11.298-4.96 20.823-4.96 16.514 0 24.117 7.683 24.117 18.605v25.685c0 9.602 1.542 13.727 4.159 16.564h-15.682c-.951-1.92-1.901-5.042-2.139-9.963-2.139 5.641-7.484 11.763-17.464 11.763-11.405 0-17.702-6.602-17.702-16.323 0-7.56 4.633-13.323 15.919-16.803l8.791-2.641c6.415-1.92 10.098-2.762 10.098-8.402 0-4.921-2.733-9.361-10.454-9.361-10.217 0-16.14 6.377-20.468 13.28V28.726l.002-.001Zm30.921 25.958c-1.385 2.536-2.734 2.916-8.316 4.49l-5.108 1.44c-4.99 1.561-7.01 4.442-7.01 8.283 0 3.84 2.615 7.2 8.435 7.2 5.821 0 11.999-3.72 11.999-14.282v-7.13ZM135.002 54.491c0-20.164 13.9-30.726 28.394-30.726 5.94 0 11.404 1.68 15.682 6.002v-3.72c0-13.15-3.131-16.498-4.871-17.644L193.215 0v64.813c0 11.643.901 15.274 4.277 19.805h-16.157c-1.189-2.52-1.664-5.041-1.901-9.002-3.208 7.321-11.048 10.802-18.295 10.802-16.751 0-26.136-15.123-26.136-31.927h-.001Zm44.076-.84c0-11.29-4.052-21.245-14.137-21.245-7.842 0-14.97 7.683-14.97 20.285s5.508 22.204 14.682 22.204c8.363 0 14.426-7.297 14.426-21.243l-.001-.002ZM304.147 64.693V49.69c0-12.675-2.771-15.895-4.871-17.763l18.89-8.402v37.208c0 9.121 3.327 13.922 10.217 13.922 7.247 0 12.594-6.841 12.594-18.724V49.69c0-13.218-3.211-16.45-4.871-17.763l19.008-8.402v44.05c0 9.12 1.664 15.002 4.159 17.043h-15.8c-1.189-3.121-1.901-6.362-2.14-12.003-1.663 6.002-8.553 13.803-18.414 13.803-13.069 0-18.771-8.762-18.771-21.725h-.001ZM403.229 44.634c-1.782-5.281-8.554-12.108-17.226-12.108-4.395 0-7.959 2.522-7.959 6.722 0 3 1.782 4.681 6.414 6.601l8.435 3.481c8.435 3.6 14.257 7.682 14.257 17.883 0 12.602-10.573 19.204-22.215 19.204-7.128 0-15.802-2.16-19.485-5.282V63.492c3.021 5.838 9.624 14.163 19.485 14.163 4.869 0 9.384-2.16 9.384-7.441 0-3.6-2.733-5.52-8.079-7.802l-8.079-3.361c-7.009-3-12.95-7.922-12.95-16.924 0-11.161 8.91-18.364 21.86-18.364 5.994 0 12.39 1.719 16.157 3.577v17.293h.001ZM278.308 63.253V50.184c0-9.001-2.852-14.417-9.505-14.417-6.209 0-12.236 5.427-12.236 18.604v8.882c0 15.68 1.662 18.775 3.445 21.365h-20.91c1.773-2.59 3.328-5.684 3.328-21.365V50.184c0-9.001-2.969-14.417-9.504-14.417-6.534 0-12.236 5.427-12.236 18.604v8.882c0 15.68 1.662 18.775 3.445 21.365h-20.91c1.773-2.59 3.327-5.684 3.327-21.365V49.21c0-14.162-3.259-16.496-4.752-17.763l17.583-7.922.712 13.923c.891-3 3.03-6.392 6.134-9.032 3.104-2.64 7.172-4.531 11.925-4.531 9.503 0 15.206 5.4 17.582 13.563 1.13-3 3.297-6.392 6.386-9.032 3.089-2.64 7.099-4.531 11.91-4.531 12.95 0 18.414 8.881 18.414 21.845v17.523c0 15.68 1.662 18.775 3.446 21.365h-20.911c1.773-2.59 3.327-5.684 3.327-21.365Z"/></svg>
```

### `.with-dropdown::after`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6"><path stroke="#04191F" stroke-linecap="square" stroke-linejoin="round" d="m1 1 4 4 4-4"/></svg>
```

### `.with--play::after`
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="none" viewBox="0 0 64 64"><rect width="64" height="64" fill="#FFC8AE" rx="32"/><path fill="#580C1D" d="M48.802 32a2.36 2.36 0 0 1-1.14 2.026L26.05 47.247a2.4 2.4 0 0 1-3.32-.826 2.38 2.38 0 0 1-.328-1.202V18.78a2.38 2.38 0 0 1 1.218-2.073 2.4 2.4 0 0 1 2.43.045l21.612 13.221A2.36 2.36 0 0 1 48.802 32Z"/></svg>
```

