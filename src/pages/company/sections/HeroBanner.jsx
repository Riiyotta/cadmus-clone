import Img from '../../../components/Img.jsx'
import Spacer from '../../../components/Spacer.jsx'

/**
 * HeroBanner (data-module "HeroBanner") — pages-company §2.12 (about).
 * Maroon/orange, min-height 100svh (+20 <=1600). Spacer(100/60), centred h1 (mt 90), Spacer(100, hidden
 * <=768), then an edge-to-edge 9:2 image strip (desktop) or a separate mobile image.
 * Motion: h1 fade--in-up delay 300; images fade--in delay 500.
 * Props:
 *   title        h1 content (node; the original wraps a <p> with a <br>)
 *   image        { src, width, height } desktop strip (rendered 9:2)
 *   mobileImage  { src, width, height } <=768 image (natural ratio)
 */
export default function HeroBanner({ title, image, mobileImage }) {
  return (
    <div
      data-module="HeroBanner"
      className="flex min-h-[100svh] flex-col bg-maroon text-orange t:min-h-[calc(100svh+20px)]"
    >
      <Spacer mobile60 />
      <div className="mx-auto mt-[90px] flex max-w-[1100px] flex-col gap-[20px] p-[40px] text-center [text-wrap:balance] m:p-[20px]">
        <h1 data-sal="" data-sal-delay="300" className="fade--in-up type-h3 m-fs-36">
          {title}
        </h1>
      </div>
      <Spacer className="m:hidden" />
      <div data-sal="" data-sal-delay="500" className="fade--in mb-auto pb-[60px] m:hidden">
        <div className="relative aspect-[9/2] w-full overflow-hidden">
          <Img
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
      <div data-sal="" data-sal-delay="500" className="fade--in hidden m:block">
        <Img
          src={mobileImage.src}
          width={mobileImage.width}
          height={mobileImage.height}
          alt=""
          className="mb-[60px] block h-auto w-full"
        />
      </div>
    </div>
  )
}
