import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import ExploreCategories from './pages/ExploreCategories.jsx'
import ExploreRegional from './pages/ExploreRegional.jsx'
import CategoryDetail from './pages/CategoryDetail.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/", element : <Home/>},
  {path:"/exploreCategories", element : <ExploreCategories/>},
  {path:"/exploreRegional", element : <ExploreRegional/>},
  {path:"/food-categories", element: <CategoryDetail/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
