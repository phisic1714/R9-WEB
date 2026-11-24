import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import FormField from '../components/FormField'
import { useDemo } from '../lib/demo-context'
export const Route = createFileRoute('/register')({
  staticData: { title: 'ลงทะเบียนผู้ป่วยใหม่' },
  component: RegisterPage,
})

function RegisterPage() {
  const { setPatient } = useDemo()
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  const [data, setData] = useState({
    prefix: '',
    firstName: '',
    lastName: '',
    id: '',
    birthDate: '',
    blood: '',
    phone: '',
    house: '',
    province: '',
    district: '',
    subdistrict: '',
    postcode: '',
    occupation: '',
    religion: '',
    contact: '',
    contactPhone: '',
    relation: '',
    consent: false,
  })
  return (
    <PageLayout title="ลงทะเบียนผู้ป่วยใหม่" className="registration-page">
      <nav className="registration-steps" aria-label="ขั้นตอนลงทะเบียน">
        {['ส่วนตัว', 'ที่อยู่', 'อาชีพ', 'ยินยอม'].map((label, index) => (
          <div
            className={index === step ? 'active' : index < step ? 'done' : ''}
            key={label}
            aria-current={index === step ? 'step' : undefined}
          >
            <span>{index < step ? <Check size={17} /> : index + 1}</span>
            <small>{label}</small>
          </div>
        ))}
      </nav>
      {complete ? (
        <Card className="success-panel">
          <ShieldCheck size={58} />
          <h2>กรอกข้อมูลตัวอย่างเรียบร้อย</h2>
          <p>ข้อมูลยังไม่ได้ส่งให้โรงพยาบาล และไม่ได้ยืนยันตัวตนจริง</p>
          <Link
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            to="/profile"
          >
            ดูข้อมูลผู้ใช้งาน
          </Link>
          <Link to="/">กลับหน้าหลัก</Link>
        </Card>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (step < 3) setStep(step + 1)
            else {
              setPatient((previous) => ({
                ...previous,
                name: `${data.firstName} ${data.lastName}`,
                phone: data.phone,
              }))
              setComplete(true)
            }
          }}
        >
          <Card className="form-card">
            <h2>{['ข้อมูลส่วนตัว', 'ที่อยู่ปัจจุบัน', 'ข้อมูลเพิ่มเติม', 'ตรวจสอบและให้ความยินยอม'][step]}</h2>
            {step === 0 && (
              <div className="form-grid grid grid-cols-1 gap-4">
                <FormField label="คำนำหน้า" required className="span-2">
                  <select
                    required
                    value={data.prefix}
                    onChange={(e) => setData({ ...data, prefix: e.target.value })}
                  >
                    <option value="">เลือกคำนำหน้า</option>
                    <option>นาย</option>
                    <option>นาง</option>
                    <option>นางสาว</option>
                  </select>
                </FormField>
                <FormField label="ชื่อ" required>
                  <input
                    required
                    autoComplete="given-name"
                    value={data.firstName}
                    onChange={(e) => setData({ ...data, firstName: e.target.value })}
                  />
                </FormField>
                <FormField label="นามสกุล" required>
                  <input
                    required
                    autoComplete="family-name"
                    value={data.lastName}
                    onChange={(e) => setData({ ...data, lastName: e.target.value })}
                  />
                </FormField>
                <FormField label="เลขบัตรประชาชน" required className="span-2">
                  <input
                    required
                    inputMode="numeric"
                    pattern="[0-9]{13}"
                    maxLength={13}
                    title="กรอกตัวเลข 13 หลัก"
                    value={data.id}
                    onChange={(e) => setData({ ...data, id: e.target.value })}
                  />
                </FormField>
                <FormField label="วันเกิด" required>
                  <input
                    required
                    type="date"
                    max={new Date().toLocaleDateString('en-CA')}
                    value={data.birthDate}
                    onChange={(e) => setData({ ...data, birthDate: e.target.value })}
                  />
                </FormField>
                <FormField label="หมู่เลือด">
                  <select
                    value={data.blood}
                    onChange={(e) => setData({ ...data, blood: e.target.value })}
                  >
                    <option value="">เลือกหมู่เลือด</option>
                    {['A', 'B', 'AB', 'O', 'ไม่ทราบ'].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="เบอร์โทรศัพท์" required className="span-2">
                  <input
                    required
                    type="tel"
                    inputMode="tel"
                    pattern="[0-9]{9,10}"
                    autoComplete="tel"
                    title="กรอกตัวเลข 9–10 หลัก"
                    value={data.phone}
                    onChange={(e) => setData({ ...data, phone: e.target.value })}
                  />
                </FormField>
                <div className="info-box span-2 flex flex-wrap items-center gap-2 rounded-[9px] bg-[#edf2ff] p-3.5 text-[13px] leading-[1.7]">
                  เชื่อมโยงข้อมูลกับโรงพยาบาลมหาราชนครราชสีมา
                  <br />
                  <small>HN จะได้รับหลังตรวจสอบข้อมูลจากโรงพยาบาล</small>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="form-grid grid grid-cols-1 gap-4">
                <FormField label="บ้านเลขที่ / หมู่ / ถนน" required className="span-2">
                  <input
                    required
                    value={data.house}
                    onChange={(e) => setData({ ...data, house: e.target.value })}
                  />
                </FormField>
                <FormField label="จังหวัด" required>
                  <input
                    required
                    value={data.province}
                    onChange={(e) => setData({ ...data, province: e.target.value })}
                  />
                </FormField>
                <FormField label="อำเภอ / เขต" required>
                  <input
                    required
                    value={data.district}
                    onChange={(e) => setData({ ...data, district: e.target.value })}
                  />
                </FormField>
                <FormField label="ตำบล / แขวง" required>
                  <input
                    required
                    value={data.subdistrict}
                    onChange={(e) => setData({ ...data, subdistrict: e.target.value })}
                  />
                </FormField>
                <FormField label="รหัสไปรษณีย์" required>
                  <input
                    required
                    inputMode="numeric"
                    pattern="[0-9]{5}"
                    maxLength={5}
                    value={data.postcode}
                    onChange={(e) => setData({ ...data, postcode: e.target.value })}
                  />
                </FormField>
              </div>
            )}
            {step === 2 && (
              <div className="form-grid grid grid-cols-1 gap-4">
                <FormField label="อาชีพ" required>
                  <input
                    required
                    value={data.occupation}
                    onChange={(e) => setData({ ...data, occupation: e.target.value })}
                  />
                </FormField>
                <FormField label="ศาสนา">
                  <input
                    value={data.religion}
                    onChange={(e) => setData({ ...data, religion: e.target.value })}
                  />
                </FormField>
                <FormField label="ชื่อผู้ติดต่อฉุกเฉิน" required className="span-2">
                  <input
                    required
                    value={data.contact}
                    onChange={(e) => setData({ ...data, contact: e.target.value })}
                  />
                </FormField>
                <FormField label="ความสัมพันธ์" required>
                  <input
                    required
                    value={data.relation}
                    onChange={(e) => setData({ ...data, relation: e.target.value })}
                  />
                </FormField>
                <FormField label="โทรศัพท์ผู้ติดต่อ" required>
                  <input
                    required
                    type="tel"
                    pattern="[0-9]{9,10}"
                    value={data.contactPhone}
                    onChange={(e) => setData({ ...data, contactPhone: e.target.value })}
                  />
                </FormField>
              </div>
            )}
            {step === 3 && (
              <div className="consent-content flex flex-col items-center gap-[18px] text-[#3b4b62]">
                <ShieldCheck size={42} />
                <h3>
                  {data.prefix}
                  {data.firstName} {data.lastName}
                </h3>
                <p>โทรศัพท์ {data.phone}</p>
                <p>
                  ข้อมูลในแบบฟอร์มนี้ใช้สำหรับทดลองหน้าจอเท่านั้น ไม่ได้ส่งไปยังโรงพยาบาล ข้อมูลจะหายเมื่อโหลดหน้าเว็บใหม่
                </p>
                <label className="checkbox-row flex items-start gap-3 text-left leading-[1.9]">
                  <input
                    required
                    type="checkbox"
                    checked={data.consent}
                    onChange={(e) => setData({ ...data, consent: e.target.checked })}
                  />
                  ข้าพเจ้าเข้าใจและยินยอมทดลองการลงทะเบียนด้วยข้อมูลตัวอย่าง
                </label>
              </div>
            )}
          </Card>
          <div className="form-actions mt-4 flex justify-between gap-2.5">
            <button
              type="button"
              className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft size={18} />
              ย้อนกลับ
            </button>
            <button
              type="submit"
              className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            >
              {step === 3 ? 'ยืนยันข้อมูลตัวอย่าง' : 'ถัดไป'}
              <ChevronRight size={18} />
            </button>
          </div>
        </form>
      )}
    </PageLayout>
  )
}
