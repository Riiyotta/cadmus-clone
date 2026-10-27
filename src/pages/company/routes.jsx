import Universities from './Universities.jsx'
import Educators from './Educators.jsx'
import Students from './Students.jsx'
import About from './About.jsx'
import CareersPage from './CareersPage.jsx'
import Contact from './Contact.jsx'
import RequestDemo from './RequestDemo.jsx'
import TrustCentre from './TrustCentre.jsx'

// Routes for this page group: { path, element }. Owned by this group's build agent.
export const routes = [
  { path: '/solutions/universities', element: <Universities /> },
  { path: '/solutions/educators', element: <Educators /> },
  { path: '/solutions/students', element: <Students /> },
  { path: '/about', element: <About /> },
  { path: '/careers', element: <CareersPage /> },
  { path: '/contact', element: <Contact /> },
  { path: '/request-demo', element: <RequestDemo /> },
  { path: '/trust-centre', element: <TrustCentre /> },
]
