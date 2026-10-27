import Img from '../../../components/Img.jsx'
import Spacer from '../../../components/Spacer.jsx'

/**
 * ContentWithBulletPoints (data-module "ContentWithBulletPoints", <section>) — pages-company §2.6.
 * #FFFDFA sheet (-mt-40, r32, z2). max-1300 column (mt40, gap 60): centred h5 (+ optional f-16 subtitle),
 * then a 2-col grid (gap 40; 1 col <=768): 3:2 r8 cover image + dashed bullet list (gap 20).
 * A trailing Spacer(100) is inferred from the section totals (uni 802 / students 738 @1440).
 * Always preceded on the page by a plain Spacer(100).
 * Props: title, subtitle?, image { src, width, height }, bullets string[]
 */
export default function ContentWithBulletPoints({ title, subtitle, image, bullets = [] }) {
  return (
    <section
      data-module="ContentWithBulletPoints"
      className="relative z-2 -mt-[40px] rounded-t-sheet bg-offwhite p-[40px] m:p-[20px]"
    >
      <div className="mx-auto mt-[40px] flex max-w-[1300px] flex-col gap-[60px]">
        <div className="mx-auto flex flex-col items-center gap-[20px] text-center m:m-0">
          <p className="type-h5">{title}</p>
          {subtitle && <p className="f-16 [text-wrap:balance]">{subtitle}</p>}
        </div>
        <div className="grid grid-cols-2 gap-[40px] m:grid-cols-1">
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
          <ul className="m-0 flex flex-col gap-[20px]">
            {bullets.map((b) => (
              <li key={b} className="bullet-point">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Spacer />
    </section>
  )
}
