"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
  image?: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoadingAuth: boolean
  isLoadingPublicSettings: boolean
  authError: { type: string; message: string } | null
  appPublicSettings: Record<string, unknown> | null
  authChecked: boolean
  logout: (shouldRedirect?: boolean) => void
  navigateToLogin: () => void
  checkUserAuth: () => Promise<void>
  checkAppState: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoadingAuth, setIsLoadingAuth] = useState(false)
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false)
  const [authError, setAuthError] = useState<AuthContextType['authError']>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const [appPublicSettings, setAppPublicSettings] = useState<AuthContextType['appPublicSettings']>(null)

  const checkAppState = async () => {
    setIsLoadingPublicSettings(true)
    setAuthError(null)
    try {
      setAppPublicSettings({ id: 'encodora', public_settings: {} })
      setIsLoadingPublicSettings(false)
    } catch (error) {
      setAuthError({
        type: 'unknown',
        message: 'Failed to load app',
      })
      setIsLoadingPublicSettings(false)
    }
  }

  const checkUserAuth = async () => {
    setIsLoadingAuth(true)
    try {
      const token = localStorage.getItem('auth_token')
      if (token) {
        const storedUser = localStorage.getItem('auth_user')
        if (storedUser) {
          setUser(JSON.parse(storedUser))
          setIsAuthenticated(true)
        }
      }
      setIsLoadingAuth(false)
      setAuthChecked(true)
    } catch (error) {
      setIsLoadingAuth(false)
      setIsAuthenticated(false)
      setAuthChecked(true)
    }
  }

  const logout = (shouldRedirect = true) => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    if (shouldRedirect) {
      window.location.href = '/login'
    }
  }

  const navigateToLogin = () => {
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingAuth,
        isLoadingPublicSettings,
        authError,
        appPublicSettings,
        authChecked,
        logout,
        navigateToLogin,
        checkUserAuth,
        checkAppState,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}