import Spacer from '../../../components/Spacer.jsx'

/**
 * SmallHeroBanner (data-module "SmallHeroBanner") — pages-company §2.18 (trust-centre).
 * Maroon/orange: Spacer(100), centred h1 block (p40/20, mt40), Spacer(100). 368 @1440, 322 @390. No motion.
 */
export default function SmallHeroBanner({ title }) {
  return (
    <div data-module="SmallHeroBanner" className="flex flex-col bg-maroon text-orange">
      <Spacer />
      <div className="m-auto mt-[40px] flex max-w-[1100px] flex-col gap-[20px] p-[40px] text-center [text-wrap:balance] m:p-[20px]">
        <h1 className="type-h3">{title}</h1>
      </div>
      <Spacer />
    </div>
  )
}
