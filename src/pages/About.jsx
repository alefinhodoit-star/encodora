import { Link } from "react-router-dom";
import { ArrowUpRight, Code2, LineChart, MessageSquare, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Seo, { absoluteUrl, SITE_IMAGE } from "@/components/Seo";
import { useLocale } from "@/lib/LocaleContext";

const VALUE_ICONS = [Code2, LineChart, MessageSquare, ShieldCheck];

export default function About() {
  const { t, tr, locale } = useLocale();
  const values = tr("pages.about.values") || [];
  const facts = tr("pages.about.facts") || [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `${t("pages.about.h1Pre")}${t("pages.about.h1Hl")}`,
    description: t("pages.about.intro"),
    url: absoluteUrl("/sobre"),
    inLanguage: locale,
    mainEntity: {
      "@type": "Organization",
      name: "Encodora",
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: SITE_IMAGE },
      numberOfEmployees: { "@type": "QuantitativeValue", value: 12 },
    },
  };

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={`${t("pages.about.h1Pre")}${t("pages.about.h1Hl")}`}
        description={t("pages.about.intro")}
        path="/sobre"
        jsonLd={jsonLd}
      />
      <Navbar />

      <header className="pt-32 pb-14 md:pb-20 border-b border-white/10 neural-grid-fine">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            // Encodora · {t("pages.about.label")}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-8xl text-white tracking-tighter mt-4">
            {t("pages.about.h1Pre")} <span className="text-white/30">{t("pages.about.h1Hl")}</span>
          </h1>
          <p className="font-body text-sm md:text-base text-white/50 mt-6 max-w-2xl leading-relaxed">
            {t("pages.about.intro")}
          </p>
        </div>
      </header>

      {/* Cultura */}
      <section className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20 grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              01 — {t("pages.about.cultureTitle")}
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tighter mt-4">
              {t("pages.about.cultureTitle")}
            </h2>
          </div>
          <Reveal className="md:col-span-8">
            <p className="font-body text-base md:text-lg text-white/60 leading-relaxed">
              {t("pages.about.cultureText")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Valores */}
      <section className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            02 — {t("pages.about.valuesTitle")}
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tighter mt-4">
            {t("pages.about.valuesTitle")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 mt-8 md:mt-12">
            {values.map((v, i) => {
              const Icon = VALUE_ICONS[i] || Code2;
              return (
                <Reveal
                  key={v.title}
                  delay={i * 80}
                  className="bg-black p-6 sm:p-8 md:p-10 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="w-11 h-11 border border-white/15 flex items-center justify-center">
                    <Icon size={18} className="text-white/70" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white tracking-tight mt-6">
                    {v.title}
                  </h3>
                  <p className="font-body text-sm text-white/50 mt-3 leading-relaxed">{v.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Visão */}
      <section className="border-b border-white/10 neural-grid-fine">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-10 py-14 md:py-24 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            03 — {t("pages.about.visionTitle")}
          </span>
          <Reveal>
            <p className="font-heading font-bold text-xl sm:text-2xl md:text-4xl text-white tracking-tight leading-snug mt-6 text-balance">
              {t("pages.about.visionText")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Equipa técnica */}
      <section className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-4">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                04 — {t("pages.about.teamTitle")}
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tighter mt-4">
                {t("pages.about.teamTitle")}
              </h2>
            </div>
            <p className="md:col-span-8 font-body text-base md:text-lg text-white/60 leading-relaxed">
              {t("pages.about.teamText")}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 mt-10 md:mt-14">
            {facts.map((f) => (
              <div key={f.label} className="bg-black p-5 sm:p-8">
                <p className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tighter">
                  {f.value}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mt-3">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-5xl text-white tracking-tighter">
            {t("pages.about.ctaTitle")}
          </h2>
          <Link
            to="/#contato"
            className="inline-flex w-fit items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all"
          >
            {t("pages.about.ctaBtn")}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}