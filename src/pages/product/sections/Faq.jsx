import { useRef, useState } from 'react'
import Img from '../../../components/Img.jsx'

/**
 * FAQs (data-module "FAQs") — pages-product N13 (/pricing).
 * Light-orange sheet (-mt-40, r32 top, static), p40/20. max-1600 row (gap 40, wraps <=768): image left,
 * right h4 (mb40 pb20) + max-850 list of .accordion items (dashed vellum bottom border, mb20).
 * Interaction (pages-product §0.3): all closed by default; clicking a title opens it and closes any other
 * (one open at a time). .content height animates 0 <-> scrollHeight (0.4s, global .accordion CSS); the
 * grid-template-rows 0fr -> 1fr (0.3s) and plus -> minus icon come from .accordion.active.
 * Props: title, image, items [{ question, answer (node) }]
 */
function Item({ question, answer, open, onToggle }) {
  const content = useRef(null)
  const height = open && content.current ? content.current.scrollHeight : 0
  return (
    <div className={`accordion mb-[20px] border-b border-dashed border-vellum${open ? ' active' : ''}`}>
      <div className="title flex justify-between gap-[20px]" onClick={onToggle}>
        <p className="type-h6 m-fs-18 pb-[20px]">{question}</p>
        {/* no shrink-0: live icon is flex 0 1 auto and shrinks to 17.5px wide at 390 */}
        <div className="accordion-icon" />
      </div>
      <div ref={content} className="content" style={{ height }}>
        <div className="with-bold py-[20px]">{answer}</div>
      </div>
    </div>
  )
}

export default function Faq({ title, image, items }) {
  const [open, setOpen] = useState(-1)
  return (
    <div data-module="FAQs" className="-mt-[40px] rounded-t-sheet bg-light-orange p-[40px] m:p-[20px]">
      <div className="mx-auto mb-[40px] mt-[40px] flex max-w-[1600px] gap-[40px] m:flex-wrap">
        <div className="w-1/2 m:w-full">
          <Img src={image} alt="" className="h-auto w-full" loading="lazy" />
        </div>
        <div className="w-1/2 m:mb-[40px] m:w-full">
          <p className="type-h4 mb-[40px] pb-[20px]">{title}</p>
          <div className="faqs max-w-[850px]">
            {items.map((it, i) => (
              <Item key={it.question} {...it} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
