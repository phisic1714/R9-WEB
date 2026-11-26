import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { MapPin, QrCode, Clock, Pill, TriangleAlert, Check, ReceiptText } from 'lucide-react'
import Card from '../components/Card'
import ServiceSteps from '../components/ServiceSteps'
import AppointmentTicket from './appointments/components/AppointmentTicket'
export default function ServicePage() {
  const [step, setStep] = useState(0)
  return (
    <>
      <div className="service-layout grid gap-2.5 desktop:grid-cols-[300px_minmax(0,1fr)]! desktop:items-start! desktop:gap-6! desktop:[&>aside]:sticky! desktop:[&>aside]:top-[104px]!">
        <aside>
          <ServiceSteps step={step} onChange={setStep} />
          <p className="muted simulation-label text-[13px] leading-[1.75] text-muted">
            แตะขั้นตอนเพื่อดูตัวอย่างสถานะ
          </p>
        </aside>
        <div className="service-detail flex flex-col gap-3.5 desktop:[&>.detail-card]:p-7!">
          {step === 0 && (
            <Card className="detail-card min-[480px]:p-6!">
              <h2>จุดเช็กอินและตู้ Kiosk ที่เปิดบริการ</h2>
              <div className="checkin-point">
                <strong>จุดที่ 1: โถงประชาสัมพันธ์ ชั้น 1</strong>
                <p>อาคารเฉลิมพระเกียรติ (ใกล้ประตูทางเข้าหลัก)</p>
                <small className="green text-[#007a50]">Kiosk 6 เครื่อง</small>
              </div>
              <div className="checkin-point">
                <strong>จุดที่ 2: เคาน์เตอร์เวชระเบียน</strong>
                <p>ชั้น 1 อาคารอำนวยการ (สำหรับผู้ไม่มีบัตรประชาชน)</p>
                <small className="green text-[#007a50]">เจ้าหน้าที่บริการ</small>
              </div>
              <div className="hospital-map">
                <MapPin size={40} />
                <strong>โรงพยาบาลมหาราชนครราชสีมา</strong>
                <span>แผนที่และตำแหน่งจุดบริการ</span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=โรงพยาบาลมหาราชนครราชสีมา"
                  target="_blank"
                  rel="noreferrer"
                >
                  เปิดแผนที่จริง ›
                </a>
              </div>
              <AppointmentTicket />
              <div className="ticket-divider">รอยปรุ / TEAR HERE</div>
              <div className="qr-preview">
                <strong>QR Code ของคุณ</strong>
                <QrCode size={168} strokeWidth={1.2} />
                <p>ตัวอย่าง QR เท่านั้น · ไม่ใช่คิวรับบริการจริง</p>
                <small>
                  ในระบบจริงใช้สแกนเช็กอินที่ตู้ Kiosk
                  <br />
                  หรือแสดงต่อเจ้าหน้าที่คัดกรอง
                </small>
              </div>
              <Button
                variant="ghost"
                className="secondary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
                onClick={() => setStep(1)}
              >
                ดูสถานะรอคิวเข้าตรวจ
              </Button>
            </Card>
          )}
          {step === 1 && (
            <Card className="detail-card min-[480px]:p-6!">
              <div className="queue-wait">
                <small>รออีก</small>
                <strong>
                  3 <small>คิว</small>
                </strong>
              </div>
              <div className="queue-grid my-2.5 grid grid-cols-2 gap-3">
                <div>
                  <small>คิวที่เรียก</small>
                  <strong className="blue text-[#0089ba]">OPD-0010</strong>
                </div>
                <div>
                  <small>คิวก่อนหน้านี้</small>
                  <strong>OPD-0009</strong>
                </div>
              </div>
              <AppointmentTicket queue="OPD-0010" />
              <Button
                variant="ghost"
                className="primary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
                onClick={() => setStep(2)}
              >
                ดูขั้นตอนชำระเงิน
              </Button>
            </Card>
          )}
          {step === 2 && (
            <>
              <Card className="detail-card min-[480px]:p-6!">
                <div className="card-title mb-4 flex items-center justify-between gap-3 max-[370px]:flex-wrap! max-[370px]:gap-1.5!">
                  <h2>
                    <ReceiptText size={22} />
                    สรุปรายการค่าใช้จ่าย
                  </h2>
                  <small>ตัวอย่างใบแจ้งหนี้</small>
                </div>
                <div className="expense-row">
                  <div>
                    ค่าบริการทางการแพทย์และตรวจรักษา
                    <small className="green text-[#007a50]">เบิกได้ตามสิทธิ 350.00 บาท</small>
                  </div>
                  <div>
                    <del>350.00</del>
                    <strong className="green text-[#007a50]">0.00</strong>
                  </div>
                </div>
                <div className="expense-row">
                  <div>
                    ค่ายาในบัญชียาหลักแห่งชาติ (4 รายการ)
                    <small className="green text-[#007a50]">เบิกได้ตามสิทธิ 820.00 บาท</small>
                  </div>
                  <div>
                    <del>820.00</del>
                    <strong className="green text-[#007a50]">0.00</strong>
                  </div>
                </div>
                <div className="expense-row">
                  <div>
                    ค่ายานอกบัญชียาหลัก / เวชภัณฑ์พิเศษ
                    <small>ยานวดบรรเทาปวดสูตรพิเศษ 1 หลอด</small>
                  </div>
                  <strong>฿50.00</strong>
                </div>
                <div className="expense-row">
                  <div>
                    ค่าธรรมเนียมบริการผู้ป่วยนอก (OPD)
                    <small className="green text-[#007a50]">ยกเว้นตามเกณฑ์บริการ</small>
                  </div>
                  <span>0.00</span>
                </div>
                <div className="payment-total">
                  <small>ยอดเงินที่ต้องชำระสุทธิ</small>
                  <strong>฿50.00</strong>
                  <small>(ห้าสิบบาทถ้วน)</small>
                </div>
              </Card>
              <Card className="detail-card min-[480px]:p-6!">
                <h2>ชำระเงินสดหรือบัตรเครดิตที่เคาน์เตอร์</h2>
                <p className="muted text-[13px] leading-[1.75] text-muted">
                  สามารถนำคิวนี้ไปชำระได้ทันที ไม่ต้องกดบัตรคิวใหม่
                </p>
                <div className="info-box flex flex-wrap items-center gap-2 rounded-[9px] bg-[#edf2ff] p-3.5 text-[13px] leading-[1.7]">
                  <MapPin size={20} />
                  เคาน์เตอร์การเงินช่อง 8 · ชั้น 1 อาคารเฉลิมพระเกียรติ
                </div>
                <Button
                  variant="ghost"
                  className="primary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
                  onClick={() => setStep(3)}
                >
                  ดูขั้นตอนรับยา
                </Button>
              </Card>
            </>
          )}
          {step === 3 && (
            <>
              <Card className="detail-card min-[480px]:p-6!">
                <div className="dispensing-status">
                  <div>
                    <small>ช่องจ่ายยา</small>
                    <strong>ช่อง 4</strong>
                  </div>
                  <div>
                    <small>ความคืบหน้าการจัดเตรียมยา</small>
                    <strong className="green text-[#007a50]">3/4 รายการ (กำลังบรรจุ)</strong>
                    <Progress value={75} aria-label="ความคืบหน้าการจัดเตรียมยา" />
                  </div>
                </div>
                <div className="prescription-number max-[370px]:p-3! max-[370px]:[&_strong]:text-[29px]!">
                  <div>
                    <small>หมายเลขคิวยา</small>
                    <strong>Rx-042</strong>
                  </div>
                  <span>
                    <Clock size={17} /> ~8–12 นาที
                    <small>เวลาโดยประมาณ (ตัวอย่าง)</small>
                  </span>
                </div>
              </Card>
              <Card className="detail-card min-[480px]:p-6!">
                <h2>รายการยาที่ได้รับ (4 รายการ)</h2>
                <p className="muted text-[13px] leading-[1.75] text-muted">
                  ตัวอย่างหน้าจอใบสั่งยา · ไม่ใช่คำแนะนำการใช้ยา
                </p>
                <div className="medicine-list mt-3.5 grid gap-3 desktop:grid-cols-2!">
                  {[
                    {
                      name: 'Amlodipine 5 mg',
                      type: 'ยาลดความดันโลหิต',
                      time: 'หลังอาหารเช้า',
                      note: 'สังเกตอาการบวมบริเวณข้อเท้า หากเวียนศีรษะให้รีบนั่งพัก',
                    },
                    {
                      name: 'Losartan 50 mg',
                      type: 'ยาลดความดันโลหิต',
                      time: 'หลังอาหารเช้า',
                      note: 'ทานยาให้ตรงเวลาสม่ำเสมอทุกวัน ไม่ควรหยุดยาเอง',
                    },
                    {
                      name: 'Atorvastatin 20 mg',
                      type: 'ยาลดไขมันในเลือด',
                      time: 'ก่อนนอน',
                      note: 'หากมีอาการปวดเมื่อยกล้ามเนื้อผิดปกติอย่างรุนแรง ควรแจ้งแพทย์',
                    },
                    {
                      name: 'Vitamin B Complex',
                      type: 'วิตามินบำรุงปลายประสาท',
                      time: 'หลังอาหารเช้า',
                      note: 'ปัสสาวะอาจมีสีเหลืองเข้มขึ้น เป็นปฏิกิริยาปกติของวิตามินบี',
                    },
                  ].map((drug, index) => (
                    <article className="medicine-card" key={drug.name}>
                      <div className="medicine-title max-[370px]:flex-wrap! max-[370px]:[&_.tag]:ml-auto!">
                        <span className="round-icon inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7eeff] text-navy">
                          <Pill size={22} />
                        </span>
                        <div>
                          <strong>
                            {index + 1}. {drug.name}
                          </strong>
                          <p className="muted text-[13px] leading-[1.75] text-muted">{drug.type}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="tag inline-block rounded-xl bg-[#e0eaff] px-[9px] py-[3px] text-[11px]"
                        >
                          30 เม็ด
                        </Badge>
                      </div>
                      <div className="medicine-instruction">
                        <strong className="green text-[#007a50]">
                          <Clock size={15} />
                          รับประทานวันละ 1 เม็ด {drug.time}
                        </strong>
                        <small>
                          <TriangleAlert size={14} />
                          {drug.note}
                        </small>
                      </div>
                    </article>
                  ))}
                </div>
              </Card>
              <Button
                asChild
                variant="ghost"
                className="primary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
              >
                <Link to="/feedback">
                  <Check size={20} />
                  ประเมินการรับบริการ
                </Link>
              </Button>
            </>
          )}
          <div className="service-bottom">
            <Link to="/appointments">กลับไปนัดหมาย</Link>
            {step < 3 && (
              <Button
                variant="ghost"
                className="text-button min-h-10 border-0 bg-transparent px-0 py-1 font-semibold whitespace-nowrap text-[#007b50]"
                onClick={() => setStep(step + 1)}
              >
                ขั้นตอนถัดไป ›
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
