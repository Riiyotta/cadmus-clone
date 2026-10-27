/**
 * Policies — pages-company §2.19 (trust S2). Light-orange sheet (-mt-40, r32, z2), centred.
 * text-heading label, then an auto-fit grid (minmax(200px,.5fr); col gap 40, row gap 80; 1 col <=990)
 * of policy links: h5 title, f-16 description, arrow icon pushed to the bottom. No hover.
 * Props: title, items [{ title, text, href }]
 */
export default function Policies({ title, items = [] }) {
  return (
    <div className="relative z-2 -mt-[40px] rounded-t-sheet bg-light-orange p-[40px] text-center m:p-[20px]">
      <p className="text-heading mb-[60px] mt-[40px]">{title}</p>
      <div className="mx-auto mb-[80px] grid max-w-[1600px] grid-cols-[repeat(auto-fit,minmax(200px,.5fr))] gap-x-[40px] gap-y-[80px] lgm:grid-cols-1">
        {items.map((it) => (
          <a key={it.href} href={it.href} className="flex max-w-[300px] flex-col items-center gap-[20px] m:mx-auto">
            <p className="type-h5">{it.title}</p>
            <p className="f-16">{it.text}</p>
            <div className="arrow-icon mt-auto" />
          </a>
        ))}
      </div>
    </div>
  )
}
