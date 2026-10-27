import { placeholderText } from '../../../sections/index.js'
import { A } from './shared.js'

// /solutions/educators (pages-company §3.2)
export const HERO = {
  overline: 'Cadmus for Educators',
  title: 'Assessment delivery and success made simple',
  body: 'Cadmus takes the work out of high-quality assessment setup, management, and marking, enabling more time for proactive student support and enhanced success.',
  image: A('1753250367-rectangle-3470840-1.png'),
}

export const WHY = {
  title: 'A trusted end-to-end assessment solution that supports educators',
  items: [
    { icon: A('1753248209-frame-1000009089.svg'), text: 'Deliver high-quality assessments in minutes, not hours.' },
    { icon: A('1753010687-shooting-star.svg'), text: 'Remove the need for multiple systems and frequent student emails.' },
    { icon: A('1771922317-ai-support.svg'), text: 'Manage entire cohorts with real-time insights.' },
    { icon: A('1753010829-checkmark.svg'), text: 'Reduce marking and feedback workload with AI-automated features.' },
  ],
}

export const DELIVERY = {
  title: 'Supporting the delivery of every assessment type',
  // CMS titles carry a leading space (" Assignments").
  items: [
    { icon: A('1754047032-a.svg'), text: ' Assignments', href: '/product/assignments/' },
    { icon: A('1752906564-secondary-wadbutton.svg'), text: ' Exams', href: '/product/exams/' },
    { icon: A('1754047105-seconadwdary-button.svg'), text: ' Group Work', href: '/product/group-work/' },
    { icon: A('1752906960-awdaw.svg'), text: ' Feedback & Marking', href: '/product/marking-feedback/' },
    { icon: A('1752907049-secondadary-button.svg'), text: ' Learning Assurance Analytics', href: '/product/learning-analytics/' },
  ],
  image: { src: A('1754047189-frame-1430105748.png'), width: 5321, height: 2584 },
}

// Placeholder word counts are tuned so each block wraps to the same number of lines as the live copy at
// 1440 / 1280 / 390 (lorem words are shorter than English, so live word counts under-fill).
const ROWS = [
  ['End-To-End delivery', 'All your assessments, just one platform', 34, 40, 'Stephanie Watts, Lecturer, Education, University of Canberra', '1753325132-group-1073715572.png'],
  ['Quality Assessment design', 'Set up and deploy assessments in minutes', 27, 26, 'Associate Professor Kati Tonkin, Board of Studies (Society and Culture), University of Western Australia', '1754529640-group-1073715736.png'],
  ['Less admin, more Support', 'Streamline assessment administration', 37, 29, 'Professor Fiona Smyth, Deputy Dean and Vice Dean for Teaching, Learning and Students, Faculty of Humanities, The University of Manchester', '1754529640-group-1073715680.png'],
  ['Classroom analytics', 'Manage cohort success with ease and efficiency', 34, 37, 'Dr Robert Cowan, Director of Teaching Philosophy, University of Glasgow', '1753325354-group-1073715573.png'],
  ['Streamlined learning assurance', 'Reduce workload attributed to academic misconduct', 28, 44, 'Ishpal Sandhu, Principal Advisor Learning and Teaching (Secondment), College of Business and Law, RMIT', '1754529641-group-1073715580.png'],
  ['AI integration', 'Streamline moderating & marking with AI-automated features', 29, 34, 'Renee Pinkneym, Deputy National Undergraduate Program Coordinator, University of Notre Dame AUSTRALIA', '1754196733-frame-1430106018.png'],
]
export const TWO_COLUMNS = ROWS.map(([label, title, bodyW, quoteW, author, image], i) => ({
  label,
  title,
  image: A(image),
  paragraphs: [placeholderText(bodyW, 30 + i * 3)],
  quote: { text: placeholderText(quoteW, 31 + i * 3), author },
}))

export const EXPERT_IMAGE = A('1754475357-screenshot-2025-02-13-at-5-07-44-pm-1-1.jpg')
export const QUOTE_TITLE = 'Hear why educators love Cadmus'
