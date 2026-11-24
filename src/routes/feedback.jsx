import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Heart, Star, LockKeyhole, Check, Smile } from 'lucide-react'
import PageLayout from '../components/PageLayout'
import Card from '../components/Card'
import { useDemo } from '../lib/demo-context'
export const Route = createFileRoute('/feedback')({
  staticData: { title: 'แบบประเมินการรับบริการ' },
  component: FeedbackPage,
})

function FeedbackPage() {
  const { feedback, setFeedback } = useDemo()
  const [rating, setRating] = useState(5)
  const [topics, setTopics] = useState(['การสื่อสารของแพทย์', 'ความสุภาพของเจ้าหน้าที่'])
  const [comment, setComment] = useState('')
  const [anonymous, setAnonymous] = useState(true)
  const [sent, setSent] = useState(false)
  return (
    <PageLayout title="แบบประเมินการรับบริการ" className="feedback-page">
      {sent || feedback ? (
        <Card className="success-panel">
          <Heart size={58} />
          <h2>ขอบคุณสำหรับความคิดเห็น</h2>
          <p>บันทึกแบบประเมินตัวอย่างแล้ว ยังไม่ได้ส่งข้อมูลให้โรงพยาบาล</p>
          <Link
            className="primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            to="/"
          >
            กลับหน้าหลัก
          </Link>
        </Card>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setFeedback({ rating, topics, comment, anonymous })
            setSent(true)
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
            <div
              className="rating-stars mx-auto my-[22px] flex max-w-[310px] justify-between gap-1"
              role="radiogroup"
              aria-label="คะแนนความพึงพอใจ"
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  role="radio"
                  aria-checked={value === rating}
                  aria-label={`${value} ดาว`}
                  key={value}
                  onClick={() => setRating(value)}
                >
                  <Star
                    size={36}
                    fill={value <= rating ? '#ffbd20' : 'none'}
                    color={value <= rating ? '#ffbd20' : '#c5d0dd'}
                  />
                </button>
              ))}
            </div>
            <span className="rating-label">
              <Smile size={17} />
              {['', 'ควรปรับปรุง', 'พอใช้', 'ปานกลาง', 'ดี', 'ยอดเยี่ยมมาก'][rating]} ({rating}/5)
            </span>
          </Card>
          <Card className="detail-card">
            <div className="card-title mb-4 flex items-center justify-between gap-3">
              <h2>จุดเด่นที่ท่านประทับใจ</h2>
              <small>เลือกได้หลายข้อ</small>
            </div>
            <div className="feedback-topics flex flex-wrap gap-2">
              {[
                'ความรวดเร็วในการรอคอย',
                'การสื่อสารของแพทย์',
                'ความสุภาพของเจ้าหน้าที่',
                'ความสะอาดและสถานที่',
                'ระบบคิวดิจิทัล R9',
                'การอธิบายวิธีใช้ยา',
              ].map((topic) => (
                <button
                  type="button"
                  key={topic}
                  aria-pressed={topics.includes(topic)}
                  className={topics.includes(topic) ? 'selected' : ''}
                  onClick={() =>
                    setTopics(
                      topics.includes(topic)
                        ? topics.filter((item) => item !== topic)
                        : [...topics, topic],
                    )
                  }
                >
                  {topics.includes(topic) && <Check size={15} />}
                  {topic}
                </button>
              ))}
            </div>
          </Card>
          <Card className="detail-card">
            <div className="card-title mb-4 flex items-center justify-between gap-3">
              <h2>ข้อเสนอแนะเพิ่มเติม</h2>
              <small>{comment.length}/500</small>
            </div>
            <textarea
              aria-label="ข้อเสนอแนะเพิ่มเติม"
              maxLength={500}
              rows={5}
              placeholder="แชร์ประสบการณ์ เช่น ระยะเวลาการรอคอย การให้บริการของเจ้าหน้าที่ หรือข้อเสนอแนะในการปรับปรุง…"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <label className="anonymous-option mt-3.5 flex items-center gap-2.5">
              <LockKeyhole size={25} />
              <span>
                <strong>ประเมินแบบไม่เปิดเผยตัวตน</strong>
                <small>ซ่อนชื่อและเลขบัตรประชาชนของคุณ</small>
              </span>
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(event) => setAnonymous(event.target.checked)}
              />
            </label>
          </Card>
          <button
            className="primary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark"
            type="submit"
          >
            <Check size={23} />
            ส่งแบบประเมินตัวอย่าง
          </button>
          <Link
            className="secondary-button full-width mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#b6c8de] bg-white px-[18px] py-[9px] text-[#078969] no-underline hover:bg-[#f0faf7]"
            to="/"
          >
            ข้ามขั้นตอนนี้
          </Link>
        </form>
      )}
    </PageLayout>
  )
}
