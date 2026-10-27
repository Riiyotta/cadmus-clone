import Img from './Img.jsx'
import { assetSize } from './assetSize.js'
/**
 * Experience — CLONE_SPEC §4. Defaults = homepage (heading + looping video, no sheet).
 * Props:
 *   title     default 'A connected experience for educators and students'
 *   video     mp4 src (default '/assets/experience.mp4')
 *   variant   'default' | 'overview' (pages-product §3 "Experience -> Overview": cream sheet
 *             -mt-40 r32, max-1200 centred h4, optional subtitle, full-width image instead of video)
 *   image     overview image src
 *   subtitle  overview p (16px, max-900, mt20) — Oral only
 */
export default function Experience({
  title = 'A connected experience for educators and students',
  video = '/assets/experience.mp4',
  variant = 'default',
  image,
  subtitle,
}) {
  if (variant === 'overview') {
    return (
      <div className="relative -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
        <div className="mx-auto mt-[40px] max-w-[1200px] pb-[40px] text-center">
          <p className="type-h4">{title}</p>
          {subtitle && <p className="f-16 mx-auto mt-[20px] max-w-[900px]">{subtitle}</p>}
          <div className="mt-[40px] pt-[20px]">
            <div className="image">
              <Img src={image} alt="" className="w-full" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  // Intrinsic size -> width/height attrs (preflight video{height:auto}) reserve the box before metadata loads.
  const [vw, vh] = assetSize(video) || []
  return (
    <div data-module="Experience" className="p-[40px] text-center m:p-0">
      <div className="mx-auto my-[40px] flex max-w-[1100px] flex-col gap-[40px] m:gap-[20px] m:pb-[40px]">
        <p className="type-h4 mx-auto mb-[20px] max-w-[900px] whitespace-break-spaces m:m-0 m:p-[20px]">
          {title}
        </p>
        <video
          className="m-auto w-full max-w-[1000px]"
          src={video}
          width={vw}
          height={vh}
          muted
          autoPlay
          loop
          playsInline
        />
      </div>
    </div>
  )
}
