import { useState } from "react";

const CATEGORIES = ["Engenharia", "Tendências", "Arquitetura", "IA & ML", "DevOps", "Carreira"];

const inputCls =
  "w-full bg-transparent border border-white/15 px-4 py-2.5 text-white text-sm outline-none focus:border-white transition-colors";
const labelCls = "font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2";

export default function BlogPostForm({ initial, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    category: initial?.category || "Engenharia",
    excerpt: initial?.excerpt || "",
    content: initial?.content || "",
    author: initial?.author || "",
  });
  const [tagsText, setTagsText] = useState((initial?.tags || []).join(", "));

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ ...form, tags: tagsText.split(",").map((t) => t.trim()).filter(Boolean) });
      }}
      className="border border-white/15 bg-[#0a0a0a] p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-5"
    >
      <div className="md:col-span-2 flex items-center justify-between">
        <h3 className="font-heading font-bold text-lg text-white">
          {initial ? "Editar artigo" : "Novo artigo"}
        </h3>
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">blog.md</span>
      </div>

      <div className="md:col-span-2">
        <label className={labelCls}>Título</label>
        <input required value={form.title} onChange={set("title")} className={`${inputCls} font-heading text-lg`} placeholder="O título do artigo" />
      </div>

      <div>
        <label className={labelCls}>Categoria</label>
        <select value={form.category} onChange={set("category")} className="w-full bg-black border border-white/15 px-4 py-2.5 text-white text-sm outline-none focus:border-white transition-colors">
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls}>Autor</label>
        <input value={form.author} onChange={set("author")} className={inputCls} placeholder="Nome do autor" />
      </div>

      <div>
        <label className={labelCls}>Tags (separadas por vírgula)</label>
        <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} className={inputCls} placeholder="Tecnologia, Design, Metodologias ágeis" />
      </div>

      <div className="md:col-span-2">
        <label className={labelCls}>Resumo</label>
        <input value={form.excerpt} onChange={set("excerpt")} className={inputCls} placeholder="Uma linha que resume o artigo" />
      </div>

      <div className="md:col-span-2">
        <label className={labelCls}>Conteúdo (Markdown)</label>
        <textarea required rows={8} value={form.content} onChange={set("content")} className={`${inputCls} font-mono resize-y`} placeholder="## Introdução&#10;&#10;Escreva o artigo em Markdown..." />
      </div>

      <div className="md:col-span-2 flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 border border-white/20 text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}