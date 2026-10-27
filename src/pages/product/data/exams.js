import { placeholderText as ph } from '../../../sections/index.js'

// /product/exams — pages-product §4.3 (scheme lavender; QuoteCarousel bg #E8E8FF). No Overview section.
export default {
  documentTitle: 'Exams | Cadmus',
  scheme: 'lavender',
  hero: {
    overline: 'Exams',
    title: 'Secure, smart, scalable exams that evolve with you',
    body: 'Deliver secure, flexible digital exams at scale, on campus or online. Cadmus makes it easy to run high-quality assessments that uphold integrity, support diverse learners, and drive meaningful outcomes.',
    image: '/assets/1754525760-exams.png',
  },
  features: {
    title: 'Deliver secure digital exams online\u2028or on campus at scale',
    items: [
      { icon: '/assets/1771922318-learning.svg', title: 'Smarter digital exams at scale', text: ph(13, 1) },
      { icon: '/assets/1753010829-checkmark.svg', title: 'Designed for every learner', text: ph(12, 2) },
      { icon: '/assets/1753011034-timer.svg', title: 'Build once, use forever', text: ph(10, 3) },
    ],
  },
  split: {
    title: 'Deliver smarter, fairer digital exams at scale',
    body: ph(31, 3),
    image: '/assets/1754525988-frame-1430105262.png',
  },
  study: {
    title: 'Shifting to smarter, more secure exams',
    quote: `"${ph(49, 5)}"`,
    author: 'Tash Clutterbuck',
    role: 'Course Coordinator, School of Nursing and Midwifery, University of Notre Dame Australia',
    link: { text: 'Read the full Case Study', href: '/study/case-study-the-university-of-notre-dame/' },
    image: '/assets/1752721470-rectangle-3470759.jpg',
  },
  twoCols: [
    {
      rows: [
        { label: 'MIXED-MODE QUESTION TYPES', title: 'Design the right exam for every outcome', body: ph(33, 6), image: '/assets/1752721728-group-1073715739.png' },
        { label: 'POWERFUL QUESTION LIBRARY', title: 'Build it once,\u2028reuse it forever', body: ph(22, 7), image: '/assets/1754526099-group-1073715332.png' },
        {
          label: 'RICH EXAM CONFIGURATION SETTINGS',
          title: 'Tailor the experience to every learner',
          body: ph(30, 4),
          // Live row 3 has a quote box (page-data twoColumn.content.quote; missing from the spec). It is what
          // made this block 266px short at 390, where the text stacks above the image.
          quote: { text: ph(22, 14), author: 'Professor Angela Hill, Deputy Vice Chancellor, Edith Cowan University' },
          image: '/assets/1754527560-group-1073715333.png',
        },
        { label: 'LOCKED BROWSER CAPABILITIES', title: 'Keep students focused with secure exam settings', body: ph(21, 12), image: '/assets/1754527561-group-1073715702.png' },
        { label: 'CUSTOM ACCESS CODES', title: 'Control who has access to every exam', body: ph(29, 10), image: '/assets/1754527560-group-1073715703.png' },
        { label: 'LEARNING ASSURANCE ANALYTICS', title: 'Ensure every student is genuinely engaged', body: ph(22, 3), image: '/assets/1752722311-group-1073715698.png' },
      ],
    },
  ],
  quote: {
    title: 'Learn how universities are delivering on-campus and online exams using Cadmus',
    quote: `"${ph(53, 0)}"`,
    author: 'Associate Professor Kati Tonkin',
    role: 'Chair, Board of Studies (Society and Culture), University of Western Australia',
    image: '/assets/1757993855-imgbtn_campustours.jpg',
    bg: 'bg-tab-lavender',
  },
  cta: {
    title: 'Provide the structure to success\u2028with high-quality, scaffolded assessments',
    body: ph(24, 13),
    buttons: [
      { text: 'Book a demo', href: '/request-demo', style: 'solid' },
      { text: 'Get a free trial', href: '/contact', style: 'outline' },
    ],
  },
}
