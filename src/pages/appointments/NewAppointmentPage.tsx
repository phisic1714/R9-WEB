import { useState } from 'react'
import { useForm, useSelector } from '@tanstack/react-form'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Check, CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FieldError } from '@/components/ui/field'
import Modal from '@/components/Modal'
import { useDemo } from '@/lib/demo-context'
import Stepper from './components/Stepper'
import ClinicStep from './components/ClinicStep'
import DoctorStep from './components/DoctorStep'
import DateTimeStep from './components/DateTimeStep'
import ConfirmStep, { BookingAdvice } from './components/ConfirmStep'
import { clinics, doctors, timeSlots, defaultBookingValues } from './booking-data'
import type { BookingValues } from './booking-data'

export default function NewAppointmentPage() {
  const [step, setStep] = useState(0)
  const [assessmentOpen, setAssessmentOpen] = useState(false)
  const [complete, setComplete] = useState(false)
  const { patient, setAppointment } = useDemo()
  const navigate = useNavigate()
  const form = useForm({
    defaultValues: defaultBookingValues,
    validators: {
      onSubmit: ({ value }: { value: BookingValues }) => {
        const fields: Partial<Record<keyof BookingValues, string>> = {}
        if (!value.clinicId) fields.clinicId = 'กรุณาเลือกคลินิก'
        if (step >= 1 && !value.doctorId) fields.doctorId = 'กรุณาเลือกแพทย์'
        if (step >= 2) {
          if (!value.date) fields.date = 'กรุณาเลือกวันที่นัดหมาย'
          if (!timeSlots.some((slot) => slot.id === value.timeId && slot.remaining > 0))
            fields.timeId = 'กรุณาเลือกช่วงเวลาที่ยังมีคิวว่าง'
        }
        if (step === 3 && !value.consent) fields.consent = 'กรุณายืนยันว่าตรวจสอบข้อมูลเรียบร้อยแล้ว'
        return Object.keys(fields).length ? { fields } : undefined
      },
    },
    onSubmit: ({ value }) => {
      if (step < 3) {
        changeStep(step + 1)
        return
      }
      const clinic = clinics.find((item) => item.id === value.clinicId)!
      const doctor = doctors.find((item) => item.id === value.doctorId)!
      const time = timeSlots.find((item) => item.id === value.timeId)!
      setAppointment({
        department: clinic.name,
        date: value.date,
        time: time.label,
        doctor: doctor.name,
        reason: value.reason,
      })
      setComplete(true)
    },
  })
  const values = useSelector(form.store, (state) => state.values)
  const clinic = clinics.find((item) => item.id === values.clinicId)
  const doctor = doctors.find((item) => item.id === values.doctorId)
  const time = timeSlots.find((item) => item.id === values.timeId)
  function changeStep(next: number) {
    setStep(next)
    form.setFieldValue('consent', false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1000px] gap-3 text-ink desktop:gap-5">
        <Stepper step={step} />
        <p className="px-1 text-[10px] text-muted">
          ข้อมูลตัวอย่างสำหรับทดลองนัดหมาย ยังไม่ได้เชื่อมต่อระบบโรงพยาบาล
        </p>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          className="grid min-w-0 gap-3 desktop:gap-5"
        >
          {step === 0 && (
            <ClinicStep
              onSelect={(id) => {
                if (id !== values.clinicId) {
                  form.reset({ ...defaultBookingValues, clinicId: id })
                }
                changeStep(1)
              }}
              onAssessment={() => setAssessmentOpen(true)}
            />
          )}
          {step === 1 && clinic && (
            <DoctorStep
              clinic={clinic}
              onSelect={(id) => {
                if (id !== values.doctorId) {
                  form.setFieldValue('doctorId', id)
                  form.setFieldValue('date', '')
                  form.setFieldValue('timeId', '')
                }
                changeStep(2)
              }}
            />
          )}
          {step === 2 && (
            <DateTimeStep
              date={values.date}
              timeId={values.timeId}
              onDateChange={(value) => {
                form.setFieldValue('date', value)
                form.setFieldValue('timeId', '')
                form.setFieldValue('consent', false)
              }}
              onTimeChange={(value) => form.setFieldValue('timeId', value)}
            />
          )}
          {step === 3 && clinic && doctor && time && (
            <ConfirmStep
              clinic={clinic}
              doctor={doctor}
              date={values.date}
              time={time.label}
              patient={patient}
              reason={values.reason}
              onReasonChange={(value) => {
                form.setFieldValue('reason', value)
                form.setFieldValue('consent', false)
              }}
            />
          )}
          {step === 3 && (
            <form.Field name="consent">
              {(field) => (
                <div className="rounded-xl bg-white p-5">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="booking-consent"
                      checked={field.state.value}
                      onCheckedChange={(value) => field.handleChange(value === true)}
                      onBlur={field.handleBlur}
                      aria-invalid={field.state.meta.errors.length > 0}
                      aria-describedby={
                        field.state.meta.errors.length ? 'booking-consent-error' : undefined
                      }
                      className="size-5 shrink-0 rounded-sm"
                    />
                    <Label htmlFor="booking-consent" className="text-sm leading-6 font-normal">
                      ข้าพเจ้าได้ตรวจสอบข้อมูลการนัดหมายและเงื่อนไขในการรับบริการข้างต้นถูกต้องเรียบร้อยแล้ว
                    </Label>
                  </div>
                  <FieldError
                    id="booking-consent-error"
                    className="mt-2"
                    errors={field.state.meta.errors.map((message) => ({ message }))}
                  />
                </div>
              )}
            </form.Field>
          )}
          {step === 2 && (
            <div role="status">
              <form.Field name="date">
                {(field) => (
                  <FieldError errors={field.state.meta.errors.map((message) => ({ message }))} />
                )}
              </form.Field>
              <form.Field name="timeId">
                {(field) => (
                  <FieldError errors={field.state.meta.errors.map((message) => ({ message }))} />
                )}
              </form.Field>
            </div>
          )}
          <div className="mt-3 grid gap-2 desktop:ml-auto desktop:w-[360px]">
            {step >= 2 && (
              <Button
                type="submit"
                className="h-10 w-full rounded-sm text-base"
                disabled={step === 2 && (!values.date || !values.timeId)}
              >
                {step === 3 ? (
                  <>
                    <Check className="size-5" /> ยืนยันการจอง
                  </>
                ) : (
                  'ถัดไป'
                )}
              </Button>
            )}
            {step === 0 ? (
              <Button
                asChild
                type="button"
                variant="outline"
                className="h-10 rounded-sm border-[#aebdd2] bg-white text-primary"
              >
                <Link to="/appointments">
                  <ArrowLeft className="size-5" /> ย้อนกลับ
                </Link>
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-sm border-[#aebdd2] bg-white text-primary"
                onClick={() => changeStep(step - 1)}
              >
                <ArrowLeft className="size-5" /> ย้อนกลับ
              </Button>
            )}
          </div>
        </form>
        {step === 3 && <BookingAdvice />}
      </div>
      <Modal
        open={assessmentOpen}
        onOpenChange={setAssessmentOpen}
        title="ประเมินอาการด้วย AI"
        description="ฟีเจอร์นี้ยังไม่เชื่อมต่อระบบประเมินอาการ"
      >
        <p>
          สามารถเลือกคลินิกจากรายการเพื่อทดลองขั้นตอนการนัดหมายได้ หากไม่แน่ใจว่าต้องพบแผนกใด กรุณาสอบถามโรงพยาบาล
        </p>
      </Modal>
      <Modal
        open={complete}
        onOpenChange={(open) => {
          setComplete(open)
          if (!open) void navigate({ to: '/appointments' })
        }}
        title="บันทึกนัดหมายตัวอย่างแล้ว"
        description="ยังไม่ได้ส่งการจองให้โรงพยาบาล"
        footer={
          <Button
            type="button"
            onClick={() => {
              setComplete(false)
              void navigate({ to: '/appointments' })
            }}
          >
            ดูนัดหมายของฉัน
          </Button>
        }
      >
        <CircleCheck className="mx-auto mb-3 size-12 text-primary" />
        <p className="text-center">ข้อมูลที่เลือกจะแสดงในหน้านัดหมายของฉันระหว่างใช้งานแอปครั้งนี้</p>
      </Modal>
    </>
  )
}
