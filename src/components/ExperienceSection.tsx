import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Building2,
  Calendar,
  MapPin,
  Briefcase,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Layers,
  Terminal,
} from "lucide-react";
import { usePersona } from "@/context/PersonaContext";

interface ExperienceItem {
  company: string;
  role_dev: string;
  role_qa: string;
  period: string;
  location: string;
  type: string;
  achievements: string[];
  tech_stack: string[];
  tech_stack_icons: { name: string; url: string }[];
}

const experiences: ExperienceItem[] = [
  {
    company: "Vadrida Technologies",
    role_dev: "Full Stack Developer (Python / Django)",
    role_qa: "QA Analyst & Product Operations Associate",
    period: "Dec 2025 – Present",
    location: "Kochi, Kerala",
    type: "Full-Time Production",
    achievements: [
      "Architected and tested the centralized enterprise valuation system standardizing report formats across major banking institutions (SBI, Axis, Muthoot, SIB), cutting turnaround time by 75%.",
      "Built high-concurrency real-time WebSocket pipelines using Daphne (ASGI) & Django Channels for field-to-office sync.",
      "Engineered hardware IoT biometric communication over TCP sockets (ZKTeco protocol) and PKCS#11 USB DSC cryptographic signing (PyHanko, TSA RFC 3161).",
      "Discovered and resolved critical asynchronous client-server race conditions where auto-save prematurely erased populated draft forms.",
      "Verified automated mathematical calculation engines against statutory Kerala Municipality & Panchayat Building Rules (KPBR/KMBR compliance).",
    ],
    tech_stack: ["Python", "Django", "PostgreSQL", "Redis", "Daphne (ASGI)", "WebSockets", "Postman", "PKCS#11 DSC"],
    tech_stack_icons: [
      { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "Redis", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
      { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    ],
  },
  {
    company: "Logiccraft Technology",
    role_dev: "Full Stack Python Intern",
    role_qa: "Web Application QA & Development Intern",
    period: "2025",
    location: "Kochi, Kerala",
    type: "Internship",
    achievements: [
      "Engineered dynamic web modules using Python MVT architecture, ORM queries, and RESTful API endpoints.",
      "Participated in manual functional testing, bug verification, and collaborative Git/GitHub code reviews.",
      "Assisted in cross-browser compatibility tests and responsive UI verification on mobile viewports.",
    ],
    tech_stack: ["Python", "Django", "JavaScript", "HTML5/CSS3", "Git"],
    tech_stack_icons: [
      { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ],
  },
  {
    company: "QSpiders",
    role_dev: "Full Stack Python Trainee",
    role_qa: "Software Testing & Python Trainee",
    period: "2025",
    location: "Kochi, Kerala",
    type: "Professional Training",
    achievements: [
      "Intensive training in Manual Testing fundamentals, SDLC (Agile), Test Case Design, and Defect Lifecycle Management.",
      "Practical API testing with Postman and database querying with SQL (Joins, Indexing, Schema Design).",
      "Executed comprehensive boundary value analysis and equivalence class partitioning on enterprise form flows.",
    ],
    tech_stack: ["Manual Testing", "Postman", "SQL", "Python", "Agile SDLC"],
    tech_stack_icons: [
      { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    ],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { persona } = usePersona();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First expanded by default

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section id="experience" ref={sectionRef} className="py-20 sm:py-28 bg-[#09090b] relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#27272a] to-transparent" />

      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <div className="section-pill mb-3">
            <Briefcase className="w-3.5 h-3.5 text-[#fafafa]" />
            <span>CAREER TIMELINE // PRODUCTION IMPACT</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#fafafa]">
            Work Experience & Track Record
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-mono">
            {persona === "fullstack"
              ? "Architecting real-time enterprise platforms, hardware IoT sockets & banking integrations."
              : "Zero-defect delivery, regression test suites, statutory compliance & edge-case discovery."}
          </p>
        </motion.div>

        {/* Timeline Stack */}
        <div className="relative max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, i) => {
            const isExpanded = expandedIndex === i;
            const currentRole = persona === "fullstack" ? exp.role_dev : exp.role_qa;

            return (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-noir rounded-xl overflow-hidden"
              >
                {/* Header Clickable Row */}
                <div
                  onClick={() => toggleExpand(i)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none hover:bg-[#18181b]/50 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs text-[#a1a1aa] uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#fafafa]" />
                        {exp.company}
                      </span>
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#27272a] text-[#fafafa] uppercase font-semibold">
                        {exp.type}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#fafafa]">
                      {currentRole}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#71717a] pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.period}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Right side: tech stack preview + expand chevron */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="hidden md:flex items-center -space-x-1.5">
                      {exp.tech_stack_icons.map((tech) => (
                        <div
                          key={tech.name}
                          className="w-7 h-7 rounded-full bg-[#18181b] border border-[#27272a] p-1 flex items-center justify-center"
                          title={tech.name}
                        >
                          <img src={tech.url} alt={tech.name} className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>

                    <button
                      className="p-1.5 rounded-lg bg-[#18181b] border border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] transition-colors"
                      aria-label="Toggle details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#27272a] bg-[#121215]/80 space-y-5"
                  >
                    {/* Key Contributions */}
                    <div className="space-y-3">
                      <p className="font-mono text-xs text-[#71717a] uppercase tracking-wider">
                        Key Accomplishments & Impact:
                      </p>
                      <div className="space-y-2.5">
                        {exp.achievements.map((ach, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#fafafa] flex-shrink-0" />
                            <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
                              {ach}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Used Pills */}
                    <div className="pt-2 border-t border-[#27272a]/70">
                      <p className="font-mono text-[11px] text-[#71717a] uppercase tracking-wider mb-2">
                        Technologies & Methodologies:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tech_stack.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-xs px-2.5 py-1 rounded bg-[#18181b] border border-[#27272a] text-[#a1a1aa]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ExperienceSection;
