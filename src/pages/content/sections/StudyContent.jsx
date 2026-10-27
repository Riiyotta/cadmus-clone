import { studies } from '../data/studies.js'
import { STUDY_DETAILS, STUDY_BODY_DEFAULT } from '../data/details.js'
import { ArticleHero, ArticleBody, Categories, MoreRow, Highlights } from './Article.jsx'
import { ShareWithDownload } from './ShareBar.jsx'
import RichBody from './RichBody.jsx'
import { BODIES } from '../data/bodies.js'
import { HEROES, STUDY_META } from '../data/pagemeta.js'
import { placeholderText } from '../../../sections/index.js'

/** Resolve a study's data: Appendix A.2 row + any recorded per-page details (§2.4). */
export function getStudy(slug) {
  const item = studies.find((s) => s.slug === slug)
  if (!item) return null
  const d = STUDY_DETAILS[slug] || {}
  const m = STUDY_META[slug] || {}
  const h = HEROES[`study/${slug}`]
  const caption = d.caption || item.caption
  return {
    ...item,
    title: d.title || item.title,
    heroTitle: m.heroTitle || d.title || item.title,
    // real one-line caption + placeholder padding to the live line count (page-data caption is prose)
    caption: m.capPad ? `${caption} ${placeholderText(m.capPad[0], m.capPad[1])}` : caption,
    categories: d.categories || item.categories,
    hero: h ? { image: h[0], width: h[1], height: h[2] } : d.hero || { image: item.image, width: item.width, height: item.height },
    highlights: m.highlights || d.highlights || null,
    author: m.author || null,
    about: m.about || null,
    body: d.body || STUDY_BODY_DEFAULT,
  }
}

/** Contents of the white shell on /study/<slug> and inside the desktop popup (N5, N6, N12, N7, N8, N9). */
export default function StudyContent({ study }) {
  const related = studies.filter((s) => s.slug !== study.slug).slice(0, 3)
  return (
    <>
      <ArticleHero overline="Case Study" title={study.heroTitle} caption={study.caption} image={study.hero} />
      <ShareWithDownload author={study.author} about={study.about} />
      <Highlights items={study.highlights} />
      {BODIES[`study/${study.slug}`] ? (
        <RichBody blocks={BODIES[`study/${study.slug}`]} livePath={`/study/${study.slug}`} />
      ) : (
        <ArticleBody blocks={study.body} livePath={`/study/${study.slug}`} />
      )}
      <Categories items={study.categories} variant="wide" />
      <MoreRow label="Related Case Studies" link="/case-studies" items={related} kind="guide" hrefBase="/study/" />
    </>
  )
}
