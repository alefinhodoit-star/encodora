const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import { Plus, X, ArrowUpRight, PenLine } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";
import { useTranslatedPosts } from "@/lib/useTranslatedPosts";
import Seo, { absoluteUrl } from "@/components/Seo";

const CATEGORIES = ["Engenharia", "Tendências", "Arquitetura", "IA & ML", "DevOps", "Carreira"];

export default function Blog() {
  const { t, locale } = useLocale();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTag, setActiveTag] = useState(null);
  const [tagPool, setTagPool] = useState([]);
  const { toast } = useToast();
  const { list: displayPosts } = useTranslatedPosts(posts);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Encodora · ${t("pages.blog.label")}`,
    description: t("pages.blog.sub"),
    url: absoluteUrl("/blog"),
    inLanguage: locale,
    blogPost: displayPosts.slice(0, 20).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.id}`),
      datePublished: p.created_date,
      author: { "@type": "Person", name: p.author || "Encodora" },
    })),
  };

  // Form state
  const [form, setForm] = useState({
    title: "",
    category: "Engenharia",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
  });

  const loadPosts = async () => {
    try {
      const data = activeTag
        ? await db.entities.BlogPost.filter({ tags: activeTag }, { sort: "-created_date", limit: 50 })
        : await db.entities.BlogPost.list("-created_date", 50);
      setPosts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [activeTag]);

  useEffect(() => {
    db.entities.BlogPost.list({ distinct: "tags" })
      .then((res) => setTagPool([...new Set((res.items || []).flat().filter(Boolean))]))
      .catch(console.error);
  }, []);

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    try {
      const words = form.content.trim().split(/\s+/).length;
      await db.entities.BlogPost.create({
        ...form,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        read_time: `${Math.max(1, Math.round(words / 200))} min`,
      });
      toast({ title: t("pages.blog.toastOkT"), description: t("pages.blog.toastOkD") });
      setForm({ title: "", category: "Engenharia", excerpt: "", content: "", author: "", tags: "" });
      setShowForm(false);
      await loadPosts();
    } catch (err) {
      toast({ title: t("pages.blog.toastErrT"), description: t("pages.blog.toastErrD"), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString(locale, { day: "2-digit", month: "short", year: "numeric" });

  const allTags = [...new Set([...tagPool, ...posts.flatMap((p) => p.tags || [])])];

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={`${t("pages.blog.h1Pre")}${t("pages.blog.h1Hl")}`}
        description={t("pages.blog.sub")}
        path="/blog"
        jsonLd={jsonLd}
      />
      {/* Header */}
      <header className="pt-32 pb-16 border-b border-white/10 neural-grid-fine">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            // Encodora · {t("pages.blog.label")}
          </span>
          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-8xl text-white tracking-tighter mt-4">
            {t("pages.blog.h1Pre")}
            <span className="text-white/30">{t("pages.blog.h1Hl")}</span>
          </h1>
          <p className="font-body text-sm md:text-base text-white/50 mt-6 max-w-xl">
            {t("pages.blog.sub")}
          </p>
        </div>
      </header>

      {/* Publish bar */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-8 flex items-center justify-between border-b border-white/10">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
          {t("pages.blog.count", { n: posts.length })}
        </span>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-[0.15em] transition-all duration-300"
        >
          {showForm ? <X size={14} /> : <PenLine size={14} />}
          {showForm ? t("pages.blog.close") : t("pages.blog.publish")}
        </button>
      </div>

      {/* Publish form */}
      {showForm && (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 border-b border-white/10">
          <form onSubmit={handlePublish} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <div className="md:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">{t("pages.blog.fTitle")}</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-white font-heading text-lg outline-none focus:border-white transition-colors"
                placeholder={t("pages.blog.fTitlePh")}
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">{t("pages.blog.fCategory")}</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-black border border-white/15 px-4 py-3 text-white text-sm outline-none focus:border-white transition-colors"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">{t("pages.blog.fAuthor")}</label>
              <input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-white text-sm outline-none focus:border-white transition-colors"
                placeholder={t("pages.blog.fAuthorPh")}
              />
            </div>
            <div>
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">{t("pages.blog.fTags")}</label>
              <input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-white text-sm outline-none focus:border-white transition-colors"
                placeholder="Tecnologia, Design, Metodologias ágeis"
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">{t("pages.blog.fExcerpt")}</label>
              <input
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-white text-sm outline-none focus:border-white transition-colors"
                placeholder={t("pages.blog.fExcerptPh")}
              />
            </div>
            <div className="md:col-span-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2">
                {t("pages.blog.fContent")}
              </label>
              <textarea
                required
                rows={8}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full bg-transparent border border-white/15 px-4 py-3 text-white text-sm font-mono outline-none focus:border-white transition-colors resize-y"
                placeholder={t("pages.blog.fContentPh")}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all disabled:opacity-50"
              >
                <Plus size={14} />
                {saving ? t("pages.blog.submitting") : t("pages.blog.submit")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tag filter */}
      {allTags.length > 0 && (
        <div className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 pt-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors ${
              activeTag === null ? "bg-white text-black border-white" : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {t("pages.blog.all")}
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t === activeTag ? null : t)}
              className={`font-mono text-[10px] uppercase tracking-wider px-3 py-1.5 border transition-colors ${
                activeTag === t ? "bg-white text-black border-white" : "border-white/15 text-white/60 hover:text-white"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      )}

      {/* Posts grid */}
      <section className="max-w-[1400px] mx-auto px-5 sm:px-6 lg:px-10 py-10 md:py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="border border-white/10 p-16 text-center">
            <p className="font-heading font-bold text-2xl text-white/40">{t("pages.blog.empty")}</p>
            <p className="font-body text-sm text-white/30 mt-3">
              {t("pages.blog.emptyHint")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10">
            {displayPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group bg-black p-5 sm:p-8 flex flex-col justify-between min-h-[220px] sm:min-h-[280px] hover:bg-white transition-colors duration-500"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 group-hover:text-black/50 border border-white/15 group-hover:border-black/20 px-2.5 py-1 transition-colors">
                      {post.category}
                    </span>
                    <ArrowUpRight size={16} className="text-white/30 group-hover:text-black transition-colors" />
                  </div>
                  <h2 className="font-heading font-bold text-xl text-white group-hover:text-black tracking-tight transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-white/50 group-hover:text-black/60 mt-3 leading-relaxed transition-colors">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.tags.map((t) => (
                        <span key={t} className="font-mono text-[10px] text-white/30 group-hover:text-black/40 transition-colors">
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-white/30 group-hover:text-black/40 mt-6 flex items-center gap-3 transition-colors">
                  <span>{post.author || t("pages.blog.team")}</span>
                  <span>·</span>
                  <span>{formatDate(post.created_date)}</span>
                  {post.read_time && (
                    <>
                      <span>·</span>
                      <span>{post.read_time}</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}