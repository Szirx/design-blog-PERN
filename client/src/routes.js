import Auth from './pages/Auth'
import Blog from './pages/Blog'
import PostPage from './pages/PostPage'
import { ADMIN_ROUTE, POST_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, BLOG_ROUTE } from './utils/consts'
import Admin from './pages/Admin'


export const authRoutes = [
    {
      path: ADMIN_ROUTE,
      element: <Admin />
    },
  ]
  
  export const publicRoutes = [
    {
      path: BLOG_ROUTE,
      element: <Blog/>
    },
    {
      path: LOGIN_ROUTE,
      element: <Auth/>
    },
    {
      path: POST_ROUTE + '/:id',
      element: <PostPage/>
    },
  ]