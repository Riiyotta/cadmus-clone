import './company.css'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import ImpactCounter from '../../components/ImpactCounter.jsx'
import { Cta, Values } from '../../sections/index.js'
import HeroBannerAlt from './sections/HeroBannerAlt.jsx'
import IntroSplit from './sections/IntroSplit.jsx'
import Reasons from './sections/Reasons.jsx'
import Leaders from './sections/Leaders.jsx'
import Positions from './sections/Positions.jsx'
import TeamQuotes from './sections/TeamQuotes.jsx'
import { usePageTitle } from './usePageTitle.js'
import { CONNECT, CTA, HERO, IMPACT, INTRO, LEADERS, POSITIONS, REASONS, TEAM, VALUES } from './data/careers.js'

// /careers (pages-company §3.5)
export default function CareersPage() {
  usePageTitle('Careers | Cadmus')
  return (
    <>
      <HeroBannerAlt {...HERO} />
      <IntroSplit {...INTRO} />
      <Reasons {...REASONS} />
      <TwoColumnRows rows={CONNECT} standalone />
      <Values title={VALUES.title} items={VALUES.items} bg="bg-light-orange" overlap={false} />
      <Leaders {...LEADERS} />
      <ImpactCounter stats={IMPACT} label="Our Impact so far" layout="row" bg="bg-orange" className="pb-[40px]" />
      <Positions {...POSITIONS} />
      <TeamQuotes {...TEAM} />
      <Cta {...CTA} />
    </>
  )
}
