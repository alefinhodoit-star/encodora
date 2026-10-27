"use client"

import * as React from 'react'
import * as Slot from '@radix-ui/react-slot'
import { Controller, ControllerProps, FieldPath, FieldValues, FormProvider, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'

const Form = FormProvider

type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

const FormField = <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
  { ...props }: ControllerProps<TFieldValues, TName>
) => {
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <FormFieldContext.Provider value={{ name: field.name }}>
          {props.children}
        </FormFieldContext.Provider>
      )}
    />
  )
}

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('space-y-2', className)} {...props} />
  )
)
FormItem.displayName = 'FormItem'

const FormLabel = ({ className, ...props }: React.ComponentProps<typeof Label>) => {
  const context = React.useContext(FormFieldContext)
  if (!context) throw new Error('FormLabel must be used within FormField')
  return <Label {...props} className={cn('', className)} />
}

const FormControl = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(FormFieldContext)
    if (!context) throw new Error('FormControl must be used within FormField')
    return <div ref={ref} className={cn('', className)} {...props} />
  }
)
FormControl.displayName = 'FormControl'

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const context = React.useContext(FormFieldContext)
    if (!context) throw new Error('FormDescription must be used within FormField')
    return <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  }
)
FormDescription.displayName = 'FormDescription'

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(FormFieldContext)
    const [message] = React.useState(() => {
      if (!context) return children
      return children
    })
    if (!message) return null
    return <p ref={ref} className={cn('text-sm text-destructive', className)} {...props}>{message}</p>
  }
)
FormMessage.displayName = 'FormMessage'

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormContext,
  Controller,
}