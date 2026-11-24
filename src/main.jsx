import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import { initializeLiff } from './lib/liff'
import { createAppRouter } from './router'

const root = createRoot(document.getElementById('root'))
root.render(<p role="status">กำลังเปิดแอป…</p>)

async function bootstrap() {
  // LIFF owns the initial query parameters and may redirect to another path.
  // Keep the app accessible if initialization fails; App displays its error status.
  await initializeLiff().catch(() => undefined)
  const router = createAppRouter()
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

bootstrap().catch(() => {
  root.render(<p role="alert">เปิดแอปไม่สำเร็จ กรุณาโหลดหน้าใหม่อีกครั้ง</p>)
})
