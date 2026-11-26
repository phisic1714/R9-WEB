import { CalendarDays, ChevronRight, Star, UserRound } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { doctors } from '../booking-data'
import type { Clinic, Doctor } from '../booking-data'

export function DoctorProfile({ doctor, clinic }: { doctor: Doctor; clinic: Clinic }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="size-[70px] shrink-0 rounded-xl">
        <AvatarFallback className="rounded-xl bg-[#e4f3f5] text-[#589eaa]">
          <UserRound className="size-11" strokeWidth={1.3} />
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <h3 className="text-base leading-snug sm:text-lg">{doctor.name}</h3>
        <p className="mt-1 text-sm text-[#009ac9]">{clinic.name.replace('คลินิก', '')}</p>
        <span className="mt-1 flex items-center gap-1 text-xs font-semibold">
          <Star className="size-3.5 fill-[#ff9d00] text-[#ff9d00]" />
          {doctor.rating}
        </span>
      </div>
    </div>
  )
}
export default function DoctorStep({
  clinic,
  onSelect,
}: {
  clinic: Clinic
  onSelect: (id: string) => void
}) {
  return (
    <div className="grid gap-3 desktop:grid-cols-2">
      {doctors.map((doctor) => (
        <section key={doctor.id} className="rounded-xl bg-white p-4 sm:p-5">
          <DoctorProfile doctor={doctor} clinic={clinic} />
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#f7f9fb] p-3">
            <CalendarDays className="size-5 shrink-0 text-navy" />
            <div className="flex flex-1 flex-wrap items-center justify-between gap-1">
              <p className="text-xs font-semibold">เลือกวันและเวลาว่างในขั้นตอนถัดไป</p>
              <Badge variant="secondary" className="rounded-sm bg-[#c1fae0] text-[#007951]">
                มีคิวตัวอย่าง
              </Badge>
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              className="h-8 rounded-sm px-5"
              onClick={() => onSelect(doctor.id)}
            >
              จองคิวแพทย์ <ChevronRight className="size-4" />
            </Button>
          </div>
        </section>
      ))}
    </div>
  )
}
