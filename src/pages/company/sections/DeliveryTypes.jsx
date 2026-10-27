import Img from '../../../components/Img.jsx'
import Spacer from '../../../components/Spacer.jsx'

/**
 * DeliveryTypes — pages-company §2.10 (educators S2). Pale-yellow sheet (-mt-40, r32, z2).
 * max-1200 column (mt40, gap 20): centred h5, a tab-strip of product LINKS (ConnectedProducts strip styling;
 * always white, no active state; native horizontal scroll on small screens), a full-width image, Spacer(100).
 * Props: title, items [{ icon, text, href }], image { src, width, height }
 */
export default function DeliveryTypes({ title, items = [], image }) {
  const last = items.length - 1
  return (
    <section className="relative z-2 -mt-[40px] rounded-t-sheet bg-pale-yellow p-[40px] m:p-[20px]">
      <div className="mx-auto mt-[40px] flex max-w-[1200px] flex-col gap-[20px]">
        <p className="type-h5 mb-[20px] text-center">{title}</p>
        <menu data-lenis-prevent="" className="connected-menu mb-[20px] flex w-full items-center overflow-x-auto">
          {items.map((it, i) => (
            <div
              key={it.href}
              className={`menu-item-wrapper flex flex-[1_0_auto] items-center px-[31px] lgm:px-[20px] ${
                i === 0
                  ? 'justify-start border-r border-divider !pl-0'
                  : i === last
                  ? 'justify-end !pr-0'
                  : 'justify-center border-r border-divider'
              }`}
            >
              <a
                href={it.href}
                className="menu-item flex items-center gap-[10px] whitespace-nowrap rounded-btn bg-pure-white py-[4px] pl-[4px] pr-[12px]"
              >
                <Img src={it.icon} width="30" height="30" alt="" className="icon small block h-[30px] w-[30px] object-contain" />
                <span className="sm-heading">{it.text}</span>
              </a>
            </div>
          ))}
        </menu>
        <div className="relative overflow-hidden">
          <Img src={image.src} width={image.width} height={image.height} alt="" className="block h-auto w-full" loading="lazy" />
        </div>
        <Spacer />
      </div>
    </section>
  )
}
