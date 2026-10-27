import SIZES from 'virtual:image-sizes'

// Intrinsic [width, height] of a /assets/… image or mp4 (see vite.image-sizes.js), or undefined.
export function assetSize(src) {
  return typeof src === 'string' ? SIZES[src.split(/[?#]/)[0]] : undefined
}
