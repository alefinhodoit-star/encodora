import { useEffect, useRef, useState } from "react";
import EarthGlobe from "./EarthGlobe";
import { ArrowDown } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";

export default function Hero() {
  const { t } = useLocale();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const h = el.offsetHeight;
      const scrolled = Math.min(1, Math.max(0, -rect.top / (h * 0.6)));
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Efeito invertido: começa centralizado e se afasta conforme o scroll
  // Deslocamento menor no mobile para o título não sair da tela
  const shiftVw = isMobile ? 12 : 40;
  const topOffset = scrollProgress * shiftVw;
  const bottomOffset = scrollProgress * shiftVw;

  return (
    <section ref={ref} id="top" className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black">
      {/* Earth canvas */}
      <div className="absolute inset-0 z-0">
        <EarthGlobe />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none neural-grid opacity-40" />

      {/* Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      {/* Top label */}
      <div className="absolute top-24 md:top-28 left-6 lg:left-10 z-20 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40">
        <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
        {t("hero.tag", { year: new Date().getUTCFullYear() })}
      </div>

      {/* Right side stats */}
      <div className="absolute top-28 right-6 lg:right-10 z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 text-right hidden sm:block">
        <div>{t("hero.stat1")}</div>
        <div className="mt-1">{t("hero.stat2")}</div>
      </div>

      {/* Headline split */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center pointer-events-none">
        <h1 className="font-heading font-extrabold tracking-tighter text-white text-center leading-[0.85]">
          <span
            className="block text-[clamp(2.75rem,13vw,6rem)] md:text-[10vw] transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${-topOffset}vw)` }}
          >
            ENCODING
          </span>
          <span
            className="block text-[clamp(2.75rem,13vw,6rem)] md:text-[10vw] text-white/30 transition-transform duration-300 ease-out"
            style={{ transform: `translateX(${bottomOffset}vw)` }}
          >
            THE FUTURE
          </span>
        </h1>
      </div>

      {/* Subline + CTA */}
      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-5 md:gap-6 px-6 text-center">
        <p className="font-body text-[13px] leading-relaxed md:text-base text-white/60 max-w-xs sm:max-w-xl text-balance">
          {t("hero.sub")}
        </p>
        <a
          href="#contato"
          className="group inline-flex items-center gap-3 px-6 py-3 md:px-7 md:py-3.5 bg-white text-black font-mono text-[11px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] hover:bg-white/80 transition-all"
        >
          {t("hero.cta")}
          <span className="w-1.5 h-1.5 bg-black rounded-full group-hover:scale-150 transition-transform" />
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">{t("hero.scroll")}</span>
        <ArrowDown size={14} className="text-white/30 animate-bounce" />
      </div>
    </section>
  );
}