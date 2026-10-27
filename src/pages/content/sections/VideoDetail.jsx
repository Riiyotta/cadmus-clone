import { useState } from 'react'
import Img from '../../../components/Img.jsx'

function RelatedList({ items, current, hrefBase }) {
  return (
    <div className="flex w-full flex-col gap-[10px]">
      {items.map((v) => (
        <a key={v.slug} href={`${hrefBase}${v.slug}`} className="link">
          {/* live: play icon + title grouped with gap 10, duration pushed right; non-current rows at 50% */}
          <div className={`flex items-center justify-between gap-[20px]${v.slug === current ? '' : ' opacity-50'}`}>
            <div className="flex items-center gap-[10px]">
              <div className="video-play shrink-0" />
              <p>{v.title}</p>
            </div>
            <div className="ml-auto">
              <p>{v.duration}</p>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

function CategoryHeader({ category }) {
  return (
    <div className="flex gap-[10px]">
      <p className="sm-heading">{category}</p>
      <div className="mt-auto h-px w-full bg-vellum" />
    </div>
  )
}

/**
 * N17 video template body (inside the white shell): VideoEmbed (70/30 grid: Vimeo click-to-play +
 * related list) and VideoContent (title, tagline, mobile related list, resources).
 * Props: video (Appendix A.4 row + details), category (label or ''), related (rows of the same category)
 */
export default function VideoDetail({ video, category, related }) {
  const [playing, setPlaying] = useState(false)
  const canPlay = !!video.vimeo
  return (
    <>
      <div className="mb-[40px] grid grid-cols-[minmax(0,.7fr)_minmax(0,.3fr)] gap-[20px] lgm:grid-cols-1">
        <div
          role={canPlay ? 'button' : undefined}
          tabIndex={canPlay ? 0 : undefined}
          aria-label={canPlay ? 'Play video' : undefined}
          onClick={() => canPlay && setPlaying(true)}
          onKeyDown={(e) => canPlay && (e.key === 'Enter' || e.key === ' ') && setPlaying(true)}
          className={`relative aspect-video w-full overflow-hidden rounded-card${canPlay ? ' cursor-pointer' : ''}${canPlay && !playing ? ' with--play' : ''}`}
        >
          {canPlay && (
            <iframe
              src={playing ? `${video.vimeo}?autoplay=1` : video.vimeo}
              title={video.title}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          )}
          {!playing && (
            <Img
              src={video.image}
              width={video.width}
              height={video.height}
              alt={video.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>
        <div className="mt-auto flex w-full flex-col gap-[20px] m:hidden">
          <CategoryHeader category={category} />
          <RelatedList items={related} current={video.slug} hrefBase="/video/" />
        </div>
      </div>
      <div className="mb-[60px] grid grid-cols-[minmax(0,.7fr)_minmax(0,.3fr)] gap-[40px] lgm:grid-cols-1 m:gap-[20px]">
        <div className="flex flex-col gap-[40px]">
          <div className="flex max-w-[550px] flex-col gap-[10px]">
            <p className="type-h5">{video.title}</p>
            <p className="f-16">{video.tagline}</p>
          </div>
          <div className="hidden w-full m:block">
            {/* Mobile copy (with its own category header) links to /video-tutorials/<slug> on the live site
                (recorded source bug, kept). */}
            <div className="flex w-full flex-col gap-[20px]">
              <CategoryHeader category={category} />
              <RelatedList items={related} current={video.slug} hrefBase="/video-tutorials/" />
            </div>
          </div>
          <div className="flex w-full max-w-[1000px] flex-col gap-[20px]">
            <p className="text-xs-heading w-full border-b border-dashed border-orange pb-[10px]">More Resources And Docs</p>
            <div className="grid grid-cols-3 gap-[20px]" />
          </div>
        </div>
        {/* live: empty second column (adds the 20px row gap when the grid stacks) */}
        <div />
      </div>
    </>
  )
}
