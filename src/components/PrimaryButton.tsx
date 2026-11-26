import type { ComponentProps } from 'react'
import { cn } from 'cn'
import { Button } from './ui/button'

export default function PrimaryButton({
  children,
  className = '',
  ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      className={cn(
        'primary-button min-h-11 gap-2.5 rounded-full px-[23px] py-2 text-base font-medium',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}
