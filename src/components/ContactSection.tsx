import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  Phone,
  MapPin,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import emailjs from "emailjs-com";

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    emailjs
      .send(
        "service_i24br4l",
        "template_ynzu7or",
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "A2xWpSiHG4HIeHQGt"
      )
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

  const contactItems = [
    {
      id: "email",
      label: "Direct Email",
      value: "alanroyff101@gmail.com",
      href: "mailto:alanroyff101@gmail.com",
      icon: Mail,
      canCopy: true,
    },
    {
      id: "phone",
      label: "Direct Phone",
      value: "+91 7511136171",
      href: "tel:+917511136171",
      icon: Phone,
      canCopy: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn Profile",
      value: "linkedin.com/in/alnroy",
      href: "https://www.linkedin.com/in/alnroy",
      icon: Linkedin,
      canCopy: true,
    },
    {
      id: "github",
      label: "GitHub Profile",
      value: "github.com/alnroy",
      href: "https://github.com/alnroy",
      icon: Github,
      canCopy: true,
    },
    {
      id: "location",
      label: "Base Location",
      value: "Cherthala, Alappuzha, Kerala - 688541",
      href: undefined,
      icon: MapPin,
      canCopy: true,
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-28 bg-[#09090b] relative">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14 text-left"
        >
          <div className="section-pill mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-[#fafafa]" />
            <span>COMMUNICATION // DIRECT CONTACT</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#fafafa]">
            Let's Start a Conversation
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#a1a1aa] max-w-2xl font-mono">
            Available for full-time engineering positions, QA consultation, and production contracts.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl">
          
          {/* Direct Copy Cards (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-5 space-y-3"
          >
            <div className="font-mono text-xs text-[#71717a] uppercase tracking-wider mb-2">
              Instant Contact Coordinates
            </div>

            {contactItems.map((item) => {
              const Icon = item.icon;
              const isCopied = copiedField === item.id;

              return (
                <div
                  key={item.id}
                  className="card-noir rounded-xl p-4 flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-[#18181b] border border-[#27272a] flex items-center justify-center text-[#fafafa] flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-[#71717a] uppercase tracking-wider">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-mono text-xs sm:text-sm text-[#fafafa] hover:underline truncate block"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-mono text-xs text-[#fafafa] truncate">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>

                  {item.canCopy && (
                    <button
                      onClick={() => copyToClipboard(item.value, item.id)}
                      className={`p-2 rounded-lg border transition-all flex-shrink-0 ${
                        isCopied
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-[#18181b] border-[#27272a] text-[#a1a1aa] hover:text-[#fafafa] hover:border-[#3f3f46]"
                      }`}
                      title="Copy to clipboard"
                      aria-label={`Copy ${item.label}`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Contact Message Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="card-noir rounded-xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#27272a]">
                <span className="font-mono text-xs text-[#71717a] uppercase tracking-wider">
                  Dispatch Direct Message
                </span>
                <span className="font-mono text-[10px] text-[#71717a]">
                  STATUS: ONLINE
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] text-[#a1a1aa] uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#fafafa] bg-[#18181b] border border-[#27272a] placeholder:text-[#52525b] focus:border-[#fafafa] focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[11px] text-[#a1a1aa] uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#fafafa] bg-[#18181b] border border-[#27272a] placeholder:text-[#52525b] focus:border-[#fafafa] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[11px] text-[#a1a1aa] uppercase tracking-wider">
                    Message / Opportunity Scope
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your project, role opening, or technical requirement..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full rounded-lg px-3.5 py-2.5 text-sm font-mono text-[#fafafa] bg-[#18181b] border border-[#27272a] placeholder:text-[#52525b] focus:border-[#fafafa] focus:outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-retro-primary w-full py-3 text-sm cursor-pointer disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <span>Transmitting Message...</span>
                  ) : status === "sent" ? (
                    <span className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-500" />
                      Message Sent Successfully
                    </span>
                  ) : status === "error" ? (
                    <span>Failed to Send — Please Email Directly</span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Transmit Direct Message
                    </span>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;
