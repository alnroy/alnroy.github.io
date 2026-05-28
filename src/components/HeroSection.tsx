import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowDown, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStacked, setIsStacked] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsStacked(mql.matches);
    mql.addEventListener("change", onChange);
    setIsStacked(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 380], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-[#f9f9fb]"
      style={{ perspective: "1200px" }}
    >
      {/* Soft background blobs — very subtle */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }} />
      </div>

      <div className="container mx-auto px-6 lg:px-10 pt-24 pb-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center min-h-[85vh]">

          {/* LEFT — Text */}
          <motion.div style={{ y: isStacked ? 0 : contentY, opacity: isStacked ? 1 : opacity }} className="space-y-8 order-2 md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-pill mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                Full-Stack Developer · AI-Assisted Engineering
              </div>

              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92] text-slate-900">
                Alan<br />
                <span className="gradient-text">Roy.</span>
              </h1>

              <p className="mt-6 text-lg text-slate-500 leading-relaxed max-w-md font-light">
                I build{" "}
                <span className="font-semibold text-slate-700">production-grade systems</span> — ERPs,
                PWAs, automation pipelines — faster with{" "}
                <span className="font-semibold text-blue-600">AI-assisted development</span>.
              </p>
            </motion.div>

            {/* Tech tags */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="flex flex-wrap gap-2"
            >
              {["Python", "Django", "React", "Flutter", "PostgreSQL", "Redis"].map((t) => (
                <span key={t}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-default">
                  {t}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/projects">
                <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-200 hover:shadow-blue-300">
                  View My Work
                </button>
              </Link>
              <a href="mailto:alanroyff101@gmail.com">
                <button className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 transition-all hover:-translate-y-0.5 shadow-sm">
                  <Mail className="w-4 h-4" />
                  Get In Touch
                </button>
              </a>
              <a href="ALAN-ROY-FlowCV-Resume-20251017.pdf" download>
                <button className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors">
                  <Download className="w-4 h-4" />
                  Resume
                </button>
              </a>
            </motion.div>

            {/* Location line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-slate-400 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
              Available · Kochi, Kerala, India
            </motion.p>
          </motion.div>

          {/* RIGHT — Photo: head pops above circle, white bg erased via multiply */}
          <motion.div
            style={{ y: isStacked ? 0 : contentY, opacity: isStacked ? 1 : opacity }}
            className="order-1 md:order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/*
              Wrapper is TALLER than the circle so image overflows above.
              Circle anchored to BOTTOM = stage/ground.
              Image anchored to BOTTOM = body sits in circle, head pops out above.
              mix-blend-mode:multiply on a near-white page bg kills the JPG white bg.
            */}
            <div className="relative w-[240px] h-[340px] md:w-[250px] md:h-[360px] lg:w-[300px] lg:h-[430px] flex-shrink-0">

              {/* Circle — the stage, sits at the bottom */}
              <div className="absolute bottom-[50px] md:bottom-[50px] lg:bottom-[60px] left-[40%] -translate-x-1/2 w-[260px] md:w-[260px] lg:w-[310px] h-[210px] md:h-[210px] lg:h-[250px] rounded-[10%_50%_15%_1%] bg-[#eef0f8] shadow-[0_20px_50px_rgba(0,0,0,0.30),_0_6px_16px_rgba(0,0,0,0.18)] z-[1]" />

              {/*
                Image raised 28px from bottom so shirt/wrist stay inside circle.
                Width fits comfortably inside circle (no side overflow).
                mix-blend-mode:multiply erases white bg.
              */}
              <img
                src="/1000040683.jpg"
                alt="Alan Roy"
                className="absolute bottom-[60px] md:bottom-[60px] lg:bottom-[70px] left-[40%] -translate-x-1/2 w-[370px] md:w-[370px] lg:w-[450px] h-auto z-[2] mix-blend-multiply rounded-[10%] block"
              />

            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{ opacity: isStacked ? 1 : opacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
