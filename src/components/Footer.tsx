import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#09090b] border-t border-[#27272a] py-12 relative">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand & Persona Label */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="font-display font-black text-base text-[#fafafa] tracking-tight">
              ALAN ROY
            </span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]">
              DEV // QA
            </span>
          </div>
          <p className="font-mono text-xs text-[#71717a]">
            Kochi, Kerala, India • Scalable Systems & Zero-Defect Software
          </p>
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/alnroy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/alnroy"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="mailto:alanroyff101@gmail.com"
            className="p-2 rounded-lg bg-[#121215] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-colors"
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-[#fafafa] text-[#09090b] hover:bg-[#e4e4e7] transition-all ml-2"
            aria-label="Scroll to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright notice */}
        <p className="font-mono text-xs text-[#71717a] text-center md:text-right">
          © {new Date().getFullYear()} Alan Roy. Engineered with retro precision.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
