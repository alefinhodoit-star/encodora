import Portfolio from '@/components/Portfolio'

export default function PortfolioPage() {
  return (
    <section className="py-20 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Portfolio
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Projetos desenvolvidos com foco em performance, escalabilidade e experiência do usuário.
          </p>
        </div>
        <Portfolio />
      </div>
    </section>
  )
}