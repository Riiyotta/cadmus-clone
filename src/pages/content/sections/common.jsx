import { useEffect, useState } from 'react'
import { LIVE } from '../data/details.js'

/** Seo title rule (spec §1.1): `${title} | Cadmus`; optional meta description. Restores on unmount. */
export function usePageMeta(title, description) {
  useEffect(() => {
    const prev = document.title
    document.title = `${title} | Cadmus`
    let meta = document.querySelector('meta[name="description"]')
    const prevDesc = meta?.getAttribute('content')
    if (description) {
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }
    return () => {
      document.title = prev
      if (description && meta) {
        if (prevDesc == null) meta.remove()
        else meta.setAttribute('content', prevDesc)
      }
    }
  }, [title, description])
}

/** true above 980px (case-study cards are popup buttons there, links at <=980; spec N11). */
export function useDesktopPopup() {
  const query = '(min-width: 981px)'
  const [match, setMatch] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatch(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return match
}

/** Small link to the live page under every placeholder body (styled by .article--content a). */
export function OriginalLink({ path, className = 'article--content mx-auto w-full max-w-[950px]' }) {
  return (
    <div className={className}>
      <p className="text-[14px]">
        <a href={`${LIVE}${path}/`} target="_blank" rel="noopener noreferrer">
          Read the original on cadmus.io
        </a>
      </p>
    </div>
  )
}

/** Non-interactive tag row (p.tag). */
export function Tags({ items, className = 'flex flex-wrap gap-[8px]' }) {
  return (
    <div className={className}>
      {items.map((t) => (
        <p key={t} className="tag">{t}</p>
      ))}
    </div>
  )
}
