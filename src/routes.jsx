import Home from './pages/Home.jsx'
import { routes as productRoutes } from './pages/product/routes.jsx'
import { routes as companyRoutes } from './pages/company/routes.jsx'
import { routes as contentRoutes } from './pages/content/routes.jsx'

// path -> page component. Each page group owns its own routes file.
export const routes = [
  { path: '/', element: <Home /> },
  ...productRoutes,
  ...companyRoutes,
  ...contentRoutes,
]
