import { useLocation } from 'react-router-dom'

// Fallback for routes that haven't been cloned yet: links out to the live page.
export default function NotBuilt() {
  const { pathname } = useLocation()
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-5 pt-[140px] text-center">
      <p className="font-sans text-[16px]">This page hasn&apos;t been cloned yet.</p>
      <a className="font-sans text-[16px] underline" href={`https://cadmus.io${pathname}`}>
        View it on cadmus.io
      </a>
    </section>
  )
}
