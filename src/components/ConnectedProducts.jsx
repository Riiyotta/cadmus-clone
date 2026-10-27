import Img from './Img.jsx'
import ImageCard from './ImageCard.jsx'
import { useSwiperFade } from '../motion/index.js'

const SITE = ''

// CLONE_SPEC §5. Section bg / active-tab bg per product colour (§0.2); swapped instantly on click.
const TABS = [
  {
    label: 'Assignments',
    icon: '/assets/1752906459-secondary-button.svg',
    image: '/assets/1754564986-surface-8hplpr3hebu-unsplash.jpg',
    section: 'bg-tab-yellow',
    active: 'bg-yellow',
    title: 'Streamline assignments, boost success',
    body: 'Simplify assignment creation, gain insights into student progression with tasks, and proactively support student wellbeing and outcomes—all in one powerful end-to-end platform.',
    href: `${SITE}/product/assignments/`,
  },
  {
    label: 'Exams',
    icon: '/assets/1752906564-secondary-wadbutton.svg',
    image: '/assets/1754566396-kateryna-hliznitsova-ylacfjwry6c-unsplash.jpg',
    section: 'bg-tab-lavender',
    active: 'bg-lavender',
    title: 'Deliver smarter, fairer digital exams at scale',
    body: 'Whether online or on campus, Cadmus makes secure assessments simple—from customisable question types and learner-focused features, to integrity tools that support every student, every step of the way.',
    href: `${SITE}/product/exams/`,
  },
  {
    label: 'Group Work',
    icon: '/assets/1752906773-secondary-adbutton.svg',
    image: '/assets/1757918035-kateryna-hliznitsova-ye7hwgyte4a-unsplash-3-min.jpg',
    section: 'bg-tab-pink',
    active: 'bg-pink',
    title: 'Collaboration made simple',
    body: 'All aspects of group work in one connected platform: from group creation and shared tasks to feedback and performance insights. It’s our real-world project management tool, built for education.',
    href: `${SITE}/product/group-work/`,
  },
  {
    label: 'Feedback & Marking',
    icon: '/assets/1752906960-awdaw.svg',
    image: '/assets/1757917806-adobestock_291474059-1-min.jpeg',
    section: 'bg-tab-green',
    active: 'bg-green',
    title: 'Effortless marking with greater impact',
    body: 'Everything educators need to grade efficiently at scale while staying connected to students. Reduce cognitive load, maintain consistency and support growth through smarter marking and powerful feedback tools.',
    href: `${SITE}/product/marking-feedback/`,
  },
  {
    label: 'Learning Assurance Analytics',
    icon: '/assets/1752907049-secondadary-button.svg',
    image: '/assets/1754565818-pexels-vazhnik-7864534.jpg',
    section: 'bg-tab-blue',
    active: 'bg-blue',
    title: 'Built for integrity, designed for learning',
    body: "With real-time progress insights, Learning Assurance Analytics and clear AI usage guidance, Cadmus helps institutions foster learning, not just catch misconduct. It's a smarter, fairer way to ensure integrity.",
    href: `${SITE}/product/learning-analytics/`,
  },
]

export default function ConnectedProducts() {
  // Swiper fade (crossFade false, speed 300, no loop/autoplay); tab click -> slideTo(i).
  const fade = useSwiperFade(TABS.length)
  const active = fade.active
  const setActive = fade.goTo
  const current = TABS[active]
  const last = TABS.length - 1

  return (
    <div
      data-module="Connected"
      className={`relative z-2 -mt-[40px] rounded-t-sheet p-[40px] m:p-[20px] ${current.section}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="my-[40px] flex flex-col gap-[40px] text-center m:mb-[20px]">
          <p className="type-h4 mx-auto max-w-[900px] whitespace-break-spaces">With connected products</p>
        </div>

        <menu data-lenis-prevent="" className="connected-menu mb-[20px] flex w-full items-center overflow-x-auto" role="tablist">
          {TABS.map((tab, i) => (
            <div
              key={tab.label}
              className={`menu-item-wrapper flex flex-[1_0_auto] items-center px-[31px] lgm:px-[20px] ${
                i === 0
                  ? 'justify-start border-r border-divider !pl-0'
                  : i === last
                  ? 'justify-end !pr-0'
                  : 'justify-center border-r border-divider'
              }`}
            >
              <button
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={`menu-item flex cursor-pointer items-center gap-[10px] whitespace-nowrap rounded-btn py-[4px] pl-[4px] pr-[12px] [transition:background-color_0.3s_ease] ${
                  i === active ? `active ${tab.active}` : ''
                }`}
              >
                <Img src={tab.icon} alt={tab.label} className="block h-[30px] w-[30px] object-contain" />
                <span className="sm-heading">{tab.label}</span>
              </button>
            </div>
          ))}
        </menu>

        {/* Fade "swiper": all slides stacked in one grid cell; opacity model in src/motion/useSwiperFade.js. */}
        <div className="connected-slides grid">
          {TABS.map((tab, i) => (
            <div
              key={tab.label}
              role="tabpanel"
              aria-hidden={i !== active}
              className="[grid-area:1/1]"
              style={fade.slideStyle(i)}
            >
              <ImageCard src={tab.image} alt={tab.label} wrapperClass={`max-w-[1400px] ${current.section}`}>
                <p className="type-h4 [text-wrap:balance]">{tab.title}</p>
                <div className="f-16">{tab.body}</div>
                <a className="arrow-button" href={tab.href}>Learn more</a>
              </ImageCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
