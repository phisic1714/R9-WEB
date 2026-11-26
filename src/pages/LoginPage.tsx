import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ChevronRight, HeartPulse, ShieldCheck, X } from 'lucide-react'
import Card from '../components/Card'
export default function LoginPage() {
  const [method, setMethod] = useState('')
  return (
    <>
      <section className="welcome-panel desktop:px-6! desktop:py-[65px]! desktop:[&_h2]:text-[26px]! desktop:[&_p]:text-[15px]!">
        <div className="r9-logo">
          <HeartPulse size={66} />
          <strong>R9</strong>
        </div>
        <h2>ยินดีต้อนรับสู่ R9 Health Connect</h2>
        <p>
          เข้าระบบด้วย Thai ID หรือ Health ID
          <br />
          เชื่อมโยงประวัติการรักษา จองคิวพบแพทย์
          <br />
          และติดตามสถานะคิวโรงพยาบาลเครือข่ายเขตสุขภาพที่ 9<br />
          อย่างปลอดภัย
        </p>
      </section>
      <div className="login-options flex flex-col gap-3">
        <Button
          variant="ghost"
          className="identity-option card rounded-[20px] border border-outline bg-white"
          onClick={() => setMethod('Thai ID')}
        >
          <span className="identity-logo thai-id">ThaiD</span>
          <span>
            <strong>Thai ID</strong>
            <small>
              ยืนยันตัวตนด้วยบัตรประชาชนดิจิทัลผ่านแอปพลิเคชัน ThaiD สะดวก ปลอดภัย และลดขั้นตอนการกรอกข้อมูลส่วนตัว
            </small>
          </span>
          <ChevronRight />
        </Button>
        <Button
          variant="ghost"
          className="identity-option card rounded-[20px] border border-outline bg-white"
          onClick={() => setMethod('Health ID')}
        >
          <span className="identity-logo health-id">
            HEALTH<span>ID</span>
          </span>
          <span>
            <strong>Health ID</strong>
            <small>
              สำหรับผู้ที่มีบัญชีสุขภาพพร้อม หรือ Health ID เชื่อมโยงเลขประจำตัวผู้ป่วย (HN)
              และข้อมูลสุขภาพโดยไม่ต้องกรอกใหม่
            </small>
          </span>
          <ChevronRight />
        </Button>
      </div>
      {method && (
        <Card className="identity-preview desktop:col-span-full!">
          <Button
            variant="ghost"
            className="icon-button inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-navy"
            aria-label="ปิดตัวเลือก"
            onClick={() => setMethod('')}
          >
            <X />
          </Button>
          <ShieldCheck size={32} />
          <h2>เข้าสู่ระบบด้วย {method}</h2>
          <p>หน้านี้เป็นการสาธิต ยังไม่เชื่อมต่อระบบยืนยันตัวตนจริง</p>
          <Button
            asChild
            variant="ghost"
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
          >
            <Link to="/register">ทดลองลงทะเบียน</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
          >
            <Link to="/">ดูหน้าหลักตัวอย่าง</Link>
          </Button>
        </Card>
      )}
    </>
  )
}
