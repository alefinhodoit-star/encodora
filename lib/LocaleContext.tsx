"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const DEFAULT_LOCALE = 'pt-BR'

export const LOCALES = [
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷', currency: 'EUR', symbol: '€' },
  { code: 'pt-PT', name: 'Português (PT)', flag: '🇵🇹', currency: 'EUR', symbol: '€' },
  { code: 'en-GB', name: 'English', flag: '🇬🇧', currency: 'GBP', symbol: '£' },
  { code: 'es-ES', name: 'Español', flag: '🇪🇸', currency: 'EUR', symbol: '€' },
  { code: 'fr-FR', name: 'Français', flag: '🇫🇷', currency: 'EUR', symbol: '€' },
]

const STORAGE_KEY = 'encodora.locale'

const LocaleContext = createContext<{
  locale: string
  setLocale: (code: string) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  tr: (key: string) => unknown
  currency: string
  currencySymbol: string
  formatMoney: (value: number) => string
  locales: typeof LOCALES
} | null>(null)

function localeFromCountry(countryCode: string): string {
  const map: Record<string, string> = {
    GB: 'en-GB',
    US: 'en-GB',
    PT: 'pt-PT',
    BR: 'pt-BR',
    ES: 'es-ES',
    FR: 'fr-FR',
  }
  return map[countryCode] || DEFAULT_LOCALE
}

function getSavedLocale(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState(() => getSavedLocale() || DEFAULT_LOCALE)

  const setLocale = useCallback((code: string) => {
    setLocaleState(code)
    try {
      localStorage.setItem(STORAGE_KEY, code)
    } catch {
      /* noop */
    }
  }, [])

  useEffect(() => {
    if (getSavedLocale()) return
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), 4000)
    fetch('https://ipwho.is/', { signal: controller.signal })
      .then((r) => r.json())
      .then((d: { country_code?: string }) => {
        if (d && d.country_code) setLocaleState(localeFromCountry(d.country_code))
      })
      .catch(() => {})
    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [])

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale
    }
  }, [locale])

  const lookup = useCallback(
      (key: string) => {
        const walk = (dict: Record<string, unknown>) =>
          key.split('.').reduce<unknown>((acc, part) => (acc == null ? undefined : (acc as Record<string, unknown>)[part]), dict)
        const val = walk(DICTS[locale])
        if (val !== undefined) return val
        return walk(DICTS[DEFAULT_LOCALE])
      },
      [locale]
    )
  
    const t = useCallback(
      (key: string, vars?: Record<string, string | number>) => {
        const val = lookup(key)
        if (typeof val !== 'string') return key
        if (vars) {
          for (const k of Object.keys(vars)) {
            val.split(`{${k}}`).join(String(vars[k]))
          }
        }
        return val
      },
      [lookup]
    )

  const tr = useCallback((key: string) => lookup(key), [lookup])

  const meta = useMemo(
    () => LOCALES.find((l) => l.code === locale) || LOCALES.find((l) => l.code === DEFAULT_LOCALE),
    [locale]
  )

  const formatMoney = useCallback(
    (value: number) =>
      new Intl.NumberFormat(locale, { style: 'currency', currency: meta?.currency }).format(value),
    [locale, meta]
  )

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t,
      tr,
      currency: meta?.currency || 'EUR',
      currencySymbol: meta?.symbol || '€',
      formatMoney,
      locales: LOCALES,
    }),
    [locale, setLocale, t, tr, meta, formatMoney]
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale deve ser usado dentro de LocaleProvider')
  return ctx
}

const DICTS: Record<string, Record<string, unknown>> = {
  'pt-BR': {
    'hero.title': 'Engenharia de Software de Precisão',
    'hero.sub': 'Arquitetura backend, frontend, mobile, cloud/DevOps e IA — sistemas de precisão à escala global.',
    'services.title': 'Nossos Serviços',
    'services.sub': 'Entregamos soluções técnicas de alto padrão para negócios que exigem excelência.',
    'portfolio.title': 'Portfolio',
    'portfolio.sub': 'Projetos desenvolvidos com foco em performance, escalabilidade e experiência do usuário.',
    'contact.title': 'Entre em Contato',
    'contact.sub': 'Tem um projeto em mente? Fale com nosso time.',
    'nav.home': 'Início',
    'nav.services': 'Serviços',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.login': 'Entrar',
    'nav.register': 'Cavar',
    'footer.description': 'Encodora é uma agência de engenharia de software especializada em backend, frontend, mobile, cloud/DevOps e inteligência artificial.',
    'footer.contact': 'Contacto: contacto@encodora.pt',
  },
  'en-GB': {
    'hero.title': 'Precision Software Engineering',
    'hero.sub': 'Backend, frontend, mobile, cloud/DevOps and AI architecture — precision systems at global scale.',
    'services.title': 'Our Services',
    'services.sub': 'We deliver high-standard technical solutions for businesses that demand excellence.',
    'portfolio.title': 'Portfolio',
    'portfolio.sub': 'Projects developed with focus on performance, scalability, and user experience.',
    'contact.title': 'Get in Touch',
    'contact.sub': 'Have a project in mind? Talk to our team.',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'footer.description': 'Encodora is a software engineering agency specialized in backend, frontend, mobile, cloud/DevOps and artificial intelligence.',
    'footer.contact': 'Contact: contacto@encodora.pt',
  },
}