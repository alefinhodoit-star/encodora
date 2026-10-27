"use client"

import { useEffect } from 'react'
import { useAuth } from '@/lib/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  unauthenticatedElement?: React.ReactNode
}

export default function ProtectedRoute({
  children,
  fallback = <div className="flex min-h-screen items-center justify-center">Carregando...</div>,
  unauthenticatedElement = <div className="flex min-h-screen items-center justify-center">Acesso não autorizado</div>,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoadingAuth, authChecked } = useAuth()

  useEffect(() => {
    // Auth check is handled by the provider fetching from API
  }, [])

  if (isLoadingAuth || !authChecked) {
    return <>{fallback}</>
  }

  if (!isAuthenticated) {
    return <>{unauthenticatedElement}</>
  }

  return <>{children}</>
}