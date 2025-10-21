import Navigation from "@/components/Navigation";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

const Projects = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-bold text-center mb-8">
            My <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Explore my portfolio of full-stack applications, machine learning projects, and modern web experiences
          </p>
        </div>
        <ProjectsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
