import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useDemo } from '../lib/demo-context'
import AppointmentTicket from './appointments/components/AppointmentTicket'
import liff from '@line/liff'
import {
  BadgeCheck,
  CalendarCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Copy,
  Headset,
  History,
  Plus,
  UserRound,
} from 'lucide-react'
import { initializeLiff } from '../lib/liff'
import Card from '../components/Card'
import PrimaryButton from '../components/PrimaryButton'

export default function HomePage() {
  const navigate = useNavigate()
  const { patient, appointment } = useDemo()
  const [profile, setProfile] = useState<Awaited<ReturnType<typeof liff.getProfile>> | null>(null)
  const [copied, setCopied] = useState(false)
  const [dialog, setDialog] = useState<{ title: string; message: string } | null>(null)
  // Example patient data until the hospital API is connected.
  const hospitalNumber = patient.hn

  useEffect(() => {
    let active = true
    initializeLiff()
      .then(async () => {
        if (liff.isLoggedIn()) {
          const lineProfile = await liff.getProfile()
          if (active) setProfile(lineProfile)
        }
      })
      .catch(() => {
        // Keep the sample UI available outside LINE or without profile permission.
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <Card
        className="patient-card max-[370px]:gap-3! max-[370px]:px-3! desktop:col-start-1! desktop:row-start-1! desktop:p-6!"
        aria-label="ข้อมูลผู้ใช้งาน"
      >
        <Avatar className="patient-avatar overflow-visible max-[370px]:size-11! max-[370px]:basis-11!">
          <AvatarImage src={profile?.pictureUrl} alt="รูปโปรไฟล์" referrerPolicy="no-referrer" />
          <AvatarFallback className="bg-transparent text-[#659c93]">
            <UserRound size={29} strokeWidth={1.5} />
          </AvatarFallback>
          <span className="patient-badge" aria-label="โปรไฟล์ผู้ใช้งาน">
            <BadgeCheck size={17} fill="currentColor" />
          </span>
        </Avatar>
        <div className="patient-details min-w-0 flex-1 max-[370px]:[&_h2]:text-[17px]!">
          <h2>คุณ {profile?.displayName || patient.name}</h2>
          <div className="hospital-number max-[370px]:text-[11px]!">
            <span>
              HN: <strong>{hospitalNumber}</strong>
            </span>
            <Button
              variant="ghost"
              type="button"
              className="copy-button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(hospitalNumber)
                  setCopied(true)
                } catch {
                  setDialog({
                    title: 'หมายเลข HN',
                    message: `คัดลอกหมายเลขนี้: ${hospitalNumber}`,
                  })
                }
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              <span>{copied ? 'คัดลอกแล้ว' : 'คัดลอก'}</span>
            </Button>
          </div>
          <span className="sr-only" role="status">
            {copied ? 'คัดลอกหมายเลข HN แล้ว' : ''}
          </span>
        </div>
      </Card>

      <Card
        className="appointment-card max-[370px]:px-3! desktop:col-start-2! desktop:row-span-2! desktop:row-start-1! desktop:flex! desktop:min-h-[350px]! desktop:flex-col! desktop:items-center! desktop:justify-center! desktop:p-8! desktop:[&_.appointment-ticket]:w-full! desktop:[&_.appointment-ticket]:text-left! max-[370px]:[&>p]:text-xs! desktop:[&>p]:max-w-[380px]! desktop:[&>p]:text-[15px]!"
        aria-labelledby="appointment-title"
      >
        <CalendarCheck
          className="appointment-illustration desktop:mb-5! desktop:size-15!"
          size={44}
          strokeWidth={2.2}
          aria-hidden="true"
        />
        <h2 id="appointment-title">{appointment ? 'นัดหมายครั้งถัดไปของคุณ' : 'ไม่มีการนัดหมายเร็วๆ นี้'}</h2>
        {appointment ? (
          <AppointmentTicket />
        ) : (
          <p>
            ท่านยังไม่มีคิวนัดตรวจที่โรงพยาบาลมหาราชนครราชสีมา สามารถเลือกแผนกและทำการนัดหมายแพทย์ล่วงหน้าได้ทันที
          </p>
        )}
        <PrimaryButton onClick={() => navigate({ to: '/appointments/new' })}>
          <Plus size={22} strokeWidth={1.8} />
          นัดหมายใหม่
        </PrimaryButton>
      </Card>

      <Card
        className="appointment-menu desktop:col-start-1! desktop:row-start-2! desktop:p-4!"
        aria-labelledby="appointment-menu-title"
      >
        <h2 id="appointment-menu-title" className="section-title">
          เมนูนัด
        </h2>
        <div className="appointment-actions grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            className="appointment-action"
            type="button"
            onClick={() => navigate({ to: '/appointments' })}
          >
            <CalendarDays size={37} strokeWidth={1.8} aria-hidden="true" />
            <strong>เลื่อนนัดหมาย</strong>
            <span>จัดการคิวเดิม</span>
          </Button>
          <Button
            variant="ghost"
            className="appointment-action"
            type="button"
            onClick={() => navigate({ to: '/appointments/history' })}
          >
            <History size={33} strokeWidth={2} aria-hidden="true" />
            <strong>ประวัตินัดหมาย</strong>
            <span>ดูย้อนหลัง</span>
          </Button>
        </div>
      </Card>

      <Button
        variant="ghost"
        className="help-card card rounded-[20px] border border-outline bg-white max-[370px]:gap-2.5! max-[370px]:px-3! desktop:col-span-2! desktop:row-start-3!"
        type="button"
        onClick={() => navigate({ to: '/help' })}
      >
        <Headset
          className="help-icon shrink-0 text-[#05b38e]"
          size={25}
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <span className="help-copy min-w-0 flex-1 max-[370px]:[&_strong]:text-[13px]! max-[370px]:[&_strong]:whitespace-normal! desktop:[&_strong]:text-[17px]! desktop:[&>span]:text-xs!">
          <strong>ต้องการความช่วยเหลือเพิ่มเติม?</strong>
          <span>สอบถามระบบ AI หรือเลือกคำถามคัดกรอง</span>
        </span>
        <span className="help-arrow">
          <ChevronRight size={24} strokeWidth={2} />
        </span>
      </Button>

      <Modal
        open={Boolean(dialog)}
        onOpenChange={(open) => {
          if (!open) setDialog(null)
        }}
        title={dialog?.title || 'ข้อความ'}
      >
        <p>{dialog?.message}</p>
      </Modal>
    </>
  )
}
