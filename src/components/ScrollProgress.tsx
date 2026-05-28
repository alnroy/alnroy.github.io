import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress((scrolled / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 hidden md:flex">
      {/* Track */}
      <div className="relative w-0.5 h-32 bg-white/10 rounded-full overflow-hidden">
        <div
          className="absolute top-0 w-full bg-gradient-to-b from-violet-400 to-cyan-400 rounded-full transition-all duration-100"
          style={{ height: `${Math.min(progress * 1.5, 100)}%` }}
        />
      </div>
      {/* Dot */}
      <div
        className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]"
        style={{ opacity: progress > 5 ? 1 : 0, transition: "opacity 0.3s" }}
      />
    </div>
  );
};

export default ScrollProgress;
