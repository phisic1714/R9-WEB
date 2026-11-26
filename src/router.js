import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
} from '@tanstack/react-router'
import RootLayout from './components/RootLayout.tsx'
import NotFoundPage from './components/NotFoundPage.tsx'

const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
})

// All application paths are declared here. Pages contain only their UI and logic.
const routeTree = rootRoute.addChildren([
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    staticData: { title: 'หน้าหลัก', pageClassName: 'home-page' },
    component: lazyRouteComponent(() => import('./pages/HomePage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    staticData: { title: 'เข้าสู่ระบบ', pageClassName: 'login-page' },
    component: lazyRouteComponent(() => import('./pages/LoginPage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    staticData: { title: 'ลงทะเบียนผู้ป่วยใหม่', pageClassName: 'registration-page' },
    component: lazyRouteComponent(() => import('./pages/RegisterPage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/profile',
    staticData: { title: 'ข้อมูลผู้ใช้งาน', pageClassName: 'profile-page' },
    component: lazyRouteComponent(() => import('./pages/ProfilePage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/appointments',
    staticData: { title: 'นัดหมายของฉัน' },
    component: lazyRouteComponent(() => import('./pages/AppointmentsPage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/appointments/new',
    staticData: { title: 'นัดหมายใหม่', pageClassName: 'booking-page' },
    component: lazyRouteComponent(() => import('./pages/NewAppointmentPage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/appointments/history',
    staticData: { title: 'ประวัตินัดหมาย' },
    component: lazyRouteComponent(() => import('./pages/HistoryPage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/service',
    staticData: { title: 'ขั้นตอนการรับบริการ', pageClassName: 'service-page' },
    component: lazyRouteComponent(() => import('./pages/ServicePage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/feedback',
    staticData: { title: 'แบบประเมินการรับบริการ', pageClassName: 'feedback-page' },
    component: lazyRouteComponent(() => import('./pages/FeedbackPage.tsx')),
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: '/help',
    staticData: { title: 'ช่วยเหลือ' },
    component: lazyRouteComponent(() => import('./pages/HelpPage.tsx')),
  }),
])

// LIFF completes before the caller creates browser history.
export function createAppRouter() {
  return createRouter({
    routeTree,
    basepath: import.meta.env.BASE_URL,
    scrollRestoration: true,
  })
}
