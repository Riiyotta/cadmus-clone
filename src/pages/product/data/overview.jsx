import { placeholderText as ph } from '../../../sections/index.js'
import lines from '../lines.jsx'

// /product-overview — pages-product §4.1. ⏎ in CMS titles = U+2028.
const learnMore = (href) => ({ text: 'Learn more', href })

export const INTEGRATIONS = {
  title: 'Connect effortlessly with your LMS\u2028and uplift every assessment experience',
  body: ph(29, 3),
}

export default {
  documentTitle: 'Product Overview | Cadmus',
  hero: {
    title: 'The smarter assessment solution',
    body: 'Everything educators need to support, assess and empower students.',
    image: '/assets/1752535456-frame-1430105485.png',
  },
  elevate: {
    title: 'Elevate assessment quality, consistency,\u2028and literacy across your institution',
    items: [
      { icon: '/assets/1753010700-team-blue.svg', title: 'Increase student progression and success', text: ph(15, 3) },
      { icon: '/assets/1753010829-checkmark.svg', title: 'Uphold academic integrity with ease', text: ph(14, 19) },
      { icon: '/assets/1753011034-timer.svg', title: 'Ease workload, support students', text: ph(19, 1) },
    ],
  },
  seamless: {
    title: lines('One platform.  ', 'Every assessment covered.'),
    heading: 'Seamless Assessment',
    body: ph(31, 3),
    video: '/assets/vimeo-1107330055.mp4',
    mobileVideo: '/assets/vimeo-1107332047.mp4',
  },
  twoCols1: [
    {
      iconTag: { icon: '/assets/1752906459-secondary-button.svg', text: 'ASSIGNMENTS' },
      title: 'Cadmus Assignments',
      body: ph(21, 12),
      button: learnMore('/product/assignments/'),
      image: '/assets/1752537911-group-1073715583.png',
    },
    {
      iconTag: { icon: '/assets/1752906564-secondary-wadbutton.svg', text: 'EXAMS' },
      title: 'Cadmus Exams',
      body: ph(21, 36),
      button: learnMore('/product/exams/'),
      image: '/assets/1752537937-group-1073715582.png',
    },
  ],
  singleColumn: {
    iconTag: { icon: '/assets/1752906773-secondary-adbutton.svg', text: 'GROUP WORK' },
    title: 'Cadmus Group Work',
    body: ph(24, 7),
    button: learnMore('/product/group-work/'),
    image: '/assets/1754542193-group-1073715638.png',
  },
  twoCols2: [
    {
      iconTag: { icon: '/assets/1752906960-awdaw.svg', text: 'MARKING & FEEDBACK' },
      title: 'Cadmus Marking & Feedback',
      body: ph(21, 15),
      button: learnMore('/product/marking-feedback/'),
      image: '/assets/1752549961-group-1073715581.png',
    },
    {
      iconTag: { icon: '/assets/1752907049-secondadary-button.svg', text: 'LEARNING ASSURANCE ANALYTICS' },
      title: 'Cadmus Learning\u2028Assurance Analytics',
      body: ph(25, 9),
      button: learnMore('/product/learning-analytics/'),
      image: '/assets/1752537911-group-1073715583.png',
    },
  ],
  integrations: INTEGRATIONS,
  caseStudy: {
    // U+2028 as in the CMS: Chromium does not break there, so live renders 1 line @1440 (388 wide) and wraps
    // naturally @390. A <br/> forced 2 lines @1440/1280.
    title: 'The University\u2028of Manchester',
    quote: {
      quote:
        '"I highly recommend Cadmus; it has supported our accelerated transition to blended and online learning methods, ensuring the authenticity and integrity of online assessments."',
      role: 'Associate Vice President for Teaching, Learning and Students',
    },
  },
}
