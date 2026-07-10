import { motion } from "motion/react";

const services = [
  {
    emoji: "🌐",
    title: "E-Business Solutions",
    gradientFrom: "oklch(0.72 0.17 70)",
    gradientTo: "oklch(0.62 0.19 55)",
    desc: "End-to-end digital transformation services spanning e-commerce platforms, enterprise portals, and supply chain solutions that create measurable competitive advantage.",
    benefits: [
      "E-commerce platform architecture & integration",
      "Business intelligence dashboards & analytics",
      "Supply chain and procurement portals",
      "Digital transformation roadmap consulting",
    ],
  },
  {
    emoji: "💻",
    title: "Web Development",
    gradientFrom: "oklch(0.68 0.14 62)",
    gradientTo: "oklch(0.58 0.16 48)",
    desc: "Full-cycle web application development from architecture through deployment \u2014 high-performance, secure, and scalable web solutions built with modern frameworks.",
    benefits: [
      "Custom web application development (.NET, J2EE)",
      "RESTful API design and integration",
      "Responsive design and CMS solutions",
      "Security hardening and performance tuning",
    ],
  },
  {
    emoji: "📱",
    title: "Mobile Solutions",
    gradientFrom: "oklch(0.65 0.16 75)",
    gradientTo: "oklch(0.55 0.18 60)",
    desc: "Enterprise-grade mobile applications for iOS, Android, and hybrid platforms. We deliver cross-platform solutions enabling a true Mobile-Office experience for distributed teams.",
    benefits: [
      "iOS and Android enterprise application development",
      "Mobile strategy and UX consulting",
      "Hybrid and cross-platform app development",
      "Backend API integration and offline sync",
    ],
  },
  {
    emoji: "🌍",
    title: "Offshore Development",
    gradientFrom: "oklch(0.70 0.15 68)",
    gradientTo: "oklch(0.60 0.17 53)",
    desc: "24x7 global delivery model with dedicated offshore teams and the latest infrastructure, providing cost-effective and high-quality software development at scale.",
    benefits: [
      "Dedicated offshore development teams",
      "Agile delivery with daily communication cycles",
      "Up to 60% cost reduction vs. onshore models",
      "Transparent project tracking and reporting",
    ],
  },
  {
    emoji: "☁️",
    title: "Managed Hosting",
    gradientFrom: "oklch(0.66 0.18 72)",
    gradientTo: "oklch(0.56 0.20 57)",
    desc: "Enterprise-class cloud hosting with OC-48 backbone connectivity, dedicated servers, co-location, and managed services requiring 99.9% uptime.",
    benefits: [
      "Dedicated and cloud-hosted server solutions",
      "High-availability clustering and load balancing",
      "Disaster recovery and business continuity planning",
      "24x7 monitoring and incident response",
    ],
  },
  {
    emoji: "👥",
    title: "IT Staffing",
    gradientFrom: "oklch(0.62 0.17 65)",
    gradientTo: "oklch(0.52 0.19 50)",
    desc: "Pre-vetted IT professionals available for contract, contract-to-hire, and direct placement across all major platforms including SAP, Oracle, .NET, Java, and cloud infrastructure.",
    benefits: [
      "Contract, C2H, and direct-hire placements",
      "SAP, Oracle, Microsoft, and cloud specialists",
      "Skill augmentation for existing teams",
      "Rapid time-to-fill with quality guarantee",
    ],
  },
];

export default function Services() {
  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div
        className="py-20 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.93 0.04 80) 0%, oklch(0.90 0.06 70) 50%, oklch(0.88 0.07 62) 100%)",
        }}
        data-ocid="services.page"
      >
        {/* Subtle decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-20"
            style={{ background: "oklch(0.72 0.17 70)" }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-15"
            style={{ background: "oklch(0.62 0.19 55)" }}
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.52 0.17 55)" }}
          >
            What We Do
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ color: "oklch(0.20 0.03 50)" }}
          >
            Our Services
          </h1>
          <p
            className="mt-2 max-w-xl mx-auto text-base leading-relaxed"
            style={{ color: "oklch(0.35 0.04 55)" }}
          >
            Comprehensive technology solutions delivering measurable value
            across enterprise, government, and commercial sectors.
          </p>
        </motion.div>
      </div>

      {/* 6 Service Cards Grid */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.96 0.015 75)" }}
        data-ocid="services.section"
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
              style={{ color: "oklch(0.52 0.17 55)" }}
            >
              Core Offerings
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              Technology Service Lines
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((svc, i) => (
              <motion.div
                key={svc.title}
                data-ocid={`services.item.${i + 1}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.55 }}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  backgroundColor: "oklch(0.97 0.012 78)",
                  border: "1px solid oklch(0.87 0.03 72)",
                }}
              >
                {/* Gradient header */}
                <div
                  className="px-6 py-5 flex items-center gap-4"
                  style={{
                    background: `linear-gradient(135deg, ${svc.gradientFrom} 0%, ${svc.gradientTo} 100%)`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                    style={{ backgroundColor: "rgba(255,255,255,0.22)" }}
                  >
                    {svc.emoji}
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {svc.title}
                  </h3>
                </div>
                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: "oklch(0.42 0.04 55)" }}
                  >
                    {svc.desc}
                  </p>
                  <ul className="space-y-2 mt-auto">
                    {svc.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm">
                        <span
                          className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "oklch(0.72 0.17 70)" }}
                        />
                        <span style={{ color: "oklch(0.28 0.04 50)" }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why gSoft strip */}
      <section
        className="py-14 px-4"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.91 0.05 78) 0%, oklch(0.88 0.07 68) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl font-bold mb-3"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              Why Choose gSoft, Inc.?
            </h2>
            <p
              style={{ color: "oklch(0.38 0.04 55)" }}
              className="max-w-xl mx-auto"
            >
              Delivering technology-led outcomes with a client-first approach.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                emoji: "⚡",
                label: "Rapid Delivery",
                sub: "Agile processes with predictable timelines",
              },
              {
                emoji: "🔒",
                label: "Quality Focus",
                sub: "Rigorous QA and testing on every engagement",
              },
              {
                emoji: "💡",
                label: "Deep Expertise",
                sub: "Cross-platform skills across enterprise stacks",
              },
              {
                emoji: "🤝",
                label: "Partnership Model",
                sub: "Long-term relationships over transactional work",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl p-5 text-center"
                style={{
                  backgroundColor: "rgba(255,255,255,0.60)",
                  border: "1px solid oklch(0.85 0.04 72)",
                }}
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h4
                  className="font-bold mb-1"
                  style={{ color: "oklch(0.20 0.03 50)" }}
                >
                  {item.label}
                </h4>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "oklch(0.42 0.04 55)" }}
                >
                  {item.sub}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-16 px-4"
        style={{ background: "oklch(0.96 0.015 75)" }}
        data-ocid="services.cta_section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              Ready to Start?
            </h2>
            <p
              className="text-base mb-8 leading-relaxed"
              style={{ color: "oklch(0.38 0.04 55)" }}
            >
              Let's discuss how gSoft, Inc. can accelerate your technology
              goals. Our team is ready to build a customized solution for your
              business.
            </p>
            <button
              type="button"
              onClick={() => {
                window.location.hash = "contact";
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.72 0.17 70) 0%, oklch(0.62 0.19 55) 100%)",
                color: "oklch(0.97 0.01 78)",
              }}
              data-ocid="services.contact_button"
            >
              <span>Contact Us</span>
              <span>→</span>
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
