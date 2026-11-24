import { Check } from 'lucide-react'
const steps = ['เช็กอินที่โรงพยาบาล', 'รอคิวเข้าตรวจ', 'ชำระเงิน', 'รับยา']
export default function ServiceSteps({ step, onChange }) {
  return (
    <nav
      className="service-steps card rounded-[20px] border border-outline bg-white"
      aria-label="ขั้นตอนการรับบริการ"
    >
      {steps.map((label, index) => (
        <button
          key={label}
          type="button"
          className={`service-step ${index === step ? 'current' : ''} ${index < step ? 'complete' : ''}`}
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
        </button>
      ))}
    </nav>
  )
}
