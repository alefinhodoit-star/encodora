interface ProjectDetailProps {
  params: { id: string }
}

const projects: Record<string, { title: string; category: string; description: string; image: string; details: string[] }> = {
  '1': {
    title: 'Plataforma Fintech',
    category: 'Financeiro',
    description: 'Sistema de pagamentos com integração Stripe e carteira digital.',
    image: 'https://images.unsplash.com/photo-1556740738-9a6d0317a718?w=1200&q=80',
    details: ['Integração com Stripe', 'Carteira digital', 'KYC/AML', 'Relatórios financeiros'],
  },
  '2': {
    title: 'E-commerce B2B',
    category: 'Varejo',
    description: 'Loja virtual para atacado com catálogo dinâmico e pedidos em lote.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=80',
    details: ['Catálogo dinâmico', 'Pedidos em lote', 'Preços por cliente', 'Integração ERP'],
  },
  '3': {
    title: 'SaaS de Analytics',
    category: 'SaaS',
    description: 'Dashboard de métricas em tempo real com gráficos interativos.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    details: ['Métricas em tempo real', 'Gráficos interativos', 'Exportação de dados', 'Alertas personalizados'],
  },
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const project = projects[params.id]

  if (!project) {
    return null
  }

  return (
    <article className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
          <span className="text-xs font-mono text-brand mb-2 block">{project.category}</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            {project.title}
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            {project.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Detalhes do projeto</h3>
            <ul className="space-y-3">
              {project.details.map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  )
}