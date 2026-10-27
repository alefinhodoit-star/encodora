"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, Lock } from 'lucide-react'
import GoogleIcon from '@/components/GoogleIcon'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const success = await login(email, password)
      if (success) {
        router.push('/')
      }
    } catch (error) {
      console.error('Login failed', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth with proper server-side flow
    // For now, redirect to login with a demo account
    window.location.href = '/login?demo=true'
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Entrar</h1>
          <p className="text-gray-400 mt-2">Bem-vindo de volta à Encodora</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full" size="lg">
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-black px-2 text-gray-500">Ou continue com</span>
          </div>
        </div>

        <Button
          type="button"
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full"
        >
          <GoogleIcon className="h-4 w-4 mr-2" />
          Continuar com Google
        </Button>

        <p className="text-center text-sm text-gray-500">
          Não tem uma conta?{' '}
          <Link href="/register" className="text-brand hover:text-brand/80 font-medium">
            Cadastre-se
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500">
          <Link href="/forgot-password" className="text-brand hover:text-brand/80 font-medium">
            Esqueceu a senha?
          </Link>
        </p>
      </div>
    </div>
  )
}