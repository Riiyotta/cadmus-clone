import { useRef, useState } from 'react'
import { useLenis, scrollToTarget } from '../../../motion/index.js'
import StaticForm from './StaticForm.jsx'
import { placeholderText } from '../../../sections/index.js'

/** Share block: label + 4 icon tiles. Only "download" is interactive (as on the live site). */
function Share({ onDownload }) {
  return (
    <div className="flex flex-col gap-[10px]">
      <p className="text-heading font-medium">Share with colleagues</p>
      <div className="flex justify-end gap-[10px] m:justify-start">
        <div className="share-icon linkedin" />
        <div className="share-icon facebook" />
        <div className="share-icon twitter" />
        <div
          className="share-icon download"
          role="button"
          tabIndex={onDownload ? 0 : undefined}
          aria-label="Download the full Case Study"
          onClick={onDownload}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onDownload?.()}
        />
      </div>
    </div>
  )
}

const FIELDS = [
  { name: 'name', label: 'Name*' },
  { name: 'role', label: 'Role*' },
  { name: 'university', label: 'University*' },
  { name: 'email', label: 'Email*', type: 'email' },
  { name: 'challenge', label: 'Assessment challenge*', textarea: true, placeholder: 'Type here...' },
]
const CONSENT = 'I agree to receive communication from Cadmus. You can unsubscribe at any time.*'

/**
 * N6 About/Share bar + DownloadAccordion (news & study). The download tile opens the accordion and
 * Lenis-scrolls to it (offset -85). `file` = whether a full case-study file exists (none recorded).
 * Inside the case-study popup the popup itself is scrolled (the window is locked there).
 * Study extras (page-data): `about` [title, [words, seed]] renders the "About the university" heading +
 * placeholder paragraph; `author` [name, job] renders the attribution block (both in the left column).
 */
export function ShareWithDownload({ file = false, author = null, about = null }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const lenis = useLenis()
  const onDownload = () => {
    setOpen(true)
    const popup = ref.current?.closest('.popup-content')
    if (popup) {
      const top = ref.current.getBoundingClientRect().top - popup.getBoundingClientRect().top + popup.scrollTop
      popup.scrollTo({ top: top - 85, behavior: 'smooth' })
    } else scrollToTarget(lenis, ref.current)
  }
  return (
    <>
      <div className="introduction mx-auto mt-[40px] flex max-w-[1400px] gap-[20px] p-[20px] m:flex-col-reverse m:p-0">
        <div className="flex flex-col gap-[20px]">
          {about && (
            <>
              <p className="type-h5 max-w-[600px]">{about[0]}</p>
              <div className="max-w-[650px]">{placeholderText(about[1][0], about[1][1])}</div>
            </>
          )}
          {/* live: an empty (0px) about slot precedes the author when there is no about block */}
          {author && !about && <div />}
          {author && (
            <div className="quote-author black mt-[20px] flex flex-col gap-[5px]">
              <p className="text-heading font-medium">{author[0]}</p>
              <p className="f-16">{author[1]}</p>
            </div>
          )}
        </div>
        <div className="ml-auto m:w-full">
          <Share onDownload={onDownload} />
        </div>
      </div>
      <div ref={ref} className={`accordion mx-auto max-w-[1400px] p-[20px] m:p-0${open ? ' active' : ''}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="contact-form-container mt-[20px] flex flex-col gap-[20px] rounded-card bg-light-orange p-[40px] m:p-[20px]">
            <button type="button" aria-label="Close" className="contact-form-close ml-auto" onClick={() => setOpen(false)} />
            <div className="grid grid-cols-2 gap-[20px] lgm:grid-cols-1">
              <div className="flex flex-col gap-[20px]">
                <p className="type-h4 m-fs-30 max-w-[400px] [text-wrap:balance]">Download the full Case Study</p>
                <p className="f-16 m-fs-16 max-w-[400px]">
                  Take an in-depth look at how educators have used Cadmus to better deliver assessments.
                </p>
              </div>
              <div className="relative">
                <StaticForm
                  name="case-study-download"
                  fields={FIELDS}
                  consent={CONSENT}
                  submit="Submit"
                  thanks={file ? 'Your download will begin shortly.' : "We'll get back to you shortly."}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/** Guide variant (ShareBar): right-aligned Share only, hidden at <=768. */
export function ShareOnly() {
  return (
    <div className="mt-[40px] flex pt-[20px] m:hidden">
      <div className="mx-auto w-full max-w-[1400px] text-right">
        <Share />
      </div>
    </div>
  )
}
