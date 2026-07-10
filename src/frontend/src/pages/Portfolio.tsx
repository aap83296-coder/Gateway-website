import { createActor } from "@/backend";
import type { PortfolioItem } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  Building2,
  Cloud,
  Code,
  Globe,
  Layers,
  Smartphone,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

const CATEGORIES = [
  "All",
  "Web Development",
  "Mobile",
  "E-Business",
  "IT Solutions",
] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_ICON: Record<string, typeof Globe> = {
  "Web Development": Globe,
  Mobile: Smartphone,
  "E-Business": Code,
  "IT Solutions": Layers,
  Cloud: Cloud,
  Enterprise: Building2,
};

const FALLBACK_ITEMS: PortfolioItem[] = [
  {
    id: BigInt(1),
    title: "Enterprise Resource Planning Portal",
    client: "Meridian Financial Group",
    year: BigInt(2023),
    category: "Web Development",
    technologies: ["React", "Node.js", "PostgreSQL", "REST API"],
    description:
      "Full-stack ERP web portal enabling real-time financial reporting, HR management, and procurement workflows. Migrated legacy Oracle system to a modern cloud-based architecture with role-based access.",
  },
  {
    id: BigInt(2),
    title: "Retail Mobile Commerce App",
    client: "BrightStore Retail Chain",
    year: BigInt(2023),
    category: "Mobile",
    technologies: ["React Native", "TypeScript", "Firebase", "Stripe"],
    description:
      "Cross-platform mobile shopping app with real-time inventory sync, push notifications, loyalty rewards, and integrated payment processing. Launched on iOS and Android simultaneously.",
  },
  {
    id: BigInt(3),
    title: "B2B E-Commerce Platform",
    client: "Summit Industrial Supply",
    year: BigInt(2022),
    category: "E-Business",
    technologies: ["Next.js", "Elasticsearch", "SAP Integration", "AWS"],
    description:
      "High-volume B2B e-commerce platform with advanced product search, tiered pricing, SAP ERP integration, and automated invoice generation for 500+ enterprise buyers.",
  },
  {
    id: BigInt(4),
    title: "IT Infrastructure Modernization",
    client: "Apex Healthcare Network",
    year: BigInt(2024),
    category: "IT Solutions",
    technologies: ["Azure", "DevOps", "Docker", "Kubernetes"],
    description:
      "End-to-end infrastructure modernization: migrated 40+ on-premise servers to Azure, established CI/CD pipelines, containerized workloads, and reduced operational overhead by 35%.",
  },
];

function usePortfolioItems() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolio"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPortfolioItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const { data, isLoading } = usePortfolioItems();

  const items: PortfolioItem[] = useMemo(() => {
    const source = data && data.length > 0 ? data : FALLBACK_ITEMS;
    if (activeCategory === "All") return source;
    return source.filter((p) => p.category === activeCategory);
  }, [data, activeCategory]);

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div className="py-20 px-4 text-center relative overflow-hidden border-b border-border bg-card">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.72 0.17 70 / 0.10) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative z-10"
        >
          <span
            className="inline-block text-xs font-bold uppercase tracking-[0.22em] px-3 py-1 rounded-full mb-4"
            style={{
              background: "oklch(0.72 0.17 70 / 0.15)",
              color: "oklch(0.55 0.17 55)",
            }}
          >
            gSoft, Inc.
          </span>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ color: "oklch(0.20 0.03 50)" }}
          >
            Our Portfolio
          </h1>
          <p
            className="mt-2 max-w-2xl mx-auto text-base md:text-lg"
            style={{ color: "oklch(0.50 0.03 55)" }}
          >
            Innovative software solutions delivered for businesses across
            industries — from web platforms to mobile apps and enterprise IT.
          </p>
        </motion.div>
      </div>

      {/* Filter Tabs + Grid */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div
            className="flex flex-wrap gap-2 justify-center mb-12"
            role="tablist"
            aria-label="Filter portfolio by category"
          >
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                data-ocid="portfolio.filter.tab"
                onClick={() => setActiveCategory(cat)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                style={
                  activeCategory === cat
                    ? {
                        background: "oklch(0.72 0.17 70)",
                        color: "oklch(0.20 0.03 50)",
                        boxShadow: "0 2px 12px oklch(0.72 0.17 70 / 0.35)",
                      }
                    : {
                        background: "oklch(0.93 0.025 78)",
                        color: "oklch(0.40 0.04 55)",
                        border: "1px solid oklch(0.87 0.03 72)",
                      }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {isLoading && (
            <div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="portfolio.loading_state"
            >
              {Array.from({ length: 6 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton loader
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          )}

          {!isLoading && items.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
              data-ocid="portfolio.empty_state"
            >
              <div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                style={{ background: "oklch(0.72 0.17 70 / 0.12)" }}
              >
                <Layers size={36} style={{ color: "oklch(0.72 0.17 70)" }} />
              </div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ color: "oklch(0.20 0.03 50)" }}
              >
                Our portfolio is growing
              </h3>
              <p
                style={{ color: "oklch(0.50 0.03 55)" }}
                className="max-w-md mx-auto"
              >
                Our portfolio is growing — check back soon!
              </p>
            </motion.div>
          )}

          {!isLoading && items.length > 0 && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.map((item, i) => {
                  const Icon = CATEGORY_ICON[item.category] ?? Layers;
                  return (
                    <motion.div
                      key={Number(item.id)}
                      data-ocid={`portfolio.item.${i + 1}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.4 }}
                    >
                      <Card
                        className="h-full hover:-translate-y-1 transition-all duration-300 border"
                        style={{
                          background: "oklch(0.97 0.012 78)",
                          borderColor: "oklch(0.87 0.03 72)",
                          boxShadow: "0 1px 8px oklch(0.72 0.17 70 / 0.06)",
                        }}
                      >
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div
                              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                              style={{
                                background: "oklch(0.72 0.17 70 / 0.14)",
                              }}
                            >
                              <Icon
                                size={20}
                                style={{ color: "oklch(0.55 0.17 55)" }}
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                style={{
                                  background: "oklch(0.72 0.17 70 / 0.16)",
                                  color: "oklch(0.45 0.15 55)",
                                }}
                              >
                                {item.category}
                              </span>
                              <span
                                className="text-xs font-medium"
                                style={{ color: "oklch(0.55 0.03 55)" }}
                              >
                                {Number(item.year)}
                              </span>
                            </div>
                          </div>
                          <h3
                            className="text-lg font-bold mb-1 leading-snug"
                            style={{ color: "oklch(0.20 0.03 50)" }}
                          >
                            {item.title}
                          </h3>
                          <p
                            className="text-sm font-semibold mb-3"
                            style={{ color: "oklch(0.55 0.15 60)" }}
                          >
                            {item.client}
                          </p>
                          <p
                            className="text-sm leading-relaxed mb-4 flex-1"
                            style={{ color: "oklch(0.40 0.03 52)" }}
                          >
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5 mt-auto">
                            {item.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs font-medium"
                                style={{
                                  background: "oklch(0.90 0.025 76)",
                                  color: "oklch(0.30 0.05 50)",
                                  border: "1px solid oklch(0.83 0.04 70)",
                                }}
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
