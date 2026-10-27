import PricingCard from './PricingCard.jsx'

/**
 * LicenceRow — pages-product N10 (/pricing main child 1). Continues the orange hero: p 0 40 40 (0 20 20).
 * max-1300 flex row gap 20 (wraps <=768), mb40 pb40: left h5 + 14px body (max 550, break-spaces);
 * right a PricingCard with a two-col list and an outline button (mt40 <=768). Motion: none.
 * Props: title, body, card (PricingCard props)
 */
export default function LicenceRow({ title, body, card }) {
  return (
    <div className="bg-orange px-[40px] pb-[40px] pt-0 m:px-[20px] m:pb-[20px]">
      <div className="mx-auto mb-[40px] flex max-w-[1300px] gap-[20px] pb-[40px] m:flex-wrap">
        <div className="flex w-1/2 flex-col gap-[20px] m:w-full">
          <p className="type-h5 whitespace-break-spaces">{title}</p>
          <div className="max-w-[550px] whitespace-break-spaces">{body}</div>
        </div>
        <div className="license-card w-1/2 m:mt-[40px] m:w-full">
          <PricingCard twoCol {...card} />
        </div>
      </div>
    </div>
  )
}
