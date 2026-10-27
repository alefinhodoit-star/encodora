"use client"

const testimonials = [
  {
    name: 'Carlos Silva',
    role: 'CTO, TechStartup',
    content: 'A Encodora entregou nossa plataforma em tempo recorde, com qualidade excepcional.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
  },
  {
    name: 'Ana Costa',
    role: 'CEO, LojaOnline',
    content: 'O e-commerce B2B superou nossas expectativas. Vendas aumentaram 40% no primeiro mês.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
  },
  {
    name: 'João Mendes',
    role: 'Fundador, DataCorp',
    content: 'Arquitetura sólida e código limpo. Nossa equipe de devs adorou trabalhar com o código entregue.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Confiança construída projeto após projeto.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.name} className="p-8 rounded-lg border border-white/5 bg-white/5">
              <div className="flex items-center gap-4 mb-6">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed italic">
                "{t.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}