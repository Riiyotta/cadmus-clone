/**
 * Spacer — CLONE_SPEC §0.4: .spacer 100px; .m-spacer variant 60px at <=768.
 * Props:
 *   mobile60   bool   60px at <=768 instead of 100 (default false)
 *   className  string extra classes, e.g. a background ('bg-pure-white', 'bg-offwhite', 'bg-cream'),
 *                     'm:hidden', or a full sheet: 'relative z-2 -mt-[40px] rounded-t-sheet bg-cream'
 */
export default function Spacer({ mobile60 = false, className = '' }) {
  const base = mobile60 ? 'h-[100px] m:h-[60px]' : 'h-[100px]'
  return <div className={className ? `${base} ${className}` : base} />
}
