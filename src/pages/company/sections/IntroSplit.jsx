import Img from '../../../components/Img.jsx'
import { scrollToTarget, useLenis } from '../../../motion/index.js'

/**
 * IntroSplit — pages-company §2.5 (careers S1, trust S1). Orange sheet (-mt-40, r32, z auto).
 * Centred h4 title (max 800), then a flipped .45fr/.55fr grid (gap 100): left-aligned h4 + 16px paragraphs
 * (+ optional "Browse careers" button), and a 3:2 r8 cover image. <=768: image first (column-reverse, gap 40).
 * Props:
 *   title       centred h4
 *   heading     left h4
 *   paragraphs  string[]
 *   button      { text, target } outline arrow-button that smooth-scrolls to `target`
 *   image       { src, width, height }
 * No motion.
 */
export default function IntroSplit({ title, heading, paragraphs = [], button, image }) {
  const lenis = useLenis()
  return (
    <div className="relative -mt-[40px] rounded-t-sheet bg-orange p-[40px] m:p-[20px]">
      <div className="mx-auto mb-[40px] mt-[20px] max-w-[1400px] pb-[20px]">
        <p className="type-h4 mx-auto mb-[60px] mt-[40px] max-w-[800px] text-center [text-wrap:balance] m:mb-0">{title}</p>
        <div className="two-columns mb-[40px] grid grid-cols-[.45fr_.55fr] gap-[100px] pt-[20px] lgm:grid-cols-1 lgm:gap-[20px] m:flex m:flex-col-reverse m:gap-[40px]">
          <div className="flex max-w-[550px] flex-col items-start justify-center gap-[20px]">
            <p className="type-h4 [text-wrap:balance]">{heading}</p>
            <div className="f-16 m-fs-14 flex flex-col gap-[20px]">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            {button && (
              <button type="button" className="arrow-button" onClick={() => scrollToTarget(lenis, button.target)}>
                {button.text}
              </button>
            )}
          </div>
          <div className="relative aspect-[3/2] h-full overflow-hidden rounded-img">
            <Img
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
