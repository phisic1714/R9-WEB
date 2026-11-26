import { useForm } from '@tanstack/react-form'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import {
  UserRound,
  ShieldCheck,
  Contact,
  BriefcaseMedical,
  TriangleAlert,
  Phone,
  BadgeCheck,
  Save,
} from 'lucide-react'
import Card from '../components/Card'
import FormField from '../components/FormField'
import { useDemo } from '../lib/demo-context'
export default function ProfilePage() {
  const { patient, setPatient } = useDemo()
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState('')
  function validate({ value }: { value: { name: string; phone: string; email: string } }) {
    const fields: Partial<Record<keyof typeof value, string>> = {}
    if (!value.name.trim()) fields.name = 'กรุณากรอกชื่อ-นามสกุล'
    if (!/^[0-9]{9,10}$/.test(value.phone.replace(/\D/g, '')))
      fields.phone = 'กรอกเบอร์โทรศัพท์ 9–10 หลัก'
    if (value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email))
      fields.email = 'รูปแบบอีเมลไม่ถูกต้อง'
    return Object.keys(fields).length ? { fields } : undefined
  }
  const form = useForm({
    defaultValues: { name: patient.name, phone: patient.phone, email: patient.email },
    validators: { onChange: validate, onSubmit: validate },
    onSubmit: ({ value }) => {
      setPatient((previous) => ({ ...previous, ...value }))
      setEditing(false)
      setNotice('บันทึกข้อมูลตัวอย่างแล้ว')
    },
  })

  return (
    <>
      <Card className="profile-hero desktop:sticky! desktop:top-[104px]! desktop:px-[18px]! desktop:py-8!">
        <Avatar className="profile-picture">
          <AvatarFallback className="bg-transparent">
            <UserRound size={66} />
          </AvatarFallback>
        </Avatar>
        <h2>นาย{patient.name}</h2>
        <Badge
          variant="secondary"
          className="status-pill inline-flex items-center gap-[5px] rounded-full bg-[#c3ffdf] px-2.5 py-1 text-[11px] font-semibold text-[#007951]"
        >
          <ShieldCheck size={15} />
          ข้อมูลผู้ป่วยตัวอย่าง
        </Badge>
        <div className="profile-identifiers">
          <div>
            <small>เลขประจำตัวผู้ป่วย (HN)</small>
            <strong>{patient.hn}</strong>
            <small>รพ.มหาราชนครราชสีมา</small>
          </div>
          <div>
            <small>เลขประจำตัวประชาชน</small>
            <strong>1-3099-00123-xx-x</strong>
            <small className="green text-[#007a50]">ข้อมูลปกปิดบางส่วน</small>
          </div>
        </div>
      </Card>
      <div className="profile-grid grid gap-4 desktop:gap-5!">
        <Card className="detail-card min-[480px]:p-6!">
          <div className="card-title mb-4 flex items-center justify-between gap-3 max-[370px]:flex-wrap! max-[370px]:gap-1.5!">
            <h2>
              <Contact size={22} />
              ข้อมูลส่วนบุคคล
            </h2>
            <Button
              variant="ghost"
              className="text-button min-h-10 border-0 bg-transparent px-0 py-1 font-semibold whitespace-nowrap text-[#007b50]"
              onClick={() => {
                form.reset({ name: patient.name, phone: patient.phone, email: patient.email })
                setEditing(!editing)
              }}
            >
              {editing ? 'ปิด' : 'แก้ไข ›'}
            </Button>
          </div>
          {editing ? (
            <form
              className="form-grid grid grid-cols-1 gap-4 min-[480px]:grid-cols-2!"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                event.stopPropagation()
                void form.handleSubmit()
              }}
            >
              <form.Field name="name">
                {(field) => (
                  <FormField
                    errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                    label="ชื่อ-นามสกุล"
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
              <form.Field name="phone">
                {(field) => (
                  <FormField
                    errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                    label="เบอร์โทรศัพท์"
                  >
                    <Input
                      name={field.name}
                      onBlur={field.handleBlur}
                      required
                      type="tel"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  </FormField>
                )}
              </form.Field>
              <form.Field name="email">
                {(field) => (
                  <FormField
                    errors={field.state.meta.isTouched ? field.state.meta.errors : []}
                    label="อีเมล"
                  >
                    <Input
                      name={field.name}
                      onBlur={field.handleBlur}
                      type="email"
                      value={field.state.value}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  </FormField>
                )}
              </form.Field>
              <Button
                type="submit"
                variant="ghost"
                className="primary-button span-2 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark min-[480px]:col-span-2!"
              >
                <Save size={18} />
                บันทึกตัวอย่าง
              </Button>
            </form>
          ) : (
            <dl className="detail-list max-[370px]:[&_dd]:ml-auto! max-[370px]:[&>div]:flex-wrap! max-[370px]:[&>div]:gap-x-2.5! max-[370px]:[&>div]:gap-y-[3px]!">
              <div>
                <dt>ชื่อ-นามสกุล</dt>
                <dd>นาย{patient.name}</dd>
              </div>
              <div>
                <dt>วัน/เดือน/ปีเกิด</dt>
                <dd>14 กรกฎาคม 2515</dd>
              </div>
              <div>
                <dt>เพศ / สัญชาติ / ศาสนา</dt>
                <dd>ชาย · ไทย · พุทธ</dd>
              </div>
              <div>
                <dt>หมู่เลือด</dt>
                <dd>
                  <Badge
                    variant="secondary"
                    className="tag inline-block rounded-xl bg-[#e0eaff] px-[9px] py-[3px] text-[11px]"
                  >
                    O (Rh+)
                  </Badge>
                </dd>
              </div>
              <div>
                <dt>เบอร์โทรศัพท์</dt>
                <dd>{patient.phone}</dd>
              </div>
              <div>
                <dt>อีเมล</dt>
                <dd>{patient.email}</dd>
              </div>
            </dl>
          )}
        </Card>
        <Card className="detail-card min-[480px]:p-6!">
          <div className="card-title mb-4 flex items-center justify-between gap-3 max-[370px]:flex-wrap! max-[370px]:gap-1.5!">
            <h2>
              <BriefcaseMedical size={22} />
              ข้อมูลสุขภาพ & ข้อควรระวัง
            </h2>
          </div>
          <div className="allergy-alert">
            <TriangleAlert size={20} />
            <div>
              <strong>ประวัติแพ้ยา: Penicillin</strong>
              <p>อาการ: ผื่นลมพิษเฉียบพลัน บวมบริเวณริมฝีปาก</p>
            </div>
          </div>
          <p className="muted text-[13px] leading-[1.75] text-muted">
            โรคประจำตัว (Chronic Illness)
          </p>
          <div className="tags flex flex-wrap gap-[5px]">
            <Badge
              variant="secondary"
              className="tag inline-block rounded-xl bg-[#e0eaff] px-[9px] py-[3px] text-[11px]"
            >
              ความดันโลหิตสูง (HT)
            </Badge>
            <Badge
              variant="secondary"
              className="tag inline-block rounded-xl bg-[#e0eaff] px-[9px] py-[3px] text-[11px]"
            >
              ไขมันในเลือดสูง (DLP)
            </Badge>
          </div>
          <dl className="detail-list max-[370px]:[&_dd]:ml-auto! max-[370px]:[&>div]:flex-wrap! max-[370px]:[&>div]:gap-x-2.5! max-[370px]:[&>div]:gap-y-[3px]!">
            <div>
              <dt>ประวัติการแพ้อาหาร</dt>
              <dd>ไม่มี</dd>
            </div>
          </dl>
          <small className="muted text-[13px] leading-[1.75] text-muted">
            ข้อมูลสุขภาพตัวอย่างจากแบบหน้าจอ
          </small>
        </Card>
        <Card className="detail-card min-[480px]:p-6!">
          <div className="card-title mb-4 flex items-center justify-between gap-3 max-[370px]:flex-wrap! max-[370px]:gap-1.5!">
            <h2>
              <Contact size={22} />
              ข้อมูลติดต่อฉุกเฉิน
            </h2>
          </div>
          <div className="emergency-contact">
            <div>
              <small>ผู้ติดต่อฉุกเฉิน</small>
              <strong>นางมาลี ชัยพัฒนาสกุล</strong>
              <p className="muted text-[13px] leading-[1.75] text-muted">ความสัมพันธ์: ภรรยา</p>
            </div>
            <Button
              variant="ghost"
              className="small-button"
              onClick={() => setNotice('ยังไม่ได้เชื่อมต่อหมายเลขผู้ติดต่อฉุกเฉินจริง')}
            >
              <Phone size={17} />
              โทรทันที
            </Button>
          </div>
          <p className="muted text-[13px] leading-[1.75] text-muted">ที่อยู่ตามทะเบียนบ้าน/ปัจจุบัน</p>
          <p>128/4 หมู่ 5 ถนนสุรนารายณ์ ตำบลในเมือง อำเภอเมืองนครราชสีมา จังหวัดนครราชสีมา 30000</p>
        </Card>
        <Card className="detail-card min-[480px]:p-6!">
          <div className="card-title mb-4 flex items-center justify-between gap-3 max-[370px]:flex-wrap! max-[370px]:gap-1.5!">
            <h2>
              <ShieldCheck size={22} />
              สิทธิการรักษาพยาบาล
            </h2>
            <Badge
              variant="secondary"
              className="status-pill inline-flex items-center gap-[5px] rounded-full bg-[#c3ffdf] px-2.5 py-1 text-[11px] font-semibold text-[#007951]"
            >
              ปกติ (ตัวอย่าง)
            </Badge>
          </div>
          <div className="info-box flex flex-wrap items-center gap-2 rounded-[9px] bg-[#edf2ff] p-3.5 text-[13px] leading-[1.7]">
            <small>สิทธิการรักษาปัจจุบัน</small>
            <strong>บัตรทอง 30 บาท (หลักประกันสุขภาพถ้วนหน้า)</strong>
          </div>
          <p className="muted text-[13px] leading-[1.75] text-muted">สถานพยาบาลคู่สัญญาหลัก</p>
          <strong>โรงพยาบาลมหาราชนครราชสีมา</strong>
          <p className="muted text-[13px] leading-[1.75] text-muted">สถานพยาบาลปฐมภูมิ / รพ.สต.</p>
          <strong>รพ.สต. บ้านหนองกระทุ่ม</strong>
          <a
            className="secondary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
            href="https://www.nhso.go.th/"
            target="_blank"
            rel="noreferrer"
          >
            <BadgeCheck size={20} />
            ตรวจสอบสิทธิ สปสช. ออนไลน์
          </a>
        </Card>
      </div>
      {notice && (
        <p
          className="inline-notice rounded-[10px] bg-[#e1f9ee] p-[15px] text-[#007b50]"
          role="status"
        >
          {notice}
        </p>
      )}
    </>
  )
}
