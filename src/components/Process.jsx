import Reveal from "@/components/Reveal";
import { useLocale } from "@/lib/LocaleContext";

const STEP_NUMBERS = ["01", "02", "03", "04"];

export default function Process() {
  const { t, tr } = useLocale();
  const steps = tr("home.processSteps");
  return (
    <section id="processo" className="relative bg-black py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <Reveal className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            [ 02 ] {t("sections.process")}
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight mt-4 max-w-2xl">
            {t("home.processH2Pre")}
            <span className="text-white/30">{t("home.processH2Hl")}</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
          {STEP_NUMBERS.map((n, i) => (
            <Reveal
              key={n}
              delay={i * 80}
              className="bg-black p-5 sm:p-8 md:p-10 group hover:bg-white/[0.03] transition-colors duration-500 min-h-[220px] sm:min-h-[260px] flex flex-col justify-between"
            >
              <span className="font-mono text-xs text-white/30 group-hover:text-white transition-colors">
                {n}
              </span>
              <div>
                <h3 className="font-heading font-bold text-2xl text-white mb-3 tracking-tight">
                  {steps[i].title}
                </h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">{steps[i].desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}