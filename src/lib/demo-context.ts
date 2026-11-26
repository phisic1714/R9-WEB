import { createContext, useContext } from 'react'
import type { Dispatch, SetStateAction } from 'react'
export type Patient = { name: string; hn: string; phone: string; email: string }
export type Appointment = {
  department: string
  date: string
  time: string
  doctor?: string
  reason?: string
}
export type Feedback = { rating: number; topics: string[]; comment: string; anonymous: boolean }
type DemoState = {
  patient: Patient
  setPatient: Dispatch<SetStateAction<Patient>>
  appointment: Appointment | null
  setAppointment: Dispatch<SetStateAction<Appointment | null>>
  feedback: Feedback | null
  setFeedback: Dispatch<SetStateAction<Feedback | null>>
}
export const DemoContext = createContext<DemoState | null>(null)
export function useDemo() {
  const context = useContext(DemoContext)
  if (!context) throw new Error('useDemo must be used inside DemoContext.Provider')
  return context
}
