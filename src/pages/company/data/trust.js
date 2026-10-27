import { placeholderText } from '../../../sections/index.js'
import { A } from './shared.js'

// /trust-centre (pages-company §3.8)
export const HERO_TITLE = 'Trust Centre'

export const INTRO = {
  title: 'Cadmus is trusted by top-ranked universities across the globe.',
  heading: 'Uplifting assessment requires trust',
  paragraphs: [placeholderText(25, 200), placeholderText(22, 202)], // live 23/22 words; 25 matches live line counts
  image: { src: A('1754475527-vector_layer-1.jpg'), width: 1388, height: 908 },
}

const AU = 'Our standard customer terms and conditions in Australia'
const PRIV = 'How we meet privacy and compliance standards in' // CMS has a U+2028 after "and"
export const POLICIES = {
  title: 'Our Policies',
  items: [
    { title: 'Terms & Conditions (AU)', text: AU, href: '/information/terms-and-conditions/' },
    { title: 'Terms & Conditions (UK)', text: 'Our standard customer terms and conditions in the UK', href: '/information/terms-and-conditions-uk/' },
    { title: 'Privacy (AU)', text: `${PRIV} Australia`, href: '/information/privacy-policy-au/' },
    { title: 'Privacy (UK)', text: `${PRIV} the UK`, href: '/information/privacy-policy-uk/' },
    { title: 'Privacy (CA)', text: `${PRIV} Canada`, href: '/information/privacy-policy-ca/' },
    { title: 'Privacy (US)', text: `${PRIV} the US`, href: '/information/privacy-policy-us/' },
    { title: 'Accessibility', text: 'How we make the Cadmus experience accessible to everyone', href: '/information/accessibility/' },
  ],
}

const item = ([file, title, w], i, seed) => ({ icon: A(file), title, text: placeholderText(w, seed + i) })
export const SECURE = {
  title: 'Secure by design',
  intro: placeholderText(44, 210),
  items: [
    ['1753011256-pinkshield.svg', 'Specialist security team', 43],
    ['1753011278-cctv.svg', 'Continuous learning & improvement', 33],
    ['1753011293-incognito.svg', 'Access management', 41],
  ].map((x, i) => item(x, i, 212)),
}

// Item word counts (live 41/67/40/50/37/42) are tuned so each body wraps to the live line count.
export const ENTERPRISE = {
  title: 'Enterprise-grade security and control features',
  intro: placeholderText(24, 220),
  items: [
    ['1753011306-orangecheck.svg', 'Access and authentication', 50],
    ['1771922318-learning.svg', 'Team administration', 76],
    ['1753011328-key.svg', 'SAML Single Sign-On (SSO)', 55],
    ['1753011342-fingerprint.svg', 'Role-Based Access Control', 51],
    ['1753011356-lock.svg', 'Two-step authentication', 48],
    ['1753011034-timer.svg', 'Session management & access policies', 52],
  ].map((x, i) => item(x, i, 222)),
}
