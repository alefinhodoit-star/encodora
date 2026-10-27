import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";
import Seo from "@/components/Seo";

export default function Terms() {
  const { t, tr } = useLocale();
  const sections = tr("pages.terms.sections") || [];

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={`${t("pages.terms.h1Pre")}${t("pages.terms.h1Hl")}`}
        description={t("pages.terms.intro")}
        path="/termos-de-uso"
        type="article"
      />
      <header className="pt-32 pb-14 border-b border-white/10 neural-grid-fine">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            {t("pages.terms.back")}
          </Link>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-7xl text-white tracking-tighter mt-8">
            {t("pages.terms.h1Pre")}
            <span className="text-white/30">{t("pages.terms.h1Hl")}</span>
          </h1>
          <p className="font-body text-sm text-white/50 mt-6 max-w-xl leading-relaxed">
            {t("pages.terms.intro")}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
              {t("pages.terms.updated")}
            </p>
            <Link
              to="/privacidade"
              className="font-mono text-[10px] uppercase tracking-wider text-white/40 hover:text-white border-b border-white/20 hover:border-white transition-colors"
            >
              {t("footer.privacy")}
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="space-y-px bg-white/10">
          {sections.map((s, i) => (
            <div
              key={s.title}
              className="bg-black p-5 sm:p-8 md:p-10 flex gap-4 sm:gap-6 hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-white/30 pt-1.5 shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="font-heading font-bold text-xl text-white tracking-tight">
                  {s.title}
                </h2>
                <p className="font-body text-sm text-white/50 mt-3 leading-relaxed">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 border border-white/15 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-xl text-white tracking-tight flex items-center gap-3">
              <Mail size={18} />
              {t("pages.terms.contactTitle")}
            </h3>
            <p className="font-body text-sm text-white/50 mt-2">{t("pages.terms.contactLine")}</p>
          </div>
          <a
            href="mailto:contacto@encodora.pt"
            className="inline-flex w-fit items-center px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all"
          >
            contacto@encodora.pt
          </a>
        </div>
      </section>
    </div>
  );
}