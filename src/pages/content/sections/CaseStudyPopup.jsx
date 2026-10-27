import { useEffect, useRef } from 'react'
import StudyContent, { getStudy } from './StudyContent.jsx'

/**
 * N11 CaseStudyPopup (desktop /case-studies): fixed off-canvas panel sliding in from the right over a
 * blurred backdrop. Opens with `slug`; closes on Escape or backdrop click (no close button, as live).
 * While open: body overflow hidden + data-lenis-prevent on body; content scrolled to top after 50ms.
 */
export default function CaseStudyPopup({ slug, onClose }) {
  const ref = useRef(null)
  const last = useRef(null)
  const open = !!slug
  if (slug) last.current = slug // keep the content rendered while the panel slides out
  const study = last.current ? getStudy(last.current) : null

  useEffect(() => {
    if (!open) return undefined
    const body = document.body
    body.style.overflow = 'hidden'
    body.setAttribute('data-lenis-prevent', '')
    const t = setTimeout(() => ref.current?.scrollTo(0, 0), 50)
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      body.style.overflow = ''
      body.removeAttribute('data-lenis-prevent')
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <>
      <div className={`popup-backdrop${open ? ' active' : ''}`} onClick={onClose} role="presentation" />
      <div className={`popup-container${open ? ' active' : ''}`} aria-hidden={!open} role="dialog" aria-modal="true">
        <div ref={ref} className="popup-content rounded-card">
          {study && (
            <div className="rounded-card bg-pure-white p-[20px]">
              <StudyContent key={study.slug} study={study} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
