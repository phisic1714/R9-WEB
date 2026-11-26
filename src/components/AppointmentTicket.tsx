import { CalendarDays, Clock, MapPin, Stethoscope } from 'lucide-react'
import { useDemo } from '../lib/demo-context'
export default function AppointmentTicket({ queue = 'A-042' }) {
  const { patient, appointment } = useDemo()
  return (
    <div className="appointment-ticket text-left">
      <div className="ticket-heading">
        <div>
          <small>คิวนัดหมายล่วงหน้า</small>
          <strong>{queue}</strong>
        </div>
        <div>
          <small>แผนกบริการ</small>
          <b>{appointment?.department || 'คลินิกอายุรกรรมทั่วไป'}</b>
        </div>
      </div>
      <div className="ticket-line max-[370px]:[&_strong]:text-sm!">
        <span className="round-icon inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7eeff] text-navy">
          <CalendarDays size={20} />
        </span>
        <div>
          <small>วันที่นัดหมาย</small>
          <strong>
            {appointment?.date
              ? new Date(appointment.date + 'T12:00:00').toLocaleDateString('th-TH', {
                  dateStyle: 'long',
                })
              : 'วันพฤหัสบดีที่ 15 สิงหาคม 2567'}
          </strong>
        </div>
      </div>
      <div className="ticket-line max-[370px]:[&_strong]:text-sm!">
        <span className="round-icon mint inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7eeff] text-navy">
          <Clock size={20} />
        </span>
        <div>
          <small>ช่วงเวลาตรวจ</small>
          <strong className="green text-[#007a50]">
            {appointment?.time || '08:00 - 09:00 น. (รอบที่ 1)'}
          </strong>
        </div>
      </div>
      <div className="ticket-line max-[370px]:[&_strong]:text-sm!">
        <span className="round-icon inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7eeff] text-navy">
          <MapPin size={20} />
        </span>
        <div>
          <small>สถานที่ตรวจ</small>
          <p>
            ห้องตรวจ 1025
            <br />
            อาคารเฉลิมพระเกียรติ ชั้น 3
          </p>
        </div>
      </div>
      <div className="ticket-line doctor max-[370px]:[&_strong]:text-sm!">
        <span className="doctor-avatar">
          <Stethoscope size={34} />
        </span>
        <div>
          <strong>นพ.เกียรติภูมิ ภักดีดำรงค์</strong>
          <p className="blue text-[#0089ba]">อายุรกรรมทั่วไป</p>
          <small>★ 4.90</small>
        </div>
      </div>
      <dl className="ticket-patient max-[370px]:[&_dd]:ml-auto! max-[370px]:[&>div]:flex-wrap! max-[370px]:[&>div]:gap-0.5!">
        <div>
          <dt>ผู้เข้ารับบริการ:</dt>
          <dd>คุณ{patient.name}</dd>
        </div>
        <div>
          <dt>เลขประจำตัวผู้ป่วย (HN):</dt>
          <dd>{patient.hn}</dd>
        </div>
        <div>
          <dt>สิทธิการรักษา:</dt>
          <dd className="green text-[#007a50]">สิทธิหลักประกันสุขภาพ</dd>
        </div>
      </dl>
    </div>
  )
}
