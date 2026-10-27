export default function AboutPage() {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-8">
          Sobre a Encodora
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed mb-6">
          A Encodora é uma agência de engenharia de software especializada em backend, frontend, mobile, cloud/DevOps e inteligência artificial.
        </p>
        <p className="text-gray-400 text-lg leading-relaxed mb-6">
          Construímos sistemas de precisão à escala global, com foco em performance, escalabilidade e experiência do usuário.
        </p>
        <div className="space-y-4">
          <p className="text-gray-300">• Arquitetura backend robusta</p>
          <p className="text-gray-300">• Frontend moderno e responsivo</p>
          <p className="text-gray-300">• Aplicações móveis nativas</p>
          <p className="text-gray-300">• Infraestrutura cloud e DevOps</p>
          <p className="text-gray-300">• Inteligência artificial e machine learning</p>
        </div>
      </div>
    </section>
  )
}