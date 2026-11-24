import { Link } from '@tanstack/react-router'

export default function NotFoundPage() {
  return (
    <section id="center">
      <h1>404</h1>
      <p>ไม่พบหน้าที่คุณต้องการ</p>
      <Link to="/">กลับหน้าแรก</Link>
    </section>
  )
}
