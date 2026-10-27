"use client"

import { useLocale } from '@/lib/LocaleContext'
import { services } from '@/lib/servicesData'
import { Server, Monitor, Smartphone, Cloud, Brain } from 'lucide-react'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Server,
  Monitor,
  Smartphone,
  Cloud,
  Brain,
}

export default function Services() {
  const { t } = useLocale()

  return (
    <section id="servicos" className="py-20 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            {t('services.title')}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{t('services.sub')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.id] || Server
            return (
              <div
                key={service.id}
                className="group p-8 rounded-lg border border-white/5 bg-white/5 hover:border-brand/50 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:bg-brand group-hover:text-black transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}