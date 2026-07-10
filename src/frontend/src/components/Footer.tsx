import { GSoftBrandBlock } from "@/components/GatewayMark";
import { Facebook, Linkedin, MapPin, Phone, Twitter } from "lucide-react";

type Page = "home" | "about" | "services" | "portfolio" | "contact" | "admin";

interface FooterProps {
  navigate: (page: Page) => void;
}

const footerLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About Us", page: "about" },
  { label: "Services", page: "services" },
  { label: "Portfolio", page: "portfolio" },
  { label: "Contact", page: "contact" },
];

const serviceLinks = [
  "E-Business Solutions",
  "Web Development",
  "Mobile Strategies",
  "Offshore Development",
  "Managed Hosting",
  "IT Staffing",
];

const offices = [
  {
    name: "Corporate HQ",
    address: "12980 Metcalf Ave, Suite 330",
    city: "Overland Park, KS 66213",
    phone: "913-568-7999",
    fax: null,
  },
  {
    name: "North Carolina Office",
    address: "133 Key Bridge Dr, Suite F",
    city: "Morrisville, NC 27560",
    phone: null,
    fax: null,
  },
];

export default function Footer({ navigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      style={{ backgroundColor: "oklch(0.35 0.08 55)" }}
      className="text-white/80"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <GSoftBrandBlock variant="light" size="md" showTagline />
            <p className="text-sm text-white/55 leading-relaxed mt-4 mb-5">
              Delivering innovative technology solutions with 24x7 global
              availability. Enterprise software, AI/ML, cloud, staffing, and
              managed services.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                aria-label="LinkedIn"
              >
                <Linkedin size={14} className="text-white/70" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                aria-label="Twitter"
              >
                <Twitter size={14} className="text-white/70" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
                aria-label="Facebook"
              >
                <Facebook size={14} className="text-white/70" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-[0.12em]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.page}>
                  <button
                    type="button"
                    data-ocid="footer.link"
                    onClick={() => navigate(link.page)}
                    className="text-sm text-white/55 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-[0.12em]">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((svc) => (
                <li key={svc}>
                  <button
                    type="button"
                    data-ocid="footer.link"
                    onClick={() => navigate("services")}
                    className="text-sm text-white/55 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Offices */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-xs uppercase tracking-[0.12em]">
              Our Offices
            </h4>
            <div className="space-y-5">
              {offices.map((office) => (
                <div key={office.name}>
                  <p className="text-white/80 font-medium text-sm mb-1.5">
                    {office.name}
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-start gap-1.5">
                      <MapPin
                        size={11}
                        className="mt-0.5 flex-shrink-0 text-white/40"
                      />
                      <p className="text-xs text-white/55 leading-relaxed">
                        {office.address}, {office.city}
                      </p>
                    </div>
                    {office.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone
                          size={11}
                          className="flex-shrink-0 text-white/40"
                        />
                        <p className="text-xs text-white/55">{office.phone}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "rgba(255,255,255,0.12)" }}
        >
          <p className="text-xs text-white/40">
            © {year} gSoft, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("contact")}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-white/20 text-xs">|</span>
            <p className="text-xs text-white/35">
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white/60 transition-colors"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
