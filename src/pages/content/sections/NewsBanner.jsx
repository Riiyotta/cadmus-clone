import Spacer from '../../../components/Spacer.jsx'

/** N1 NewsBanner — /news hero: maroon, orange text, stacked grid with the newspaper art behind. */
export default function NewsBanner() {
  return (
    <div className="bg-maroon p-[40px] pt-[90px] m:p-[20px]">
      <Spacer className="hidden m:block" />
      <div className="relative mx-auto grid max-w-[1400px]">
        <div className="relative z-2 flex h-full flex-col overflow-hidden text-orange [grid-area:1/1]">
          <Spacer />
          <div className="my-auto flex items-center justify-between m:flex-col m:gap-[20px]">
            <p className="text-heading">Latest News</p>
            <p className="type-h0 text-center">The Cadmus Chronicle</p>
            <p className="text-heading">Est. 2025</p>
          </div>
          <Spacer />
        </div>
        <div className="news--background" />
      </div>
    </div>
  )
}
