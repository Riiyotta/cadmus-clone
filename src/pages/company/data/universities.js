import { placeholderText } from '../../../sections/index.js'
import { A } from './shared.js'

// /solutions/universities (pages-company §3.1)
export const HERO = {
  overline: 'Cadmus for Higher Education Leaders',
  title: 'Elevate assessment quality and outcomes institution-wide',
  caption: 'Deliver consistent, high-quality hybrid assessments at scale.',
  image: { src: A('1754472675-full-image-page-header.jpg'), width: 3456, height: 1846 },
}

export const LOGOS = [
  ['1750938797-exeter.png', 'https://www.exeter.ac.uk'],
  ['1754544021-rmit_university_logo-2.png'],
  ['1754543992-usq-logo.png'],
  ['1754543959-bondlogo_primary_fullcolour_cmyk-1-1.png'],
  ['1754543932-zayed-university-1.png'],
  ['1754543906-acu-logo-300x139-1-1.png'],
  ['1754543854-logo-uon-1.png'],
  ['1754543826-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png'],
  ['1754543150-kcl-logo.png'],
  ['1754543130-maynooth.png'],
  ['1754543084-avd9ij1nl.png'],
  ['1754543065-uog_colour-1.png'],
  ['1754543028-manchester_university_logo-2-1.png'],
  ['1754543008-uni-of-canberra-logo.png'],
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

export const WHY = {
  title: 'Transform your assessment workflow institution-wide',
  items: [
    { icon: A('1771922317-academic.svg'), text: 'Support diverse disciplines and delivery modes with scalable, best-practice assessment design.' },
    { icon: A('1753953967-frame-1321315074.svg'), text: 'Streamline the student and educator experience in assessment.' },
    { icon: A('1753954008-frame-1321315076.svg'), text: 'Understand learner journeys through rich end-to-end data.' },
    { icon: A('1753954034-frame-1272638758.svg'), text: 'Reduce educator workloads, freeing them up to focus on what matters.' },
  ],
}

// Placeholder word counts are tuned so each block wraps to the same number of lines as the live copy at
// 1440 / 1280 / 390 (lorem words are shorter than English, so live word counts under-fill).
// [label, title, body words, quote words, author, image]
const ROWS = [
  ['Scaffolded pre-built assessments', 'Elevate assessment quality across your institution', 25, 26, 'Professor David Sadler, Former Deputy Vice-Chancellor (Education), University of Western Australia', '1753241737-group-1073715572.png'],
  ['Guided student environment', 'Boost student progression and success among diverse cohorts', 29, 26, 'Professor Gabrielle Finn, Associate Vice President for Teaching, Learning and Students, The University of Manchester', '1753241820-group-1073715735.png'],
  ['Class management analytics', 'Free up educators to focus on what matters most', 35, 25, 'Associate Professor Kati Tonkin, Chair, Board of Studies (Society and Culture), University of Western Australia', '1754472911-group-1073715749.png'],
  ['Learning Assurance Analytics', 'Protect academic integrity without disrupting the student experience', 35, 39, 'David Israel, Executive Director, Global Education Strategy, University of Melbourne', '1753241871-group-1073715575-1.png'],
  ['Learner journey insights', 'Unlock strategic insights with institution-wide assessment analytics', 37, 37, 'Associate Professor Kati Tonkin Chair, Board of Studies (Society and Culture), University of Western Australia', '1754201284-frame-1430105971.png'],
]
const BODY_SEED = { 2: 159 } // row 3 needs a different word mix to wrap to 5 lines at 1440 and 390
export const TWO_COLUMNS = ROWS.map(([label, title, bodyW, quoteW, author, image], i) => ({
  label,
  title,
  image: A(image),
  paragraphs: [placeholderText(bodyW, BODY_SEED[i] ?? i * 3)],
  quote: { text: placeholderText(quoteW, i * 3 + 1), author },
}))

export const BULLETS = {
  image: { src: A('1754034503-frame-1321314721.jpg'), width: 654, height: 353 },
}

const img = (file, width, height) => ({ src: A(file), width, height })
// Case-study quote word counts/seeds are tuned to the live line counts at 1440/1280/390 (live 65/49/101/90/88 words).
export const CASE_STUDIES = {
  title: 'Hear why university leaders trust Cadmus',
  slides: [
    {
      name: 'The University of Manchester',
      scheme: 'blue',
      quote: placeholderText(65, 21),
      person: 'Professor Gabrielle Finn',
      role: 'Associated Vice President for Teaching, Learning and Students',
      link: '/study/case-study-the-university-of-manchester/',
      image: img('1754422014-the-university-of-manchester-min_1219152588.jpg', 1048, 700),
      highlights: [['89%', 'positive student experience'], ['96.31%', 'student pass rate'], ['+17.6', 'increase in student experience score']],
    },
    {
      name: 'The University of Notre Dame Australia',
      scheme: 'red',
      quote: placeholderText(47, 22),
      person: 'Tash Clutterbuck',
      role: 'Lecturer, School of Nursing and Midwifery',
      link: '/study/case-study-the-university-of-notre-dame/',
      image: img('1754570799-frame-1430106095.jpg', 1573, 1174),
      highlights: [['0', 'breaches of academic misconduct'], ['82.2%', 'positive student experience'], ['77%', 'students found Cadmus very easy to use']],
    },
    {
      name: 'RMIT',
      scheme: 'yellow',
      quote: placeholderText(104, 23),
      person: 'Ishpal Sandhu',
      role: 'Principal Advisor Learning and Teaching (Secondment), College of Business and Law',
      link: '/study/rmit-university/',
      image: img('1754570679-frame-1430106091.jpg', 1570, 1183),
      highlights: [['84.6%', 'exams transitioned to in-semester tasks or open-book assessments'], ['+1.8%', 'increase in student pass rates when working in Cadmus'], ['100%', 'student pass rate']],
    },
    {
      name: 'University of Western Australia',
      scheme: 'lavender',
      quote: placeholderText(93, 24),
      person: 'Professor David Sadler',
      role: 'Deputy Vice-Chancellor, Education (former)',
      link: '/study/case-study-the-university-of-western-australia/',
      image: img('1754570715-frame-1430106092.jpg', 1475, 1111),
      highlights: [['97%', 'educators reported enhanced assessment design abilities'], ['92%', 'reduced academic integrity investigations'], ['89.29%', 'positive student experience']],
    },
    {
      name: 'University of Canberra',
      scheme: 'green',
      quote: placeholderText(85, 17),
      person: 'Stephanie Watts',
      role: 'Lecturer, Faculty of Education',
      link: null,
      image: img('1754570737-frame-1430106093.jpg', 1576, 1174),
      highlights: [['82.2%', 'positive student experience'], ['+4.7%', 'increase in grade average scores'], ['+5.9%', 'increase in pass rates']],
    },
  ],
}
