import Img from './Img.jsx'
/**
 * ImageCard — shared image-card layout (CLONE_SPEC §5 "image-card layout", reused in §14A and §15).
 * Wide image offset 130px, white content card floating bottom-left (or bottom-right when flipped).
 * <=990 the image goes full-width 5:4 and the card drops into flow, overlapping by 60px.
 * Props:
 *   src, alt        image (omit src for an empty grey box via imageClass="bg-placeholder")
 *   flipped         bool  image left-aligned (mr-130), card bottom-right
 *   wrapperClass    extra classes on .image-card-wrapper (e.g. 'max-w-[1200px]')
 *   imageClass      extra classes on the image box
 *   ratio           '2.6/1' (default) | '2/1' (Oral ImageCard sections)
 *   cardClass       free-form classes in the card's max-width slot (default 'max-w-[650px]').
 *                   Oral: 'max-w-[550px]' (its 310px mobile width already follows from
 *                   lgm:max-w-[calc(100%-40px)]). Extra overrides go here too, e.g. educators
 *                   ExpertList mobile margin: 'max-w-[650px] lgm:!ml-[30px]'.
 *   children        card content (rendered in a flex-col gap-20 column)
 */
const RATIOS = { '2.6/1': 'aspect-[2.6/1]', '2/1': 'aspect-[2/1]' }

export default function ImageCard({
  src,
  alt = '',
  flipped = false,
  wrapperClass = '',
  imageClass = '',
  ratio = '2.6/1',
  cardClass = 'max-w-[650px]',
  children,
}) {
  return (
    <div className={`image-card-wrapper relative mx-auto my-[40px] w-full pb-[120px] lgm:pb-[20px] ${wrapperClass}`}>
      <div
        className={`image-card-image ${RATIOS[ratio] || RATIOS['2.6/1']} w-[calc(100%-130px)] overflow-hidden rounded-img lgm:m-0 lgm:aspect-[5/4] lgm:w-full ${
          flipped ? 'mr-[130px]' : 'ml-[130px]'
        } ${imageClass}`}
      >
        {src && <Img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />}
      </div>
      <div
        className={`floating-content-card absolute bottom-0 z-2 mb-[40px] ${cardClass} rounded-card bg-pure-white p-[40px] shadow-card backdrop-blur-[1px] m:p-[20px] lgm:static lgm:mt-[-60px] lgm:max-w-[calc(100%-40px)] ${
          flipped ? 'left-auto right-0 lgm:ml-auto lgm:mr-[10px]' : 'left-0 lgm:mx-[10px]'
        }`}
      >
        <div className="flex flex-col items-start gap-[20px]">{children}</div>
      </div>
    </div>
  )
}
