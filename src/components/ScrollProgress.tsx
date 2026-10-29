import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      if (totalHeight > 0) {
        setProgress((scrolled / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2 hidden lg:flex pointer-events-none">
      {/* Monochrome Track */}
      <div className="relative w-1 h-28 bg-[#18181b] border border-[#27272a] rounded-full overflow-hidden">
        <div
          className="absolute top-0 w-full bg-[#fafafa] rounded-full transition-all duration-100"
          style={{ height: `${Math.min(progress, 100)}%` }}
        />
      </div>
      {/* Indicator Dot */}
      <div
        className="w-1.5 h-1.5 rounded-full bg-[#fafafa] shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        style={{ opacity: progress > 3 ? 1 : 0.2, transition: "opacity 0.3s" }}
      />
    </div>
  );
};

export default ScrollProgress;
