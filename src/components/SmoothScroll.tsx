import { useEffect, useRef } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const scrollToSection = (target: string | HTMLElement) => {
  const el = typeof target === "string" ? document.getElementById(target.replace("#", "")) : target;
  if (!el) return;

  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -70, duration: 1.2 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
