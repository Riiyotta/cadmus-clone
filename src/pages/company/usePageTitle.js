import { useEffect } from 'react'

/** Sets document.title for the page (pages-company §0 "Page <title>s"). */
export function usePageTitle(title) {
  useEffect(() => {
    const prev = document.title
    document.title = title
    return () => {
      document.title = prev
    }
  }, [title])
}
