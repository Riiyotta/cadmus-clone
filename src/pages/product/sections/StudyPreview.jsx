import Img from '../../../components/Img.jsx'

/**
 * StudyPreview (data-module "StudyPreview") — pages-product N2 (Assignments, Exams, Group Work, LA, M&F).
 * Accent sheet (-mt-40, r32 top, p40/20). Left: white title card (max 450, p20/40, z2) with an accent
 * "Case Study" chip + h5, over a 16:9 image (pl40, -mt-40). Right: max-550 f-18 quote, maroon-bordered
 * author, optional transparent arrow link. Trailing 40px desktop-only block. Motion: none.
 * Props: accent (bg class, e.g. 'bg-yellow'), title, quote, author, role, link ({ text, href } | null), image
 */
export default function StudyPreview({ accent, title, quote, author, role, link, image }) {
  return (
    <div data-module="StudyPreview" className={`relative -mt-[40px] rounded-t-sheet p-[40px] m:p-[20px] ${accent}`}>
      <div className="mx-auto mb-[40px] flex max-w-[1400px] items-center gap-[40px] pb-[40px] m:flex-wrap">
        <div className="flex w-1/2 flex-col m:w-full">
          <div className="relative z-2 mr-[40px] flex max-w-[450px] flex-col gap-[20px] rounded-img bg-pure-white px-[40px] py-[20px]">
            <p className={`label mr-auto ${accent}`}>Case Study</p>
            <p className="type-h5">{title}</p>
          </div>
          <div className="-mt-[40px] w-full pl-[40px]">
            <div className="relative aspect-video overflow-hidden rounded-img bg-placeholder">
              <Img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="w-1/2 m:w-full">
          <div className="mx-auto flex max-w-[550px] flex-col gap-[20px] p-[20px]">
            <div className="f-18">{quote}</div>
            <div className="quote-author">
              <p className="text-heading font-medium">{author}</p>
              <p className="f-16">{role}</p>
            </div>
            {/* Wrapper renders even without a link (Group Work): live keeps the empty div.w-100.flex.mt20, whose
                margin + flex gap add 40px. */}
            <div className="mt-[20px] flex w-full">
              {link && <a className="arrow-button transparent mr-auto" href={link.href}>{link.text}</a>}
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[40px] m:hidden" />
    </div>
  )
}
