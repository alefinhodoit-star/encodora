const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import { useLocale } from "@/lib/LocaleContext";

const LOGO_URL = "https://media.db.com/images/public/user_695abc5bcdd1ecf63669f010/d5736ecd5_upscalemedia-transformed.png";

const LINK_PATHS = [
  { key: "nav.services", to: "/servicos" },
  { key: "nav.process", href: "#processo" },
  { key: "nav.portfolio", to: "/portfolio" },
  { key: "nav.about", to: "/sobre" },
  { key: "nav.blog", to: "/blog" },
  { key: "nav.contact", href: "#contato" },
];

function NavLink({ link, onNavigate }) {
  const cls =
    "font-mono text-xs uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300";
  if (link.to) {
    return (
      <Link to={link.to} onClick={onNavigate} className={cls}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} onClick={onNavigate} className={cls}>
      {link.label}
    </a>
  );
}

export default function Navbar() {
  const { t } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const links = LINK_PATHS.map((l) => ({ ...l, label: t(l.key) }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <img src={LOGO_URL} alt="Encodora" className="h-9 w-auto bg-white" />
          <span className="font-heading font-bold text-white text-xl tracking-tight hidden sm:block">
            ENCODORA
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <NavLink key={l.to || l.href} link={l} />
          ))}
          <LanguageSelector />
        </div>

        <a
          href="#contato"
          className="hidden md:inline-flex items-center px-5 py-2.5 border border-white/20 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300"
        >
          {t("nav.cta")}
        </a>

        <button
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-5">
          <LanguageSelector onNavigate={() => setOpen(false)} />
          {links.map((l) => (
            <NavLink key={l.to || l.href} link={l} onNavigate={() => setOpen(false)} />
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="inline-flex w-fit items-center px-5 py-2.5 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.15em]"
          >
            {t("nav.cta")}
          </a>
        </div>
      )}
    </header>
  );
}