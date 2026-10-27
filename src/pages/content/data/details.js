// Per-page details recorded in specs/pages-content.md (§2, §5). Body text is never copied: the
// structures below are PlaceholderProse notation (§5) rendered as neutral filler.

export const LIVE = 'https://cadmus.io'

// ---- News article bodies (§5.1–5.3). Default for the 73 unmeasured articles = §5.1 (the measured
// article structure), as the spec says the other articles share the template and differ in length.
export const NEWS_BODY_DEFAULT =
  'p(43) p(9) p(77) h2(6) p(17) p(55) · QUOTE[orange, 22w] · p(44) p(61) h2(11) p(38) p(72) p(53) · QUOTE[orange, 27w] · p(37) h2(12) p(55) p(85) p(18) p(29) p(39) p(46) p(46) h2(3) p(39) · QUOTE[orange, 28w] · p(77) p(36) h2(3) p(52) p(74) p(67) · QUOTE[orange, 31w] · p(1) p(39 strong)'

export const NEWS_BODIES = {
  'why-ai-demands-a-redesign-of-assessment': NEWS_BODY_DEFAULT,
  'why-ai-proofing-assessments-misses-the-point':
    'p(59) p(5) p(52) p(19) h2(7) p(8) p(50) p(93) p(45) p(empty) · QUOTE[green, 13w] · h2(4) p(21) p(30) p(8) p(86) · QUOTE[green, 39w] · p(21) h2(6) p(62) p(53) p(38) h2(5) p(49) p(7) h3(2) p(84) h3(2) p(78) h3(2) p(90) h3(2) p(72) h3(3) p(90) h2(3) p(36) p(59) p(48) p(53) · QUOTE[green, 16w] · p(51 strong)',
  'the-degree-has-always-been-a-signal-ai-is-changing-how-we-verify-it':
    'p(11) p(52) p(15) p(23) h2(4) p(32) p(17) p(42) p(45) p(31) h2(6) p(9) p(21) p(68) p(86) p(66) p(9 strong) h2(5) p(31) p(9) p(63) p(60 a) p(61) p(23) p(40) p(57) p(27 strong) h2(2) p(41) p(10) p(54) p(22) p(21) p(1) p(42 em)',
}

// ---- Case studies (§2.4, §5.4). Only Manchester was measured.
const MANCHESTER_BODY =
  'h3(6 strong) p(40) p(17) ul(3: 23/21/23) p(31) p(empty) · QUOTE[blue, 65w, author "Professor Gabrielle Finn", role "Vice Dean for Teaching, Learning and Students, The University of Manchester"] · h3(2 strong) p(35) h4(4) p(61) h4(4) p(86 em) h4(3) p(99) p(empty) · QUOTE[pink, 83w, author "Professor Gabrielle Finn", role "Vice Dean for Teaching, Learning and Students, The University of Manchester"] · h3(2 strong) p(16) p(35) h4(4) p(31) h4(6) p(48) h4(4) p(28) h4(2) p(37) h4(5) p(49) h4(3) p(43) h3(5 strong) p(28) h4(2 em) p(16) h4(3) p(28) h4(3) p(29) p(53) h4(7) p(17) p(53) p(empty) · QUOTE[orange, 43w, author "Student", role "The University of Manchester "] · h4(2) h4(3) p(37) p(33) p(empty) · QUOTE[green, 126w, author "Fiona Smyth", role "Deputy Dean and Vice Dean for Teaching, Learning and Students, Faculty of Humanities, The University of Manchester "] · h4(2) h4(5) p(35) p(22) p(24) ul(5: 9/15/15/9/21) p(empty)'

// Generic default for the 35 unmeasured studies: the same structure without the Manchester-specific
// quote attributions.
export const STUDY_BODY_DEFAULT = MANCHESTER_BODY.replace(/, author "[^"]*", role "[^"]*"/g, '')

export const STUDY_DETAILS = {
  'case-study-the-university-of-manchester': {
    title: 'The University of Manchester Transitions to Hybrid Learning and Assessment with Cadmus',
    caption:
      'The University of Manchester partnered with Cadmus to transition 65 academic units to hybrid assessment, improving equity, academic integrity, and student success.',
    categories: ['Product', 'Student Success'],
    hero: { image: '/assets/1754525016-christin-hume-hcfwew744z4-unsplash-1-1.jpg', width: 2545, height: 1696 },
    highlights: [
      ['83%', 'of students accessed feedback'],
      ['96%', 'of students utilised assessment resources'],
      ['15.62%', 'Average student Turnitin similarity score'],
    ],
    body: MANCHESTER_BODY,
  },
}

