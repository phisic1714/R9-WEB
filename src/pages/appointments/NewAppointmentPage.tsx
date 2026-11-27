import { useState } from 'react'
import { useForm, useSelector } from '@tanstack/react-form'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, Atom, Check, CircleCheck, CpuAi } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FieldError } from '@/components/ui/field'
import { useDemo } from '@/lib/demo-context'
import Stepper from './components/Stepper'
import ClinicStep from './components/ClinicStep'
import DoctorStep from './components/DoctorStep'
import DateTimeStep from './components/DateTimeStep'
import ConfirmStep, { BookingAdvice } from './components/ConfirmStep'
import { clinics, doctors, timeSlots, defaultBookingValues } from './booking-data'
import type { BookingValues } from './booking-data'
import Modal from '@/components/Modal'
import { Input } from '@/components/ui/input'
import ClinicCard from './components/ClinicCard'

type AssessmentModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectClinic: (id: string) => void
}

function AssessmentModal({ open, onOpenChange, onSelectClinic }: AssessmentModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title="ประเมินอาการด้วย AI" size="md">
      <div className="flex flex-col gap-2">
        <section className="flex flex-col gap-2 rounded-xl bg-[#102354] p-3 text-white">
          <div className="flex flex-row items-center gap-2">
            <Atom width={50} height={50} />
            <div className="flex flex-col gap-1">
              <p>AI ช่วยแนะนำ</p>
              <p>ท่านสามารถแจ้งอาการของท่าน แล้วกดประเมินที่ปุ่มสีเขียว เพื่อรับคำแนะนำ</p>
            </div>
          </div>{' '}
          <section
            aria-label="ข้อความสนทนา"
            tabIndex={0}
            className="flex max-h-[min(40dvh,24rem)] min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain rounded-2xl border-2 p-3 [&>div]:shrink-0 [&>div]:wrap-break-word"
          >
            <div className="max-w-2/3 self-end rounded-sm bg-[#09AFD0] p-1">มีอาการไอและเจ็บคอ</div>
            <div className="max-w-2/3 self-start rounded-sm bg-white p-1 text-black">
              สวัสดีครับ ยินดีให้คำแนะนำเบื้องต้นครับ จากอาการที่แจ้งมา ขอแนะนำให้เข้ารับการตรวจที่ คลินิกอายุรกรรมทั่วไป
              เนื่องจากอาการ...
            </div>{' '}
            <div className="max-w-2/3 self-start rounded-sm bg-white p-1 text-black">
              สวัสดีครับ ยินดีให้คำแนะนำเบื้องต้นครับ จากอาการที่แจ้งมา ขอแนะนำให้เข้ารับการตรวจที่ คลินิกอายุรกรรมทั่วไป
              เนื่องจากอาการ...
            </div>{' '}
            <div className="max-w-2/3 self-start rounded-sm bg-white p-1 text-black">
              สวัสดีครับ ยินดีให้คำแนะนำเบื้องต้นครับ จากอาการที่แจ้งมา ขอแนะนำให้เข้ารับการตรวจที่ คลินิกอายุรกรรมทั่วไป
              เนื่องจากอาการ...
            </div>{' '}
            <div className="max-w-2/3 self-start rounded-sm bg-white p-1 text-black">
              สวัสดีครับ ยินดีให้คำแนะนำเบื้องต้นครับ จากอาการที่แจ้งมา ขอแนะนำให้เข้ารับการตรวจที่ คลินิกอายุรกรรมทั่วไป
              เนื่องจากอาการ...
            </div>
          </section>
          <Input required placeholder="ระบุอาการของท่าน เช่น ปวดหัว หรือ ไอ" />
          <Button className="flex flex-row gap-1">
            <CpuAi /> <p>ประเมินอาการด้วย AI</p>
          </Button>
        </section>
        <section className="rounded-2xl border p-1">
          <ClinicCard
            key={clinics?.[0]?.id}
            clinic={clinics?.[0]}
            doctorCount={doctors.length}
            onSelect={onSelectClinic}
          />
        </section>
      </div>
    </Modal>
  )
}

type BookingSuccessModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onViewAppointments: () => void
}

function BookingSuccessModal({ open, onOpenChange, onViewAppointments }: BookingSuccessModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title="บันทึกนัดหมายตัวอย่างแล้ว"
      description="ยังไม่ได้ส่งการจองให้โรงพยาบาล"
      footer={
        <Button type="button" onClick={onViewAppointments}>
          ดูนัดหมายของฉัน
        </Button>
      }
    >
      <CircleCheck className="mx-auto mb-3 size-12 text-primary" />
      <p className="text-center">ข้อมูลที่เลือกจะแสดงในหน้านัดหมายของฉันระหว่างใช้งานแอปครั้งนี้</p>
    </Modal>
  )
}

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
      <div className="mx-auto grid w-full max-w-[1000px] grid-cols-1 gap-3 text-ink desktop:gap-5">
        <Stepper step={step} />

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
          className="grid min-w-0 grid-cols-1 gap-3 desktop:gap-5"
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
      <AssessmentModal
        open={assessmentOpen}
        onOpenChange={setAssessmentOpen}
        onSelectClinic={(id) => {
          form.reset({ ...defaultBookingValues, clinicId: id })
          setAssessmentOpen(false)
          changeStep(1)
        }}
      />
      <BookingSuccessModal
        open={complete}
        onOpenChange={(open) => {
          setComplete(open)
          if (!open) void navigate({ to: '/appointments' })
        }}
        onViewAppointments={() => {
          setComplete(false)
          void navigate({ to: '/appointments' })
        }}
      />
    </>
  )
}
