const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Image } from "@/components/ui/image";
import { ArrowUpRight, Gamepad2 } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";
import { useTranslatedProjects } from "@/lib/useTranslatedPosts";
import Seo, { absoluteUrl } from "@/components/Seo";

const isGame = (p) => (p.category || "").toLowerCase().includes("games");

function ProjectCard({ project, index }) {
  const { t } = useLocale();
  return (
    <Link
      to={`/portfolio/${project.id}`}
      className="group bg-black flex flex-col overflow-hidden hover:bg-white transition-colors duration-500"
    >
      <div className="h-48 sm:h-60 md:h-72 overflow-hidden border-b border-white/10">
        {project.image_url ? (
          <Image
            src={project.image_url}
            alt={project.title}
            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full neural-grid-fine bg-[#0a0a0a] flex items-center justify-center px-6 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
              {project.title}
            </span>
          </div>
        )}
      </div>
      <div className="p-5 sm:p-8 flex flex-col gap-5 flex-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-white/30 group-hover:text-black/40 transition-colors">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-black/50 border border-white/15 group-hover:border-black/20 px-2.5 py-1 transition-colors">
            {project.category}
          </span>
        </div>
        <div className="flex-1">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-black tracking-tight transition-colors">
            {project.title}
          </h2>
          {project.client && (
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-black/50 mt-1.5 transition-colors">
              {project.client}
            </p>
          )}
          {project.metric && (
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white group-hover:text-black tracking-tight mt-4 transition-colors">
              {project.metric}
              {project.metric_label && (
                <span className="block sm:ml-2 font-mono text-[10px] uppercase tracking-wider font-normal text-white/40 group-hover:text-black/50 mt-1 sm:mt-0 sm:inline transition-colors">
                  {project.metric_label}
                </span>
              )}
            </p>
          )}
        </div>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 group-hover:text-black transition-colors">
          {t("pages.portfolio.viewCase")}
          <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  );
}

export default function Portfolio() {
  const { t, locale } = useLocale();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.PortfolioProject.list("-created_date", 50)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const { list: displayProjects } = useTranslatedProjects(projects);
  const games = displayProjects.filter(isGame);
  const cases = displayProjects.filter((p) => !isGame(p));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Encodora · ${t("pages.portfolio.label")}`,
    description: t("pages.portfolio.sub"),
    url: absoluteUrl("/portfolio"),
    inLanguage: locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: displayProjects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/portfolio/${p.id}`),
        name: p.title,
      })),
    },
  };

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={`${t("pages.portfolio.h1Pre")} ${t("pages.portfolio.h1Hl")}`}
        description={t("pages.portfolio.sub")}
        path="/portfolio"
        jsonLd={jsonLd}
      />
      <Navbar />

      <header className="pt-32 pb-10 md:pb-16 border-b border-white/10 neural-grid-fine">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            // Encodora · {t("pages.portfolio.label")}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-8xl text-white tracking-tighter mt-4">
            {t("pages.portfolio.h1Pre")} <span className="text-white/30">{t("pages.portfolio.h1Hl")}</span>
          </h1>
          <p className="font-body text-sm md:text-base text-white/50 mt-6 max-w-xl">
            {t("pages.portfolio.sub")}
          </p>
        </div>
      </header>

      <section className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-10 md:py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : cases.length === 0 ? (
          <div className="border border-white/10 p-10 md:p-16 text-center">
            <p className="font-heading font-bold text-xl md:text-2xl text-white/40">
              {t("pages.portfolio.empty")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {cases.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Games — seção independente */}
      <section className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-10 md:py-16">
          <div className="flex items-center gap-3">
            <Gamepad2 size={16} className="text-white/40" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              // Encodora · {t("pages.portfolio.gamesLabel")}
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tighter mt-3">
            {t("pages.portfolio.gamesH2Pre")}
            <span className="text-white/30">{t("pages.portfolio.gamesH2Hl")}</span>
          </h2>
          <p className="font-body text-sm md:text-base text-white/50 mt-5 max-w-xl">
            {t("pages.portfolio.gamesNote")}
          </p>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
          ) : games.length === 0 ? (
            <div className="border border-white/10 p-10 md:p-16 text-center mt-8">
              <p className="font-heading font-bold text-xl md:text-2xl text-white/40">
                {t("pages.portfolio.gamesEmpty")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 mt-8 border border-white/10">
              {games.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}