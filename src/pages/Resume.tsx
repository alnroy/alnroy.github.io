import React from "react";
import { Link } from "react-router-dom";
import {
  Printer,
  Download,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { usePersona, PersonaId } from "@/context/PersonaContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Resume = () => {
  const { persona, setPersona } = usePersona();

  React.useEffect(() => {
    const handleBeforePrint = () => {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#ffffff";
    };
    const handleAfterPrint = () => {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "";
    };

    window.addEventListener("beforeprint", handleBeforePrint);
    window.addEventListener("afterprint", handleAfterPrint);
    return () => {
      window.removeEventListener("beforeprint", handleBeforePrint);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  const handlePrint = () => {
    document.documentElement.classList.remove("dark");
    document.body.style.backgroundColor = "#ffffff";
    window.print();
    setTimeout(() => {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "";
    }, 500);
  };

  const isFullStack = persona === "fullstack";

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa] selection:bg-white selection:text-black print:bg-white print:text-black print:min-h-0 print:p-0 print:m-0">
      {/* Global Navigation — hidden on print */}
      <Navigation />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 print:p-0 print:m-0 print:bg-white">
        
        {/* Top Control Bar — hidden on print */}
        <div className="max-w-4xl mx-auto mb-8 print:hidden">
          <div className="card-noir rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Back button */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-mono text-[#a1a1aa] hover:text-[#fafafa] transition-colors self-start md:self-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </Link>

            {/* Persona Switcher for the Resume View */}
            <div className="flex items-center p-1 rounded-lg bg-[#18181b] border border-[#27272a]">
              <button
                onClick={() => setPersona("fullstack")}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  isFullStack
                    ? "bg-[#fafafa] text-[#09090b] shadow-sm font-bold"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
              >
                Full Stack Developer
              </button>
              <button
                onClick={() => setPersona("qa_tester")}
                className={`px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
                  !isFullStack
                    ? "bg-[#fafafa] text-[#09090b] shadow-sm font-bold"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
              >
                QA Analyst & Tester
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
              <button
                onClick={handlePrint}
                className="btn-retro-primary text-xs py-2 px-4 cursor-pointer flex-1 md:flex-none justify-center"
                title="Print or Save as PDF using your browser's print dialog"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>

              <a
                href={
                  isFullStack
                    ? "/resumes/Alan_Roy_FullStack_Python_Resume.pdf"
                    : "/resumes/Alan_Roy_QA_Software_Tester_Resume.pdf"
                }
                download
                className="btn-retro-secondary text-xs py-2 px-3 flex-1 md:flex-none justify-center"
                title="Direct PDF download"
              >
                <Download className="w-4 h-4" />
                <span>Original PDF</span>
              </a>
            </div>

          </div>
        </div>

        {/* ─── Printable Document Surface ─── */}
        <div
          id="resume-printable-area"
          className="max-w-4xl mx-auto rounded-xl p-8 sm:p-12 bg-[#121215] border border-[#27272a] shadow-2xl text-[#fafafa] print:bg-white print:text-black print:p-0 print:border-none print:shadow-none print:max-w-none print:rounded-none"
        >
          {/* Header */}
          <div className="border-b border-[#27272a] pb-6 mb-6 print:border-neutral-300">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-[#fafafa] print:text-black">
                  ALAN ROY
                </h1>
                <p className="font-mono text-sm sm:text-base font-semibold text-[#a1a1aa] print:text-neutral-700 mt-1 uppercase tracking-wide">
                  {isFullStack
                    ? "Full Stack Python Developer & Backend Engineer"
                    : "QA Analyst & Software Tester"}
                </p>
              </div>

              <div className="font-mono text-[11px] text-[#71717a] print:text-neutral-500 text-left sm:text-right space-y-0.5">
                <p>Cherthala, Alappuzha, Kerala - 688541</p>
              </div>
            </div>

            {/* Contact links bar */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-4 font-mono text-xs text-[#a1a1aa] print:text-neutral-700">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#fafafa] print:text-black" />
                +91 7511136171
              </span>
              <span>•</span>
              <a href="mailto:alanroyff101@gmail.com" className="flex items-center gap-1.5 hover:underline">
                <Mail className="w-3.5 h-3.5 text-[#fafafa] print:text-black" />
                alanroyff101@gmail.com
              </a>
              <span>•</span>
              <a href="https://linkedin.com/in/alnroy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Linkedin className="w-3.5 h-3.5 text-[#fafafa] print:text-black" />
                linkedin.com/in/alnroy
              </a>
              <span>•</span>
              <a href="https://github.com/alnroy" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:underline">
                <Github className="w-3.5 h-3.5 text-[#fafafa] print:text-black" />
                github.com/alnroy
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <section className="mb-6">
            <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#71717a] print:text-neutral-500 mb-2 border-b border-[#27272a] print:border-neutral-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#d4d4d8] print:text-neutral-800 leading-relaxed">
              {isFullStack
                ? "Results-driven Full Stack Python Developer with 1+ year of production experience architecting end-to-end web applications, asynchronous real-time services, and hardware-software IoT integrations. Proven track record of independently designing, scaling, and maintaining mission-critical enterprise platforms using Python, Django, Django REST Framework, WebSockets (Daphne/ASGI), and Redis. Experienced in frontend development (Vanilla JS, TypeScript, React), database query optimization (PostgreSQL, SQLite), cryptographic workflows (PKCS#11/USB DSC signing), and offline-first Progressive Web Apps (PWA)."
                : "Dedicated and detail-oriented Software QA Analyst with hands-on production experience in manual testing, end-to-end functional verification, Postman API contract testing, and fast-paced Agile sprint cycles. Proven expertise collaborating directly with enterprise banking clients to translate complex operational feedback into zero-defect software releases. Skilled at isolating critical edge-case race conditions, verifying statutory building calculations (KPBR/KMBR), and validating hardware biometric IoT devices under network dropouts."}
            </p>
          </section>

          {/* Technical Skills */}
          <section className="mb-6">
            <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#71717a] print:text-neutral-500 mb-2 border-b border-[#27272a] print:border-neutral-200 pb-1">
              Technical Skills & Competencies
            </h2>
            <div className="space-y-1.5 text-xs">
              {isFullStack ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Languages:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Python (Advanced), JavaScript (ES6+ / Vanilla JS), TypeScript, SQL, HTML5, CSS3</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Backend & APIs:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Django, Django REST Framework (DRF), ASGI, Daphne, Django Channels, WebSockets, RESTful APIs</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Databases & Caching:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">PostgreSQL, SQLite, Redis (Session Management, In-Memory Caching, Pub/Sub), Indexing & Query Tuning</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Frontend & UI:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">React.js, Tailwind CSS, Vanilla CSS, DOM Manipulation, Leaflet.js, Google Maps Platform APIs</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Architecture & Security:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Progressive Web Apps (Service Workers, Cache API), PKCS#11 Hardware Digital Signatures (PyHanko, TSA), IoT Sockets (ZKTeco Protocol), JWT Auth</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Tools & Workflows:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Git, GitHub, Postman, WeasyPrint, Vite, Linux CLI</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Core Testing Skills:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Manual Testing, Functional & Regression Testing, User Acceptance Testing (UAT), Sanity & Smoke Testing, Edge-Case Analysis, Test Case Design, Defect Lifecycle Management</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">API & Diagnostics:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Postman (REST API Validation, Status Codes, Request/Response Payloads, Authentication), Chrome DevTools (Network, Console, Application Storage), Swagger / OpenAPI, Asynchronous Event Testing</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Technical Literacy:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Python, JavaScript, SQL Queries (Database Data Verification), HTML5, CSS3, REST APIs, JSON Payloads, WebSockets</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-1">
                    <span className="font-mono text-[#71717a] print:text-neutral-600 sm:col-span-3">Collaboration & Tools:</span>
                    <span className="text-[#fafafa] print:text-black sm:col-span-9 font-mono">Git, GitHub, Direct Client Feedback Integration, Issue Root-Cause Diagnostics, Agile Iterations</span>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-6">
            <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#71717a] print:text-neutral-500 mb-3 border-b border-[#27272a] print:border-neutral-200 pb-1">
              Professional Experience
            </h2>

            <div className="space-y-4">
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-display font-bold text-sm text-[#fafafa] print:text-black">
                    {isFullStack
                      ? "Full Stack Developer (Python / Django)"
                      : "QA Analyst & Product Operations Associate"}
                    <span className="text-[#71717a] print:text-neutral-600 font-normal"> — Vadrida Technologies</span>
                  </h3>
                  <span className="font-mono text-[11px] text-[#a1a1aa] print:text-neutral-600">
                    Dec 2025 – Present | Kochi, Kerala
                  </span>
                </div>

                <ul className="mt-2 space-y-1.5 text-xs text-[#d4d4d8] print:text-neutral-800 list-disc list-inside">
                  {isFullStack ? (
                    <>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Enterprise Platform Architecture:</strong> Solely architected and engineered the enterprise valuation ecosystem, standardizing workflows across major banking institutions (SBI, SIB, Muthoot, Axis) and reducing turnaround time by 75%.
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Real-Time Asynchronous Engine:</strong> Designed high-concurrency real-time subsystems using Daphne (ASGI) and Django Channels (WebSockets) for live presence tracking, dynamic dashboards, and instant updates across field and office teams.
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Biometric IoT & Cryptographic Security:</strong> Engineered hardware-level biometric device communication over TCP sockets (ZKTeco protocol) and built PKCS#11 USB DSC digital signature workflows with TSA RFC 3161 timestamping and SHA-256 verification.
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Offline-First PWA & Building Rules:</strong> Developed an offline-first survey PWA with Service Workers and GPS capture for field engineers; built automated engineering valuation logic for statutory building rules (KPBR/KMBR compliance & FSI).
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Performance Optimization:</strong> Optimized database queries and response times by over 60% by deploying in-memory Redis caching, fine-tuned indexing, and bulk record aggregation.
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Agile Client Iterations & UAT:</strong> Managed end-to-end Agile iterative testing cycles—translating banking client feedback into immediate feature refinements, repeatedly testing prototypes with office verifiers until exact operational requirements were achieved.
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Banking Compliance & Field Verification:</strong> Executed comprehensive functional test cases across major institutional banking report formats (SBI, South Indian Bank, Muthoot, Axis), validating 140+ dynamic calculation and property description fields per case.
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Edge-Case Discovery & Bug Isolation:</strong> Uncovered critical data-integrity defects—including diagnosing asynchronous client-server race conditions where auto-save prematurely wiped populated form fields—and verified robust guard solutions ensuring zero data loss.
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Postman API & Real-Time Sync Testing:</strong> Performed manual API testing with Postman across REST endpoints (status codes, JSON payload accuracy, session auth); validated real-time WebSocket sync and offline PWA workflows under network drops.
                      </li>
                      <li>
                        <strong className="text-[#fafafa] print:text-black">Statutory Building Rules & IoT Verification:</strong> Verified automated mathematical calculation engines against statutory building rules (KPBR/KMBR compliance and setback analysis); tested hardware biometric device socket communication and punch logs during network outages.
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* Key Projects */}
          <section className="mb-6">
            <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#71717a] print:text-neutral-500 mb-3 border-b border-[#27272a] print:border-neutral-200 pb-1">
              Key Production Projects
            </h2>

            <div className="space-y-4">
              {/* Project 1 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-display font-bold text-sm text-[#fafafa] print:text-black">
                    KSR Bait & Tackle — Retail Operations & E-Commerce Platform
                    <a
                      href="https://www.ksrbaitandtackle.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-[10px] text-emerald-400 print:text-black ml-2 hover:underline"
                    >
                      [Live: ksrbaitandtackle.in]
                    </a>
                  </h3>
                  <span className="font-mono text-[11px] text-[#71717a] print:text-neutral-600">
                    {isFullStack ? "React, TypeScript, Python, DRF, PostgreSQL, Tailwind" : "Functional Testing, UAT, Postman API Testing, Responsive UI"}
                  </span>
                </div>

                <ul className="mt-1.5 space-y-1 text-xs text-[#d4d4d8] print:text-neutral-800 list-disc list-inside">
                  {isFullStack ? (
                    <>
                      <li>Engineered and deployed a full-featured commercial e-commerce platform and retail operations ERP on a custom live domain.</li>
                      <li>Built modular product catalog filtering, dynamic cart state management, and streamlined checkout ordering workflows with React, TypeScript, and Tailwind.</li>
                      <li>Architected scalable RESTful API services using Django REST Framework with JWT authentication, rate limiting, and relational schema migrations in PostgreSQL.</li>
                    </>
                  ) : (
                    <>
                      <li>Conducted rigorous manual, functional, and regression testing on a live commercial e-commerce store and retail ERP system before public deployment.</li>
                      <li>Validated core e-commerce user journeys: product catalog filtering, dynamic cart updates, out-of-stock validation, and checkout flows across mobile and desktop devices.</li>
                      <li>Executed Postman API test runs validating RESTful endpoints: verified JWT token authentication, error responses for malformed data, and relational data integrity in PostgreSQL.</li>
                    </>
                  )}
                </ul>
              </div>

              {/* Project 2 */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="font-display font-bold text-sm text-[#fafafa] print:text-black">
                    CurateDrop — Automated E-Commerce & Affiliate Store Engine
                  </h3>
                  <span className="font-mono text-[11px] text-[#71717a] print:text-neutral-600">
                    {isFullStack ? "Python, Django, Vanilla JS, Web Scraping, WhatsApp Ordering" : "Product Flow Validation, Edge-Case Testing, Mobile UI Testing"}
                  </span>
                </div>

                <ul className="mt-1.5 space-y-1 text-xs text-[#d4d4d8] print:text-neutral-800 list-disc list-inside">
                  {isFullStack ? (
                    <>
                      <li>Engineered an automated product ingestion pipeline extracting and normalizing Amazon product attributes, media, and specifications from arbitrary product URLs into structured store listings.</li>
                      <li>Designed hybrid monetization workflows: routing affiliate inventory via tagged Amazon commission links and direct store products via WhatsApp message order confirmations.</li>
                      <li>Implemented a secure delivery verification workflow featuring time-sensitive Delivery OTP verification and built a responsive mobile-first administrative management dashboard.</li>
                    </>
                  ) : (
                    <>
                      <li>Tested automated URL scraping workflows against Amazon product pages, ensuring robust error handling for missing specifications, varied pricing formats, and image galleries.</li>
                      <li>Validated dual-channel order workflows: verified correct affiliate tag persistence on external redirects and tested message payload accuracy on WhatsApp order dispatches.</li>
                      <li>Designed and executed test scenarios for two-factor Delivery OTP verification workflows (timeouts, invalid attempt lockouts, order status transitions) and responsive store admin UI.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </section>

          {/* Internships & Education */}
          <section>
            <h2 className="font-display font-bold text-xs uppercase tracking-widest text-[#71717a] print:text-neutral-500 mb-3 border-b border-[#27272a] print:border-neutral-200 pb-1">
              Internships & Education
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <h4 className="font-display font-bold text-[#fafafa] print:text-black">
                  Full Stack Python Intern
                </h4>
                <p className="font-mono text-[11px] text-[#a1a1aa] print:text-neutral-600">Logiccraft Technology</p>
                <p className="text-[#71717a] print:text-neutral-700 text-[11px] leading-relaxed">
                  Collaborated on web application development; gained hands-on experience in MVT architecture, ORM queries, and RESTful API integration.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-[#fafafa] print:text-black">
                  Full Stack Python Trainee
                </h4>
                <p className="font-mono text-[11px] text-[#a1a1aa] print:text-neutral-600">QSpiders Kochi</p>
                <p className="text-[#71717a] print:text-neutral-700 text-[11px] leading-relaxed">
                  Intensive training in software testing fundamentals, defect tracking, Python programming, and SQL database queries.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-display font-bold text-[#fafafa] print:text-black">
                  Bachelor of Computer Applications (BCA)
                </h4>
                <p className="font-mono text-[11px] text-[#a1a1aa] print:text-neutral-600">Naipunnya School of Management</p>
                <p className="text-[#71717a] print:text-neutral-700 text-[11px]">
                  University of Kerala • Graduated 2025
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Resume;
