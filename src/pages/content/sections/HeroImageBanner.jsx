import Spacer from '../../../components/Spacer.jsx'
import Img from '../../../components/Img.jsx'

/**
 * N10 HeroImageBanner — listing heroes.
 *   variant 'card' (case-studies, teacher-guides): photo behind a white card.
 *   variant 'alt'  (video-tutorials): maroon, orange text, decorative art (::after), no card.
 * Props: variant, title, body, image {image, width, height}
 */
export default function HeroImageBanner({ variant = 'card', title, body, image }) {
  const alt = variant === 'alt'
  return (
    <div
      className={`relative flex flex-col p-[40px] pt-[90px] m:p-[20px]${alt ? ' video--background bg-maroon' : ''}`}
    >
      <Spacer className="mt-[40px]" />
      <div className="relative z-2 mx-auto flex w-full max-w-[1600px] flex-col gap-[20px]">
        <div
          className={
            alt
              ? 'hero--card mr-auto mt-auto flex max-w-[650px] flex-col gap-[20px] text-orange m:mt-[40px] m:gap-[10px]'
              : 'hero--card mr-auto mt-auto flex max-w-[650px] flex-col gap-[20px] rounded-card bg-pure-white p-[40px] m:mt-[40px] m:gap-[10px] m:p-[20px]'
          }
        >
          <h1 className="type-h3 m-fs-30 m:mt-0">{title}</h1>
          <p
            className={
              alt
                ? 'f-18 mx-auto mb-[60px] max-w-[900px] [text-wrap:balance] m:m-0 m:text-[14px]'
                : 'f-18 mx-auto my-[20px] max-w-[900px] m:m-0 m:text-[14px]'
            }
          >
            {body}
          </p>
        </div>
      </div>
      <Spacer mobile60 />
      {image && (
        <Img
          src={image.image}
          width={image.width}
          height={image.height}
          alt=""
          className="bg-image absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  )
}
