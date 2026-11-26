import type { Appointment, Feedback } from '../lib/demo-context'
import { useState } from 'react'
import { Outlet, useMatches } from '@tanstack/react-router'
import AppHeader from './AppHeader'
import PageLayout from './PageLayout'
import { DemoContext } from '../lib/demo-context'
import '../styles/App.css'
import '../styles/responsive.css'

export default function RootLayout() {
  const matches = useMatches()
  const page = matches.at(-1)?.staticData
  const title = page?.title || 'R9 Health Connect'
  const [patient, setPatient] = useState({
    name: 'สมศักดิ์ ชัยพัฒนาสกุล',
    hn: '66-042819',
    phone: '081-876-5432',
    email: 'somsak@example.com',
  })
  const [appointment, setAppointment] = useState<Appointment | null>(null)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  return (
    <DemoContext.Provider
      value={{ patient, setPatient, appointment, setAppointment, feedback, setFeedback }}
    >
      <div className="app-shell">
        <AppHeader title={title} />
        <PageLayout title={title} className={page?.pageClassName}>
          <Outlet />
        </PageLayout>
      </div>
    </DemoContext.Provider>
  )
}
