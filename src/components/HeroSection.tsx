import { ArrowDown, Download, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingCity3D from "./FloatingCity3D";
import { Link } from "react-router-dom";

const HeroSection = () => {
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
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="gradient-text">ALAN ROY</span>
            </h1>
            <div className="h-1 w-32 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full neon-glow" />
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
            <a href="/resume.pdf" download>
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

          {/* Scroll indicator */}
          <button
            onClick={() => scrollToSection("about")}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            aria-label="Scroll to content"
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
