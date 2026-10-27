import Img from './Img.jsx'
import Spacer from './Spacer.jsx'

/**
 * LogoMarquee — CLONE_SPEC §8. The list is rendered 4x so translate(calc(-25% - 5px)) is exactly one
 * list (homepage: 24 x 191px stride). All props default to the homepage.
 * Props:
 *   title       default 'Join The World’s Leading Universities'
 *   titleClass  extra classes on the h2 (universities: 'font-medium' for weight 500)
 *   logos       [[file, href?], ...]  file = name inside /assets/ or an absolute '/…' path;
 *               href omitted -> href="" like the original (default: homepage 24 logos, Exeter linked)
 *   bg          section bg class (default 'bg-pure-white'; cream 'bg-cream', orange 'bg-orange',
 *               light orange 'bg-light-orange')
 */
export const LOGOS = [
  ['1750938797-exeter.png', 'https://www.exeter.ac.uk'],
  ['1754542545-626ba0db1dc4c3b537787e04-1.png'],
  ['1754542557-adelaide_university_logo-svg.png'],
  ['1754542661-rmit_university_logo-1.png'],
  ['1754542675-university-of-notre-dame-australia-transp-logo.png'],
  ['1754542743-logusc.png'],
  ['1754544021-rmit_university_logo-2.png'],
  ['1754543992-usq-logo.png'],
  ['1754543959-bondlogo_primary_fullcolour_cmyk-1-1.png'],
  ['1754542826-images-2-1.png'],
  ['1754542894-liverpool-john-moores-university.png'],
  ['1754543932-zayed-university-1.png'],
  ['1754543906-acu-logo-300x139-1-1.png'],
  ['1754542957-flinders_university_logo_horizontal_rgb_master-1.png'],
  ['1754542974-university_of_western_australia_logo-freelogovectors-net.png'],
  ['1754542990-university-of-melbourne.png'],
  ['1754543008-uni-of-canberra-logo.png'],
  ['1754543028-manchester_university_logo-2-1.png'],
  ['1754543854-logo-uon-1.png'],
  ['1754543065-uog_colour-1.png'],
  ['1754543084-avd9ij1nl.png'],
  ['1754543826-094c1cda-c156-4dd5-8954d27f1cc7b52c-1.png'],
  ['1754543130-maynooth.png'],
  ['1754543150-kcl-logo.png'],
]

export default function LogoMarquee({ title = 'Join The World’s Leading Universities', titleClass = '', logos = LOGOS, bg = 'bg-pure-white' }) {
  const track = [0, 1, 2, 3].flatMap((copy) => logos.map((l) => [copy, ...l]))
  return (
    <div data-module="LogoMarquee" className={`logo-marquee mb-[20px] ${bg}`}>
      <h2 className={`text-heading mb-[40px] pt-[20px] text-center${titleClass ? ` ${titleClass}` : ''}`}>{title}</h2>
      <div className="logo-marquee--wrapper max-w-[100vw] overflow-hidden">
        <div className="logo-marquee--inner flex w-max flex-nowrap gap-[20px] animate-marquee">
          {track.map(([copy, file, href]) => (
            <a
              key={`${copy}-${file}`}
              href={href || ''}
              target="_blank"
              rel="noopener noreferrer"
              aria-hidden={copy > 0 ? 'true' : undefined}
              tabIndex={copy > 0 ? -1 : undefined}
              className="logo-wrapper border-r border-divider pr-[20px]"
            >
              <Img src={file.startsWith('/') ? file : `/assets/${file}`} alt="" className="logo h-[40px] w-[150px] max-w-[150px] object-contain" />
            </a>
          ))}
        </div>
      </div>
      <Spacer />
    </div>
  )
}
