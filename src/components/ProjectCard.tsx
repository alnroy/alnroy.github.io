import { useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectCardProps {
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  features: string[];
  gradient: string;
}

const ProjectCard = ({
  title,
  description,
  longDescription,
  tech,
  image,
  github,
  demo,
  features,
  gradient,
}: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="glass-strong rounded-2xl overflow-hidden hover:neon-glow transition-all duration-300 hover:scale-105 cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        {/* Project image */}
        <div className="relative h-48 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">{description}</p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-strong border-primary/20 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold gradient-text">{title}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image */}
            <div className="relative h-64 rounded-xl overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20`} />
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="text-foreground/80 leading-relaxed">{longDescription}</p>

              {/* Features */}
              <div>
                <h4 className="text-xl font-semibold text-primary mb-3">Key Features</h4>
                <div className="space-y-2">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" />
                      <p className="text-muted-foreground">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech stack */}
              <div>
                <h4 className="text-xl font-semibold text-primary mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="px-4 py-2 rounded-lg bg-primary/10 text-primary border border-primary/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4">
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-primary hover:bg-primary/90 neon-glow-hover">
                      <Github className="mr-2 h-5 w-5" />
                      View Code
                    </Button>
                  </a>
                )}
                {demo && (
                  <a href={demo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="glass border-primary/50 hover:border-primary">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Live Demo
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCard;
