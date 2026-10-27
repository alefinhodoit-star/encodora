import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SERVICES } from "@/lib/servicesData";
import { useLocale } from "@/lib/LocaleContext";
import Seo, { absoluteUrl } from "@/components/Seo";
import { ArrowUpRight } from "lucide-react";

function CodeTerminal({ service }) {
  return (
    <div className="border border-white/15 bg-[#0a0a0a] h-fit">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
          <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
          <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
          {service.id}.dev
        </span>
      </div>
      <pre className="p-5 md:p-6 overflow-x-auto font-mono text-xs md:text-sm leading-relaxed text-white/80 min-h-[220px]">
        <code>{service.code}</code>
      </pre>
    </div>
  );
}

export default function Services() {
  const { t, tr } = useLocale();
  const methodologies = tr("pages.services.methodologies");
  const value = tr("pages.services.value");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Encodora · ${t("pages.services.label")}`,
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: tr("servicesItems." + s.id + ".title"),
        description: tr("servicesItems." + s.id + ".description"),
        serviceType: s.id,
        areaServed: "Worldwide",
        provider: { "@type": "Organization", name: "Encodora", url: absoluteUrl("/") },
      },
    })),
  };

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={`${t("pages.services.h1Pre")} ${t("pages.services.h1Hl")}${t("pages.services.h1Post")}`}
        description={t("home.servicesSub")}
        path="/servicos"
        jsonLd={jsonLd}
      />
      <Navbar />

      {/* Hero */}
      <header className="pt-32 pb-16 border-b border-white/10 neural-grid-fine">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            // Encodora · {t("pages.services.label")}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-8xl text-white tracking-tighter mt-4">
            {t("pages.services.h1Pre")} <span className="text-white/30">{t("pages.services.h1Hl")}</span>
            {t("pages.services.h1Post")}
          </h1>
          <p className="font-body text-sm md:text-base text-white/50 mt-6 max-w-xl">
            {t("home.servicesSub")}
          </p>
        </div>
      </header>

      {/* Services detail */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-12 md:py-20 space-y-14 md:space-y-20">
        {SERVICES.map((s) => (
          <div key={s.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-white/30">{s.tag}</span>
                <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight">
                  {tr("servicesItems." + s.id + ".title")}
                </h2>
              </div>
              <p className="font-body text-sm text-white/50 mt-5 max-w-md leading-relaxed">
                {tr("servicesItems." + s.id + ".description")}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {s.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 border border-white/15 text-white/60"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <CodeTerminal service={s} />
          </div>
        ))}
      </section>

      {/* Methodologies */}
      <section className="border-t border-white/10 py-20 md:py-24 neural-grid-fine">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {t("pages.services.methodLabel")}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight mt-4">
            {t("pages.services.methodH2Pre")}
            <span className="text-white/30">{t("pages.services.methodH2Hl")}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 mt-12">
            {methodologies.map((m, i) => (
              <div key={m.title} className="bg-black p-5 sm:p-8 md:p-10 hover:bg-white/[0.02] transition-colors">
                <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-heading font-bold text-xl text-white tracking-tight mt-3">{m.title}</h3>
                <p className="font-body text-sm text-white/50 mt-3 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value delivery */}
      <section className="border-t border-white/10 py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {t("pages.services.valueLabel")}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight mt-4">
            {t("pages.services.valueH2Pre")}
            <span className="text-white/30">{t("pages.services.valueH2Hl")}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {value.map((v) => (
              <div key={v.tag} className="border-t-2 border-white pt-6">
                <span className="font-mono text-xs text-white/30">{v.tag}</span>
                <h3 className="font-heading font-bold text-xl text-white tracking-tight mt-2">{v.title}</h3>
                <p className="font-body text-sm text-white/50 mt-3 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight">
            {t("pages.services.ctaPre")}
            <span className="text-white/30">{t("pages.services.ctaHl")}</span>
            {t("pages.services.ctaPost")}
          </h2>
          <Link
            to="/#contato"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all"
          >
            {t("pages.services.ctaBtn")}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}