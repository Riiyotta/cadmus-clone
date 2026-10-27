/**
 * Testimonials (data-module "Testimonials") — pages-product N12 (/pricing).
 * Cream sheet (-mt-40, r32 top, z2), p40/20. Left-aligned h4 in max-1600 (mt40 mb40 pb20). Grid max-1600,
 * 3 cols, gap 40px 20px (20 <=768; 1 col), pb40 mb40. Card: white, r12, p20, gap 10, card shadow:
 * h7 name, STIX italic institution, 14px quote. Motion / hover: none.
 * Props: title, items [{ name, institution, quote }]
 */
export default function Testimonials({ title, items }) {
  return (
    <div data-module="Testimonials" className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto mb-[40px] mt-[40px] max-w-[1600px] pb-[20px]">
        <p className="type-h4">{title}</p>
      </div>
      <div className="mx-auto mb-[40px] grid max-w-[1600px] grid-cols-3 gap-x-[20px] gap-y-[40px] pb-[40px] m:grid-cols-1 m:gap-[20px]">
        {items.map((t) => (
          <div key={t.name} className="flex flex-col gap-[10px] rounded-card bg-pure-white p-[20px] shadow-card">
            <p className="type-h7">{t.name}</p>
            <p className="type-italic">{t.institution}</p>
            <div>{t.quote}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
