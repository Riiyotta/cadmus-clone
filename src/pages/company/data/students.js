import { placeholderText } from '../../../sections/index.js'
import { A } from './shared.js'

// /solutions/students (pages-company §3.3)
export const HERO = {
  overline: 'Cadmus for Students',
  title: 'Less assessment stress, greater student success',
  body: 'Clearly understand assessment requirements, draft assessments with academic guidance, receive support when you need it most and submit with confidence.',
  image: A('1753250181-rectangle-3470840.png'),
}

export const WHY = {
  title: 'Why students should use Cadmus',
  items: [
    { icon: A('1753248209-frame-1000009089.svg'), text: 'Step-by-step instructions that guide you through assessment' },
    { icon: A('1753248280-frame-1321315074.svg'), text: 'Academic support resources embedded in your workspace' },
    { icon: A('1753248339-frame-1272638843.svg'), text: 'Automated academic guidance lets you submit with confidence' },
    { icon: A('1753248386-frame-1272638758.svg'), text: 'Educator feedback directly in your workspace' },
  ],
}

const ROWS = [
  ['Assessment made easier—because everyone learns differently', 27, '1754551261-frame-1430106068.png'],
  ['Less stress, stronger success', 38, '1754529641-d.png'],
  ['Help when and where you need it', 37, '1754551261-frame-1430105998.png'],
  ['Learning assurance without the stress', 38, '1754551261-group-1073715800.png'],
  ['Streamlined feedback for better outcomes', 25, '1754551261-group-1073715804.png'],
]
// Body words: live 27/38/37/38/25, tuned to 32/40/37/41/25 so line counts match live at 1440/1280/390.
export const TWO_COLUMNS = ROWS.map(([title, words, image], i) => ({
  title,
  image: A(image),
  paragraphs: [placeholderText([32, 40, 37, 41, 25][i] ?? words, 50 + i * 3)],
}))

export const BULLETS = {
  title: 'One seamless space for academic success',
  image: { src: A('1754034503-frame-1321314721.jpg'), width: 654, height: 353 },
  bullets: [
    'All your resources, feedback and support tools all in one place.',
    'A calmer, more focused way to approach assessments.',
    'A proven way to enhance confidence, reduce anxiety and showcase what you’ve learnt.',
    'Assessment tasks that mirror the challenges and problem-solving you’ll face in your future career.',
    'Support and feedback are available when you need them, so you’re never left stuck or unsure.',
  ],
}

export const SUPPORT = {
  title: 'Need support with Cadmus?',
  subtitle: 'View our Student User Guides',
  cards: [
    { image: A('1754048249-vector_layer-2.jpg'), title: 'Completing exams in Cadmus', href: 'https://cadmus.io/video/getting-started-for-students/' },
    { image: A('1754048279-vector_layer-1.jpg'), title: 'Accessing grades and feedback', href: '/video/grades-and-feedback/' },
    { image: A('1754048291-vector_layer.jpg'), title: 'Submitting your assesssment', href: '/video/submitting/' },
  ],
}
