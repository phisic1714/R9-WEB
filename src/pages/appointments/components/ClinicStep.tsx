import { useState } from 'react'
import { Atom, Building2, ChevronRight, Search, UsersRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { clinics } from '../booking-data'

export default function ClinicStep({
  onSelect,
  onAssessment,
}: {
  onSelect: (id: string) => void
  onAssessment: () => void
}) {
  const [search, setSearch] = useState('')
  const filtered = clinics.filter((clinic) =>
    `${clinic.name} ${clinic.english} ${clinic.description}`
      .toLowerCase()
      .includes(search.trim().toLowerCase()),
  )
  return (
    <div className="grid gap-3">
      <section className="rounded-xl bg-[#102354] p-4 text-white sm:p-6">
        <div className="flex items-center gap-4">
          <Atom className="size-16 shrink-0 sm:size-20" strokeWidth={1.3} />
          <div>
            <h2 className="text-base! text-white">ไม่แน่ใจว่าต้องพบแพทย์แผนกไหน?</h2>
            <p className="mt-1 text-xs leading-6">
              ทดลองใช้ระบบประเมินอาการเบื้องต้น เพื่อรับคำแนะนำแผนกที่ตรงกับอาการของคุณ
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          type="button"
          className="mt-3 w-full rounded-sm bg-white text-primary hover:text-primary"
          onClick={onAssessment}
        >
          <Atom className="size-5" /> ประเมินอาการด้วย AI
        </Button>
      </section>
      <div className="relative">
        <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" />
        <Input
          aria-label="ค้นหาคลินิก"
          placeholder="ค้นหาชื่อคลินิก, แผนก หรืออาการ..."
          className="h-12 rounded-xl border-0 bg-white pl-11"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="grid gap-3 desktop:grid-cols-2">
        {filtered.map((clinic) => (
          <section
            key={clinic.id}
            className="flex min-w-0 flex-col gap-4 rounded-xl bg-white p-3 sm:p-5"
          >
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
                <b className="text-[#008bc5]">4</b> ท่าน
              </span>
              <Button
                type="button"
                className="h-8 rounded-sm px-4"
                onClick={() => onSelect(clinic.id)}
              >
                เลือกแผนกนี้ <ChevronRight className="size-4" />
              </Button>
            </div>
          </section>
        ))}
        {filtered.length === 0 && (
          <p
            role="status"
            className="rounded-xl bg-white p-8 text-center text-muted desktop:col-span-2"
          >
            ไม่พบคลินิกที่ค้นหา ลองค้นหาด้วยชื่อแผนกหรืออาการอื่น
          </p>
        )}
      </div>
    </div>
  )
}
