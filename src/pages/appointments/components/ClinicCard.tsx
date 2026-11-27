import { Building2, ChevronRight, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Clinic } from '../booking-data'

type ClinicCardProps = {
  clinic: Clinic
  doctorCount: number
  onSelect: (id: string) => void
}

export default function ClinicCard({ clinic, doctorCount, onSelect }: ClinicCardProps) {
  return (
    <section className="flex min-w-0 flex-col gap-4 rounded-xl bg-white p-3 sm:p-5">
      <div className="flex items-center gap-4">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#e6f7f3] text-primary">
          <clinic.icon className="size-7" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg! leading-snug!">{clinic.name}</h2>
          <p className="mt-0.5 text-xs">{clinic.english}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-muted">
            <Building2 className="size-3 shrink-0" /> อาคารเฉลิมพระเกียรติ ชั้น 3
          </p>
        </div>
      </div>
      <p className="text-sm leading-6 text-muted">{clinic.description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1 text-[11px] text-muted">
          <UsersRound className="size-4 text-primary" /> แพทย์ออกตรวจ{' '}
          <b className="text-[#008bc5]">{doctorCount}</b> ท่าน
        </span>
        <Button type="button" className="h-8 rounded-sm px-4" onClick={() => onSelect(clinic.id)}>
          เลือกแผนกนี้ <ChevronRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}
