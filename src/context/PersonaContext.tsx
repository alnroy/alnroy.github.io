import React, { createContext, useContext, useState, useEffect } from "react";

export type PersonaId = "fullstack" | "qa_tester";

export interface PersonaConfig {
  id: PersonaId;
  label: string;
  shortLabel: string;
  badge: string;
  headline: string;
  subheadline: string;
  primary_skills: string[];
  resume_download_target: string;
}

export const PERSONAS: Record<PersonaId, PersonaConfig> = {
  fullstack: {
    id: "fullstack",
    label: "Full Stack Engineer",
    shortLabel: "FULLSTACK DEV",
    badge: "BACKEND ARCHITECT // HARDWARE IOT",
    headline: "Architecting Scalable Backends, Real-Time Systems & Hardware IoT",
    subheadline:
      "Production-proven software engineer specializing in Python, Django, high-concurrency WebSockets (ASGI/Daphne), Redis event queues, and modern reactive TypeScript interfaces.",
    primary_skills: [
      "Python",
      "Django",
      "Django REST Framework",
      "WebSockets (ASGI/Daphne)",
      "PostgreSQL",
      "Redis",
      "React.js",
      "TypeScript",
    ],
    resume_download_target: "/resumes/Alan_Roy_FullStack_Python_Resume.pdf",
  },
  qa_tester: {
    id: "qa_tester",
    label: "QA & Software Tester",
    shortLabel: "QA & TESTER",
    badge: "ZERO-DEFECT // UAT SPECIALIST",
    headline: "Ensuring Zero-Defect Delivery, Agile Client UAT & Edge-Case Bug Isolation",
    subheadline:
      "Meticulous QA practitioner with deep experience across test case design, Postman API contract testing, asynchronous race-condition isolation, and statutory compliance verification.",
    primary_skills: [
      "Manual Testing",
      "Functional Testing",
      "User Acceptance Testing (UAT)",
      "Postman API Testing",
      "Agile Iterations",
      "Defect Lifecycle",
      "Chrome DevTools",
    ],
    resume_download_target: "/resumes/Alan_Roy_QA_Software_Tester_Resume.pdf",
  },
};

interface PersonaContextType {
  persona: PersonaId;
  config: PersonaConfig;
  setPersona: (p: PersonaId) => void;
  togglePersona: () => void;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export const PersonaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [persona, setPersonaState] = useState<PersonaId>("fullstack");

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem("alan_roy_persona") as PersonaId | null;
    if (saved && (saved === "fullstack" || saved === "qa_tester")) {
      setPersonaState(saved);
    }
  }, []);

  const setPersona = (p: PersonaId) => {
    setPersonaState(p);
    localStorage.setItem("alan_roy_persona", p);
  };

  const togglePersona = () => {
    const next = persona === "fullstack" ? "qa_tester" : "fullstack";
    setPersona(next);
  };

  return (
    <PersonaContext.Provider
      value={{
        persona,
        config: PERSONAS[persona],
        setPersona,
        togglePersona,
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
};

export const usePersona = () => {
  const ctx = useContext(PersonaContext);
  if (!ctx) {
    throw new Error("usePersona must be used within a PersonaProvider");
  }
  return ctx;
};
