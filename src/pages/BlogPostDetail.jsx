const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import ReactMarkdown from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { useLocale } from "@/lib/LocaleContext";
import { useTranslatedPost } from "@/lib/useTranslatedPosts";
import Seo, { absoluteUrl, SITE_IMAGE } from "@/components/Seo";

export default function BlogPostDetail() {
  const { t, locale } = useLocale();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await db.entities.BlogPost.get(id);
        setPost(data);
        db.entities.BlogPost.updateMany({ id }, { $inc: { views: 1 } }).catch(console.error);
      } catch (e) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const formatDate = (d) =>
    new Date(d).toLocaleDateString(locale, { day: "2-digit", month: "long", year: "numeric" });

  const { text: translated, translating: isTranslating } = useTranslatedPost(post);
  const display = translated || post;

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6 px-6">
        <Seo title={t("pages.blogDetail.notFound")} noindex statusCode={404} />
        <p className="font-heading font-extrabold text-4xl text-white">{t("pages.blogDetail.notFound")}</p>
        <Link
          to="/blog"
          className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white border border-white/20 px-5 py-2.5 transition-colors"
        >
          {t("pages.blogDetail.back")}
        </Link>
      </div>
    );
  }

  const seoJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: display.title,
    description: display.excerpt || t("pages.blog.sub"),
    image: SITE_IMAGE,
    datePublished: post.created_date,
    dateModified: post.updated_date || post.created_date,
    author: { "@type": "Person", name: post.author || "Encodora" },
    publisher: {
      "@type": "Organization",
      name: "Encodora",
      logo: { "@type": "ImageObject", url: SITE_IMAGE },
    },
    articleSection: display.category,
    keywords: (post.tags || []).join(", "),
    inLanguage: locale,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.id}`) },
  };

  return (
    <div className="bg-black min-h-screen">
      <Seo
        title={display.title}
        description={display.excerpt}
        path={`/blog/${post.id}`}
        type="article"
        jsonLd={seoJsonLd}
      />
      <header className="pt-32 pb-12 border-b border-white/10 neural-grid-fine">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            Blog
          </Link>
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-8 flex flex-wrap items-center gap-3">
            <span className="border border-white/15 px-2.5 py-1">{display.category}</span>
            <span>{post.author || t("pages.blog.team")}</span>
            <span>·</span>
            <span>{formatDate(post.created_date)}</span>
            {post.read_time && (
              <>
                <span>·</span>
                <span>{t("pages.blogDetail.readTime", { rt: post.read_time })}</span>
              </>
            )}
          </div>
          <h1 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight mt-6">
            {display.title}
          </h1>
          {display.excerpt && (
            <p className="font-body text-base text-white/50 mt-6 leading-relaxed">{display.excerpt}</p>
          )}
          {isTranslating && (
            <div className="flex items-center gap-1.5 mt-3" aria-label="traduzindo">
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse [animation-delay:200ms]" />
              <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse [animation-delay:400ms]" />
            </div>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((t) => (
                <span key={t} className="font-mono text-[10px] uppercase tracking-wider text-white/50 border border-white/15 px-2.5 py-1">
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-6 py-14">
        <div className="prose-invert text-white/80 font-body text-base leading-[1.8] space-y-6 [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-white [&_h2]:text-2xl [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:font-heading [&_h3]:font-bold [&_h3]:text-white [&_h3]:text-xl [&_h3]:mt-8 [&_h3]:mb-3 [&_strong]:text-white [&_a]:text-white [&_a]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:border-l-2 [&_blockquote]:border-white/30 [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_code]:font-mono [&_code]:text-sm [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_pre]:bg-white/5 [&_pre]:border [&_pre]:border-white/10 [&_pre]:p-4 [&_pre_code]:bg-transparent">
          <ReactMarkdown>{display.content}</ReactMarkdown>
        </div>
      </article>

      <div className="max-w-3xl mx-auto px-6 pb-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:bg-white hover:text-black text-white font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300"
        >
          <ArrowLeft size={14} />
          {t("pages.blogDetail.all")}
        </Link>
      </div>
    </div>
  );
}