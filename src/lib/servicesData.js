export const SERVICES = [
  {
    id: "backend",
    title: "Backend Development",
    tag: "01",
    description:
      "Arquiteturas distribuídas de alta performance. APIs, microsserviços e sistemas em tempo real desenhados para escalar a milhões de usuários.",
    stack: ["Go", "Rust", "Node.js", "Python", "PostgreSQL", "Kafka"],
    code: `// real-time connection hub
func (h *Hub) Broadcast(msg Message) {
  h.mu.Lock()
  defer h.mu.Unlock()
  for client := range h.clients {
    select {
    case client.send <- msg:
    default:
      close(client.send)
      delete(h.clients, client)
    }
  }
}`,
  },
  {
    id: "frontend",
    title: "Frontend Engineering",
    tag: "02",
    description:
      "Interfaces que respiram. Design systems, animações fluidas e renderização otimizada para experiências que carregam instantaneamente.",
    stack: ["React", "Next.js", "TypeScript", "WebGL", "Tailwind", "Framer Motion"],
    code: `// adaptive rendering pipeline
const Scene = () => {
  const { perf } = usePerformance();
  return (
    <Canvas dpr={[1, perf.maxDpr]}>
      <Suspense fallback={<Skeleton />}>
        <Earth connections={liveHubs} />
      </Suspense>
    </Canvas>
  );
};`,
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    tag: "03",
    description:
      "Apps nativos e cross-platform com performance de 60fps. Da ideia à App Store, com pipelines de entrega contínua.",
    stack: ["Swift", "Kotlin", "React Native", "Flutter", "Expo"],
    code: `// offline-first sync engine
const useSync = () => {
  const { mutate } = useMutation(syncQueue, {
    onSuccess: (data) => cache.merge(data),
  });
  useEffect(() => netInfo(mutate), []);
  return { status };
};`,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    tag: "04",
    description:
      "Infraestrutura como código. Kubernetes, observabilidade e deploy automatizado com zero downtime. Confiabilidade como cultura.",
    stack: ["AWS", "GCP", "Terraform", "Kubernetes", "Docker", "Grafana"],
    code: `# zero-downtime rollout
resource "k8s_deployment" "api" {
  strategy {
    type = "RollingUpdate"
    rolling_update {
      max_unavailable = 0
      max_surge       = 1
    }
  }
  autoscale = { min = 3; max = 50 }
}`,
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    tag: "05",
    description:
      "Modelos que aprendem com seus dados. Pipelines de ML em produção, LLMs customizados e visão computacional.",
    stack: ["PyTorch", "TensorFlow", "LangChain", "Hugging Face", "Pinecone"],
    code: `# semantic retrieval pipeline
def retrieve(query: str, k: int = 5):
    emb = model.encode(query)
    hits = index.query(emb, top_k=k)
    return rerank(hits, context=window)`,
  },
];