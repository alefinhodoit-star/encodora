"use client"

import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuth } from '@/lib/AuthContext'

export default function AdminPage() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-8">
          Painel Administrativo
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg border border-white/5 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">Projetos</h3>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
          <div className="p-6 rounded-lg border border-white/5 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">Usuários</h3>
            <p className="text-2xl font-bold text-white">156</p>
          </div>
          <div className="p-6 rounded-lg border border-white/5 bg-white/5">
            <h3 className="text-lg font-semibold text-white mb-2">Receita</h3>
            <p className="text-2xl font-bold text-white">€45.000</p>
          </div>
        </div>
      </div>
    </div>
  )
}