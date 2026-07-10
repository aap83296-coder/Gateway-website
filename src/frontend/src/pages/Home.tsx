import { GSoftWordmark, GoldAccentDivider } from "@/components/GatewayMark";
import TechWatermark from "@/components/TechWatermark";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown, Code, Globe, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Page = "home" | "about" | "services" | "portfolio" | "contact" | "admin";

interface HomeProps {
  navigate: (page: Page) => void;
}

// ─── Data ───────────────────────────────────────────────────────────────────

const TYPEWRITER_LINES = [
  "Empowering Businesses Through Technology",
  "Building Scalable Digital Solutions",
  "Transforming Ideas Into Reality",
];

const SERVICES = [
  {
    icon: Globe,
    title: "E-Business Solutions",
    desc: "Full range of e-Business services from Online Retailing to Business Intelligence, leveraging deep domain knowledge across diverse industries.",
    accent: "oklch(0.72 0.17 70)",
  },
  {
    icon: Code,
    title: "Web Development",
    desc: "High-profile website design, programming, interactive features, security and web databases to harness the full power of the internet.",
    accent: "oklch(0.64 0.15 60)",
  },
  {
    icon: Users,
    title: "IT Staffing",
    desc: "Providing top-tier IT talent — permanent placement, contract staffing, and project-based engagements tailored to your business needs.",
    accent: "oklch(0.55 0.18 30)",
  },
];

const ORBS = [
  { id: "a", left: "6%", top: "20%", w: 220, h: 220, delay: 0, dur: 8 },
  { id: "b", left: "78%", top: "12%", w: 180, h: 180, delay: 1.5, dur: 9 },
  { id: "c", left: "45%", top: "72%", w: 260, h: 260, delay: 0.8, dur: 11 },
  { id: "d", left: "85%", top: "60%", w: 150, h: 150, delay: 2.2, dur: 7 },
  { id: "e", left: "20%", top: "65%", w: 200, h: 200, delay: 1, dur: 10 },
];

// ─── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(lines: string[], speed = 60, pause = 1800) {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [erasing, setErasing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const current = lines[lineIdx];
    if (!erasing) {
      if (charIdx < current.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1));
          setCharIdx((c) => c + 1);
        }, speed);
      } else {
        timeoutRef.current = setTimeout(() => setErasing(true), pause);
      }
    } else {
      if (charIdx > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1));
          setCharIdx((c) => c - 1);
        }, speed / 2);
      } else {
        setErasing(false);
        setLineIdx((l) => (l + 1) % lines.length);
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [charIdx, erasing, lineIdx, lines, speed, pause]);

  return displayed;
}

/** Word Art Logo — replicates the Gateway Solutions logo visual style on dark bg */
// WordArtLogo removed — using GSoftWordmark from GatewayMark

export default function Home({ navigate }: HomeProps) {
  const typewriterText = useTypewriter(TYPEWRITER_LINES);

  return (
    <div className="pt-[70px]">
      <TechWatermark />

      {/* ── HERO ── */}
      <section
        className="relative min-h-[100vh] flex items-center justify-center overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.97 0.03 80) 0%, oklch(0.94 0.05 72) 50%, oklch(0.91 0.07 65) 100%)",
        }}
        data-ocid="home.page"
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(0.72 0.17 70 / 0.18) 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            zIndex: 0,
          }}
        />

        {/* Floating amber orbs */}
        {ORBS.map((orb) => (
          <div
            key={orb.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.w,
              height: orb.h,
              background:
                "radial-gradient(circle, oklch(0.78 0.18 72 / 0.22) 0%, transparent 70%)",
              animation: `floatOrb ${orb.dur}s ease-in-out ${orb.delay}s infinite alternate`,
              zIndex: 0,
            }}
          />
        ))}

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* gSoft wordmark */}
            <div className="flex flex-col items-center gap-3 mb-6">
              <GSoftWordmark size="xl" variant="dark" />
              <GoldAccentDivider width={200} variant="dark" />
              <p
                className="text-base font-normal tracking-wide"
                style={{ color: "oklch(0.45 0.05 55)" }}
              >
                High Quality Technology Solutions
              </p>
            </div>

            {/* Typewriter */}
            <div
              className="text-xl font-medium mb-8 min-h-[2rem]"
              style={{ color: "oklch(0.32 0.06 55)" }}
            >
              {typewriterText}
              <span
                className="inline-block w-0.5 h-5 ml-1 align-middle"
                style={{
                  backgroundColor: "oklch(0.62 0.19 55)",
                  animation: "blink 1s step-end infinite",
                }}
              />
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                data-ocid="hero.primary_button"
                onClick={() => navigate("services")}
                size="lg"
                className="gap-2 font-semibold px-8"
                style={{
                  backgroundColor: "oklch(0.55 0.17 55)",
                  color: "oklch(0.97 0.01 78)",
                }}
              >
                Explore Services <ArrowRight size={16} />
              </Button>
              <Button
                data-ocid="hero.secondary_button"
                onClick={() => navigate("contact")}
                size="lg"
                variant="outline"
                className="gap-2 font-semibold px-8"
                style={{
                  borderColor: "oklch(0.62 0.19 55)",
                  color: "oklch(0.35 0.07 55)",
                }}
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown size={24} style={{ color: "oklch(0.55 0.10 60)" }} />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section
        className="section-padding"
        style={{ backgroundColor: "oklch(0.96 0.015 75)" }}
        data-ocid="home.services_section"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.55 0.17 55)" }}
            >
              What We Offer
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              Core Services
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-7">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                data-ocid={`home.services.item.${i + 1}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "oklch(0.97 0.012 78)",
                  border: "1px solid oklch(0.87 0.03 72)",
                }}
              >
                <div
                  className="px-6 py-5 flex items-center gap-4"
                  style={{
                    background: `linear-gradient(135deg, ${svc.accent} 0%, oklch(0.42 0.14 45) 100%)`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.22)" }}
                  >
                    <svc.icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {svc.title}
                  </h3>
                </div>
                <div className="p-6">
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.42 0.04 55)" }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              data-ocid="home.services.view_all_button"
              onClick={() => navigate("services")}
              variant="outline"
              className="gap-2 font-semibold"
              style={{
                borderColor: "oklch(0.55 0.17 55)",
                color: "oklch(0.35 0.07 55)",
              }}
            >
              View All Services <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-20 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.17 55) 0%, oklch(0.40 0.14 45) 60%, oklch(0.28 0.08 40) 100%)",
        }}
        data-ocid="home.cta_section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold mb-5"
              style={{ color: "oklch(0.97 0.01 78)" }}
            >
              Ready to Transform Your Business?
            </h2>
            <p
              className="text-lg mb-8"
              style={{ color: "rgba(255,255,255,0.75)" }}
            >
              Partner with gSoft, Inc. for innovative IT services that drive
              real business results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                data-ocid="cta.primary_button"
                onClick={() => navigate("contact")}
                size="lg"
                className="gap-2 font-semibold px-10"
                style={{
                  backgroundColor: "oklch(0.82 0.18 72)",
                  color: "oklch(0.20 0.03 50)",
                }}
              >
                Get Started Today <ArrowRight size={16} />
              </Button>
              <Button
                data-ocid="cta.secondary_button"
                onClick={() => navigate("portfolio")}
                size="lg"
                variant="outline"
                className="gap-2 font-semibold px-10"
                style={{
                  borderColor: "rgba(255,255,255,0.5)",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                View Our Work
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
