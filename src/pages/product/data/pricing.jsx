import { placeholderText as ph } from '../../../sections/index.js'
import lines from '../lines.jsx'
import { INTEGRATIONS } from './overview.jsx'

// /pricing — pages-product §4.8 (one-off page). Bullets / captions not given verbatim in the spec are
// placeholders with the spec's word counts.
const PILOT_BULLETS = [ph(15, 1), ph(17, 12), ph(16, 60), ph(13, 3)]
const contact = (text, style = 'black') => ({ text, href: '/contact/', style })

export default {
  documentTitle: 'Pricing | Cadmus',
  hero: {
    title: 'Scalable, flexible assessment solutions',
    body: ph(24, 0),
    cards: [
      {
        overline: 'For Starting',
        chip: '',
        name: 'Pilot',
        caption: 'Perfect for institutions exploring the value Cadmus brings before scaling up.',
        bullets: [...PILOT_BULLETS, 'Dedicated success team to support implementation.'],
        button: contact('Get started'),
      },
      {
        overline: 'for flexibility',
        chip: 'bg-pink',
        name: 'Pay-Per-User',
        caption: 'Access Cadmus on a per student user basis, meaning you only pay for what you use.',
        bullets: [...PILOT_BULLETS, 'Dedicated project success team to support implementation.'],
        button: contact('Request pricing'),
      },
      {
        overline: 'For Scaling',
        chip: 'bg-yellow',
        name: 'Enterprise',
        caption: 'Ideal for universities ready to roll out Cadmus\u2028institution-wide.',
        bullets: [
          'Full platform access institution-wide, with unlimited scaling capabilities.',
          'Dedicated platform training and onboarding.',
          'Full access to rich assessment template gallery.',
          'Access to academic skills development, long-form written assessment and open-book exams.',
          'Access to student progression and Learning Assurance Analytics.',
          'Access to marking and feedback tools.',
          'Dedicated project success team to support implementation and upscaling of product.',
          'Access to optional add-ons to enhance student and educator experience.',
          '24/7 real-time support.',
        ],
        button: contact('Request pricing'),
      },
    ],
  },
  licence: {
    title: lines('Licences designed to', 'grow with your institution'),
    body: ph(45, 3),
    card: {
      overline: 'For extra support',
      chip: 'bg-blue',
      name: '+ Add-ons',
      caption: ph(20, 0),
      bullets: [
        'Dedicated platform training and onboarding',
        'Dedicated project success team to support implementation',
        'Assessment redesign services',
        'Quizzes',
        'Group work functionality',
        'Multi-format assessment',
        'Locked-down browser functionality to run secure, in-place digital exams',
      ],
      button: contact('Contact Sales Team', 'outline'),
    },
  },
  gettingStarted: {
    title: 'Getting started with Cadmus is simple',
    steps: [
      { number: '01.', title: 'Implementation and onboarding', body: ph(28, 39) },
      { number: '02.', title: 'Dedicated project success team', body: ph(26, 9) },
      { number: '03.', title: 'Succession planning & rich reporting', body: ph(24, 9) },
    ],
  },
  cards: {
    title: 'Here to help, every step of the way',
    subtitle: null,
    sheet: true,
    cards: [
      { image: '/assets/1754544269-vector_layer.png', title: 'Local support', body: ph(38, 11) },
      { image: '/assets/1754544310-vector_layer.png', title: 'Tailored support', body: ph(34, 1) },
      { image: '/assets/1754544285-vector_layer-1.png', title: 'Comprehensive educator training', body: ph(33, 13) },
    ],
  },
  integrations: INTEGRATIONS,
  testimonials: {
    title: 'Hear why people love Cadmus',
    items: [
      { name: 'Keith Murfin', institution: 'University of the Sunshine Coast', quote: `"${ph(40, 0)}"` },
      { name: 'Sharon Crooks', institution: 'Massey University', quote: `"${ph(28, 0)}"` },
      { name: 'Dr William Finlay', institution: 'University of Glasgow', quote: `"${ph(37, 8)}"` },
      { name: 'Darlyn Chutuape', institution: 'Toi Ohama Institute of Technology', quote: `"${ph(36, 6)}"` },
      { name: 'Intifar Chowdhury', institution: 'Flinders University', quote: `"${ph(45, 8)}"` },
      { name: 'Dr Alison Taylor', institution: 'Bond University', quote: `"${ph(46, 1)}"` },
    ],
  },
  // 24 logos, no links (§4.8 order). '094c1cda' resolved to the homepage file 1754543826-….
  logos: [
    '1750938776-rmit_university_logo-1.png',
    '1754544021-rmit_university_logo-2.png',
    '1754543992-usq-logo.png',
    '1754543959-bondlogo_primary_fullcolour_cmyk-1-1.png',
    '1754543932-zayed-university-1.png',
    '1754543906-acu-logo-300x139-1-1.png',
    '1754543854-logo-uon-1.png',
    '1754543826-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png',
    '1754543150-kcl-logo.png',
    '1754543130-maynooth.png',
    '1754543084-avd9ij1nl.png',
    '1754543065-uog_colour-1.png',
    '1754543028-manchester_university_logo-2-1.png',
    '1754543008-uni-of-canberra-logo.png',
    '1754542990-university-of-melbourne.png',
    '1754542974-university_of_western_australia_logo-freelogovectors-net.png',
    '1754542957-flinders_university_logo_horizontal_rgb_master-1.png',
    '1754542894-liverpool-john-moores-university.png',
    '1754542826-images-2-1.png',
    '1754542743-logusc.png',
    '1754542675-university-of-notre-dame-australia-transp-logo.png',
    '1754542661-rmit_university_logo-1.png',
    '1754542557-adelaide_university_logo-svg.png',
    '1754542545-626ba0db1dc4c3b537787e04-1.png',
  ].map((f) => [f]),
  faq: {
    title: 'Frequently Asked Questions',
    image: '/assets/1752310381-group-1073715500-1.png',
    items: [
      {
        question: 'What are the differences between the Cadmus licences?',
        answer: (
          // Live: one <p> with the three blocks separated by <br><br> (blank line between), not three <p>s.
          <p>
            <strong>Pilot</strong> {ph(40, 39)}
            <br />
            <br />
            <strong>Enterprise</strong> {ph(40, 3)}
            <br />
            <br />
            <strong>Pay-Per-User</strong> {ph(40, 9)}
          </p>
        ),
      },
      {
        question: 'How do I know which licence is best suited to my university?',
        answer: <p>{ph(101, 17)}</p>,
      },
      {
        question: 'Is there a minimum contract term?',
        answer: <p>{ph(56, 25)}</p>,
      },
      {
        question: 'Is there a limit on the number of Cadmus users?',
        answer: (
          <p>
            {ph(30, 26)} <em>{ph(4, 27, { sentence: false })}</em> {ph(40, 28)}
          </p>
        ),
      },
    ],
  },
}
