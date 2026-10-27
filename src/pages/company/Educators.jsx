import './company.css'
import Spacer from '../../components/Spacer.jsx'
import WhyChoose from '../../components/WhyChoose.jsx'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import Integrations from '../../components/Integrations.jsx'
import { Cta, ProductHero, QuoteCarousel } from '../../sections/index.js'
import DeliveryTypes from './sections/DeliveryTypes.jsx'
import ExpertList from './sections/ExpertList.jsx'
import { usePageTitle } from './usePageTitle.js'
import { ACADEMIC_TEAM_BODY, ACADEMIC_TEAM_ITEMS, ACADEMIC_TEAM_TITLE, CTA_BODY, CTA_TITLE, CTA_TRY_FOR_FREE, INTEGRATIONS, TASH_QUOTE } from './data/shared.js'
import { DELIVERY, EXPERT_IMAGE, HERO, QUOTE_TITLE, TWO_COLUMNS, WHY } from './data/educators.js'

// /solutions/educators (pages-company §3.2)
export default function Educators() {
  usePageTitle('For Educators | Cadmus')
  return (
    <>
      <ProductHero scheme="brand" {...HERO} />
      <WhyChoose title={WHY.title} items={WHY.items} />
      <DeliveryTypes {...DELIVERY} />
      <TwoColumnRows rows={TWO_COLUMNS} />
      <Spacer />
      <ExpertList title={ACADEMIC_TEAM_TITLE} image={EXPERT_IMAGE} body={ACADEMIC_TEAM_BODY} items={ACADEMIC_TEAM_ITEMS} />
      <Integrations title={INTEGRATIONS.title} body={INTEGRATIONS.body} />
      <QuoteCarousel title={QUOTE_TITLE} {...TASH_QUOTE} bg="bg-cream" band="bg-orange" />
      <Cta title={CTA_TITLE} body={CTA_BODY} buttons={CTA_TRY_FOR_FREE} />
    </>
  )
}
