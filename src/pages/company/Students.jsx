import './company.css'
import Spacer from '../../components/Spacer.jsx'
import WhyChoose from '../../components/WhyChoose.jsx'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import SolutionCards from '../../components/SolutionCards.jsx'
import { Cta, ProductHero, QuoteCarousel } from '../../sections/index.js'
import ContentWithBulletPoints from './sections/ContentWithBulletPoints.jsx'
import { usePageTitle } from './usePageTitle.js'
import { CTA_BODY, CTA_TITLE, CTA_TRY_FOR_FREE, TASH_QUOTE } from './data/shared.js'
import { BULLETS, HERO, SUPPORT, TWO_COLUMNS, WHY } from './data/students.js'

// /solutions/students (pages-company §3.3)
export default function Students() {
  usePageTitle('For Students | Cadmus')
  return (
    <>
      <ProductHero scheme="brand" {...HERO} />
      <WhyChoose title={WHY.title} items={WHY.items} />
      <TwoColumnRows rows={TWO_COLUMNS} />
      <Spacer />
      <ContentWithBulletPoints {...BULLETS} />
      <SolutionCards variant="support" title={SUPPORT.title} subtitle={SUPPORT.subtitle} cards={SUPPORT.cards} />
      {/* The live SupportCards section ends with a 100px spacer (825 / 1654 tall); SolutionCards' support
          variant has none, so it is added here as a cream continuation of that section. */}
      <Spacer className="bg-cream" />
      {/* The live title renders empty (§2.7), so the 20px title block is kept with no text. */}
      <QuoteCarousel title="" {...TASH_QUOTE} bg="bg-light-orange" band="bg-orange" />
      <Cta title={CTA_TITLE} body={CTA_BODY} buttons={CTA_TRY_FOR_FREE} />
    </>
  )
}
