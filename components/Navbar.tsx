"use client"

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useLocale } from '@/lib/LocaleContext'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, theme } = useTheme()
  const { t, locale, setLocale } = useLocale()

  const isDark = theme === 'dark'

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-brand flex items-center justify-center">
              <span className="text-white font-bold text-xs">E</span>
            </div>
            <Link href="/" className="font-heading font-bold text-xl tracking-tight text-white">
              Encodora
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t('nav.home')}
            </Link>
            <Link href="/servicos" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="/portfolio" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t('nav.portfolio')}
            </Link>
            <Link href="/sobre" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="/contacto" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              {t('nav.contact')}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Idioma">
                  {locale === 'pt-BR' ? '🇧🇷' : locale === 'pt-PT' ? '🇵🇹' : locale === 'en-GB' ? '🇬🇧' : locale === 'es-ES' ? '🇪🇸' : '🇫🇷'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {LOCALES.map((l) => (
                  <DropdownMenuItem key={l.code} onClick={() => setLocale(l.code)}>
                    {l.flag} {l.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              aria-label="Alternar tema"
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <Button variant="outline" size="sm" asChild>
              <Link href="/login">{t('nav.login')}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">{t('nav.register')}</Link>
            </Button>

            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden w-8 h-8 rounded-full border border-white/10 flex items-center justify-center"
              aria-label="Abrir menu"
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-white/5 bg-black/90 backdrop-blur-md py-4">
            <div className="flex flex-col gap-4">
              <Link href="/" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white px-4">
                {t('nav.home')}
              </Link>
              <Link href="/servicos" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white px-4">
                {t('nav.services')}
              </Link>
              <Link href="/portfolio" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white px-4">
                {t('nav.portfolio')}
              </Link>
              <Link href="/sobre" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white px-4">
                {t('nav.about')}
              </Link>
              <Link href="/contacto" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white px-4">
                {t('nav.contact')}
              </Link>
              <div className="border-t border-white/5 mt-4 pt-4 flex flex-col gap-2">
                <Link href="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white px-4">
                  {t('nav.login')}
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)} className="text-sm font-medium text-gray-300 hover:text-white px-4">
                  {t('nav.register')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

const LOCALES = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'pt-PT', name: 'Português (PT)', flag: '🇵🇹' },
  { code: 'en-GB', name: 'English', flag: '🇬🇧' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
]