import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.replace("#", "")).reverse();
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-5"
      >
        <div
          className="w-full max-w-3xl rounded-2xl px-5 py-3 flex items-center justify-between transition-all duration-400"
          style={{
            background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(249,249,251,0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: scrolled ? "1px solid rgba(220,224,234,0.8)" : "1px solid rgba(220,224,234,0.4)",
            boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
          }}
        >
          {/* Logo */}
          <Link to="/" className="font-display font-black text-lg tracking-tight gradient-text">
            Alan Roy
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
                style={{ color: active === link.href ? "hsl(220 80% 50%)" : "#64748b" }}
              >
                {active === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-blue-50"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.45 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Hire Me */}
          <a
            href="mailto:alanroyff101@gmail.com"
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 hover:-translate-y-px"
          >
            Hire Me
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-slate-500 p-1"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-40 rounded-2xl p-4 flex flex-col gap-1"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(220,224,234,0.9)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(link.href)}
                className="text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{
                  color: active === link.href ? "hsl(220 80% 50%)" : "#475569",
                  background: active === link.href ? "rgba(59,130,246,0.07)" : "transparent",
                }}
              >
                {link.label}
              </motion.button>
            ))}
            <div className="border-t border-slate-100 pt-2 mt-1">
              <a href="mailto:alanroyff101@gmail.com"
                className="block text-center py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all">
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
