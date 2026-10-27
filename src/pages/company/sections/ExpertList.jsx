import ImageCard from '../../../components/ImageCard.jsx'

/**
 * ExpertList — pages-company §1.2 (educators S5). Orange sheet (-mt-40, r32, z2) wrapping a centred h5
 * (mb60) and a flipped ImageCard (image left, card bottom-right) inside a max-1300 column (mt40).
 * Card: p.f-16 mb20 + dashed-top list (pt20, gap 15) of STIX-italic 16px items.
 * Props: title, image (src), body, items string[]
 */
export default function ExpertList({ title, image, body, items = [] }) {
  return (
    <div className="relative z-2 -mt-[40px] rounded-t-sheet bg-orange p-[40px] m:p-[20px]">
      <div className="mx-auto mt-[40px] max-w-[1300px]">
        <p className="type-h5 mb-[60px] text-center">{title}</p>
        <ImageCard flipped wrapperClass="w-full" src={image}>
          <p className="f-16 mb-[20px]">{body}</p>
          <ul className="list-wrapper flex w-full flex-col gap-[15px] border-t border-dashed border-vellum pt-[20px]">
            {items.map((it) => (
              <li key={it} className="f-italic f-16">
                {it}
              </li>
            ))}
          </ul>
        </ImageCard>
      </div>
    </div>
  )
}
