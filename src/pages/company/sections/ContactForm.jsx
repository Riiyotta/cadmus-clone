import { useEffect, useRef, useState } from 'react'

/**
 * ContactForm (data-module "ContactForm", section#contact) — pages-company §2.9 + §5.
 * Same markup as the original Netlify form, but a STATIC stand-in: submit is prevented and only the
 * thank-you overlay is shown (no network request). Native HTML5 validation (required, type=email).
 * After the overlay opens the form is reset 500ms later, as on the original.
 * Props:
 *   name     'contact-form' (orange section, light-orange thank-you panel)
 *            | 'demo-form' (light-orange section, orange thank-you panel)
 *   title, intro   heading block copy
 *   copy     { fields: [...], roles: [[label, value]], disclaimer, submit, thanksTitle, thanksBody }
 */
export default function ContactForm({ name = 'contact-form', title, intro, copy }) {
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)
  const resetTimer = useRef(null)
  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const demo = name === 'demo-form'
  const sectionBg = demo ? 'bg-light-orange' : 'bg-orange'
  const panelBg = demo ? 'bg-orange' : 'bg-light-orange'

  const onSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => formRef.current?.reset(), 500)
  }

  const [nameF, roleF, emailF, uniF, challengeF] = copy.fields

  return (
    <section id="contact" data-module="ContactForm" className={`relative z-2 -mt-[40px] rounded-t-sheet p-[40px] m:p-[20px] ${sectionBg}`}>
      <div className="mx-auto max-w-[1100px] pb-[40px]">
        <div className="mx-auto mt-[20px] max-w-[700px] pb-[20px] text-center [text-wrap:balance]">
          <p className="type-h4 mb-[20px]">{title}</p>
          <p className="f-16">{intro}</p>
        </div>
        <div className="contact-form-container relative mb-[20px] mt-[40px]">
          <form
            ref={formRef}
            className="contact-form"
            name={name}
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="form-name" value={name} />
            <input type="hidden" name="bot-field" />
            <div className="form-grid">
              <div className="input-wrapper">
                <label htmlFor="name" className="f-16">{nameF.label}</label>
                <input id="name" name="name" type="text" placeholder={nameF.placeholder} required className="contact-input" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="role" className="f-16">{roleF.label}</label>
                <div className="select-container">
                  <select id="role" name="role" required defaultValue="" className="contact-input w-full">
                    <option value="" disabled>
                      {roleF.placeholder}
                    </option>
                    {copy.roles.map(([label, value]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {/* live renders this chevron (absolute, right 16 / top 19, #6B7280) despite §5's note */}
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[16px] top-[19px] text-[#6B7280]"
                  >
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="input-wrapper">
                <label htmlFor="email" className="f-16">{emailF.label}</label>
                <input id="email" name="email" type="email" placeholder={emailF.placeholder} required className="contact-input" />
              </div>
              <div className="input-wrapper">
                <label htmlFor="university" className="f-16">{uniF.label}</label>
                <input id="university" name="university" type="text" placeholder={uniF.placeholder} required className="contact-input" />
              </div>
              <div className="input-wrapper textarea-wrapper">
                <label htmlFor="assessment" className="f-16">{challengeF.label}</label>
                <textarea id="assessment" name="assessment" placeholder={challengeF.placeholder} required className="contact-input contact-textarea" />
              </div>
            </div>
            <p className="mt-[40px] max-w-[550px]">{copy.disclaimer}</p>
            <button type="submit" className="button mt-[40px]">
              {copy.submit}
            </button>
          </form>
          <div className={`thank-you-overlay${submitted ? ' active' : ''}`} aria-hidden={!submitted} {...(!submitted ? { inert: '' } : {})}>
            <div className={`thank-you-content p-[60px] m:p-[20px] ${panelBg}`}>
              <div className="mb-[40px] flex m:mb-[20px]">
                <button type="button" aria-label="Close" className="contact-form-close ml-auto" onClick={() => setSubmitted(false)} />
              </div>
              {/* live: div.grid-2.m-col.m-center.h-100 (<=990: flex column, justify-content center, text stays left) */}
              <div className="grid h-full grid-cols-2 gap-[20px] m:flex m:flex-col m:justify-center">
                <div className="flex flex-col gap-[20px]">
                  <p className="type-h4">{copy.thanksTitle}</p>
                  <p className="f-16 max-w-[450px]">{copy.thanksBody}</p>
                </div>
                <div className="thank-you-image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
