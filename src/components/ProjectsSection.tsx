import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ExternalLink,
  Github,
  Layers,
  ShieldCheck,
  Terminal,
  CheckCircle,
  Archive,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { usePersona } from "@/context/PersonaContext";

interface Project {
  title: string;
  tagline: string;
  status: string;
  live_url?: string;
  github?: string;
  description: string;
  qa_perspective: string;
  tags: string[];
  image: string;
  featured: boolean;
}

const featuredProjects: Project[] = [
  {
    title: "KSR Bait & Tackle",
    tagline: "Retail Operations ERP & Live E-Commerce Platform",
    live_url: "https://www.ksrbaitandtackle.in/",
    status: "LIVE IN PRODUCTION",
    description:
      "Full-featured commercial e-commerce store and retail ERP on a custom live domain. Built with modular product filtering, cart persistence, checkout pipelines, and a Django REST Framework backend with JWT authentication and PostgreSQL.",
    qa_perspective:
      "Executed full manual and functional testing, cross-browser/mobile viewport validation, and Postman API test suites for checkout payloads, tax calculations, and session security.",
    tags: ["React", "TypeScript", "Python", "DRF", "PostgreSQL", "Tailwind", "Postman", "Live System"],
    image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=900&q=85",
    featured: true,
  },
  {
    title: "CurateDrop",
    tagline: "Automated E-Commerce & Amazon Affiliate Store Engine",
    status: "PRODUCTION READY",
    description:
      "Automated product ingestion pipeline scraping Amazon product attributes, images, and specifications into structured store listings. Dual-channel monetization routing affiliate items to Amazon and direct store products to WhatsApp orders.",
    qa_perspective:
      "Designed and executed test scenarios for two-factor Delivery OTP verification (timeouts, lockout states, transitions) and mobile admin dashboard workflows.",
    tags: ["Python", "Django", "Vanilla JS", "Web Scraping", "WhatsApp API", "OTP Security", "UAT"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=85",
    featured: true,
  },
];

const secondaryArchive: Project[] = [
  {
    title: "E-Valuate PWA",
    tagline: "Banking Property Valuation Automation Ecosystem",
    status: "ENTERPRISE DEPLOYED",
    description:
      "Enterprise PWA automating property valuation reports for major public and private banking institutions (SBI, Muthoot, Axis), cutting report preparation turnaround time by 75%.",
    qa_perspective:
      "Isolated asynchronous auto-save race conditions and rigorously tested statutory Kerala Municipality and Panchayat Building Rules calculations.",
    tags: ["Python", "Django", "Redis", "PyHanko", "PyMuPDF", "WebSockets"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85",
    featured: false,
  },
  {
    title: "Convertto OCR",
    tagline: "Multi-Language OCR & Transliteration Platform",
    github: "https://github.com/alnroy/Convertto/",
    status: "OPEN SOURCE",
    description:
      "Optical Character Recognition web platform powered by Google Cloud Vision API for extracting and transliterating Malayalam, English, and Manglish text with rich text editing.",
    qa_perspective:
      "Constructed noisy OCR edge cases (skewed scans, handwriting artifacts) to benchmark parsing accuracy.",
    tags: ["Python", "Django", "Google Vision", "JavaScript", "OCR"],
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=900&q=85",
    featured: false,
  },
  {
    title: "CaterCraft",
    tagline: "Multi-Tenant Catering Coordination System",
    github: "https://github.com/alnroy",
    status: "ACADEMIC CAPSTONE",
    description:
      "Multi-tenant catering management portal and mobile application with vendor catalog management, dynamic order scheduling, and DRF backend.",
    qa_perspective:
      "Validated database concurrency, relational schema integrity, and Flutter mobile client response times.",
    tags: ["Flutter", "Python", "DRF", "PostgreSQL", "Mobile"],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",
    featured: false,
  },
];

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { persona } = usePersona();
  const [showArchive, setShowArchive] = useState(false);

  return (
    <section id="projects" ref={ref} className="py-20 sm:py-28 bg-[#09090b] relative">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <div className="section-pill mb-3">
            <Layers className="w-3.5 h-3.5 text-[#fafafa]" />
            <span>PRODUCTION DEPLOYMENTS // PORTFOLIO</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#fafafa]">
            Featured Commercial Projects
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-mono">
            {persona === "fullstack"
              ? "Live production architectures, ERP stores, and automated scraping engines."
              : "End-to-end test validation, API payload contract testing & edge-case hardening."}
          </p>
        </motion.div>

        {/* Featured Projects Grid (2 Big Featured Cards) */}
        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="card-noir rounded-xl overflow-hidden flex flex-col group"
            >
              {/* Image Frame with Status Badge */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#18181b] border-b border-[#27272a]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center grayscale contrast-115 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-transparent to-black/40" />

                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded bg-[#09090b]/90 border border-[#27272a] text-[#fafafa] tracking-wider uppercase flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {project.status}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="font-display font-black text-2xl text-[#fafafa] leading-tight">
                    {project.title}
                  </h3>
                  <p className="font-mono text-xs text-[#d4d4d8] mt-0.5">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  
                  {/* Persona Focus: Dev vs QA */}
                  {persona === "fullstack" ? (
                    <div className="space-y-2">
                      <p className="font-mono text-[11px] text-[#71717a] uppercase tracking-wider flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-[#fafafa]" />
                        Architectural Overview:
                      </p>
                      <p className="text-sm text-[#a1a1aa] leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 bg-[#18181b]/70 p-3.5 rounded-lg border border-[#27272a]">
                      <p className="font-mono text-[11px] text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        QA & Testing Perspective:
                      </p>
                      <p className="text-sm text-[#d4d4d8] leading-relaxed">
                        {project.qa_perspective}
                      </p>
                    </div>
                  )}

                  {/* Tech Tags */}
                  <div className="space-y-2 pt-1">
                    <p className="font-mono text-[11px] text-[#71717a] uppercase tracking-wider">
                      Tech Stack & Tools:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="mono-tag text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer Action Bar */}
                <div className="pt-4 border-t border-[#27272a] flex items-center justify-between gap-3">
                  {project.live_url ? (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-retro-primary w-full sm:w-auto text-xs"
                    >
                      <span>Visit Live Platform</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-[#71717a] py-2">
                      Internal Commercial System
                    </span>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-retro-secondary text-xs"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Archive Toggle */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowArchive(!showArchive)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#121215] border border-[#27272a] text-xs font-mono text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46] transition-all"
          >
            <Archive className="w-4 h-4" />
            <span>
              {showArchive ? "Hide Archive Projects" : "View Secondary Systems Archive (E-Valuate, Convertto, CaterCraft)"}
            </span>
            {showArchive ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Secondary Archive Drawer */}
        {showArchive && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
          >
            {secondaryArchive.map((item) => (
              <div
                key={item.title}
                className="card-noir rounded-xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#71717a] uppercase font-semibold">
                      {item.status}
                    </span>
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#a1a1aa] hover:text-[#fafafa]"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  <h4 className="font-display font-bold text-lg text-[#fafafa]">
                    {item.title}
                  </h4>
                  <p className="font-mono text-[11px] text-[#71717a]">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed pt-1">
                    {persona === "fullstack" ? item.description : item.qa_perspective}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-2 border-t border-[#27272a]">
                  {item.tags.map((t) => (
                    <span key={t} className="mono-tag text-[10px] px-2 py-0.5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;
