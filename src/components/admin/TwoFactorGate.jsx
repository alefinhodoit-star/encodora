const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import { Mail, ShieldCheck } from "lucide-react";

const COOLDOWN = 60;

const generateCode = () => String(Math.floor(100000 + Math.random() * 900000));

export default function TwoFactorGate({ email, onVerified }) {
  const [code, setCode] = useState(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const sendCode = async () => {
    setSending(true);
    const generated = generateCode();
    try {
      await db.integrations.Core.SendEmail({
        to: email,
        subject: "Encodora · Código de acesso ao painel",
        text: `Seu código de verificação é: ${generated}\n\nUm novo código é gerado a cada tentativa de acesso. Se não foi você, ignore este e-mail.`,
      });
      setCode(generated);
      setSent(true);
      setCooldown(COOLDOWN);
      toast({
        title: "Código enviado",
        description: `Enviamos um código de 6 dígitos para ${email}.`,
      });
    } catch (e) {
      toast({
        title: "Erro ao enviar o código",
        description: "Tente novamente em instantes.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    sendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!code || input.length !== 6) return;
    if (input === code) {
      onVerified();
    } else {
      toast({
        title: "Código incorreto",
        description: "Verifique o código recebido por e-mail e tente novamente.",
        variant: "destructive",
      });
      setInput("");
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 neural-grid-fine">
      <div className="w-full max-w-md border border-white/15 bg-[#0a0a0a] p-8 md:p-10">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 border border-white/15 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} className="text-brand" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
              Encodora · Painel admin
            </span>
            <h1 className="font-heading font-extrabold text-2xl text-white tracking-tight">
              Verificação em 2 etapas
            </h1>
          </div>
        </div>

        <p className="font-body text-sm text-white/50 mt-6 leading-relaxed">
          {sent
            ? `Enviamos um código de 6 dígitos para ${email}.`
            : "Gerando e enviando seu código de verificação..."}
        </p>

        <form onSubmit={handleVerify} className="mt-6 space-y-4">
          <div>
            <label className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
              Código de verificação
            </label>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="000000"
              inputMode="numeric"
              autoFocus
              disabled={!code}
              className="w-full bg-transparent border border-white/15 px-4 py-3 text-center font-mono text-2xl tracking-[0.5em] text-white outline-none focus:border-brand transition-colors disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={input.length !== 6 || sending}
            className="w-full px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all disabled:opacity-40"
          >
            Verificar e acessar
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            onClick={sendCode}
            disabled={sending || cooldown > 0}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-white/50 hover:text-white transition-colors disabled:text-white/30"
          >
            <Mail size={12} />
            {sending ? "Enviando..." : cooldown > 0 ? `Reenviar em ${cooldown}s` : "Reenviar código"}
          </button>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30 text-right">
            Novo código a cada acesso
          </span>
        </div>
      </div>
    </div>
  );
}