import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.js'

// Construct history only after LIFF has finished processing its redirect URL.
export function createAppRouter() {
  return createRouter({
    routeTree,
    basepath: import.meta.env.BASE_URL,
    scrollRestoration: true,
  })
}
