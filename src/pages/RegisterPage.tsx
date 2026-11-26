import { useForm, useSelector } from '@tanstack/react-form'
import { FieldError } from '@/components/ui/field'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { Label } from '@/components/ui/label'
import { cn } from 'cn'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Check, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react'
import Card from '../components/Card'
import FormField from '../components/FormField'
import { useDemo } from '../lib/demo-context'
const defaultValues = {
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
}

export default function RegisterPage() {
  const { setPatient } = useDemo()
  const [step, setStep] = useState(0)
  const [complete, setComplete] = useState(false)
  function validate({ value }: { value: typeof defaultValues }) {
    const fields: Partial<Record<keyof typeof defaultValues, string>> = {}
    if (step === 0) {
      for (const name of ['prefix', 'firstName', 'lastName', 'id', 'birthDate', 'phone'] as const) {
        if (!value[name].trim()) fields[name] = 'กรุณากรอกข้อมูลนี้'
      }
      if (value.id && !/^[0-9]{13}$/.test(value.id)) fields.id = 'กรอกเลขบัตรประชาชน 13 หลัก'
      if (value.phone && !/^[0-9]{9,10}$/.test(value.phone))
        fields.phone = 'กรอกเบอร์โทรศัพท์ 9–10 หลัก'
      if (value.birthDate && value.birthDate > new Date().toLocaleDateString('en-CA'))
        fields.birthDate = 'วันเกิดต้องไม่อยู่ในอนาคต'
    }
    if (step === 1) {
      for (const name of ['house', 'province', 'district', 'subdistrict', 'postcode'] as const) {
        if (!value[name].trim()) fields[name] = 'กรุณากรอกข้อมูลนี้'
      }
      if (value.postcode && !/^[0-9]{5}$/.test(value.postcode))
        fields.postcode = 'กรอกรหัสไปรษณีย์ 5 หลัก'
    }
    if (step === 2) {
      for (const name of ['occupation', 'contact', 'relation', 'contactPhone'] as const) {
        if (!value[name].trim()) fields[name] = 'กรุณากรอกข้อมูลนี้'
      }
      if (value.contactPhone && !/^[0-9]{9,10}$/.test(value.contactPhone))
        fields.contactPhone = 'กรอกเบอร์โทรศัพท์ 9–10 หลัก'
    }
    if (step === 3 && !value.consent) fields.consent = 'กรุณายืนยันความยินยอมก่อนดำเนินการ'
    return Object.keys(fields).length ? { fields } : undefined
  }
  const form = useForm({
    defaultValues,
    validators: { onChange: validate, onSubmit: validate },
    onSubmit: ({ value }) => {
      if (step < 3) setStep(step + 1)
      else {
        setPatient((previous) => ({
          ...previous,
          name: `${value.firstName} ${value.lastName}`,
          phone: value.phone,
        }))
        setComplete(true)
      }
    },
  })
  const data = useSelector(form.store, (state) => state.values)

  return (
    <>
      <nav
        className="registration-steps desktop:p-6! desktop:[&_small]:text-[13px]!"
        aria-label="ขั้นตอนลงทะเบียน"
      >
        {['ส่วนตัว', 'ที่อยู่', 'อาชีพ', 'ยินยอม'].map((label, index) => (
          <div
            className={cn({ active: index === step, done: index < step })}
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
          <Button
            asChild
            variant="ghost"
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
          >
            <Link to="/profile">ดูข้อมูลผู้ใช้งาน</Link>
          </Button>
          <Link to="/">กลับหน้าหลัก</Link>
        </Card>
      ) : (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <Card className="form-card min-[480px]:p-6!">
            <h2>{['ข้อมูลส่วนตัว', 'ที่อยู่ปัจจุบัน', 'ข้อมูลเพิ่มเติม', 'ตรวจสอบและให้ความยินยอม'][step]}</h2>
            {step === 0 && (
              <div className="form-grid grid grid-cols-1 gap-4 min-[480px]:grid-cols-2!">
                <form.Field name="prefix">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="คำนำหน้า"
                      required
                      className="span-2 min-[480px]:col-span-2!"
                    >
                      <NativeSelect
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      >
                        <NativeSelectOption value="">เลือกคำนำหน้า</NativeSelectOption>
                        <NativeSelectOption>นาย</NativeSelectOption>
                        <NativeSelectOption>นาง</NativeSelectOption>
                        <NativeSelectOption>นางสาว</NativeSelectOption>
                      </NativeSelect>
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="firstName">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="ชื่อ"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        autoComplete="given-name"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="lastName">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="นามสกุล"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        autoComplete="family-name"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="id">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="เลขบัตรประชาชน"
                      required
                      className="span-2 min-[480px]:col-span-2!"
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        inputMode="numeric"
                        pattern="[0-9]{13}"
                        maxLength={13}
                        title="กรอกตัวเลข 13 หลัก"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="birthDate">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="วันเกิด"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        type="date"
                        max={new Date().toLocaleDateString('en-CA')}
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="blood">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="หมู่เลือด"
                    >
                      <NativeSelect
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      >
                        <NativeSelectOption value="">เลือกหมู่เลือด</NativeSelectOption>
                        {['A', 'B', 'AB', 'O', 'ไม่ทราบ'].map((v) => (
                          <NativeSelectOption key={v}>{v}</NativeSelectOption>
                        ))}
                      </NativeSelect>
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="phone">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="เบอร์โทรศัพท์"
                      required
                      className="span-2 min-[480px]:col-span-2!"
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        type="tel"
                        inputMode="tel"
                        pattern="[0-9]{9,10}"
                        autoComplete="tel"
                        title="กรอกตัวเลข 9–10 หลัก"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <div className="info-box span-2 flex flex-wrap items-center gap-2 rounded-[9px] bg-[#edf2ff] p-3.5 text-[13px] leading-[1.7] min-[480px]:col-span-2!">
                  เชื่อมโยงข้อมูลกับโรงพยาบาลมหาราชนครราชสีมา
                  <br />
                  <small>HN จะได้รับหลังตรวจสอบข้อมูลจากโรงพยาบาล</small>
                </div>
              </div>
            )}
            {step === 1 && (
              <div className="form-grid grid grid-cols-1 gap-4 min-[480px]:grid-cols-2!">
                <form.Field name="house">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="บ้านเลขที่ / หมู่ / ถนน"
                      required
                      className="span-2 min-[480px]:col-span-2!"
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="province">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="จังหวัด"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="district">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="อำเภอ / เขต"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="subdistrict">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="ตำบล / แขวง"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="postcode">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="รหัสไปรษณีย์"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        inputMode="numeric"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
              </div>
            )}
            {step === 2 && (
              <div className="form-grid grid grid-cols-1 gap-4 min-[480px]:grid-cols-2!">
                <form.Field name="occupation">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="อาชีพ"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="religion">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="ศาสนา"
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="contact">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="ชื่อผู้ติดต่อฉุกเฉิน"
                      required
                      className="span-2 min-[480px]:col-span-2!"
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="relation">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="ความสัมพันธ์"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
                <form.Field name="contactPhone">
                  {(field) => (
                    <FormField
                      errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                      label="โทรศัพท์ผู้ติดต่อ"
                      required
                    >
                      <Input
                        name={field.name}
                        onBlur={field.handleBlur}
                        required
                        type="tel"
                        pattern="[0-9]{9,10}"
                        value={field.state.value}
                        onChange={(event) => field.handleChange(event.target.value)}
                      />
                    </FormField>
                  )}
                </form.Field>
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
                <form.Field name="consent">
                  {(field) => (
                    <div>
                      <Label
                        htmlFor="registration-consent"
                        className="checkbox-row flex items-start gap-3 text-left leading-[1.9]"
                      >
                        <Checkbox
                          name={field.name}
                          onBlur={field.handleBlur}
                          aria-invalid={!field.state.meta.isValid}
                          id="registration-consent"
                          required

                          checked={field.state.value}
                          onCheckedChange={(checked) => field.handleChange(checked === true)}
                        />
                        ข้าพเจ้าเข้าใจและยินยอมทดลองการลงทะเบียนด้วยข้อมูลตัวอย่าง
                      </Label>
                      <FieldError
                        errors={field.state.meta.errors.map((error) =>
                          typeof error === 'string' ? { message: error } : error,
                        )}
                      />
                    </div>
                  )}
                </form.Field>
              </div>
            )}
          </Card>
          <div className="form-actions mt-4 flex justify-between gap-2.5 max-[370px]:flex-wrap! max-[370px]:[&>*]:min-w-[100px]!">
            <Button
              variant="ghost"
              type="button"
              className="secondary-button inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              <ChevronLeft size={18} />
              ย้อนกลับ
            </Button>
            <Button
              variant="ghost"
              type="submit"
              className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            >
              {step === 3 ? 'ยืนยันข้อมูลตัวอย่าง' : 'ถัดไป'}
              <ChevronRight size={18} />
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
