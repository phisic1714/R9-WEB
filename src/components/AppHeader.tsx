import { Button } from '@/components/ui/button'
import '../styles/AppHeader.css'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Bell, Menu, HeartPulse } from 'lucide-react'
import { Sheet, SheetTrigger } from './ui/sheet'
import MobileSidebar from './MobileSidebar'
import Modal from './Modal'

export default function AppHeader({ title }: { title: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [])

  return (
    <>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <header className="app-header desktop:min-h-20! desktop:gap-6! desktop:px-[max(28px,calc((100%_-_1120px)/2))]!">
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="icon-button mobile-menu inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-navy desktop:hidden!"
              type="button"
              aria-label="เปิดเมนู"
            >
              <Menu size={22} />
            </Button>
          </SheetTrigger>
          <Link
            to="/"
            className="desktop-brand desktop:flex! desktop:shrink-0 desktop:items-center desktop:gap-2 desktop:text-[#0a9c85] desktop:no-underline desktop:[&_small]:block desktop:[&_small]:text-[10px] desktop:[&_small]:tracking-[0.6px] desktop:[&>span]:text-[25px] desktop:[&>span]:leading-[1.1] desktop:[&>span]:font-bold desktop:[&>span]:text-[#173561]"
          >
            <HeartPulse size={30} />
            <span>
              R9 <small>Health Connect</small>
            </span>
          </Link>
          <h1 className="desktop:hidden">{title}</h1>
          <nav
            className="desktop-navigation desktop:flex! desktop:flex-1 desktop:items-center desktop:justify-end desktop:gap-6 desktop:[&_a]:py-3 desktop:[&_a]:text-[13px] desktop:[&_a]:text-[#4c5b75] desktop:[&_a]:no-underline desktop:[&_a[data-status=active]]:text-[#008c6d] desktop:[&_a[data-status=active]]:shadow-[inset_0_-2px_#008c6d]"
            aria-label="เมนูหลัก"
          >
            <Link to="/" activeOptions={{ exact: true }}>
              หน้าหลัก
            </Link>
            <Link to="/appointments">นัดหมาย</Link>
            <Link to="/service">ขั้นตอนรับบริการ</Link>
            <Link to="/profile">ข้อมูลผู้ใช้งาน</Link>
          </nav>
          <Button
            variant="ghost"
            className="icon-button inline-flex h-11 w-11 shrink-0 items-center justify-center border-0 bg-transparent p-0 text-navy"
            type="button"
            aria-label="การแจ้งเตือน"
            onClick={() => setNotificationsOpen(true)}
          >
            <Bell size={22} />
          </Button>
        </header>
        <MobileSidebar onNavigate={() => setMenuOpen(false)} />
      </Sheet>
      <Modal
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        title="การแจ้งเตือน"
        description="ข่าวสารและการอัปเดตของคุณ"
      >
        <p>ยังไม่มีการแจ้งเตือนใหม่</p>
      </Modal>
    </>
  )
}
