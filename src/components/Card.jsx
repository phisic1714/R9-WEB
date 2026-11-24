export default function Card({ children, className = '', ...props }) {
  return (
    <section
      className={`card rounded-[20px] border border-outline bg-white ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}
