export default function PrimaryButton({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      className={`primary-button inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full border-0 bg-primary px-[23px] py-2 text-center text-base font-medium text-white no-underline hover:bg-primary-dark ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
