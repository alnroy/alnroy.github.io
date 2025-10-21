import { useInView } from "react-intersection-observer";
import { Building2, Calendar, MapPin } from "lucide-react";

const ExperienceSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      company: "LogicCraft",
      role: "Full Stack Developer Intern",
      period: "2024 - Present",
      location: "Remote",
      description: "Leading development of CaterCraft platform",
      achievements: [
        "Developed full-stack catering and event management platform using Django and React",
        "Implemented real-time booking system with advanced admin dashboard",
        "Created RESTful APIs for seamless frontend-backend communication",
        "Designed responsive UI with modern UX principles",
        "Integrated payment gateways and automated email notifications",
      ],
    },
    {
      company: "QSpiders",
      role: "Python Full Stack Intern",
      period: "2023 - 2024",
      location: "Bangalore, India",
      description: "Intensive training in Python full-stack development",
      achievements: [
        "Completed comprehensive training in Python, Django, and web technologies",
        "Built multiple full-stack applications following industry best practices",
        "Learned advanced concepts in database design and API development",
        "Gained hands-on experience with Git, deployment, and DevOps fundamentals",
        "Collaborated on team projects using Agile methodologies",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-5xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Experience & <span className="gradient-text">Internships</span>
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
          </div>

          {/* Experience timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`glass-strong rounded-2xl p-8 hover:neon-glow transition-all ${
                  inView ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                    <div className="flex items-center space-x-2 text-primary">
                      <Building2 className="w-5 h-5" />
                      <span className="text-lg font-semibold">{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-start md:items-end space-y-1 mt-4 md:mt-0">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{exp.period}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{exp.location}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4 italic">{exp.description}</p>

                {/* Achievements */}
                <div className="space-y-3">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-foreground/80 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
