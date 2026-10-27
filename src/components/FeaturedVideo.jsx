import Img from './Img.jsx'
import { useState } from 'react'

/**
 * FeaturedVideo — CLONE_SPEC §10. Thumbnail + play icon over the Vimeo iframe; click removes both and
 * autoplays (iframe src + '?autoplay=1'). Defaults = homepage.
 * Props:
 *   vimeo      embed URL (default 'https://player.vimeo.com/video/1107995826')
 *   thumbnail  image src (default '/assets/1754637423-download.png')
 *   title      h3.h4 text
 *   tagline    p.f-14 text (homepage: empty)
 *   button     { text, href } outline arrow-button (default See more -> /video-tutorials/; null to omit)
 * The click-to-play pattern (useState playing -> swap thumbnail for `${vimeo}?autoplay=1`) is what the
 * ROI video section (pages-content N13c) reuses; copy it, the layout there differs.
 */
export default function FeaturedVideo({
  vimeo: VIMEO = 'https://player.vimeo.com/video/1107995826',
  thumbnail = '/assets/1754637423-download.png',
  title: TITLE = "King's College London x Cadmus Teaching & Learning Forum",
  tagline,
  button = { text: 'See more', href: '/video-tutorials/' },
}) {
  const [playing, setPlaying] = useState(false)
  return (
    <div
      data-module="FeaturedVideo"
      className="featured-video relative z-2 -mt-[40px] rounded-t-sheet bg-orange p-[40px] m:p-[20px] dk:-mt-[25vh] dk:pt-[21vh]"
    >
      <div className="mx-auto my-[40px] max-w-[1000px] pb-[20px]">
        <div className="mb-[40px] flex flex-col gap-[10px]">
          <div
            role="presentation"
            onClick={() => setPlaying(true)}
            className={`relative mb-[20px] aspect-[9/5] cursor-pointer overflow-hidden rounded-img ${playing ? '' : 'with--play'}`}
          >
            <iframe
              src={playing ? `${VIMEO}?autoplay=1` : VIMEO}
              title={TITLE}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
            {!playing && (
              <Img src={thumbnail} alt={TITLE} className="absolute inset-0 h-full w-full object-cover" />
            )}
          </div>
          <div className="flex flex-col gap-[10px]">
            <h3 className="type-h4">{TITLE}</h3>
            <p className="f-14">{tagline}</p>
            {button && <a className="arrow-button mr-auto mt-[10px]" href={button.href}>{button.text}</a>}
          </div>
        </div>
      </div>
    </div>
  )
}