// ---- Teaching guides (§2.8, §5.6). Segments: { prose } | { note, words } | { image, width, height }.
// §5.6 records block order and character counts (≈6 chars/word); quote/note lengths are not recorded.
const img = (id, n, width = 1300, height = 756) => ({
  image: `/assets/ctf-${id}-guide-best-practice-${n}.jpg`,
  width,
  height,
})
// Paragraph lengths are scaled so the page matches the measured guide height (11559 @1440).
const scale = (n) => (notation) => notation.replace(/p\((\d+)/g, (_, w) => `p(${Math.round(w * n)}`)
const g = scale(1.45)
const GUIDE_TEXT = [
  { prose: g('p(70) p(60 a) p(60)') }, // content 1150 chars, p + a
  { prose: 'QUOTE[orange, 25w]' },
  { prose: g('h2(5) p(60 em) p(45 a) h3(4) p(55) h2(5) p(50)') },
  { note: 'blue', words: 30 },
]
export const GUIDE_DETAILS = {
  'what-is-best-practice-assessment': {
    hero: { image: '/assets/1754564667-brooke-cagle-lccfi_26dia-unsplash.jpg', width: 2736, height: 1824 },
    categories: ['Student Success', 'Hybrid Learning'],
    segments: [
      ...GUIDE_TEXT,
      // content 6505 chars incl. 3 inline images
      { prose: g('h2(6) p(80) p(70 a) p(60)') },
      img('755Veenl3T4UAEfMgorf9X', 1, 1300, 754),
      { prose: g('h3(4) p(90) p(75) p(60)') },
      img('1So3U53Yg0gngNBbyfR4qo', 2),
      { prose: g('h3(4) p(85) p(70) p(55)') },
      img('26kA7wecvS8bq9ekoxdsmt', 3, 650, 378),
      { prose: g('p(70) p(60)') },
      { note: 'pink', words: 30 },
      // content 4526 chars incl. 3 images
      { prose: g('h2(5) p(75) p(60)') },
      img('5yNC1zv0o0xYb6Mh448MD8', 4),
      { prose: g('h3(4) p(80) p(60)') },
      img('7joMkRd2Zc23AXNmRldlct', 5),
      { prose: g('h3(4) p(75) p(55)') },
      img('1EgyKNjX9isGV2RWg11DKG', 6),
      { prose: 'QUOTE[orange, 25w]' },
      { prose: g('h3(4) ul(4: 14/12/14/12) p(40)') },
      img('4QkVBlGUa9hKOVPOBGDuTN', 7),
    ],
  },
}
// Generic default for the 12 unmeasured guides: the same block order without the page-specific images.
export const GUIDE_SEGMENTS_DEFAULT = GUIDE_DETAILS['what-is-best-practice-assessment'].segments.filter((s) => !s.image)

// ---- Videos (§2.10). Only intro-into-cadmus was measured; the KCL embed is the homepage FeaturedVideo
// (CLONE_SPEC §10: same title + thumbnail as /video/kcl-teaching-learning-forum).
export const VIDEO_DETAILS = {
  'intro-into-cadmus': {
    vimeo: 'https://player.vimeo.com/video/364235073',
    tagline:
      "See what it's like to use Cadmus for an assignment, as we explore the functionality of the Cadmus Teacher and Student Environments.",
    category: 'Introduction',
  },
  'kcl-teaching-learning-forum': { vimeo: 'https://player.vimeo.com/video/1107995826' },
}
export const VIDEO_CATEGORIES = {
  Introduction: [
    'intro-into-cadmus',
    'accessing-cadmus-canvas',
    'accessing-cadmus-blackboard',
    'accessing-cadmus-d2l',
    'accessing-cadmus-moodle',
  ],
}

// ---- Privacy policy (§2.9, §5.5)
export const PRIVACY_SECTIONS = [
  // word counts measured so each block wraps to the live line count at 1440 and 390; the longest
  // paragraph is 3 lines short to make room for the "Read the original on cadmus.io" link (gap 40 + line)
  { title: "Purpose", body: 'p(48) p(23)' },
  { title: "What we collect, and why we collect it", body: 'p(38) p(7 strong) p(36) ul(1: 40) p(50) ul(2: 45/23) p(8 strong) p(12) ul(5: 94/48/73/92/31)' },
  { title: "Who we share your information with", body: 'p(25) p(6 strong) p(48 strong) p(36) p(28 strong) p(7 strong) p(31) p(38) p(45 strong) p(34 strong) ul(4: 11/10/10/22)' },
  { title: "Information security", body: 'p(25) ul(3: 9/24/23) p(18) p(29)' },
  { title: "Access and correction", body: 'p(39) p(48) p(15)' },
  { title: "Complaints", body: 'p(36 a) p(28)' },
  { title: "Compliance and co-operation with regulatory authorities", body: 'p(39)' },
  { title: "Changes", body: 'p(50)' },
]
