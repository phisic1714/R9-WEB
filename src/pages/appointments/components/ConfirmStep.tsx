import {
  Building2,
  CalendarDays,
  ClipboardCheck,
  DoorOpen,
  MapPin,
  ShieldCheck,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { DoctorProfile } from './DoctorStep'
import { formatBookingDate } from '../booking-data'
import type { Clinic, Doctor } from '../booking-data'
import type { Patient } from '@/lib/demo-context'

export default function ConfirmStep({
  clinic,
  doctor,
  date,
  time,
  patient,
  reason,
  onReasonChange,
}: {
  clinic: Clinic
  doctor: Doctor
  date: string
  time: string
  patient: Patient
  reason: string
  onReasonChange: (value: string) => void
}) {
  return (
    <div className="grid items-start gap-4 desktop:grid-cols-2 desktop:gap-5">
      <section className="overflow-hidden rounded-xl border-t-[6px] border-[#00a97e] bg-white p-6">
        <h2 className="mb-4 text-base!">ใบนัดหมายล่วงหน้า</h2>
        <div className="mb-4 flex items-center gap-3 rounded-lg bg-[#e6f6f2] p-4">
          <span className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-white text-navy">
            <span className="text-[10px]">
              {new Date(date + 'T12:00:00').toLocaleDateString('th-TH', { month: 'short' })}
            </span>
            <strong className="text-xl leading-6">{Number(date.slice(-2))}</strong>
          </span>
          <div>
            <h3 className="text-sm font-semibold">{formatBookingDate(date)}</h3>
            <p className="mt-1 text-sm font-semibold text-[#007951]">{time}</p>
          </div>
        </div>
        <div className="mb-4 grid gap-4 rounded-lg border border-[#e4eaf3] p-4">
          <div className="flex gap-2">
            <DoorOpen className="size-4 shrink-0 text-[#008455]" />
            <div>
              <h3 className="text-sm">{clinic.name}</h3>
              <p className="mt-1 text-xs">({clinic.english})</p>
            </div>
          </div>
          <div className="flex gap-2">
            <MapPin className="size-4 shrink-0 text-muted" />
            <div>
              <p className="text-[11px] text-muted">จุดนัดพบตรวจโรค</p>
              <p className="text-sm leading-6">อาคารเฉลิมพระเกียรติ ชั้น 3 โซน OPD ผู้ป่วยนอก</p>
            </div>
          </div>
        </div>
        <DoctorProfile doctor={doctor} clinic={clinic} />
      </section>
      <section className="rounded-xl bg-white p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg!">
            <ClipboardCheck className="size-5 text-[#008455]" />
            ข้อมูลผู้รับบริการ
          </h2>
          <Badge variant="secondary" className="bg-[#dce9ff] text-[10px] text-navy">
            HN ผู้ป่วยเดิม
          </Badge>
        </div>
        <dl className="grid gap-2 text-sm">
          {[
            ['ชื่อ-นามสกุล', `คุณ${patient.name}`],
            ['เลข HN', patient.hn],
            ['เบอร์โทรศัพท์ติดต่อ', patient.phone],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex flex-wrap justify-between gap-1 rounded-lg bg-[#f0f4ff] px-2 py-2"
            >
              <dt className="text-muted">{label}</dt>
              <dd className="m-0 font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-2 rounded-lg bg-[#f0f4ff] p-3">
          <Label htmlFor="booking-reason" className="mb-2 text-[11px] text-muted">
            อาการเบื้องต้น / สาเหตุที่นัดหมาย
          </Label>
          <Textarea
            id="booking-reason"
            maxLength={500}
            rows={3}
            value={reason}
            onChange={(event) => onReasonChange(event.target.value)}
            className="min-h-20 resize-y border-0 bg-transparent px-0 py-0 text-sm shadow-none"
          />
        </div>
        <div className="mt-3 rounded-lg bg-[#d4fcea] p-3">
          <p className="flex items-center gap-2 text-xs text-[#007951]">
            <ShieldCheck className="size-4" /> สิทธิการรักษาพยาบาล
          </p>
          <p className="mt-1 text-sm font-semibold">ตรวจสอบสิทธิการรักษากับโรงพยาบาล</p>
          <p className="mt-1 text-[10px] leading-5 text-muted">
            ยังไม่ได้เชื่อมต่อข้อมูลสิทธิจริง กรุณาเตรียมบัตรประชาชนในวันรับบริการ
          </p>
        </div>
      </section>
    </div>
  )
}

export function BookingAdvice() {
  return (
    <section className="rounded-xl bg-white px-6 desktop:col-span-2">
      <Accordion type="single" collapsible>
        <AccordionItem value="instructions" className="border-0">
          <AccordionTrigger className="py-5 text-base font-bold">
            คำแนะนำก่อนเข้ารับบริการ
          </AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc space-y-2 pl-4 text-sm leading-6 text-muted">
              <li>เตรียมบัตรประชาชนและข้อมูลการนัดหมาย</li>
              <li>มาถึงก่อนเวลานัดหมาย เพื่อติดต่อจุดลงทะเบียนผู้ป่วยนอก</li>
              <li>สอบถามโรงพยาบาลเกี่ยวกับการเตรียมตัวเฉพาะสำหรับการตรวจ</li>
            </ul>
            <p className="mt-3 flex items-center gap-2 text-xs text-muted">
              <Building2 className="size-4" /> โรงพยาบาลมหาราชนครราชสีมา
            </p>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted">
              <CalendarDays className="size-4" /> นัดหมายนี้เป็นตัวอย่างและยังไม่ได้ส่งให้โรงพยาบาล
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
