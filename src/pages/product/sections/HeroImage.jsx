import Spacer from '../../../components/Spacer.jsx'
import Img from '../../../components/Img.jsx'

/**
 * HeroImage (data-module "HeroImage") — pages-product N6 (/product-overview first section).
 * Maroon bg, orange text, no padding/radius. Spacer(100, +mt40 <=768), centred max-1100 text block
 * (p40/20, mt40, gap 20, balance; shrink-wraps via auto margins), max-900 image in p40/20 (+mt40 <=768),
 * Spacer(100, +mt40 <=768).
 * Motion: h1 / p .fade--in-up with sal delays 500 / 600.
 * Props: title, body, image
 */
export default function HeroImage({ title, body, image }) {
  return (
    <div data-module="HeroImage" className="flex flex-col bg-maroon text-orange">
      <Spacer className="m:mt-[40px]" />
      <div className="mx-auto mt-[40px] flex max-w-[1100px] flex-col gap-[20px] p-[40px] text-center [text-wrap:balance] m:p-[20px]">
        <h1 data-sal="" data-sal-delay="500" className="fade--in-up type-h3">{title}</h1>
        <p data-sal="" data-sal-delay="600" className="fade--in-up f-16">{body}</p>
      </div>
      <div className="p-[40px] m:mt-[40px] m:p-[20px]">
        <div className="mx-auto max-w-[900px]">
          <Img src={image} alt="" className="h-auto w-full" />
        </div>
      </div>
      <Spacer className="m:mt-[40px]" />
    </div>
  )
}
