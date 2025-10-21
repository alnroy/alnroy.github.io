import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";

const ProjectsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "CaterCraft",
      description: "Comprehensive catering and event management platform with real-time booking system",
      longDescription:
        "CaterCraft is a full-featured catering and event registration platform built with Django and React. It provides a seamless experience for customers to browse services, make bookings, and manage events, while offering powerful admin tools for business management.",
      tech: ["Django", "React", "PostgreSQL", "REST API", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800",
      github: "https://github.com/alnroy",
      features: [
        "Real-time booking and availability management",
        "Advanced admin dashboard with analytics",
        "User authentication and profile management",
        "Staff management system",
        "Earnings tracking and reporting",
        "Responsive design for all devices",
      ],
      gradient: "from-blue-500 to-purple-600",
    },
    {
      title: "Cardio - Heart Disease Prediction",
      description: "Machine learning model for predicting heart disease risk using patient data",
      longDescription:
        "Cardio is a machine learning application that predicts the likelihood of heart disease based on patient health metrics. Built with Python and TensorFlow, it provides accurate predictions to assist in early diagnosis.",
      tech: ["Python", "TensorFlow", "Pandas", "Scikit-learn", "Flask"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
      github: "https://github.com/alnroy",
      features: [
        "ML model trained on comprehensive health datasets",
        "Real-time prediction interface",
        "Data visualization and analytics",
        "High accuracy prediction rates",
        "User-friendly input forms",
      ],
      gradient: "from-red-500 to-pink-600",
    },
    {
      title: "LogicCraft Website",
      description: "Modern corporate website showcasing services and portfolio",
      longDescription:
        "LogicCraft's corporate website is a sleek, modern platform built with React and Tailwind CSS. It showcases the company's services, portfolio, and team with engaging animations and responsive design.",
      tech: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      demo: "https://logiccraft.example.com",
      github: "https://github.com/alnroy",
      features: [
        "Responsive single-page application",
        "Smooth scrolling and animations",
        "Service showcase with interactive cards",
        "Team member profiles",
        "Contact form integration",
      ],
      gradient: "from-green-500 to-teal-600",
    },
    {
      title: "Sportellette",
      description: "Sports event management and registration platform",
      longDescription:
        "Sportellette is a comprehensive platform for managing sports events, registrations, and schedules. Built with Django and Flutter, it provides a seamless experience for both organizers and participants.",
      tech: ["Django", "Flutter", "PostgreSQL", "REST API"],
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800",
      github: "https://github.com/alnroy",
      features: [
        "Event creation and management",
        "Participant registration system",
        "Real-time schedule updates",
        "Mobile app with Flutter",
        "Payment integration",
      ],
      gradient: "from-orange-500 to-yellow-600",
    },
    {
      title: "Convertto",
      description: "Handwriting-to-text conversion tool using OCR technology",
      longDescription:
        "Convertto is an intelligent OCR application that converts handwritten text to digital format. Using advanced machine learning models, it provides accurate text recognition from images.",
      tech: ["Python", "TensorFlow", "OpenCV", "Flask", "React"],
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800",
      github: "https://github.com/alnroy",
      features: [
        "High-accuracy handwriting recognition",
        "Support for multiple languages",
        "Batch processing capabilities",
        "Export to multiple formats",
        "User-friendly web interface",
      ],
      gradient: "from-indigo-500 to-purple-600",
    },
  ];

  return (
    <section id="projects" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              A collection of my work showcasing full-stack development, machine learning, and modern web technologies
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className={inView ? "animate-fade-in-up" : ""}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
