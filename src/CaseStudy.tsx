import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, ExternalLink, CheckCircle2, AlertCircle, AlertTriangle, Type, Framer, FlaskConical, Tally3, Clock, ShieldCheck, ShieldAlert, Quote, User, Workflow, Loader2, Brain, Activity, PieChart, Database, Settings2, Bell, Bug, UserCircle, ClipboardList, Eye, Shield, Maximize2, Lightbulb, MessageSquare, Search, Sparkles, Layers, BarChart3, MousePointer2, Zap, Layout, Globe, ChevronRight, Users2, Check } from 'lucide-react';
import { Project } from './constants';

const CaseStudy = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Content for Design File Management (id: 2)
  const isTechBayLeaf = project.id === 1;
  const isDesignFileManagement = project.id === 2;
  const isMeroMedClinic = project.id === 9;
  const isSparrow = project.id === 10;

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[1000] bg-white overflow-y-auto no-scrollbar"
      data-lenis-prevent
    >
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border px-6 md:px-12 py-4 flex items-center justify-between">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <span className="text-[10px] md:text-[12px] font-medium uppercase tracking-widest text-muted">Case Study</span>
          <div className="hidden md:block w-px h-4 bg-border" />
          <span className="text-xs md:text-sm font-medium tracking-tight truncate max-w-[200px] md:max-w-none">{project.title}</span>
        </div>
        <button 
          onClick={onClose}
          className="group flex items-center justify-center gap-2 rounded-full transition-all duration-300 w-10 h-10 bg-bg hover:bg-border text-ink md:w-auto md:h-auto md:px-4 md:py-2 md:bg-transparent md:border md:border-red-200 md:text-red-500 md:hover:bg-red-500 md:hover:text-white md:hover:border-red-500 shrink-0"
        >
          <X size={20} className="md:w-4 md:h-4" />
          <span className="hidden md:inline text-sm font-medium">Close Case Study</span>
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative bg-white pt-32 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111108_1px,transparent_1px),linear-gradient(to_bottom,#11111108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            {isTechBayLeaf && (
              <div className="max-w-5xl mx-auto pt-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-8 border border-accent/20 max-w-full text-center leading-relaxed">
                  B2B Website Design · Digital Marketing
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold text-ink leading-[1.1] tracking-tight mb-10 max-w-5xl">
                  Building a Website <br />
                  <span className="text-accent italic-serif font-normal">That Converts</span>
                </h1>
                <div className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-4xl mb-12 space-y-4">
                  <p>Tech Bay Leaf is a Mumbai-based high-performing digital marketing agency with 10+ years of experience managing over $20M in ad spend. Despite their success, their website was a static template that failed to reflect their premium status or drive inbound growth.</p>
                  <p>I re-architected their entire digital presence into a 15+ page conversion system designed to build trust in under 5 seconds and turn curious visitors into warm leads through data-driven information architecture.</p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12 mb-16">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Client</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Tech Bay Leaf</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Role</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Product Designer</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Tool</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Figma</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Timeline</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">2-3 Weeks</p>
                  </div>
                </div>

                <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-bg mb-10">
                  <img loading="lazy" src="/image/top_mockup_2x.webp" alt="Tech Bay Leaf Hero" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              </div>
            )}

            {isDesignFileManagement && (
              <>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] mb-8 border border-accent/20 max-w-full text-center leading-relaxed">
                  Design Operations · Systems Thinking
                </div>
                <h1 className="text-5xl sm:text-6xl md:text-[9rem] font-bold text-ink leading-[0.85] tracking-tighter mb-10 max-w-5xl">
                  Design file <br /><span className="text-accent italic-serif font-normal">management</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-3xl mb-12 whitespace-pre-line">
                  Scaling design collaboration for multi-designer teams
    Reducing file confusion by 70% and accelerating handoff efficiency
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Impact</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink flex items-baseline gap-1">
                      70% <span className="text-accent text-lg md:text-xl font-medium">Reduction</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">in file confusion</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Speed</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink flex items-baseline gap-1">
                      3× <span className="text-accent text-lg md:text-xl font-medium">Faster</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">dev handoff</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Structure</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink flex items-baseline gap-1">
                      7 <span className="text-accent text-lg md:text-xl font-medium">Pages</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">standardized types</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Status</p>
                    <p className="text-4xl md:text-5xl font-bold text-ink">Active</p>
                    <p className="text-sm text-muted font-normal mt-1">system-wide use</p>
                  </div>
                </div>
              </>
            )}

            {isMeroMedClinic && (
              <>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                    Navigation & UX Redesign · Mero Med Clinic Admin
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold text-ink leading-[1.1] tracking-tight mb-10 max-w-5xl">
                  Navigation as <br />
                  <span className="text-accent italic-serif font-normal">Infrastructure</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-4xl mb-12">
                  Increased feature discoverability by 40% and reduced task completion time by 30% by re-architecting Mero Med’s clinic admin navigation into a workflow-aligned command system, which also accelerated onboarding for new staff.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Role</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Product Designer</p>
                    <p className="text-sm text-muted font-normal mt-1">End-to-end redesign</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Duration</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">4 Weeks</p>
                    <p className="text-sm text-muted font-normal mt-1">Research to Handoff</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Impact</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink flex items-baseline gap-1">
                      40% <span className="text-accent text-lg md:text-xl font-medium">Lower</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">cognitive load</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Tools</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Figma + AI</p>
                    <p className="text-sm text-muted font-normal mt-1">AI-Assisted Research</p>
                  </div>
                </div>
              </>
            )}

            {isSparrow && (
              <>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-10">
                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent">
                    Enterprise AI · Sparrow
                  </span>
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-[100px] font-bold text-ink leading-[1.1] tracking-tight mb-10 max-w-5xl">
                  Sparrow : <br />
                  <span className="text-accent italic-serif font-normal">Generate Variable</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted font-normal leading-relaxed max-w-4xl mb-12">
                  Designing an intuitive, AI-powered feature for intelligent variable extraction and environment management
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-12">
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Role</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Product designer</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Timeline</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">4 Weeks</p>
                    <p className="text-sm text-muted font-normal mt-1">Design Sprint</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Impact</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink flex items-baseline gap-1">
                      8x <span className="text-accent text-lg md:text-xl font-medium">Faster</span>
                    </p>
                    <p className="text-sm text-muted font-normal mt-1">productivity gain</p>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium uppercase tracking-[0.2em] text-muted mb-3">Status</p>
                    <p className="text-2xl md:text-3xl font-bold text-ink">Live</p>
                    <p className="text-sm text-muted font-normal mt-1">Shipped in Production</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </header>

      {/* Content Sections */}
      <main className="pb-32">
        {isTechBayLeaf && (
          <>
            {/* Background & The Problem */}
            <section className="section-padding bg-white">
              <div className="container-wide max-w-5xl mx-auto">
                
                {/* The Brief */}
                <div className="mb-24 grid md:grid-cols-[1.2fr_1fr] gap-10 md:gap-12 lg:gap-16 items-start">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-8 h-px bg-accent" />
                      <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent">The Brief</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight leading-tight">
                      The brief, and what it <span className="text-accent italic-serif font-normal">really</span> meant
                    </h2>
                    <div className="space-y-6 text-lg text-ink/80 leading-relaxed">
                      <p>When Tech Bay Leaf came to us, they had a problem most growing agencies face. The business was performing well: real clients, real results, solid credibility. But their website told a completely different story.</p>
                      <p>It looked like a template, not a team. It didn't communicate the depth of their services, the scale of their work, or the confidence of a 10-year-old agency that had managed over $20M in ad spends for brands across the US, Europe, and India.</p>
                      <p>The brief was simple on paper: redesign the website. But what it really meant was to build a digital presence that matches the actual quality of the agency. One that converts a curious visitor into a warm lead without a single sales call. That's a very different problem to solve.</p>
                    </div>
                  </div>
                  <div className="bg-ink p-10 md:p-12 rounded-[32px] text-white shadow-xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent mb-8 block">The Core Insight</span>
                    <p className="text-2xl md:text-3xl font-medium italic-serif leading-relaxed mb-8 text-white/90">
                      "The business was winning clients through referrals and relationships. The website wasn't helping. In fact, it was probably costing them deals."
                    </p>
                    <p className="text-sm text-white/50 font-medium">
                      - Aman Chourasiya, Product Designer
                    </p>
                  </div>
                </div>

                {/* The Problem */}
                <div>
                  <h3 className="text-accent font-medium text-lg mb-4">The Problem</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight">
                    Where Business and Experience <span className="text-accent italic-serif font-normal">Break</span>
                  </h2>
                  <div className="text-lg md:text-xl text-ink/80 leading-relaxed space-y-6">
                    <p>The website was not supporting the business in converting new visitors because three critical systems were missing.</p>
                    <p><strong>First, there was no clear service structure.</strong> Users could not quickly understand what the agency offers or which service was relevant to them.</p>
                    <p><strong>Second, there was no defined conversion path.</strong> The website did not guide users from initial interest to taking action. Calls to action were weak and inconsistent.</p>
                    <p><strong>Third, there was no visible credibility system.</strong> Proof existed in the form of client work, certifications, and results, but it was not surfaced in a way that builds trust early.</p>
                    <p>Because of this, new visitors were forced to figure things out on their own. Most of them left before reaching a decision.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Reframing the Challenge */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-6xl mx-auto">
                <div className="max-w-4xl mx-auto mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4 text-center">Reframing the Problem</h3>
                  <div className="text-xl md:text-2xl text-white/80 leading-relaxed space-y-6 text-center mb-12">
                    <p>This was not a visual redesign problem. The issue was not about improving aesthetics.</p>
                    <p>The real problem was that the website was not designed to support how users make decisions in a B2B context.</p>
                    <p>The question became:</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <p className="text-xl md:text-2xl text-white font-medium leading-tight">
                      "How can we help a first-time visitor understand the offering, trust the agency, and decide to reach out without relying on external validation?"
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">01</div>
                    <h4 className="text-xl font-bold text-white mb-4 relative z-10">No clear service architecture</h4>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">
                      A visitor couldn't quickly understand what Tech Bay Leaf offered, how the services connected, or which one was right for them. Navigation was flat. Content was scattered. Every service looked the same.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">02</div>
                    <h4 className="text-xl font-bold text-white mb-4 relative z-10">No conversion logic</h4>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">
                      No clear journey from "I'm interested" to "let me talk to someone." Weak CTAs, invisible social proof, and no structured path to a proposal request meant real revenue was leaking quietly.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 text-5xl font-bold text-white/5 group-hover:text-white/10 transition-colors">03</div>
                    <h4 className="text-xl font-bold text-white mb-4 relative z-10">No credibility architecture</h4>
                    <p className="text-white/70 text-sm leading-relaxed relative z-10">
                      Incredible proof existed: client names, case studies, Google/Meta/Amazon certifications, real results. None of it was surfaced in a way that built trust with a skeptical first-time visitor.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Research & Discovery */}
            <section className="section-padding bg-bg">
              <div className="container-wide max-w-4xl mx-auto">
                <div className="mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4">Research & Discovery</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight">
                    Understanding the <span className="text-accent italic-serif font-normal">Business</span>
                  </h2>
                  <div className="text-lg md:text-xl text-ink/80 leading-relaxed space-y-6">
                    <p>Before I started on full process, I evaluate more to understand the proper content and requirement of the business that need to be fulfill in the first case, So instead of directly jumping on the designs I understand the core of the business and its requirements.</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-20">
                  <div className="bg-[#8B5CF6]/5 rounded-2xl p-4 border border-[#8B5CF6]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">What is the primary goal of redesigning the website?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      The goal was to turn the website into a working sales touchpoint. It needed to communicate value clearly, establish credibility quickly, and guide users toward starting a conversation.
                    </p>
                  </div>
                  <div className="bg-[#10B981]/5 rounded-2xl p-4 border border-[#10B981]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">Why was a redesign needed?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      There was a clear gap between the agency’s actual capability and how it was perceived online. The website lacked structure, did not highlight real outcomes, and gave users no clear next step. As a result, it was not contributing to inbound growth.
                    </p>
                  </div>
                  <div className="bg-[#F97316]/5 rounded-2xl p-4 border border-[#F97316]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">What are the brand’s mission, vision, and goals?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      The agency’s mission is to help brands grow through performance-led marketing. Its vision is to become a long-term partner for scaling businesses.
                      <br/><br/>
                      From a product perspective, this translated into three clear goals for the website. Increase inbound leads, build trust quickly for new visitors, and clearly communicate services along with outcomes.
                    </p>
                  </div>
                  <div className="bg-[#D946EF]/5 rounded-2xl p-4 border border-[#D946EF]/20 shadow-sm">
                    <h3 className="text-base font-bold text-ink mb-2">What would a user do after landing on the website?</h3>
                    <p className="text-ink/70 font-medium text-xs">
                      A user does not explore randomly. They try to make a decision quickly.
                      <br/><br/>
                      First, they check whether the agency looks credible. Then they look for a service that matches their need. After that, they validate through past work or case studies. If they find enough confidence, they take action. If not, they leave.
                    </p>
                  </div>
                </div>

                <div className="mb-20">
                  <h3 className="text-3xl font-bold text-ink mb-6">User-Side <span className="text-accent italic-serif font-normal">Research Questions</span></h3>
                  <div className="text-lg md:text-xl text-ink/80 leading-relaxed space-y-6 mb-10">
                    <p>I started by evaluating the existing website from a user’s point of view and mapping expected behavior. Instead of assuming what needed to be fixed, I framed the problem through a set of user-driven questions.</p>
                    <p>Two primary user flows were defined.</p>
                    
                    <div className="p-6 md:p-8 bg-accent/5 border-l-4 border-accent rounded-r-2xl space-y-4 my-8">
                      <p className="text-ink font-medium">For a decision maker, the journey starts on the homepage, moves to a relevant service page, then to case studies for validation, and finally to a call to action.</p>
                      <p className="text-ink font-medium">For a job seeker, the journey moves from the homepage to the careers page, where culture and values are presented before open roles, followed by the application process.</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white rounded-[32px] p-8 md:p-10 border border-border shadow-sm">
                      <h4 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
                        <span className="text-2xl">🧑‍💼</span> From a Decision Maker’s Perspective:
                      </h4>
                      <ul className="space-y-4 text-ink/70 font-medium text-lg">
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What does this company actually do?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Can they solve my specific problem?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Have they done this before?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Can I trust them with my budget?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What results have they delivered?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What should I do next?</li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-[32px] p-8 md:p-10 border border-border shadow-sm">
                      <h4 className="text-xl font-bold text-ink mb-6 flex items-center gap-3">
                        <span className="text-2xl">🧑‍💻</span> From a Job Seeker’s Perspective:
                      </h4>
                      <ul className="space-y-4 text-ink/70 font-medium text-lg">
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What kind of company is this?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What is their culture?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Why should I work here?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> What roles are available?</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> How easy is the application process?</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-10 p-6 md:p-8 bg-accent/5 border border-accent/20 rounded-2xl text-center">
                    <p className="text-lg md:text-xl text-ink/80 font-medium">
                      The key principle here was that no page should feel like a dead end. Every page needed to guide the user toward the next logical step.
                    </p>
                  </div>
                </div>

                <div className="mb-20 bg-accent/5 p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[40px] border border-accent/20">
                  <div className="text-center mb-16">
                    <h3 className="text-accent font-medium text-lg mb-4">Strategy</h3>
                    <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 tracking-tight">
                      Insights to <span className="text-accent italic-serif font-normal">Action</span>
                    </h2>
                    <p className="text-xl text-ink/70">From our analysis, clear patterns emerged that directly informed our design decisions.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
                    {/* Insight 1 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Trust is Immediate</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users form an opinion within the first few seconds.</span> If credibility is not visible immediately, they do not continue.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Lead with metrics & logos
                        </div>
                      </div>
                    </div>
                    {/* Insight 2 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Quick Identification</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users do not want to read through all services.</span> They want to quickly identify what is relevant to them.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Structured architecture
                        </div>
                      </div>
                    </div>
                    {/* Insight 3 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Proof Drives Decisions</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users rely heavily on proof.</span> Case studies, results, and recognizable clients influence their decisions more than descriptive text.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Proof embedded everywhere
                        </div>
                      </div>
                    </div>
                    {/* Insight 4 */}
                    <div className="relative group mx-auto w-full max-w-sm flex flex-col">
                      <div className="absolute inset-0 bg-bg/50 rounded-3xl border border-border shadow-sm transform translate-y-3 translate-x-3 rotate-3 transition-transform group-hover:rotate-6 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                      <div className="absolute inset-0 bg-bg/80 rounded-3xl border border-border shadow-sm transform translate-y-1.5 translate-x-1.5 rotate-1 transition-transform group-hover:rotate-3 group-hover:translate-x-2 group-hover:translate-y-2"></div>
                      <div className="relative bg-bg p-8 rounded-3xl border border-border shadow-sm flex flex-col flex-grow min-h-[260px]">
                        <span className="text-4xl text-accent/30 font-serif absolute top-6 left-6">"</span>
                        <h3 className="text-xl font-bold text-ink mb-3 relative z-10 mt-4">Need Direction</h3>
                        <p className="text-ink/80 text-lg font-medium relative z-10 mb-6 flex-grow"><span className="bg-white px-1">Users need direction.</span> If the next step is not obvious, they drop off.</p>
                        <div className="p-4 bg-white rounded-2xl border border-border font-medium text-accent text-center relative z-10 mt-auto">
                          Design Response: Guided journey + CTAs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 05. User Flow & IA */}
                <section className="section-padding bg-bg">
                  <div className="container-wide max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                      <h3 className="text-accent font-medium text-lg mb-4">Architecture</h3>
                      <h2 className="text-4xl md:text-5xl font-bold text-ink mb-8 tracking-tight">
                        <span className="text-accent italic-serif font-normal">User flow</span> and Information <span className="text-accent italic-serif font-normal">Architecture</span>
                      </h2>
                      <p className="text-xl text-ink/70 mb-12">
                        Services were grouped into five clear categories. Navigation was simplified so users could move between services, case studies, and company info without confusion.
                      </p>
                    </div>

                    {/* User Flow Placeholder */}
                    <div className="mb-20">
                      <h3 className="text-2xl font-bold text-ink mb-8 text-center">User Flow</h3>
                      <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-white border border-border shadow-sm mb-8 cursor-zoom-in" onClick={() => setSelectedImage("/image/common_user_flow_2x.webp")}>
                        <img loading="lazy" src="/image/common_user_flow_2x.webp" alt="User Flow" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Two Visitors Section */}
                <div className="mb-20 bg-ink p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[40px]">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                    Two visitors. One <span className="text-accent italic-serif font-normal">website.</span>
                  </h2>
                  <p className="text-lg text-white/70 mb-12 max-w-2xl">
                    Two primary visitor types with distinct intent, different entry points, different conversion goals. No dead ends; every page carried a persistent "Talk to our expert" CTA.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Decision Maker */}
                    <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
                      <h4 className="text-accent font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span> THE DECISION MAKER
                      </h4>
                      <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-white/20 -z-0"></div>
                        {[
                          { step: "1", title: "Lands on homepage", desc: "Sees $20M+ and client logos. Credibility in 5 seconds." },
                          { step: "2", title: "Navigates to service page", desc: "Finds the service relevant to their business need." },
                          { step: "3", title: "Reads case studies", desc: "Sees proof of results in their industry." },
                          { step: "4", title: "Checks About page", desc: "Validates the team, offices, and company story." },
                          { step: "✓", title: "Requests a proposal", desc: "Converts via \"Talk to our expert\" CTA.", highlight: true }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 relative z-10 items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${item.highlight ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                              {item.step}
                            </div>
                            <div>
                              <h5 className={`font-bold text-lg ${item.highlight ? 'text-accent' : 'text-white'}`}>{item.title}</h5>
                              <p className="text-white/60 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Job Seeker */}
                    <div className="border border-white/10 rounded-3xl p-8 bg-white/5">
                      <h4 className="text-accent font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full"></span> THE JOB SEEKER
                      </h4>
                      <div className="space-y-8 relative">
                        {/* Vertical Line */}
                        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-white/20 -z-0"></div>
                        {[
                          { step: "1", title: "Lands on homepage", desc: "Sees agency brand and culture signals." },
                          { step: "2", title: "Goes to Careers page", desc: "Reads values and benefits before listings." },
                          { step: "3", title: "Browses open roles", desc: "Filtered by department." },
                          { step: "4", title: "Clicks a role", desc: "Clean job detail with requirements." },
                          { step: "✓", title: "Completes application", desc: "Multi-step form with resume + portfolio upload.", highlight: true }
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 relative z-10 items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0 ${item.highlight ? 'bg-accent text-white' : 'bg-white/20 text-white'}`}>
                              {item.step}
                            </div>
                            <div>
                              <h5 className={`font-bold text-lg ${item.highlight ? 'text-accent' : 'text-white'}`}>{item.title}</h5>
                              <p className="text-white/60 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Information Architecture Image */}
                <div className="mb-20">
                  <h3 className="text-2xl font-bold text-ink mb-8 text-center">Information Architecture</h3>
                  <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden bg-white border border-border shadow-sm mb-8 cursor-zoom-in" onClick={() => setSelectedImage("/image/information_architecture_2x.webp")}>
                    <img loading="lazy" src="/image/information_architecture_2x.webp" alt="Information Architecture" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                  </div>
                </div>

                {/* 15 Pages Logic */}
                <div className="mb-20 bg-ink p-6 sm:p-10 md:p-16 rounded-[32px] md:rounded-[40px]">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                    15 pages. One clear <span className="text-blue-500 italic-serif font-normal">logic.</span>
                  </h2>
                  <p className="text-lg text-white/70 mb-12 max-w-3xl">
                    Every page followed the same structural rule: hero establishes context fast → service or content detail → social proof → CTA. Three navigation clusters kept the hierarchy legible in seconds.
                  </p>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: "Homepage", sections: "8 sections", items: "Intro · Our Work · Scale CTA · Clients · Testimonials · Certifications · Blog · Footer" },
                      { title: "Service Pages", sections: "8 sections × 5", items: "Hero · Services · Case Studies · Clients · Testimonials · Certifications · Blog · Footer" },
                      { title: "About Us", sections: "7 sections", items: "Hero · Who we are · Why us · Clients · Offices · Team · Footer" },
                      { title: "Careers", sections: "6 sections", items: "Hero · Team values · Benefits · Current openings · Who we are · CTA · Footer" },
                      { title: "Case Study Single", sections: "7 sections", items: "Hero · Intro · What we did · How we did it · Value provided · Related cases · Footer" },
                      { title: "Blog System", sections: "6 sections", items: "Blog listing · Categories · Featured · Single post · Related posts · Footer" }
                    ].map((page, i) => (
                      <div key={i} className="border border-white/10 rounded-3xl p-6 bg-white/5">
                        <div className="inline-block px-3 py-1 bg-blue-900/50 text-blue-400 rounded-full text-xs font-medium mb-4">
                          {page.sections}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-4">{page.title}</h4>
                        <p className="text-white/60 text-sm leading-relaxed">{page.items}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="mb-20 bg-white p-8 md:p-12 rounded-[40px] border border-border shadow-sm">
                  <p className="text-lg text-ink/80 mb-12 max-w-3xl">
                    Tech Bay Leaf isn't a generalist agency. Five distinct service areas, each with its own metrics, talent structure, and client outcomes. I had to understand all of it before designing a single screen.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-blue-500 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Ad Operations</h4>
                      <p className="text-ink/70 text-sm mb-6">End-to-end campaign management across Meta, Google, TikTok, Pinterest, LinkedIn, and Snapchat. Not just running ads; acting as a full extension of the brand's marketing team.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Performance</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Strategy</span>
                      </div>
                    </div>
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-blue-600 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Paid Creatives</h4>
                      <p className="text-ink/70 text-sm mb-6">Performance-led static, video, and motion creatives built around CTR, CTA, conversion, and funnel metrics. Every creative is rooted in campaign goals, not aesthetics.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">CTR</span>
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">Conversion</span>
                      </div>
                    </div>
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-orange-500 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Email Automation + CRM</h4>
                      <p className="text-ink/70 text-sm mb-6">From onboarding sequences to retention flows, built around open rates, CTR, conversion, and list growth. Email marketing that drives revenue, not just opens.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">Lifecycle</span>
                        <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">Retention</span>
                      </div>
                    </div>
                    <div className="border border-border rounded-3xl p-6">
                      <div className="w-12 h-1 bg-amber-600 mb-6 rounded-full"></div>
                      <h4 className="text-xl font-bold text-ink mb-4">Managed Services</h4>
                      <p className="text-ink/70 text-sm mb-6">A complete outsourced marketing function: strategy, planning, content, analytics, and ongoing optimization. The full package for brands that want to move fast without building in-house.</p>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">Strategy</span>
                        <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">Growth</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 07. Design */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-4xl mx-auto text-center">
                <div className="mb-24">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Wireframing & <span className="text-accent italic-serif font-normal">Iteration</span></h2>
                  <p className="text-white/70 text-xl mb-12 max-w-3xl mx-auto">The majority of time was spent on structure rather than visuals. Low-fidelity wireframes were used to define layout and hierarchy. Multiple variations were explored, answering one question: Does the structure make it easy for users to understand and move forward?</p>
                  <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/wireframe_2x.webp")}>
                    <img loading="lazy" src="/image/wireframe_2x.webp" alt="Wireframes" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                  </div>
                </div>
                
                <div className="mb-24">
                  <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Final <span className="text-accent italic-serif font-normal">Design</span></h2>
                  <p className="text-white/70 text-xl mb-12 max-w-3xl mx-auto">The final output included a complete website system covering over 15 pages. The homepage acts as the primary entry point, focusing on credibility and quick understanding. Service pages provide detailed breakdowns while maintaining consistency. Case studies support validation and decision-making. The blog system supports content and SEO. The careers page focuses on culture and hiring.</p>
                  <div className="flex flex-col gap-8">
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/final_ui_mock_2x.webp")}>
                      <img loading="lazy" src="/image/final_ui_mock_2x.webp" alt="Final UI" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/ui_design_one_2x.webp")}>
                      <img loading="lazy" src="/image/ui_design_one_2x.webp" alt="UI Mockup 1" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/ui_design_two_2x.webp")}>
                      <img loading="lazy" src="/image/ui_design_two_2x.webp" alt="UI Mockup 2" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                    <div className="aspect-[16/9] bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in" onClick={() => setSelectedImage("/image/all_ui_design_2x.webp")}>
                      <img loading="lazy" src="/image/all_ui_design_2x.webp" alt="UI Mockup 3" className="w-full h-full object-cover" referrerPolicy="no-referrer"  />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 06. Key Design Decisions */}
            <section className="section-padding bg-white">
              <div className="container-wide max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4 tracking-wider uppercase">Key Design Decisions</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6 tracking-tight">
                    The choices that shaped the <span className="text-accent italic-serif font-normal">product.</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Leading with numbers, not words",
                      desc: 'The homepage hero leads with $20M+ Ad Spends, not "We are a digital marketing agency." Numbers make the claim for you. Every key page surfaces the most relevant metric first. Credibility before pitch.'
                    },
                    {
                      title: "Consistent structure across all 5 service pages",
                      desc: "Each service page follows the exact same section order. Intentional; a visitor exploring two services should feel oriented, not lost. In B2B, consistency is a trust signal, not laziness."
                    },
                    {
                      title: "Case study page as a sales tool",
                      desc: "Case studies were structured exactly how a sales conversation works: challenge → what we did → how → result. Ends with related cases and a soft proposal CTA. Evidence first. Ask second."
                    },
                    {
                      title: "Careers as a brand page, not a jobs board",
                      desc: 'Team values and benefits came before job listings. "Who we are" before "what we\'re hiring for." Great candidates choose culture before they choose a job description.'
                    },
                    {
                      title: "Making the Managed Services process visible",
                      desc: 'The managed services page included a step-by-step onboarding flow. Making the process visible removes the biggest B2B objection: "but how does it actually work?" Transparency converts.'
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="group bg-bg p-8 md:p-10 rounded-[32px] border border-border hover:border-accent/30 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-xl mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        {index + 1}
                      </div>
                      <h3 className="text-2xl font-bold text-ink mb-4 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                      <p className="text-ink/70 text-lg leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Impact Stats */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-accent font-medium text-lg mb-4 tracking-wider uppercase">Impact</h3>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                    What changed after the <span className="text-accent italic-serif font-normal">launch.</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-16">
                  {[
                    { top: "15+", bottom: "Pages designed & shipped" },
                    { top: "5", bottom: "Dedicated service pages" },
                    { top: "3x", bottom: "Average CTAs per page" },
                    { top: "100%", bottom: "Consistent design system" }
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 p-8 rounded-[32px] border border-white/10 text-center flex flex-col justify-between h-full">
                      <h4 className="text-4xl font-bold text-accent mb-4">{item.top}</h4>
                      <p className="text-white/70 font-medium">{item.bottom}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white/5 p-10 rounded-[32px] border border-white/10">
                  <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto mb-12 text-center">
                    The redesign improves how quickly users understand the offering, builds trust within the first interaction, and creates a clear path to action. Structuring services, surfacing proof early, and guiding users through a defined flow reduces friction and increases conversion readiness.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      "Users can now identify relevant services within the first 10–15 seconds, reducing confusion and improving decision speed.",
                      "Early visibility of credibility signals reduces initial drop-offs and improves user confidence within the first interaction.",
                      "Clear and repeated CTAs ensure users always have a defined next step, improving conversion intent.",
                      "A structured flow reduces friction and helps users move from exploration to decision with fewer steps.",
                      "Positioning case studies before CTAs increases user confidence and supports conversion decisions.",
                      "Consistent page structure helps users navigate and compare services without relearning layouts.",
                      "Presenting culture and values before roles improves candidate engagement and application quality."
                    ].map((point, index) => (
                      <div key={index} className="flex items-start gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2.5 shrink-0" />
                        <p className="text-white/80 text-lg leading-relaxed">
                          {point.split(" ").map((word, i) => {
                            if (["10–15", "seconds,", "credibility", "CTAs", "structured", "case", "studies", "Consistent", "culture", "values"].includes(word.replace(/[.,]/g, ""))) {
                              return <span key={i} className="text-accent font-semibold">{word} </span>;
                            }
                            return <span key={i}>{word} </span>;
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* 08. Epilogue */}
            <section className="section-padding bg-bg">
              <div className="container-wide max-w-4xl mx-auto">
                <div className="bg-white rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-16 border border-border shadow-sm text-center">
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-16 tracking-tight">
                    What this project changed <br/>in how I <span className="text-accent italic-serif font-normal">design.</span>
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 mb-16 text-left">
                    {[
                      {
                        num: "01",
                        title: "B2B websites are sales tools, not brochures",
                        desc: "Every design decision had to be evaluated through one lens: does this move a visitor closer to a proposal request? In B2B, structure matters more than style."
                      },
                      {
                        num: "02",
                        title: "Content architecture is the real design work",
                        desc: "The IA and wireframe phase took longer than the visual design phase. Getting information hierarchy right is where the actual design thinking lives."
                      },
                      {
                        num: "03",
                        title: "Consistency is a trust signal",
                        desc: "When every service page follows the same structure, the visitor feels in control. Predictability in B2B isn't boring; it's reassuring."
                      },
                      {
                        num: "04",
                        title: "Social proof is a design element",
                        desc: "Client logos, testimonials, certifications, and case studies were structural parts of every page from wireframe stage. Show good proof early and often."
                      }
                    ].map((item, i) => (
                      <div key={i} className="bg-bg p-8 rounded-3xl border border-border">
                        <div className="text-4xl font-bold text-accent/30 mb-4">{item.num}</div>
                        <h4 className="text-xl font-bold text-ink mb-3">{item.title}</h4>
                        <p className="text-ink/70 leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-8 text-lg text-ink/70 leading-relaxed mb-12 text-left">
                    <div>
                      <h4 className="font-bold text-ink mb-2">Challenges</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Balancing the amount of content. The agency had a lot to say, but presenting everything at once created confusion.</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Structuring multiple services without making the website feel complex.</li>
                        <li className="flex items-start gap-3"><span className="text-accent mt-1">•</span> Constantly aligning business expectations with user needs, ensuring the design supports both.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-8 bg-ink rounded-3xl border border-blue-900/50 text-center">
                    <p className="text-2xl text-blue-400 font-medium italic-serif mb-4">
                      "A visually good design attracts attention. A structured system converts that attention into action."
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Final Reflection */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-4xl mx-auto text-center">
                <h3 className="text-accent font-medium text-lg mb-8 tracking-wider uppercase">Final Reflection</h3>
                <p className="text-3xl md:text-4xl font-bold leading-tight text-white">
                  "Tech Bay Leaf didn't need a trendy design. They needed a website that worked as hard as they do — <span className="text-accent italic-serif font-normal">structured, credible, and built to turn a curious visitor into a client conversation.</span>"
                </p>
                <div className="w-20 h-1 bg-accent mx-auto mt-12" />
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  I’d Love to Hear Your Thoughts.
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {isDesignFileManagement && (
          <>
            {/* The Problem */}
            <section className="section-padding bg-white">
              <div className="container-wide grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-accent" />
                    <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">The Context</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    The problem nobody talks about <span className="italic-serif font-normal text-accent">design file chaos.</span>
                  </h2>
                  <div className="space-y-6 text-muted text-lg font-normal leading-relaxed">
                    <p>When you're working solo in Figma, almost any file structure seems to work.</p>
                    <p>But the moment a second designer joins or a PM, developer, or new team member steps in that informal system breaks down instantly.</p>
                    <p>I’ve seen it happen too often:</p>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Pages named “Final_v3_ACTUAL_FINAL”.</li>
                      <li>Wireframes mixed with shipped designs.</li>
                      <li>No clear indication of what’s approved.</li>
                      <li>Developers picking up the wrong screens and building from outdated versions.</li>
                    </ul>
                    <p>What once felt manageable quickly turns into confusion, misalignment, and costly mistakes.</p>
                  </div>
                </div>
                <div className="bg-ink p-10 md:p-14 rounded-[32px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MessageSquare size={120} />
                  </div>
                  <p className="text-xl md:text-3xl font-display italic leading-relaxed relative z-10 mb-8">
                    "Design files were becoming a bottleneck instead of an enabler. Every hour lost to file confusion is an hour stolen from actual design work."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold">AC</div>
                    <div>
                      <p className="font-bold text-lg">Aman Chourasiya</p>
                      <p className="text-[12px] text-white/40 uppercase tracking-[0.2em] font-medium">Product Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Before & After Comparison */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="text-center mb-20">
                  <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent mb-4 block">Transformation</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                    From scattered pages to a <span className="italic-serif font-normal text-accent">structured system.</span>
                  </h2>
                  <p className="text-muted text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed">
                    The transformation wasn't just visual. Every page in the new structure has a clear purpose, a defined lifecycle stage, and a specific audience.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  {/* Before */}
                  <div className="bg-white rounded-[40px] border border-border overflow-hidden shadow-sm flex flex-col">
                    <div className="bg-red-50 px-8 py-5 border-b border-red-100 flex justify-between items-center">
                      <span className="text-[12px] font-medium text-red-600 uppercase tracking-[0.2em]">Old Structure</span>
                      <span className="px-2 py-1 bg-red-100 text-[10px] font-medium text-red-600 rounded uppercase">Unstructured</span>
                    </div>
                    <div className="p-6 md:p-10 bg-bg flex-1 flex items-center justify-center">
                      <img 
                        src="/image/old_file_2x.webp" 
                        alt="Before" 
                        className="w-full block cursor-zoom-in" 
                        
                        referrerPolicy="no-referrer" 
                        onClick={() => setSelectedImage("/image/old_file_2x.webp")}
                      />
                    </div>
                    <div className="p-8 md:p-10 bg-white border-t border-border">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-muted font-normal">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          No hierarchy or lifecycle logic
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted font-normal">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          WIP mixed with final references
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted font-normal">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                          Ambiguous page naming
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-white rounded-[40px] border border-accent/20 overflow-hidden shadow-xl shadow-accent/5 flex flex-col">
                    <div className="bg-accent/5 px-8 py-5 border-b border-accent/10 flex justify-between items-center">
                      <span className="text-[12px] font-medium text-accent uppercase tracking-[0.2em]">New System</span>
                      <span className="px-2 py-1 bg-accent/10 text-[10px] font-medium text-accent rounded uppercase">System-Driven</span>
                    </div>
                    <div className="p-6 md:p-10 bg-bg flex-1 flex items-center justify-center">
                      <img 
                        src="/image/new_file_2x.webp" 
                        alt="After" 
                        className="w-full block cursor-zoom-in" 
                        
                        referrerPolicy="no-referrer" 
                        onClick={() => setSelectedImage("/image/new_file_2x.webp")}
                      />
                    </div>
                    <div className="p-8 md:p-10 bg-white border-t border-border">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-ink font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Three-layer architecture (Entry, Exec, Support)
                        </div>
                        <div className="flex items-center gap-3 text-sm text-ink font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Clear "Locked" vs "WIP" separation
                        </div>
                        <div className="flex items-center gap-3 text-sm text-ink font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          Index page as single source of truth
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Deep Dive */}
            <section className="section-padding bg-ink text-white overflow-hidden">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-32">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Deep Dive 01</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      The index <span className="italic-serif font-normal text-accent">the file's control panel.</span>
                    </h2>
                    <div className="space-y-10">
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Search className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Single source of truth</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Navigation dashboard linking to all pages, status tracking, Jira references, and ownership in one place.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Clock className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Status progression</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Visual tracking from Planned → Design Locked → Development. Zero ambiguity on what's ready to build.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-zoom-in"
                    onClick={() => setSelectedImage("/image/file_index_2x.webp")}
                  >
                    <img 
                      src="/image/file_index_2x.webp" 
                      alt="Deep Dive 1" 
                      className="w-full h-auto block" 
                      
                      referrerPolicy="no-referrer" 
                    />
                  </motion.div>
                </div>

                <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl order-2 lg:order-1 cursor-zoom-in"
                    onClick={() => setSelectedImage("/image/design_checklist_image_2x.webp")}
                  >
                    <img 
                      src="/image/design_checklist_image_2x.webp" 
                      alt="Deep Dive 2" 
                      className="w-full h-auto block" 
                      
                      referrerPolicy="no-referrer" 
                    />
                  </motion.div>
                  <div className="order-1 lg:order-2">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Deep Dive 02</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Design checklist <span className="italic-serif font-normal text-accent">the quality gate.</span>
                    </h2>
                    <div className="space-y-10">
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <ShieldCheck className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Three-gate validation</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Required checks before starting, before review, and before handoff. Removes dependence on memory.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Workflow className="text-accent" size={28} />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold mb-2">Handoff readiness</h4>
                          <p className="text-white/50 text-base font-normal leading-relaxed">
                            Confirms specs are complete, assets are exported, and Jira tickets are updated. Handoff becomes a non-event.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Workflow Steps */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Process</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    How a design moves from <span className="italic-serif font-normal text-accent">idea to shipped.</span>
                  </h2>
                </div>

                <div className="space-y-0">
                  {[
                    { num: "01", title: "Start with context", desc: "Before designing anything, the Index is updated with project scope and Jira links. The Thumbnail is set for immediate identification." },
                    { num: "02", title: "Validate before designing", desc: "The Pre-design checklist is completed. This forces alignment on requirements and constraints before a single pixel is moved." },
                    { num: "03", title: "Design in WIP", desc: "All active work happens in WIP Designs, organized by feature. This is the safe zone for creativity and exploration." },
                    { num: "04", title: "Quality check", desc: "The review and handoff checklists are completed. UX validation and component consistency are verified." },
                    { num: "05", title: "Lock and mark", desc: "Approved designs move to Locked. Status is updated in Index. No further edits are made to locked screens." }
                  ].map((step, i) => (
                    <div key={i} className="group grid md:grid-cols-[120px_1fr] gap-12 py-16 border-b border-border last:border-none">
                      <div className="text-5xl md:text-7xl font-black text-border group-hover:text-accent transition-colors duration-500">{step.num}</div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-2xl md:text-3xl font-bold mb-4">{step.title}</h4>
                        <p className="text-muted text-lg md:text-xl font-normal leading-relaxed max-w-4xl">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Impact Stats */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                  <div className="bg-white p-12 rounded-[32px] border border-border shadow-sm">
                    <div className="text-5xl font-black text-accent mb-6">70%</div>
                    <p className="text-xl font-bold mb-3">Reduction in confusion</p>
                    <p className="text-muted text-base font-normal leading-relaxed">
                      Fewer "where is the latest version?" questions from cross-functional partners.
                    </p>
                  </div>
                  <div className="bg-white p-12 rounded-[32px] border border-border shadow-sm">
                    <div className="text-5xl font-black text-accent mb-6">3×</div>
                    <p className="text-xl font-bold mb-3">Faster Onboarding</p>
                    <p className="text-muted text-base font-normal leading-relaxed">
                      New designers can navigate complex files in under 30 seconds without a guided tour.
                    </p>
                  </div>
                  <div className="bg-white p-12 rounded-[32px] border border-border shadow-sm">
                    <div className="text-5xl font-black text-accent mb-6">0</div>
                    <p className="text-xl font-bold mb-3">Version Errors</p>
                    <p className="text-muted text-base font-normal leading-relaxed">
                      Zero instances of developers building from outdated or exploratory design versions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-ink text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full -mb-64" />
              <div className="max-w-4xl mx-auto relative z-10">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Sparkles size={40} />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight">
                  "This is not just a file structure. It's a <span className="italic-serif font-normal text-accent">design operations system</span> one that lets designers focus on solving problems instead of managing chaos."
                </h2>
                <div className="w-16 h-1 bg-accent mx-auto mb-10" />
                <p className="text-white/40 text-[12px] font-medium uppercase tracking-[0.2em] mb-16">Designed by Aman Chourasiya · Product Designer</p>
                <button 
                  onClick={onClose}
                  className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                  <span className="relative z-10">Back to Portfolio</span>
                </button>
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  I’d Love to Hear Your Thoughts.
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {isMeroMedClinic && (
          <>
            {/* The Context */}
            <section className="section-padding bg-white">
              <div className="container-wide grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-accent" />
                    <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">The Context</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    Building the command layer <span className="italic-serif font-normal text-accent">behind fast paced clinical operations.</span>
                  </h2>
                  <div className="space-y-6 text-muted text-lg font-normal leading-relaxed">
                    <p className="text-muted text-lg font-normal leading-relaxed">
                      Mero Med's Clinic Admin panel is the operational nervous system for clinical practices running on the platform. Every day, administrators use it to move patients through encounter and prescription workflows, configure staff and clinic entities, manage communication queues, review schedules, and track revenue often simultaneously.
                    </p>
                    <p className="text-muted text-lg font-normal leading-relaxed">
                      In this environment, the sidebar is not a menu. It is infrastructure. It determines how fast staff can act, how much mental effort each workflow costs, and whether new team members can be onboarded without weeks of friction. When infrastructure is poorly designed, every user pays a tax invisibly, repeatedly, across every session.
                    </p>
                  </div>
                </div>
                <div className="bg-ink p-10 md:p-14 rounded-[32px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <MessageSquare size={120} />
                  </div>
                  <p className="text-xl md:text-3xl font-display italic leading-relaxed relative z-10 mb-8">
                    "The sidebar felt like a junk drawer. Everything was there, but finding what you needed took too many clicks and too much thinking."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold">AC</div>
                    <div>
                      <p className="font-bold text-lg">Aman Chourasiya</p>
                      <p className="text-[12px] text-white/40 uppercase tracking-[0.2em] font-medium">Product Designer</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Challenge */}
            <section className="section-padding bg-bg border-y border-border">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
                  {/* Left Side: Heading and Text */}
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Challenge</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      The navigation that <span className="italic-serif font-normal text-accent">grew, not designed.</span>
                    </h2>
                    <div className="space-y-6 text-muted text-lg font-normal leading-relaxed">
                      <p>As Mero Med grew, the sidebar didn’t really get redesigned it just kept expanding. Every time a new feature shipped, it found a place in the navigation. Over time, this turned the sidebar into a collection of modules rather than a system.</p>
                      <p>What we ended up with was something that reflected how the product evolved internally, not how clinics actually operate day to day. Related workflows were scattered, some actions took longer to reach than they should.</p>
                    </div>
                    
                    <div className="mt-12 flex items-center gap-6 p-6 bg-white rounded-3xl border border-border shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center font-bold text-white shrink-0">AC</div>
                      <p className="text-ink/60 text-base italic font-display leading-relaxed">
                        "The navigation was a reflection of our internal team structure, not the user's workflow."
                      </p>
                    </div>
                  </div>

                  {/* Right Side: UX Visualization */}
                  <div className="bg-ink rounded-[40px] p-0 border border-white/10 relative overflow-hidden group shadow-2xl">
                    <div className="relative z-10">
                      <img 
                        src="/image/old_navigation_bar_2x.webp" 
                        alt="Legacy Sidebar UX Visualization" 
                        className="w-full h-auto block"
                      />
                    </div>
                  </div>
                </div>

                {/* Below them: 3x2 Grid of Pointers */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { 
                      title: "No Logical Grouping", 
                      icon: <Layers size={20} />,
                      desc: "Clinical actions scattered with no clustering staff hunt the full sidebar for one workflow." 
                    },
                    { 
                      title: "Flat Hierarchy", 
                      icon: <BarChart3 size={20} />,
                      desc: "Dashboard and Settings at equal visual weight. No signal for what matters most in a busy clinic." 
                    },
                    { 
                      title: "Inconsistent Sub-nav", 
                      icon: <MousePointer2 size={20} />,
                      desc: "Some items expand on click, others don't. Users re-discover behavior every session." 
                    },
                    { 
                      title: "Workflow-Irrelevant", 
                      icon: <Zap size={20} />,
                      desc: "Ordered by when built, not how used by the administrators or clinical staff." 
                    },
                    { 
                      title: "Weak Icon Differentiation", 
                      icon: <Search size={20} />,
                      desc: "Icons lacked silhouette distinction. Fast-paced sessions need instant recognition." 
                    },
                    { 
                      title: "Scalability Dead End", 
                      icon: <AlertCircle size={20} />,
                      desc: "The flat structure had no room to grow. Every new module simply extended an already-long list." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white rounded-3xl border border-border hover:border-red-500/30 transition-all group flex flex-col gap-4 items-start shadow-sm hover:shadow-md">
                      <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-ink mb-2 group-hover:text-red-500 transition-colors">{item.title}</h4>
                        <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Operational Friction Quote */}
                <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 border-l-4 border-blue-600 shadow-sm flex flex-col gap-6">
                  <p className="text-xl md:text-2xl italic-serif text-ink leading-relaxed">
                    "In a clinic seeing 40+ patients a day, a 10-second navigation delay costs over 6 minutes per staff member, invisible, but compounding every single session."
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
                    <span>Operational friction cost</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>Daily impact</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Reframing the Problem */}
            <section className="section-padding bg-white overflow-hidden">
              <div className="container-wide">
                <div className="w-full">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Reframing the Problem</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    Not visual but <span className="italic-serif font-normal text-blue-600">structural.</span>
                  </h2>
                  <p className="text-muted text-lg font-normal leading-relaxed mb-16 max-w-3xl">
                    Before sketching any new structure, I needed to reframe what the problem actually was. The instinct in most navigation redesigns is to ask "how do we make this look cleaner?" That framing leads to cosmetic fixes. I needed a structural answer which required a completely different question.
                  </p>

                  <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden mb-16 group">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-blue-500/20 transition-all duration-1000"></div>
                    
                    <div className="relative z-10">
                      <span className="bg-white text-blue-900 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-8 inline-block shadow-sm">The Design Question</span>
                      <h3 className="text-2xl md:text-5xl italic-serif font-normal leading-tight mb-12 max-w-4xl">
                        "How does a clinic administrator actually think about their day and how should the navigation reflect that mental model?"
                      </h3>
                      
                      <div className="bg-white rounded-[32px] p-8 md:p-12 mt-12 shadow-xl relative z-10">
                        <div className="grid md:grid-cols-2 gap-12">
                          <div>
                            <span className="text-red-500 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 block">Old Thinking</span>
                            <ul className="space-y-6 text-ink/70 font-medium text-base md:text-lg">
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Organize by feature
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Built for the roadmap
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Static list
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-red-500/40 text-2xl font-bold">→</span> Navigate to explore
                              </li>
                            </ul>
                          </div>
                          <div>
                            <span className="text-emerald-600 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 block">New Thinking</span>
                            <ul className="space-y-6 text-ink/70 font-medium text-base md:text-lg">
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Organize by workflow
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Built for clinic rhythm
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Intent-clustered system
                              </li>
                              <li className="flex items-center gap-4">
                                <span className="text-emerald-600/40 text-2xl font-bold">→</span> Navigate to execute
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border-l-4 border-blue-600 p-8 md:p-12 rounded-3xl mt-12 shadow-sm flex flex-col gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">The key behavioral insight:</span>
                    <p className="text-xl md:text-2xl italic-serif text-ink leading-relaxed">
                      Clinic admins don't navigate to <span className="text-blue-600">explore</span>. They navigate to <span className="text-blue-600">execute</span>. Every click is goal-directed. The system's job is to get out of their way as fast as possible.
                    </p>
                  </div>
                </div>
              </div>
            </section>




            {/* Problem vs. Solution Mapping */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="text-center mb-20">
                  <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent mb-4 block">Problem vs. Solution</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                    Mapping <span className="italic-serif font-normal text-accent">pain to progress.</span>
                  </h2>
                  <p className="text-muted text-lg font-normal max-w-2xl mx-auto">
                    We didn't just redesign the UI; we re-engineered the operational flow of the clinic.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <AlertCircle className="text-red-500" />
                      The Problems
                    </h3>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Cognitive Overload</h4>
                      <p className="text-muted text-sm">14+ flat items forced users to scan the entire list for every task, causing "decision paralysis" during busy hours.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Hidden Critical Tasks</h4>
                      <p className="text-muted text-sm">Billing and Patient Records were buried under less important settings, leading to operational bottlenecks.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Inconsistent Patterns</h4>
                      <p className="text-muted text-sm">Icons and labels didn't follow a unified system, increasing the time taken to recognize and click the right tool.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-border border-l-4 border-l-red-500 shadow-sm">
                      <h4 className="font-bold mb-2">Lack of Scalability</h4>
                      <p className="text-muted text-sm">New features were added haphazardly, making the interface feel cluttered and "bolted together."</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                      <CheckCircle2 className="text-accent" />
                      The Solutions
                    </h3>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Hierarchical UX</h4>
                      <p className="text-muted text-sm">Grouped items into 3 logical buckets (Core, Management, System), reducing primary nav to 6 items.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Priority Anchoring</h4>
                      <p className="text-muted text-sm">Placed 'Appointments' and 'Patients' at the top for instant access, reducing click depth for 80% of tasks.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Unified Design System</h4>
                      <p className="text-muted text-sm">Built a custom icon library and standardized interaction states, improving visual recognition speed by 30%.</p>
                    </div>
                    <div className="p-8 bg-white rounded-3xl border border-accent/20 border-l-4 border-l-accent shadow-sm">
                      <h4 className="font-bold mb-2">Modular Architecture</h4>
                      <p className="text-muted text-sm">Created a flexible sidebar component that can accommodate new modules without disrupting the core workflow.</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Navigation Application Anatomy */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="bg-bg p-4 md:p-8 rounded-[32px] border border-border">
                  <img 
                    src="/image/navigation_application_anatomy_2x.webp" 
                    alt="Navigation application anatomy" 
                    className="w-full h-auto rounded-2xl" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </section>

            {/* Interaction & UX Evolution: Full Audit & Redesign (Dark Theme) */}
            <section className="section-padding bg-ink text-white overflow-hidden relative border-t border-white/5">
              <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none">
                <Workflow size={600} />
              </div>
              
              <div className="container-wide relative z-10">
                {/* Header Section */}
                <div className="max-w-4xl mb-24">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.3em] mb-4 block">INFORMATION ARCHITECTURE & DESIGN DECISION</span>
                  <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                    From Features to <span className="italic-serif font-normal text-accent">Workflows.</span>
                  </h2>
                  <p className="text-white/80 text-xl font-normal leading-relaxed max-w-3xl mb-8">
                    The redesign transformed a fragmented navigation into a structured, workflow-aligned system reducing friction, improving discoverability, and enabling faster execution of high-frequency clinical tasks.
                  </p>
                  <div className="inline-flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                    <div className="p-4 bg-accent rounded-2xl">
                      <Brain size={32} className="text-ink" />
                    </div>
                    <div>
                      <p className="text-lg font-bold italic">"I didn’t reorganize the menu, I restructured how the product is accessed, aligning navigation with real clinical workflows instead of feature growth."</p>
                    </div>
                  </div>
                </div>

                {/* UX Comparison: Old vs New */}
                <div className="grid lg:grid-cols-12 gap-12 mb-32">
                  {/* Old Navigation (Left) */}
                  <div className="lg:col-span-4">
                    <div className="p-10 bg-white/5 rounded-[48px] border border-white/10 h-full">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em]">Old Interaction Model</h3>
                      </div>
                      <div className="space-y-2 opacity-40">
                        {[
                          "Dashboard", "GFE Review", "ePrescription", "New Order", "SmarterRx", "Clinics", "Staff", "Communication", "Support", "Clients", "Schedule", "  - Appointments", "  - Calendar", "  - Events", "Commerce", "Sales", "Reports", "Tools", "Logout"
                        ].map((item, i) => (
                          <div key={i} className="text-sm font-medium py-1.5 border-b border-white/5 last:border-0">{item}</div>
                        ))}
                      </div>
                      <div className="mt-10 p-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400 mb-2">Nature of Old UX</p>
                        <p className="text-xs text-red-400/70 leading-relaxed">Flat, feature-accumulated list. No clear domain separation. High cognitive load due to lack of hierarchy.</p>
                      </div>
                    </div>
                  </div>

                  {/* New Navigation (Right) */}
                  <div className="lg:col-span-8">
                    <div className="p-10 bg-accent/5 rounded-[48px] border border-accent/20 h-full">
                      <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(var(--accent),0.4)]" />
                        <h3 className="text-xl font-bold uppercase tracking-[0.2em]">New UX Framework</h3>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {[
                          { id: "01", group: "Overview", items: ["Dashboard"], icon: Layout },
                          { id: "02", group: "Clinical Operations", items: ["Encounter", "Patients", "Orders"], icon: Activity },
                          { id: "03", group: "Communication", items: ["Patient Chat", "Support Tickets"], icon: MessageSquare },
                          { id: "04", group: "Scheduling", items: ["Appointments", "Calendar", "Events"], icon: Clock },
                          { id: "05", group: "Financial System", items: ["Transactions", "Funding", "Invoicing", "Customers"], icon: Database },
                          { id: "06", group: "Analytics", items: ["Encounter Reports", "Transaction Reports"], icon: PieChart },
                          { id: "07", group: "Products & Ecosystem", items: ["Products & Services", "Wizlo Marketplace"], icon: Globe },
                          { id: "08", group: "Data Capture", items: ["Forms"], icon: ClipboardList },
                          { id: "09", group: "System Configuration", items: ["Clinics", "Staff", "Patient Portal", "Integrations", "Roles & Permissions", "Activity Logs"], icon: Settings2 },
                          { id: "10", group: "Utilities", items: ["Notifications", "Bug Reporting", "Profile / Controls"], icon: Bell }
                        ].map((zone) => (
                          <div key={zone.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-accent/30 transition-colors group/zone">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-1 rounded">{zone.id}</span>
                                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-white">{zone.group}</h4>
                              </div>
                              <zone.icon size={16} className="text-white/20 group-hover/zone:text-accent transition-colors" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {zone.items.map(item => (
                                <span key={item} className="text-[10px] font-bold px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white/70">{item}</span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 1 Image */}
                <div className="mb-32 w-full">
                  <div className="bg-bg p-4 md:p-8 rounded-[32px] border border-border">
                    <img 
                      src="/image/ia_mindmap_img_2x.webp" 
                      alt="Deep Dive 01" 
                      className="w-full h-auto rounded-2xl block" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Decision Making Pointers */}
                <div className="mb-32">
                  <div className="text-center mb-16">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Decision Making Pointers</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-white">
                      The strategic logic behind every <span className="italic-serif font-normal text-accent">structural shift.</span>
                    </h2>
                  </div>
                  <div className="grid gap-4">
                    {/* Column Headers */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4 px-2">
                      <div className="flex items-center gap-3">
                        <AlertCircle size={18} className="text-red-500" />
                        <h4 className="text-[12px] font-medium uppercase tracking-[0.3em] text-red-500">The Problem</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-accent" />
                        <h4 className="text-[12px] font-medium uppercase tracking-[0.3em] text-accent">The Resolution</h4>
                      </div>
                    </div>

                    {[
                      { prob: "Flat, undifferentiated module list", res: "6 intent-based operational zones with visual groupings" },
                      { prob: "Inconsistent, unpredictable sub-navigation", res: "Nesting only where structurally justified (Schedule only)" },
                      { prob: "No visual hierarchy, everything equal weight", res: "Weight, indentation, and group labels create clear tiers" },
                      { prob: "Ordered by product roadmap, not user workflow", res: "Ordered by operational frequency and clinical phase" },
                      { prob: "Generic icons with poor differentiation", res: "Distinct silhouette-based icon system for recognition" },
                      { prob: "No spatial orientation in deep workflows", res: "Breadcrumb anchors context across all multi-step flows" },
                      { prob: "Dead end, every feature extends the flat list", res: "Zone-based architecture absorbs new modules without disruption" }
                    ].map((item, i) => (
                      <div key={i} className="grid md:grid-cols-2 gap-4">
                        <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/10">
                          <p className="text-lg font-medium text-white/70">{item.prob}</p>
                        </div>
                        <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20">
                          <p className="text-lg font-medium text-white">{item.res}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Final Metrics Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-16">
                  {[
                    { val: "3.2s", label: "Average navigation speed" },
                    { val: "92%", label: "Task success rate" },
                    { val: "14", label: "Fewer clicks per workflow" },
                    { val: "Top 5", label: "Most used clinical modules" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="text-4xl md:text-6xl font-black text-accent mb-2">{stat.val}</p>
                      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
            {/* IA Summary Comparison Bar */}
            <section className="py-24 bg-white border-y border-border">
              <div className="container-wide">
                <div className="bg-white rounded-[40px] border border-border overflow-hidden flex flex-col md:flex-row items-stretch">
                  {/* Left: Unstructured */}
                  <div className="flex-1 p-6 sm:p-10 md:p-16 flex flex-col justify-center">
                    <h3 className="text-2xl md:text-3xl font-black text-[#E54D4D] mb-3 uppercase tracking-tighter whitespace-nowrap">Unstructured</h3>
                    <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-muted flex flex-wrap gap-x-2">
                      <span>25+ ITEMS</span>
                      <span className="opacity-30">·</span>
                      <span>FLAT LIST</span>
                      <span className="opacity-30">·</span>
                      <span>NO INTENT GROUPING</span>
                    </p>
                  </div>
                  
                  {/* Middle: Redesigned */}
                  <div className="border-y md:border-y-0 md:border-x border-border p-6 sm:p-10 md:p-16 flex flex-col items-center justify-center text-center min-w-[240px] text-accent">
                    <ArrowRight size={32} className="mb-3" />
                    <span className="text-sm font-black uppercase tracking-[0.3em]">Redesigned</span>
                  </div>
                  
                  {/* Right: 6 Intent Zones */}
                  <div className="flex-1 p-6 sm:p-10 md:p-16 flex flex-col justify-center md:items-end md:text-right">
                    <h3 className="text-2xl md:text-3xl font-black text-accent mb-3 uppercase tracking-tighter whitespace-nowrap">6 Intent Zones</h3>
                    <p className="text-[13px] font-bold uppercase tracking-[0.2em] text-muted flex flex-wrap gap-x-2 md:justify-end">
                      <span>WORKFLOW-ORDERED</span>
                      <span className="opacity-30">·</span>
                      <span>1 JUSTIFIED NESTING LEVEL</span>
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* How the System Behaves */}
            <section className="section-padding bg-bg overflow-hidden">
              <div className="container-wide">
                <div className="max-w-4xl mb-24">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.3em] mb-4 block">Interaction Strategy</span>
                  <h2 className="text-3xl md:text-6xl font-black mb-8 leading-tight tracking-tight">
                    How the system <span className="italic-serif font-normal text-accent">behaves.</span>
                  </h2>
                  <p className="text-muted text-xl font-normal leading-relaxed max-w-3xl">
                    The architecture defined what to show. These design decisions defined how, and how the interface scales from a new staff member's first session to an expert's hundredth.
                  </p>
                </div>

                {/* Navigation States Images */}
                <div className="mb-32">
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="rounded-[32px] overflow-hidden border border-border shadow-sm bg-bg p-6 cursor-zoom-in"
                        onClick={() => setSelectedImage("/image/collapse_new_navbar_2x.webp")}
                      >
                        <img 
                          src="/image/collapse_new_navbar_2x.webp" 
                          alt="Collapsed State: Icon Only" 
                          className="w-full h-auto rounded-[24px] block" 
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Collapsed State: Icon Only</h3>
                        <p className="text-muted leading-relaxed">
                          Distinct silhouette-based icons. After one week, staff navigate by visual memory alone, no reading required.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-6">
                      <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="rounded-[32px] overflow-hidden border border-border shadow-sm bg-bg p-6 cursor-zoom-in"
                        onClick={() => setSelectedImage("/image/expanded_new_navbar_2x.webp")}
                      >
                        <img 
                          src="/image/expanded_new_navbar_2x.webp" 
                          alt="Expanded State: Full Labels" 
                          className="w-full h-auto rounded-[24px] block" 
                          referrerPolicy="no-referrer"
                        />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight mb-3">Expanded State: Full Labels</h3>
                        <p className="text-muted leading-relaxed">
                          Labels, hierarchy, and nesting visible. Schedule expands, the only justified nested group.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Principles List Wrapped in Container */}
                <div className="bg-white p-6 md:p-20 rounded-[32px] md:rounded-[48px] border border-border shadow-sm overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-x-24 gap-y-12 md:gap-y-20">
                    {[
                      {
                        num: "1",
                        title: "Dual-State Navigation: Collapsed & Expanded",
                        desc: "Power users get icon-only speed. New staff get labels and hierarchy. The interface grows with the user; no one is forced into the wrong mode."
                      },
                      {
                        num: "2",
                        title: "Recognition Over Recall",
                        desc: "Every item bound to a consistent, distinctive icon. After a week of use, staff stop reading labels; they navigate by visual muscle memory alone."
                      },
                      {
                        num: "3",
                        title: "Progressive Disclosure: Nest Only What Belongs Together",
                        desc: "Nesting introduced in exactly one place: Schedule. The rule: nest only when sub-items are genuine variants of a parent concept, not independent features."
                      },
                      {
                        num: "4",
                        title: "Breadcrumb System: Contextual Orientation",
                        desc: "Enables non-linear backward navigation. Critical for staff managing multiple patients simultaneously.",
                        extra: (
                          <div className="mt-6 flex flex-wrap items-center gap-2 md:gap-3 px-4 md:px-5 py-3 bg-bg rounded-2xl border border-border w-fit shadow-sm">
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-muted">Dashboard</span>
                            <ChevronRight size={10} className="text-muted/30 md:w-3 md:h-3" />
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-muted">Schedule</span>
                            <ChevronRight size={10} className="text-muted/30 md:w-3 md:h-3" />
                            <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-accent">Calendar</span>
                          </div>
                        )
                      },
                      {
                        num: "5",
                        title: "Active State & Visual Hierarchy",
                        desc: "In high-speed clinical environments, the cost of unnoticed wrong navigation is significant. Active states, indentation, and grouping eliminate that ambiguity."
                      }
                    ].map((principle, i) => (
                      <div key={i} className="flex gap-4 md:gap-10">
                        <div className="text-4xl md:text-5xl font-black text-accent/10 shrink-0 leading-none">{principle.num}</div>
                        <div className="min-w-0">
                          <h4 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 tracking-tight leading-snug break-words">{principle.title}</h4>
                          <p className="text-muted leading-relaxed text-base md:text-lg break-words">{principle.desc}</p>
                          {principle.extra}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>


            {/* Design System */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="flex flex-col items-center justify-center gap-10 md:gap-16">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="w-full rounded-3xl overflow-hidden border border-border shadow-xl cursor-zoom-in"
                    onClick={() => setSelectedImage("/image/navigation_system_2x.webp")}
                  >
                    <img loading="lazy" src="/image/navigation_system_2x.webp" alt="Design System" className="w-full h-auto block" referrerPolicy="no-referrer" />
                  </motion.div>
                  <div className="max-w-3xl text-center flex flex-col items-center">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Visual Language</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Consistency through <span className="italic-serif font-normal text-accent">design systems.</span>
                    </h2>
                    <p className="text-muted text-lg font-normal mb-8 leading-relaxed">
                      This wasn't just a rearrangement of tabs; it was the creation of a reusable navigation system with consistent iconography, clear active states, and responsive behavior.
                    </p>
                    <ul className="flex flex-wrap justify-center gap-6 text-left">
                      <li className="flex items-center gap-3 text-ink font-medium">
                        <CheckCircle2 className="text-accent" size={20} />
                        Standardized Icon Library
                      </li>
                      <li className="flex items-center gap-3 text-ink font-medium">
                        <CheckCircle2 className="text-accent" size={20} />
                        Clear Visual Hierarchy
                      </li>
                      <li className="flex items-center gap-3 text-ink font-medium">
                        <CheckCircle2 className="text-accent" size={20} />
                        Accessible Contrast Ratios
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Before & After */}
            <section className="section-padding bg-bg">
              <div className="container-wide">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">
                    The <span className="italic-serif font-normal text-accent">Transformation.</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-center font-bold text-muted uppercase tracking-widest text-sm">Before</p>
                    <div className="bg-bg p-6 rounded-3xl border border-border shadow-sm">
                      <img loading="lazy" src="/image/before_new_navbar_2x.webp" alt="Before" className="w-full h-auto rounded-2xl" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-center font-bold text-accent uppercase tracking-widest text-sm">After</p>
                    <div className="bg-bg p-6 rounded-3xl border border-accent/20 shadow-xl shadow-accent/5">
                      <img loading="lazy" src="/image/after_new_navbar_2x.webp" alt="After" className="w-full h-auto rounded-2xl" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Metrics & Results */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Result</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Quantifiable improvements in <span className="italic-serif font-normal text-accent">clinic efficiency.</span>
                    </h2>
                    <p className="text-muted text-lg mb-12 leading-relaxed">
                      The redesign wasn't just about aesthetics; it was about operational efficiency. By aligning the system with clinical workflows, we transformed the interface into a tool for speed and precision.
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="p-8 bg-bg rounded-3xl border border-border">
                        <div className="text-4xl font-black text-accent mb-2">40%</div>
                        <p className="text-sm font-bold text-ink uppercase tracking-wider">Reduction</p>
                        <p className="text-xs text-muted mt-1">in cognitive load (NASA-TLX)</p>
                      </div>
                      <div className="p-8 bg-bg rounded-3xl border border-border">
                        <div className="text-4xl font-black text-accent mb-2">25%</div>
                        <p className="text-sm font-bold text-ink uppercase tracking-wider">Faster</p>
                        <p className="text-xs text-muted mt-1">task completion rate</p>
                      </div>
                      <div className="p-8 bg-bg rounded-3xl border border-border col-span-2">
                        <div className="text-4xl font-black text-accent mb-2">85%</div>
                        <p className="text-sm font-bold text-ink uppercase tracking-wider">SUS Score</p>
                        <p className="text-xs text-muted mt-1">System Usability Scale</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-ink p-12 rounded-[40px] text-white">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-4 block">Impact & Outcomes</span>
                    <h3 className="text-2xl md:text-3xl font-black mb-10 leading-tight">Measurable changes to how clinics operate.</h3>
                    <div className="space-y-10">
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Zap className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Faster access to critical workflows</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Core clinical actions require zero sub-navigation; one click from anywhere in the system.</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Brain className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Reduced cognitive load</h4>
                          <p className="text-white/40 text-sm leading-relaxed">Grouped, labeled, and consistently iconified navigation removes the overhead of "where do I go for this?" from every session.</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Users2 className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Improved onboarding</h4>
                          <p className="text-white/40 text-sm leading-relaxed">New staff can read the navigation as a map of clinic operations; the structure teaches the system. Zone names function as orientation guides, not just labels.</p>
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                          <Layers className="text-accent" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-2">Scalable foundation</h4>
                          <p className="text-white/40 text-sm leading-relaxed">New modules slot into the appropriate zone without disrupting existing navigation patterns. The architecture absorbs growth rather than resisting it.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Reflection */}
            <section className="section-padding bg-ink text-white">
              <div className="container-wide max-w-4xl">
                <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-center">
                  Beyond Links: Designing for <span className="text-blue-600 italic font-serif">Mental Models.</span>
                </h2>
                <div className="space-y-8 text-white/60 text-lg font-normal leading-relaxed text-center">
                  <p>Navigation is not about links—it’s about shaping a system that mirrors the user’s mental model. This project demonstrated that when structure aligns with user cognition, complexity dissolves into clarity. Reframing the sidebar around real administrative workflows significantly reduced friction and enabled faster task execution. AI played a critical role in compressing the research cycle. By accelerating transcript analysis and surfacing patterns early, it created more space for deeper exploration, rapid iteration, and higher-quality design decisions.</p>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  I’d Love to Hear Your Thoughts.
                </h2>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </>
        )}

        {isSparrow && (
          <div className="bg-white font-sans text-zinc-900 selection:bg-zinc-100">
            {/* NDA Info Banner */}
            <section className="bg-zinc-900 py-12 md:py-16 border-b border-white/5">
              <div className="container-wide">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="flex items-start gap-6 max-w-3xl">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                      <Shield size={28} className="text-amber-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">NDA Protected Project</h3>
                      <p className="text-zinc-400 text-lg leading-relaxed">
                        This is a high-level overview of the feature I built. Due to confidentiality agreements, I am providing an overview of my work here. For detailed information on UI designs, proper user flows, and research, please feel free to connect.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                    <a 
                      href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you." 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-white/5 text-white font-bold rounded-full border border-white/10 hover:bg-white/10 transition-all text-center"
                    >
                      Let's connect
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* What is Sparrow & The Context Side-by-Side */}
            <section className="section-padding bg-white border-b border-zinc-100">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-0 rounded-[48px] overflow-hidden border border-zinc-100 shadow-2xl">
                  {/* What is Sparrow Column */}
                  <div className="bg-zinc-900 p-6 sm:p-10 md:p-16 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                          <Brain size={24} className="text-accent" />
                        </div>
                        <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-blue-500">What is Sparrow?</span>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black mb-8 tracking-tight leading-tight">
                        A lightweight, <span className="italic-serif font-normal text-accent">AI-powered</span> API platform.
                      </h3>
                      <p className="text-zinc-400 text-xl leading-relaxed mb-10">
                        Sparrow is an open-source API development and testing platform designed as a lightweight and secure alternative to legacy tools. It helps developers build, test, and document APIs with high speed and minimal resource consumption.
                      </p>
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                        <p className="text-lg text-zinc-300 italic leading-relaxed">
                          "I led the design of an intelligent variable management system, exploring how to solve complex technical workflows through human-centered AI."
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* The Context Column */}
                  <div className="bg-white p-6 sm:p-10 md:p-16 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-px bg-accent" />
                      <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">The Context</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight text-zinc-900">
                      Variables are the <span className="italic-serif font-normal text-accent">backbone</span> of scalable API testing.
                    </h2>
                    <div className="space-y-6 text-zinc-600 text-lg font-normal leading-relaxed">
                      <p>
                        Variables are the backbone of scalable API testing workflows. Yet in most API tools, managing them feels like a chore—developers manually extract values from responses, type them into environment files, and pray they don't break their test workflows.
                      </p>
                      <p>
                        At Sparrow, we recognized an opportunity: what if extracting and managing variables could be as effortless as the API calls themselves?
                      </p>
                      <p>
                        In enterprise API testing, developers don't just send single requests; they build complex chains of interactions. A value from one response (like a session token or user ID) must be captured and passed into the next request.
                      </p>
                      <p>
                        Managing these variables manually is a high-friction task that breaks the developer's flow. My goal was to leverage AI to automate this "connective tissue," making the platform feel intelligent and proactive rather than just a passive tool.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Centralized Image Placeholder */}
            <section className="section-padding bg-zinc-50 border-b border-zinc-100">
              <div className="container-wide">
                <div className="max-w-6xl mx-auto rounded-[40px] overflow-hidden shadow-2xl border border-zinc-200 bg-white p-4 md:p-8">
                  <img 
                    src="/image/genetratd_variables_2x.webp" 
                    alt="Sparrow Platform Overview" 
                    className="w-full h-auto rounded-[24px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </section>

            {/* The Problem */}
            <section className="section-padding bg-zinc-900 text-white border-y border-white/10">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center mb-24">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Problem</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      The manual <span className="italic-serif font-normal text-accent">bottleneck.</span>
                    </h2>
                    <div className="space-y-6 text-zinc-400 text-lg mb-10 leading-relaxed">
                      <p>
                        API testing workflows rely on dynamic values. An authentication token from Login returns a user ID. That user ID goes into the next request. Then a session token becomes part of the header. Traditional tools treat this as manual work:
                      </p>
                      <p>
                        Developers faced a critical bottleneck: manual variable management. Every variable required a cycle of copy-pasting, naming, and configuration that added up to significant time loss across a test suite.
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {[
                        { title: "Inconsistent Naming", desc: "Confusing patterns across team members." },
                        { title: "Scope Confusion", desc: "Unclear persistence and availability." },
                        { title: "Debugging Complexity", desc: "Manual scanning for variable sources." },
                        { title: "Team Coordination", desc: "Conflicts in shared environment files." }
                      ].map((prob, i) => (
                        <div key={i} className="flex gap-4 items-start p-4 bg-white/5 rounded-2xl border border-white/10">
                          <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                            <Zap size={14} />
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm">{prob.title}</h4>
                            <p className="text-zinc-500 text-xs">{prob.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-zinc-900 rounded-[32px] md:rounded-[40px] p-6 sm:p-10 md:p-16 text-white shadow-2xl relative overflow-hidden border border-blue-500/20">
                    <div className="absolute top-0 right-0 p-8 opacity-10 text-blue-500">
                      <Layers size={120} />
                    </div>
                    <h4 className="font-bold mb-8 uppercase text-[10px] tracking-[0.3em] text-blue-400">Manual Workflow</h4>
                    <div className="space-y-6 relative z-10">
                      {[
                        "Execute API request",
                        "Identify value in response",
                        "Copy value manually",
                        "Paste into next request",
                        "Type variable name",
                        "Configure scope"
                      ].map((step, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <span className="w-6 h-6 rounded-full border border-blue-500/30 flex items-center justify-center text-[10px] font-mono text-blue-400">{i+1}</span>
                          <p className="text-zinc-300 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                      <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Time Investment</span>
                      <span className="text-xl font-bold text-white">15 mins / suite</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Research Section */}
            <section className="section-padding bg-white">
              <div className="container-wide">
                <div className="max-w-4xl mb-20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-px bg-accent" />
                    <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Research Phase</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    How Developers <span className="italic-serif font-normal text-accent">Extract</span> Variables Today.
                  </h2>
                  <p className="text-zinc-500 text-xl leading-relaxed mb-12">
                    We interviewed 12 API testers across backend, full-stack, and QA roles. Here's what we learned about their current workflows:
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      title: "Workflow 1: The Manual Copier",
                      quote: "I just look at the response, find the value I need, and paste it into the next request's body. Sometimes I write it in the environment file, but honestly, I usually forget.",
                      stats: "Represents ~40% of users. Works for small test suites, fails catastrophically at scale.",
                      icon: <Search className="text-blue-500" />
                    },
                    {
                      title: "Workflow 2: The Script Writer",
                      quote: "I write test scripts in the tool's scripting language to extract values using JSONPath. It works, but I have to learn their syntax and debug scripts when they break.",
                      stats: "Represents ~35% of users. Powerful but high barrier to entry. Discourages casual testers.",
                      icon: <Layers className="text-purple-500" />
                    },
                    {
                      title: "Workflow 3: The Environment Manager",
                      quote: "We have a shared environment file that everyone updates, but we're always stepping on each other's toes. And when we move between dev, staging, and prod, half the variables don't exist in the new environment.",
                      stats: "Represents ~25% of teams. Scales to teams but creates synchronization headaches.",
                      icon: <Shield className="text-green-500" />
                    }
                  ].map((wf, i) => (
                    <div key={i} className="p-10 bg-zinc-100 rounded-[32px] border border-zinc-200 flex flex-col shadow-sm">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-md border border-zinc-100">
                        {wf.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-6 tracking-tight text-zinc-900">{wf.title}</h4>
                      <div className="mb-8 p-6 bg-white rounded-2xl border border-zinc-200 italic text-zinc-600 text-sm leading-relaxed relative shadow-inner">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-zinc-100" />
                        "{wf.quote}"
                      </div>
                      <p className="mt-auto text-xs font-bold text-zinc-500 uppercase tracking-widest leading-loose">
                        {wf.stats}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Insights Section */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                  <div className="max-w-2xl">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Key Insights</span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                      Insights from <span className="italic-serif font-normal text-accent">User Research.</span>
                    </h2>
                  </div>
                  <div className="text-zinc-500 text-lg max-w-sm">
                    Synthesizing raw data into actionable design opportunities for the Sparrow platform.
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[
                    {
                      num: "01",
                      title: "Variable Extraction is Hidden Work",
                      desc: "Developers spend 10-15 minutes per test suite manually mapping response paths to variable names. This shouldn't be visible effort—it's mechanical and error-prone."
                    },
                    {
                      num: "02",
                      title: "Variable Scope Confusion",
                      desc: "Teams argue about where variables live. Should userId be set globally? For one test run? Just one request? With no clear mental model, everyone invents their own system, breaking consistency across the team."
                    },
                    {
                      num: "03",
                      title: "Debugging Variable Dependencies",
                      desc: "When a test fails, developers can't easily see which variables were used, what values they held, or which requests set them. Debugging becomes detective work—tracing through request history manually."
                    }
                  ].map((insight, i) => (
                    <div key={i} className="group flex flex-col md:flex-row gap-8 p-10 bg-white/5 rounded-[32px] border border-white/10 hover:bg-white/10 transition-all duration-500">
                      <div className="text-5xl font-black text-accent/20 group-hover:text-accent transition-colors duration-500 shrink-0">
                        {insight.num}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold mb-4 tracking-tight">{insight.title}</h4>
                        <p className="text-zinc-400 text-lg leading-relaxed max-w-3xl">{insight.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Problem Statement */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="max-w-5xl mx-auto text-center">
                  <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 block">Problem Statement</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-12 leading-relaxed tracking-tight text-zinc-900 italic-serif">
                    - Developers want to extract dynamic values effortlessly—but current tools force a compromise. -
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6 text-left">
                    {[
                      "Manual copy-paste (error-prone, time-consuming, no audit trail)",
                      "Complex syntax learning (JSON path? XPath? Different for each tool)",
                      "Environmental lock-in (switching environments means recreating variables)"
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100 flex gap-4 items-start">
                        <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 mt-1">
                          <Check size={10} />
                        </div>
                        <p className="font-bold text-sm leading-tight text-zinc-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Design Strategy */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="text-center max-w-3xl mx-auto mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Design Strategy</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight">Human-Centered <span className="italic-serif font-normal text-accent">Automation.</span></h2>
                  <p className="text-zinc-400 text-lg">My strategy focused on three pillars to transform the developer experience from manual to magical.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "Zero-Friction", 
                      icon: <Zap size={24} />,
                      desc: "Reduce management from 15 minutes to near-instant automation through proactive AI suggestions." 
                    },
                    { 
                      title: "Visual Clarity", 
                      icon: <Search size={24} />,
                      desc: "Make variable scope and relationships immediately obvious through color-coding and clear badges." 
                    },
                    { 
                      title: "Intelligent Defaults", 
                      icon: <Brain size={24} />,
                      desc: "Use AI to suggest names based on context, but always keep the developer in the driver's seat." 
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-10 bg-white/5 rounded-[32px] border border-white/10 hover:border-accent/30 transition-all group">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 text-accent flex items-center justify-center mb-8 shadow-sm group-hover:bg-accent group-hover:text-white transition-all">
                        {item.icon}
                      </div>
                      <h4 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h4>
                      <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Ideation Section */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="max-w-4xl mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Ideation Phase</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    From "Right-Click" to <span className="italic-serif font-normal text-accent">Smart Extraction.</span>
                  </h2>
                  <p className="text-zinc-600 text-xl leading-relaxed">
                    Initially, we explored a simple solution: right-click a response value, select 'Save as Variable,' name it, done. It worked, but felt mechanical. The breakthrough came from asking: "What if Sparrow AI could suggest variable names and warn about conflicts?"
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      label: "Approach 1",
                      title: "Response Variable Picker",
                      steps: ["Click value", "Inline modal", "Name variable", "Choose scope", "Done"],
                      pros: "Direct, visual, immediate feedback",
                      cons: "Modal fatigue for multiple variables; doesn't suggest names; no conflict detection",
                      icon: <MousePointer2 size={24} />
                    },
                    {
                      label: "Approach 2",
                      title: "Sidebar Variable Dashboard",
                      steps: ["Open panel", "Drag fields", "Batch edit", "Save all"],
                      pros: "Batch operations; clear overview; easy to see all response fields at once",
                      cons: "Takes screen real estate; users might miss it; requires context switching",
                      icon: <Layout size={24} />
                    },
                    {
                      label: "Approach 3",
                      title: "Inline Smart Extraction (Final)",
                      steps: ["Hover value", "AI Suggests", "One-click save", "Live variable"],
                      pros: "Non-intrusive; discovers naturally; smart defaults save time; instant visual feedback",
                      cons: "Hover states on desktop; requires mobile touch adaptation",
                      icon: <Sparkles size={24} />
                    }
                  ].map((approach, i) => (
                    <div key={i} className={`p-10 rounded-[40px] border flex flex-col h-full ${i === 2 ? 'bg-zinc-900 text-white border-zinc-800' : 'bg-zinc-50 border-zinc-100 text-zinc-900'}`}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${i === 2 ? 'bg-accent text-white' : 'bg-white text-accent shadow-sm'}`}>
                        {approach.icon}
                      </div>
                      <div className="mb-6">
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block ${i === 2 ? 'text-zinc-500' : 'text-zinc-400'}`}>{approach.label}</span>
                        <h4 className="text-xl font-bold tracking-tight leading-tight">{approach.title}</h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-10">
                        {approach.steps.map((step, idx) => (
                          <React.Fragment key={idx}>
                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                              i === 2 
                                ? 'bg-white/5 border-white/10 text-zinc-300' 
                                : 'bg-white border-zinc-200 text-zinc-600'
                            }`}>
                              {step}
                            </span>
                            {idx < approach.steps.length - 1 && (
                              <div className={`flex items-center ${i === 2 ? 'text-zinc-700' : 'text-zinc-300'}`}>
                                <ChevronRight size={12} />
                              </div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                      
                      <div className="mt-auto space-y-6">
                        <div>
                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${i === 2 ? 'text-emerald-400' : 'text-emerald-600'}`}>Advantages</p>
                          <p className="text-sm font-medium">{approach.pros}</p>
                        </div>
                        <div>
                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${i === 2 ? 'text-red-400' : 'text-red-600'}`}>Drawbacks</p>
                          <p className="text-sm font-medium">{approach.cons}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Design Evolution Section */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="max-w-4xl mb-20">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Design Evolution</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    Solving Real <span className="italic-serif font-normal text-accent">Complexity.</span>
                  </h2>
                  <p className="text-zinc-400 text-xl leading-relaxed">
                    Approach 3 won because it mirrors GitHub Copilot's philosophy: intelligence appears where and when you need it. But implementing it required solving three critical engineering and UX challenges.
                  </p>
                </div>

                <div className="space-y-8">
                  {[
                    {
                      label: "Challenge 1",
                      title: "Naming Variables Intelligently",
                      problem: "Users face naming paralysis. Is it 'userId', 'user_id', or 'id'?",
                      solution: "AI analyzes the JSON path (e.g., response.user.profile.id → suggests 'userId'). Users can override in one click, but smart defaults reduce friction. Test result: developers accepted AI suggestions 82% of the time.",
                      icon: <Type size={24} />
                    },
                    {
                      label: "Challenge 2",
                      title: "Variable Scope Clarity",
                      problem: "Developers didn't understand the difference between request-scoped and environment-scoped variables.",
                      solution: (
                        <div className="space-y-4">
                          <p>Three-tier visual system:</p>
                          <div className="grid sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-white/5 rounded-2xl border border-purple-500/30">
                              <p className="text-purple-400 font-bold text-xs uppercase tracking-widest mb-1">Request Scope</p>
                              <p className="text-xs text-zinc-400">Available only within this request.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-blue-500/30">
                              <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">Test Flow Scope</p>
                              <p className="text-xs text-zinc-400">Available across requests in current sequence.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-2xl border border-emerald-500/30">
                              <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-1">Environment Scope</p>
                              <p className="text-xs text-zinc-400">Persists across all test runs; exportable.</p>
                            </div>
                          </div>
                        </div>
                      ),
                      icon: <Globe size={24} />
                    },
                    {
                      label: "Challenge 3",
                      title: "Conflict Detection & Collision Warnings",
                      problem: "Teams using shared environment files often had duplicate variable names with different values, breaking tests.",
                      solution: (
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div className="p-4 bg-white/5 rounded-2xl border border-amber-500/30">
                            <p className="text-amber-400 font-bold text-xs uppercase tracking-widest mb-1">Warning</p>
                            <p className="text-xs text-zinc-400">Is this name already used in this environment?</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-red-500/30">
                            <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-1">Error</p>
                            <p className="text-xs text-zinc-400">Would this value conflict with another variable in flow?</p>
                          </div>
                          <div className="p-4 bg-white/5 rounded-2xl border border-blue-500/30">
                            <p className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">Suggestion</p>
                            <p className="text-xs text-zinc-400">Is there a similar variable name already?</p>
                          </div>
                        </div>
                      ),
                      icon: <AlertTriangle size={24} />
                    }
                  ].map((challenge, i) => (
                    <div key={i} className="group p-10 bg-white/5 rounded-[48px] border border-white/10 hover:bg-white/10 transition-all duration-500">
                      <div className="flex flex-col lg:flex-row gap-12">
                        <div className="lg:w-1/3">
                          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-6 shadow-lg shadow-accent/20">
                            {challenge.icon}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2 block">{challenge.label}</span>
                          <h4 className="text-2xl font-bold mb-4 tracking-tight leading-tight">{challenge.title}</h4>
                        </div>
                        <div className="lg:w-2/3 space-y-8">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2">The Problem</p>
                            <p className="text-base md:text-lg text-zinc-300 font-medium leading-relaxed">{challenge.problem}</p>
                          </div>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">The Solution</p>
                            <div className="text-base md:text-lg text-zinc-400 font-medium leading-relaxed">
                              {challenge.solution}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* THE SOLUTION: The Variable Extraction Flow */}
            <section className="section-padding bg-white text-zinc-900 overflow-hidden">
              <div className="container-wide">
                <div className="max-w-4xl mx-auto mb-20 text-center">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">The Solution</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                    The Variable <span className="italic-serif font-normal text-accent">Extraction Flow.</span>
                  </h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {[
                    {
                      step: "Step 1",
                      title: "Hover Detection",
                      desc: "As the cursor hovers over any value in the response JSON, a subtle highlight appears (light blue background) with a small 'Save as Variable' icon button (💾 or checkmark).",
                      insight: "Why this interaction? Hover states don't interrupt; they're discoverable but non-intrusive. First-time users see the affordance naturally.",
                      icon: <MousePointer2 className="text-accent" size={24} />
                    },
                    {
                      step: "Step 2",
                      title: "Smart Extraction Modal",
                      desc: "Click the button. A compact modal appears with AI-suggested names, scope selectors (Request | Test Flow | Environment), and proactive conflict warnings.",
                      insight: "Red banner: 'userId already exists in Environment. This will override it.' Action Buttons: 'Create Variable' (primary) | 'Cancel'",
                      icon: <Layout className="text-accent" size={24} />
                    },
                    {
                      step: "Step 3",
                      title: "Instant Feedback",
                      desc: "After clicking 'Create Variable,' the modal closes with a toast notification. The extracted value now shows with a blue badge: 'userId' to indicate it's tracked.",
                      insight: "A Variables Panel opens on the right (or updates if already visible) showing the new variable instantly.",
                      icon: <Sparkles className="text-accent" size={24} />
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 flex flex-col h-full">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{item.step}</span>
                      <h4 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h4>
                      <p className="text-zinc-600 text-sm leading-relaxed mb-6 flex-grow">{item.desc}</p>
                      <div className="p-4 bg-white rounded-xl border border-zinc-200">
                        <p className="text-xs text-zinc-500 italic leading-relaxed">{item.insight}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Variables Management Panel */}
            <section className="section-padding bg-zinc-900 text-white overflow-hidden">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div>
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Management</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Variables <span className="italic-serif font-normal text-accent">Management Panel.</span>
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed mb-12">
                      A dedicated right sidebar shows all variables in the current context, providing a clear overview and batch operations for power users.
                    </p>
                    
                    <div className="space-y-6">
                      <h4 className="text-lg font-bold text-white">
                        Panel Structure
                      </h4>
                      <ul className="space-y-4 text-sm md:text-base text-zinc-300">
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Scope Filter Tabs:</strong> 'All' | 'Environment' | 'Test Flow' | 'Request'</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Variable List:</strong> Rows showing [Icon] [Name] [Value] [Scope Badge] [Actions]</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Actions per Variable:</strong> Copy Value | Edit | Delete | View Usage (shows which requests use this variable)</span>
                        </li>
                        <li className="flex gap-3">
                          <span className="text-accent">•</span>
                          <span><strong className="text-white">Bulk Operations:</strong> Export as .json | Import from .json | Delete All in Scope</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -inset-4 bg-accent/10 blur-[100px] rounded-full" />
                    <div className="relative z-10 bg-zinc-800 rounded-3xl border border-white/10 p-6 shadow-2xl">
                      <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                        <h5 className="font-bold text-sm tracking-tight">Variables Panel</h5>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-red-500/50" />
                          <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        {[
                          { name: 'userId', val: '12345', scope: 'Env', color: 'text-emerald-400' },
                          { name: 'authToken', val: 'eyJh...', scope: 'Flow', color: 'text-blue-400' },
                          { name: 'orderId', val: 'ord_99', scope: 'Req', color: 'text-purple-400' }
                        ].map((v, i) => (
                          <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-bold">V</div>
                              <div>
                                <p className="text-xs font-bold text-white">{v.name}</p>
                                <p className="text-[10px] text-zinc-500 font-mono">{v.val}</p>
                              </div>
                            </div>
                            <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md bg-white/5 border border-white/10 ${v.color}`}>{v.scope}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testing & Validation */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                  <div className="order-2 lg:order-1">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: "AI Adoption", value: "82%", desc: "Accepted suggestions without editing" },
                        { label: "Comprehension", value: "78%", desc: "Correctly understood scope system" },
                        { label: "Safety", value: "100%", desc: "Conflict warnings prevented failures" },
                        { label: "Efficiency", value: "8x", desc: "Faster than manual extraction" }
                      ].map((stat, i) => (
                        <div key={i} className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100 text-center">
                          <p className="text-4xl font-bold mb-2 tracking-tighter text-accent">{stat.value}</p>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-2">{stat.label}</p>
                          <p className="text-xs text-zinc-600 leading-tight">{stat.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Validation</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight tracking-tight">
                      Internal User <span className="italic-serif font-normal text-accent">Testing.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg leading-relaxed mb-8">
                      We ran unmoderated tests with 8 backend developers using early prototypes. The results confirmed our hypothesis that AI-assisted extraction significantly reduces mental load.
                    </p>
                    <div className="space-y-4">
                      {[
                        "82% of users accepted AI-suggested variable names without editing",
                        "78% correctly understood scope through icon/color system (after brief intro)",
                        "Conflict warnings prevented 3/3 test failure scenarios in simulation",
                        "Time to extract and use 5 variables: 45 seconds (vs. ~6 minutes in manual mode)"
                      ].map((finding, i) => (
                        <div key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-zinc-200">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 mt-1">
                            <Check size={14} />
                          </div>
                          <p className="font-medium text-zinc-700 text-sm leading-relaxed">
                            {finding}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact (Early Feedback) */}
            <section className="section-padding bg-zinc-900 text-white">
              <div className="container-wide">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Impact</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                    Early <span className="italic-serif font-normal text-accent">Feedback.</span>
                  </h2>
                  <p className="text-zinc-400 text-lg">
                    From private beta and internal testing, developers reported:
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      quote: "I can now set up dynamic test flows in minutes instead of 30 minutes manually extracting values.",
                      author: "Backend Engineer",
                      company: "Fintech"
                    },
                    {
                      quote: "The conflict warning saved us from a production incident—we were about to deploy a test using an old token variable.",
                      author: "QA Lead",
                      company: "SaaS Platform"
                    },
                    {
                      quote: "Finally, variables feel like a first-class feature, not an afterthought.",
                      author: "Full-stack Developer",
                      company: "Startup"
                    }
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white/5 rounded-[32px] border border-white/10 relative flex flex-col h-full">
                      <Quote className="text-white/5 w-16 h-16 absolute top-6 right-6" />
                      <p className="text-zinc-300 text-lg leading-relaxed mb-8 relative z-10 flex-grow">"{item.quote}"</p>
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                          {item.author.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{item.author}</p>
                          <p className="text-zinc-500 text-xs uppercase tracking-widest">{item.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Lessons Learned */}
            <section className="section-padding bg-white text-zinc-900">
              <div className="container-wide">
                <div className="max-w-3xl mx-auto text-center mb-16">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Retrospective</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                    Lessons <span className="italic-serif font-normal text-accent">Learned.</span>
                  </h2>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { 
                      title: "Context is Everything", 
                      desc: "Variables don't exist in a vacuum. Success required understanding the entire request lifecycle: where values come from, how they flow through test sequences, and where they can be reused. Designing in isolation failed; designing in context succeeded." 
                    },
                    { 
                      title: "AI Doesn't Replace Clarity—It Enables It", 
                      desc: "Smart suggestions were nice, but visual mental models mattered more. The color-coded scope system and conflict warnings transformed variables from 'technical noise' to 'obvious workflow.'" 
                    },
                    { 
                      title: "Batch Operations Matter", 
                      desc: "We initially designed for single-variable extraction. But teams needed to extract 5-10 variables per request. Batch operations and export/import became critical to avoid modal fatigue." 
                    }
                  ].map((lesson, i) => (
                    <div key={i} className="p-8 bg-zinc-50 rounded-[32px] border border-zinc-100">
                      <span className="text-accent font-bold text-sm mb-4 block">Lesson {i + 1}</span>
                      <h4 className="text-xl font-bold mb-4 tracking-tight">{lesson.title}</h4>
                      <p className="text-zinc-600 leading-relaxed text-sm">{lesson.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Next Steps: Roadmap */}
            <section className="section-padding bg-zinc-50 text-zinc-900 border-t border-zinc-100">
              <div className="container-wide">
                <div className="max-w-3xl mx-auto mb-16 text-center">
                  <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Future Vision</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
                    Next Steps: <span className="italic-serif font-normal text-accent">Roadmap.</span>
                  </h2>
                </div>
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-4">
                    {[
                      { title: "Cross-request variable dependencies", desc: "Visualize a graph showing which variables depend on which requests. Helps teams understand test flow risk." },
                      { title: "Template variables & interpolation", desc: "Support variables that reference other variables (e.g., baseUrl = 'https://api.{{environment}}.com')" },
                      { title: "Encrypted variables", desc: "For secrets (API keys, tokens), offer encryption at rest + audit logs for access" },
                      { title: "Variable type inference", desc: "Auto-detect if a variable is a number, string, date, and suggest transformations (e.g., 'Add 1 day to this date')" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-6 p-6 bg-white rounded-2xl border border-zinc-200 items-start">
                        <div className="w-8 h-8 rounded-full bg-accent/10 text-accent flex items-center justify-center font-bold shrink-0 mt-1">
                          {i + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold mb-2 text-zinc-900">{item.title}</h4>
                          <p className="text-zinc-600 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section className="section-padding bg-white border-t border-zinc-100">
              <div className="container-wide">
                <div className="grid md:grid-cols-2 gap-10 md:gap-16 lg:gap-24">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-accent" />
                      <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-accent">Key Achievements</span>
                    </div>
                    <div className="space-y-4">
                      {[
                        "Non-Intrusive AI Integration",
                        "Intelligent Naming Automation",
                        "Clear Variable Mental Models",
                        "Proactive Conflict Detection",
                        "8x Productivity Improvement"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-zinc-200">
                          <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                            <Check size={14} />
                          </div>
                          <p className="font-bold text-zinc-900 text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-zinc-900" />
                      <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-zinc-900">Skills Demonstrated</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        "Complex Workflow Redesign",
                        "AI/ML Feature Strategy",
                        "Technical User Research",
                        "Enterprise System Design",
                        "Stakeholder Alignment",
                        "Rapid Prototyping"
                      ].map((item, i) => (
                        <div key={i} className="p-4 bg-zinc-900 text-white rounded-2xl flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <p className="text-xs font-bold uppercase tracking-wider">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Closing Thoughts */}
            <section className="section-padding bg-zinc-900 text-white text-center">
              <div className="container-wide max-w-4xl mx-auto">
                <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-4 block">Conclusion</span>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight">
                  Closing <span className="italic-serif font-normal text-accent">Thoughts.</span>
                </h2>
                <div className="space-y-6 text-lg text-zinc-300 leading-relaxed text-left md:text-center">
                  <p>
                    Generate Variables transformed how developers think about dynamic values in API testing. It's not just a feature—it's a philosophical shift: from viewing variables as a burden to viewing them as a natural, intelligent part of the workflow.
                  </p>
                  <p>
                    For teams managing complex API dependencies, handling environment sprawl, or scaling test automation, this module unlocks a level of productivity that wasn't possible before.
                  </p>
                  <p className="text-accent font-medium italic">
                    Coming next: How we built Sparrow's design system from the ground up to scale intelligent automation across the entire product.
                  </p>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <section className="section-padding bg-white text-center">
              <div className="max-w-4xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mx-auto mb-10 shadow-xl shadow-accent/20">
                  <Brain size={40} className="text-white" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-tight tracking-tight text-ink">
                  Interested in the <span className="italic-serif font-normal text-accent">full case study?</span>
                </h2>
                <p className="text-zinc-500 text-lg mb-12 max-w-2xl mx-auto">
                  Due to NDA restrictions, I can only share detailed UI designs, research findings, and user flows in a private conversation.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <a 
                    href="mailto:chourasiyaaman76@gmail.com"
                    className="px-12 py-5 bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full hover:shadow-xl hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-accent/20 text-center relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                    <span className="relative z-10">Lets connect</span>
                  </a>
                  <button 
                    onClick={onClose}
                    className="px-12 py-5 bg-white text-ink font-bold rounded-full border border-ink/10 hover:bg-ink/5 transition-all text-center"
                  >
                    Back to portfolio
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[2000] bg-ink/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </motion.button>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Enlarged view" 
                className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CaseStudy;
