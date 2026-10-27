/**
 * PhaseRelease (data-module "PhaseRelease") — pages-product N5 (Oral only).
 * Cream sheet (-mt-40, r32 top, z2, p40/20) > max-1200: centred h4 (mt40 mb40) + 2-col grid (gap 20, mb60;
 * flex column <=768) of bg-card cards (r8, card shadow, p40/20, gap 20): h6 + f-16 (14 <=768) intro + ul.
 * Motion: each card data-sal="fade" (opacity, 0.2s, threshold .5, once).
 * Props: title, cards [{ title, intro, bullets: string[] }]
 */
export default function PhaseRelease({ title, cards }) {
  return (
    <div data-module="PhaseRelease" className="relative z-2 -mt-[40px] rounded-t-sheet bg-cream p-[40px] m:p-[20px]">
      <div className="mx-auto max-w-[1200px]">
        <p className="type-h4 mb-[40px] mt-[40px] text-center [text-wrap:balance]">{title}</p>
        <div className="mb-[60px] grid grid-cols-2 gap-[20px] m:flex m:flex-col">
          {cards.map((c) => (
            <div key={c.title} data-sal="fade" className="flex flex-col gap-[20px] rounded-img bg-offwhite p-[40px] shadow-card m:p-[20px]">
              <p className="type-h6 [text-wrap:balance]">{c.title}</p>
              <div className="f-16 m-fs-14 flex flex-col gap-[20px]">
                <p>{c.intro}</p>
                <ul>
                  {c.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
