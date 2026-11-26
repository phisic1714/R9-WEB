import type { ModalProps } from '@/components/Modal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Modal from '@/components/Modal'
import { Link } from '@tanstack/react-router'
import { CalendarDays, Plus } from 'lucide-react'
import Card from '@/components/Card'
import AppointmentTicket from './components/AppointmentTicket'
import { useDemo } from '@/lib/demo-context'
function ModalSelectHosp({ open, onOpenChange }: Pick<ModalProps, 'open' | 'onOpenChange'>) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="เลือกโรงพยาบาล"
      description="เลือกสถานพยาบาลที่ต้องการนัดหมาย"
    >
      <Link
        to="/appointments/new"
        className="flex min-h-14 items-center rounded-lg border border-outline bg-white p-4 font-medium text-navy no-underline hover:bg-accent"
        onClick={() => onOpenChange(false)}
      >
        โรงพยาบาลมหาราชนครราชสีมา
      </Link>
    </Modal>
  )
}
export default function AppointmentsPage() {
  const [hospitalOpen, setHospitalOpen] = useState(false)
  const { appointment } = useDemo()
  return (
    <>
      <div className="page-heading flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2>นัดหมายของฉัน</h2>
          <p className="muted text-[13px] leading-[1.75] text-muted">
            จัดการนัดหมายและเตรียมตัวก่อนพบแพทย์
          </p>
        </div>
        <Button
          variant="ghost"
          type="button"
          onClick={() => setHospitalOpen(true)}
          className="primary-button mt-3 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
        >
          <Plus size={20} />
          นัดหมายใหม่
        </Button>
      </div>
      {appointment ? (
        <Card className="detail-card min-[480px]:p-6!">
          <Badge
            variant="secondary"
            className="status-pill inline-flex items-center gap-[5px] rounded-full bg-[#c3ffdf] px-2.5 py-1 text-[11px] font-semibold text-[#007951]"
          >
            นัดหมายตัวอย่าง
          </Badge>
          <AppointmentTicket />
          <div className="form-actions mt-4 flex justify-between gap-2.5 max-[370px]:flex-wrap! max-[370px]:[&>*]:min-w-[100px]!">
            <Button
              asChild
              variant="ghost"
              className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
            >
              <Link to="/appointments/new">เลื่อนนัดหมาย</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            >
              <Link to="/service">ดูขั้นตอนรับบริการ</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <Card className="empty-state">
          <CalendarDays size={54} />
          <h2>ยังไม่มีนัดหมาย</h2>
          <p>เลือกแผนก วัน และเวลาที่ต้องการเพื่อทดลองนัดหมาย</p>
          <Button
            variant="ghost"
            type="button"
            onClick={() => setHospitalOpen(true)}
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
          >
            นัดหมายใหม่
          </Button>
          <Link to="/service">ดูตัวอย่างขั้นตอนการรับบริการ</Link>
        </Card>
      )}
      <Button
        asChild
        variant="ghost"
        className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
      >
        <Link to="/appointments/history">ประวัตินัดหมาย</Link>
      </Button>

      <ModalSelectHosp open={hospitalOpen} onOpenChange={setHospitalOpen} />
    </>
  )
}
