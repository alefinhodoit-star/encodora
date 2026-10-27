"use client"

import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const googleIconVariants = cva('', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export interface GoogleIconProps extends React.SVGProps<SVGSVGElement> {}

export default function GoogleIcon({ className, ...props }: GoogleIconProps) {
  return (
    <svg
      className={cn('w-5 h-5', className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#EA4335"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-5.94-4.56h-3.58v2.77c2.08 1.92 4.74 3.28 8.09 3.28zM12 1.25C7.98 1.25 4.7 3.07 2.88 5.66l3.57 2.77c.98-.66 2.23-1.06 3.71-1.06 2.86 0 5.29 1.93 5.94 4.56h3.58V5.66c-2.08-1.92-4.74-3.28-8.09-3.28 2.86 0 5.29 1.93 5.94 4.56"
      />
      <path
        fill="#FBBC05"
        d="M12 23c-3.35 0-6.35-1.36-8.49-3.6l3.57-2.77c.65.86 1.53 1.36 2.49 1.36 1.04 0 2.13-.27 3.01-.84l1.42 2.37c-1.94 1.48-4.47 2.37-7.28 2.37-2.86 0-5.29 1.93-5.94 4.56h3.58v2.77c2.08 1.92 4.74 3.28 8.09 3.28zM2.88 5.66c1.34 2.63 3.76 4.56 6.59 4.56 1.04 0 2.13-.27 3.01-.84l1.42-2.37c-1.94-1.48-4.47-2.37-7.28-2.37-2.86 0-5.29 1.93-5.94 4.56h3.58v2.77c2.08 1.92 4.74 3.28 8.09 3.28 2.86 0 5.29 1.93 5.94 4.56z"
      />
    </svg>
  )
}