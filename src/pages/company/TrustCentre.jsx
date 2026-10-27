import './company.css'
import Spacer from '../../components/Spacer.jsx'
import { Values } from '../../sections/index.js'
import SmallHeroBanner from './sections/SmallHeroBanner.jsx'
import IntroSplit from './sections/IntroSplit.jsx'
import Policies from './sections/Policies.jsx'
import { usePageTitle } from './usePageTitle.js'
import { ENTERPRISE, HERO_TITLE, INTRO, POLICIES, SECURE } from './data/trust.js'

// /trust-centre (pages-company §3.8)
export default function TrustCentre() {
  usePageTitle('Trust Centre | Cadmus')
  return (
    <>
      <SmallHeroBanner title={HERO_TITLE} />
      <IntroSplit {...INTRO} />
      <Policies {...POLICIES} />
      <Values {...SECURE} bg="bg-cream" zIndex="z-2" />
      <Values {...ENTERPRISE} bg="bg-pure-white" zIndex="z-2" />
      <Spacer className="bg-pure-white m:hidden" />
    </>
  )
}
