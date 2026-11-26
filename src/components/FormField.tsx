import type { ReactElement, ReactNode } from 'react'
import { cloneElement, useId } from 'react'
import { cn } from 'cn'
import { Field, FieldLabel, FieldError } from './ui/field'

export default function FormField({
  label,
  children,
  required = false,
  errors = [],
  className = '',
}: {
  label: ReactNode
  children: ReactElement<{ id?: string; 'aria-invalid'?: boolean; 'aria-describedby'?: string }>
  required?: boolean
  errors?: Array<string | { message?: string } | undefined>
  className?: string
}) {
  const generatedId = useId()
  const id = children.props.id || generatedId
  const invalid = errors.length > 0
  return (
    <Field
      data-invalid={invalid}
      className={cn('form-field flex flex-col gap-[7px] text-[13px] text-[#49566a]', className)}
    >
      <FieldLabel htmlFor={id} className="gap-0 text-[13px] leading-normal font-normal">
        {label}
        {required && <span className="required text-destructive"> *</span>}
      </FieldLabel>
      {cloneElement(children, {
        id,
        'aria-invalid': invalid,
        'aria-describedby': invalid ? `${id}-error` : children.props['aria-describedby'],
      })}
      {invalid && (
        <FieldError
          id={`${id}-error`}
          errors={errors.map((error) => (typeof error === 'string' ? { message: error } : error))}
        />
      )}
    </Field>
  )
}
