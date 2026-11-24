import { createFileRoute } from '@tanstack/react-router'
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
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import FormField from '../components/FormField'
import { useDemo } from '../lib/demo-context'
export const Route = createFileRoute('/profile')({
  staticData: { title: 'ข้อมูลผู้ใช้งาน' },
  component: ProfilePage,
})

function ProfilePage() {
  const { patient, setPatient } = useDemo()
  const [editing, setEditing] = useState(false)
  const [notice, setNotice] = useState('')
  return (
    <PageLayout title="ข้อมูลผู้ใช้งาน" className="profile-page">
      <Card className="profile-hero">
        <div className="profile-picture">
          <UserRound size={66} />
        </div>
        <h2>นาย{patient.name}</h2>
        <span className="status-pill inline-flex items-center gap-[5px] rounded-full bg-[#c3ffdf] px-2.5 py-1 text-[11px] font-semibold text-[#007951]">
          <ShieldCheck size={15} />
          ข้อมูลผู้ป่วยตัวอย่าง
        </span>
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
      <div className="profile-grid grid gap-4">
        <Card className="detail-card">
          <div className="card-title mb-4 flex items-center justify-between gap-3">
            <h2>
              <Contact size={22} />
              ข้อมูลส่วนบุคคล
            </h2>
            <button
              className="text-button min-h-10 border-0 bg-transparent px-0 py-1 font-semibold whitespace-nowrap text-[#007b50]"
              onClick={() => setEditing(!editing)}
            >
              {editing ? 'ปิด' : 'แก้ไข ›'}
            </button>
          </div>
          {editing ? (
            <form
              className="form-grid grid grid-cols-1 gap-4"
              onSubmit={(event) => {
                event.preventDefault()
                setEditing(false)
                setNotice('บันทึกข้อมูลตัวอย่างแล้ว')
              }}
            >
              <FormField label="ชื่อ-นามสกุล" className="span-2">
                <input
                  required
                  value={patient.name}
                  onChange={(e) => setPatient({ ...patient, name: e.target.value })}
                />
              </FormField>
              <FormField label="เบอร์โทรศัพท์">
                <input
                  required
                  type="tel"
                  value={patient.phone}
                  onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
                />
              </FormField>
              <FormField label="อีเมล">
                <input
                  type="email"
                  value={patient.email}
                  onChange={(e) => setPatient({ ...patient, email: e.target.value })}
                />
              </FormField>
              <button className="primary-button span-2 inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark">
                <Save size={18} />
                บันทึกตัวอย่าง
              </button>
            </form>
          ) : (
            <dl className="detail-list">
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
                  <span className="tag inline-block rounded-xl bg-[#e0eaff] px-[9px] py-[3px] text-[11px]">
                    O (Rh+)
                  </span>
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
        <Card className="detail-card">
          <div className="card-title mb-4 flex items-center justify-between gap-3">
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
            <span className="tag inline-block rounded-xl bg-[#e0eaff] px-[9px] py-[3px] text-[11px]">
              ความดันโลหิตสูง (HT)
            </span>
            <span className="tag inline-block rounded-xl bg-[#e0eaff] px-[9px] py-[3px] text-[11px]">
              ไขมันในเลือดสูง (DLP)
            </span>
          </div>
          <dl className="detail-list">
            <div>
              <dt>ประวัติการแพ้อาหาร</dt>
              <dd>ไม่มี</dd>
            </div>
          </dl>
          <small className="muted text-[13px] leading-[1.75] text-muted">
            ข้อมูลสุขภาพตัวอย่างจากแบบหน้าจอ
          </small>
        </Card>
        <Card className="detail-card">
          <div className="card-title mb-4 flex items-center justify-between gap-3">
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
            <button
              className="small-button"
              onClick={() => setNotice('ยังไม่ได้เชื่อมต่อหมายเลขผู้ติดต่อฉุกเฉินจริง')}
            >
              <Phone size={17} />
              โทรทันที
            </button>
          </div>
          <p className="muted text-[13px] leading-[1.75] text-muted">ที่อยู่ตามทะเบียนบ้าน/ปัจจุบัน</p>
          <p>128/4 หมู่ 5 ถนนสุรนารายณ์ ตำบลในเมือง อำเภอเมืองนครราชสีมา จังหวัดนครราชสีมา 30000</p>
        </Card>
        <Card className="detail-card">
          <div className="card-title mb-4 flex items-center justify-between gap-3">
            <h2>
              <ShieldCheck size={22} />
              สิทธิการรักษาพยาบาล
            </h2>
            <span className="status-pill inline-flex items-center gap-[5px] rounded-full bg-[#c3ffdf] px-2.5 py-1 text-[11px] font-semibold text-[#007951]">
              ปกติ (ตัวอย่าง)
            </span>
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
    </PageLayout>
  )
}
