import { GSoftWordmark } from "@/components/GatewayMark";
import { Button } from "@/components/ui/button";
import { Menu, Settings, X } from "lucide-react";
import { useEffect, useState } from "react";

type Page = "home" | "about" | "services" | "portfolio" | "contact" | "admin";

interface NavbarProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const navLinks: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "About", page: "about" },
  { label: "Services", page: "services" },
  { label: "Portfolio", page: "portfolio" },
  { label: "Contact", page: "contact" },
];

export default function Navbar({ currentPage, navigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (page: Page) => {
    navigate(page);
    setMobileOpen(false);
  };

  const navBg = scrolled
    ? "rgba(218, 176, 96, 0.98)"
    : "rgba(230, 190, 110, 0.95)";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: navBg,
        backdropFilter: "blur(14px)",
        boxShadow: scrolled
          ? "0 2px 24px rgba(120,80,20,0.15)"
          : "0 1px 0 rgba(120,80,20,0.08)",
        transition: "all 0.3s ease",
        borderBottom: "1px solid rgba(160,110,30,0.20)",
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-8 h-[68px] flex items-center justify-between">
        {/* Brand: gSoft, Inc. text wordmark only */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity min-w-0"
          data-ocid="nav.link"
          aria-label="gSoft, Inc. — Home"
        >
          <GSoftWordmark variant="dark" size="md" />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.page}
              data-ocid="nav.link"
              onClick={() => handleNav(link.page)}
              className="relative px-4 py-2 text-[15px] font-medium transition-all duration-200"
              style={{
                color: "oklch(0.18 0.04 50)",
                fontWeight: currentPage === link.page ? 700 : 500,
              }}
            >
              {link.label}
              <span
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2.5px] rounded-full transition-all duration-300"
                style={{
                  backgroundColor: "oklch(0.55 0.17 55)",
                  width: currentPage === link.page ? "70%" : "0%",
                }}
              />
            </button>
          ))}
          <div className="ml-3 flex items-center gap-2">
            <Button
              data-ocid="nav.secondary_button"
              onClick={() => handleNav("contact")}
              size="sm"
              variant="outline"
              className="font-semibold text-[14px] px-5 h-9"
              style={{
                borderColor: "oklch(0.45 0.12 50)",
                color: "oklch(0.20 0.03 50)",
                backgroundColor: "transparent",
              }}
            >
              Contact Us
            </Button>
            <Button
              data-ocid="nav.primary_button"
              onClick={() => handleNav("admin")}
              size="sm"
              className="font-semibold text-[14px] px-5 h-9 gap-1.5"
              style={{
                backgroundColor: "oklch(0.45 0.12 50)",
                color: "rgba(255,255,255,0.95)",
              }}
            >
              <Settings size={13} />
              Admin
            </Button>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2"
          style={{ color: "oklch(0.18 0.04 50)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "rgba(225, 185, 100, 0.99)",
            borderColor: "rgba(160,110,30,0.15)",
          }}
        >
          <div className="px-4 py-3 flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <button
                type="button"
                key={link.page}
                data-ocid="nav.link"
                onClick={() => handleNav(link.page)}
                className="px-4 py-2.5 rounded-md text-[15px] text-left transition-all"
                style={{
                  color: "oklch(0.18 0.04 50)",
                  backgroundColor:
                    currentPage === link.page
                      ? "rgba(120,80,20,0.10)"
                      : "transparent",
                  fontWeight: currentPage === link.page ? 600 : 400,
                }}
              >
                {link.label}
              </button>
            ))}
            <div className="flex gap-2 mt-2">
              <Button
                data-ocid="nav.secondary_button"
                onClick={() => handleNav("contact")}
                size="sm"
                variant="outline"
                className="flex-1 font-semibold"
                style={{
                  borderColor: "oklch(0.45 0.12 50)",
                  color: "oklch(0.20 0.03 50)",
                }}
              >
                Contact Us
              </Button>
              <Button
                data-ocid="nav.primary_button"
                onClick={() => handleNav("admin")}
                size="sm"
                className="flex-1 gap-1.5 font-semibold"
                style={{
                  backgroundColor: "oklch(0.45 0.12 50)",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                <Settings size={13} />
                Admin
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
