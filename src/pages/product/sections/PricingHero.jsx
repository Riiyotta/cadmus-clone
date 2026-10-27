import PricingCard from './PricingCard.jsx'

/**
 * PricingHero + 3 PricingCards — pages-product N9 (/pricing main child 0).
 * Orange first section (no radius / overlap), p40/20. Centred max-1100 heading block (p40/20, mt90, z2,
 * gap 20): h1.h3 (30 <=768) + f-18 caption (16 <=768). Grid max-1300, 3 cols gap 20, my40 (1 col <=768).
 * Motion: none.
 * Props: title, body, cards [PricingCard props]
 */
export default function PricingHero({ title, body, cards }) {
  return (
    <div data-module="PricingHero" className="bg-orange p-[40px] m:p-[20px]">
      <div className="relative z-2 mx-auto mt-[90px] flex max-w-[1100px] flex-col items-center gap-[20px] p-[40px] text-center m:p-[20px]">
        <h1 className="type-h3 m-fs-30">{title}</h1>
        <p className="f-18 m-fs-16 mx-auto my-[20px] max-w-[900px] m:mt-0">{body}</p>
      </div>
      <div className="pricing-cards mx-auto my-[40px] grid max-w-[1300px] grid-cols-3 gap-[20px] m:grid-cols-1">
        {cards.map((c) => (
          <PricingCard key={c.name} {...c} />
        ))}
      </div>
    </div>
  )
}
