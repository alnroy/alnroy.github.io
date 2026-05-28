import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";

const projects = [
  {
    title: "E-Valuate",
    subtitle: "Bank Valuation Automation PWA",
    description:
      "PWA for banking property valuation — automates the full workflow from site visits to cryptographically signed PDF reports, with async Redis task processing.",
    tech: ["Python", "Django", "Redis", "PyHanko", "PyMuPDF", "SQLite"],
    github: "https://github.com/alnroy",
    accent: "#3b82f6",
    tag: "Production PWA",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=85",
  },
  {
    title: "Convertto",
    subtitle: "OCR & Multi-Language Translation",
    description:
      "Custom OCR platform using Google Cloud Vision API. Translates and converts text among Malayalam, English, and Manglish with a built-in rich text editor.",
    tech: ["JavaScript", "Python", "Google Cloud Vision", "Django", "DRF"],
    github: "https://github.com/alnroy/Convertto/",
    accent: "#06b6d4",
    tag: "Open Source",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=900&q=85",
  },
  {
    title: "CaterCraft",
    subtitle: "Catering Platform — BCA Capstone",
    description:
      "Cross-platform Flutter + Django portal for catering event coordination. Multi-tenant architecture allows vendors to manage catalogs and checkouts independently.",
    tech: ["Flutter", "Dart", "Python", "Django", "REST API", "PostgreSQL"],
    github: "https://github.com/alnroy",
    accent: "#8b5cf6",
    tag: "Mobile App",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85",
  },
  {
    title: "I-Business",
    subtitle: "Business Management Platform",
    description:
      "React + DRF business ops platform with a fully editable admin panel, JWT-based security model, and dynamic product management interface.",
    tech: ["React", "Django", "DRF", "PostgreSQL", "JWT"],
    github: "https://github.com/alnroy",
    accent: "#10b981",
    tag: "Full-Stack",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85",
  },
  {
    title: "MyMedia",
    subtitle: "Personal Media Library App",
    description:
      "React media library with JWT auth, Cloudinary integration, and full CRUD backed by Express + MySQL. Clean dashboard for tracking shows and movies.",
    tech: ["React", "Express", "MySQL", "JWT", "Cloudinary"],
    github: "https://github.com/alnroy",
    accent: "#f97316",
    tag: "React App",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=85",
  },
];

const ProjectCard = ({ project, index, isInView }: { project: typeof projects[0]; index: number; isInView: boolean }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    const y = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    setTilt({ x: -x * 5, y: y * 5 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "900px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
    >
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="card-light rounded-2xl overflow-hidden group"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Tag */}
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white"
              style={{ background: project.accent + "cc" }}>
              {project.tag}
            </span>
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-lg font-bold text-white leading-tight">{project.title}</h3>
            <p className="text-xs font-medium mt-0.5 text-white/80">{project.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Accent line */}
          <div className="w-10 h-0.5 rounded mb-4" style={{ background: project.accent }} />

          <p className="text-slate-500 text-sm leading-relaxed mb-4">{project.description}</p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                {t}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:scale-105"
              style={{ background: project.accent + "12", color: project.accent }}>
              <Github className="w-3.5 h-3.5" />
              GitHub
            </a>
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 transition-all hover:scale-105">
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-24 sm:py-32 bg-[#f9f9fb]">
      <div className="container mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="section-pill mb-4">
            <Layers className="w-3 h-3" />
            Portfolio
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-slate-900">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-md text-base">
            Production systems, open-source tools, and client work.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
