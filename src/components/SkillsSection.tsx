import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  SearchCode,
  Server,
  Code2,
  Database,
  GitBranch,
  CheckCircle2,
} from "lucide-react";
import { usePersona } from "@/context/PersonaContext";

interface SkillCategory {
  id: string;
  category: string;
  icon: React.ElementType;
  skills: string[];
  forPersona: "dev" | "qa" | "both";
}

const skillCategories: SkillCategory[] = [
  {
    id: "testing",
    category: "Testing & Quality Assurance",
    icon: ShieldCheck,
    forPersona: "qa",
    skills: [
      "Manual Testing",
      "Functional Testing",
      "User Acceptance Testing (UAT)",
      "Regression Testing",
      "Edge-Case Analysis",
      "Smoke & Sanity Testing",
      "Bug Lifecycle Management",
    ],
  },
  {
    id: "api_diagnostics",
    category: "API & Diagnostics",
    icon: SearchCode,
    forPersona: "qa",
    skills: [
      "Postman (REST Validation, Schemas, Status Codes)",
      "Chrome DevTools (Network & Storage)",
      "Swagger/OpenAPI",
      "JSON Payloads",
      "Payload Error Simulation",
    ],
  },
  {
    id: "backend",
    category: "Backend Engineering",
    icon: Server,
    forPersona: "dev",
    skills: [
      "Python (Advanced)",
      "Django",
      "Django REST Framework (DRF)",
      "ASGI / Daphne",
      "WebSockets",
      "Redis Caching",
      "TCP Hardware Sockets (ZKTeco)",
    ],
  },
  {
    id: "frontend",
    category: "Frontend & Mobile-First UI",
    icon: Code2,
    forPersona: "dev",
    skills: [
      "React.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Vanilla CSS",
      "HTML5",
      "Responsive Web Design",
    ],
  },
  {
    id: "database",
    category: "Databases & Architecture",
    icon: Database,
    forPersona: "dev",
    skills: [
      "PostgreSQL",
      "SQLite",
      "Database Indexing & Query Tuning",
      "Progressive Web Apps (PWA)",
      "PKCS#11 Hardware DSC Signing",
    ],
  },
  {
    id: "cicd",
    category: "CI/CD & Tools",
    icon: GitBranch,
    forPersona: "both",
    skills: [
      "Git",
      "GitHub",
      "GitHub Actions (CI/CD Pipelines)",
      "Agile Iterations",
      "Linux CLI",
      "Cloudflare Tunnels",
    ],
  },
];

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { persona } = usePersona();

  // Reorder categories depending on active persona
  const sortedCategories = [...skillCategories].sort((a, b) => {
    if (persona === "qa_tester") {
      if (a.forPersona === "qa" && b.forPersona !== "qa") return -1;
      if (b.forPersona === "qa" && a.forPersona !== "qa") return 1;
    } else {
      if (a.forPersona === "dev" && b.forPersona !== "dev") return -1;
      if (b.forPersona === "dev" && a.forPersona !== "dev") return 1;
    }
    return 0;
  });

  return (
    <section id="skills" ref={ref} className="py-20 sm:py-28 bg-[#09090b] relative">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <div className="section-pill mb-3">
            <SearchCode className="w-3.5 h-3.5 text-[#fafafa]" />
            <span>TECHNICAL SPECIFICATIONS // MATRIX</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#fafafa]">
            Skills, Tools & Engineering Stack
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-mono">
            {persona === "fullstack"
              ? "Backend architectures, real-time event sockets, ORM query tuning & frontend clients."
              : "Defect discovery, automated API schema verification, boundary edge testing & UAT cycles."}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCategories.map((cat, i) => {
            const Icon = cat.icon;
            const isHighlighted =
              (persona === "qa_tester" && cat.forPersona === "qa") ||
              (persona === "fullstack" && cat.forPersona === "dev");

            return (
              <motion.div
                key={cat.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isHighlighted
                    ? "bg-[#121215] border-2 border-white shadow-[0_0_25px_rgba(255,255,255,0.06)]"
                    : "card-noir"
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#27272a]">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          isHighlighted ? "bg-[#fafafa] text-[#09090b]" : "bg-[#18181b] text-[#fafafa] border border-[#27272a]"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-bold text-sm tracking-wide text-[#fafafa]">
                        {cat.category}
                      </h3>
                    </div>

                    {isHighlighted && (
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#fafafa] text-[#09090b] font-bold uppercase tracking-wider">
                        FOCUS
                      </span>
                    )}
                  </div>

                  {/* Skills List */}
                  <div className="space-y-2">
                    {cat.skills.map((skill) => (
                      <div key={skill} className="flex items-center gap-2 group">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#71717a] group-hover:bg-[#fafafa] transition-colors flex-shrink-0" />
                        <span className="font-mono text-xs text-[#a1a1aa] group-hover:text-[#fafafa] transition-colors">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subtext info */}
                <div className="mt-5 pt-3 border-t border-[#27272a]/60">
                  <span className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider">
                    {cat.skills.length} Validated Capabilities
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
