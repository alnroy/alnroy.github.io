import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Building2, Calendar, MapPin, Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Vadrida (OPC) Pvt Limited",
    role: "Full-Stack Developer & IT Lead",
    period: "12/2025 – Present",
    location: "Kochi, Kerala",
    type: "Full-Time",
    accent: "#3b82f6",
    description: "Architected enterprise-level ERP systems and automation pipelines.",
    achievements: [
      "Architected centralized property valuation and ERP business systems",
      "Implemented automated PDF generation & cryptographic digital signing (PyHanko, PyMuPDF)",
      "Designed CI/CD pipelines with GitHub + Cloudflare Tunnel for zero-downtime PWAs",
      "Configured company infrastructure — domain management, servers, networking",
    ],
  },
  {
    company: "Freelance",
    role: "Full-Stack Developer",
    period: "06/2025 – 12/2025",
    location: "Remote",
    type: "Freelance",
    accent: "#10b981",
    description: "Built tailored digital products for local business clients.",
    achievements: [
      "Built marketing websites and e-commerce platforms using React & Django",
      "Designed scalable database schemas with async task processing via Redis",
      "Delivered responsive Flutter mobile apps with DRF backends",
    ],
  },
  {
    company: "LogicCraft – Manappuram",
    role: "Application Development Intern",
    period: "01/2025 – 06/2025",
    location: "Malappuram, Kerala",
    type: "Internship",
    accent: "#8b5cf6",
    description: "Mobile and web application development internship.",
    achievements: [
      "Contributed to 'CaterCraft' Flutter mobile application",
      "Developed RESTful APIs with Django REST Framework for mobile data exchange",
      "Collaborated on multi-tenant vendor portal architecture",
    ],
  },
  {
    company: "QSpiders – Kochi",
    role: "Python Full-Stack Developer Intern",
    period: "06/2025 – 09/2025",
    location: "Kochi, Kerala",
    type: "Training",
    accent: "#f97316",
    description: "Intensive hands-on full-stack Python development training.",
    achievements: [
      "Specialized in Python, Django, and React full-stack development",
      "Built scalable web apps with PostgreSQL and RESTful API architectures",
      "Participated in code reviews and architectural planning sessions",
    ],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section id="experience" ref={sectionRef} className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="section-pill mb-4">
            <Briefcase className="w-3 h-3" />
            Career
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-slate-900">
            Experience &{" "}
            <span className="gradient-text">Journey</span>
          </h2>
        </motion.div>

        <div className="relative max-w-4xl">
          {/* Animated vertical line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-100 hidden sm:block overflow-hidden">
            <motion.div
              className="timeline-line absolute top-0 left-0 w-full"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6"
              >
                {/* Timeline dot */}
                <div className="flex-shrink-0 mt-5 hidden sm:flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border-4 border-white"
                    style={{ background: exp.accent + "18", boxShadow: `0 0 0 2px ${exp.accent}40` }}
                  >
                    <div className="w-3 h-3 rounded-full" style={{ background: exp.accent }} />
                  </div>
                </div>

                {/* Card */}
                <div className="card-light rounded-2xl p-6 sm:p-7 flex-1 group">
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-6 right-6 h-px rounded" style={{ background: `linear-gradient(90deg, ${exp.accent}60, transparent)` }} />

                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{exp.role}</h3>
                      <div className="flex items-center gap-1.5 mt-1" style={{ color: exp.accent }}>
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-sm font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                        style={{ background: exp.accent + "14", color: exp.accent }}>
                        {exp.type}
                      </span>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <Calendar className="w-3 h-3" />{exp.period}
                      </div>
                      <div className="flex items-center gap-1 text-slate-400 text-xs">
                        <MapPin className="w-3 h-3" />{exp.location}
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm italic mb-4">{exp.description}</p>

                  <div className="space-y-2">
                    {exp.achievements.map((a, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: exp.accent }} />
                        <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
