import { createFileRoute, Link } from '@tanstack/react-router'
import { Headset } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
export const Route = createFileRoute('/help')({
  staticData: { title: 'ช่วยเหลือ' },
  component: HelpPage,
})

function HelpPage() {
  return (
    <PageLayout title="ช่วยเหลือ">
      <Card className="detail-card">
        <h2>
          <Headset size={25} />
          ต้องการความช่วยเหลือเพิ่มเติม?
        </h2>
        <p className="muted text-[13px] leading-[1.75] text-muted">คำถามที่พบบ่อย</p>
        <details>
          <summary>นัดหมายแพทย์ล่วงหน้าอย่างไร?</summary>
          <p>ไปที่นัดหมายใหม่ เลือกแผนก วัน และเวลาที่สะดวก ในขณะนี้เป็นข้อมูลตัวอย่างเท่านั้น</p>
          <Link to="/appointments/new">ไปหน้านัดหมาย</Link>
        </details>
        <details>
          <summary>เช็กอินที่โรงพยาบาลตรงไหน?</summary>
          <p>ดูจุดบริการ Kiosk และรายละเอียดสถานที่ในหน้าขั้นตอนการรับบริการ</p>
          <Link to="/service">ดูขั้นตอนการรับบริการ</Link>
        </details>
        <details>
          <summary>ต้องการแก้ไขข้อมูลส่วนตัว</summary>
          <p>ไปที่ข้อมูลผู้ใช้งาน แล้วเลือกแก้ไขข้อมูลส่วนบุคคล</p>
          <Link to="/profile">ไปหน้าข้อมูลผู้ใช้งาน</Link>
        </details>
        <div className="info-box flex flex-wrap items-center gap-2 rounded-[9px] bg-[#edf2ff] p-3.5 text-[13px] leading-[1.7]">
          ระบบสนทนา AI ยังไม่เปิดใช้งาน ข้อมูลในหน้านี้เป็นคู่มือทดลองใช้งาน
        </div>
      </Card>
    </PageLayout>
  )
}
