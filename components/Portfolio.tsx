"use client"

import Link from 'next/link'

const projects = [
  {
    id: '1',
    title: 'Plataforma Fintech',
    category: 'Financeiro',
    description: 'Sistema de pagamentos com integração Stripe e carteira digital.',
    image: 'https://images.unsplash.com/photo-1556740738-9a6d0317a718?w=800&q=80',
  },
  {
    id: '2',
    title: 'E-commerce B2B',
    category: 'Varejo',
    description: 'Loja virtual para atacado com catálogo dinâmico e pedidos em lote.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
  },
  {
    id: '3',
    title: 'SaaS de Analytics',
    category: 'SaaS',
    description: 'Dashboard de métricas em tempo real com gráficos interativos.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Portfolio
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Projetos desenvolvidos com foco em performance, escalabilidade e experiência do usuário.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group rounded-lg overflow-hidden border border-white/5 bg-white/5 hover:border-brand/50 transition-all">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/portfolio/${project.id}`}
                    className="px-6 py-3 bg-brand text-black font-medium rounded hover:bg-brand/90 transition-colors"
                  >
                    Ver projeto
                  </Link>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs font-mono text-brand mb-2 block">{project.category}</span>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}