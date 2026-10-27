const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useToast } from "@/components/ui/use-toast";
import BlogPostForm from "@/components/admin/BlogPostForm";
import ProjectForm from "@/components/admin/ProjectForm";
import TwoFactorGate from "@/components/admin/TwoFactorGate";
import StatsTab from "@/components/admin/StatsTab";
import { ArrowLeft, BarChart3, FileText, Layers, LogOut, Pencil, Plus, ShieldCheck, Trash2, Users } from "lucide-react";

const formatDate = (d) => new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

export default function Admin() {
  const [tab, setTab] = useState("stats");
  const [posts, setPosts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postForm, setPostForm] = useState(null); // null | "new" | registro
  const [projectForm, setProjectForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [verified, setVerified] = useState(
    () => sessionStorage.getItem("encodora_admin_2fa") === "ok"
  );
  const { toast } = useToast();

  const loadAll = async () => {
    try {
      const [p, pr, l] = await Promise.all([
        db.entities.BlogPost.list("-created_date", 100),
        db.entities.PortfolioProject.list("-created_date", 100),
        db.entities.Lead.list("-created_date", 100),
      ]);
      setPosts(p);
      setProjects(pr);
      setLeads(l);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    db.auth
      .me()
      .then(setUser)
      .catch(console.error)
      .finally(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    if (verified) loadAll();
  }, [verified]);

  const handleVerified = () => {
    sessionStorage.setItem("encodora_admin_2fa", "ok");
    setVerified(true);
  };

  const handleSignOut = async () => {
    sessionStorage.removeItem("encodora_admin_2fa");
    await db.auth.logout("/");
  };

  const savePost = async (data) => {
    setSaving(true);
    try {
      if (postForm === "new") {
        const words = (data.content || "").trim().split(/\s+/).length;
        await db.entities.BlogPost.create({
          ...data,
          read_time: `${Math.max(1, Math.round(words / 200))} min`,
        });
        toast({ title: "Artigo publicado" });
      } else {
        await db.entities.BlogPost.update(postForm.id, data);
        toast({ title: "Artigo atualizado" });
      }
      setPostForm(null);
      await loadAll();
    } catch (e) {
      toast({ title: "Erro ao salvar artigo", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const deletePost = async (post) => {
    if (!window.confirm(`Excluir o artigo "${post.title}"?`)) return;
    await db.entities.BlogPost.delete(post.id);
    toast({ title: "Artigo excluído" });
    loadAll();
  };

  const saveProject = async (data) => {
    setSaving(true);
    try {
      if (projectForm === "new") {
        await db.entities.PortfolioProject.create(data);
        toast({ title: "Projeto criado" });
      } else {
        await db.entities.PortfolioProject.update(projectForm.id, data);
        toast({ title: "Projeto atualizado" });
      }
      setProjectForm(null);
      await loadAll();
    } catch (e) {
      toast({ title: "Erro ao salvar projeto", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const deleteProject = async (project) => {
    if (!window.confirm(`Excluir o projeto "${project.title}"?`)) return;
    await db.entities.PortfolioProject.delete(project.id);
    toast({ title: "Projeto excluído" });
    loadAll();
  };

  const deleteLead = async (lead) => {
    if (!window.confirm(`Excluir o lead "${lead.name}"?`)) return;
    await db.entities.Lead.delete(lead.id);
    toast({ title: "Lead excluído" });
    loadAll();
  };

  if (authLoading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="font-heading font-extrabold text-4xl text-white tracking-tighter">Acesso restrito</p>
        <p className="font-body text-sm text-white/50 max-w-sm">
          Esta área é exclusiva de administradores da Encodora.
        </p>
        <Link
          to="/"
          className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white border border-white/20 px-5 py-2.5 transition-colors"
        >
          Voltar ao site
        </Link>
      </div>
    );
  }

  if (!verified) {
    return <TwoFactorGate email={user.email} onVerified={handleVerified} />;
  }

  return (
    <div className="bg-black min-h-screen">
      <header className="pt-32 pb-10 border-b border-white/10 neural-grid-fine">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={12} />
            Voltar ao site
          </Link>
          <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-white tracking-tighter mt-6">
            Painel <span className="text-white/30">admin</span>
          </h1>
          <p className="font-body text-sm text-white/50 mt-4">
            Gerencie artigos do blog, projetos do portfólio e leads captados pelo assistente Corvo.
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-brand" />
              {user.email} · sessão verificada
            </span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 hover:bg-white hover:text-black text-white font-mono text-[10px] uppercase tracking-[0.15em] transition-all"
            >
              <LogOut size={12} />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10">
        {/* Tabs */}
        <div className="flex items-center gap-px bg-white/10 w-fit mb-8 flex-wrap">
          <button
            onClick={() => { setTab("stats"); setPostForm(null); setProjectForm(null); }}
            className={`flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${tab === "stats" ? "bg-white text-black" : "bg-black text-white/60 hover:text-white"}`}
          >
            <BarChart3 size={14} />
            Estatísticas
          </button>
          <button
            onClick={() => { setTab("posts"); setPostForm(null); setProjectForm(null); }}
            className={`flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${tab === "posts" ? "bg-white text-black" : "bg-black text-white/60 hover:text-white"}`}
          >
            <FileText size={14} />
            Blog · {posts.length}
          </button>
          <button
            onClick={() => { setTab("projects"); setPostForm(null); setProjectForm(null); }}
            className={`flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${tab === "projects" ? "bg-white text-black" : "bg-black text-white/60 hover:text-white"}`}
          >
            <Layers size={14} />
            Portfólio · {projects.length}
          </button>
          <button
            onClick={() => { setTab("leads"); setPostForm(null); setProjectForm(null); }}
            className={`flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${tab === "leads" ? "bg-white text-black" : "bg-black text-white/60 hover:text-white"}`}
          >
            <Users size={14} />
            Leads · {leads.length}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        ) : tab === "stats" ? (
          <StatsTab posts={posts} projects={projects} leads={leads} />
        ) : tab === "posts" ? (
          <div>
            {!postForm && (
              <button
                onClick={() => setPostForm("new")}
                className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all"
              >
                <Plus size={14} />
                Novo artigo
              </button>
            )}
            {postForm && (
              <div className="mb-8">
                <BlogPostForm
                  initial={postForm === "new" ? null : postForm}
                  onSubmit={savePost}
                  onCancel={() => setPostForm(null)}
                  saving={saving}
                />
              </div>
            )}
            <div>
              {posts.map((post) => (
                <div key={post.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-t border-white/10">
                  <div className="min-w-0">
                    <h3 className="font-heading font-bold text-white text-base truncate">{post.title}</h3>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1 flex flex-wrap gap-2">
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.author || "Equipe Encodora"}</span>
                      <span>·</span>
                      <span>{formatDate(post.created_date)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/blog/${post.id}`}
                      className="px-4 py-2 border border-white/15 font-mono text-[10px] uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => { setPostForm(post); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="p-2 border border-white/15 text-white/60 hover:bg-white hover:text-black transition-all"
                      aria-label="Editar artigo"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deletePost(post)}
                      className="p-2 border border-white/15 text-white/60 hover:bg-white hover:text-black transition-all"
                      aria-label="Excluir artigo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <p className="font-body text-sm text-white/40 py-10 text-center">Nenhum artigo publicado.</p>
              )}
            </div>
          </div>
        ) : tab === "leads" ? (
          <div>
            {leads.map((lead) => (
              <div key={lead.id} className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 py-4 border-t border-white/10">
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-white text-base">{lead.name}</h3>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1 flex flex-wrap gap-2">
                    {lead.email && <span>{lead.email}</span>}
                    {lead.company && (
                      <>
                        <span>·</span>
                        <span>{lead.company}</span>
                      </>
                    )}
                    <span>·</span>
                    <span>{formatDate(lead.created_date)}</span>
                  </div>
                  {lead.message && (
                    <p className="font-body text-sm text-white/50 mt-2 max-w-2xl leading-relaxed">{lead.message}</p>
                  )}
                  {lead.summary && (
                    <p className="font-mono text-[10px] uppercase tracking-wider text-brand mt-2">{lead.summary}</p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className="px-4 py-2 border border-white/15 font-mono text-[10px] uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                    >
                      Responder
                    </a>
                  )}
                  <button
                    onClick={() => deleteLead(lead)}
                    className="p-2 border border-white/15 text-white/60 hover:bg-white hover:text-black transition-all"
                    aria-label="Excluir lead"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
            {leads.length === 0 && (
              <p className="font-body text-sm text-white/40 py-10 text-center">
                Nenhum lead captado ainda — converse com o Corvo no site.
              </p>
            )}
          </div>
        ) : (
          <div>
            {!projectForm && (
              <button
                onClick={() => setProjectForm("new")}
                className="mb-8 inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs uppercase tracking-[0.2em] hover:bg-white/80 transition-all"
              >
                <Plus size={14} />
                Novo projeto
              </button>
            )}
            {projectForm && (
              <div className="mb-8">
                <ProjectForm
                  initial={projectForm === "new" ? null : projectForm}
                  onSubmit={saveProject}
                  onCancel={() => setProjectForm(null)}
                  saving={saving}
                />
              </div>
            )}
            <div>
              {projects.map((project) => (
                <div key={project.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-4 border-t border-white/10">
                  <div className="flex items-center gap-4 min-w-0">
                    {project.image_url && (
                      <img src={project.image_url} alt={project.title} className="h-12 w-20 object-cover border border-white/10 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <h3 className="font-heading font-bold text-white text-base truncate">{project.title}</h3>
                      <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1 flex flex-wrap gap-2">
                        <span>{project.category || "—"}</span>
                        <span>·</span>
                        <span>{project.client || "—"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="px-4 py-2 border border-white/15 font-mono text-[10px] uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                    >
                      Ver
                    </Link>
                    <button
                      onClick={() => { setProjectForm(project); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className="p-2 border border-white/15 text-white/60 hover:bg-white hover:text-black transition-all"
                      aria-label="Editar projeto"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => deleteProject(project)}
                      className="p-2 border border-white/15 text-white/60 hover:bg-white hover:text-black transition-all"
                      aria-label="Excluir projeto"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && (
                <p className="font-body text-sm text-white/40 py-10 text-center">Nenhum projeto no portfólio.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}