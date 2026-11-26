import { Link } from '@tanstack/react-router'
import {
  CalendarDays,
  ClipboardList,
  HeartPulse,
  HelpCircle,
  Home,
  LogIn,
  Star,
  UserRound,
} from 'lucide-react'
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet'

export default function MobileSidebar({ onNavigate }: { onNavigate: () => void }) {
  return (
    <SheetContent
      side="left"
      className="h-dvh max-h-dvh w-[min(86vw,320px)] gap-0 border-outline p-0 sm:max-w-none"
    >
      <SheetHeader className="border-b border-outline px-6 pt-[max(24px,env(safe-area-inset-top))] pb-6 text-left">
        <SheetTitle className="flex items-center gap-2 text-xl text-navy">
          <HeartPulse className="size-7 text-primary" />
          R9 Health Connect
        </SheetTitle>
        <SheetDescription>เมนูบริการสุขภาพ</SheetDescription>
      </SheetHeader>
      <nav
        className="sidebar-navigation flex flex-1 flex-col gap-1 overflow-y-auto p-4"
        aria-label="เมนูมือถือ"
      >
        <Link to="/" activeOptions={{ exact: true }} onClick={onNavigate}>
          <Home size={20} />
          หน้าหลัก
        </Link>
        <Link to="/login" onClick={onNavigate}>
          <LogIn size={20} />
          เข้าสู่ระบบ / ลงทะเบียน
        </Link>
        <Link to="/profile" onClick={onNavigate}>
          <UserRound size={20} />
          ข้อมูลผู้ใช้งาน
        </Link>
        <Link to="/appointments" onClick={onNavigate}>
          <CalendarDays size={20} />
          นัดหมายของฉัน
        </Link>
        <Link to="/service" onClick={onNavigate}>
          <ClipboardList size={20} />
          ขั้นตอนการรับบริการ
        </Link>
        <Link to="/feedback" onClick={onNavigate}>
          <Star size={20} />
          แบบประเมิน
        </Link>
        <Link to="/help" onClick={onNavigate}>
          <HelpCircle size={20} />
          ช่วยเหลือ
        </Link>
      </nav>
      <p className="m-0 border-t border-outline px-6 py-5 pb-[max(20px,env(safe-area-inset-bottom))] text-xs text-muted">
        เขตสุขภาพที่ 9 · R9 Health Connect
      </p>
    </SheetContent>
  )
}
