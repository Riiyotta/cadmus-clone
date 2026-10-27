import Img from './Img.jsx'
// CLONE_SPEC §2 HomepageBanner.
const CARDS = [
  { label: 'Create', icon: '/assets/1753779248-book.svg', photo: '/assets/1754525021-kateryna-hliznitsova-hakuz2yubdm-unsplash-1.jpg' },
  { label: 'Mark', icon: '/assets/1753779437-edit.svg', photo: '/assets/1754544713-istock-2208695167-1-1-1.png' },
  { label: 'Manage', icon: '/assets/1753779505-bolt.svg', photo: '/assets/1754525016-christin-hume-hcfwew744z4-unsplash-1-1.jpg' },
  { label: 'Analyse', icon: '/assets/1753779552-graph-pink.svg', photo: '/assets/1754525016-thisisengineering-dxe_fqxsxuu-unsplash-1.jpg' },
]

export default function Hero() {
  return (
    <div
      data-module="HomepageBanner"
      className="flex min-h-[100svh] flex-col overflow-hidden bg-maroon text-orange t:min-h-[calc(20px+100svh)]"
    >
      <div className="mx-auto mb-0 mt-auto flex max-w-[1100px] flex-col gap-[20px] p-[40px] text-center [text-wrap:balance] m:mb-[40px] m:p-[20px]">
        <h1 data-sal="" data-sal-delay="300" className="fade--in-up type-h1 mt-[90px]">
          Uplifting Assessment
        </h1>
        <p data-sal="" data-sal-delay="400" className="fade--in-up f-18">
          Cadmus enables universities to deliver assessments end-to-end, in one streamlined platform.
        </p>
      </div>

      <div className="m-auto mt-[40px] w-full p-[40px] t:mt-0 m:px-0 m:pb-[40px] m:pt-0">
        <div className="hero-card--wrapper mx-auto mb-0 mt-[40px] flex w-full max-w-[1300px] t:mt-0 gap-[12px] w18:max-w-[1100px] w15:max-w-[1000px] m:m-0 m:scale-[1.15] m:gap-[5px]">
          {CARDS.map((c, i) => (
            <div
              key={c.label}
              data-sal=""
              data-sal-delay={600 + 100 * i}
              className={`fade--in-up fast hero--card w-full ${i % 2 === 0 ? 'mt-[40px] pt-[20px] t:pt-0 m:mt-[20px]' : ''}`}
            >
              <div className="relative flex aspect-[3/4] overflow-hidden rounded-img p-[20px] m:p-[10px]">
                <Img src={c.photo} alt={c.label} className="absolute inset-0 h-full w-full object-cover" />
                <div className="relative z-2 mt-auto">
                  <div className="icon-tag small flex items-center gap-[10px] rounded-btn bg-offwhite py-[4px] pl-[4px] pr-[12px] shadow-tag [transition:background-color_0.3s_ease]">
                    <Img src={c.icon} alt={c.label} className="w-[25px] object-contain lgm:w-[10px]" />
                    <p className="sm-heading text-[12px] text-ink lgm:!text-[8px]">{c.label}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-[40px] m:hidden" />
    </div>
  )
}
