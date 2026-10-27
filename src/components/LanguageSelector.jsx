import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/lib/LocaleContext";
import { ChevronDown, Globe } from "lucide-react";

export default function LanguageSelector({ onNavigate }) {
  const { locale, setLocale, locales } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current = locales.find((l) => l.code === locale) || locales[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Idioma"
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white/60 hover:text-white transition-colors duration-300"
      >
        <Globe size={13} />
        {current.short}
        <ChevronDown size={12} className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3 z-50 min-w-[240px] border border-white/15 bg-black py-1 shadow-2xl">
          {locales.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
                onNavigate?.();
              }}
              className={`flex w-full items-center justify-between gap-4 px-4 py-2.5 font-mono text-xs transition-colors ${
                l.code === locale
                  ? "bg-white text-black"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>
                {l.label} <span className="opacity-50">· {l.region}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}