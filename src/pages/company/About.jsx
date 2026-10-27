import './company.css'
import ImpactCounter from '../../components/ImpactCounter.jsx'
import LogoMarquee from '../../components/LogoMarquee.jsx'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import Careers from '../../components/Careers.jsx'
import Chronicle from '../../components/Chronicle.jsx'
import { Cta, Values } from '../../sections/index.js'
import HeroBanner from './sections/HeroBanner.jsx'
import Timeline from './sections/Timeline.jsx'
import { usePageTitle } from './usePageTitle.js'
import { CTA_TITLE } from './data/shared.js'
import { CAREERS_IMAGE, CTA_BODY, CTA_BUTTONS, HERO, IMPACT, LOGOS, MISSION, TIMELINE, TWO_COLUMNS, VALUES } from './data/about.js'

// /about (pages-company §3.4)
export default function About() {
  usePageTitle('About Us | Cadmus')
  return (
    <>
      <HeroBanner
        title={
          <p>
            Built with research.
            <br />
            Focused on students. Trusted by educators.
          </p>
        }
        {...HERO}
      />
      <ImpactCounter stats={IMPACT} label="Our Impact so far" bg="bg-orange" zIndex="z-auto" className="m:pt-[40px]" />
      <LogoMarquee title="Trusted by The World’s Leading Universities" logos={LOGOS} bg="bg-orange" />
      <Values title={VALUES.title} items={VALUES.items} bg="bg-light-orange" />
      <TwoColumnRows rows={TWO_COLUMNS} startFlipped={false} rowGap={60} />
      <Timeline {...TIMELINE} />
      <Careers
        image={MISSION.image}
        bg="bg-cream"
        flipped={false}
        overline={null}
        title={MISSION.title}
        titleClass="type-h4 [text-wrap:balance]"
        paragraphs={MISSION.paragraphs}
        button={null}
      />
      <Careers image={CAREERS_IMAGE} />
      <Chronicle />
      <Cta title={CTA_TITLE} body={CTA_BODY} buttons={CTA_BUTTONS} />
    </>
  )
}
