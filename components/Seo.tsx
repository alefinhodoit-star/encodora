import { type Metadata } from 'next'

export const SITE_NAME = 'Encodora'
export const SITE_DESCRIPTION = 'Agência de engenharia de software especializada em backend, frontend, mobile, cloud/DevOps e inteligência artificial.'
export const SITE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'https://encodora.pt'
export const CONTACT_EMAIL = 'contacto@encodora.pt'
export const SITE_IMAGE = `${SITE_URL}/og-image.png`

export function absoluteUrl(path: string = '/'): string {
  return `${SITE_URL}${path}`
}

export function Seo({
  title,
  description,
  path,
  jsonLd,
}: {
  title?: string | null
  description?: string
  path?: string
  jsonLd?: Record<string, unknown>
}): JSX.Element | null {
  const metadata: Metadata = {
    title: title ? `${title} · ${SITE_NAME}` : SITE_NAME,
    description: description || SITE_DESCRIPTION,
    openGraph: {
      title: title ? `${title} · ${SITE_NAME}` : SITE_NAME,
      description: description || SITE_DESCRIPTION,
      url: absoluteUrl(path || '/'),
      siteName: SITE_NAME,
      images: [
        {
          url: SITE_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} · ${SITE_NAME}` : SITE_NAME,
      description: description || SITE_DESCRIPTION,
      images: [SITE_IMAGE],
    },
    alternates: {
      canonical: absoluteUrl(path || '/'),
    },
  }

  if (jsonLd) {
    metadata.other = {
      'application/ld+json': jsonLd as unknown as Record<string, string | number | (string | number)[]>,
    }
  }

  return null
}