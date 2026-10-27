import './company.css'
import HeroBannerAlt from './sections/HeroBannerAlt.jsx'
import ContactForm from './sections/ContactForm.jsx'
import { usePageTitle } from './usePageTitle.js'
import { CONTACT_CAPTION, FORM_COPY } from './data/shared.js'

// /request-demo (pages-company §3.7)
export default function RequestDemo() {
  usePageTitle('Request a Demo | Cadmus')
  return (
    <>
      <HeroBannerAlt title="Request a demo" caption={CONTACT_CAPTION} />
      <ContactForm name="demo-form" title={FORM_COPY.title} intro={FORM_COPY.intro} copy={FORM_COPY} />
    </>
  )
}
