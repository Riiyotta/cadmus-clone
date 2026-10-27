/**
 * lines('first line', 'second line') -> ['first line', <br />, 'second line']
 * The spec's ⏎ is U+2028 in the CMS. Chromium does not break at U+2028, and the live heights match that
 * for normal elements (e.g. Exams feature h5 1 line, ProductCta 489 @390), so data keeps the character
 * there. Only elements with white-space:break-spaces on live (Seamless h4, LicenceRow h5) measure a
 * forced break; those use this helper.
 */
export default function lines(...parts) {
  return parts.flatMap((p, i) => (i === 0 ? [p] : [<br key={i} />, p]))
}
