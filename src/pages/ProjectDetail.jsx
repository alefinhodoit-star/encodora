const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { ArrowLeft, ArrowUpRight, Target, Wrench, TrendingUp } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";
import { useTranslatedProject } from "@/lib/useTranslatedPosts";
import Seo, { absoluteUrl, SITE_IMAGE } from "@/components/Seo";

const BLOCKS = [
  { key: "challenge", labelKey: "pages.project.challenge", icon: Target },
  { key: "solution", labelKey: "pages.project.solution", icon: Wrench },
  { key: "result", labelKey: "pages.project.result", icon: TrendingUp },
];

export default function ProjectDetail() {
  const { t, locale } = useLocale();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    db.entities.PortfolioProject.get(id)
      .then((p) => {
        setProject(p);
        db.entities.PortfolioProject.updateMany({ id }, { $inc: { views: 1 } }).catch(console.error);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const { text: translated, translating: isTranslating } = useTranslatedProject(project);
  const display = translated || project;

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <Seo title={t("pages.project.notFound")} noindex statusCode={404} />
        <p className="font-heading font-extrabold text-4xl text-white">{t("pages.project.notFound")}</p>
        <Link
          to="/portfolio"
          className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white border border-white/20 px-5 py-2.5 transition-colors"
        >
          {t("pages.project.back")}
        </Link>
      </div>
    );
  }

  const site = absoluteUrl("/");
  const seoJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        name: display.title,
        headline: display.title,
        description: display.result || display.solution || t("pages.portfolio.sub"),
        image: project.image_url || SITE_IMAGE,
        about: display.category,
        keywords: (project.stack || []).join(", "),
        dateCreated: project.created_date,
        inLanguage: locale,
        creator: { "@type": "Organization", name: "Encodora", url: site },
        mainEntityOfPage: absoluteUrl(`/portfolio/${project.id}`),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Encodora", item: site },
          { "@type": "ListItem", position: 2, name: "Portfólio", item: absoluteUrl("/portfolio") },
          { "@type": "ListItem", position: 3, name: display.title },
        ],
      },
    ],
  };

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={display.title}
        description={display.result || display.solution}
        path={`/portfolio/${project.id}`}
        type="article"
        image={project.image_url || SITE_IMAGE}
        jsonLd={seoJsonLd}
      />
      <Navbar />

      <header className="pt-32 pb-12 neural-grid-fine">
        <div className="max-w-4xl mx-auto px-6">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            Portfólio
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-8 flex flex-wrap items-center gap-3">
            {display.category && (
              <span className="border border-white/15 px-2.5 py-1">{display.category}</span>
            )}
            {display.client && <span>{t("pages.project.client")}: {display.client}</span>}
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-7xl text-white tracking-tighter mt-6">
            {display.title}
          </h1>
        </div>
      </header>

      {/* Hero image */}
      {project.image_url && (
        <div className="max-w-6xl mx-auto px-6">
          <div className="border border-white/10 overflow-hidden">
            <Image src={project.image_url} alt={display.title} className="w-full h-[40vh] md:h-[55vh]" />
          </div>
        </div>
      )}

      {/* Metric */}
      {project.metric && (
        <div className="max-w-6xl mx-auto px-6 mt-10">
          <div className="border border-white/15 p-5 sm:p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white tracking-tight">
                {project.metric}
              </div>
              {display.metric_label && (
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-2">
                  {display.metric_label}
                </div>
              )}
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
              {t("pages.project.metricBadge")}
            </span>
          </div>
        </div>
      )}

      {/* Challenge / Solution / Result */}
      <section className="max-w-6xl mx-auto px-6 py-14 space-y-px bg-white/10 border border-white/10 mt-10">
        {BLOCKS.map((b, i) => (
          <div key={b.key} className="bg-black p-5 sm:p-8 md:p-12 flex gap-4 sm:gap-6">
            <div className="shrink-0">
              <div className="w-11 h-11 border border-white/15 flex items-center justify-center">
                <b.icon size={18} className="text-white/70" />
              </div>
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
                [ {String(i + 1).padStart(2, "0")} ] {t(b.labelKey)}
              </span>
              <p className="font-body text-base text-white/70 mt-4 leading-relaxed max-w-3xl">
                {display[b.key] || "—"}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Stack */}
      {project.stack && project.stack.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            {t("pages.project.stackLabel")}
          </span>
          <div className="flex flex-wrap gap-2 mt-5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border border-white/15 text-white/60"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-white/10 py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-white tracking-tight">
            {t("pages.project.ctaPre")}
            <span className="text-white/30">{t("pages.project.ctaHl")}</span>
          </h2>
          <Link
            to="/#contato"
            className="group inline-flex items-center gap-3 px-7 py-3.5 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all"
          >
            {t("pages.project.ctaBtn")}
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}