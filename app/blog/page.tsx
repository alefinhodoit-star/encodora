import Link from 'next/link'

const posts = [
  {
    id: '1',
    title: 'Arquitetura de Microsserviços com Node.js',
    excerpt: 'Como projetar sistemas escaláveis usando microsserviços e containers.',
    date: '15 jan 2024',
    readTime: '5 min de leitura',
    image: 'https://images.unsplash.com/photo-1544383835-bda2dbb6cbc8?w=800&q=80',
  },
  {
    id: '2',
    title: 'Next.js 14: App Router e Server Components',
    excerpt: 'Novidades do Next.js 14 e como aproveitar o App Router.',
    date: '10 jan 2024',
    readTime: '4 min de leitura',
    image: 'https://images.unsplash.com/photo-1555097980-4284da661b5e?w=800&q=80',
  },
  {
    id: '3',
    title: 'TypeScript para Iniciantes',
    excerpt: 'Guia completo para começar com TypeScript em projetos React.',
    date: '05 jan 2024',
    readTime: '6 min de leitura',
    image: 'https://images.unsplash.com/photo-1587620962775-ab97fab3c4cb?w=800&q=80',
  },
]

export default function BlogPage() {
  return (
    <section className="py-20 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Blog
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Artigos sobre tecnologia, arquitetura de software e desenvolvimento.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group rounded-lg border border-white/5 bg-white/5 hover:border-brand/50 transition-all overflow-hidden">
              <div className="h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs font-mono text-brand mb-2 block">
                  {post.date} · {post.readTime}
                </span>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
                >
                  Ler artigo →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}