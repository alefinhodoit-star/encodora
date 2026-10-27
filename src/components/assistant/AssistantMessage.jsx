const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import ReactMarkdown from "react-markdown";
import { Image } from "@/components/ui/image";

const AVATAR_URL =
  "https://media.db.com/images/public/6aa99823ce4cb1eab1ea44fc/874ac10ca_Gemini_Generated_Image_r7u0rtr7u0rtr7u0.jpg";

const MD =
  "text-sm leading-relaxed break-words [&_strong]:text-white [&_a]:underline [&_code]:font-mono [&_code]:text-xs [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_ul]:list-disc [&_ul]:pl-4 [&_ol]:list-decimal [&_ol]:pl-4";

function ToolCallStatus({ toolCall }) {
  const status = toolCall.status;
  const isLead = /lead/i.test(toolCall.name || "");
  if (!isLead) return null;
  if (status === "failed" || status === "error") {
    return (
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1.5">
        Falha ao registrar briefing
      </p>
    );
  }
  if (status === "success" || status === "completed") {
    return (
      <p className="font-mono text-[10px] uppercase tracking-wider text-brand mt-1.5">
        Briefing registrado ✓
      </p>
    );
  }
  return (
    <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1.5">
      Registrando briefing...
    </p>
  );
}

export default function AssistantMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="h-8 w-8 shrink-0 rounded-full overflow-hidden border border-white/20">
          <Image src={AVATAR_URL} alt="Corvo" className="h-full w-full" />
        </div>
      )}
      <div
        className={
          isUser
            ? "max-w-[80%] bg-white text-black px-3.5 py-2.5 rounded-md"
            : "max-w-[80%] text-white/90"
        }
      >
        {isUser ? (
          <p className="text-sm leading-relaxed break-words">{message.content}</p>
        ) : (
          <>
            <ReactMarkdown className={MD}>{message.content}</ReactMarkdown>
            {message.tool_calls?.map((tc, i) => (
              <ToolCallStatus key={i} toolCall={tc} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}