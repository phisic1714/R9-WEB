import { useForm, useSelector } from '@tanstack/react-form'
import { FieldError } from '@/components/ui/field'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from 'cn'
import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Heart, Star, LockKeyhole, Check, Smile } from 'lucide-react'
import Card from '../components/Card'
import { useDemo } from '../lib/demo-context'
const defaultValues = {
  rating: 5,
  topics: ['การสื่อสารของแพทย์', 'ความสุภาพของเจ้าหน้าที่'],
  comment: '',
  anonymous: true,
}

export default function FeedbackPage() {
  const { feedback, setFeedback } = useDemo()
  const [sent, setSent] = useState(false)
  function validate({ value }: { value: typeof defaultValues }) {
    const fields: Partial<Record<keyof typeof defaultValues, string>> = {}
    if (!Number.isInteger(value.rating) || value.rating < 1 || value.rating > 5)
      fields.rating = 'กรุณาให้คะแนน 1–5 ดาว'
    if (value.comment.length > 500) fields.comment = 'ข้อเสนอแนะต้องไม่เกิน 500 ตัวอักษร'
    return Object.keys(fields).length ? { fields } : undefined
  }
  const form = useForm({
    defaultValues,
    validators: { onChange: validate, onSubmit: validate },
    onSubmit: ({ value }) => {
      setFeedback(value)
      setSent(true)
    },
  })
  const { rating, topics, comment } = useSelector(form.store, (state) => state.values)

  return (
    <>
      {sent || feedback ? (
        <Card className="success-panel">
          <Heart size={58} />
          <h2>ขอบคุณสำหรับความคิดเห็น</h2>
          <p>บันทึกแบบประเมินตัวอย่างแล้ว ยังไม่ได้ส่งข้อมูลให้โรงพยาบาล</p>
          <Button
            asChild
            variant="ghost"
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
          >
            <Link to="/">กลับหน้าหลัก</Link>
          </Button>
        </Card>
      ) : (
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            event.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <Card className="rating-card">
            <span className="round-icon mint inline-flex size-[34px] shrink-0 items-center justify-center rounded-full bg-[#e7eeff] text-navy">
              <Heart size={25} />
            </span>
            <h2>
              ท่านพึงพอใจการรับบริการในภาพรวม
              <br />
              ระดับใด?
            </h2>
            <p className="muted text-[13px] leading-[1.75] text-muted">
              แตะที่ดาวเพื่อให้คะแนนประสบการณ์วันนี้
            </p>
            <form.Field name="rating">
              {(field) => (
                <RadioGroup
                  value={String(field.state.value)}
                  onValueChange={(value) => field.handleChange(Number(value))}
                  onBlur={field.handleBlur}
                  className="rating-stars mx-auto my-[22px] flex max-w-[310px] justify-between gap-1 max-[370px]:[&_svg]:w-[30px]!"

                  aria-label="คะแนนความพึงพอใจ"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <RadioGroupItem
                      aria-label={`${value} ดาว`}
                      key={value}
                      value={String(value)}
                      className="size-11 rounded-md border-0 bg-transparent shadow-none"
                    >
                      <Star
                        size={36}
                        fill={value <= rating ? '#ffbd20' : 'none'}
                        color={value <= rating ? '#ffbd20' : '#c5d0dd'}
                      />
                    </RadioGroupItem>
                  ))}
                </RadioGroup>
              )}
            </form.Field>
            <Badge variant="secondary" className="rating-label">
              <Smile size={17} />
              {['', 'ควรปรับปรุง', 'พอใช้', 'ปานกลาง', 'ดี', 'ยอดเยี่ยมมาก'][rating]} ({rating}/5)
            </Badge>
          </Card>
          <Card className="detail-card min-[480px]:p-6!">
            <div className="card-title mb-4 flex items-center justify-between gap-3 max-[370px]:flex-wrap! max-[370px]:gap-1.5!">
              <h2>จุดเด่นที่ท่านประทับใจ</h2>
              <small>เลือกได้หลายข้อ</small>
            </div>
            <form.Field name="topics">
              {(field) => (
                <div className="feedback-topics flex flex-wrap gap-2">
                  {[
                    'ความรวดเร็วในการรอคอย',
                    'การสื่อสารของแพทย์',
                    'ความสุภาพของเจ้าหน้าที่',
                    'ความสะอาดและสถานที่',
                    'ระบบคิวดิจิทัล R9',
                    'การอธิบายวิธีใช้ยา',
                  ].map((topic) => (
                    <Button
                      variant="ghost"
                      type="button"
                      key={topic}
                      aria-pressed={topics.includes(topic)}
                      className={cn({ selected: topics.includes(topic) })}
                      onClick={() =>
                        field.handleChange(
                          topics.includes(topic)
                            ? topics.filter((item) => item !== topic)
                            : [...topics, topic],
                        )
                      }
                    >
                      {topics.includes(topic) && <Check size={15} />}
                      {topic}
                    </Button>
                  ))}
                </div>
              )}
            </form.Field>
          </Card>
          <Card className="detail-card min-[480px]:p-6!">
            <div className="card-title mb-4 flex items-center justify-between gap-3 max-[370px]:flex-wrap! max-[370px]:gap-1.5!">
              <h2>ข้อเสนอแนะเพิ่มเติม</h2>
              <small>{comment.length}/500</small>
            </div>
            <form.Field name="comment">
              {(field) => (
                <div>
                  <Textarea
                    aria-label="ข้อเสนอแนะเพิ่มเติม"
                    maxLength={500}
                    rows={5}
                    placeholder="แชร์ประสบการณ์ เช่น ระยะเวลาการรอคอย การให้บริการของเจ้าหน้าที่ หรือข้อเสนอแนะในการปรับปรุง…"
                    value={field.state.value}
                    onChange={(event) => field.handleChange(event.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={!field.state.meta.isValid}
                    name={field.name}
                  />
                  <FieldError
                    errors={field.state.meta.errors.map((error) =>
                      typeof error === 'string' ? { message: error } : error,
                    )}
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="anonymous">
              {(field) => (
                <Label
                  htmlFor="anonymous-feedback"
                  className="anonymous-option mt-3.5 flex items-center gap-2.5"
                >
                  <LockKeyhole size={25} />
                  <span>
                    <strong>ประเมินแบบไม่เปิดเผยตัวตน</strong>
                    <small>ซ่อนชื่อและเลขบัตรประชาชนของคุณ</small>
                  </span>
                  <Checkbox
                    id="anonymous-feedback"

                    checked={field.state.value}
                    onCheckedChange={(checked) => field.handleChange(checked === true)}
                    onBlur={field.handleBlur}
                    name={field.name}
                  />
                </Label>
              )}
            </form.Field>
          </Card>
          <Button
            variant="ghost"
            className="primary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            type="submit"
          >
            <Check size={23} />
            ส่งแบบประเมินตัวอย่าง
          </Button>
          <Button
            asChild
            variant="ghost"
            className="secondary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
          >
            <Link to="/">ข้ามขั้นตอนนี้</Link>
          </Button>
        </form>
      )}
    </>
  )
}
