const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect } from "react";

export const SITE_NAME = "Encodora";
export const SITE_IMAGE =
  "https://media.db.com/images/public/user_695abc5bcdd1ecf63669f010/d5736ecd5_upscalemedia-transformed.png";
export const CONTACT_EMAIL = "contacto@encodora.pt";

const DEFAULT_TITLE = "Encodora · Engenharia de Software de Precisão";
const DEFAULT_DESCRIPTION =
  "Encodora é uma agência de engenharia de software: arquitetura backend, frontend, mobile, cloud/DevOps e IA — sistemas à escala global.";
const MAX_DESC = 160;

export function absoluteUrl(path = "/") {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return origin + path;
}

function setMeta(attribute, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Metadados por página (título, descrição, canónica, Open Graph, Twitter e JSON-LD).
 * `jsonLd` aceita um objeto ou um @graph completo.
 */
export default function Seo({
  title,
  description,
  path,
  type = "website",
  image = SITE_IMAGE,
  jsonLd,
  noindex = false,
  statusCode,
}) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : DEFAULT_TITLE;
  const desc = (description || DEFAULT_DESCRIPTION).replace(/\s+/g, " ").slice(0, MAX_DESC).trim();
  const json = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    const url = absoluteUrl(path || (typeof window !== "undefined" ? window.location.pathname : "/"));
    const lang = (document.documentElement.lang || "pt-BR").replace("-", "_");

    document.title = fullTitle;
    setMeta("name", "description", desc);
    setMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"
    );
    setMeta("name", "author", SITE_NAME);
    setLink("canonical", url);

    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", desc);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", title || SITE_NAME);
    setMeta("property", "og:locale", lang);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", desc);
    setMeta("name", "twitter:image", image);

    const id = "seo-jsonld";
    let script = document.getElementById(id);
    if (json) {
      if (!script) {
        script = document.createElement("script");
        script.id = id;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = json;
    } else if (script) {
      script.remove();
    }
  }, [fullTitle, desc, path, type, image, noindex, json]);

  // Código de estado real para crawlers em páginas inexistentes
  useEffect(() => {
    if (!statusCode) return;
    const el = document.createElement("meta");
    el.setAttribute("name", "prerender-status-code");
    el.setAttribute("content", String(statusCode));
    document.head.appendChild(el);
    return () => el.remove();
  }, [statusCode]);

  return null;
}