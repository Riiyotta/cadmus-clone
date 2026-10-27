import Img from '../../../components/Img.jsx'
/**
 * Leaders — pages-company §2.15 (careers S5). Cream sheet (-mt-40, r32, z2).
 * Centred intro (h4 + 16px paragraphs, max 800), then a 2-col grid (gap 20; 1 col <=990) of 16:9 photo,
 * h4 name, STIX italic role, an empty text-sm-heading line (keeps its 20px margin) and the bio.
 * Props: title, intro string[], people [{ name, role, bio, image {src,width,height} }]
 */
export default function Leaders({ title, intro = [], people = [] }) {
  return (
    <div className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto mt-[40px] max-w-[1600px]">
        <div className="mx-auto mb-[60px] mt-[20px] max-w-[800px] text-center">
          <p className="type-h4 mb-[20px]">{title}</p>
          <div className="f-16 m-fs-14 flex flex-col gap-[20px]">
            {intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <div className="mb-[40px] grid grid-cols-2 gap-[20px] lgm:grid-cols-1">
          {people.map((p) => (
            <div key={p.name}>
              <div className="relative mb-[20px] aspect-video overflow-hidden rounded-img">
                <Img
                  src={p.image.src}
                  width={p.image.width}
                  height={p.image.height}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="type-h4 mb-[10px]">{p.name}</p>
              <p className="type-italic mb-[10px]">{p.role}</p>
              <p className="text-sm-heading mb-[20px] m:mb-[20px]" />
              <div className="f-16 m-fs-14 mb-[40px] flex flex-col gap-[20px] [text-wrap:balance]">
                <p>{p.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
