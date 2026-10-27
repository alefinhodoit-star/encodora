"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

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
  logout: (shouldRedirect?: boolean) => Promise<void>
  navigateToLogin: () => void
  checkUserAuth: () => Promise<void>
  checkAppState: () => Promise<void>
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<boolean>
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
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        if (data.authenticated && data.user) {
          setUser(data.user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
      setIsLoadingAuth(false)
      setAuthChecked(true)
    } catch (error) {
      setIsLoadingAuth(false)
      setIsAuthenticated(false)
      setAuthChecked(true)
    }
  }

  const getCsrfToken = (): string => {
    if (typeof document === 'undefined') return ''
    const match = document.cookie.match(/(?:^|; )csrf_token=([^;]*)/)
    return match ? decodeURIComponent(match[1]) : ''
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoadingAuth(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      return false
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string): Promise<boolean> => {
    setIsLoadingAuth(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setIsAuthenticated(true)
        return true
      }
      return false
    } catch (error) {
      return false
    } finally {
      setIsLoadingAuth(false)
    }
  }

  const logout = async (shouldRedirect = true) => {
    try {
      const csrfToken = getCsrfToken()
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': csrfToken,
        },
      })
    } catch (error) {
      console.error('Logout failed', error)
    }
    setUser(null)
    setIsAuthenticated(false)
    if (shouldRedirect) {
      window.location.href = '/login'
    }
  }

  const navigateToLogin = () => {
    window.location.href = '/login'
  }

  // Initialize auth check on mount
  useEffect(() => {
    checkUserAuth()
  }, [])

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
        login,
        register,
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