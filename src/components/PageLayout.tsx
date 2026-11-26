import type { ReactNode } from 'react'
import { cn } from 'cn'

export default function PageLayout({
  title,
  children,
  className = '',
}: {
  title: string
  children: ReactNode
  className?: string
}) {
  const isHome = className === 'home-page'
  return (
    <main
      aria-label={title}
      className={cn(
        isHome
          ? 'home-page max-[370px]:px-3.5! desktop:mx-auto! desktop:grid! desktop:max-w-[1140px]! desktop:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)]! desktop:gap-5! desktop:pt-6!'
          : 'page-content max-[370px]:px-3! desktop:gap-6! desktop:pt-6! max-[370px]:[&_h2]:text-[17px]!',
        className === 'login-page' &&
          'desktop:grid! desktop:grid-cols-[1.05fr_1fr]! desktop:items-center!',
        className === 'registration-page' && 'desktop:[&_.form-card]:p-8!',
        className === 'profile-page' &&
          'desktop:grid! desktop:grid-cols-[320px_minmax(0,1fr)]! desktop:items-start! desktop:[&>.inline-notice]:col-span-full!',
        className === 'feedback-page' &&
          'desktop:[&_.rating-card]:col-start-1! desktop:[&_form]:grid-cols-2! desktop:[&_form]:gap-5! desktop:[&_form>.detail-card:nth-child(2)]:col-start-1! desktop:[&_form>.detail-card:nth-child(3)]:col-start-2! desktop:[&_form>.detail-card:nth-child(3)]:row-span-2! desktop:[&_form>.detail-card:nth-child(3)]:row-start-1! desktop:[&_form>.full-width]:col-span-full! desktop:[&_textarea]:min-h-[280px]!',
        className,
      )}
    >
      {children}
    </main>
  )
}
