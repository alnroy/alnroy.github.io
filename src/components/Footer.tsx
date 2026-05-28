import { Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 py-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <p className="font-display font-black text-white text-lg tracking-tight">Alan Roy</p>
          <p className="text-slate-500 text-xs mt-0.5">Full-Stack Developer · Kochi, Kerala</p>
        </div>

        <div className="flex items-center gap-3">
          {[
            { icon: Github,    href: "https://github.com/alnroy/" },
            { icon: Linkedin,  href: "https://linkedin.com/in/alan-roy-a87887315/" },
            { icon: Instagram, href: "https://www.instagram.com/alnroy?igsh=cHAxMDZkMncyNW5i" },
          ].map(({ icon: Icon, href }, i) => (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all hover:scale-110">
              <Icon className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
            </a>
          ))}
        </div>

        <p className="text-xs text-slate-600">© {new Date().getFullYear()} Alan Roy. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
