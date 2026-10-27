import { BarChart3, Eye, FileText, Layers, Users } from "lucide-react";

const STATUS_LABELS = {
  novo: "Novos",
  em_contato: "Em contato",
  qualificado: "Qualificados",
  fechado: "Fechados",
};

const formatDate = (d) =>
  new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

function Kpi({ icon: Icon, label, value, highlight }) {
  return (
    <div className={`border p-6 ${highlight ? "border-brand/40" : "border-white/10"}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">{label}</span>
        <Icon size={14} className="text-white/30" />
      </div>
      <div className="font-heading font-extrabold text-4xl text-white tracking-tight mt-3">{value}</div>
    </div>
  );
}

function RankList({ items, emptyMsg }) {
  if (items.length === 0) {
    return <p className="font-body text-sm text-white/40 py-8 text-center">{emptyMsg}</p>;
  }
  const max = Math.max(...items.map((i) => i.count), 1);
  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div key={item.id}>
          <div className="flex items-center justify-between gap-3">
            <span className="font-body text-sm text-white/80 truncate">
              <span className="font-mono text-[10px] text-white/30 mr-2">{String(i + 1).padStart(2, "0")}</span>
              {item.title}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 flex items-center gap-1.5 shrink-0">
              <Eye size={11} className="text-white/40" />
              {item.count}
            </span>
          </div>
          <div className="h-1 bg-white/10 mt-2">
            <div className="h-full bg-white" style={{ width: `${(item.count / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function StatsTab({ posts, projects, leads }) {
  const topPosts = [...posts]
    .map((p) => ({ id: p.id, title: p.title, count: p.views || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topProjects = [...projects]
    .map((p) => ({ id: p.id, title: p.title, count: p.views || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const totalViews = [...posts, ...projects].reduce((sum, p) => sum + (p.views || 0), 0);
  const statusCounts = Object.keys(STATUS_LABELS).map((key) => ({
    key,
    label: STATUS_LABELS[key],
    count: leads.filter((l) => (l.status || "novo") === key).length,
  }));
  const recentLeads = leads.slice(0, 5);
  const newLeads = leads.filter((l) => (l.status || "novo") === "novo").length;

  return (
    <div className="space-y-12">
      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Kpi icon={FileText} label="Artigos publicados" value={posts.length} />
        <Kpi icon={Layers} label="Projetos no portfólio" value={projects.length} />
        <Kpi icon={Users} label="Contatos recebidos" value={leads.length} highlight={newLeads > 0} />
        <Kpi icon={BarChart3} label="Leituras + visitas" value={totalViews} />
      </div>

      {/* Top content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="border border-white/10 p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Artigos mais lidos
          </span>
          <div className="mt-8">
            <RankList items={topPosts} emptyMsg="Nenhuma leitura registrada ainda." />
          </div>
        </div>
        <div className="border border-white/10 p-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Projetos mais visitados
          </span>
          <div className="mt-8">
            <RankList items={topProjects} emptyMsg="Nenhuma visita registrada ainda." />
          </div>
        </div>
      </div>

      {/* Contacts */}
      <div className="border border-white/10 p-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Contatos recebidos
        </span>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {statusCounts.map((s) => (
            <div key={s.key} className="border border-white/10 p-5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">{s.label}</span>
              <div className="font-heading font-extrabold text-3xl text-white tracking-tight mt-2">{s.count}</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
            Últimos contatos
          </span>
          {recentLeads.length === 0 ? (
            <p className="font-body text-sm text-white/40 py-6 text-center">
              Nenhum contato recebido ainda — converse com o Corvo no site.
            </p>
          ) : (
            <div className="mt-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 border-t border-white/10"
                >
                  <div className="min-w-0">
                    <span className="font-body text-sm text-white/80">{lead.name}</span>
                    {lead.email && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 ml-3">
                        {lead.email}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                      {formatDate(lead.created_date)}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-wider px-2 py-1 border ${
                        (lead.status || "novo") === "novo" ? "border-brand/50 text-brand" : "border-white/15 text-white/50"
                      }`}
                    >
                      {STATUS_LABELS[lead.status || "novo"]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}