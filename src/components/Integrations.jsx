import Img from './Img.jsx'
import Spacer from './Spacer.jsx'

/**
 * Integrations — CLONE_SPEC §13. All props default to the homepage.
 * Props:
 *   title   h2.h5 text, string or node (for the spec's ⏎ forced break pass JSX with <br />)
 *   body    p.f-14 lh-21 text (string or node)
 *   tiles   [[name, iconSrc], ...] (default the 6 homepage tiles)
 */
export const TILES = [
  ['Gradebook', '/assets/1752117443-frame.png'],
  ['Canvas', '/assets/1752117464-frame-1.png'],
  ['Moodle', '/assets/1752117483-frame-2.png'],
  ['Blackboard', '/assets/1752117502-frame-3.png'],
  ['D2L Brightspace', '/assets/1752117521-frame-4.png'],
  ['Grammarly', '/assets/1752117542-frame-5.png'],
]

export default function Integrations({
  title = 'Cadmus seamlessly integrates with your current technology ecosystem',
  body = "Whether you're delivering coursework or high-stakes exams, Cadmus fits naturally within your existing institutional workflows. Our integrations make it easy to streamline assessment delivery without added complexity.",
  tiles = TILES,
}) {
  return (
    <section className="relative z-2 -mt-[40px] rounded-t-sheet bg-orange p-[40px] m:p-[20px]">
      <div className="mx-auto mb-0 mt-[40px] flex max-w-[1600px] items-center gap-[40px] m:flex-wrap">
        <div className="flex w-[40%] flex-col gap-[20px] m:w-full">
          <h2 className="type-h5">{title}</h2>
          <p className="f-14-lh15">{body}</p>
        </div>
        <div className="grid w-[60%] grid-cols-3 gap-[20px] m:w-full m:grid-cols-2 m:gap-[10px]">
          {tiles.map(([name, icon]) => (
            <div key={name} className="flex flex-col gap-[10px] rounded-card bg-pure-white p-[20px] m:p-[15px]">
              <div className="flex items-center gap-[10px]">
                <Img src={icon} alt="" className="h-[34px] w-[34px] object-cover m:h-[24px] m:w-[24px]" />
                <h3 className="f-18 m:text-[13px]">{name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Spacer />
    </section>
  )
}
