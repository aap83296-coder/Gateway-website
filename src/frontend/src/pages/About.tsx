import {
  Award,
  BarChart3,
  Cloud,
  Code,
  Cpu,
  GitBranch,
  Globe,
  Handshake,
  Lightbulb,
  MapPin,
  Server,
  ShieldCheck,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const values = [
  {
    icon: ShieldCheck,
    title: "Quality",
    desc: "We hold ourselves to the highest standards in every engagement — clean code, thorough testing, and on-time delivery that clients can count on.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "We stay ahead of the technology curve, continuously exploring emerging platforms and modern architectures to future-proof our clients' solutions.",
  },
  {
    icon: Handshake,
    title: "Partnership",
    desc: "We build lasting relationships, not just projects. Our collaborative approach means we become a true extension of your team.",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "From discovery to deployment, every phase is treated with the care and precision needed to produce results that exceed expectations.",
  },
];

const methodology = [
  {
    step: "01",
    title: "Define",
    desc: "Thorough requirement gathering and project scoping with all stakeholders to align goals and deliverables.",
  },
  {
    step: "02",
    title: "Design",
    desc: "Architecture blueprints, UX wireframes, and technical specifications crafted before a single line of code is written.",
  },
  {
    step: "03",
    title: "Develop",
    desc: "Iterative, sprint-based development using best practices and the latest proven technologies.",
  },
  {
    step: "04",
    title: "Test",
    desc: "Rigorous QA cycles — unit, integration, and performance testing — ensuring robust and reliable software.",
  },
  {
    step: "05",
    title: "Deploy",
    desc: "Secure, zero-downtime deployments with full monitoring, rollback capability, and post-launch support.",
  },
  {
    step: "06",
    title: "Manage",
    desc: "Ongoing managed services, performance monitoring, and continuous improvement to keep your platform at peak.",
  },
];

const techAreas = [
  { icon: Code, label: "Java" },
  { icon: Cpu, label: ".NET / C#" },
  { icon: BarChart3, label: "SAP" },
  { icon: Zap, label: "AI & Machine Learning" },
  { icon: Cloud, label: "Cloud (AWS / Azure)" },
  { icon: GitBranch, label: "DevOps & CI/CD" },
  { icon: Smartphone, label: "Mobile Development" },
  { icon: Globe, label: "Web & E-Business" },
  { icon: Server, label: "Managed Hosting" },
];

const offices = [
  {
    name: "Corporate HQ",
    address: "12980 Metcalf Ave, Suite 330",
    city: "Overland Park, KS 66213",
  },
  {
    name: "North Carolina Office",
    address: "133 Key Bridge Dr, Suite F",
    city: "Morrisville, NC 27560",
  },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <div
        data-ocid="about.hero_section"
        className="py-24 px-4 text-center relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.94 0.03 78) 0%, oklch(0.96 0.02 68) 100%)",
        }}
      >
        {/* Decorative amber orb */}
        <div
          className="absolute top-8 right-12 w-40 h-40 rounded-full opacity-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.82 0.18 72), transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-4 left-10 w-24 h-24 rounded-full opacity-15 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.17 70), transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <p
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.55 0.17 55)" }}
          >
            Who We Are
          </p>
          <h1
            className="text-5xl md:text-6xl font-black mb-5 leading-tight"
            style={{ color: "oklch(0.20 0.03 50)" }}
          >
            About{" "}
            <span style={{ color: "oklch(0.72 0.17 70)" }}>gSoft, Inc.</span>
          </h1>
          <p
            className="text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "oklch(0.35 0.04 52)" }}
          >
            We deliver high-quality technology solutions that help businesses
            thrive in a digital world.
          </p>
        </motion.div>
      </div>

      {/* Company Overview */}
      <section
        data-ocid="about.overview_section"
        className="section-padding"
        style={{ backgroundColor: "oklch(0.96 0.015 75)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p
                className="text-sm font-bold uppercase tracking-widest mb-2"
                style={{ color: "oklch(0.55 0.17 55)" }}
              >
                Our Story
              </p>
              <h2
                className="text-4xl font-bold mb-6"
                style={{ color: "oklch(0.20 0.03 50)" }}
              >
                Company Overview
              </h2>
              <div
                className="space-y-4 text-base leading-relaxed"
                style={{ color: "oklch(0.30 0.04 50)" }}
              >
                <p>
                  gSoft, Inc. is a technology services company with a steadfast
                  commitment to delivering quality IT solutions that create
                  measurable business advantages for our clients. We serve
                  government agencies, financial institutions, and commercial
                  enterprises across the United States.
                </p>
                <p>
                  Our team of experienced engineers and consultants brings deep
                  expertise across all major technology platforms — from
                  enterprise application development and cloud infrastructure to
                  staffing and managed services. We tailor every engagement to
                  the client's unique goals.
                </p>
                <p>
                  With offices in Kansas and North Carolina, gSoft operates with
                  a national footprint and a local, client-first mindset.
                  Whether you need end-to-end development or specialized IT
                  staffing, we deliver on time, every time.
                </p>
              </div>
            </motion.div>

            {/* Mission card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div
                className="rounded-2xl p-8 border-l-4 shadow-md mb-6"
                style={{
                  backgroundColor: "oklch(0.97 0.012 78)",
                  borderLeftColor: "oklch(0.72 0.17 70)",
                }}
              >
                <p
                  className="text-xs font-black uppercase tracking-widest mb-3"
                  style={{ color: "oklch(0.55 0.17 55)" }}
                >
                  Our Mission
                </p>
                <blockquote
                  className="text-xl font-semibold leading-relaxed italic"
                  style={{ color: "oklch(0.20 0.03 50)" }}
                >
                  &ldquo;To deliver on-time, qualitative, and innovative
                  software solutions that extend our clients with a genuine
                  competitive advantage in their functional areas.&rdquo;
                </blockquote>
              </div>

              {/* Office quick-cards */}
              <div className="grid grid-cols-2 gap-4">
                {offices.map((office, i) => (
                  <motion.div
                    key={office.name}
                    data-ocid={`about.office.${i + 1}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-xl p-4 shadow-sm"
                    style={{ backgroundColor: "oklch(0.97 0.012 78)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{ backgroundColor: "oklch(0.92 0.04 74)" }}
                    >
                      <MapPin
                        size={15}
                        style={{ color: "oklch(0.55 0.17 55)" }}
                      />
                    </div>
                    <p
                      className="font-bold text-sm mb-1"
                      style={{ color: "oklch(0.20 0.03 50)" }}
                    >
                      {office.name}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.45 0.04 52)" }}
                    >
                      {office.address}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "oklch(0.45 0.04 52)" }}
                    >
                      {office.city}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        data-ocid="about.values_section"
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.93 0.025 78)" }}
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
              What Drives Us
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                data-ocid={`about.value.${i + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: "oklch(0.97 0.012 78)" }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "oklch(0.92 0.06 72)" }}
                >
                  <v.icon size={26} style={{ color: "oklch(0.55 0.17 55)" }} />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "oklch(0.20 0.03 50)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.40 0.04 52)" }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section
        data-ocid="about.methodology_section"
        className="section-padding"
        style={{ backgroundColor: "oklch(0.96 0.015 75)" }}
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
              How We Work
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              Our Methodology
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodology.map((step, i) => (
              <motion.div
                key={step.step}
                data-ocid={`about.method_step.${i + 1}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                style={{ backgroundColor: "oklch(0.97 0.012 78)" }}
              >
                <span
                  className="text-5xl font-black leading-none"
                  style={{ color: "oklch(0.88 0.06 74)" }}
                >
                  {step.step}
                </span>
                <h3
                  className="text-lg font-bold mt-2 mb-2"
                  style={{ color: "oklch(0.20 0.03 50)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "oklch(0.40 0.04 52)" }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Expertise */}
      <section
        data-ocid="about.expertise_section"
        className="py-20 px-4"
        style={{ backgroundColor: "oklch(0.93 0.025 78)" }}
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
              Technology Expertise
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              What We Work With
            </h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3">
            {techAreas.map((tech, i) => (
              <motion.div
                key={tech.label}
                data-ocid={`about.tech_badge.${i + 1}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm"
                style={{
                  backgroundColor: "oklch(0.97 0.012 78)",
                  border: "1.5px solid oklch(0.87 0.03 72)",
                }}
              >
                <tech.icon size={15} style={{ color: "oklch(0.55 0.17 55)" }} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: "oklch(0.22 0.03 50)" }}
                >
                  {tech.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section
        data-ocid="about.culture_section"
        className="section-padding"
        style={{ backgroundColor: "oklch(0.96 0.015 75)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p
              className="text-sm font-bold uppercase tracking-widest mb-2"
              style={{ color: "oklch(0.55 0.17 55)" }}
            >
              Our Culture
            </p>
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: "oklch(0.20 0.03 50)" }}
            >
              Team &amp; Culture
            </h2>
            <div
              className="rounded-2xl p-8 shadow-sm text-left"
              style={{
                backgroundColor: "oklch(0.97 0.012 78)",
                borderLeft: "4px solid oklch(0.72 0.17 70)",
              }}
            >
              <Users
                size={32}
                className="mb-4"
                style={{ color: "oklch(0.72 0.17 70)" }}
              />
              <p
                className="text-lg leading-relaxed mb-4"
                style={{ color: "oklch(0.28 0.04 50)" }}
              >
                At gSoft, our people are our greatest asset. We cultivate a
                culture of continuous learning, open collaboration, and mutual
                respect — an environment where talented professionals do their
                best work and clients feel the difference.
              </p>
              <p
                className="text-base leading-relaxed"
                style={{ color: "oklch(0.40 0.04 52)" }}
              >
                Our consultants and engineers bring diverse backgrounds and a
                shared commitment to excellence. We believe that
                high-performing, motivated teams are the foundation of every
                successful technology project — and we invest accordingly in
                training, mentorship, and career growth.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
