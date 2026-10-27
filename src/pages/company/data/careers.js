import { placeholderText } from '../../../sections/index.js'
import { A, VALUE_ICONS as I } from './shared.js'

// /careers (pages-company §3.5)
export const HERO = {
  title: 'Careers at Cadmus',
  caption: 'Join our growing team and make your mark on the future of learning.',
  button: { text: 'Browse careers', target: '#positions' },
  image: { src: A('1751282246-full-image-page-header.jpg'), width: 3456, height: 1846 },
  mobileImage: { src: A('1754722094-iphone-16-plus-32-1.jpg'), width: 860, height: 1600 },
}

export const INTRO = {
  title: 'Make your mark on the future of learning',
  heading: 'At Cadmus, we’re a team of mark makers shaping a new era of assessment.',
  paragraphs: [
    'Learners as well as doers, we thrive on empowering educators and students to grow and succeed at every step of the assessment process.',
    'Join our growing team and make your mark on the future of learning.',
  ],
  button: { text: 'Browse careers', target: '#positions' },
  image: { src: A('1751282421-vector_layer.jpg'), width: 925, height: 605 },
}

// Placeholder word counts are tuned so each block wraps to the same number of lines as the live copy at
// 1440 / 1280 / 390 (lorem words are shorter than English, so live word counts under-fill).
export const REASONS = {
  title: 'Five reasons to join Cadmus',
  image: { src: A('1751282453-frame-1321314721.jpg'), width: 790, height: 638 },
  items: [
    ['01.', 'Be part of something bigger', 26],
    ['02.', 'Learn and grow quickly', 24],
    ['03.', 'Work with a creative, mission-driven team', 21],
    ['04.', 'Embrace flexibility', 29],
    ['05.', 'Enjoy our work perks', 26],
  ].map(([number, title, w], i) => ({ number, title, body: placeholderText(w, 130 + i * 2) })),
}

export const CONNECT = [
  {
    title: 'Cadmus Connect',
    paragraphs: [21, 29, 32].map((w, i) => placeholderText(w, 140 + i * 2)),
    image: A('1751282465-frame-1073715652.png'),
  },
]

export const VALUES = {
  title: 'Our values',
  items: [
    [I.star, 'Sharp and self-directed.', 22],
    [I.clap, 'Mission before ego.', 23],
    [I.shootingStar, 'In it for the long game.', 24],
    [I.heart, 'Fearless enough to have a real go.', 20],
    [I.lightbulb, "Brilliant at something we're not.", 31],
  ].map(([icon, title, w], i) => ({ icon, title, text: placeholderText(w, 150 + i) })),
}

export const LEADERS = {
  title: 'Our people are the heart of the Cadmus story',
  intro: [placeholderText(31, 160), 'Meet our lead mark makers.'],
  people: [
    { name: 'Herk Kailis', role: 'Founder and Co-CEO', bio: placeholderText(94, 162), image: { src: A('1754632369-herk-kailis-headshot.jpg'), width: 768, height: 513 } },
    { name: 'Brigitte Elliott', role: 'Co-CEO', bio: placeholderText(94, 164), image: { src: A('1756867901-brig_photoshopped-min.png'), width: 1600, height: 1200 } },
  ],
}

export const IMPACT = [
  ['10', 'Key locations'],
  ['75+', 'Talented team members'],
  ['60%', 'Women in leadership roles'],
  ['100%', 'Life-long learners'],
]

export const POSITIONS = {
  title: 'Positions at Cadmus',
  icon: A('1754360991-frame-1272638844.svg'),
  jobs: [
    { title: 'Brand & Community Manager', department: 'Commercial', date: '01.10.2026', href: 'https://apply.workable.com/cadmus-io/j/0ED5B2CF52/' },
    { title: 'Senior Product Designer', department: 'Product', date: '01.10.2026', href: 'https://apply.workable.com/cadmus-io/j/7537B56A80' },
    { title: 'Head of Partner Success', department: 'Commercial', date: '01.10.2026', href: 'https://apply.workable.com/cadmus-io/j/879245F3D5/' },
    { title: 'Learning Support Specialist - Americas', department: 'Commercial', date: '01.10.2026', href: 'https://apply.workable.com/cadmus-io/j/B83DE7F306' },
  ],
  footer: {
    heading: 'Can’t find the right role?',
    body: 'Interested in joining the Cadmus team but don’t see the right opportunity? Join our talent pool—we’ll keep your resume on file and let you know when a suitable role becomes available.',
    button: { text: 'Get in touch', href: '/contact/' },
  },
}

export const TEAM = {
  title: 'Hear from our team',
  people: [
    { name: 'Chris Renwick', role: 'Head of University Partnerships (APAC)', w: 45, image: { src: A('1762496064-img_6289.jpg'), width: 1600, height: 1000 } },
    { name: 'Sophie Newton', role: 'Chief Financial Officer', w: 40, image: { src: A('1754624201-sophie-newton-1.jpeg'), width: 752, height: 752 } },
    { name: 'Jess Ashman', role: 'Director of Learning', w: 49, image: { src: A('1775533753-1718224455340.jpeg'), width: 400, height: 400 } },
  ].map(({ w, ...p }, i) => ({ ...p, quote: `"${placeholderText(w, 170 + i * 2)}"` })),
}

export const CTA = {
  // CMS has a U+2028 line separator after "be"
  title: 'Could we be your next assignment?',
  body: placeholderText(26, 180),
  buttons: [{ text: 'Join our talent pool', href: '/contact', style: 'solid' }],
}
