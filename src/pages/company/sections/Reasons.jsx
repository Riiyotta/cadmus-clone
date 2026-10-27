import Img from '../../../components/Img.jsx'
/**
 * Reasons (data-module "Reasons") — pages-company §2.14 (careers S2). Cream sheet (-mt-40, r32, z auto).
 * Centred h4, then an equal 2-col grid (gap 100): 5:4 r8 image (stretches to the list height) + numbered list.
 * <=990: list first, image after (gap 40).
 * Props: title, image {src,width,height}, items [{ number, title, body }]
 */
export default function Reasons({ title, image, items = [] }) {
  return (
    <div data-module="Reasons" className="relative -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto max-w-[1400px]">
        <p className="type-h4 mb-[40px] mt-[40px] pb-[20px] text-center [text-wrap:balance] m:mb-[20px]">{title}</p>
        <div className="two-columns equal grid grid-cols-2 gap-[100px] [grid-template-areas:'image_content'] lgm:grid-cols-1 lgm:gap-[40px] lgm:[grid-template-areas:'content'_'image']">
          <div className="relative aspect-[5/4] h-full w-full overflow-hidden rounded-img [grid-area:image]">
            <Img
              src={image.src}
              width={image.width}
              height={image.height}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex w-full flex-col justify-center [grid-area:content]">
            <div className="flex w-full flex-col gap-[20px]">
              {items.map((it) => (
                <div key={it.number} className="flex flex-col gap-[20px]">
                  <div className="flex items-center gap-[20px]">
                    <span className="font-serif text-[30px] leading-[30px] tracking-[-0.0015em] m:text-[24px] m:leading-[24px]">
                      {it.number}
                    </span>
                    <p className="type-h6">{it.title}</p>
                  </div>
                  <p>{it.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
