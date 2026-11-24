import { createFileRoute, Link } from '@tanstack/react-router'
import { History } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
export const Route = createFileRoute('/appointments/history')({
  staticData: { title: 'ประวัตินัดหมาย' },
  component: HistoryPage,
})

function HistoryPage() {
  return (
    <PageLayout title="ประวัตินัดหมาย">
      <Card className="empty-state">
        <History size={54} />
        <h2>ยังไม่มีประวัตินัดหมาย</h2>
        <p>เมื่อเชื่อมต่อกับโรงพยาบาล จะแสดงประวัติการเข้ารับบริการที่นี่</p>
        <Link
          className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
          to="/appointments"
        >
          กลับไปนัดหมายของฉัน
        </Link>
      </Card>
    </PageLayout>
  )
}
