"use client"

export default function Process() {
  const steps = [
    {
      number: '01',
      title: 'Descoberta',
      description: 'Entendemos seu negócio, objetivos e desafios técnicos.',
    },
    {
      number: '02',
      title: 'Arquitetura',
      description: 'Projetamos a solução com foco em escalabilidade e performance.',
    },
    {
      number: '03',
      title: 'Desenvolvimento',
      description: 'Implementamos com código limpo, testado e documentado.',
    },
    {
      number: '04',
      title: 'Deploy',
      description: 'Entregamos em produção com monitoramento e suporte.',
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Nosso Processo
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Do briefing ao deploy, cada etapa é executada com precisão cirúrgica.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-12 h-12 rounded-full border border-brand text-brand flex items-center justify-center mx-auto mb-6 font-mono font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}