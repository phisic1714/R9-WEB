export default function FormField({ label, children, required = false, className = '' }) {
  return (
    <label
      className={`form-field flex flex-col gap-[7px] text-[13px] text-[#49566a] [&_input]:min-h-[46px] [&_input]:w-full [&_input]:min-w-0 [&_input]:rounded-lg [&_input]:border [&_input]:border-[#d8e2eb] [&_input]:bg-[#f8fafc] [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-sm [&_select]:min-h-[46px] [&_select]:w-full [&_select]:min-w-0 [&_select]:rounded-lg [&_select]:border [&_select]:border-[#d8e2eb] [&_select]:bg-[#f8fafc] [&_select]:px-3 [&_select]:py-2.5 [&_select]:text-sm ${className}`}
    >
      <span>
        {label}
        {required && <span className="required text-[#cf3846]"> *</span>}
      </span>
      {children}
    </label>
  )
}
