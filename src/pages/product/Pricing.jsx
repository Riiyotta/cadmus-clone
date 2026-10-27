import SolutionCards from '../../components/SolutionCards.jsx'
import Integrations from '../../components/Integrations.jsx'
import ImpactCounter from '../../components/ImpactCounter.jsx'
import LogoMarquee from '../../components/LogoMarquee.jsx'
import PricingHero from './sections/PricingHero.jsx'
import LicenceRow from './sections/LicenceRow.jsx'
import GettingStarted from './sections/GettingStarted.jsx'
import Testimonials from './sections/Testimonials.jsx'
import Faq from './sections/Faq.jsx'
import useDocumentTitle from './useDocumentTitle.js'
import d from './data/pricing.jsx'

// /pricing — pages-product §4.8 (one-off page).
export default function Pricing() {
  useDocumentTitle(d.documentTitle)
  return (
    <>
      <PricingHero {...d.hero} />
      <LicenceRow {...d.licence} />
      <GettingStarted {...d.gettingStarted} />
      <SolutionCards {...d.cards} />
      <Integrations {...d.integrations} />
      <Testimonials {...d.testimonials} />
      <ImpactCounter />
      <LogoMarquee logos={d.logos} />
      <Faq {...d.faq} />
    </>
  )
}
