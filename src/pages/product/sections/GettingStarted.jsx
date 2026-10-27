/**
 * GettingStarted (data-module "GettingStarted") — pages-product N11 (/pricing).
 * White sheet (-mt-40, r32 top, static), p40/20. Centred h4 (mt40 mb40), grid max-1300, 3 cols gap 60
 * (1 col <=768), pt20 pb40 mb40. Step: h5.marker numeral (highlighter bar, line-height 1), h6 title, 14px body.
 * Motion: none.
 * Props: title, steps [{ number, title, body }]
 */
export default function GettingStarted({ title, steps }) {
  return (
    <div data-module="GettingStarted" className="-mt-[40px] rounded-t-sheet bg-pure-white p-[40px] m:p-[20px]">
      <div className="mx-auto mb-[40px] mt-[40px] max-w-[1300px] text-center">
        <p className="type-h4">{title}</p>
      </div>
      <div className="mx-auto mb-[40px] grid max-w-[1300px] grid-cols-3 gap-[60px] pb-[40px] pt-[20px] m:grid-cols-1">
        {steps.map((s) => (
          <div key={s.number} className="flex flex-col gap-[20px]">
            <p className="type-h5 marker mr-auto">
              <span>{s.number}</span>
            </p>
            <p className="type-h6">{s.title}</p>
            <div>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
