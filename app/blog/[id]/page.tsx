import Link from 'next/link'

interface BlogPostDetailProps {
  params: { id: string }
}

const posts: Record<string, { title: string; date: string; content: string; image: string }> = {
  '1': {
    title: 'Arquitetura de Microsserviços com Node.js',
    date: '15 jan 2024',
    content: 'Neste artigo exploramos como projetar sistemas escaláveis usando microsserviços e containers. Abordamos padrões de comunicação, descoberta de serviços, balanceamento de carga e muito mais.',
    image: 'https://images.unsplash.com/photo-1544383835-bda2dbb6cbc8?w=1200&q=80',
  },
  '2': {
    title: 'Next.js 14: App Router e Server Components',
    date: '10 jan 2024',
    content: 'As novidades do Next.js 14 trazem melhorias significativas no App Router e Server Components. Vamos explorar como aproveitar esses recursos em seus projetos.',
    image: 'https://images.unsplash.com/photo-1555097980-4284da661b5e?w=1200&q=80',
  },
  '3': {
    title: 'TypeScript para Iniciantes',
    date: '05 jan 2024',
    content: 'TypeScript é uma linguagem poderosa que adiciona tipagem estática ao JavaScript. Este guia completo ajuda iniciantes a começar com TypeScript em projetos React.',
    image: 'https://images.unsplash.com/photo-1587620962775-ab97fab3c4cb?w=1200&q=80',
  },
}

export default function BlogPostDetail({ params }: BlogPostDetailProps) {
  const post = posts[params.id]

  if (!post) {
    return null
  }

  return (
    <article className="py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            {post.title}
          </h1>
          <p className="text-gray-400 text-sm font-mono">{post.date}</p>
        </div>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed mb-6">{post.content}</p>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand hover:underline"
          >
            ← Voltar para o blog
          </Link>
        </div>
      </div>
    </article>
  )
}