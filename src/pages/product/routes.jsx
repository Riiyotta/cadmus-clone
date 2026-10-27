import ProductPage from './ProductPage.jsx'
import ProductOverview from './ProductOverview.jsx'
import Pricing from './Pricing.jsx'
import { assignments, exams, groupWork, learningAnalytics, markingFeedback, oralAssessment } from './data/index.js'

// Routes for this page group: { path, element }. Owned by this group's build agent.
export const routes = [
  { path: '/product-overview', element: <ProductOverview /> },
  { path: '/product/assignments', element: <ProductPage key="assignments" data={assignments} /> },
  { path: '/product/exams', element: <ProductPage key="exams" data={exams} /> },
  { path: '/product/group-work', element: <ProductPage key="groupWork" data={groupWork} /> },
  { path: '/product/learning-analytics', element: <ProductPage key="learningAnalytics" data={learningAnalytics} /> },
  { path: '/product/marking-feedback', element: <ProductPage key="markingFeedback" data={markingFeedback} /> },
  { path: '/product/oral_assessment', element: <ProductPage key="oralAssessment" data={oralAssessment} /> },
  { path: '/pricing', element: <Pricing /> },
]
