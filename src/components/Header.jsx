import { useEffect, useRef, useState } from 'react'

const SITE = ''

// Desktop dropdown contents (CLONE_SPEC §1 "Dropdowns").
const DROPDOWNS = {
  Products: [
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
      ],
    },
    { label: 'Pricing', links: [['Plans & Pricing', `${SITE}/pricing/`]] },
  ],
  Solutions: [
    {
      label: 'Solutions',
      links: [
        ['For Universities', `${SITE}/solutions/universities/`],
        ['For Educators', `${SITE}/solutions/educators/`],
        ['For Students', `${SITE}/solutions/students/`],
      ],
    },
  ],
  Resources: [
    {
      label: 'Resources',
      links: [
        ['Case Studies', `${SITE}/case-studies/`],
        ['News', `${SITE}/news/`],
        ['Help Docs', 'https://support.cadmus.io'],
      ],
    },
    {
      label: 'Learn',
      links: [
        ['Teaching Guides', `${SITE}/teacher-guides/`],
        ['Video Tutorials', `${SITE}/video-tutorials/`],
      ],
    },
    {
      label: 'Support',
      links: [
        ['Contact Support', `${SITE}/contact/`],
        ['Request a Demo', `${SITE}/request-demo/`],
      ],
    },
  ],
  'About Us': [
    {
      label: 'About Us',
      links: [
        ['Our Story', `${SITE}/about/`],
        ['Careers & Culture', `${SITE}/careers/`],
      ],
    },
  ],
}

// Mobile accordion contents (CLONE_SPEC §1 "Mobile menu" — note differing labels/order vs desktop).
const MOBILE = [
  {
    label: 'Products',
    last: true,
    links: [
      ['Product Overview', `${SITE}/product-overview/`],
      ['Assignments', `${SITE}/product/assignments/`],
      ['Exams', `${SITE}/product/exams/`],
      ['Group Work', `${SITE}/product/group-work/`],
      ['Feedback & Marking', `${SITE}/product/marking-feedback/`],
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
      ['Teaching Guides', `${SITE}/teacher-guides/`],
      ['Video Tutorials', `${SITE}/video-tutorials/`],
      ['Contact Support', `${SITE}/contact`],
      ['Request a Demo', `${SITE}/request-demo/`],
      ['Help Docs', 'https://support.cadmus.io'],
    ],
  },
  {
    label: 'About Us',
    links: [
      ['Our Story', `${SITE}/about/`],
      ['Careers & Culture', `${SITE}/careers/`],
    ],
  },
]

function DropdownPanel({ name, left, panelRef }) {
  const groups = DROPDOWNS[name]
  const isResources = name === 'Resources'
  return (
    <div
      ref={panelRef}
      className="product--dropdown fixed top-[120px] z-11 w-full max-w-[250px] -translate-x-1/2 overflow-hidden rounded-card bg-offwhite text-ink shadow-bar"
      style={{ left }}
    >
      <div className={`flex flex-col p-[20px] ${isResources ? 'gap-[20px]' : 'gap-[10px]'}`}>
        {isResources
          ? groups.map((g) => (
              <div key={g.label} className="flex flex-col gap-[10px]">
                <div className="mb-[10px]">
                  <span className="label">{g.label}</span>
                </div>
                {g.links.map(([text, href]) => (
                  <a key={text} href={href} className="hover-ma">{text}</a>
                ))}
              </div>
            ))
          : groups.map((g, gi) => [
              <div key={g.label} className={gi > 0 ? 'mb-[10px] mt-[10px]' : 'mb-[10px]'}>
                <span className="label">{g.label}</span>
              </div>,
              ...g.links.map(([text, href]) => (
                <a key={text} href={href} className="hover-ma">{text}</a>
              )),
            ])}
      </div>
    </div>
  )
}

export default function Header() {
  const [open, setOpen] = useState(null) // desktop dropdown name
  const [left, setLeft] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false) // mobile
  const [accordion, setAccordion] = useState(null)
  const navRef = useRef(null)
  const panelRef = useRef(null)
  const buttonRefs = useRef({})

  const measure = (name) => {
    const el = buttonRefs.current[name]
    if (!el) return
    const r = el.getBoundingClientRect()
    setLeft(r.left + r.width / 2)
  }

  const toggle = (name) => {
    if (open === name) {
      setOpen(null)
    } else {
      measure(name)
      setOpen(name)
    }
  }

  // mousedown outside (nav buttons + panel) closes; keep centred on resize.
  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (navRef.current?.contains(e.target) || panelRef.current?.contains(e.target)) return
      setOpen(null)
    }
    const onResize = () => measure(open)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const closeMobile = () => {
    setMenuOpen(false)
    setAccordion(null)
  }

  return (
    <>
      <header className="masthead fixed left-0 top-0 z-11 w-full bg-transparent">
        <div className="header--bar mx-auto my-[20px] w-[calc(100%-40px)] max-w-[850px] rounded-card bg-offwhite text-ink shadow-bar">
          <div className="flex items-center justify-between gap-[20px] p-[12px] m:p-[15px]">
            <a href={`${SITE}/`} className="ml-[10px] m:ml-0" aria-label="Cadmus home">
              <div className="logo--main" />
            </a>
            <nav ref={navRef} className="flex gap-[20px] m:hidden">
              {Object.keys(DROPDOWNS).map((name) => (
                <button
                  key={name}
                  type="button"
                  ref={(el) => (buttonRefs.current[name] = el)}
                  className="with-dropdown text-[14px] leading-[19.6px] text-ink"
                  aria-expanded={open === name}
                  onClick={() => toggle(name)}
                >
                  {name}
                </button>
              ))}
            </nav>
            <a href={`${SITE}/contact/`} className="button header-button m:hidden">
              Book a demo
            </a>
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              className={`hamburger-menu hidden m:block ${menuOpen ? 'open' : ''}`}
              onClick={() => (menuOpen ? closeMobile() : setMenuOpen(true))}
            />
          </div>

          {/* Mobile menu: grid-rows 0fr -> 1fr, .35s */}
          <div
            className={`menu-wrapper hidden transition-[grid-template-rows] duration-[350ms] ease-[ease] m:grid ${
              menuOpen ? 'active grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="flex flex-col items-start gap-[40px] px-[15px] py-[20px]">
                {MOBILE.map((item) => {
                  const isOpen = accordion === item.label
                  return (
                    <div key={item.label} className="flex w-full flex-col items-start">
                      <button
                        type="button"
                        className={`label ${isOpen ? '' : 'clear'}`}
                        aria-expanded={isOpen}
                        onClick={() => setAccordion(isOpen ? null : item.label)}
                      >
                        {item.label}
                      </button>
                      <div
                        className={`mobile-submenu grid transition-[grid-template-rows] duration-[350ms] ease-[ease] ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className={`flex flex-col items-start gap-[10px] pt-[20px] ${item.last ? 'pb-0' : 'pb-[20px]'}`}>
                            {item.links.map(([text, href]) => (
                              <a key={text} href={href} className="mobile-menu-link text-[14px]" onClick={closeMobile}>
                                {text}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
                <a href={`${SITE}/contact`} className="button header-button" onClick={closeMobile}>
                  Book a demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      {open && <DropdownPanel name={open} left={left} panelRef={panelRef} />}
    </>
  )
}
