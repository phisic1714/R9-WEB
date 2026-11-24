import './AppHeader.css'
import { useRef } from 'react'
import { Link } from '@tanstack/react-router'
import { Bell, Menu, X, HeartPulse } from 'lucide-react'

export default function AppHeader({ title }) {
  const menu = useRef(null)
  const notifications = useRef(null)
  return (
    <>
      <header className="app-header">
        <button
          className="icon-button mobile-menu inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-navy"
          type="button"
          aria-label="เปิดเมนู"
          onClick={() => menu.current.showModal()}
        >
          <Menu size={22} />
        </button>
        <Link to="/" className="desktop-brand">
          <HeartPulse size={30} />
          <span>
            R9 <small>Health Connect</small>
          </span>
        </Link>
        <h1>{title}</h1>
        <nav className="desktop-navigation" aria-label="เมนูหลัก">
          <Link to="/" activeOptions={{ exact: true }}>
            หน้าหลัก
          </Link>
          <Link to="/appointments">นัดหมาย</Link>
          <Link to="/service">ขั้นตอนรับบริการ</Link>
          <Link to="/profile">ข้อมูลผู้ใช้งาน</Link>
        </nav>
        <button
          className="icon-button inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-navy"
          type="button"
          aria-label="การแจ้งเตือน"
          onClick={() => notifications.current.showModal()}
        >
          <Bell size={22} />
        </button>
      </header>
      <dialog ref={menu} className="app-dialog navigation-dialog">
        <button
          className="icon-button dialog-close absolute top-[5px] right-2.5 inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-navy"
          aria-label="ปิดเมนู"
          onClick={() => menu.current.close()}
        >
          <X />
        </button>
        <h2>R9 Health Connect</h2>
        <nav className="dialog-menu flex flex-col gap-2" aria-label="เมนูมือถือ">
          <Link to="/" onClick={() => menu.current.close()}>
            หน้าหลัก
          </Link>
          <Link to="/login" onClick={() => menu.current.close()}>
            เข้าสู่ระบบ / ลงทะเบียน
          </Link>
          <Link to="/profile" onClick={() => menu.current.close()}>
            ข้อมูลผู้ใช้งาน
          </Link>
          <Link to="/appointments" onClick={() => menu.current.close()}>
            นัดหมายของฉัน
          </Link>
          <Link to="/service" onClick={() => menu.current.close()}>
            ขั้นตอนการรับบริการ
          </Link>
          <Link to="/feedback" onClick={() => menu.current.close()}>
            แบบประเมิน
          </Link>
          <Link to="/help" onClick={() => menu.current.close()}>
            ช่วยเหลือ
          </Link>
        </nav>
      </dialog>
      <dialog ref={notifications} className="app-dialog" aria-labelledby="notification-title">
        <button
          className="icon-button dialog-close absolute top-[5px] right-2.5 inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-navy"
          aria-label="ปิดการแจ้งเตือน"
          onClick={() => notifications.current.close()}
        >
          <X />
        </button>
        <h2 id="notification-title">การแจ้งเตือน</h2>
        <p>ยังไม่มีการแจ้งเตือนใหม่</p>
      </dialog>
    </>
  )
}
