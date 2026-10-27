import Img from '../components/Img.jsx'
import { SCHEMES } from './schemes.js'

/**
 * ProductHero (data-module "ProductHero") — pages-product N1 (6 product pages) and pages-company §2.2
 * (/solutions/educators, /solutions/students). Same markup on both; only the colour scheme differs.
 * Split hero: overline + h1 + lead left (max 600, centred in its half), artwork right (natural aspect).
 * First section: no radius / overlap. min-height 100svh (calc(20px + 100svh) <=1600). No sal, no hover.
 * Props:
 *   scheme    'yellow' | 'lavender' | 'pink' | 'blue' | 'green' | 'maroon' (product pages)
 *             | 'brand' (solutions pages: maroon bg, orange text). See src/sections/schemes.js
 *   overline  text-sm-heading line (product name / 'Cadmus for Educators')
 *   title     h1 (string or node; use <br /> for the spec's ⏎)
 *   body      lead paragraph
 *   image     artwork src
 *   imageAlt  default ''
 */
export default function ProductHero({ scheme = 'brand', overline, title, body, image, imageAlt = '' }) {
  const colours = (SCHEMES[scheme] || SCHEMES.brand).hero
  return (
    <div
      data-module="ProductHero"
      className={`relative flex min-h-[100svh] flex-col px-[40px] pb-[40px] pt-[90px] t:min-h-[calc(20px+100svh)] m:p-[20px] ${colours}`}
    >
      <div className="relative z-2 m-auto flex w-full max-w-[1600px] items-center gap-[20px] m:mt-[95px] m:flex-wrap">
        <div className="w-1/2 m:w-full">
          <div className="mx-auto flex max-w-[600px] flex-col gap-[20px]">
            {overline && <p className="text-sm-heading m:mt-[20px]">{overline}</p>}
            <h1 className="type-h3 m-fs-30">{title}</h1>
            <p className="f-18 m-fs-16 mx-auto my-[20px] max-w-[900px] m:m-0">{body}</p>
          </div>
        </div>
        <div className="w-1/2 m:w-full m:pb-[40px]">
          <div className="image">
            <Img src={image} alt={imageAlt} className="block w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
