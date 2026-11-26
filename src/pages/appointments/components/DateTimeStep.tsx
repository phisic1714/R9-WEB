import { useState } from 'react'
import { Ban, Check, ChevronLeft, ChevronRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { cn } from 'cn'
import { dateKey, timeSlots } from '../booking-data'

export default function DateTimeStep({
  date,
  timeId,
  onDateChange,
  onTimeChange,
}: {
  date: string
  timeId: string
  onDateChange: (value: string) => void
  onTimeChange: (value: string) => void
}) {
  const [month, setMonth] = useState(() => {
    const initial = date ? new Date(date + 'T12:00:00') : new Date()
    return new Date(initial.getFullYear(), initial.getMonth(), 1)
  })
  const today = dateKey(new Date())
  const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const cellCount = Math.ceil((month.getDay() + daysInMonth) / 7) * 7
  const days = Array.from(
    { length: cellCount },
    (_, index) => new Date(month.getFullYear(), month.getMonth(), index - month.getDay() + 1),
  )
  return (
    <div className="grid items-start gap-3 desktop:grid-cols-2 desktop:gap-5">
      <section
        className="rounded-xl border border-outline bg-white p-4 shadow-sm sm:p-5"
        aria-label="เลือกวันที่นัดหมาย"
      >
        <div className="mb-5 flex items-center justify-between gap-2">
          <div>
            <h2 className="text-lg!">
              {month.toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}
            </h2>
            <p className="mt-0.5 text-xs">
              {month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center rounded-lg bg-[#eff3ff] p-1">
            <Button
              variant="ghost"
              size="icon"
              type="button"
              aria-label="เดือนก่อนหน้า"
              disabled={month <= currentMonth}
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="h-4 border-l border-[#ccd4e1]" />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              aria-label="เดือนถัดไป"
              onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-7 text-center">
          {['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'].map((label, index) => (
            <span
              key={label}
              className={cn('pb-3 text-xs text-muted', index === 0 && 'text-red-500')}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-2">
          {days.map((day) => {
            const key = dateKey(day)
            const inMonth = day.getMonth() === month.getMonth()
            const available = inMonth && key >= today && day.getDay() !== 0 && day.getDay() !== 6
            const selected = date === key
            return (
              <div key={key} className="flex justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  aria-label={day.toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  aria-pressed={selected}
                  disabled={!available}
                  onClick={() => onDateChange(key)}
                  className={cn(
                    'relative size-10 rounded-full p-0 text-sm disabled:opacity-40 sm:size-11',
                    !inMonth && 'opacity-40',
                    selected &&
                      'bg-primary text-lg font-bold text-white shadow-md hover:bg-primary/90 hover:text-white',
                  )}
                >
                  <span>{day.getDate()}</span>
                  {available && !selected && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0.5 size-1 rounded-full bg-primary"
                    />
                  )}
                </Button>
              </div>
            )
          })}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] text-muted">
          <span className="flex items-center gap-1.5">
            <i className="size-3 rounded-full bg-[#007a50]" /> ว่าง (Available)
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-3 rounded-full bg-primary" /> วันที่เลือก
          </span>
          <span className="flex items-center gap-1.5">
            <i className="size-3 rounded-full bg-[#e0e7f1]" /> ไม่เปิดให้จอง
          </span>
        </div>
        <p className="mt-4 text-center text-[10px] text-muted">วันและคิวที่แสดงเป็นข้อมูลตัวอย่าง</p>
      </section>
      <section className="rounded-xl border border-outline bg-white p-3 sm:p-5">
        <h2 className="mb-4 text-lg!">เลือกช่วงเวลานัดหมาย</h2>
        {!date && (
          <p className="mb-3 text-xs text-muted" role="status">
            เลือกวันที่ก่อนเลือกช่วงเวลา
          </p>
        )}
        <RadioGroup
          value={timeId}
          onValueChange={onTimeChange}
          aria-label="ช่วงเวลานัดหมาย"
          disabled={!date}
          className="gap-3"
        >
          {timeSlots.map((slot) => {
            const selected = timeId === slot.id
            const full = slot.remaining === 0
            return (
              <Label
                key={slot.id}
                htmlFor={`time-${slot.id}`}
                className={cn(
                  'flex min-h-[78px] cursor-pointer items-center gap-4 rounded-xl border border-[#f1f3f7] p-3 sm:p-4',
                  selected && 'border-[#e8edfa] bg-[#eef3ff] shadow-sm',
                  full && 'cursor-not-allowed bg-[#f5f8fc] opacity-50',
                  !date && 'cursor-not-allowed opacity-60',
                )}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#edf2ff] text-navy">
                  {full ? <Ban className="size-5" /> : <Clock className="size-5" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={cn('block text-base font-bold sm:text-lg', full && 'line-through')}
                  >
                    {slot.label}
                  </span>
                  <span
                    className={cn(
                      'mt-1 block text-xs font-semibold text-[#007951]',
                      slot.remaining <= 2 && 'text-red-600',
                    )}
                  >
                    {full
                      ? 'คิวเต็มแล้ว (Fully Booked)'
                      : `● ว่าง ${slot.remaining} คิว${slot.note ? ` (${slot.note})` : ''}`}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-2">
                  {slot.remaining <= 2 && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        'rounded-sm bg-red-50 text-[10px] text-red-700',
                        full && 'bg-[#dce9ff] text-muted',
                      )}
                    >
                      {full ? 'เต็ม' : 'ใกล้เต็ม'}
                    </Badge>
                  )}
                  <RadioGroupItem
                    id={`time-${slot.id}`}
                    value={slot.id}
                    disabled={full || !date}
                    className={cn(
                      'size-6 border-0 bg-[#e4edff] shadow-none data-[state=checked]:bg-primary data-[state=checked]:text-white',
                      full && 'hidden',
                    )}
                  >
                    {selected ? <Check className="size-4" /> : <span />}
                  </RadioGroupItem>
                </span>
              </Label>
            )
          })}
        </RadioGroup>
      </section>
    </div>
  )
}
