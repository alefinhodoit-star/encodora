"use client"

import { useAuth } from '@/lib/AuthContext'
import { useEffect } from 'react'

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isLoadingAuth, authChecked, navigateToLogin } = useAuth()

  useEffect(() => {
    if (authChecked && !isLoadingAuth) {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token')
        if (token) {
          navigateToLogin()
        }
      }
    }
  }, [authChecked, isLoadingAuth, navigateToLogin])

  if (!authChecked || isLoadingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="w-8 h-8 border-4 border-white/20 border-t-brand rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}