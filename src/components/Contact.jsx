const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState, useRef, useEffect } from "react";
import Reveal from "@/components/Reveal";
import { useLocale } from "@/lib/LocaleContext";

const LOGO_URL = "https://media.db.com/images/public/user_695abc5bcdd1ecf63669f010/d5736ecd5_upscalemedia-transformed.png";

export default function Contact() {
  const { t, locale } = useLocale();
  const initLines = () => [
    { type: "system", text: t("home.osStart") },
    { type: "system", text: t("home.enterName") },
  ];
  const [lines, setLines] = useState(initLines);
  const [input, setInput] = useState("");
  const [stage, setStage] = useState("name"); // name -> email -> project -> done
  const [data, setData] = useState({ name: "", email: "", project: "" });
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  // Reinicia a sessão do terminal ao trocar de idioma (antes do preenchimento começar)
  useEffect(() => {
    if (stage === "name") setLines(initLines());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = input.trim();
    if (!value) return;

    const newLines = [...lines, { type: "user", text: value }];

    if (stage === "name") {
      setData({ ...data, name: value });
      newLines.push({ type: "system", text: t("home.askEmail", { name: value }) });
      setStage("email");
    } else if (stage === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        newLines.push({ type: "error", text: t("home.invalidEmail") });
      } else {
        setData({ ...data, email: value });
        newLines.push({ type: "system", text: t("home.askProject") });
        setStage("project");
      }
    } else if (stage === "project") {
      const finalData = { ...data, project: value };
      setData(finalData);
      newLines.push({ type: "success", text: t("home.received") });
      newLines.push({ type: "system", text: t("home.reply", { email: finalData.email }) });
      newLines.push({ type: "system", text: t("home.end") });
      setStage("done");
    }

    setLines(newLines);
    setInput("");
  };

  const prompt = () => {
    if (stage === "name") return t("home.promptName");
    if (stage === "email") return t("home.promptEmail");
    if (stage === "project") return t("home.promptProject");
    return t("home.promptDone");
  };

  const reset = () => {
    setLines([
      { type: "system", text: t("home.osRestart") },
      { type: "system", text: t("home.enterName") },
    ]);
    setStage("name");
    setData({ name: "", email: "", project: "" });
    setInput("");
  };

  return (
    <section id="contato" className="relative bg-black py-24 md:py-32 border-t border-white/10 neural-grid-fine">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: info */}
          <Reveal>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              [ 05 ] {t("sections.contact")}
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-6xl text-white tracking-tight mt-4">
              {t("home.contactH2Pre")} <br />
              <span className="text-white/30">{t("home.contactH2Hl")}</span>
              {t("home.contactH2Post")}
            </h2>
            <p className="font-body text-sm text-white/50 mt-6 max-w-md leading-relaxed">
              {t("home.contactSub")}
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 w-20">{t("home.lblEmail")}</span>
                <a href="mailto:contacto@encodora.pt" className="font-mono text-sm text-white hover:text-white/70 transition-colors">
                  contacto@encodora.pt
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 w-20">{t("home.lblLocal")}</span>
                <span className="font-mono text-sm text-white/70">{t("home.location")}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 w-20">{t("home.lblStatus")}</span>
                <span className="font-mono text-sm text-white/70 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  {t("home.accepting")}
                </span>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10">
              <img src={LOGO_URL} alt="Encodora" className="h-12 w-auto bg-white" />
            </div>
          </Reveal>

          {/* Right: terminal */}
          <div className="border border-white/15 bg-[#0a0a0a]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
                <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
                <span className="w-2.5 h-2.5 rounded-full border border-white/30" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                encodora — bash
              </span>
            </div>

            <div
              ref={scrollRef}
              className="p-5 md:p-6 h-[360px] overflow-y-auto font-mono text-sm space-y-2"
              aria-live="polite"
            >
              {lines.map((line, i) => (
                <div key={i} className="flex gap-2">
                  {line.type === "user" && (
                    <>
                      <span className="text-white/30 select-none">{"visitor@encodora:~$"}</span>
                      <span className="text-white">{line.text}</span>
                    </>
                  )}
                  {line.type === "system" && (
                    <span className="text-white/50">{line.text}</span>
                  )}
                  {line.type === "success" && (
                    <span className="text-green-400">{line.text}</span>
                  )}
                  {line.type === "error" && (
                    <span className="text-red-400">{line.text}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-5 md:px-6 py-4 border-t border-white/10 bg-black">
              {stage !== "done" ? (
                <>
                  <span className="font-mono text-sm text-white/30 select-none whitespace-nowrap">
                    {prompt()}:
                  </span>
                  <input
                    ref={inputRef}
                    type={stage === "email" ? "email" : "text"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-1 bg-transparent outline-none font-mono text-base md:text-sm text-white placeholder-white/20"
                    placeholder={t("home.inputPh")}
                    aria-label={prompt()}
                    autoComplete="off"
                  />
                  <span className="cursor-blink text-white">▊</span>
                </>
              ) : (
                <button
                  type="button"
                  onClick={reset}
                  className="font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white transition-colors"
                >
                  {t("home.newSession")}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}