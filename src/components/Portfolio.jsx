const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";
import { useTranslatedProjects } from "@/lib/useTranslatedPosts";

function Counter({ value }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          const isPercent = value.includes("%");
          const isMoney = value.includes("$");
          const num = parseFloat(value.replace(/[^0-9.]/g, ""));
          const suffix = value.replace(/[0-9.,]/g, "").replace(/[a-zA-Z]/g, "");
          const prefix = isMoney ? "$" : "";
          const post = isPercent ? "%" : suffix;
          const duration = 1500;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            const cur = num * eased;
            let formatted;
            if (num >= 1000) formatted = (cur / 1000).toFixed(1) + "K";
            else if (num % 1 !== 0) formatted = cur.toFixed(2);
            else formatted = Math.round(cur).toString();
            setDisplay(prefix + formatted + (p === 1 ? (value.includes("B") ? "B" : value.includes("M") ? "M" : "") : "") + post);
            if (p < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, started]);

  return <span ref={ref}>{display}</span>;
}

export default function Portfolio() {
  const { t } = useLocale();
  const [projects, setProjects] = useState([]);
  const { list: displayProjects } = useTranslatedProjects(projects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.entities.PortfolioProject.list("-created_date", 20)
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="portfolio" className="relative bg-black py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              [ 03 ] {t("sections.portfolio")}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight mt-4 max-w-2xl">
              {t("home.portfolioH2Pre")} <span className="text-white/30">{t("home.portfolioH2Hl")}</span>
              {t("home.portfolioH2Post")}
            </h2>
          </div>
          <Link
            to="/portfolio"
            className="group inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
          >
            {t("home.viewAll")}
            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </Reveal>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : projects.length === 0 ? (
          <div className="border border-white/10 p-16 text-center">
            <p className="font-heading font-bold text-2xl text-white/40">Nenhum projeto publicado ainda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
            {displayProjects.slice(0, 4).map((p, i) => (
              <Link
                key={p.id}
                to={`/portfolio/${p.id}`}
                className="group relative bg-black p-5 sm:p-6 md:p-12 min-h-[220px] sm:min-h-[280px] md:min-h-[340px] flex flex-col justify-between overflow-hidden hover:bg-white transition-colors duration-500"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-white/30 group-hover:text-black/40 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-black/50 transition-colors">
                    {p.category}
                  </span>
                </div>

                {p.metric && (
                  <div className="my-6">
                    <div className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-white group-hover:text-black transition-colors tracking-tight">
                      <Counter value={p.metric} />
                    </div>
                    {p.metric_label && (
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-black/50 mt-2 transition-colors">
                        {p.metric_label}
                      </div>
                    )}
                  </div>
                )}

                <div>
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-black transition-colors tracking-tight">
                    {p.title}
                  </h3>
                  {p.result && (
                    <p className="font-body text-sm text-white/50 group-hover:text-black/60 mt-2 max-w-md transition-colors line-clamp-3">
                      {p.result}
                    </p>
                  )}
                </div>

                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-xs text-black">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}