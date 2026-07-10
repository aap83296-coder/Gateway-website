import { Toaster } from "@/components/ui/sonner";
import { useEffect, useState } from "react";
import FloralBackground from "./components/FloralBackground";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TechWatermark from "./components/TechWatermark";
import About from "./pages/About";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";

type Page = "home" | "about" | "services" | "portfolio" | "contact" | "admin";

export default function App() {
  const [page, setPage] = useState<Page>("home");

  useEffect(() => {
    const getPage = () => {
      const hash = window.location.hash.replace("#", "") as Page;
      const valid: Page[] = [
        "home",
        "about",
        "services",
        "portfolio",
        "contact",
        "admin",
      ];
      return valid.includes(hash) ? hash : "home";
    };
    setPage(getPage());
    const handler = () => setPage(getPage());
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const navigate = (p: Page) => {
    window.location.hash = p;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated wave watermark — fixed background behind all content */}
      <TechWatermark />
      {/* Warm geometric pattern decoration on all pages */}
      <FloralBackground />
      <Navbar currentPage={page} navigate={navigate} />
      <main className="flex-1 relative z-10">
        {page === "home" && <Home navigate={navigate} />}
        {page === "about" && <About />}
        {page === "services" && <Services />}
        {page === "portfolio" && <Portfolio />}
        {page === "contact" && <Contact />}
        {page === "admin" && <Admin />}
      </main>
      <Footer navigate={navigate} />
      <Toaster />
    </div>
  );
}
