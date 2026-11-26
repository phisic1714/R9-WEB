import { Baby, Bone, Eye, HeartPulse, Stethoscope } from 'lucide-react'

export const clinics = [
  {
    id: 'medicine',
    name: 'คลินิกอายุรกรรมทั่วไป',
    english: 'General Medicine Clinic',
    icon: Stethoscope,
    description: 'ดูแลโรคทั่วไป ไข้หวัด เบาหวาน ความดัน ไขมันในเลือดสูง และโรคเรื้อรังติดตามอาการ',
  },
  {
    id: 'cardiology',
    name: 'คลินิกอายุรกรรมโรคหัวใจและหลอดเลือด',
    english: 'Cardiology Clinic',
    icon: HeartPulse,
    description: 'ดูแลโรคหัวใจ หลอดเลือด ความดันโลหิต และติดตามอาการกับแพทย์เฉพาะทาง',
  },
  {
    id: 'orthopedic',
    name: 'คลินิกศัลยกรรมกระดูกและข้อ',
    english: 'Orthopedic Surgery Clinic',
    icon: Bone,
    description: 'ปวดเข่า ข้อเสื่อม กระดูกพรุน ปวดหลัง หมอนรองกระดูกทับเส้น และอุบัติเหตุกระดูกหัก',
  },
  {
    id: 'pediatric',
    name: 'คลินิกกุมารเวชกรรมทั่วไป',
    english: 'Pediatric Clinic',
    icon: Baby,
    description: 'ตรวจสุขภาพเด็ก การเจริญเติบโต ฉีดวัคซีน ไข้หวัด ไอ ท้องเสีย และภูมิแพ้ในเด็ก',
  },
  {
    id: 'eye',
    name: 'คลินิกจักษุวิทยา',
    english: 'Eye & Vision Clinic',
    icon: Eye,
    description: 'ตรวจวัดสายตา ต้อกระจก ต้อหิน จอประสาทตาเสื่อม และการผ่าตัดรักษาโรคตา',
  },
]
export type Clinic = (typeof clinics)[number]
export const doctors = [
  { id: 'doctor-1', name: 'นพ.เกียรติภูมิ ภักดีดำรงค์', rating: '4.90' },
  { id: 'doctor-2', name: 'พญ.ศุภาภรณ์ วัฒนศิริ', rating: '4.50' },
  { id: 'doctor-3', name: 'รศ.นพ.ประวิทย์ วรคุณธาดา', rating: '4.94' },
  { id: 'doctor-4', name: 'พญ.ชนิกานต์ ทิพยวานิช', rating: '4.32' },
]
export type Doctor = (typeof doctors)[number]
export const timeSlots = [
  { id: '08', label: '08:00 - 09:00 น.', remaining: 9, note: 'ช่วงเช้า รอบที่ 1' },
  { id: '09', label: '09:00 - 10:00 น.', remaining: 10, note: '' },
  { id: '10', label: '10:00 - 11:00 น.', remaining: 4, note: '' },
  { id: '11', label: '11:00 - 12:00 น.', remaining: 2, note: '' },
  { id: '13', label: '13:00 - 14:00 น.', remaining: 0, note: '' },
  { id: '14', label: '14:00 - 15:00 น.', remaining: 6, note: 'ช่วงบ่าย' },
]
export type BookingValues = {
  clinicId: string
  doctorId: string
  date: string
  timeId: string
  reason: string
  consent: boolean
}
export const defaultBookingValues: BookingValues = {
  clinicId: '',
  doctorId: '',
  date: '',
  timeId: '',
  reason: 'ตรวจติดตามอาการตามนัด',
  consent: false,
}
export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function formatBookingDate(value: string) {
  return new Date(value + 'T12:00:00').toLocaleDateString('th-TH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
