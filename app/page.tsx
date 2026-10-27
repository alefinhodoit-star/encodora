import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Portfolio from '@/components/Portfolio'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { Seo } from '@/components/Seo'
import { useLocale } from '@/lib/LocaleContext'

export default function Home() {
  const { t, locale } = useLocale()
  const site = `https://encodora.pt`
  const org = `${site}#organization`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: 'Encodora',
        url: site,
        logo: { '@type': 'ImageObject', url: `${site}/og-image.png` },
        image: `${site}/og-image.png`,
        email: 'contacto [at] encodora [dot] pt',
        description: 'Agência de engenharia de software especializada em backend, frontend, mobile, cloud/DevOps e inteligência artificial.',
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'contacto [at] encodora [dot] pt',
          contactType: 'sales',
          availableLanguage: ['Portuguese', 'English', 'Spanish', 'French'],
        },
        sameAs: ['https://github.com', 'https://linkedin.com', 'https://x.com'],
      },
      {
        '@type': 'WebSite',
        '@id': `${site}#website`,
        url: site,
        name: 'Encodora',
        inLanguage: locale,
        publisher: { '@id': org },
      },
      {
              '@type': 'ProfessionalService',
              '@id': `${site}#service`,
              name: 'Encodora',
              url: site,
              email: 'contacto [at] encodora [dot] pt',
              parentOrganization: { '@id': org },
              areaServed: 'Worldwide',
              priceRange: '€€€',
              serviceType: [
                'Desenvolvimento Backend',
                'Desenvolvimento Frontend',
                'Aplicações Móveis',
                'Cloud & DevOps',
                'Inteligência Artificial e Machine Learning',
              ],
            },
    ],
  }

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={null}
        description={t('hero.sub')}
        path="/"
        jsonLd={jsonLd}
      />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}