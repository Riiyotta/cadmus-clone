import Spacer from './Spacer.jsx'

const SITE = ''

// CLONE_SPEC §17.
const COLUMNS = [
  {
    label: 'Products',
    links: [
      ['Product Overview', `${SITE}/product-overview/`],
      ['Assignments', `${SITE}/product/assignments/`],
      ['Exams', `${SITE}/product/exams/`],
      ['Group Work', `${SITE}/product/group-work/`],
      ['Marking & Feedback', `${SITE}/product/marking-feedback/`],
      ['Learning Assurance Analytics', `${SITE}/product/learning-analytics/`],
      ['Oral Assessment', `${SITE}/product/oral_assessment/`],
      ['Plans & Pricing', `${SITE}/pricing/`],
    ],
  },
  {
    label: 'Solutions',
    links: [
      ['For Universities', `${SITE}/solutions/universities/`],
      ['For Educators', `${SITE}/solutions/educators/`],
      ['For Students', `${SITE}/solutions/students/`],
    ],
  },
  {
    label: 'Resources',
    links: [
      ['Case Studies', `${SITE}/case-studies/`],
      ['News', `${SITE}/news/`],
      ['Teacher Guides', `${SITE}/teacher-guides/`],
      ['Video Tutorials', `${SITE}/video-tutorials/`],
      ['Request a Demo', `${SITE}/request-demo/`],
      ['Contact Support', 'https://support.cadmus.io/kb-tickets/new', true],
      ['Help Docs', 'https://support.cadmus.io', true],
    ],
  },
  {
    label: 'About Us',
    links: [
      ['Our Story', `${SITE}/about/`],
      ['Careers & Culture', `${SITE}/careers/`],
      ['Privacy Policy', `${SITE}/information/privacy-policy-au/`],
      ['Trust Centre', `${SITE}/trust-centre/`],
      ['Contact Us', 'https://support.cadmus.io/kb-tickets/new', true],
    ],
  },
]

const SOCIALS = [
  ['linkedin', 'https://www.linkedin.com/company/cadmus-io', 'LinkedIn'],
  ['twitter', 'https://x.com/cadmus_io', 'X'],
  ['facebook', 'https://www.facebook.com/cadmus.io', 'Facebook'],
]

export default function Footer() {
  return (
    <footer className="f-13 relative z-3 -mt-[40px] rounded-t-sheet bg-maroon p-[40px] text-footer-text m:p-[20px]">
      {/* Mobile-only centred emblem */}
      <div className="mt-[40px] hidden flex-col m:flex">
        <div className="emblem-footer mx-auto" />
        <Spacer />
      </div>

      <div className="mt-[40px] flex gap-[40px] m:mt-0 m:flex-wrap">
        <div className="information flex w-full max-w-[300px] flex-col">
          <div className="socials mb-[20px] flex gap-[20px]">
            {SOCIALS.map(([cls, href, name]) => (
              <a key={cls} href={href} target="_blank" rel="noreferrer" aria-label={name}>
                <div className={`social-icon ${cls}`} />
              </a>
            ))}
          </div>
          <p>Copyright © {new Date().getFullYear()} Cadmus</p>
          <p>
            Made with <span className="love-icon" /> by{' '}
            <a href="https://lovework.studio" target="_blank" rel="noreferrer" className="hover-wh">
              Lovework Studio
            </a>
          </p>
          <p>Illustrations by Tyler Russell</p>
        </div>

        <div className="ml-auto grid w-full max-w-[1100px] grid-cols-4 gap-[20px] m:grid-cols-1 m:gap-[40px]">
          {COLUMNS.map((col) => (
            <div key={col.label} className="flex flex-col gap-[10px]">
              <span className="text-xs-heading mb-[10px] text-orange">{col.label}</span>
              {col.links.map(([text, href, external]) => (
                <a
                  key={text}
                  href={href}
                  className="hover-wh"
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {text}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Spacer />

      <div className="flex justify-between">
        <div className="emblem-footer m:hidden" />
        {/* .logo--peel + data-sal: wordmark peel-up hook (Animation pass) */}
        <div data-sal="" className="logo--peel">
          <a href={`${SITE}/`} aria-label="Cadmus home">
            <div className="logo--footer m:w-[calc(100vw-40px)]" />
          </a>
        </div>
      </div>
    </footer>
  )
}
