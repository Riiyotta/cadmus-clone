import Img from '../../../components/Img.jsx'
import Spacer from '../../../components/Spacer.jsx'

/**
 * Positions (section#positions) — pages-company §2.16 (careers S7). #FFFDFA sheet (-mt-40, r32, z2).
 * Centred h4, 3-col grid (gap 20; 1 col <=768) of light-orange job cards (r12, card shadow, p20, gap 10),
 * then a centred "Can't find the right role?" block with an outline "Get in touch" button.
 * The trailing Spacer(100) is inferred from the section totals (894 @1440, 1237 @390).
 * Props: title, icon, jobs [{ title, department, date, href }], footer { heading, body, button {text,href} }
 */
export default function Positions({ title, icon, jobs = [], footer }) {
  return (
    <section id="positions" className="relative z-2 -mt-[40px] rounded-t-sheet bg-offwhite p-[40px] m:p-[20px]">
      <div className="mx-auto mt-[40px] max-w-[1200px]">
        <p className="type-h4 mb-[40px] text-center">{title}</p>
        <div className="grid grid-cols-3 gap-[20px] m:grid-cols-1">
          {jobs.map((j) => (
            <a key={j.href} href={j.href} className="flex flex-col gap-[10px] rounded-card bg-light-orange p-[20px] shadow-card">
              <Img src={icon} width="30" height="30" alt="" className="icon small h-[30px] w-[30px] object-contain" />
              <p className="type-h6 mb-[20px]">{j.title}</p>
              <div className="mt-auto flex items-center gap-[10px]">
                <p>{j.department}</p>
                <p className="ml-auto">{j.date}</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mx-auto mt-[40px] flex max-w-[800px] flex-col items-center gap-[20px] pt-[20px] text-center m:p-0">
          <p className="f-16">{footer.heading}</p>
          <p className="f-16 mb-[20px] [text-wrap:balance]">{footer.body}</p>
          <a className="arrow-button" href={footer.button.href}>
            {footer.button.text}
          </a>
        </div>
      </div>
      <Spacer />
    </section>
  )
}
