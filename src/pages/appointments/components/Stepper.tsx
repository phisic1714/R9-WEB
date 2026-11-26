import { Check } from 'lucide-react'
import { cn } from 'cn'

export default function Stepper({ step }: { step: number }) {
  return (
    <nav aria-label="ขั้นตอนนัดหมาย" className="rounded-xl bg-white px-1 py-4 sm:px-5 desktop:py-5">
      <ol className="m-0 flex list-none p-0">
        {['เลือกคลินิก', 'เลือกแพทย์', 'วัน-เวลา', 'ยืนยัน'].map((label, index) => (
          <li
            key={label}
            className="relative min-w-0 flex-1 text-center"
            aria-current={step === index ? 'step' : undefined}
          >
            {index < 3 && (
              <span
                aria-hidden="true"
                className={cn(
                  'absolute top-3.5 right-[calc(-50%+14px)] left-[calc(50%+14px)] h-0.5 bg-[#d3e4fe]',
                  index < step && 'bg-[#008455]',
                )}
              />
            )}
            <span
              className={cn(
                'relative mx-auto flex size-7 items-center justify-center rounded-full bg-[#e0ecff] text-sm text-[#7a8494]',
                index < step && 'bg-[#008455] text-white',
                index === step &&
                  'bg-[#0b3855] text-lg font-semibold text-white ring-4 ring-[#d7edf2]',
              )}
            >
              {index < step ? <Check className="size-4" /> : index + 1}
            </span>
            <span
              className={cn(
                'mt-2 block text-[10px] text-[#7a8494] sm:text-xs',
                index < step && 'text-ink',
                index === step && 'text-xs font-bold text-navy sm:text-sm',
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
