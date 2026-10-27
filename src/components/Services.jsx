import { useState } from "react";
import Reveal from "@/components/Reveal";
import { SERVICES } from "@/lib/servicesData";
import { useLocale } from "@/lib/LocaleContext";

export default function Services() {
  const { t, tr } = useLocale();
  const [active, setActive] = useState(0);

  return (
    <section id="servicos" className="relative bg-black py-24 md:py-32 neural-grid-fine">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              [ 01 ] {t("sections.services")}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight mt-4 max-w-2xl">
              {t("home.servicesH2Pre")} <span className="text-white/30">{t("home.servicesH2Hl")}</span>
              {t("home.servicesH2Post")}
            </h2>
          </div>
          <p className="font-body text-sm text-white/50 max-w-sm">
            {t("home.servicesSub")}
          </p>
        </Reveal>

        {/* Services list + code preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* List */}
          <div className="flex flex-col">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className={`group text-left py-7 border-t border-white/10 transition-all duration-300 ${
                  active === i ? "pl-4" : "pl-0"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-white/30">{s.tag}</span>
                  <h3
                    className={`font-heading font-bold text-2xl md:text-3xl tracking-tight transition-colors duration-300 ${
                      active === i ? "text-white" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {tr("servicesItems." + s.id + ".title")}
                  </h3>
                </div>
                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    active === i ? "max-h-40 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="font-body text-sm text-white/50 max-w-md ml-10">{tr("servicesItems." + s.id + ".description")}</p>
                  <div className="flex flex-wrap gap-2 ml-10 mt-4">
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
              </button>
            ))}
            <div className="border-t border-white/10" />
          </div>

          {/* Code preview */}
          <div className="lg:sticky lg:top-28 h-fit">
            <div className="border border-white/15 bg-[#0a0a0a]">
              {/* Terminal bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
                  <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                  {SERVICES[active].id}.dev
                </span>
              </div>
              <pre className="p-5 md:p-6 overflow-x-auto font-mono text-xs md:text-sm leading-relaxed text-white/80 min-h-[200px] md:min-h-[280px]">
                <code>{SERVICES[active].code}</code>
              </pre>
            </div>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/30">
              <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              {t("home.compiling")}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}