import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-white selection:text-black">
      <Navigation />
      <main className="pt-16">
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
