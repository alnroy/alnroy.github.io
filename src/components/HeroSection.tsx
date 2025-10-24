import { useState } from "react";
import { Download, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCity3D from "./FloatingCity3D";
import { Link } from "react-router-dom";
import InteractiveAI from "@/components/InteractiveAI";

const HeroSection = () => {
  const [isAIOpen, setIsAIOpen] = useState(false); // Modal state

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <FloatingCity3D />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          
          {/* Main heading with profile pic */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src="profile.jpg"
              alt="Alan Roy"
              className="w-32 h-32 rounded-full border-4 border-primary neon-glow object-cover object-[center_0%]"
            />
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">ALAN ROY</span>
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-primary to-secondary rounded-full neon-glow" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Full Stack Developer
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Full-stack web & mobile development with{" "}
            <span className="text-primary font-semibold">Django</span>,{" "}
            <span className="text-primary font-semibold">Flutter</span>,{" "}
            <span className="text-primary font-semibold">React</span>, and{" "}
            <span className="text-primary font-semibold">ML</span>
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {["Python", "Django", "React", "Flutter", "Machine Learning"].map((tech) => (
              <span
                key={tech}
                className="glass px-4 py-2 rounded-full text-sm font-medium neon-glow-hover transition-all hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/projects">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow-hover group"
              >
                <Briefcase className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                View Projects
              </Button>
            </Link>
            <a href="ALAN-ROY-FlowCV-Resume-20251017.pdf" download>
              <Button
                size="lg"
                variant="outline"
                className="glass-strong border-primary/50 hover:border-primary text-foreground hover:bg-primary/10"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </Button>
            </a>
          </div>

          {/* Interactive AI button */}
          <div className="flex justify-center py-12">
            <button
              onClick={() => setIsAIOpen(true)}
              className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 neon-glow-hover"
            >
              Interactive AI
            </button>
          </div>

          {/* Modal */}
          <InteractiveAI isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
