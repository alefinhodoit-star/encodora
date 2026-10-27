import Link from 'next/link'

export default function PageNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg text-gray-400 mb-8">Página não encontrada</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-black font-medium rounded hover:bg-brand/90 transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}