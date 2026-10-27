import WhyChoose from '../../components/WhyChoose.jsx'
import Spacer from '../../components/Spacer.jsx'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import Integrations from '../../components/Integrations.jsx'
import CaseStudy from '../../components/CaseStudy.jsx'
import HeroImage from './sections/HeroImage.jsx'
import SeamlessSlide from './sections/SeamlessSlide.jsx'
import SingleColumn from './sections/SingleColumn.jsx'
import useDocumentTitle from './useDocumentTitle.js'
import d from './data/overview.jsx'

// /product-overview — pages-product §4.1 (one-off page).

// display:contents wrapper for the TwoCols icon-tag chips: live .icon-tag has min-width 150px and a fixed
// 25x25 icon (img.icon.small); the shared component renders a content-width chip and a 25x24.2 icon.
const ICON_TAG_FIX = 'contents [&_.icon-tag]:min-w-[150px] [&_.icon-tag_img]:h-[25px]'
export default function ProductOverview() {
  useDocumentTitle(d.documentTitle)
  return (
    <>
      <HeroImage {...d.hero} />
      {/* Elevate: own cream sheet around the bare feature grid. Live: div.max-1400.ma (no bottom margin) then
          div.spacer 100px at every width. The bare grid wrapper carries mb-80, so it is zeroed here and the
          real Spacer follows. */}
      <div data-module="Success" className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px] [&>div:nth-child(2)]:mb-0">
        <WhyChoose variant="feature" bare titleClass="type-h4" maxWidth="max-w-[1400px]" iconTop={false} {...d.elevate} />
        <Spacer />
      </div>
      <SeamlessSlide {...d.seamless} />
      <div className={ICON_TAG_FIX}>
        <TwoColumnRows container="flat" rows={d.twoCols1} />
      </div>
      <SingleColumn {...d.singleColumn} />
      <div className={ICON_TAG_FIX}>
        <TwoColumnRows container="flat" rows={d.twoCols2} />
      </div>
      <Integrations {...d.integrations} />
      <CaseStudy {...d.caseStudy} />
    </>
  )
}
