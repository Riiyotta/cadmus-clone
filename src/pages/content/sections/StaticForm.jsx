import { useState } from 'react'

/**
 * Static stand-in for the original Netlify forms (download a case study / ROI report): the submit is
 * prevented, nothing is sent, and the original's thank-you overlay is shown.
 * Props:
 *   fields      [{ name, label, textarea?, placeholder?, type? }]
 *   consent     checkbox label (string) or null
 *   submit      button text
 *   thanks      thank-you paragraph
 *   inputClass  extra classes on inputs (ROI: 'border-vellum')
 *   overlayBg   thank-you inner bg class
 */
export default function StaticForm({ fields, consent, submit, thanks, inputClass = '', overlayBg = 'bg-light-orange', name }) {
  const [sent, setSent] = useState(false)
  return (
    <>
      <form
        name={name}
        className="contact-form flex flex-col gap-[40px]"
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
      >
        <div className="flex flex-col gap-[10px]">
          {fields.map((f) => (
            <label key={f.name} className="input-wrapper">
              <span className="text-[14px] font-medium">{f.label}</span>
              {f.textarea ? (
                <textarea name={f.name} required placeholder={f.placeholder} className={`contact-input contact-textarea ${inputClass}`} />
              ) : (
                <input name={f.name} type={f.type || 'text'} required className={`contact-input ${inputClass}`} />
              )}
            </label>
          ))}
          {consent && (
            <label className="flex items-start gap-[10px] text-[14px]">
              <input type="checkbox" name="consent" required className="custom-checkbox" />
              <span>{consent}</span>
            </label>
          )}
        </div>
        <button type="submit" className="button self-start">{submit}</button>
      </form>
      {/* live: centred content (p40 / p20 at <=768), text-centred inner column, overlay r8 */}
      <div className={`thank-you-overlay rounded-[8px]${sent ? ' active' : ''}`} aria-hidden={!sent}>
        <div className={`thank-you-content ${overlayBg} items-center justify-center p-[40px] text-center m:p-[20px]`}>
          <div className="flex flex-col gap-[20px]">
            <p className="type-h4">Thank you!</p>
            <p className="f-18 max-w-[400px]">{thanks}</p>
          </div>
        </div>
      </div>
    </>
  )
}
