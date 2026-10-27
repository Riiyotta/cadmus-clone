import { placeholderText } from '../../../sections/index.js'

// Copy and data shared across company pages (pages-company §2.3, §2.6, §3).
export const A = (file) => `/assets/${file}`

// Closing Cta (§2.3)
export const CTA_TITLE = 'Provide the structure to success with high-quality, scaffolded assessments'
export const CTA_BODY =
  "Whether you're rolling out assignments, delivering exams, or reporting on results, Cadmus gives you time and clarity to uplift assessment for better learning outcomes."
export const CTA_TRY_FOR_FREE = [
  { text: 'Book a demo', href: '/request-demo', style: 'solid' },
  { text: 'Try for free', href: '/contact', style: 'outline' },
]

// Integrations (uni, edu)
export const INTEGRATIONS = {
  title: 'Securely integrated into your existing university ecosystem',
  body: "Whether you're delivering coursework or high-stakes digital exams, Cadmus fits naturally within your institutional workflows. Our integrations make it easy streamline assessment delivery without adding complexity.",
}

// Academic-team list items (universities bullets = educators ExpertList items)
export const ACADEMIC_TEAM_ITEMS = [
  'End-to-end assessment redesign and digital setup.',
  'Tailored platform training for faculty and students.',
  'Full-scale implementation and adoption support.',
  'Ongoing local support from dedicated specialists.',
  'Comprehensive reporting to understand assessment performance.',
]
export const ACADEMIC_TEAM_BODY =
  'Our Academic Team handles the full rollout of Cadmus across your institution—minimising workload for assessment teams and educator users, and ensuring smooth adoption for both educators and students.'
export const ACADEMIC_TEAM_TITLE = 'Delivered by academic experts for seamless university rollout'

// Educators / students testimonial (§2.7). Quote is long prose -> placeholder (48 words, straight quotes).
export const TASH_QUOTE = {
  quote: `"${placeholderText(48, 11)}"`,
  author: 'Tash Clutterbuck',
  role: 'Lecturer, School of Nursing and Midwifery, University of Notre Dame Australia',
  image: A('1758000553-excellence-in-education-tash-clutterbuck-2-min.jpg'),
}

// Contact / request-demo (§3.6, §3.7, §5)
export const CONTACT_CAPTION =
  'The Cadmus team can provide a product demonstration, guide you on a suitable licence option, or create a tailored assessment design and services package to help your university teach with purpose. '

export const FORM_COPY = {
  title: 'Chat to the team',
  intro: "We'd love to discuss your institution's goals and take you through the Cadmus platform.",
  fields: [
    { label: 'Name*', placeholder: 'Your name' },
    { label: 'Role*', placeholder: 'Please Select' },
    { label: 'Email*', placeholder: 'Your email' },
    { label: 'University*', placeholder: 'Your University' },
    { label: 'Assessment challenge*', placeholder: 'Type here....' },
  ],
  roles: [
    ['University Leader', 'Senior stakeholder'],
    ['Technologist', 'Technical stakeholders'],
    ['Faculty Leader', 'Faculty stakeholder'],
    ['Economic Buyer', 'Economic Buyer'],
    ['Learning Designer', 'T&L stakeholder'],
    ['Academic / Educator', 'Teacher'],
    ['Student', 'Student'],
    ['Other', 'Other'],
    ['Marketing', 'Marketing'],
    ['Shareholder', 'Shareholder'],
    ['Examination Stakeholder', 'Examination Stakeholder'], // value UNVERIFIED in spec
  ],
  disclaimer:
    'Fields marked with an asterisk (*) are required. By clicking submit, you agree to our Terms of Service and Privacy Policy.',
  submit: 'Submit',
  thanksTitle: 'Thank you',
  thanksBody: 'Your details have been successfully submitted and a member of our team will be in touch soon.',
}

// Values icons (about, careers)
export const VALUE_ICONS = {
  star: A('1753010925-star.svg'),
  clap: A('1753010937-clap.svg'),
  shootingStar: A('1753010687-shooting-star.svg'),
  heart: A('1753010910-heart.svg'),
  lightbulb: A('1753010947-lightbulb.svg'),
  handshake: A('1753010966-handshake.svg'),
}
