const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";

import { useLocale } from "@/lib/LocaleContext";

const LANG_NAMES = {
  "en-GB": "English (UK)",
  "pt-PT": "European Portuguese",
  "pt-BR": "Brazilian Portuguese",
  "es-ES": "Spanish (Spain)",
  "fr-FR": "French (France)",
};

const CACHE_PREFIX = "encodora.posttrans.";

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

// Traduz título/resumo/categoria de todos os posts numa única chamada de IA
export function useTranslatedPosts(posts) {
  const { locale } = useLocale();
  const [list, setList] = useState([]);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (!posts || posts.length === 0) {
      setList(posts || []);
      return;
    }
    const target = LANG_NAMES[locale] || "English";
    let cancelled = false;

    const applyCache = posts.map((p) => {
      const cached = readCache(`${CACHE_PREFIX}${p.id}.${locale}`);
      return cached ? { ...p, ...cached } : p;
    });
    setList(applyCache);

    const missing = posts.filter((p) => !readCache(`${CACHE_PREFIX}${p.id}.${locale}`));
    if (missing.length === 0) return;

    setTranslating(true);
    (async () => {
      try {
        const res = await db.integrations.Core.InvokeLLM({
          prompt: `Translate the following blog post metadata into ${target}. Keep technical terms natural. Return ONLY a JSON object with a "posts" array, one object per input post, in the same order, with keys "i" (the input index), "title", "excerpt", "category". Posts JSON:\n${JSON.stringify(
            missing.map((p, i) => ({ i, title: p.title, excerpt: p.excerpt || "", category: p.category || "" }))
          )}`,
          response_json_schema: {
            type: "object",
            properties: {
              posts: {
                type: "array",
                items: {
                  type: "object",
                  properties: { i: { type: "integer" }, title: { type: "string" }, excerpt: { type: "string" }, category: { type: "string" } },
                  required: ["i", "title"],
                },
              },
            },
            required: ["posts"],
          },
        });
        if (cancelled || !res || !Array.isArray(res.posts)) return;
        const updates = {};
        res.posts.forEach((item) => {
          const p = missing[item.i];
          if (!p) return;
          const clean = {
            title: item.title || p.title,
            excerpt: item.excerpt || p.excerpt,
            category: item.category || p.category,
          };
          writeCache(`${CACHE_PREFIX}${p.id}.${locale}`, clean);
          updates[p.id] = clean;
        });
        setList((prev) => prev.map((p) => (updates[p.id] ? { ...p, ...updates[p.id] } : p)));
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setTranslating(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [posts, locale]);

  return { list, translating };
}

// Traduz o post completo (título, resumo, categoria e conteúdo markdown)
export function useTranslatedPost(post) {
  const { locale } = useLocale();
  const [text, setText] = useState(null);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (!post) {
      setText(null);
      return;
    }
    const target = LANG_NAMES[locale] || "English";
    let cancelled = false;

    const cached = readCache(`${CACHE_PREFIX}${post.id}.${locale}.full`);
    if (cached) {
      setText(cached);
      return;
    }
    setText(null);
    setTranslating(true);
    (async () => {
      try {
        const res = await db.integrations.Core.InvokeLLM({
          prompt: `Translate this blog post into ${target}. Translate the title, excerpt and category naturally, and translate the full content, preserving ALL markdown formatting exactly (headings, lists, code blocks, links, bold). If a part is already in ${target}, keep it as-is. Return JSON with keys "title", "excerpt", "category", "content". Post JSON:\n${JSON.stringify({
            title: post.title,
            excerpt: post.excerpt || "",
            category: post.category || "",
            content: post.content,
          })}`,
          response_json_schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              excerpt: { type: "string" },
              category: { type: "string" },
              content: { type: "string" },
            },
            required: ["title", "content"],
          },
        });
        if (cancelled || !res) return;
        const clean = {
          title: res.title || post.title,
          excerpt: res.excerpt || post.excerpt,
          category: res.category || post.category,
          content: res.content || post.content,
        };
        writeCache(`${CACHE_PREFIX}${post.id}.${locale}.full`, clean);
        setText(clean);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setTranslating(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [post, locale]);

  return { text, translating };
}

// Traduz os cargos dos depoentes (array estático) numa única chamada de IA
export function useTranslatedRoles(roles) {
  const { locale } = useLocale();
  const key = roles.join("|");
  const [list, setList] = useState(roles);

  useEffect(() => {
    const cacheKey = `${CACHE_PREFIX}roles.${locale}`;
    const cached = readCache(cacheKey);
    if (cached && Array.isArray(cached) && cached.length === roles.length) {
      setList(cached);
      return;
    }
    setList(roles);
    const target = LANG_NAMES[locale] || "English";
    let cancelled = false;
    (async () => {
      try {
        const res = await db.integrations.Core.InvokeLLM({
          prompt: `Translate each job title below into ${target}. Keep the "· Company" part unchanged (company names stay as-is). Return ONLY a JSON object { "roles": ["...", ...] } with exactly ${roles.length} items, in the same order. Items:\n${JSON.stringify(roles)}`,
          response_json_schema: {
            type: "object",
            properties: {
              roles: { type: "array", items: { type: "string" } },
            },
            required: ["roles"],
          },
        });
        if (cancelled || !res || !Array.isArray(res.roles) || res.roles.length !== roles.length) return;
        const clean = res.roles.map((r, i) => r || roles[i]);
        writeCache(cacheKey, clean);
        setList(clean);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [key, locale]);

  return list;
}

// Traduz título, cliente e resultados dos projetos numa única chamada (listagem)
export function useTranslatedProjects(projects) {
  const { locale } = useLocale();
  const [list, setList] = useState([]);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (!projects || projects.length === 0) {
      setList(projects || []);
      return;
    }
    const target = LANG_NAMES[locale] || "English";
    let cancelled = false;

    const applyCache = projects.map((p) => {
      const cached = readCache(`${CACHE_PREFIX}proj.${p.id}.${locale}`);
      return cached ? { ...p, ...cached } : p;
    });
    setList(applyCache);

    const missing = projects.filter((p) => !readCache(`${CACHE_PREFIX}proj.${p.id}.${locale}`));
    if (missing.length === 0) return;

    setTranslating(true);
    (async () => {
      try {
        const res = await db.integrations.Core.InvokeLLM({
          prompt: `Translate the following project metadata into ${target}. Keep technical terms and company/product names unchanged. Return ONLY a JSON object with a "projects" array, one object per input post, in the same order, with keys "i" (the input index), "title", "client", "metric_label", "result". Posts JSON:\n${JSON.stringify(
            missing.map((p, i) => ({
              i,
              title: p.title,
              client: p.client || "",
              metric_label: p.metric_label || "",
              result: p.result || "",
            }))
          )}`,
          response_json_schema: {
            type: "object",
            properties: {
              projects: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    i: { type: "integer" },
                    title: { type: "string" },
                    client: { type: "string" },
                    metric_label: { type: "string" },
                    result: { type: "string" },
                  },
                  required: ["i", "title"],
                },
              },
            },
            required: ["projects"],
          },
        });
        if (cancelled || !res || !Array.isArray(res.projects)) return;
        const updates = {};
        res.projects.forEach((item) => {
          const p = missing[item.i];
          if (!p) return;
          const clean = {
            title: item.title || p.title,
            client: item.client || p.client,
            metric_label: item.metric_label || p.metric_label,
            result: item.result || p.result,
          };
          writeCache(`${CACHE_PREFIX}proj.${p.id}.${locale}`, clean);
          updates[p.id] = clean;
        });
        setList((prev) => prev.map((p) => (updates[p.id] ? { ...p, ...updates[p.id] } : p)));
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setTranslating(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [projects, locale]);

  return { list, translating };
}

// Traduz o projeto completo (desafio, solução, resultado) na página de detalhe
export function useTranslatedProject(project) {
  const { locale } = useLocale();
  const [text, setText] = useState(null);
  const [translating, setTranslating] = useState(false);

  useEffect(() => {
    if (!project) {
      setText(null);
      return;
    }
    const target = LANG_NAMES[locale] || "English";
    let cancelled = false;

    const cached = readCache(`${CACHE_PREFIX}proj.${project.id}.${locale}.full`);
    if (cached) {
      setText(cached);
      return;
    }
    setText(null);
    setTranslating(true);
    (async () => {
      try {
        const res = await db.integrations.Core.InvokeLLM({
          prompt: `Translate this project case study into ${target}. Keep technical terms, company and product names unchanged. Return JSON with keys "title", "client", "category", "challenge", "solution", "result", "metric_label". If a part is already in ${target}, keep it as-is. Project JSON:\n${JSON.stringify({
            title: project.title,
            client: project.client || "",
            category: project.category || "",
            challenge: project.challenge || "",
            solution: project.solution || "",
            result: project.result || "",
            metric_label: project.metric_label || "",
          })}`,
          response_json_schema: {
            type: "object",
            properties: {
              title: { type: "string" },
              client: { type: "string" },
              category: { type: "string" },
              challenge: { type: "string" },
              solution: { type: "string" },
              result: { type: "string" },
              metric_label: { type: "string" },
            },
            required: ["title"],
          },
        });
        if (cancelled || !res) return;
        const clean = {
          title: res.title || project.title,
          client: res.client || project.client,
          category: res.category || project.category,
          challenge: res.challenge || project.challenge,
          solution: res.solution || project.solution,
          result: res.result || project.result,
          metric_label: res.metric_label || project.metric_label,
        };
        writeCache(`${CACHE_PREFIX}proj.${project.id}.${locale}.full`, clean);
        setText(clean);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setTranslating(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [project, locale]);

  return { text, translating };
}