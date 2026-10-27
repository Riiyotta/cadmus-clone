import { placeholderText as ph } from '../../../sections/index.js'

// /product/assignments — pages-product §4.2 (scheme yellow). ⏎ in CMS titles = U+2028.
export default {
  documentTitle: 'Assignments | Cadmus',
  scheme: 'yellow',
  hero: {
    overline: 'Assignments',
    title: 'Run secure, high-quality scaffolded assignments anywhere, anytime',
    body: 'Craft, manage, and elevate assignments through one secure platform that guides students to success.',
    image: '/assets/1752725540-frame-1073715354.png',
  },
  features: {
    title: 'Elevate assessment quality, consistency,\u2028and literacy across your institution',
    items: [
      { icon: '/assets/1753010668-certificate.svg', title: 'Increase student progression and success', text: ph(15, 3) },
      { icon: '/assets/1753010829-checkmark.svg', title: 'Uphold academic integrity with ease', text: ph(14, 19) },
      { icon: '/assets/1753010819-blackboard.svg', title: 'Ease workload, support students', text: ph(16, 3) },
    ],
  },
  split: {
    title: 'An all-in-one assessment\u2028platform built on best practice',
    body: ph(25, 4),
    image: '/assets/1752726493-product-analyse.png',
  },
  study: {
    title: 'Scaffolded assessments\u2028to support students',
    quote: `"${ph(32, 5)}"`,
    author: 'Patrick Stoddart',
    role: 'Senior Manager of Academic and Learning Systems Support, University of Melbourne',
    link: { text: 'Read the full Case Study', href: '/study/case-study-the-university-of-melbourne-enhancing-digital-quality/' },
    image: '/assets/1752621891-rectangle-3470759-1.jpg',
  },
  overview: {
    title: 'Built for the full range of assessment types',
    image: '/assets/1752728657-table-1.png',
  },
  twoCols: [
    {
      rows: [
        { label: 'MULTI-ASSESSMENT FORMATS', title: 'Build assessments\u2028in minutes, not hours', body: ph(24, 6), image: '/assets/1752726608-group-1073715740.png' },
        { label: 'CUSTOMISABLE TOOLS', title: 'Tools to format\u2028assessments your way', body: ph(21, 12), image: '/assets/1752726637-group-1073715586.png' },
        { label: 'PRE-BUILT SKILL MODULES', title: 'Help students build academic skills from the start', body: ph(21, 15), image: '/assets/1752726701-group-1073715585.png' },
        { label: 'ONE DASHBOARD', title: 'See student progression in real time', body: ph(29, 4), image: '/assets/1752726744-group-1073715720.png' },
        { label: 'SUPPORT INDIVIDUAL NEEDS', title: 'Make managing students simple', body: ph(27, 10), image: '/assets/1752726787-group-1073715694.png' },
        { label: 'TIME-SAVING TOOLS', title: 'Save hours on marking', body: ph(24, 11), image: '/assets/1754529640-group-1073715692.png' },
      ],
    },
  ],
  quote: {
    title: 'See how top educators are using Cadmus to transform assessment',
    quote: `"${ph(56, 12)}"`,
    author: 'Professor David Sadler',
    role: 'Deputy Vice-Chancellor Education (former), University of Western Australia',
    image: '/assets/1757993623-david-sadlercard-image.jpg',
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
