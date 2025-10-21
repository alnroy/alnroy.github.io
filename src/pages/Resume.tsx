import Navigation from "@/components/Navigation";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import { Download, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Resume = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Header */}
        <div className="glass-strong border-b border-primary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center space-y-6">
              <h1 className="text-5xl sm:text-6xl font-bold">
                <span className="gradient-text">ALAN ROY</span>
              </h1>
              <p className="text-2xl font-semibold text-foreground">Full Stack Developer</p>
              
              {/* Contact info */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href="mailto:alanroyffl01@gmail.com" className="hover:text-primary transition-colors">
                    alanroyffl01@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:+917511136171" className="hover:text-primary transition-colors">
                    +91 7511136171
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>Near Cherthala, Kerala</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-primary" />
                  <a
                    href="https://alnroy.github.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    alnroy.github.io
                  </a>
                </div>
              </div>

              {/* Download button */}
              <div className="pt-4">
                <a href="/resume.pdf" download>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 neon-glow-hover">
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume PDF
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto glass-strong rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6">
              Professional <span className="gradient-text">Summary</span>
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              Passionate Full Stack Developer with expertise in building scalable web and mobile applications. 
              Proficient in Python, Django, React, and Flutter with a strong foundation in machine learning. 
              Experienced in developing end-to-end solutions from concept to deployment, with a focus on 
              creating intuitive user experiences and efficient backend systems. Demonstrated ability to work 
              in fast-paced environments and deliver high-quality results.
            </p>
          </div>
        </div>

        <SkillsSection />
        <ExperienceSection />

        {/* Education */}
        <section className="py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                  <span className="gradient-text">Education</span>
                </h2>
                <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
              </div>

              <div className="glass-strong rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">Bachelor of Computer Applications</h3>
                <p className="text-primary font-semibold mb-2">University Name</p>
                <p className="text-muted-foreground">2020 - 2023</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resume;
