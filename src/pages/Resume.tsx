import Navigation from "@/components/Navigation";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import { Download, Mail, Phone, MapPin, Globe, GraduationCap, Award, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Resume = () => {
  return (
    <div className="min-h-screen selection:bg-primary selection:text-primary-foreground">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section for Resume */}
        <div className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-primary to-transparent" />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div className="inline-block px-4 py-1.5 rounded-full glass border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest mb-4">
                Full Curriculum Vitae
              </div>
              <h1 className="text-6xl sm:text-8xl font-black tracking-tighter uppercase">
                <span className="gradient-text">Alan Roy</span>
              </h1>
              <p className="text-2xl sm:text-3xl font-light text-muted-foreground tracking-wide uppercase">
                Full Stack Developer <span className="text-primary mx-2">•</span> Software Engineer
              </p>

              {/* Contact grid */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-base sm:text-lg max-w-4xl mx-auto pt-8 px-4">
                <div className="flex items-center space-x-3 group">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href="mailto:alanroyff101@gmail.com" className="text-foreground/80 hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-none">
                    alanroyff101@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <a href="tel:+917511136171" className="text-foreground/80 hover:text-primary transition-colors">
                    +91 7511136171
                  </a>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-foreground/80">Cherthala, Kerala, India</span>
                </div>
                <div className="flex items-center space-x-3 group">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Globe className="w-5 h-5" />
                  </div>
                  <a href="https://alnroy.github.io" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-primary transition-colors">
                    alnroy.github.io
                  </a>
                </div>
              </div>

              {/* Download button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pt-10 px-6"
              >
                <a href="ALAN_ROY_FlowCV_Resume_2026-04-29.pdf" download>
                  <Button size="xl" className="w-full sm:w-auto bg-primary hover:bg-primary/90 rounded-2xl px-12 py-7 shadow-lg shadow-primary/20">
                    <Download className="mr-3 h-6 w-6" />
                    Download Latest CV
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Core Content Stack */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto space-y-20">
            
            {/* Professional Profile */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Award className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-wider">Professional Profile</h2>
              </div>
              <div className="glass-strong rounded-3xl p-8 sm:p-10 border-black/5 space-y-6 shadow-sm">
                <p className="text-xl text-foreground/80 leading-relaxed font-light">
                  Dedicated Full Stack Developer with a strong foundation in building scalable digital solutions.
                  Proven track record in developing centralized systems, automating complex workflows, and delivering high-performance applications.
                </p>
                <p className="text-xl text-foreground/80 leading-relaxed font-light">
                  Specialized in Python (Django/DRF), JavaScript (React), and Dart (Flutter).
                  Committed to continuous learning and implementing user-centric designs.
                </p>
              </div>
            </section>

            {/* Professional Experience */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-wider">Professional Experience</h2>
              </div>
              <ExperienceSection />
            </section>

            {/* Education */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-secondary/10 text-secondary">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold uppercase tracking-wider">Education</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="glass-strong rounded-3xl p-8 border-black/5 group hover:border-secondary/30 transition-all shadow-sm">
                  <h3 className="text-xl font-bold mb-2">Bachelor of Computer Application</h3>
                  <p className="text-secondary font-semibold text-lg">Kerala University</p>
                  <div className="flex justify-between items-center mt-6 text-sm text-foreground/50 font-medium">
                    <span>BCA Degree</span>
                    <span>2022 - 2025</span>
                  </div>
                </div>
                <div className="glass-strong rounded-3xl p-8 border-black/5 group hover:border-secondary/30 transition-all shadow-sm">
                  <h3 className="text-xl font-bold mb-2">Higher Secondary</h3>
                  <p className="text-secondary font-semibold text-lg">Kerala State Board</p>
                  <div className="flex justify-between items-center mt-6 text-sm text-foreground/50 font-medium">
                    <span>Computer Science</span>
                    <span>2020 - 2022</span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Resume;
