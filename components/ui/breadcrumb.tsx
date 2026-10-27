"use client"

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

const Breadcrumb = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <nav
    className={cn('flex items-center space-x-2 text-sm', className)}
    aria-label="breadcrumb"
    {...props}
  />
)

const BreadcrumbList = ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className={cn('flex items-center space-x-2', className)} {...props} />
)

const BreadcrumbItem = ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
  <li className={cn('inline-flex items-center', className)} {...props} />
)

const BreadcrumbLink = ({ className, asChild, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }) => {
  if (asChild) {
    return <a className={cn('transition-colors hover:text-foreground', className)} {...props} />
  }
  return <a className={cn('transition-colors hover:text-foreground', className)} {...props} />
}

const BreadcrumbPage = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('font-normal text-muted-foreground', className)} {...props} />
)

const BreadcrumbSeparator = ({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement> & { children?: React.ReactNode }) => (
  <li className={cn('flex items-center', className)} {...props}>
    {children ?? <ChevronRight className="h-4 w-4" />}
  </li>
)

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}