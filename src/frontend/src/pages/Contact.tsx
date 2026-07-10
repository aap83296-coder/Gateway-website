import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, MapPin, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const offices = [
  {
    name: "Corporate Headquarters",
    company: "gSoft, Inc.",
    address: "12980 Metcalf Ave, Suite 330",
    city: "Overland Park, Kansas 66213",
    phone: "913-568-7999",
    fax: null,
    icon: "🏢",
  },
  {
    name: "North Carolina Office",
    company: null,
    address: "133 Key Bridge Dr, Suite F",
    city: "Morrisville, NC 27560",
    phone: null,
    fax: null,
    icon: "📍",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="pt-16">
      {/* Hero Banner — warm amber background */}
      <div
        className="py-20 px-4 text-center relative overflow-hidden border-b"
        style={{
          backgroundColor: "oklch(0.94 0.05 75)",
          borderColor: "oklch(0.87 0.08 70)",
        }}
      >
        {/* Decorative amber orbs */}
        <div
          className="absolute top-6 left-10 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.17 70 / 0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-4 right-12 w-24 h-24 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(0.78 0.18 72 / 0.15) 0%, transparent 70%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <p
            className="text-base font-semibold uppercase tracking-widest mb-3"
            style={{ color: "oklch(0.55 0.17 55)" }}
          >
            Get In Touch
          </p>
          <h1
            className="text-6xl font-bold"
            style={{ color: "oklch(0.20 0.03 50)" }}
          >
            Contact Us
          </h1>
          <p
            className="mt-3 text-lg max-w-xl mx-auto"
            style={{ color: "oklch(0.35 0.04 50)" }}
          >
            We&apos;re here to help. Reach out and let&apos;s start a
            conversation.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <section
        className="section-padding"
        style={{ backgroundColor: "oklch(0.97 0.015 78)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-4xl font-bold mb-2"
                style={{ color: "oklch(0.20 0.03 50)" }}
              >
                Send Us a Message
              </h2>
              <p
                className="mb-8 text-base"
                style={{ color: "oklch(0.45 0.03 55)" }}
              >
                Fill out the form below and our team will respond within 24
                hours.
              </p>

              {submitted ? (
                <motion.div
                  data-ocid="contact.success_state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-10 text-center border shadow-sm"
                  style={{
                    backgroundColor: "oklch(0.94 0.06 78)",
                    borderColor: "oklch(0.82 0.12 70)",
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl"
                    style={{ backgroundColor: "oklch(0.87 0.10 72)" }}
                  >
                    ✅
                  </div>
                  <h3
                    className="text-2xl font-bold mb-2"
                    style={{ color: "oklch(0.20 0.03 50)" }}
                  >
                    Thank You, {form.name}!
                  </h3>
                  <p
                    className="text-base"
                    style={{ color: "oklch(0.40 0.04 55)" }}
                  >
                    Your message has been received. Our team will contact you at{" "}
                    <strong>{form.email}</strong> within 24 business hours.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    variant="outline"
                    className="mt-6"
                    style={{
                      borderColor: "oklch(0.72 0.17 70)",
                      color: "oklch(0.45 0.15 60)",
                    }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        style={{ color: "oklch(0.28 0.04 50)" }}
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        data-ocid="contact.input"
                        required
                        value={form.name}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        style={{ color: "oklch(0.28 0.04 50)" }}
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        data-ocid="contact.input"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="jane@company.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="phone"
                        style={{ color: "oklch(0.28 0.04 50)" }}
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={form.phone}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label style={{ color: "oklch(0.28 0.04 50)" }}>
                        Subject *
                      </Label>
                      <Select
                        required
                        value={form.subject}
                        onValueChange={(v) =>
                          setForm((p) => ({ ...p, subject: v }))
                        }
                      >
                        <SelectTrigger data-ocid="contact.select">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="e-business">
                            E-Business Solutions
                          </SelectItem>
                          <SelectItem value="web-dev">
                            Web Development
                          </SelectItem>
                          <SelectItem value="mobile">
                            Mobile Strategies
                          </SelectItem>
                          <SelectItem value="offshore">
                            Offshore Development
                          </SelectItem>
                          <SelectItem value="hosting">
                            Managed Hosting
                          </SelectItem>
                          <SelectItem value="consulting">
                            IT Consulting & Staffing
                          </SelectItem>
                          <SelectItem value="payment">
                            E-Payment Processing
                          </SelectItem>
                          <SelectItem value="qa">Quality Assurance</SelectItem>
                          <SelectItem value="general">
                            General Inquiry
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="message"
                      style={{ color: "oklch(0.28 0.04 50)" }}
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      data-ocid="contact.textarea"
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      placeholder="Tell us about your project or inquiry..."
                      rows={5}
                    />
                  </div>
                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={loading}
                    size="lg"
                    className="w-full gap-2 font-semibold"
                    style={{
                      backgroundColor: "oklch(0.72 0.17 70)",
                      color: "oklch(0.20 0.03 50)",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin w-4 h-4 border-2 border-current/30 border-t-current rounded-full" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        <Send size={16} /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Office Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <h2
                className="text-4xl font-bold"
                style={{ color: "oklch(0.20 0.03 50)" }}
              >
                Our Offices
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-5">
                {offices.map((office, i) => (
                  <motion.div
                    key={office.name}
                    data-ocid={`contact.office.item.${i + 1}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.12 }}
                  >
                    <Card
                      className="h-full shadow-sm"
                      style={{
                        backgroundColor: "oklch(0.97 0.025 76)",
                        borderColor: "oklch(0.87 0.06 72)",
                      }}
                    >
                      <CardContent className="p-6">
                        {/* Amber icon accent */}
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                          style={{ backgroundColor: "oklch(0.87 0.10 72)" }}
                        >
                          {office.icon}
                        </div>
                        <h4
                          className="font-bold text-lg mb-1"
                          style={{ color: "oklch(0.20 0.03 50)" }}
                        >
                          {office.name}
                        </h4>
                        {office.company && (
                          <p
                            className="text-sm font-semibold mb-3"
                            style={{ color: "oklch(0.55 0.17 55)" }}
                          >
                            {office.company}
                          </p>
                        )}
                        <div className="space-y-2.5">
                          <div className="flex items-start gap-2.5">
                            <MapPin
                              size={15}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: "oklch(0.72 0.17 70)" }}
                            />
                            <p
                              className="text-sm"
                              style={{ color: "oklch(0.38 0.04 52)" }}
                            >
                              {office.address},<br />
                              {office.city}
                            </p>
                          </div>
                          {office.phone && (
                            <div className="flex items-center gap-2.5">
                              <Phone
                                size={15}
                                className="flex-shrink-0"
                                style={{ color: "oklch(0.72 0.17 70)" }}
                              />
                              <p
                                className="text-sm"
                                style={{ color: "oklch(0.38 0.04 52)" }}
                              >
                                Ph: {office.phone}
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Connect prompt */}
              <div
                className="rounded-2xl p-6 text-center border"
                style={{
                  backgroundColor: "oklch(0.93 0.06 74)",
                  borderColor: "oklch(0.82 0.10 70)",
                }}
              >
                <p className="text-2xl mb-2">✉️</p>
                <p
                  className="font-semibold text-base"
                  style={{ color: "oklch(0.22 0.03 50)" }}
                >
                  Ready to work together?
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "oklch(0.45 0.04 55)" }}
                >
                  Fill out the form and we&apos;ll be in touch shortly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
