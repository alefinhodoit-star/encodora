"use client"

import Link from 'next/link'
import { useLocale } from '@/lib/LocaleContext'
import { GitHub, Linkedin, X as XIcon, Mail } from 'lucide-react'

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-white">
              Encodora
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <GitHub className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="X"
            >
              <XIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:contacto@encodora.pt"
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">contacto@encodora.pt</span>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            {t('footer.description')}
          </p>
          <p className="text-gray-500 text-sm mt-2">
            {t('footer.contact')}
          </p>
        </div>
      </div>
    </footer>
  )
}