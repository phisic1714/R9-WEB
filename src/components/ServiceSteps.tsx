import { Button } from '@/components/ui/button'
import { cn } from 'cn'
import { Check } from 'lucide-react'
const steps = ['เช็กอินที่โรงพยาบาล', 'รอคิวเข้าตรวจ', 'ชำระเงิน', 'รับยา']
export default function ServiceSteps({
  step,
  onChange,
}: {
  step: number
  onChange: (step: number) => void
}) {
  return (
    <nav
      className="service-steps card rounded-[20px] border border-outline bg-white desktop:p-3.5!"
      aria-label="ขั้นตอนการรับบริการ"
    >
      {steps.map((label, index) => (
        <Button
          variant="ghost"
          key={label}
          type="button"
          className={cn('service-step desktop:min-h-[70px]!', {
            current: index === step,
            complete: index < step,
          })}
          aria-current={index === step ? 'step' : undefined}
          onClick={() => onChange(index)}
        >
          <span className="step-check">
            <Check size={15} />
          </span>
          <span>
            <strong>{label}</strong>
            <small>แตะเพื่อดูรายละเอียด</small>
          </span>
        </Button>
      ))}
    </nav>
  )
}
