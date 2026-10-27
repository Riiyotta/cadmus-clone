import { useParams } from 'react-router-dom'
import Spacer from '../../components/Spacer.jsx'
import NotBuilt from '../NotBuilt.jsx'
import { QuoteCard } from '../../sections/index.js'
import { news } from './data/news.js'
import { guides } from './data/guides.js'
import { videos } from './data/videos.js'
import {
  NEWS_BODIES, NEWS_BODY_DEFAULT, GUIDE_DETAILS, GUIDE_SEGMENTS_DEFAULT, VIDEO_DETAILS, VIDEO_CATEGORIES,
  PRIVACY_SECTIONS,
} from './data/details.js'
import { ArticleShell, ArticleHero, ArticleBody, Categories, MoreRow } from './sections/Article.jsx'
import { ShareWithDownload, ShareOnly } from './sections/ShareBar.jsx'
import StudyContent, { getStudy } from './sections/StudyContent.jsx'
import VideoDetail from './sections/VideoDetail.jsx'
import RichBody from './sections/RichBody.jsx'
import { BODIES } from './data/bodies.js'
import { HEROES, GUIDE_CATEGORIES, VIDEO_META } from './data/pagemeta.js'
import { RoiHero, RoiWhy, RoiVideo, RoiForm } from './sections/Roi.jsx'
import { SmallHeroBanner, InformationBody } from './sections/Information.jsx'
import { usePageMeta } from './sections/common.jsx'
import './content.css'

const heroOf = (item) => ({ image: item.image, width: item.width, height: item.height })
/** Live heroImage (page-data) when it differs from the listing preview image. */
const heroFor = (key, fallback) => {
  const h = HEROES[key]
  if (h === null) return null // live has no heroImage: grey box only
  return h ? { image: h[0], width: h[1], height: h[2] } : fallback
}

/** /news/:slug — news article template (§2.2). */
export function NewsArticle() {
  const { slug } = useParams()
  const item = news.find((n) => n.slug === slug)
  if (!item) return <NotBuilt />
  return <NewsArticlePage item={item} />
}
function NewsArticlePage({ item }) {
  usePageMeta(item.title)
  const more = news.filter((n) => n.slug !== item.slug).slice(0, 3)
  return (
    <>
      <Spacer />
      <ArticleShell>
        <ArticleHero overline="News" title={item.title} image={heroFor(`news/${item.slug}`, heroOf(item))} />
        <ShareWithDownload />
        <Spacer />
        {BODIES[`news/${item.slug}`] ? (
          <RichBody blocks={BODIES[`news/${item.slug}`]} livePath={`/news/${item.slug}`} />
        ) : (
          <ArticleBody blocks={NEWS_BODIES[item.slug] || NEWS_BODY_DEFAULT} livePath={`/news/${item.slug}`} />
        )}
        <Categories items={item.categories} />
        <MoreRow label="More News" link="/news" items={more} kind="news" />
      </ArticleShell>
    </>
  )
}

/** /study/:slug — case study template (§2.4); same content as the desktop popup. */
export function StudyArticle() {
  const { slug } = useParams()
  const study = getStudy(slug)
  if (!study) return <NotBuilt />
  return <StudyArticlePage study={study} />
}
function StudyArticlePage({ study }) {
  usePageMeta(study.title)
  return (
    <>
      <div className="hidden pt-[20px] m:block" />
      <ArticleShell outer="mt-[90px] p-[20px] pt-[40px] m:p-0 m:pt-[40px]">
        <StudyContent study={study} />
      </ArticleShell>
    </>
  )
}

/** /guides/:slug — teaching guide template (§2.8). */
export function GuideArticle() {
  const { slug } = useParams()
  const item = guides.find((g) => g.slug === slug)
  if (!item) return <NotBuilt />
  return <GuideArticlePage item={item} />
}
function GuideArticlePage({ item }) {
  usePageMeta(item.title)
  const d = GUIDE_DETAILS[item.slug] || {}
  const related = guides.filter((g) => g.slug !== item.slug).slice(0, 3)
  return (
    <>
      <Spacer />
      <ArticleShell>
        <ArticleHero overline="Teaching guides" title={item.title} image={heroFor(`guides/${item.slug}`, d.hero || heroOf(item))} />
        <ShareOnly />
        <div className="mt-[40px]">
          {BODIES[`guides/${item.slug}`] ? (
            <RichBody blocks={BODIES[`guides/${item.slug}`]} livePath={`/guides/${item.slug}`} />
          ) : (
            <ArticleBody segments={d.segments || GUIDE_SEGMENTS_DEFAULT} livePath={`/guides/${item.slug}`} />
          )}
        </div>
        <Categories items={d.categories || GUIDE_CATEGORIES[item.slug]} />
        {/* Header label is hard-coded "Related Case Studies" on the live guide template (source bug, kept). */}
        <MoreRow label="Related Case Studies" link="/teacher-guides" items={related} kind="guide" hrefBase="/guides/" />
      </ArticleShell>
    </>
  )
}

/** /video/:slug — video template (§2.10, N17). */
export function VideoArticle() {
  const { slug } = useParams()
  const item = videos.find((v) => v.slug === slug)
  if (!item) return <NotBuilt />
  return <VideoArticlePage item={item} />
}
function VideoArticlePage({ item }) {
  usePageMeta(item.title)
  // page-data: vimeo URL, one-line tagline, category label and the related list (CMS order)
  const m = VIDEO_META[item.slug] || {}
  const d = VIDEO_DETAILS[item.slug] || {}
  const video = { ...item, ...d, vimeo: m.vimeo ?? d.vimeo, tagline: m.tagline ?? d.tagline }
  const members = m.related || (d.category ? VIDEO_CATEGORIES[d.category] : [item.slug])
  const related = members.map((s) => videos.find((v) => v.slug === s)).filter(Boolean)
  return (
    <>
      <Spacer mobile60 />
      <ArticleShell outer="p-[20px] m:p-0 m:pt-[40px]">
        <VideoDetail video={video} category={m.category ?? d.category ?? ''} related={related} />
        <Spacer className="m:hidden" />
      </ArticleShell>
    </>
  )
}

/** /study/2026-Cadmus-ROI-study — ROI report page (§2.5, N13). */
export function RoiStudy() {
  usePageMeta(
    'ROI Report',
    'Cadmus Return on Investment Report — independent analysis by Nous Group showing 7.1x average ROI across Australian and UK universities.'
  )
  return (
    <>
      <RoiHero />
      <RoiWhy />
      <QuoteCard
        variant="banner"
        quote="“Our ROI findings highlight that Cadmus is more than an assessment platform; it is a strategic investment that improves student outcomes.”"
        author="Zac Ashkanasy"
        role="Nous Group | Principal, Global Head of Higher Education"
      />
      <RoiVideo />
      <RoiForm />
    </>
  )
}

/** /information/privacy-policy-au — information template (§2.9). */
export function PrivacyPolicy() {
  usePageMeta('Privacy Policy (AU)')
  return (
    <>
      <SmallHeroBanner title="Privacy Policy (AU)" />
      <InformationBody sections={PRIVACY_SECTIONS} livePath="/information/privacy-policy-au" />
    </>
  )
}
