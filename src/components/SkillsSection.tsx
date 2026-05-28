import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Server, Code2, Smartphone, Database, Brain, Palette } from "lucide-react";

const skillCategories = [
  {
    title: "Backend",
    icon: Server,
    color: "text-blue-600",
    bg: "bg-blue-50",
    dot: "bg-blue-500",
    skills: ["Python", "Django", "DRF", "Flask", "PostgreSQL", "Redis"],
  },
  {
    title: "Frontend & UI",
    icon: Code2,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    dot: "bg-indigo-500",
    skills: ["React", "JavaScript ES6+", "HTML5 / CSS3", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Mobile",
    icon: Smartphone,
    color: "text-purple-600",
    bg: "bg-purple-50",
    dot: "bg-purple-500",
    skills: ["Flutter", "Dart", "Cross-Platform UI", "State Management", "REST Integration"],
  },
  {
    title: "DevOps & Tools",
    icon: Database,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    dot: "bg-emerald-500",
    skills: ["Git / GitHub", "Cloudflare Tunnel", "CI/CD", "Linux Admin", "Domain Mgmt"],
  },
  {
    title: "AI & Engineering",
    icon: Brain,
    color: "text-orange-600",
    bg: "bg-orange-50",
    dot: "bg-orange-500",
    skills: ["Prompt Engineering", "LLM Integration", "Cursor / Claude", "AI Orchestration"],
  },
  {
    title: "Utilities & APIs",
    icon: Palette,
    color: "text-rose-600",
    bg: "bg-rose-50",
    dot: "bg-rose-500",
    skills: ["PyHanko", "PyMuPDF", "Google Cloud Vision", "JWT Auth", "VBA / Excel"],
  },
];

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 sm:py-32 bg-[#f9f9fb]">
      <div className="container mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="section-pill mb-4">
            <Cpu className="w-3 h-3" />
            Technical Skills
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-slate-900">
            Skills &{" "}
            <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-md text-base">
            A full-spectrum toolkit for shipping production-ready applications.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 28 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="card-light rounded-2xl p-6 group"
              >
                {/* Icon header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${cat.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wide">{cat.title}</h3>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  {cat.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${cat.dot} flex-shrink-0`} />
                      <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">{skill}</span>
                    </div>
                  ))}
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
