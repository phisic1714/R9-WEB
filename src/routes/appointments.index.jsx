import { createFileRoute, Link } from '@tanstack/react-router'
import { CalendarDays, Plus } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import AppointmentTicket from '../components/AppointmentTicket'
import { useDemo } from '../lib/demo-context'
export const Route = createFileRoute('/appointments/')({
  staticData: { title: 'นัดหมายของฉัน' },
  component: AppointmentsPage,
})

function AppointmentsPage() {
  const { appointment } = useDemo()
  return (
    <PageLayout title="นัดหมายของฉัน">
      <div className="page-heading flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2>นัดหมายของฉัน</h2>
          <p className="muted text-[13px] leading-[1.75] text-muted">
            จัดการนัดหมายและเตรียมตัวก่อนพบแพทย์
          </p>
        </div>
        <Link
          className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
          to="/appointments/new"
        >
          <Plus size={20} />
          นัดหมายใหม่
        </Link>
      </div>
      {appointment ? (
        <Card className="detail-card">
          <span className="status-pill inline-flex items-center gap-[5px] rounded-full bg-[#c3ffdf] px-2.5 py-1 text-[11px] font-semibold text-[#007951]">
            นัดหมายตัวอย่าง
          </span>
          <AppointmentTicket />
          <div className="form-actions mt-4 flex justify-between gap-2.5">
            <Link
              className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
              to="/appointments/new"
            >
              เลื่อนนัดหมาย
            </Link>
            <Link
              className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
              to="/service"
            >
              ดูขั้นตอนรับบริการ
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="empty-state">
          <CalendarDays size={54} />
          <h2>ยังไม่มีนัดหมาย</h2>
          <p>เลือกแผนก วัน และเวลาที่ต้องการเพื่อทดลองนัดหมาย</p>
          <Link
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            to="/appointments/new"
          >
            นัดหมายใหม่
          </Link>
          <Link to="/service">ดูตัวอย่างขั้นตอนการรับบริการ</Link>
        </Card>
      )}
      <Link
        className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
        to="/appointments/history"
      >
        ประวัตินัดหมาย
      </Link>
    </PageLayout>
  )
}
