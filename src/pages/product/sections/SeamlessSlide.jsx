import { assetSize } from '../../../components/assetSize.js'
import Spacer from '../../../components/Spacer.jsx'

/**
 * Seamless video slide — pages-product N7 (/product-overview main child 3, no data-module).
 * Orange sheet with r32 top but NO negative margin; p40/20. Centred h4 (max 850, break-spaces) in
 * mb80/mt40 (mb40 <=768), then max-1500 slide: h5, half-width f-16 body, looping muted video
 * (desktop 1366x274 / <=768 630x1366), Spacer(100).
 * The desktop video stays inline (baseline) like the original: live measures a 5px descender gap under it
 * at 1440 and none at 390, so only the mobile one is block-level.
 * Props: title, heading, body, video, mobileVideo
 */
export default function SeamlessSlide({ title, heading, body, video, mobileVideo }) {
  return (
    <div className="relative flex flex-col rounded-t-sheet bg-orange p-[40px] m:p-[20px]">
      <div className="mb-[80px] mt-[40px] m:mb-[40px]">
        <p className="type-h4 mx-auto max-w-[850px] whitespace-break-spaces text-center">{title}</p>
      </div>
      <div className="mx-auto w-full max-w-[1500px]">
        <div className="product-slide flex flex-col gap-[20px]">
          <p className="type-h5">{heading}</p>
          <div className="f-16 w-1/2 m:w-full">{body}</div>
          <div className="m:hidden">
            <video className="inline h-auto w-full align-baseline" src={video} width={assetSize(video)?.[0] ?? 1366} height={assetSize(video)?.[1] ?? 274} muted autoPlay loop playsInline />
          </div>
          <div className="hidden m:block">
            <video className="h-auto w-full" src={mobileVideo} width={assetSize(mobileVideo)?.[0] ?? 630} height={assetSize(mobileVideo)?.[1] ?? 1366} muted autoPlay loop playsInline />
          </div>
        </div>
      </div>
      <Spacer />
    </div>
  )
}
