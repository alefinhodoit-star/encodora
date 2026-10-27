const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Link } from "react-router-dom";
import { useLocale } from "@/lib/LocaleContext";

const LOGO_URL = "https://media.db.com/images/public/user_695abc5bcdd1ecf63669f010/d5736ecd5_upscalemedia-transformed.png";

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="relative bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Big wordmark */}
        <div className="mb-16 overflow-hidden">
          <h2 className="font-heading font-extrabold text-white tracking-tighter leading-none text-[18vw] md:text-[14vw]">
            ENCODORA
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/10">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li><Link to="/servicos" className="font-body text-sm text-white/60 hover:text-white transition-colors">Serviços</Link></li>
              <li><Link to="/sobre" className="font-body text-sm text-white/60 hover:text-white transition-colors">{t("nav.about")}</Link></li>
              <li><a href="#processo" className="font-body text-sm text-white/60 hover:text-white transition-colors">{t("nav.process")}</a></li>
              <li><Link to="/portfolio" className="font-body text-sm text-white/60 hover:text-white transition-colors">{t("nav.portfolio")}</Link></li>
              <li><Link to="/galeria" className="font-body text-sm text-white/60 hover:text-white transition-colors">{t("pages.gallery.label")}</Link></li>
              <li><Link to="/blog" className="font-body text-sm text-white/60 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/termos-de-uso" className="font-body text-sm text-white/60 hover:text-white transition-colors">{t("pages.terms.h1Pre")}{t("pages.terms.h1Hl")}</Link></li>
              <li><Link to="/privacidade" className="font-body text-sm text-white/60 hover:text-white transition-colors">{t("footer.privacy")}</Link></li>
              <li><Link to="/admin" className="font-body text-sm text-white/40 hover:text-white transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">{t("footer.contact")}</h4>
            <ul className="space-y-3">
              <li><a href="mailto:contacto@encodora.pt" className="font-body text-sm text-white/60 hover:text-white transition-colors">contacto@encodora.pt</a></li>
              <li><a href="#contato" className="font-body text-sm text-white/60 hover:text-white transition-colors">{t("footer.startProject")}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">{t("footer.social")}</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="font-body text-sm text-white/60 hover:text-white transition-colors">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="font-body text-sm text-white/60 hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://x.com" target="_blank" rel="noreferrer" className="font-body text-sm text-white/60 hover:text-white transition-colors">X / Twitter</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4">Logo</h4>
            <img src={LOGO_URL} alt="Encodora" className="h-12 w-auto bg-white" />
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
            © {new Date().getFullYear()} Encodora. Encoding the future.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-white/30">
            {t("footer.built")} · {new Date().getUTCFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}