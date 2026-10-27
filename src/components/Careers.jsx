import ImageCard from './ImageCard.jsx'

/**
 * Careers — CLONE_SPEC §15. Image-card section (light-orange sheet; flipped: image left, card bottom-right).
 * Every prop defaults to the homepage. Also usable for the other ImageCard sections
 * (about Mission, Oral ImageCards, educators ExpertList) via the props below.
 * Props:
 *   image        image src (about: '/assets/1754472361-cadmus-event-june-2025-467-copy.jpg')
 *   bg           section bg class (default 'bg-light-orange'; e.g. 'bg-cream', 'bg-orange')
 *   flipped      default true
 *   ratio        '2.6/1' | '2/1'  (ImageCard)
 *   cardClass    ImageCard card max-width slot (default 'max-w-[650px]')
 *   overline     small uppercase line (default 'Careers'; pass null to omit)
 *   title        default homepage h5 copy
 *   titleClass   default 'type-h5 [text-wrap:balance]' (h4 variants: 'type-h4 [text-wrap:balance]')
 *   paragraphs   string[] rendered in a div.f-16 flex-col gap-20 (default none)
 *   button       { text, href } outline arrow-button (default Learn more -> /careers/; null to omit)
 *   children     extra card content appended after the button slot (e.g. a list)
 *   module       data-module attribute (default 'ImageCard')
 */
export default function Careers({
  image = '/assets/1751186547-screenshot-2025-02-13-at-5-07-44-pm-2.jpg',
  bg = 'bg-light-orange',
  flipped = true,
  ratio,
  cardClass,
  overline = 'Careers',
  title = 'Join our growing team and make your mark on the future of learning.',
  titleClass = 'type-h5 [text-wrap:balance]',
  paragraphs,
  button = { text: 'Learn more', href: '/careers/' },
  children,
  module = 'ImageCard',
}) {
  return (
    <div data-module={module} className={`relative z-2 -mt-[40px] rounded-t-sheet ${bg} p-[40px] m:p-[20px]`}>
      <ImageCard flipped={flipped} ratio={ratio} cardClass={cardClass} wrapperClass="max-w-[1200px]" src={image}>
        {overline && <p className="text-sm-heading">{overline}</p>}
        <p className={titleClass}>{title}</p>
        {paragraphs?.length > 0 && (
          <div className="f-16 flex flex-col gap-[20px]">
            {paragraphs.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        )}
        {children}
        {button && <a className="arrow-button" href={button.href}>{button.text}</a>}
      </ImageCard>
    </div>
  )
}
