import Img from '../../../components/Img.jsx'
/**
 * TeamQuotes — pages-company §2.17 (careers S8). Cream sheet (-mt-40, r32, z2).
 * Left-aligned h4, 3-col grid (gap 20; 1 col <=768) of white r8 cards (p15): 5:4 photo, h4 name,
 * STIX italic role (18 <=768), quote paragraph.
 * Props: title, people [{ name, role, quote, image {src,width,height} }]
 */
export default function TeamQuotes({ title, people = [] }) {
  return (
    <div className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto mb-[40px] mt-[40px] max-w-[1600px] pb-[20px]">
        <p className="type-h4 mb-[60px] mt-[20px]">{title}</p>
        <div className="mb-[20px] grid grid-cols-3 gap-[20px] m:grid-cols-1">
          {people.map((p) => (
            <div key={p.name} className="rounded-img bg-pure-white p-[15px]">
              <div className="relative mb-[20px] aspect-[5/4] overflow-hidden rounded-img">
                <Img
                  src={p.image.src}
                  width={p.image.width}
                  height={p.image.height}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="type-h4 mb-[10px] m:mb-[20px]">{p.name}</p>
              <p className="type-italic m-fs-18 mb-[20px]">{p.role}</p>
              <div className="f-16 m-fs-14 flex flex-col gap-[20px] m:mb-[20px]">
                <p>{p.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
