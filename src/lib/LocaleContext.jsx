import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_LOCALE, DICTS, LOCALES } from "@/lib/i18n";

const STORAGE_KEY = "encodora.locale";

const LocaleContext = createContext(null);

function localeFromCountry(countryCode) {
  const map = {
    GB: "en-GB",
    US: "en-GB",
    PT: "pt-PT",
    BR: "pt-BR",
    ES: "es-ES",
    FR: "fr-FR",
  };
  return map[countryCode] || DEFAULT_LOCALE;
}

function getSavedLocale() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(() => getSavedLocale() || DEFAULT_LOCALE);

  const setLocale = useCallback((code) => {
    setLocaleState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* noop */
    }
  }, []);

  // IP apenas como sugestão inicial — nunca sobrescreve uma escolha salva
  useEffect(() => {
    if (getSavedLocale()) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);
    fetch("https://ipwho.is/", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => {
        if (d && d.country_code) setLocaleState(localeFromCountry(d.country_code));
      })
      .catch(() => {});
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const lookup = useCallback(
    (key) => {
      const walk = (dict) => key.split(".").reduce((acc, part) => (acc == null ? undefined : acc[part]), dict);
      const val = walk(DICTS[locale]);
      if (val !== undefined) return val;
      return walk(DICTS[DEFAULT_LOCALE]);
    },
    [locale]
  );

  const t = useCallback(
    (key, vars) => {
      let val = lookup(key);
      if (typeof val !== "string") return key;
      if (vars) {
        for (const k of Object.keys(vars)) {
          val = val.split(`{${k}}`).join(String(vars[k]));
        }
      }
      return val;
    },
    [lookup]
  );

  // Para arrays/objetos (listas de conteúdo traduzido)
  const tr = useCallback((key) => lookup(key), [lookup]);

  const meta = useMemo(
    () => LOCALES.find((l) => l.code === locale) || LOCALES.find((l) => l.code === DEFAULT_LOCALE),
    [locale]
  );

  const formatMoney = useCallback(
    (value) =>
      new Intl.NumberFormat(locale, { style: "currency", currency: meta.currency }).format(value),
    [locale, meta]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, tr, currency: meta.currency, currencySymbol: meta.symbol, formatMoney, locales: LOCALES }),
    [locale, setLocale, t, tr, meta, formatMoney]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale deve ser usado dentro de LocaleProvider");
  return ctx;
}