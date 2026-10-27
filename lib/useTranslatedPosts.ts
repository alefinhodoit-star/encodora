import { useLocale } from '@/lib/LocaleContext'

export function useTranslatedPosts(posts: Record<string, unknown>[]) {
  const { locale } = useLocale()
  return posts.filter((post) => post.locale === locale || !post.locale)
}