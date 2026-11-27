import type { ReactNode } from 'react'
import { useRef } from 'react'
import { cn } from 'cn'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'

export type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export default function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  size = 'md',
}: ModalProps) {
  const opener = useRef<HTMLElement | null>(null)
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl border-outline text-ink',
          {
            sm: 'max-w-sm sm:max-w-sm',
            md: 'max-w-xl sm:max-w-xl',
            lg: 'max-w-4xl sm:max-w-4xl',
            xl: 'max-w-6xl sm:max-w-6xl',
          }[size],
          className,
        )}
        onOpenAutoFocus={() => {
          opener.current =
            document.activeElement instanceof HTMLElement ? document.activeElement : null
        }}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          if (opener.current?.isConnected) opener.current.focus()
        }}
        {...(!description ? { 'aria-describedby': undefined } : {})}
      >
        <DialogHeader className="pr-7 text-left">
          <DialogTitle className="leading-relaxed">{title}</DialogTitle>
          {description && (
            <DialogDescription className="leading-relaxed">{description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="min-w-0 text-sm leading-7 wrap-break-word text-muted">{children}</div>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}
