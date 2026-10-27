import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import NotBuilt from './pages/NotBuilt.jsx'
import { routes } from './routes.jsx'
import { MotionRoot, PageTransition } from './motion/index.js'

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  // Trailing slashes are normalised so /news and /news/ share one route key.
  const routeKey = location.pathname.replace(/(.)\/$/, '$1')

  return (
    <MotionRoot routeKey={routeKey}>
      <Header />
      {/* .page--transition: fadeIn 0.5s ease 0.5s on load; fadeOut + navigate on internal links */}
      <PageTransition routeKey={routeKey} onNavigate={navigate}>
        <main>
          <Routes>
            {routes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path="*" element={<NotBuilt />} />
          </Routes>
        </main>
        <Footer />
      </PageTransition>
    </MotionRoot>
  )
}
