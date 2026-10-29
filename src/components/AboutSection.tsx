import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Globe,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { usePersona } from "@/context/PersonaContext";

const stats = [
  { label: "Banking Engines", value: "Standardized" },
  { label: "Latency Cut", value: "75%" },
  { label: "Uptime Maintained", value: "99.9%" },
  { label: "Defect Escape Rate", value: "0.0%" },
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { persona } = usePersona();

  return (
    <section id="about" ref={ref} className="py-20 sm:py-28 bg-[#09090b] relative">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <div className="section-pill mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#fafafa]" />
            <span>BACKGROUND // OPERATIONAL PROFILE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#fafafa]">
            About Alan Roy
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-mono">
            Full-Stack Software Engineer & Software QA Practitioner based in Kerala, India.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Story & Technical Philosophy (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 card-noir rounded-xl p-6 sm:p-8 space-y-6"
          >
            <div className="flex items-center gap-2 pb-3 border-b border-[#27272a]">
              <span className="font-mono text-xs text-[#71717a] uppercase tracking-wider">
                Engineering Narrative
              </span>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-[#a1a1aa] leading-relaxed">
              <p>
                I am a software engineer with dual proficiency in{" "}
                <span className="text-[#fafafa] font-semibold">robust backend development</span> and{" "}
                <span className="text-[#fafafa] font-semibold">disciplined software quality assurance</span>.
                My focus centers on shipping production-grade applications that operate reliably under real-world
                concurrency.
              </p>

              <p>
                At <span className="text-[#fafafa] font-semibold">Vadrida Technologies</span>, I engineered the
                centralized valuation platform standardizing report formats across major institutional banks (SBI, Axis, Muthoot, SIB),
                reducing report drafting turnaround times by 75%. I also built high-concurrency real-time WebSocket
                channels using Daphne (ASGI) and integrated hardware IoT biometric communication over TCP sockets.
              </p>

              <p>
                On the QA side, I conduct rigorous manual, functional, and API contract test cycles using Postman,
                catching edge-case race conditions and enforcing Kerala Building Rules (KPBR/KMBR) statutory
                compliance across computational engines.
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#27272a]">
              {stats.map((s) => (
                <div key={s.label} className="p-3 rounded-lg bg-[#18181b] border border-[#27272a]/70">
                  <p className="font-display font-black text-lg sm:text-xl text-[#fafafa]">
                    {s.value}
                  </p>
                  <p className="font-mono text-[10px] text-[#71717a] uppercase mt-0.5">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details & Education Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            {/* Quick Contact Info */}
            <div className="card-noir rounded-xl p-5 space-y-3">
              <p className="font-mono text-[11px] text-[#71717a] uppercase tracking-wider mb-2">
                Coordinates & Details
              </p>
              
              <div className="flex items-center gap-3 text-xs font-mono text-[#a1a1aa]">
                <MapPin className="w-4 h-4 text-[#fafafa] flex-shrink-0" />
                <span>Cherthala, Alappuzha, Kerala - 688541</span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#a1a1aa]">
                <Mail className="w-4 h-4 text-[#fafafa] flex-shrink-0" />
                <a href="mailto:alanroyff101@gmail.com" className="hover:text-white transition-colors">
                  alanroyff101@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#a1a1aa]">
                <Phone className="w-4 h-4 text-[#fafafa] flex-shrink-0" />
                <a href="tel:+917511136171" className="hover:text-white transition-colors">
                  +91 7511136171
                </a>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-[#a1a1aa]">
                <Globe className="w-4 h-4 text-[#fafafa] flex-shrink-0" />
                <a href="https://alnroy.github.io" className="hover:text-white transition-colors">
                  alnroy.github.io
                </a>
              </div>
            </div>

            {/* Education Card */}
            <div className="card-noir rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#fafafa]" />
                <p className="font-mono text-[11px] text-[#71717a] uppercase tracking-wider">
                  Academic Background
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-sm text-[#fafafa]">
                  Bachelor of Computer Applications (BCA)
                </h4>
                <p className="text-xs text-[#a1a1aa] mt-0.5 font-mono">
                  Kerala University • 2022 – 2025
                </p>
                <p className="text-xs text-[#71717a] mt-1">
                  Computer Applications, Database Systems, Software Engineering & Applied Algorithms.
                </p>
              </div>
            </div>

            {/* Availability status */}
            <div className="card-noir rounded-xl p-4 bg-[#18181b]/50 border-emerald-500/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Join Notice: Within 30 Days
                </span>
              </div>
              <p className="font-mono text-[11px] text-[#a1a1aa] mt-1.5 leading-relaxed">
                Available to join within 15 days for full-time roles, contracts, and remote engineering engagements.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
