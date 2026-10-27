"use client"

import Link from 'next/link'
import { useLocale } from '@/lib/LocaleContext'
import { ArrowRight, Code2, Layers, Zap } from 'lucide-react'

export default function Hero() {
  const { t } = useLocale()

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 neural-grid-fine pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-brand mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" /> Online desde 2024
        </div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
          Engenharia de Software<br />
          <span className="text-brand">de Precisão</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Arquitetura backend, frontend, mobile, cloud/DevOps e IA — sistemas de precisão à escala global.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contacto"
            className="px-8 py-4 bg-brand text-black font-semibold rounded-lg hover:bg-brand/90 transition-colors flex items-center justify-center gap-2"
          >
            Começar projeto <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/servicos"
            className="px-8 py-4 border border-white/10 text-white rounded-lg hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
          >
            Nossos serviços <Code2 className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-16 flex items-center justify-center gap-8 opacity-50">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Layers className="h-4 w-4" />
            <span>Arquitetura escalável</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Zap className="h-4 w-4" />
            <span>Deploy em minutos</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Code2 className="h-4 w-4" />
            <span>Código limpo</span>
          </div>
        </div>
      </div>
    </section>
  )
}