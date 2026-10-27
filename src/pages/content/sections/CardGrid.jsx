import { useState } from 'react'

/**
 * N3 listing grid: items [0,a) in grid-2, [a,b) in grid-3, the rest in grid-3 inside a collapsed
 * accordion behind "Load More" (grid-template-rows 0fr -> 1fr, .3s; label swaps; down arrow flips).
 * Props:
 *   items, renderCard(item)
 *   split      [a, b] (default [4, 7]; videos [2, 5])
 *   variant    'news' | 'study' | 'guide' | 'video'  (gaps per spec table)
 *   labels     [closed, open] (default ['Load More', 'Show Less'])
 */
const GRID2 = 'mb-[60px] grid grid-cols-2 gap-x-[20px] gap-y-[60px] lgm:grid-cols-1'
const GRID3_ROWGAP = 'mb-[60px] grid grid-cols-3 gap-x-[40px] gap-y-[60px] m:grid-cols-1'
const GRID3_PLAIN = 'mb-[60px] grid grid-cols-3 gap-x-[40px] gap-y-[80px] m:grid-cols-1 m:gap-[40px]'

export default function CardGrid({ items, renderCard, split = [4, 7], variant = 'news', labels = ['Load More', 'Show Less'] }) {
  const [open, setOpen] = useState(false)
  const [a, b] = split
  const first = items.slice(0, a)
  const second = items.slice(a, b)
  const rest = items.slice(b)
  const video = variant === 'video'
  const grid2 = video ? `${GRID2} m:mb-[40px] m:gap-[40px]` : GRID2
  const grid3 = variant === 'study' || variant === 'guide' ? GRID3_PLAIN : video ? `${GRID3_ROWGAP} m:mb-[40px] m:gap-[40px]` : GRID3_ROWGAP
  const restGrid = video ? `${GRID3_ROWGAP} m:gap-[40px]` : GRID3_ROWGAP
  return (
    <>
      {first.length > 0 && <div className={grid2}>{first.map(renderCard)}</div>}
      {second.length > 0 && <div className={grid3}>{second.map(renderCard)}</div>}
      {rest.length > 0 && (
        <>
          <div className={`accordion--wrapper${open ? ' active' : ''}`}>
            <div className="inner">
              <div className={restGrid}>{rest.map(renderCard)}</div>
            </div>
          </div>
          <div className={video ? 'mt-[40px] flex justify-center m:m-0' : 'mt-[60px] flex justify-center'}>
            <button
              type="button"
              aria-expanded={open}
              className={video ? 'arrow-button' : `arrow-button down${open ? ' active' : ''}`}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? labels[1] : labels[0]}
            </button>
          </div>
        </>
      )}
    </>
  )
}
