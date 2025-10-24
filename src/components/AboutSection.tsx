import { useInView } from "react-intersection-observer";
import { MapPin, Mail, Phone, Globe } from "lucide-react";

const AboutSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    { icon: MapPin, text: "Near Cherthala, Alappuzha, Kerala, India" },
    { icon: Mail, text: "alanroyffl01@gmail.com", href: "mailto:alanroyffl01@gmail.com" },
    { icon: Phone, text: "+91 7511136171", href: "tel:+917511136171" },
    { icon: Globe, text: "alnroy.github", href: "https://github.com/alnroy/" },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`max-w-4xl mx-auto transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="h-1 w-20 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full" />
          </div>

          {/* Content grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Bio */}
            <div className="glass-strong rounded-2xl p-8 space-y-4">
              <h3 className="text-2xl font-bold text-primary mb-4">Biography</h3>
              <p className="text-muted-foreground leading-relaxed">
                I'm a passionate Full Stack Developer with expertise in building modern web and mobile applications. 
                My journey in tech has been driven by curiosity and a commitment to creating innovative solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a strong foundation in Python, Django, Flutter, and React, I specialize in developing 
                scalable applications that solve real-world problems with the help of modern Technologies like AI. I'm constantly exploring new technologies 
                and methodologies to enhance my skill set.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond coding, I'm enthusiastic about machine learning and its applications in building 
                intelligent systems. I believe in continuous learning and sharing knowledge with the developer community.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={index}
                    className={`glass-strong rounded-xl p-6 hover:neon-glow transition-all hover:scale-105 ${
                      inView ? "animate-fade-in-up" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start space-x-4 group"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        <Icon className="w-6 h-6 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="text-foreground/80 group-hover:text-primary transition-colors break-all">
                          {item.text}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-start space-x-4">
                        <Icon className="w-6 h-6 text-primary flex-shrink-0" />
                        <span className="text-foreground/80">{item.text}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
