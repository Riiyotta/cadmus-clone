import { useCallback, useState } from 'react'
import Spacer from '../../components/Spacer.jsx'
import { ImageCta } from '../../sections/index.js'
import { news } from './data/news.js'
import { studies } from './data/studies.js'
import { guides } from './data/guides.js'
import { videos } from './data/videos.js'
import NewsBanner from './sections/NewsBanner.jsx'
import CategoryFilter, { useCategoryFilter } from './sections/CategoryFilter.jsx'
import CardGrid from './sections/CardGrid.jsx'
import HeroImageBanner from './sections/HeroImageBanner.jsx'
import GuideTypes from './sections/GuideTypes.jsx'
import CaseStudyPopup from './sections/CaseStudyPopup.jsx'
import { NewsItemCard, StudyCard, GuideCard, VideoCard } from './sections/Cards.jsx'
import { usePageMeta, useDesktopPopup } from './sections/common.jsx'
import './content.css'

const ctaButtons = (second) => [
  { text: 'Book a demo', href: '/request-demo', style: 'solid', newTab: true },
  { text: 'Get a free trial', href: second, style: 'outline', newTab: true },
]

const NEWS_CATEGORIES = [
  'Product', 'Academic Integrity', 'Exam Alternatives', 'Feedback & Marking', 'Assessment Design', 'Product update',
  'Uplifting Educators', 'Leadership', 'Teaching & Learning', 'AI', 'Student Success', 'Company',
]
const STUDY_CATEGORIES = ['Hybrid Learning', 'Student Success', 'Product', 'Academic Integrity', 'Exam Alternatives']
const SHEET = 'relative z-2 -mt-[40px] rounded-t-sheet p-[40px] m:p-[20px]'

/** /news — NewsBanner (N1), filter (N2) + news grid (N3), CtaWithImage. */
export function NewsListing() {
  usePageMeta('Cadmus Chronicles')
  const filter = useCategoryFilter(news)
  return (
    <>
      <NewsBanner />
      <div className={`${SHEET} bg-cream`}>
        <CategoryFilter categories={NEWS_CATEGORIES} {...filter} />
        <div className="mx-auto mt-[60px] max-w-[1600px]">
          <CardGrid items={filter.filtered} renderCard={(i) => <NewsItemCard key={i.slug} item={i} />} />
          <Spacer />
        </div>
      </div>
      <ImageCta variant="section" buttons={ctaButtons('/')} />
    </>
  )
}

/** /case-studies — hero card (N10), filter + study grid, popup (N11) above 980px. */
export function CaseStudiesListing() {
  usePageMeta('Case Studies')
  const filter = useCategoryFilter(studies)
  const desktop = useDesktopPopup()
  const [openSlug, setOpenSlug] = useState(null)
  const close = useCallback(() => setOpenSlug(null), [])
  return (
    <>
      <HeroImageBanner
        title="Case Studies"
        body="Learn how universities, educators, and students are using Cadmus to solve their biggest teaching and learning challenges."
        image={{ image: '/assets/1752370909-rectangle-3470759-1-1.jpg', width: 3110, height: 1368 }}
      />
      <div className={`${SHEET} bg-pure-white`}>
        <CategoryFilter categories={STUDY_CATEGORIES} {...filter} />
        <div className="mx-auto mt-[40px] max-w-[1600px] pt-[20px] m:mt-0">
          <CardGrid
            items={filter.filtered}
            variant="study"
            labels={['Load more', 'Show less']}
            renderCard={(i) => <StudyCard key={i.slug} item={i} onOpen={desktop ? setOpenSlug : undefined} />}
          />
        </div>
      </div>
      <Spacer className="bg-pure-white" />
      <ImageCta variant="section" buttons={ctaButtons('/contact')} />
      {desktop && <CaseStudyPopup slug={openSlug} onClose={close} />}
    </>
  )
}

/** /teacher-guides — hero card, guide grid (no filter), CtaWithImage. */
export function TeacherGuidesListing() {
  usePageMeta('Teaching Guides')
  return (
    <>
      <HeroImageBanner
        title="Teaching guides"
        body="We’re here to help you elevate your teaching, so you can support your students’ learning. Check out our guides and resources for every stage of the assessment process."
        image={{ image: '/assets/1754566198-getty-images-8pqd7fjhu5o-unsplash.jpg', width: 2736, height: 1824 }}
      />
      <div className={`${SHEET} bg-pure-white`}>
        <div className="mx-auto mt-[40px] max-w-[1600px]">
          <CardGrid
            items={guides}
            variant="guide"
            labels={['Load more', 'Show less']}
            renderCard={(i) => <GuideCard key={i.slug} item={i} />}
          />
        </div>
      </div>
      <Spacer className="bg-pure-white" />
      <ImageCta variant="section" buttons={ctaButtons('/')} />
    </>
  )
}

function VideoSection({ id, bg, title, body, items }) {
  return (
    <>
      <div id={id} className={`${SHEET} ${bg}`}>
        <div className="mx-auto max-w-[1600px]">
          <div className="mb-[80px] mt-[20px] m:mb-[40px]">
            <p className="type-h4 text-center">{title}</p>
            <p className="f-16 mx-auto my-[20px] max-w-[750px] text-center">{body}</p>
          </div>
          <CardGrid items={items} variant="video" split={[2, 5]} renderCard={(i) => <VideoCard key={i.slug} item={i} />} />
        </div>
      </div>
      <Spacer className={bg} />
    </>
  )
}

const byPosition = (type) => videos.filter((v) => v.guideType === type).sort((a, b) => a.position - b.position)

/** /video-tutorials — alt hero, GuideTypes (N14), teacher + student video sections. */
export function VideoTutorialsListing() {
  usePageMeta('Video Tutorials')
  return (
    <>
      <HeroImageBanner
        variant="alt"
        title="Video tutorials"
        body="Learn the ropes with these easy to follow video courses. You’ll be working on your assignment in no time."
      />
      <GuideTypes />
      <VideoSection
        id="teacher-videos"
        bg="bg-cream"
        title="Teacher videos"
        body="We show you an overview of the Cadmus Teacher and Student Environments. Understand the entire assessment process from creating an assignment and completing work, right through to providing grades and feedback."
        items={byPosition('teacher')}
      />
      <VideoSection
        id="student-videos"
        bg="bg-pure-white"
        title="Student videos"
        body="Take a look at what it's like to complete a Cadmus Assignment. We take you through accessing, writing and submitting your assignment."
        items={byPosition('student')}
      />
    </>
  )
}
