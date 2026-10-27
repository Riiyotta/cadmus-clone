import { placeholderText } from '../../../sections/index.js'
import { A, VALUE_ICONS as I } from './shared.js'

// /about (pages-company §3.4)
export const HERO = {
  image: { src: A('1750939194-group-1000006108.png'), width: 2592, height: 573 },
  mobileImage: { src: A('1753358572-frame-1430105874-3.png'), width: 1075, height: 718 },
}

export const IMPACT = [
  ['50+', 'Countries'],
  ['610,000+', 'Students'],
  ['25,800+', 'Educators'],
]

export const LOGOS = [
  ['1754544021-rmit_university_logo-2.png'],
  ['1754543992-usq-logo.png'],
  ['1754543959-bondlogo_primary_fullcolour_cmyk-1-1.png'],
  ['1754543932-zayed-university-1.png'],
  ['1754543906-acu-logo-300x139-1-1.png'],
  ['1754543854-logo-uon-1.png'],
  ['1754543826-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png'],
  ['1754543150-kcl-logo.png'],
  ['1754543130-maynooth.png'],
  ['1754543096-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png'],
  ['1754543084-avd9ij1nl.png'],
  ['1754543065-uog_colour-1.png'],
  ['1754543028-manchester_university_logo-2-1.png'],
  ['1754543008-uni-of-canberra-logo.png'],
  ['1754542990-university-of-melbourne.png'],
  ['1754542974-university_of_western_australia_logo-freelogovectors-net.png'],
  ['1754542957-flinders_university_logo_horizontal_rgb_master-1.png'],
  ['1754542894-liverpool-john-moores-university.png'],
  ['1754542826-images-2-1.png'],
  ['1754542743-logusc.png'],
  ['1754542675-university-of-notre-dame-australia-transp-logo.png'],
  ['1754542661-rmit_university_logo-1.png'],
  ['1754542557-adelaide_university_logo-svg.png'],
  ['1754542545-626ba0db1dc4c3b537787e04-1.png'],
]

// Placeholder word counts are tuned so each block wraps to the same number of lines as the live copy at
// 1440 / 1280 / 390 (lorem words are shorter than English, so live word counts under-fill).
export const VALUES = {
  title: 'Our values',
  items: [
    [I.star, 'Love learning', 16],
    [I.clap, 'Do it with quality', 21],
    [I.shootingStar, 'Show you care', 21],
    [I.heart, 'Be resilient', 18],
    [I.lightbulb, 'Challenge assumptions', 20],
    [I.handshake, 'Show humility', 19],
  ].map(([icon, title, w], i) => ({ icon, title, text: placeholderText(w, 70 + i) })),
}

const ps = (words, seed) => words.map((w, i) => placeholderText(w, seed + i * 2))
export const TWO_COLUMNS = [
  { title: 'A better way to assess, built with universities', paragraphs: ps([41, 31, 32], 80), image: A('1751189182-title.png') },
  { title: 'Designed with industry, for industry.', paragraphs: ps([20, 25], 90), button: { text: 'Learn more', href: '/' }, image: A('1751189227-tadwitle.png') },
  { title: 'The Cadmus story so far', paragraphs: ps([22, 19, 20], 100), image: A('1751189417-frame-1430105575.png') },
]

export const TIMELINE = {
  title: 'The road to now',
  items: [
    ['2018', 36, '1753397134-vector_layer-1.jpg', 603, 588],
    ['2019-2022', 30, '1753397173-image-container.jpg', 604, 589],
    ['2023', 30, '1753397204-image-container-1.jpg', 604, 589],
    ['2025', 38, '1753397248-image-container-2.jpg', 805, 785],
  ].map(([year, w, file, width, height], i) => ({ year, body: placeholderText(w, 110 + i * 2), image: { src: A(file), width, height } })),
}

export const MISSION = {
  image: A('1754472416-cadmus-event-june-2025-496-2-copy.jpg'),
  title: 'We’re on a mission',
  paragraphs: [placeholderText(36, 120)],
}

export const CAREERS_IMAGE = A('1754472361-cadmus-event-june-2025-467-copy.jpg')

export const CTA_BODY =
  "Whether you're rolling out assignments, delivering exams, or reporting on outcomes, Cadmus gives you time and clarity to uplift assessment for better learning outcomes."
export const CTA_BUTTONS = [
  { text: 'Book a demo', href: '/', style: 'solid' },
  { text: 'Try for free', href: '/', style: 'outline' },
]
