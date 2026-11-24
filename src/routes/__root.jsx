import { createRootRoute, Outlet } from '@tanstack/react-router'
import NotFoundPage from '../pages/NotFoundPage.jsx'

export const Route = createRootRoute({
  component: Outlet,
  notFoundComponent: NotFoundPage,
})
