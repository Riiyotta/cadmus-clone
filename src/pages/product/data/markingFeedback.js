import { placeholderText as ph } from '../../../sections/index.js'

// /product/marking-feedback — pages-product §4.6 (scheme green).
export default {
  documentTitle: 'Marking & Feedback | Cadmus',
  scheme: 'green',
  hero: {
    overline: 'Marking & Feedback',
    title: 'Less admin. More insight.\u2028Better feedback.',
    body: 'Everything educators need to grade efficiently and at scale while maintaining connection with each student. Reduce load, maintain consistency and support student growth through smarter marking.',
    image: '/assets/1752719753-group-1073715353.png',
  },
  features: {
    title: 'Focus on students, not paperwork',
    items: [
      { icon: '/assets/1753010720-profile.svg', title: 'Insights that improve teaching', text: ph(14, 0) },
      { icon: '/assets/1753011034-timer.svg', title: 'Teach more, mark less', text: ph(17, 5) },
      { icon: '/assets/1753010925-star.svg', title: 'Improve feedback quality', text: ph(15, 0) },
    ],
  },
  split: {
    title: 'Mark faster while staying\u2028focused on student growth',
    body: ph(25, 3),
    image: '/assets/1754528860-frame-1430105239.png',
  },
  study: {
    title: 'A solution that truly supports educator needs',
    quote: `"${ph(75, 2)}"`,
    author: 'Dr Kevin Sobel-Read',
    role: 'Associate Professor, Deputy Dean, Director of Teaching and Learning, School of Law and Justice, University of Newcastle',
    link: { text: 'Read the full Case Study', href: '/study/case-study-the-university-of-newcastle/' },
    image: '/assets/1752718290-rectangle-3470759.jpg',
  },
  twoCols: [
    {
      rows: [
        { label: 'AI-ASSISTED MARKING', title: 'AI that works for you,\u2028not instead of you', body: ph(27, 6), image: '/assets/1754528966-group-1073715578.png' },
        { label: 'FLEXIBLE MARKING', title: 'Mark your way,\u2028with more focus', body: ph(24, 7), image: '/assets/1754528007-group-1073715577.png' },
        { label: 'ONE-CLICK MODERATION\u00a0', title: 'Moderate once,\u2028apply everywhere', body: ph(27, 8), image: '/assets/1754529067-group-1073715348.png' },
        { label: 'IN-LINE ANNOTATION', title: 'Mark smarter, not harder', body: ph(26, 9), image: '/assets/1754529158-group-1073715712.png' },
        { label: 'CUSTOMISABLE RUBRICS', title: 'Make rubrics do the heavy lifting', body: ph(24, 0), image: '/assets/1752720689-group-1073715715.png' },
        { label: 'DETAILED ANALYTICS', title: 'Insights that improve teaching', body: ph(24, 11), image: '/assets/1754529192-group-1073715718.png' },
        { label: 'RULE-BASED FEEDBACK RELEASE', title: 'Feedback that fits your flow', body: ph(24, 12), image: '/assets/1754529243-group-1073715717.png' },
      ],
    },
  ],
  quote: {
    title: 'See how top educators are using Cadmus to \u2028transform assessment',
    quote: `"${ph(44, 3)}"`,
    author: 'Professor Angela Hill',
    role: 'Deputy Vice-Chancellor, Edith Cowan University',
    image: '/assets/1757920437-angela-sqaure-1024x891.jpg',
  },
  cta: {
    title: 'Provide the structure to success\u2028with high-quality, scaffolded assessments',
    body: ph(24, 14),
    buttons: [
      { text: 'Book a demo', href: '/request-demo', style: 'solid' },
      { text: 'Try for free', href: '/contact', style: 'outline' },
    ],
  },
}
