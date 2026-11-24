export default function PageLayout({ title, children, className = '' }) {
  return (
    <main className={`page-content ${className}`} aria-label={title}>
      <div className="demo-note">โหมดตัวอย่าง · ยังไม่เชื่อมต่อข้อมูลโรงพยาบาล</div>
      {children}
    </main>
  )
}
