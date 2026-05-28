import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Phone, Globe, Code2 } from "lucide-react";

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const contactInfo = [
    { icon: MapPin, text: "Near Cherthala, Kerala, India" },
    { icon: Mail, text: "alanroyff101@gmail.com", href: "mailto:alanroyff101@gmail.com" },
    { icon: Phone, text: "+91 7511136171", href: "tel:+917511136171" },
    { icon: Globe, text: "alnroy.github.io", href: "https://alnroy.github.io/" },
  ];

  const stats = [
    { label: "Years Active", value: "2+" },
    { label: "Projects Built", value: "10+" },
    { label: "Tech Used", value: "15+" },
    { label: "Clients", value: "5+" },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative">
      {/* Top divider accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

      <div className="container mx-auto px-6 lg:px-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="section-pill mb-4">
            <Code2 className="w-3 h-3" />
            About Me
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-slate-900">
            The <span className="gradient-text">Developer</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="card-light rounded-2xl p-8 space-y-5"
          >
            <h3 className="text-base font-bold text-slate-400 uppercase tracking-widest">My Story</h3>

            <p className="text-slate-600 leading-relaxed">
              I'm a self-driven Full-Stack Developer specializing in{" "}
              <span className="font-semibold text-slate-800">rapid application development</span> using
              advanced AI tools — Cursor, Claude, and LLMs — to maximize velocity and delivery.
            </p>
            <p className="text-slate-600 leading-relaxed">
              At{" "}
              <span className="font-semibold text-blue-600">Vadrida (OPC) Pvt Limited</span>, I architect
              enterprise ERP systems, automated PDF signing pipelines (PyHanko, PyMuPDF), and CI/CD
              workflows using Cloudflare Tunnels — maintaining zero-downtime PWAs in production.
            </p>
            <p className="text-slate-600 leading-relaxed">
              I thrive at the intersection of engineering precision and creative problem-solving — whether
              it's a bank valuation automation app or a multi-language OCR platform.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-5 border-t border-slate-100">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black gradient-text font-display">{s.value}</div>
                  <div className="text-xs text-slate-400 mt-0.5 leading-tight">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Contact + education */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-3"
          >
            {contactInfo.map((item, i) => {
              const Icon = item.icon;
              const inner = (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 group-hover:bg-blue-100 transition-colors flex-shrink-0">
                    <Icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-slate-600 group-hover:text-blue-600 transition-colors text-sm font-medium">{item.text}</span>
                </div>
              );
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.28 + i * 0.08 }}
                  className="card-light rounded-xl px-5 py-4 group hover:translate-x-1 transition-transform"
                >
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                      {inner}
                    </a>
                  ) : inner}
                </motion.div>
              );
            })}

            {/* Education */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="card-surface rounded-xl px-5 py-4"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Education</p>
              <p className="text-slate-700 font-semibold text-sm">BCA — Kerala University</p>
              <p className="text-slate-400 text-xs mt-0.5">2022 – 2025 · Computer Applications</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
