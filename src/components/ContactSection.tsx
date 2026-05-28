import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Send, Github, Linkedin, Instagram, ChevronRight, MessageSquare } from "lucide-react";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .send("service_i24br4l", "template_ynzu7or", {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      }, "A2xWpSiHG4HIeHQGt")
      .then(() => {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      })
      .catch(() => {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      });
  };

  const socialLinks = [
    { icon: Github,    href: "https://github.com/alnroy/",                                         label: "GitHub",    color: "#1e293b" },
    { icon: Linkedin,  href: "https://linkedin.com/in/alan-roy-a87887315/",                        label: "LinkedIn",  color: "#0a66c2" },
    { icon: Instagram, href: "https://www.instagram.com/alnroy?igsh=cHAxMDZkMncyNW5i",             label: "Instagram", color: "#e1306c" },
  ];

  const inputClass = "w-full rounded-xl px-4 py-3 text-sm text-slate-700 outline-none border border-slate-200 bg-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all";

  return (
    <section id="contact" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="section-pill mb-4">
            <MessageSquare className="w-3 h-3" />
            Contact
          </div>
          <h2 className="font-display text-5xl sm:text-6xl font-black tracking-tight text-slate-900">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-slate-500 mt-3 max-w-md text-base">
            Open to new projects, opportunities, and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="card-light rounded-2xl p-8 sm:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Name</label>
                    <input type="text" placeholder="Alan Roy" value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Email</label>
                    <input type="email" placeholder="hello@example.com" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-1.5">Message</label>
                  <textarea placeholder="Tell me about your project..." value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required rows={5} className={inputClass + " resize-none"} />
                </div>
                <button type="submit" disabled={status === "sending"}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 shadow-lg shadow-blue-200 hover:shadow-blue-300 transition-all disabled:opacity-60">
                  {status === "sending" ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
                  ) : status === "sent" ? <>✓ Message Sent!</>
                  : status === "error" ? <>✕ Failed — Try Again</>
                  : <><Send className="w-4 h-4" />Send Message</>}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {/* Direct email */}
            <div className="card-light rounded-2xl p-5 group hover:translate-x-1 transition-transform">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Direct Mail</p>
                  <a href="mailto:alanroyff101@gmail.com"
                    className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                    alanroyff101@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="card-light rounded-2xl p-5 flex-grow">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                Find Me Online
              </p>
              <div className="space-y-2.5">
                {socialLinks.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.a
                      key={s.label}
                      initial={{ opacity: 0, x: 16 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.45 + i * 0.08 }}
                      href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-white transition-all group hover:translate-x-1"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4 transition-colors" style={{ color: s.color }} />
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">{s.label}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-0.5 transition-all" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="card-surface rounded-2xl p-4">
              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Available for Work</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mt-1">
                Open to full-time roles, freelance projects, and interesting collaborations.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
