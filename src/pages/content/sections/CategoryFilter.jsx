import { useState } from 'react'

/**
 * N2 CategoryFilter — "Topics" header row + tag buttons + "Reset all". At <=768 the body is an
 * accordion (closed by default) toggled by the arrow button (the arrow does not rotate).
 * Props: categories string[], selected string[], onToggle(cat), onReset()
 */
export default function CategoryFilter({ categories, selected, onToggle, onReset }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="mx-auto mb-[20px] mt-[40px] flex max-w-[1600px] items-center justify-between gap-[20px] border-b border-dashed border-vellum py-[6px] m:mt-[20px]">
        <p className="text-heading">Topics</p>
        <button
          type="button"
          aria-label="Toggle topics"
          aria-expanded={open}
          className="accordion--arrow hidden m:block"
          onClick={() => setOpen((o) => !o)}
        />
      </div>
      <div className={`m-accordion mx-auto max-w-[1600px]${open ? ' active' : ''}`}>
        <div className="inner flex items-start justify-between m:flex-col m:gap-[20px]">
          <div className="flex flex-wrap gap-[8px] m:flex-col m:items-start">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={selected.includes(c)}
                className={`tag${selected.includes(c) ? ' active' : ''}`}
                onClick={() => onToggle(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <button type="button" className="ul-link relative w-[60px] whitespace-nowrap text-[14px]" onClick={onReset}>
            Reset all
          </button>
        </div>
      </div>
    </>
  )
}

/** Filter state with OR semantics: no selection = all items; otherwise items sharing any category. */
export function useCategoryFilter(items) {
  const [selected, setSelected] = useState([])
  const onToggle = (c) => setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]))
  const onReset = () => setSelected([])
  const filtered = selected.length ? items.filter((i) => i.categories.some((c) => selected.includes(c))) : items
  return { selected, onToggle, onReset, filtered }
}
