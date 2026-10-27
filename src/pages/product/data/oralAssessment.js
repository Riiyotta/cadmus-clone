import { placeholderText as ph } from '../../../sections/index.js'
import lines from '../lines.jsx'

// Live bodies with <br>-separated '- ' items (page-data content): word counts per segment, placeholder words.
// segs: [[words, seed], ...]; seeds tuned so each body's line count matches live at 1440/1280/390.
const brBody = (segs) => lines(...segs.map(([n, seed], i) => (i ? '- ' : '') + ph(n, seed)))

// /product/oral_assessment — pages-product §4.7 (scheme maroon). No StudyPreview / QuoteCarousel; the
// highlight split is empty (100px block); extra ImageCard x2, PhaseRelease, Chronicles, LogoMarquee.
const HUBSPOT = 'https://33l73.share.hsforms.com/2WbnvGYVES3-L7KmQseNTdw'

export default {
  documentTitle: 'Oral Assessment | Cadmus',
  scheme: 'maroon',
  hero: {
    overline: 'Oral Assessment',
    title: 'Deliver structured oral assessment with your existing assessment workflows',
    body: ph(31, 3),
    image: '/assets/1771973006-group-1073715744.png',
  },
  features: {
    title: 'Precision oral assurance for assessment in an AI-enabled world',
    titleClass: 'type-h4',
    columns: 4,
    maxWidth: 'max-w-[1400px]',
    items: [
      { icon: '/assets/1771922317-targeted-assurance.svg', title: 'Targeted oral assurance', text: ph(28, 60) },
      { icon: '/assets/1771922318-learning.svg', title: 'Assurance of learning, not surveillance', text: ph(32, 6) },
      { icon: '/assets/1771922317-academic.svg', title: 'Built for real academic practice', text: ph(30, 6) },
      { icon: '/assets/1771922317-ai-support.svg', title: 'Human-led assurance with AI support', text: ph(29, 60) },
    ],
  },
  split: null,
  imageCard: {
    bg: 'bg-orange',
    title: 'Built with universities, for universities.',
    paragraphs: [ph(31, 6), ph(32, 36)],
    button: { text: 'Read more', href: 'https://cadmus.io/news/cadmus-oral-assessment-working-group/' },
    image: '/assets/1772167129-screenshot-2025-02-13-at-5-07-44-pm-2.jpg',
  },
  phaseRelease: {
    title: 'Start simple, scale with confidence.',
    cards: [
      {
        title: 'Available Late May 2026 (Phase 1)',
        intro: ph(19, 18),
        bullets: [
          'Consistent prompts aligned to learning outcomes',
          'No scheduling or additional systems required',
          'Embedded marking and moderation workflows',
          'Scalable, low-friction implementation',
        ],
      },
      {
        title: 'Designed to evolve late 2026 (Phase 2)',
        intro: ph(14, 9),
        bullets: [
          'Link oral responses to student work',
          'Tailor prompts to context and learning outcomes',
          'AI-assisted support to deliver wide scale oral assessment',
        ],
      },
    ],
  },
  chronicle: {
    title: 'Stay close to Cadmus Oral Assessment',
    subtitle: 'Latest product updates, upcoming webinars and news straight to your inbox.',
    items: [
      {
        title: 'Detection to design: Why secure assessment now demands oral assurance',
        href: '/news/detection-to-design-why-secure-assessment-now-demands-oral-assurance/',
        image: '/assets/1770082005-getty-images-ofpozrbdv8g-unsplash.jpg',
      },
      {
        title: 'Beyond proctoring: How Cadmus is redefining secure assessment',
        href: '/news/beyond-proctoring-how-cadmus-is-redefining-secure-assessment/',
        image: '/assets/1769470107-adobestock_733092520-1.jpeg',
      },
      {
        title: 'Cadmus convenes a working group to develop a new approach to oral assurance for secure assessment',
        href: '/news/cadmus-oral-assessment-working-group/',
        image: '/assets/1754564986-surface-8hplpr3hebu-unsplash.jpg',
      },
    ],
    button: { text: 'Keep me updated on Cadmus Oral Assessment', href: HUBSPOT, solid: true },
  },
  overview: {
    title: 'Built for a range of assessment use cases',
    subtitle: 'Cadmus Oral Assessment supports proportionate, defensible oral assurance across disciplines, cohort sizes and assessment designs.',
    image: '/assets/1773882874-vivas-webpage-asset.png',
  },
  twoCols: [
    {
      heading: 'Phase 1: Available Late May 2026',
      rows: [
        { label: 'CREATION (DESIGN)', title: 'Create oral assessment moments aligned to learning outcomes', paragraphs: [brBody([[18, 2], [10, 7], [6, 12], [12, 17], [12, 22]])], image: '/assets/1771973005-building-a-vivas-task.png' },
        { label: 'DELIVERY AND INTEGRITY', title: 'Run secure oral assessment without surveillance or scheduling', paragraphs: [brBody([[44, 0], [9, 5], [11, 10]])], image: '/assets/1771973005-group-1073715744-1.png' },
        { label: 'MARKING & MODERATION', title: 'Streamline marking and moderation at scale', body: ph(21, 12), image: '/assets/1771973006-moderation.png' },
        { label: 'PEDAGOGY PARTNERSHIP', title: 'Turn oral assessment into a powerful learning moment', body: ph(18, 2), image: '/assets/1771973007-marking.png' },
      ],
    },
    {
      heading: 'Phase 2: Coming late 2026/2027',
      rows: [
        { label: 'LINKED ASSESSMENT', title: 'Connect oral explanation to student work', body: ph(27, 9), image: '/assets/1771973582-linked-assessment-settings.png' },
        { label: 'USE CADMUS AI', title: 'Scale oral assessment design with AI-assisted support', paragraphs: [brBody([[25, 0], [7, 7], [11, 0], [10, 1]])], image: '/assets/1771973005-task-builder-linked-assessment-journey.png' },
      ],
    },
  ],
  imageCard2: {
    bg: 'bg-light-orange',
    title: 'Stay up to date with Cadmus Oral Assessment',
    paragraphs: [ph(24, 16), ph(18, 42), 'Can’t attend live? Register your interest to receive the recording and materials.'],
    button: { text: 'Vivas Webinar Registration', href: HUBSPOT },
    image: '/assets/1771920685-vivas-registration.jpg',
  },
  logoMarquee: { bg: 'bg-light-orange' },
  cta: {
    title: 'A new standard for oral assessment at scale',
    body: ph(26, 18),
    buttons: [
      { text: 'Book a demo', href: '/request-demo', style: 'solid' },
      { text: 'Vivas Webinar Registration', href: '/request-demo', style: 'outline' },
    ],
  },
}
