import { useEffect, useState, useCallback } from "react";
import Reveal from "@/components/Reveal";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";
import { useTranslatedRoles } from "@/lib/useTranslatedPosts";

const PEOPLE = [
  { name: "Marina Vasquez", role: "CTO · Quantum Finance", project: "Fintech Engine" },
  { name: "Rafael Okafor", role: "VP de Produto · Nimbus Cloud", project: "Cloud Infrastructure" },
  { name: "Camille Duarte", role: "Head de Inovação · Veridian Health", project: "Healthcare Platform" },
  { name: "Jonas Lindberg", role: "Diretor de Tecnologia · Atlas Logistics", project: "Real-time Tracking" },
];

export default function Testimonials() {
  const { t, tr } = useLocale();
  const quotes = tr("home.quotes");
  const translatedRoles = useTranslatedRoles(PEOPLE.map((p) => p.role));
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % PEOPLE.length), []);
  const prev = () => setIndex((i) => (i - 1 + PEOPLE.length) % PEOPLE.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  const current = PEOPLE[index];

  return (
    <section
      id="depoimentos"
      className="relative bg-black py-24 md:py-32 border-t border-white/10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background quote watermark */}
      <Quote
        className="absolute -top-10 -right-10 text-white/[0.03] pointer-events-none"
        size={400}
        strokeWidth={0.5}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              [ 04 ] {t("sections.testimonials")}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight mt-4 max-w-2xl">
              {t("home.testiH2Pre")} <span className="text-white/30">{t("home.testiH2Hl")}</span>
              {t("home.testiH2Post")}
            </h2>
          </div>
          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label={t("home.prevT")}
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              aria-label={t("home.nextT")}
              className="w-11 h-11 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </Reveal>

        {/* Carousel */}
        <Reveal className="relative border border-white/15 bg-[#0a0a0a] min-h-[400px] md:min-h-[260px]">
          <div className="absolute top-0 left-0 w-1 h-full bg-white" />
          {PEOPLE.map((item, i) => (
            <div
              key={item.name}
              className={`absolute inset-0 flex flex-col justify-between p-5 sm:p-8 md:p-14 transition-all duration-700 ${
                i === index
                  ? "opacity-100 translate-x-0"
                  : i < index
                  ? "opacity-0 -translate-x-6 pointer-events-none"
                  : "opacity-0 translate-x-6 pointer-events-none"
              }`}
              aria-hidden={i !== index}
            >
              <p className="font-heading font-medium text-lg sm:text-xl md:text-3xl text-white leading-snug max-w-4xl tracking-tight">
                "{quotes[i]}"
              </p>
              <div className="flex flex-wrap items-end justify-between gap-4 mt-8">
                <div>
                  <div className="font-body font-semibold text-white text-base">{item.name}</div>
                  <div className="font-mono text-xs text-white/50 mt-1 uppercase tracking-wider">
                    {translatedRoles[i] || item.role}
                  </div>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 border border-white/15 px-3 py-1.5">
                  {item.project}
                </div>
              </div>
            </div>
          ))}
        </Reveal>

        {/* Indicators */}
        <div className="flex items-center gap-2 mt-8">
          {PEOPLE.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={t("home.goto", { n: i + 1 })}
              className={`h-1 transition-all duration-500 ${
                i === index ? "w-12 bg-white" : "w-6 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
          <span className="font-mono text-xs text-white/30 ml-4">
            {String(index + 1).padStart(2, "0")} / {String(PEOPLE.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}