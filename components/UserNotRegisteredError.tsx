"use client"

import Link from 'next/link'

export default function UserNotRegisteredError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6 text-center">
      <div className="max-w-md">
        <h1 className="text-3xl font-bold mb-4">Usuário não registrado</h1>
        <p className="text-gray-400 mb-8">
          Esta conta não está registrada para acessar esta aplicação. Entre em contato com o administrador.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-black font-medium rounded hover:bg-brand/90 transition-colors"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  )
}