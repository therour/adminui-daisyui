import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter, redirect } from 'react-router-dom'
import DashboardPage from '../views/Dashboard/DashboardPage'
import MemberPage from '../views/Dashboard/MemberPage'
import ProfilePage from '../views/Dashboard/ProfilePage'
import Layout from '../views/Dashboard/_layouts'
import LoginPage from '../views/LoginPage'
import AuthenticationRoute from './AuthenticationRoute'

const privateRoutes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/profile',
        element: <ProfilePage />,
      },
      {
        path: '/members',
        element: <MemberPage />,
      },
    ],
  },
]

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/dashboard'),
  },
  {
    element: <AuthenticationRoute guest />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <AuthenticationRoute private />,
    children: privateRoutes,
  },
])

export default router
