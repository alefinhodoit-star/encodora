"use client"

import { useLocale } from '@/lib/LocaleContext'

export default function LanguageSelector() {
  const { locale, setLocale } = useLocale()

  const locales = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'pt-PT', name: 'Português (PT)', flag: '🇵🇹' },
    { code: 'en-GB', name: 'English', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Español', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  ]

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value)}
      className="bg-transparent border border-white/10 text-white px-3 py-1 rounded text-sm focus:border-brand outline-none"
    >
      {locales.map((l) => (
        <option key={l.code} value={l.code}>
          {l.flag} {l.name}
        </option>
      ))}
    </select>
  )
}