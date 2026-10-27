import Spacer from '../../../components/Spacer.jsx'
import { useLenis, scrollToTarget } from '../../../motion/index.js'

const COLUMNS = [
  {
    label: 'For Educators',
    chip: '',
    title: 'Getting started with Cadmus as an educator',
    body: 'Get the most out of Cadmus with step-by-step videos designed to support your teaching. Learn how to set up assessments, guide your students, and access insights along the way.',
    rule: 'border-orange',
    items: [
      'How to create and manage assessments in your LMS',
      'How to guide students with prompts and resources',
      'How to monitor progress and access marking tools',
    ],
    button: 'Watch Teacher Tutorials',
    target: '#teacher-videos',
  },
  {
    label: 'For Students',
    chip: ' bg-blue',
    title: 'Using Cadmus for the first time? Start here.',
    body: 'Whether you’re working on an assignment or sitting an online exam, these short videos will help you feel prepared and in control. Learn how to get started, use the tools, and submit with confidence.',
    rule: 'border-blue',
    items: [
      'How to access your assessments through your LMS',
      'How to write and format your work in Cadmus',
      'How to submit your work on time',
    ],
    button: 'Watch Student Tutorials',
    target: '#student-videos',
  },
]

/** N14 GuideTypes (video-tutorials): 2 columns with a centre divider, + its Spacer(100) bg-offwhite. */
export default function GuideTypes() {
  const lenis = useLenis()
  return (
    <>
      <div className="relative z-2 -mt-[40px] rounded-t-sheet bg-offwhite p-[40px] m:p-[20px]">
        <div className="with-divider mx-auto mt-[40px] grid max-w-[1400px] grid-cols-2 gap-[60px] lgm:grid-cols-1">
          {COLUMNS.map((c) => (
            <div key={c.label} className="mx-auto flex w-full max-w-[550px] flex-col items-start gap-[20px]">
              <p className={`label${c.chip}`}>{c.label}</p>
              <h3 className="type-h5 max-w-[450px] [text-wrap:balance]">{c.title}</h3>
              <p className="f-14-lh15">{c.body}</p>
              <div className="mt-[20px] w-full">
                <p className={`text-xs-heading w-full border-b border-solid pb-[10px] ${c.rule}`}>What you’ll learn:</p>
                <ul className="list pt-[20px]">
                  {c.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <button type="button" className="arrow-button black mt-[20px]" onClick={() => scrollToTarget(lenis, c.target)}>
                {c.button}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Spacer className="bg-offwhite" />
    </>
  )
}
