import Img from '../../../components/Img.jsx'

/**
 * SingleColumn (data-module "SingleColumn") — pages-product N8 (/product-overview).
 * p40/20, no bg. max-1200 full-width image, then a half-width text column pushed right (ml-auto) that
 * overlaps the image bottom by 40px (margin 0 <=768): icon-tag chip, h5, f-16 body + Learn more.
 * Motion: the three blocks are .fade--up.reverse with data-sal (slide in from +20px X, 0.65s, 0.2s delay).
 * Props: image, iconTag { icon, text }, title, body, button { text, href }
 */
export default function SingleColumn({ image, iconTag, title, body, button }) {
  return (
    <div data-module="SingleColumn" className="p-[40px] m:p-[20px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="w-full">
          <Img src={image} alt="" className="h-auto w-full" loading="lazy" />
        </div>
      </div>
      <div className="-mt-[40px] ml-auto w-1/2 m:m-0 m:w-full">
        <div className="flex max-w-[550px] flex-col items-start justify-center gap-[20px] m:mb-[40px]">
          <div
            data-sal=""
            className="fade--up reverse icon-tag mt-[20px] flex min-w-[150px] items-center gap-[10px] rounded-btn bg-offwhite py-[4px] pl-[4px] pr-[12px] shadow-tag m:mb-0"
          >
            <Img src={iconTag.icon} alt="" width={25} height={25} className="h-[25px] w-[25px] object-contain" />
            <p className="sm-heading text-[12px] text-ink">{iconTag.text}</p>
          </div>
          <p data-sal="" className="fade--up reverse type-h5 [text-wrap:balance]">{title}</p>
          <div data-sal="" className="fade--up reverse flex flex-col">
            <div className="f-16 mb-[20px] flex flex-col gap-[20px]">
              <p>{body}</p>
            </div>
            <a className="arrow-button mr-auto" href={button.href}>{button.text}</a>
          </div>
        </div>
      </div>
    </div>
  )
}
