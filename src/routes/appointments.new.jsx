import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, CalendarCheck } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import FormField from '../components/FormField'
import { useDemo } from '../lib/demo-context'
export const Route = createFileRoute('/appointments/new')({
  staticData: { title: 'นัดหมายใหม่' },
  component: NewAppointmentPage,
})

function NewAppointmentPage() {
  const { appointment, setAppointment } = useDemo()
  const [department, setDepartment] = useState(appointment?.department || '')
  const [date, setDate] = useState(appointment?.date || '')
  const [time, setTime] = useState(appointment?.time || '')
  const [saved, setSaved] = useState(false)
  return (
    <PageLayout title={appointment ? 'เลื่อนนัดหมาย' : 'นัดหมายใหม่'} className="booking-page">
      <div className="booking-intro">
        <span className="large-icon mb-3 inline-flex rounded-full bg-[#dff8ef] p-[18px] text-[#00ae87]">
          <CalendarCheck size={40} />
        </span>
        <h2>เลือกวันและเวลาที่สะดวก</h2>
        <p>โรงพยาบาลมหาราชนครราชสีมา</p>
      </div>
      {saved ? (
        <Card className="success-panel">
          <Check size={58} />
          <h2>บันทึกนัดหมายตัวอย่างแล้ว</h2>
          <p>การนัดหมายนี้ไม่ได้ส่งไปโรงพยาบาล และไม่ใช่คิวรับบริการจริง</p>
          <Link
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            to="/appointments"
          >
            ดูนัดหมายของฉัน
          </Link>
        </Card>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setAppointment({ department, date, time })
            setSaved(true)
          }}
        >
          <Card className="form-card">
            <h2>รายละเอียดการนัดหมาย</h2>
            <div className="form-grid grid grid-cols-1 gap-4">
              <FormField label="แผนกที่ต้องการรับบริการ" required className="span-2">
                <select required value={department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="">เลือกแผนก</option>
                  <option>คลินิกอายุรกรรมทั่วไป</option>
                  <option>คลินิกศัลยกรรม</option>
                  <option>คลินิกจักษุ</option>
                  <option>คลินิกทันตกรรม</option>
                </select>
              </FormField>
              <FormField label="วันที่นัดหมาย" required className="span-2">
                <input
                  type="date"
                  required
                  min={new Date().toLocaleDateString('en-CA')}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </FormField>
            </div>
            <fieldset className="time-slots">
              <legend>
                ช่วงเวลาที่ต้องการ <span className="required text-[#cf3846]">*</span>
              </legend>
              {['08:00 - 09:00 น.', '09:00 - 10:00 น.', '10:00 - 11:00 น.', '13:00 - 14:00 น.'].map(
                (slot) => (
                  <label key={slot} className={time === slot ? 'selected' : ''}>
                    <input
                      required
                      type="radio"
                      name="time"
                      value={slot}
                      checked={time === slot}
                      onChange={(e) => setTime(e.target.value)}
                    />
                    {slot}
                  </label>
                ),
              )}
            </fieldset>
            <div className="info-box flex flex-wrap items-center gap-2 rounded-[9px] bg-[#edf2ff] p-3.5 text-[13px] leading-[1.7]">
              กรุณาเลือกข้อมูลเพื่อทดลองขั้นตอนการนัดหมาย ข้อมูลจะไม่ถูกส่งไปยังโรงพยาบาล
            </div>
          </Card>
          <div className="form-actions mt-4 flex justify-between gap-2.5">
            <Link
              className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
              to="/appointments"
            >
              ย้อนกลับ
            </Link>
            <button
              type="submit"
              className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            >
              <Check size={20} />
              ยืนยันนัดหมายตัวอย่าง
            </button>
          </div>
        </form>
      )}
    </PageLayout>
  )
}
