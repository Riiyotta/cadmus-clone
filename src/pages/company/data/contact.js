import { A } from './shared.js'

// /contact (pages-company §3.6)
export const HERO_TITLE = 'Get in touch with us'

export const SUPPORT_ROW = [
  {
    title: 'Need support?',
    paragraphs: [
      'If you’re an educator or student user needing product support, visit the Cadmus Support Library or speak with a Cadmus Support Team Member here.',
    ],
    button: { text: 'Contact support ', href: 'https://support.cadmus.io/kb-tickets/new' },
    image: A('1751189182-title.png'),
  },
]

export const WHY = {
  title: 'We’re here to set you up for success. ',
  items: [
    { icon: A('1753010668-certificate.svg'), text: 'Enhance assessment quality to shape student learning outcomes.' },
    { icon: A('1753010802-book.svg'), text: 'Provide students with a guided assessment working environment.' },
    { icon: A('1753010819-blackboard.svg'), text: 'Access assessment progress data to proactively support students ahead of submission' },
    { icon: A('1753010829-checkmark.svg'), text: 'Streamline educator workloads, enabling more time for student support' },
  ],
}
