import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";
import { usePersona } from "@/context/PersonaContext";
import PersonaSwitcher from "./PersonaSwitcher";
import { scrollToSection } from "./SmoothScroll";

const navLinks = [
  { href: "about", label: "About" },
  { href: "experience", label: "Experience" },
  { href: "projects", label: "Projects" },
  { href: "skills", label: "Skills" },
  { href: "contact", label: "Contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const { persona } = usePersona();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = navLinks.map((l) => l.href).reverse();
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 220) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    } else {
      scrollToSection(id);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3.5 px-4 sm:px-6 print:hidden"
      >
        <div
          className={`w-full max-w-5xl rounded-xl px-4 py-2.5 flex items-center justify-between transition-all duration-300 ${
            scrolled
              ? "bg-[#09090b]/90 border border-[#27272a] shadow-2xl backdrop-blur-md"
              : "bg-[#121215]/80 border border-[#27272a]/60 backdrop-blur-sm"
          }`}
        >
          {/* Logo with retro badge */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#fafafa] group-hover:text-white transition-colors">
              ALAN ROY
            </span>
            <span className="hidden xs:inline-flex font-mono text-[10px] px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa] tracking-widest uppercase">
              {persona === "fullstack" ? "DEV" : "QA"} // MONO
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href && location.pathname === "/";
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono font-medium tracking-wide rounded-md transition-colors ${
                    isActive ? "text-[#fafafa]" : "text-[#a1a1aa] hover:text-[#fafafa]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-md bg-[#27272a]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compact Persona Switcher in Nav for fast switching */}
            <div className="hidden lg:block">
              <PersonaSwitcher variant="compact" />
            </div>

            {/* View Resume Webpage Link */}
            <Link
              to="/resume"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#fafafa] text-[#09090b] hover:bg-[#e4e4e7] transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b] border border-[#27272a]"
              aria-label="Toggle navigation menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-4 right-4 z-40 rounded-xl p-4 flex flex-col gap-2 bg-[#09090b]/98 border border-[#27272a] shadow-2xl backdrop-blur-xl md:hidden print:hidden"
          >
            {/* Mobile Persona Switcher */}
            <div className="pb-3 border-b border-[#27272a]">
              <p className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider mb-2">
                Active Persona View
              </p>
              <PersonaSwitcher variant="compact" className="w-full justify-center" />
            </div>

            {/* Nav list */}
            <div className="flex flex-col gap-1 py-1">
              {navLinks.map((link) => {
                const isActive = active === link.href && location.pathname === "/";
                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-left px-3.5 py-2.5 rounded-lg text-sm font-mono tracking-wide transition-all ${
                      isActive
                        ? "bg-[#27272a] text-[#fafafa] font-semibold"
                        : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile Quick Action Buttons */}
            <div className="pt-2 border-t border-[#27272a] flex flex-col gap-2">
              <Link
                to="/resume"
                onClick={() => setMobileOpen(false)}
                className="w-full py-2.5 rounded-lg text-xs font-mono font-bold bg-[#fafafa] text-[#09090b] flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>View Printable {persona === "fullstack" ? "Developer" : "QA"} Resume</span>
              </Link>
              <a
                href="mailto:alanroyff101@gmail.com"
                className="w-full py-2 rounded-lg text-xs font-mono text-[#a1a1aa] hover:text-[#fafafa] text-center"
              >
                alanroyff101@gmail.com
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
