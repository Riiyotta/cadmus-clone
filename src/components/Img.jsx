import { assetSize } from './assetSize.js'

/**
 * Img — drop-in <img> that reserves its box before the file loads (layout-shift fix).
 * Adds width/height attributes from the asset's intrinsic size (public/assets, via vite.image-sizes.js),
 * mirroring the original's gatsby-image constrained wrapper. With preflight's `max-width:100%;
 * height:auto` the browser derives the aspect ratio from them, so the loaded layout is unchanged.
 * Explicit width/height props win; unknown srcs render exactly like a plain <img>.
 */
export default function Img({ src, width, height, ...rest }) {
  const size = width == null && height == null ? assetSize(src) : undefined
  return <img src={src} width={width ?? size?.[0]} height={height ?? size?.[1]} {...rest} />
}
