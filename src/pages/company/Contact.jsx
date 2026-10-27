import './company.css'
import TwoColumnRows from '../../components/TwoColumnRows.jsx'
import WhyChoose from '../../components/WhyChoose.jsx'
import HeroBannerAlt from './sections/HeroBannerAlt.jsx'
import ContactForm from './sections/ContactForm.jsx'
import { usePageTitle } from './usePageTitle.js'
import { CONTACT_CAPTION, FORM_COPY } from './data/shared.js'
import { HERO_TITLE, SUPPORT_ROW, WHY } from './data/contact.js'

// /contact (pages-company §3.6). The footer follows directly (no Cta).
export default function Contact() {
  usePageTitle('Contact | Cadmus')
  return (
    <>
      <HeroBannerAlt title={HERO_TITLE} caption={CONTACT_CAPTION} />
      <TwoColumnRows rows={SUPPORT_ROW} standalone />
      <div className="m:mt-[40px]" />
      <ContactForm name="contact-form" title={FORM_COPY.title} intro={FORM_COPY.intro} copy={FORM_COPY} />
      <WhyChoose title={WHY.title} items={WHY.items} />
    </>
  )
}
