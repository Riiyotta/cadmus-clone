import { placeholderText as ph } from '../../../sections/index.js'

// /product/group-work — pages-product §4.4 (scheme pink). StudyPreview has no link.
export default {
  documentTitle: 'Group Work | Cadmus',
  scheme: 'pink',
  hero: {
    overline: 'Group Work',
    title: 'Effortless group work, real-world readiness',
    body: 'All aspects of group work into one connected platform—from group creation and task management, to peer feedback and insights. Built to save educators time and set students up for real-world collaboration.',
    image: '/assets/1752621785-group-1073715331-1.png',
  },
  features: {
    title: 'Transform how students collaborate,\u2028and how educators manage group assessments',
    items: [
      { icon: '/assets/1771922318-learning.svg', title: 'Simplify group setup', text: ph(10, 1) },
      { icon: '/assets/1753010829-checkmark.svg', title: 'Track collaboration with ease', text: ph(12, 2) },
      { icon: '/assets/1753010966-handshake.svg', title: 'Build real-world teamwork skills', text: ph(12, 3) },
    ],
  },
  split: {
    title: 'How Cadmus supports a collaborative learning environment',
    body: ph(24, 60),
    image: '/assets/1752621856-group-1073715358-1.png',
  },
  study: {
    title: 'Driving better student outcomes with insights that matter',
    quote: `"${ph(55, 5)}"`,
    author: 'Bronwyn Alton',
    role: 'Principal Academic Staff Member, Toi Ohomai Institute of Technology',
    link: null,
    image: '/assets/1752626702-rectangle-3470759.jpg',
  },
  twoCols: [
    {
      rows: [
        { label: 'GROUP ASSIGNING', title: 'Quick and easy\u2028group formation', body: ph(26, 6), image: '/assets/1754528219-group-1073715745v1.png' },
        { label: 'GROUP TASK MANAGEMENT', title: 'Make collaboration\u2028clear and structured', body: ph(27, 7), image: '/assets/1752628698-group-1073715341.png' },
        { label: 'PROGRESS TRACKER', title: 'Stay on top of progress\u2028without micromanaging', body: ph(24, 8), image: '/assets/1754528296-group-1073715576.png' },
        { label: 'COLLABORATIVE TOOLS', title: 'Connect and collaborate in real time', body: ph(26, 9), image: '/assets/1752628781-group-1073715710.png' },
        { label: 'EVALUATION TOOLS', title: 'Promote reflection, fairness and student growth', body: ph(26, 10), image: '/assets/1752628828-group-1073715710-1.png' },
      ],
    },
  ],
  quote: {
    title: 'See how top educators are using Cadmus to transform assessment',
    quote: `"${ph(55, 0)}"`,
    author: 'Bronwyn Alton',
    role: 'Principal Academic Staff Member, Toi Ohomai Institute of Technology',
    image: '/assets/1772165082-screenshot-2025-02-13-at-5-07-44-pm-2.jpg',
  },
  cta: {
    title: 'Provide the structure to success\u2028with high-quality, scaffolded assessments',
    body: ph(24, 13),
    buttons: [
      { text: 'Book a demo', href: '/request-demo', style: 'solid' },
      { text: 'Try for free', href: '/contact', style: 'outline' },
    ],
  },
}
