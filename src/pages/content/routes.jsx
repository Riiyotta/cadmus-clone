// Routes for this page group: { path, element }. Owned by this group's build agent.
// Param routes are backed by ./data; unknown slugs render the app fallback (NotBuilt).
import { NewsListing, CaseStudiesListing, TeacherGuidesListing, VideoTutorialsListing } from './Listings.jsx'
import { NewsArticle, StudyArticle, GuideArticle, VideoArticle, RoiStudy, PrivacyPolicy } from './Details.jsx'

export const routes = [
  { path: '/news', element: <NewsListing /> },
  { path: '/news/:slug', element: <NewsArticle /> },
  { path: '/case-studies', element: <CaseStudiesListing /> },
  { path: '/study/2026-Cadmus-ROI-study', element: <RoiStudy /> },
  { path: '/study/:slug', element: <StudyArticle /> },
  { path: '/teacher-guides', element: <TeacherGuidesListing /> },
  { path: '/guides/:slug', element: <GuideArticle /> },
  { path: '/video-tutorials', element: <VideoTutorialsListing /> },
  { path: '/video/:slug', element: <VideoArticle /> },
  { path: '/information/privacy-policy-au', element: <PrivacyPolicy /> },
]
