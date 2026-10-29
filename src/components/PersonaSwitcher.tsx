import React from "react";
import { motion } from "framer-motion";
import { Terminal, ShieldCheck } from "lucide-react";
import { usePersona, PersonaId } from "@/context/PersonaContext";

interface PersonaSwitcherProps {
  className?: string;
  variant?: "hero" | "compact";
}

export const PersonaSwitcher: React.FC<PersonaSwitcherProps> = ({
  className = "",
  variant = "hero",
}) => {
  const { persona, setPersona } = usePersona();

  const options: { id: PersonaId; label: string; icon: React.ElementType; sub: string }[] = [
    {
      id: "fullstack",
      label: "Full Stack Engineer",
      icon: Terminal,
      sub: "Django · WebSockets · IoT",
    },
    {
      id: "qa_tester",
      label: "QA & Software Tester",
      icon: ShieldCheck,
      sub: "Zero-Defect · UAT · Postman",
    },
  ];

  if (variant === "compact") {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-lg bg-[#121215] border border-[#27272a] ${className}`}
      >
        {options.map((opt) => {
          const isActive = persona === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => setPersona(opt.id)}
              className={`relative flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium rounded transition-colors ${
                isActive ? "text-[#09090b]" : "text-[#a1a1aa] hover:text-[#fafafa]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="compact-persona-pill"
                  className="absolute inset-0 bg-[#fafafa] rounded shadow-sm"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5" />
                <span>{opt.id === "fullstack" ? "DEV" : "QA"}</span>
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`w-full max-w-xl p-1.5 rounded-xl bg-[#121215] border border-[#27272a] shadow-xl ${className}`}
    >
      <div className="grid grid-cols-2 gap-1.5">
        {options.map((opt) => {
          const isActive = persona === opt.id;
          const Icon = opt.icon;
          return (
            <button
              key={opt.id}
              onClick={() => setPersona(opt.id)}
              className={`relative flex flex-col items-center justify-center py-2.5 px-3 sm:px-4 rounded-lg text-left transition-all duration-200 select-none ${
                isActive
                  ? "text-[#09090b]"
                  : "text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="hero-persona-pill"
                  className="absolute inset-0 bg-[#fafafa] rounded-lg shadow-md"
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                />
              )}
              <div className="relative z-10 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#09090b]" : "text-[#fafafa]"}`} />
                <span className="font-display font-bold text-xs sm:text-sm tracking-wide">
                  {opt.label}
                </span>
              </div>
              <span
                className={`relative z-10 text-[10px] font-mono mt-0.5 tracking-tight ${
                  isActive ? "text-[#27272a] font-medium" : "text-[#71717a]"
                }`}
              >
                {opt.sub}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PersonaSwitcher;
