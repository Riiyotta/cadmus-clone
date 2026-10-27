import Img from '../../../components/Img.jsx'
import Spacer from '../../../components/Spacer.jsx'
import { scrollToTarget, useLenis } from '../../../motion/index.js'

/**
 * HeroBannerAlt (data-module "HeroBannerAlt") — pages-company §2.1.
 * Centred maroon hero with orange text, padding-top 90.
 *   Image variant (uni, careers): min-height 100svh (calc(100svh+20px) <=1600), cover photo behind the
 *   text, text block centred by auto margins.
 *   No-image variant (contact, request-demo): Spacer(100) before the text block.
 * Motion (sal fade--in-up): overline 500, h1 600, caption 700, button wrapper 700.
 * Props:
 *   overline   optional span.sm-heading
 *   title      h1
 *   caption    p.f-18
 *   image      { src, width, height } desktop cover image (omit for the no-image variant)
 *   mobileImage { src, width, height } cover image at <=768 (careers)
 *   button     { text, target } orange outline button that smooth-scrolls to `target` (careers)
 */
export default function HeroBannerAlt({ overline, title, caption, image, mobileImage, button }) {
  const lenis = useLenis()
  const withImage = Boolean(image)
  return (
    <div
      data-module="HeroBannerAlt"
      className={`relative flex flex-col bg-maroon pt-[90px] text-orange${
        withImage ? ' min-h-[100svh] t:min-h-[calc(100svh+20px)]' : ''
      }`}
    >
      {withImage && (
        <div className="absolute inset-0 h-full w-full">
          <Img
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      )}
      {withImage && (
        <div className="hidden m:block">
          {mobileImage && (
            <div className="absolute inset-0 h-full w-full">
              <Img
                src={mobileImage.src}
                width={mobileImage.width}
                height={mobileImage.height}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      )}
      {!withImage && <Spacer />}
      <div
        className={`relative z-2 mx-auto flex max-w-[1100px] flex-col items-center gap-[20px] p-[40px] text-center m:p-[20px]${
          withImage ? ' my-auto' : ''
        }`}
      >
        {overline && (
          <span data-sal="" data-sal-delay="500" className="fade--in-up sm-heading">
            {overline}
          </span>
        )}
        <h1 data-sal="" data-sal-delay="600" className="fade--in-up type-h3 m-fs-36">
          {title}
        </h1>
        <p
          data-sal=""
          data-sal-delay="700"
          className="fade--in-up f-18 m-fs-16 mx-auto my-[20px] max-w-[900px] m:m-0"
        >
          {caption}
        </p>
        {button && (
          <div data-sal="" data-sal-delay="700" className="fade--in-up">
            <button
              type="button"
              className="arrow-button orange"
              onClick={() => scrollToTarget(lenis, button.target)}
            >
              {button.text}
            </button>
          </div>
        )}
      </div>
      <Spacer className="mb-[40px]" />
    </div>
  )
}
