import { placeholderText as ph } from '../../../sections/index.js'

// /product/learning-analytics — pages-product §4.5 (scheme blue).
export default {
  documentTitle: 'Learning Analytics | Cadmus',
  scheme: 'blue',
  hero: {
    overline: 'Learning Analytics',
    title: 'Bring clarity and confidence\u2028to learning outcomes',
    body: 'Cadmus tracks the full assessment journey, not just the final submission. Get real-time visibility into how students build their work and take the guesswork out of academic integrity.',
    image: '/assets/1752717843-group-1073715353.png',
  },
  features: {
    title: 'Focus on students, not paperwork',
    items: [
      { icon: '/assets/1753010668-certificate.svg', title: 'Assurance with trust and understanding', text: ph(14, 0) },
      { icon: '/assets/1753010910-heart.svg', title: 'See how, not just what, students learn', text: ph(13, 9) },
      { icon: '/assets/1753010802-book.svg', title: 'Stay focused on learning, not loopholes', text: ph(13, 3) },
    ],
  },
  split: {
    title: 'Built for integrity, \u2028designed for learning',
    body: ph(30, 4),
    image: '/assets/1752717997-group-1073715357-1.png',
  },
  study: {
    title: 'Supporting authentic learning with rich insights',
    quote: `"${ph(61, 34)}"`,
    author: 'Megan Wesphalen',
    role: 'Lecturer, School of Nursing and Midwifery, University of Notre Dame Australia',
    link: { text: 'Read the full Case Study', href: '/study/case-study-the-university-of-notre-dame/' },
    image: '/assets/1752718290-rectangle-3470759.jpg',
  },
  // Trailing \u00a0 on some labels/titles are in the CMS strings and widen the chip / h5 on live.
  twoCols: [
    {
      rows: [
        { label: 'ASSESSMENT TEMPLATES\u00a0\u00a0', title: 'Design assessments\u2028that drive real learning', body: ph(21, 12), image: '/assets/1752718919-group-1000009147.png' },
        { label: 'CLASS MANAGEMENT ANALYTICS\u00a0', title: 'Understand student progression before submission', body: ph(23, 7), image: '/assets/1752719273-group-1073715737.png' },
        { label: 'LEARNING ASSURANCE ANALYTICS', title: 'Analyse the process,\u2028not just the final result', body: ph(26, 8), image: '/assets/1752718957-group-1000009166.png' },
        { label: 'AI EDUCATION & MITIGATION', title: 'Navigate AI with confidence', body: ph(25, 9), image: '/assets/1754528006-group-1073715742.png' },
        { label: 'ASSESSMENT CONSTRUCTION ANALYTICS', title: 'Investigate potential AI misuse\u00a0', body: ph(23, 0), image: '/assets/1752719028-group-1073715743.png' },
      ],
    },
  ],
  quote: {
    title: 'Read how educators are using Cadmus to ensure assure student learning at scale',
    quote: `"${ph(50, 12)}"`,
    author: 'David Israel',
    role: 'Executive Director, Global Education Strategy, University of Melbourne',
    image: '/assets/1757920606-david-israel.jpg',
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
