'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { AuthProvider } from '@/lib/AuthContext'
import { LocaleProvider } from '@/lib/LocaleContext'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LocaleProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClientInstance}>
            {children}
            <Toaster />
          </QueryClientProvider>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}