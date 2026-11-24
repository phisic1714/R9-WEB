import { useState } from 'react'
import { Outlet, useMatches } from '@tanstack/react-router'
import AppHeader from './AppHeader'
import { DemoContext } from '../lib/demo-context'
import '../App.css'
import '../responsive.css'

export default function RootLayout() {
  const matches = useMatches()
  const title = matches.at(-1)?.staticData?.title || 'R9 Health Connect'
  const [patient, setPatient] = useState({
    name: 'สมศักดิ์ ชัยพัฒนาสกุล',
    hn: '66-042819',
    phone: '081-876-5432',
    email: 'somsak@example.com',
  })
  const [appointment, setAppointment] = useState(null)
  const [feedback, setFeedback] = useState(null)
  return (
    <DemoContext.Provider
      value={{ patient, setPatient, appointment, setAppointment, feedback, setFeedback }}
    >
      <div className="app-shell">
        <AppHeader title={title} />
        <Outlet />
      </div>
    </DemoContext.Provider>
  )
}
