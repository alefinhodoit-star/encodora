const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Upload } from "lucide-react";

const inputCls =
  "w-full bg-transparent border border-white/15 px-4 py-2.5 text-white text-sm outline-none focus:border-white transition-colors";
const labelCls = "font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2";

export default function ProjectForm({ initial, onSubmit, onCancel, saving }) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    client: initial?.client || "",
    category: initial?.category || "",
    image_url: initial?.image_url || "",
    challenge: initial?.challenge || "",
    solution: initial?.solution || "",
    result: initial?.result || "",
    metric: initial?.metric || "",
    metric_label: initial?.metric_label || "",
    stack: (initial?.stack || []).join(", "),
  });
  const [uploading, setUploading] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await db.integrations.Core.UploadPublicFile({ file });
      setForm((f) => ({ ...f, image_url: file_url }));
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,