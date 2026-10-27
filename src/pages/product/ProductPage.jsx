import WhyChoose from '../../components/WhyChoose.jsx'
import Experience from '../../components/Experience.jsx'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import Careers from '../../components/Careers.jsx'
import Chronicle from '../../components/Chronicle.jsx'
import LogoMarquee from '../../components/LogoMarquee.jsx'
import { ProductHero, QuoteCarousel, Cta, ImageCta, SCHEMES } from '../../sections/index.js'
import StudyPreview from './sections/StudyPreview.jsx'
import PhaseRelease from './sections/PhaseRelease.jsx'
import useDocumentTitle from './useDocumentTitle.js'

/**
 * Product template (original: src-templates-product-js), driven by one data object per page
 * (src/pages/product/data/*). Section order follows the template; optional sections render only when the
 * page's data has them (Oral: imageCard / phaseRelease / chronicle / imageCard2 / logoMarquee; the other
 * five: study / quote). The template always renders two TwoCols containers; on the five study pages the
 * second one is empty (0px tall on live) but its -mt-40 still pulls the QuoteCarousel up, so it is kept.
 */
const SPLIT_BUTTONS = [
  { text: 'Explore the platform', href: '/product-overview', style: 'solid' },
  { text: 'Book a demo', href: '/request-demo', style: 'outline' },
]

// Literal class strings so Tailwind's JIT emits them. maroon keeps the default light orange.
const QUOTE_BG = {
  yellow: '[&_.bg-light-orange]:bg-yellow',
  lavender: '[&_.bg-light-orange]:bg-lavender',
  pink: '[&_.bg-light-orange]:bg-pink',
  blue: '[&_.bg-light-orange]:bg-blue',
  green: '[&_.bg-light-orange]:bg-green',
}

const imageCardProps = ({ bg, title, paragraphs, button, image }) => ({
  bg,
  image,
  flipped: false,
  ratio: '2/1',
  cardClass: 'max-w-[550px]',
  overline: null,
  title,
  titleClass: 'type-h4 [text-wrap:balance]',
  paragraphs,
  button,
})

export default function ProductPage({ data }) {
  useDocumentTitle(data.documentTitle)
  const scheme = SCHEMES[data.scheme]
  return (
    <>
      <ProductHero scheme={data.scheme} {...data.hero} />

      {/* ProductHighlight: feature grid + highlight split (Oral: empty 100px block) */}
      <div className="relative -mt-[40px] flex flex-col rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
        <WhyChoose variant="feature" bare {...data.features} />
        {data.split ? (
          <ImageCta variant="split" buttons={SPLIT_BUTTONS} {...data.split} />
        ) : (
          // Oral: the CMS split is empty but its markup still renders: 100px on desktop (pb40 + gaps), 160px
          // at <=768 where the m-mt20/m-mb20 image column and the 1-col grid gap add 60px. ImageCta's
          // `empty` is a fixed 100px, so this is local.
          <div className="h-[100px] m:h-[160px]" />
        )}
      </div>

      {data.imageCard && <Careers {...imageCardProps(data.imageCard)} />}
      {data.phaseRelease && <PhaseRelease {...data.phaseRelease} />}
      {data.chronicle && <Chronicle columns={2} bg="bg-light-orange" {...data.chronicle} />}
      {data.study && <StudyPreview accent={scheme.accent} {...data.study} />}
      {data.overview && <Experience variant="overview" {...data.overview} />}
      {/* display:contents wrapper (no box, so the -mt-40 stacking is unchanged) that adjusts the TwoCols quote
          box (Exams row 3) to live: bg = scheme accent (.br-12.bg-<accent>; the shared component hardcodes
          bg-light-orange), and +20px top, because live renders the box as its own third fade--up block (one
          more 20px flex gap) instead of inside the body block. The author line is full width on live (455 @1440;
          its .max-350 class has no effect there). */}
      <div className={`contents [&_.bg-light-orange]:mt-[20px] [&_.bg-light-orange_.text-xs-heading]:max-w-none ${QUOTE_BG[data.scheme] || ''}`}>
        {[0, 1].map((i) => (
          <TwoColumnRows key={i} labelClass={scheme.chip} rows={data.twoCols[i]?.rows || []} heading={data.twoCols[i]?.heading} />
        ))}
      </div>
      {data.quote && <QuoteCarousel band={scheme.accent} {...data.quote} />}
      {data.imageCard2 && <Careers {...imageCardProps(data.imageCard2)} />}
      {data.logoMarquee && <LogoMarquee {...data.logoMarquee} />}
      <Cta bg={scheme.cta} {...data.cta} />
    </>
  )
}
