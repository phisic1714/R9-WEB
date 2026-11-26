import type { ComponentProps } from 'react'
import { cn } from 'cn'
import { Card as ShadcnCard } from './ui/card'

export default function Card({
  children,
  className = '',
  ...props
}: ComponentProps<typeof ShadcnCard>) {
  return (
    <ShadcnCard
      className={cn(
        'card block flex-row gap-0 rounded-[20px] border border-outline bg-white p-0 shadow-none',
        className,
      )}
      {...props}
    >
      {children}
    </ShadcnCard>
  )
}
