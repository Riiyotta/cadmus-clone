import './company.css'
import Spacer from '../../components/Spacer.jsx'
import LogoMarquee from '../../components/LogoMarquee.jsx'
import WhyChoose from '../../components/WhyChoose.jsx'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import Integrations from '../../components/Integrations.jsx'
import { Cta } from '../../sections/index.js'
import HeroBannerAlt from './sections/HeroBannerAlt.jsx'
import ContentWithBulletPoints from './sections/ContentWithBulletPoints.jsx'
import CaseStudyCarousel from './sections/CaseStudyCarousel.jsx'
import { usePageTitle } from './usePageTitle.js'
import { ACADEMIC_TEAM_BODY, ACADEMIC_TEAM_ITEMS, ACADEMIC_TEAM_TITLE, CTA_BODY, CTA_TITLE, INTEGRATIONS } from './data/shared.js'
import { BULLETS, CASE_STUDIES, HERO, LOGOS, TWO_COLUMNS, WHY } from './data/universities.js'

// /solutions/universities (pages-company §3.1)
export default function Universities() {
  usePageTitle('For Universities | Cadmus')
  return (
    <>
      <HeroBannerAlt {...HERO} />
      <Spacer className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]" />
      <LogoMarquee title="Trusted by leading universities globally" titleClass="font-medium" logos={LOGOS} bg="bg-cream" />
      <WhyChoose title={WHY.title} items={WHY.items} />
      <TwoColumnRows rows={TWO_COLUMNS} />
      <Spacer />
      <ContentWithBulletPoints title={ACADEMIC_TEAM_TITLE} subtitle={ACADEMIC_TEAM_BODY} image={BULLETS.image} bullets={ACADEMIC_TEAM_ITEMS} />
      <Integrations title={INTEGRATIONS.title} body={INTEGRATIONS.body} />
      <CaseStudyCarousel title={CASE_STUDIES.title} slides={CASE_STUDIES.slides} />
      <Cta title={CTA_TITLE} body={CTA_BODY} />
    </>
  )
}
