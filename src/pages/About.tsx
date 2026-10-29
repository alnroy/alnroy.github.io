import Navigation from "@/components/Navigation";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-white selection:text-black">
      <Navigation />
      <main className="pt-16">
        <AboutSection />
        <SkillsSection />
      </main>
      <Footer />
    </div>
  );
};

export default About;
