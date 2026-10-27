const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useRef, useState } from "react";

import { Image } from "@/components/ui/image";
import { Send, X } from "lucide-react";
import AssistantMessage from "./AssistantMessage";

const AGENT_NAME = "encodora_raven";
const AVATAR_URL =
  "https://media.db.com/images/public/6aa99823ce4cb1eab1ea44fc/874ac10ca_Gemini_Generated_Image_r7u0rtr7u0rtr7u0.jpg";

const WELCOME = {
  role: "assistant",
  content:
    "**Olá! Eu sou o Corvo**, assistente da Encodora.\n\nPosso explicar nossos serviços, tecnologias e metodologia — ou, se você tem um projeto em mente, registro seu briefing para o time entrar em contato.\n\nSobre o que você quer conversar?",
};

export default function RavenChat() {
  const [open, setOpen] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [starting, setStarting] = useState(false);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!conversation) return;
    const unsubscribe = db.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
      setSending(false);
    });
    return unsubscribe;
  }, [conversation]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, sending]);

  const handleOpen = () => {
    setOpen(true);
    if (!conversation) {
      setStarting(true);
      db.agents
        .createConversation({
          agent_name: AGENT_NAME,
          metadata: { name: "Conversa do site" },
        })
        .then(setConversation)
        .catch(console.error)
        .finally(() => setStarting(false));
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || !conversation || sending) return;
    setInput("");
    setSending(true);
    try {
      await db.agents.addMessage(conversation, { role: "user", content: text });
    } catch (err) {
      console.error(err);
      setSending(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Abrir assistente Corvo"
          className="fixed bottom-6 right-6 z-[60] group"
        >
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white/25 glow-cyan group-hover:scale-105 transition-transform">
            <Image src={AVATAR_URL} alt="Corvo — assistente da Encodora" className="h-full w-full" />
          </div>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-6 z-[60] h-[80vh] md:h-[620px] w-full md:w-[400px] bg-black border border-white/15 md:rounded-md flex flex-col overflow-hidden shadow-2xl">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10 bg-[#0a0a0a] shrink-0">
            <div className="h-10 w-10 rounded-full overflow-hidden border border-white/20 shrink-0">
              <Image src={AVATAR_URL} alt="Corvo" className="h-full w-full" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-bold text-white text-sm">Corvo</h3>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
                Assistente Encodora · online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              className="text-white/60 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            <AssistantMessage message={WELCOME} />
            {messages.map((m, i) => (
              <AssistantMessage key={m.id || i} message={m} />
            ))}
            {starting && (
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                Iniciando conversa...
              </p>
            )}
            {sending && (
              <div className="flex items-center gap-1.5 pt-1">
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 px-3 py-3 border-t border-white/10 bg-[#0a0a0a] shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Pergunte sobre serviços ou descreva seu projeto..."
              className="flex-1 bg-transparent border border-white/15 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand transition-colors"
            />
            <button
              type="submit"
              disabled={!conversation || sending || !input.trim()}
              aria-label="Enviar mensagem"
              className="h-10 w-10 shrink-0 flex items-center justify-center bg-white text-black hover:bg-brand transition-colors disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}