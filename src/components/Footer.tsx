import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Alan Roy. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center justify-center space-x-1">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-primary animate-glow-pulse" />
            <span>using React, Three.js & Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
