import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Mail,
  ArrowDown,
  Github,
  Linkedin,
  Terminal,
  ExternalLink,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { usePersona } from "@/context/PersonaContext";
import PersonaSwitcher from "./PersonaSwitcher";
import { scrollToSection } from "./SmoothScroll";

const HeroSection = () => {
  const { persona, config } = usePersona();

  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#09090b]">
      {/* Retro Noir Grid Pattern Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      {/* Subtle Ambient Monochrome Glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Main Persona Info (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Status Pill Badge with 15 Days Notice */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121215] border border-[#27272a]"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <span className="font-mono text-[11px] sm:text-xs text-[#d4d4d8] tracking-wider uppercase font-semibold">
                AVAILABLE FOR HIRE • JOIN WITHIN 30 DAYS • KOCHI, IN
              </span>
            </motion.div>

            {/* Hero Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-[#fafafa] leading-[0.95]">
                ALAN ROY
              </h1>

              {/* Persona Headline with Smooth Animation */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={persona}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 pt-1"
                >
                  <p className="font-display text-xl sm:text-2xl text-[#fafafa] font-semibold tracking-tight">
                    {config.headline}
                  </p>
                  <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed max-w-xl font-normal">
                    {config.subheadline}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Persona Switcher Pinned in Hero */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-1"
            >
              <PersonaSwitcher variant="hero" />
            </motion.div>

            {/* Dynamic Primary Skills Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-2 pt-1"
            >
              <p className="font-mono text-[11px] text-[#71717a] uppercase tracking-wider">
                Core Stack // Focus:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <AnimatePresence mode="popLayout">
                  {config.primary_skills.map((skill) => (
                    <motion.span
                      key={skill}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="mono-tag"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CTAs with Reliable Lenis Scroll & Printable Resume */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                onClick={() => scrollToSection("projects")}
                className="btn-retro-primary cursor-pointer"
              >
                <span>View Live Projects</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              <Link
                to="/resume"
                className="btn-retro-secondary group cursor-pointer"
              >
                <FileText className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                <span>
                  {persona === "fullstack" ? "Developer CV (Printable)" : "QA Tester CV (Printable)"}
                </span>
              </Link>

              <button
                onClick={() => scrollToSection("contact")}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-mono font-medium text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b] transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </motion.div>

            {/* Social Links Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4 pt-3 border-t border-[#27272a]"
            >
              <span className="font-mono text-xs text-[#71717a]">Connect:</span>
              <a
                href="https://github.com/alnroy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github.com/alnroy</span>
              </a>
              <span className="text-[#3f3f46]">•</span>
              <a
                href="https://www.linkedin.com/in/alnroy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-mono text-[#a1a1aa] hover:text-white transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin.com/in/alnroy</span>
              </a>
            </motion.div>

          </div>

          {/* RIGHT COLUMN: Sleek Circular Profile Avatar (5 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-center justify-center"
          >
            <div className="relative group flex flex-col items-center">
              
              {/* Outer decorative ring */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full p-2 bg-[#121215] border-2 border-[#27272a] shadow-[0_0_50px_rgba(0,0,0,0.8)] group-hover:border-[#3f3f46] transition-all duration-300">
                
                {/* Circular image wrapper */}
                <div className="w-full h-full rounded-full overflow-hidden bg-[#18181b] border border-[#27272a] relative">
                  <img
                    src="/profile.jpg"
                    alt="Alan Roy"
                    className="w-full h-full object-cover object-center grayscale contrast-115 group-hover:contrast-125 transition-all duration-500"
                    loading="eager"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.7)] pointer-events-none" />
                </div>

                {/* Persona floating chip at bottom */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#09090b] border border-[#27272a] shadow-lg flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-[#fafafa] font-bold tracking-wider uppercase">
                    {persona === "fullstack" ? "FULL STACK DEV" : "QA TESTER"}
                  </span>
                </div>

              </div>

              {/* Quick Info Below Avatar */}
              <div className="mt-6 text-center space-y-1">
                <p className="font-display font-bold text-base text-[#fafafa]">
                  Alan Roy
                </p>
                <p className="font-mono text-xs text-[#a1a1aa] flex items-center justify-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Join Notice: Within 30 Days</span>
                </p>
              </div>

            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#71717a] hover:text-[#fafafa] transition-colors cursor-pointer"
        aria-label="Scroll to about"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">SCROLL</span>
        <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
