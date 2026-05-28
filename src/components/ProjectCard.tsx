import { useState } from "react";
import { ExternalLink, Github, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

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
      <motion.div
        whileHover={{ y: -10, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong rounded-3xl overflow-hidden hover:neon-glow transition-all duration-500 cursor-pointer group border border-white/5 hover:border-primary/30 h-full flex flex-col"
        onClick={() => setIsOpen(true)}
      >
        {/* Project image */}
        <div className="relative h-56 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-20 z-10`} />
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-20" />
          <div className="absolute bottom-4 left-4 z-30">
            <div className="flex gap-2">
              {tech.slice(0, 2).map((t) => (
                <span key={t} className="text-[10px] px-3 py-1 rounded-full glass border-white/10 text-white font-bold uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col">
          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm flex-grow">
            {description}
          </p>

          <div className="flex items-center text-primary text-sm font-bold group/link mt-4">
            Explore Project
            <ChevronRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-strong border-white/10 max-w-4xl max-h-[90vh] overflow-hidden p-0 rounded-3xl">
          <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-30 z-10`} />
              <img src={image} alt={title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20" />
              <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 z-30">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tighter"
                >
                  {title}
                </motion.h2>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-8 sm:space-y-10">
              {/* Description */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-primary" />
                  <h4 className="text-lg font-bold uppercase tracking-widest text-primary">Overview</h4>
                </div>
                <p className="text-foreground/80 leading-relaxed text-lg font-light">
                  {longDescription}
                </p>
              </div>

              {/* Grid for Features and Tech */}
              <div className="grid md:grid-cols-2 gap-10">
                {/* Features */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-8 bg-secondary" />
                    <h4 className="text-lg font-bold uppercase tracking-widest text-secondary">Key Features</h4>
                  </div>
                  <div className="grid gap-4">
                    {features.map((feature, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="flex items-center space-x-3 group/feat"
                      >
                        <div className="w-2 h-2 rounded-full bg-secondary group-hover/feat:scale-150 transition-transform" />
                        <p className="text-muted-foreground group-hover/feat:text-foreground transition-colors">{feature}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-8 bg-primary" />
                    <h4 className="text-lg font-bold uppercase tracking-widest text-primary">Technologies</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tech.map((t, i) => (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        key={t}
                        className="px-4 py-2 rounded-xl bg-primary/5 text-primary border border-primary/10 text-sm font-bold"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-primary hover:bg-primary/90 px-8 py-6 rounded-xl font-bold shadow-lg shadow-primary/20">
                      <Github className="mr-2 h-5 w-5" />
                      Source Code
                    </Button>
                  </a>
                )}
                {demo && (
                  <a href={demo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="glass border-white/10 hover:border-secondary px-8 py-6 rounded-xl font-bold">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Live Experience
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
