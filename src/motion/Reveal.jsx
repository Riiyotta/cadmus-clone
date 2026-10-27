/**
 * Convenience wrapper that emits the original's sal markup.
 *   <Reveal variant="fade--in-up" delay={300}>…</Reveal>            -> data-sal data-sal-delay="300" class="fade--in-up"
 *   <Reveal variant="fade--in-up" fast delay={600}>…</Reveal>       -> 30px rise (15px <=768)
 *   <Reveal variant="fade--up" reverse>…</Reveal>                   -> slides in from +20px (default -20px)
 *   <Reveal variant="fade--in">…</Reveal>                           -> opacity only
 *   <Reveal variant="logo--peel">…</Reveal>                         -> child <div>s rise from translateY(100%)
 * Writing the attributes by hand is equivalent; useReveal() scans for [data-sal] either way.
 * `delay` / `duration` must be multiples of 50 (delay 50-1000, duration 200-2000) to match sal.css.
 */
export default function Reveal({ as: Tag = 'div', variant = 'fade--in-up', fast, reverse, delay, duration, easing, className = '', children, ...rest }) {
  const cls = [variant, fast && 'fast', reverse && 'reverse', className].filter(Boolean).join(' ')
  return (
    <Tag
      data-sal=""
      {...(delay != null ? { 'data-sal-delay': delay } : {})}
      {...(duration != null ? { 'data-sal-duration': duration } : {})}
      {...(easing != null ? { 'data-sal-easing': easing } : {})}
      className={cls}
      {...rest}
    >
      {children}
    </Tag>
  )
}
