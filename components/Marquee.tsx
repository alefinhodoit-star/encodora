"use client"

import { useState, useEffect } from 'react'

const brands = [
  'Encodora',
  'Stripe',
  'Vercel',
  'AWS',
  'Google Cloud',
  'Supabase',
  'Vercel',
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind',
  'Node.js',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Kubernetes',
]

export default function Marquee() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(media.matches)
    const handler = () => setIsReducedMotion(media.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  }, [])

  const doubled = [...brands, ...brands]

  return (
    <section className="w-full border-y border-white/5 bg-black/50 overflow-hidden">
      <div className="flex items-center gap-8 animate-marquee duration-[40s] linear infinite">
        {doubled.map((brand) => (
          <div key={brand} className="flex items-center gap-2 px-4 py-3">
            <span className="text-xs font-mono text-gray-500">{brand}</span>
          </div>
        ))}
      </div>
    </section>
  )
}