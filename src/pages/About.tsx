import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-bold text-center mb-8">
            About <span className="gradient-text">Me</span>
          </h1>
        </div>
        <AboutSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
