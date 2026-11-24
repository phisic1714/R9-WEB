import { createRootRoute } from '@tanstack/react-router'
import RootLayout from '../components/RootLayout.jsx'
import NotFoundPage from '../components/NotFoundPage.jsx'

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})
