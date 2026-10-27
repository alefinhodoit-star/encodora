import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { Image } from "@/components/ui/image";
import Seo, { absoluteUrl } from "@/components/Seo";
import { useLocale } from "@/lib/LocaleContext";

const PHOTOS = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
];

export default function Gallery() {
  const { t, tr, locale } = useLocale();
  const items = tr("pages.gallery.items") || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${t("pages.gallery.h1Pre")}${t("pages.gallery.h1Hl")}`,
    description: t("pages.gallery.intro"),
    url: absoluteUrl("/galeria"),
    inLanguage: locale,
    image: PHOTOS,
  };

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={`${t("pages.gallery.h1Pre")}${t("pages.gallery.h1Hl")}`}
        description={t("pages.gallery.intro")}
        path="/galeria"
        jsonLd={jsonLd}
      />
      <Navbar />

      <header className="pt-32 pb-14 border-b border-white/10 neural-grid-fine">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            // Encodora · {t("pages.gallery.label")}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-8xl text-white tracking-tighter mt-4">
            {t("pages.gallery.h1Pre")}{" "}
            <span className="text-white/30">{t("pages.gallery.h1Hl")}</span>
          </h1>
          <p className="font-body text-sm md:text-base text-white/50 mt-6 max-w-xl leading-relaxed">
            {t("pages.gallery.intro")}
          </p>
        </div>
      </header>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-10 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {PHOTOS.map((src, i) => {
            const item = items[i] || {};
            const num = String(i + 1).padStart(2, "0");
            return (
              <Reveal key={src} delay={i * 60} className="bg-black group overflow-hidden">
                <figure>
                  <div className="aspect-[4/3] overflow-hidden border-b border-white/10">
                    <Image
                      src={src}
                      alt={item.caption || "Encodora"}
                      className="w-full h-full grayscale contrast-[1.05] opacity-75 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
                    />
                  </div>
                  <figcaption className="p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-body text-sm text-white/80 leading-snug">
                        {item.caption}
                      </p>
                      <span className="font-mono text-[10px] text-white/25 shrink-0">{num}</span>
                    </div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 mt-3">
                      {item.meta}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>

        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/25 mt-8 leading-relaxed">
          {t("pages.gallery.note")}
        </p>
      </section>

      <Footer />
    </div>
  );
}