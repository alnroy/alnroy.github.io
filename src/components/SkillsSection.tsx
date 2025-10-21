import { useInView } from "react-intersection-observer";
import { Code2, Database, Smartphone, Brain, Server, Palette } from "lucide-react";

const SkillsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: "Frontend",
      icon: Code2,
      skills: ["React", "HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Responsive Design"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Backend",
      icon: Server,
      skills: ["Python", "Django", "Django REST Framework", "Node.js", "API Design"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Mobile",
      icon: Smartphone,
      skills: ["Flutter", "Dart", "Cross-platform Development", "Mobile UI/UX"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Database",
      icon: Database,
      skills: ["SQL", "PostgreSQL", "MySQL", "Database Design"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Machine Learning",
      icon: Brain,
      skills: ["TensorFlow", "Pandas", "NumPy", "Scikit-learn"],
      color: "from-indigo-500 to-violet-500",
    },
    {
      title: "Tools & Other",
      icon: Palette,
      skills: ["Git", "GitHub", "API Integration", "UI/UX Design", "Agile Methodology","Modern AI tools"],
      color: "from-yellow-500 to-amber-500",
    },
  ];

  return (
    <section id="skills" className="py-20 sm:py-32 relative">
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
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              A comprehensive toolkit for building modern, scalable applications
            </p>
          </div>

          {/* Skills grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.title}
                  className={`glass-strong rounded-2xl p-6 hover:neon-glow transition-all hover:scale-105 ${
                    inView ? "animate-fade-in-up" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Category header */}
                  <div className="flex items-center space-x-3 mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                  </div>

                  {/* Skills list */}
                  <div className="space-y-2">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
