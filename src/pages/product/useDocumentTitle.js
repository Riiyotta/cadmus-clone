import { useEffect } from 'react'

// Sets document.title for the page (pages-product §4 titles); restores the previous title on unmount.
export default function useDocumentTitle(title) {
  useEffect(() => {
    if (!title) return undefined
    const prev = document.title
    document.title = title
    return () => {
      document.title = prev
    }
  }, [title])
}
