import Navigation from "@/components/Navigation";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-5xl font-bold text-center mb-8">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision
          </p>
        </div>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
