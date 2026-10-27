"use client"

import { cn } from '@/lib/utils'
import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
  asChildType?: React.ElementType
}

const variants = {
  default: 'bg-brand text-brand-foreground hover:bg-brand/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-border hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'underline-offset-4 hover:underline text-primary',
}

export function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ButtonProps) {
  const VariantClass = variants[variant] || variants.default
  const SizeClass = {
    default: '',
    sm: 'h-8 rounded text-xs py-1',
    lg: 'h-10 rounded text-lg py-2',
    icon: 'h-10 w-10',
  }[size] || ''

  if (asChild) {
    const Element = props.asChildType || 'button'
    return <Element className={cn(VariantClass, SizeClass, className)} {...props} />
  }

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center',
        VariantClass,
        SizeClass,
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      {...props}
    />
  )
}