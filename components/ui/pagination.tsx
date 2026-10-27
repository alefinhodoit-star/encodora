"use client"

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  className?: string
  items?: React.ReactNode
}

const Pagination = ({ className, items }: PaginationProps) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('flex w-full justify-center', className)}
  >
    <ul className="flex items-center space-x-1">{items}</ul>
  </nav>
)

interface PaginationItemProps extends React.HTMLAttributes<HTMLLIElement> {}

const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('', className)} {...props} />
  )
)
PaginationItem.displayName = 'PaginationItem'

interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
}

const PaginationLink = ({
  className,
  isActive,
  children,
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      'flex h-9 w-9 items-center justify-center rounded-md border border-border bg-white text-muted-foreground hover:border-transparent hover:bg-primary hover:text-primary-foreground focus:border-transparent focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:bg-primary/90 disabled:pointer-events-none disabled:opacity-50',
      isActive && 'bg-primary text-primary-foreground',
      className
    )}
    {...props}
  >
    {children}
  </a>
)

interface PaginationPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PaginationPrevious = React.forwardRef<HTMLButtonElement, PaginationPreviousProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'gap-1 inline-flex h-9 items-center rounded-md border border-border bg-white px-4 py-1 text-sm font-medium hover:border-transparent hover:bg-primary hover:text-primary-foreground focus:border-transparent focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:bg-primary/90 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Previous</span>
    </button>
  )
)
PaginationPrevious.displayName = 'PaginationPrevious'

interface PaginationNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PaginationNext = React.forwardRef<HTMLButtonElement, PaginationNextProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'gap-1 inline-flex h-9 items-center rounded-md border border-border bg-white px-4 py-1 text-sm font-medium hover:border-transparent hover:bg-primary hover:text-primary-foreground focus:border-transparent focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:bg-primary/90 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    >
      <span>Next</span>
      <ChevronRight className="h-4 w-4" />
    </button>
  )
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    aria-hidden="true"
    className={cn('flex h-9 items-center justify-center', className)}
    {...props}
  >
    ...
  </span>
)

export {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}