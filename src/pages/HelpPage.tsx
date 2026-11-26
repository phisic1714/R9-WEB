import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Link } from '@tanstack/react-router'
import { Headset } from 'lucide-react'
import Card from '../components/Card'
export default function HelpPage() {
  return (
    <>
      <Card className="detail-card min-[480px]:p-6!">
        <h2>
          <Headset size={25} />
          ต้องการความช่วยเหลือเพิ่มเติม?
        </h2>
        <p className="muted text-[13px] leading-[1.75] text-muted">คำถามที่พบบ่อย</p>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>นัดหมายแพทย์ล่วงหน้าอย่างไร?</AccordionTrigger>
            <AccordionContent>
              <p>ไปที่นัดหมายใหม่ เลือกแผนก วัน และเวลาที่สะดวก ในขณะนี้เป็นข้อมูลตัวอย่างเท่านั้น</p>
              <Link to="/appointments/new">ไปหน้านัดหมาย</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>เช็กอินที่โรงพยาบาลตรงไหน?</AccordionTrigger>
            <AccordionContent>
              <p>ดูจุดบริการ Kiosk และรายละเอียดสถานที่ในหน้าขั้นตอนการรับบริการ</p>
              <Link to="/service">ดูขั้นตอนการรับบริการ</Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>ต้องการแก้ไขข้อมูลส่วนตัว</AccordionTrigger>
            <AccordionContent>
              <p>ไปที่ข้อมูลผู้ใช้งาน แล้วเลือกแก้ไขข้อมูลส่วนบุคคล</p>
              <Link to="/profile">ไปหน้าข้อมูลผู้ใช้งาน</Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="info-box flex flex-wrap items-center gap-2 rounded-[9px] bg-[#edf2ff] p-3.5 text-[13px] leading-[1.7]">
          ระบบสนทนา AI ยังไม่เปิดใช้งาน ข้อมูลในหน้านี้เป็นคู่มือทดลองใช้งาน
        </div>
      </Card>
    </>
  )
}
