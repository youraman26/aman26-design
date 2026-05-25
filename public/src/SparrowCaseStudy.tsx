import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ExternalLink, AlertTriangle, AlertCircle, Lightbulb, Shield, Zap, CheckCircle2, Sparkles, ZoomIn } from 'lucide-react';
import Lenis from 'lenis';
import CaseStudyContactCard from './CaseStudyContactCard';
import { Project } from './constants';
import { ResponsiveImage } from './components/ResponsiveImage';

const ZoomableImage = ({ src, alt, setZoomedImage, className = "", sizes = "100vw" }: { src: string, alt: string, setZoomedImage: (s: string) => void, className?: string, sizes?: string }) => (
  <div 
    className={`w-full overflow-hidden rounded-2xl md:rounded-3xl border border-gray-200 cursor-zoom-in bg-white transition-opacity duration-200 hover:opacity-95 ${className}`}
    onClick={() => setZoomedImage(src)}
  >
    <ResponsiveImage 
      src={src} 
      alt={alt} 
      sizes={sizes}
      className="w-full h-auto block animate-fade-in" 
    />
  </div>
);

const SparrowCaseStudy = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (zoomedImage) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [zoomedImage]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const lenis = new Lenis({
      wrapper: containerRef.current,
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 5), // Premium quintic ease-out for ultra-buttery inertial scroll stops
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[1000] bg-white overflow-y-auto overflow-x-hidden no-scrollbar font-sans text-ink"
      data-lenis-prevent
    >
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-4 flex items-center justify-between text-ink">
        <span className="text-xs md:text-sm lg:text-base font-semibold text-zinc-900">Case Study: {project.title}</span>
        <button 
          onClick={onClose}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink border border-ink/10 rounded-full hover:bg-ink hover:text-white transition-all duration-300"
        >
          <X size={18} />
          Close
        </button>
      </nav>

      <main className="pb-16 selection:bg-accent/20">
        
        {/* --- HERO SECTION --- */}
        <section className="pt-24 pb-12 px-4 md:px-12 lg:px-24 w-full border-b border-gray-100">
          <div className="max-w-6xl mx-auto w-full">
            <h2 
              className="text-left text-5xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-12 tracking-tight w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.title}
            </h2>
            
            <div className="w-full mb-16">
              <ZoomableImage 
                src="/image/environment_generated_variables_accept_all_2x.webp" 
                alt="Sparrow Generate Variables Feature Overview" 
                sizes="100vw"
                setZoomedImage={setZoomedImage}
              />
            </div>
              
            <div className="space-y-12">
              <div className="py-12 px-0 border-b border-gray-100">
                <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                  Overview
                </h4>
                <div className="text-base md:text-lg text-ink/80 leading-relaxed font-normal">
                  <p className="mb-6">
                    Sparrow is an enterprise API testing platform built for developers who work with complex request chains, dynamic responses, and shared environments. I led the UX and product design for the Generate Variables feature, an AI-assisted workflow that helps developers extract values from API responses, assign names, manage scope, and reuse variables without leaving their flow.
                  </p>
                  <p>
                    The feature shipped in production after a four-week design sprint (preceded by 2 weeks of intensive research) and improved variable management speed by 8x. It transformed a high-friction, error-prone chore into a seamless, trusted workflow with a 90% reduction in setup time and a complete prevention of team conflicts.
                  </p>
                </div>
              </div>

              <div className="py-12 px-0 border-b border-gray-100">
                <div className="flex flex-col gap-8 md:flex-row md:gap-12">
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-ink uppercase tracking-wide mb-4">Team</h4>
                    <p className="text-base text-ink/80 leading-relaxed">1 Product Manager, 1 Design Manager, 1 Designer (myself), 2 Developers, and 1 QA Engineer. (cross-functional team)</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-ink uppercase tracking-wide mb-4">My Role</h4>
                    <p className="text-base text-ink/80 leading-relaxed">I led the end-to-end design of this feature, from discovery through to final delivery. I was actively involved at every stage of the process, collaborating closely with product, engineering, and QA to ensure a seamless and effective outcome.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 text-sm md:text-base">
                <div>
                  <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Role</span>
                  <strong className="font-medium">Product Designer.</strong>
                </div>
                <div>
                  <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Product</span>
                  <strong className="font-medium">Sparrow</strong>
                </div>
                <div>
                  <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Timeline</span>
                  <strong className="font-medium">4 week sprint</strong>
                </div>
                <div>
                  <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Impact</span>
                  <strong className="font-medium">8x Productivity Gain.</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 1. THE PROBLEM --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              The problem
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Manual variable management was slowing down API testing
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
              <p>
                In API testing, one response often becomes the input for the next request. A login response may return a user ID, a token, or a session value that needs to be reused immediately. Before this feature, developers had to manually copy values, name them, decide where they should live, and paste them into environment files or later requests. That process was repetitive, inconsistent, and easy to break. Across a test suite, it added up to 10 to 15 minutes of manual "invisible work" per setup.
              </p>
              <p>
                The problem was not just time. Research showed three deeper systemic issues causing severe friction across teams:
              </p>
              <ul className="list-disc pl-6 space-y-3 mt-4 marker:text-[#DE1C4D]">
                <li><strong>Naming Inconsistency:</strong> Different developers used conflicting patterns (userId vs user_id vs id), breaking team standardization.</li>
                <li><strong>Scope Confusion:</strong> Teams continuously debated where variables lived (local to one request vs global), leading to brittle, broken test sequences.</li>
                <li><strong>Debugging Complexity:</strong> Shared environment conflicts made test failures harder to trace and team coordination nearly impossible. Tracing a bad variable felt like extreme detective work.</li>
              </ul>
            </div>

            <div className="mt-16 w-full">
              <ZoomableImage 
                src="/image/manual_process_flow_2x.webp" 
                alt="Manual process flow" 
                sizes="(max-width: 768px) 100vw, 1200px"
                setZoomedImage={setZoomedImage}
              />
            </div>
          </div>
        </section>

        {/* --- UNDERSTANDING --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-100 w-full animate-fade-in">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Understanding
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Understanding the Developer's Reality
            </h2>
            
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-ink">Uncovering the Setup Bottleneck</h3>
                <p>
                  To design an AI co-pilot that developers would actually adopt, we conducted 1:1 interviews with a range of engineers to understand the friction they experience when configuring test environments. When asked about their current processes for handling imported API collections, the consensus was clear: manual configuration is a massive drain on productivity and morale.
                </p>
              </div>

              {/* --- THE CONVERSATIONS --- */}
              <div className="pt-16 pb-8">
                <h3 className="text-2xl font-bold mb-2 text-[#DE1C4D]">The Conversations</h3>
                <p className="text-base text-ink/70 mb-8 font-normal">1:1 Discussion with the developers as user of the platform that build the foundation of the feature</p>
                
                <div className="space-y-8 mt-8">
                  {/* Left Column: How developers currently handle... */}
                  <div className="bg-white border-2 border-[#ffdfe5] p-8 rounded-3xl">
                    <h4 className="font-medium text-lg mb-6 text-ink">How developers currently handle imported collections</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Left Column Quotes */}
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“When I import a large Swagger file, I have to manually find and replace every base URL and token. It’s repetitive and feels like unnecessary busywork.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Backend Developer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“I sometimes run a find-and-replace on the raw JSON before importing. But it’s risky—one small mistake can break the whole collection.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— DevOps Engineer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“Setting up environment variables takes more time than actually testing the APIs. It completely breaks my flow.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Full-Stack Developer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“It’s easy to miss something like a user ID or auth token in a big payload. You usually only realize it when the API fails.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Lead Backend Engineer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“Doing this manually often leads to duplicate variables and inconsistent naming across workspaces.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— QA Automation Engineer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“I don’t want to spend 20 minutes setting things up. I just want to start testing APIs quickly.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Software Engineer II</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Expectation Quotes */}
                  <div className="bg-white border-2 border-[#ffdfe5] p-8 rounded-3xl">
                    <h4 className="font-medium text-lg mb-6 text-ink">What they expect from an AI solution</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“I don’t want AI making changes without my control. I want speed, but I also want to review everything before it’s applied.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Backend Developer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“AI should only suggest clear things like base URLs, tokens, or user IDs—not turn random values into variables.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— DevOps Engineer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“If AI gets something wrong, I should be able to fix it easily before applying changes. I want full control.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Full-Stack Developer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“Show me what the AI is going to do first. I want to review everything before it updates my workspace.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Lead Backend Engineer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“It would be helpful if AI could detect common patterns like tokens or UUIDs and organize them automatically.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— QA Automation Engineer</span>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-2xl bg-white">
                        <p className="text-sm text-ink/80 italic">“Give me a simple review screen where I can scan suggestions, remove what I don’t need, and apply everything in one click.”</p>
                        <span className="block text-ink font-medium text-xs mt-2">— Software Engineer II</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Removed Designing for Trust section per user request */}
            </div>
          </div>
        </section>

        {/* --- 2. WHAT I LEARNED FROM RESEARCH --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              What I learned from research
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              The feature had to solve workflow friction, not just extraction
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
              <p>
                I conducted 12 contextual inquiry interviews with backend developers, full-stack engineers, and QA testers to understand how variables were actually handled in real workflows. Three distinct workaround patterns emerged:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 pb-8">
                <div className="bg-white p-8 rounded-2xl border border-gray-200">
                  <h5 className="font-semibold text-ink mb-3 text-lg">The Manual Copier (40%)</h5>
                  <p className="text-sm">Pastes values directly into subsequent requests. Extremely brittle and fails catastrophically at scale.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-gray-200">
                  <h5 className="font-semibold text-ink mb-3 text-lg">The Script Writer (35%)</h5>
                  <p className="text-sm">Writes custom JSONPath scripts to extract values. Powerful, but requires high barrier to entry and deep debugging.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl border border-gray-200">
                  <h5 className="font-semibold text-ink mb-3 text-lg">The Env Manager (25%)</h5>
                  <p className="text-sm">Relies on shared configuration files. Scales better, but causes constant team sync issues and data overwrites.</p>
                </div>
              </div>
              <p>
                The strongest insight was trust: <strong>developers absolutely refused to let a "black-box" AI automatically write variables to their workspace without explicit permission.</strong> They wanted the speed of automation, but the final control and visibility of a manual review before anything was committed.
              </p>
            </div>
            
          </div>
        </section>

        {/* --- 3. KEY INSIGHTS --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Key insights
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Three findings shaped the design direction
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed mb-12">
              <p>
                The research pointed to three clear design opportunities. These insights became the foundation for the product direction. The goal was not to automate everything invisibly—the goal was to make dynamic values easier to understand, easier to trust, and drastically faster to reuse:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold text-xl">1</div>
                <h5 className="font-bold text-xl text-ink">Hidden Work</h5>
                <p className="text-base text-ink/70">Variable extraction was an expected but taxing manual chore that should not require repeated effort across large payloads.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold text-xl">2</div>
                <h5 className="font-bold text-xl text-ink">Scope Mental Models</h5>
                <p className="text-base text-ink/70">Developers lacked a shared mental visualization for scope, causing constant friction around request vs. flow vs. environment layers.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center font-bold text-xl">3</div>
                <h5 className="font-bold text-xl text-ink">Traceability Needs</h5>
                <p className="text-base text-ink/70">Debugging required absolute visibility. Users needed to clearly track what was created, from where, and where it was applied.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 4. DESIGN GOALS --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-ink text-white w-full">
          <div className="max-w-6xl mx-auto w-full">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-6">
              Design goals
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-12 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              I defined three clear principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="border border-white/20 p-8 rounded-2xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4">Zero-Friction</h3>
                <p className="text-white/70">One-click extraction placed directly within the user's existing troubleshooting flow, eliminating context switching entirely.</p>
              </div>
              <div className="border border-white/20 p-8 rounded-2xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4">Visually Clear</h3>
                <p className="text-white/70">Simple, instantly recognizable visual systems that transform abstract technical concepts (like scope) into reading intuition.</p>
              </div>
              <div className="border border-white/20 p-8 rounded-2xl bg-white/5">
                <h3 className="text-2xl font-bold mb-4">Intelligent Defaults</h3>
                <p className="text-white/70">AI suggestions that heavily reduce raw effort without ever taking final commit power or control away from the user.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 5. EXPLORING THE SOLUTION (ZIG ZAG) --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-20">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                Exploring the solution
              </h4>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-8">
                I tested three possible interaction models
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                Before landing on the final solution, we designed and user-tested two standard UI approaches. The feedback from developers was sharp and forced a major strategic pivot for how the AI should manifest in the UI.
              </p>
            </div>

            <div className="space-y-32">
              {/* Iteration 1: Text Left, Image Right */}
              <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="inline-block px-4 py-1 bg-ink/5 rounded-full text-sm font-bold uppercase tracking-widest text-ink/60 mb-6 w-fit">Iteration 1</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">The "Full-Tab" Dashboard</h3>
                  <p className="text-lg text-ink/80 mb-6 leading-relaxed">
                    We extracted variables into a comprehensive new workspace tab. Users could select a value, name it, and batch-save it from a dedicated view.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                    <p className="font-bold text-red-900 mb-2">Why it failed:</p>
                    <p className="text-red-800 text-sm italic">"Opening a new tab takes me completely away from my endpoint... it forces a massive context switch, wiping out my active troubleshooting history."</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-gray-100 shadow-md border border-gray-100">
                  <ZoomableImage 
                    src="/image/iterartion_tab_approach_2x.webp" 
                    alt="Full tab dashboard layout" 
                    sizes="(max-width: 768px) 100vw, 600px"
                    setZoomedImage={setZoomedImage}
                  />
                </div>
              </div>

              {/* Iteration 2: Image Left, Text Right */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="inline-block px-4 py-1 bg-ink/5 rounded-full text-sm font-bold uppercase tracking-widest text-ink/60 mb-6 w-fit">Iteration 2</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">The Blocking Modal</h3>
                  <p className="text-lg text-ink/80 mb-6 leading-relaxed">
                    Trying to keep them in context, we used a dark pop-up modal directly over the JSON payload to allow quick extraction without leaving the screen.
                  </p>
                  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
                    <p className="font-bold text-red-900 mb-2">Why it failed:</p>
                    <p className="text-red-800 text-sm italic">"The modal traps me. Since it covers the workspace, I can't compare these suggestions to my existing variables. It causes blind execution."</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-gray-100 shadow-md border border-gray-100">
                  <ZoomableImage 
                    src="/image/iteration_modal_approach_2x.webp" 
                    alt="Blocking Modal Design" 
                    sizes="(max-width: 768px) 100vw, 600px"
                    setZoomedImage={setZoomedImage}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CRAFTING THE DETAILS --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-white border-b border-gray-100 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-16 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                Crafting the Details
              </h4>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-8">
                Solving Core UX Challenges
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                The final interface features a split-view staging area that sits directly alongside the user's existing environment variables, allowing for simultaneous comparison to build absolute trust.
              </p>
            </div>

            <div className="w-full mb-20 max-w-5xl mx-auto">
              <ZoomableImage 
                src="/image/sparrow_anatomy_2x.webp" 
                alt="Anatomy of Sparrow feature" 
                sizes="(max-width: 1024px) 100vw, 1024px"
                setZoomedImage={setZoomedImage}
              />
            </div>

            <div className="max-w-4xl mx-auto flex flex-col gap-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Challenge 1 */}
                <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/30 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-lg font-bold text-[#DE1C4D] group-hover:bg-[#DE1C4D] group-hover:text-white transition-colors duration-300">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-ink">Intelligent Naming</h3>
                  </div>
                  <p className="text-ink/80 text-sm leading-relaxed mb-6">
                    AI analyzes nested JSON structure to offer context-aware camelCase suggestions, drastically reducing naming paralysis.
                  </p>
                  <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
                     <div className="text-xs font-mono bg-black text-white p-2 rounded">id: "usr_98u23u"</div>
                     <div className="text-[#DE1C4D] font-bold text-sm bg-[#DE1C4D]/10 px-3 py-1 rounded-lg">userId</div>
                  </div>
                </div>

                {/* Challenge 2 */}
                <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/30 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-lg font-bold text-[#DE1C4D] group-hover:bg-[#DE1C4D] group-hover:text-white transition-colors duration-300">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-ink">Scope Clarity System</h3>
                  </div>
                  <p className="text-ink/80 text-sm leading-relaxed mb-6">
                    A three-tier color-coded system visualizes scope persistence.
                  </p>
                  <div className="flex gap-3">
                    <span className="text-purple-700 font-bold text-[10px] uppercase tracking-widest bg-purple-100 px-3 py-1.5 rounded-lg">Request</span>
                    <span className="text-blue-700 font-bold text-[10px] uppercase tracking-widest bg-blue-100 px-3 py-1.5 rounded-lg">Flow</span>
                    <span className="text-green-700 font-bold text-[10px] uppercase tracking-widest bg-green-100 px-3 py-1.5 rounded-lg">Env</span>
                  </div>
                </div>

                {/* Challenge 3 */}
                <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/30 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-lg font-bold text-[#DE1C4D] group-hover:bg-[#DE1C4D] group-hover:text-white transition-colors duration-300">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-ink">Conflict Safety Net</h3>
                  </div>
                  <p className="text-ink/80 text-sm leading-relaxed mb-6">
                    Real-time safety net (Warning, Error, Suggestion) intervenes before database commits.
                  </p>
                  <div className="space-y-2">
                    <div className="px-3 py-2 bg-[#fefce8] border border-[#fef08a] rounded-lg text-[#a16207] text-[11px]">Warning: Variable exists</div>
                    <div className="px-3 py-2 bg-[#fef2f2] border border-[#fecaca] rounded-lg text-[#b91c1c] text-[11px]">Error: Hard conflict</div>
                  </div>
                </div>
                
                {/* Challenge 4 */}
                <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 hover:border-[#DE1C4D]/30 group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-lg font-bold text-[#DE1C4D] group-hover:bg-[#DE1C4D] group-hover:text-white transition-colors duration-300">
                      4
                    </div>
                    <h3 className="text-xl font-semibold text-ink">Forgiveness &amp; Traceability</h3>
                  </div>
                  <p className="text-ink/80 text-sm leading-relaxed mb-6">
                    10-second undo buffer reverts misclicks instantly, with "AI Sparkle" icons for permanent audit trails.
                  </p>
                  <div className="p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                     <Sparkles className="text-[#DE1C4D]" size={20} />
                     <span className="text-xs font-medium">AI Generated</span>
                     <span className="ml-auto text-xs font-bold text-[#DE1C4D]">Undo (10s)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- THE COMPLETE USER FLOW (ZIG ZAG) --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-200 w-full">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-20 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                The Complete User Flow
              </h4>
              <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
                Inline smart extraction became the core flow
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed">
                The final choice followed the logic of tools like GitHub Copilot. The intelligence appears exactly where the user already is, instead of asking them to move somewhere else or blocking their screen. 
              </p>
            </div>

            <div className="space-y-32">
              {/* Step 1: Text Left, Image Right */}
              <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#DE1C4D] font-bold text-xl uppercase tracking-widest mb-4">Step 01</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Discover (Hover Detection)</h3>
                  <p className="text-lg text-ink/80 leading-relaxed">
                    The user hovers over any response value. A subtle light blue background highlight appears, along with a small non-intrusive "Save as Variable" (💾) button.
                  </p>
                </div>
                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-white shadow-md border border-gray-200">
                  <ZoomableImage src="/image/step_1_2x.webp" alt="Inline Hover State" sizes="(max-width: 768px) 100vw, 600px" setZoomedImage={setZoomedImage} />
                </div>
              </div>

              {/* Step 2: Image Left, Text Right */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#DE1C4D] font-bold text-xl uppercase tracking-widest mb-4">Step 02</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Stage & Review (Smart Extraction Modal)</h3>
                  <p className="text-lg text-ink/80 leading-relaxed">
                    Clicking the button opens a compact, contextual split-view staging modal. It displays the AI-prefilled Name field, the Scope selector radio buttons, and any applicable conflict warnings.
                  </p>
                </div>
                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-white shadow-md border border-gray-200">
                  <ZoomableImage src="/image/step_2_2x.webp" alt="Review and Staging Interface" sizes="(max-width: 768px) 100vw, 600px" setZoomedImage={setZoomedImage} />
                </div>
              </div>

              {/* Step 3: Text Left, Image Right */}
              <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#DE1C4D] font-bold text-xl uppercase tracking-widest mb-4">Step 03</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Commit</h3>
                  <p className="text-lg text-ink/80 leading-relaxed">
                    Nothing is written to the workspace until the user explicitly clicks the primary "Create Variable" button, keeping the human in the driver's seat.
                  </p>
                </div>
                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-white shadow-md border border-gray-200">
                  <ZoomableImage src="/image/step_3_2x.webp" alt="Commit Action" sizes="(max-width: 768px) 100vw, 600px" setZoomedImage={setZoomedImage} />
                </div>
              </div>

              {/* Step 4: Image Left, Text Right */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-[#DE1C4D] font-bold text-xl uppercase tracking-widest mb-4">Step 04</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Instant Visual Feedback</h3>
                  <p className="text-lg text-ink/80 leading-relaxed">
                    The modal closes, a green toast notification confirms success ("Variable userId created ✓"), and a color-coded scope badge appears inline on the JSON payload. The variable instantly populates in the dedicated Variables Management sidebar on the right.
                  </p>
                  
                  {/* Keeping the 10-Second Undo Buffer as a neat contextual tip box here since it fits well with feedback/completion */}
                  <div className="mt-8 p-6 bg-accent/10 border border-accent/20 rounded-xl">
                    <p className="font-bold text-accent mb-2">The 10-Second Undo Buffer</p>
                    <p className="text-sm text-ink/80">Because developers move fast, mistakes happen. Rejected or improperly saved variables remain in a muted visual state for 10 seconds, allowing for instant, seamless reversal of accidental misclicks.</p>
                  </div>
                </div>
                <div className="w-full md:w-1/2 rounded-3xl overflow-hidden bg-white shadow-md border border-gray-200">
                  <ZoomableImage src="/image/step_4_2x.webp" alt="Confirmation and Badge UI" sizes="(max-width: 768px) 100vw, 600px" setZoomedImage={setZoomedImage} />
                </div>
              </div>
            </div>
          </div>
        </section>

           {/* --- 10. VARIABLES MANAGEMENT PANEL --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 border-t border-gray-100 w-full bg-white">
          <div className="max-w-6xl mx-auto w-full">
            <div className="mb-16 text-left">
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                Variables management panel
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                A dedicated panel made reuse easy and controllable
              </h2>
              <p className="text-base md:text-lg text-ink/80 leading-relaxed max-w-3xl">
                I designed an omnipresent right-hand management panel to give users a high-level, clear view of all variables active in their current context. It drastically elevated variables from hidden config files into an interactive dashboard.
              </p>
            </div>

            <div className="w-full mb-12 max-w-5xl mx-auto">
               <ZoomableImage src="/image/variable_management_2x.webp" alt="Right sidebar variables management panel UI" sizes="(max-width: 1024px) 100vw, 1024px" setZoomedImage={setZoomedImage} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-ink/80 leading-relaxed">
               <p>
                 The panel included color-coded scope filters, interactive variable rows, quick copy and edit actions, usage tracking metrics, and heavy bulk operations (export, import, delete by scope). This was a critical addition because real-world teams do not extract one variable at a time—they extract 5 to 10 from massive payloads.
               </p>
               <p>
                 This completely eradicated "modal fatigue" and made variables feel like a powerful, native entity within the system, allowing users to deeply audit, trace, and organize their environment states continuously without losing their testing context.
               </p>
            </div>
          </div>
        </section>

        {/* --- 11 & 12. VALIDATION AND IMPACT --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-ink text-white w-full">
          <div className="max-w-6xl mx-auto w-full space-y-32">
            
            {/* Validation */}
            <div>
              <h4 className="text-[18px] font-bold text-accent uppercase tracking-wide mb-6">
                Validation
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                The design was tested with real developers
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10">
                I validated the feature strictly with 8 diverse backend developers using aggressive early prototypes. The results validated the "human-in-the-loop" strategy perfectly across speed, comprehension, and structural safety margins.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">8x</span>
                  <p className="font-medium text-lg">Speed Improvement</p>
                  <p className="text-sm text-white/50 mt-1">Setup dropped from 6m to 45s.</p>
                </div>
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">82%</span>
                  <p className="font-medium text-lg">AI Adoption</p>
                  <p className="text-sm text-white/50 mt-1">Accepted exact AI naming logic.</p>
                </div>
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">78%</span>
                  <p className="font-medium text-lg">Scope Clarity</p>
                  <p className="text-sm text-white/50 mt-1">Understood visual hierarchy.</p>
                </div>
                <div className="border border-white/20 p-6 rounded-2xl bg-white/5">
                  <span className="block text-4xl font-bold text-accent mb-2">100%</span>
                  <p className="font-medium text-lg">Collision Blocked</p>
                  <p className="text-sm text-white/50 mt-1">Zero failures executed.</p>
                </div>
              </div>
            </div>

            {/* Impact */}
            <div>
              <h4 className="text-[18px] font-bold text-accent uppercase tracking-wide mb-6">
                Impact
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                The feature changed how developers handled dynamic values
              </h2>
              <p className="text-base md:text-lg text-white/70 leading-relaxed mb-10">
                The final outcome was not just faster extraction. It changed the very way developers conceptualized variable mapping inside complex API chains. Instead of a horrific manual data-entry chore, the workflow transformed into a guided, highly trustworthy product experience.
              </p>

              <div className="space-y-6">
                <div className="bg-white/10 border-l-4 border-accent p-8 rounded-r-2xl">
                  <p className="italic text-white/80 font-medium mb-4 text-lg">"The conflict warning completely saved us from a production incident—we were about to accidentally deploy a test suite utilizing a deprecated token variable!"</p>
                  <p className="text-sm font-bold tracking-widest uppercase text-white/50">— QA Lead</p>
                </div>
                
                <div className="bg-white/10 border-l-4 border-accent p-8 rounded-r-2xl">
                  <p className="italic text-white/80 font-medium mb-4 text-lg">"It is so remarkably fast. Finally, managing variables feels like an actual first-class citizen feature, not a taped-on afterthought."</p>
                  <p className="text-sm font-bold tracking-widest uppercase text-white/50">— Full-Stack Engineer</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* --- 13 & 14. LESSONS AND ROADMAP --- */}
        <section className="py-24 px-4 md:px-12 lg:px-24 border-t border-gray-100 bg-white w-full">
          <div className="max-w-6xl mx-auto w-full space-y-32">
            
            {/* Lessons */}
            <div>
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                What I learned
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Context and clarity mattered more than pure automation
              </h2>
              <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
                <p>
                  This monumental sprint reinforced harsh product truths. Complex workflow features simply cannot be designed in total isolation, because variables only exist to construct the full lifecycle of a chain. Designing in context succeeded; designing in pop-ups failed.
                </p>
                <p>
                  Additionally, AI serves to enhance clarity, never replace it. The smart suggestion engine was incredible, but the visual mental models (the colors, bindings, hierarchies) were what actually built the underlying trust for the user. <strong>Trust is fundamentally a product requirement, not an extra layer.</strong>
                </p>
              </div>
            </div>

            {/* Roadmap */}
            <div>
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-wide mb-6">
                Next steps
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                The design opened room for deeper workflow support
              </h2>
              <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6 mb-10">
                <p>
                  Building rapidly off this specific success infrastructure, the architectural choices paved the way for upcoming features dedicated to tracing logic.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
                   <h6 className="font-bold text-lg mb-2">Dependency Graphs</h6>
                   <p className="text-sm text-ink/60">Cross-request visualization tracking risk surfaces.</p>
                 </div>
                 <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
                   <h6 className="font-bold text-lg mb-2">Encrypted Variables</h6>
                   <p className="text-sm text-ink/60">Secure key handling paired directly with audit logs.</p>
                 </div>
                 <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
                   <h6 className="font-bold text-lg mb-2">Template Interpolation</h6>
                   <p className="text-sm text-ink/60">E.g., constructing `https://api.{"{\{environment}\}"}.com` securely.</p>
                 </div>
                 <div className="p-8 bg-gray-50 border border-gray-200 rounded-2xl">
                   <h6 className="font-bold text-lg mb-2">Auto-Type Inference</h6>
                   <p className="text-sm text-ink/60">Recognizing dates, strings, metrics structurally.</p>
                 </div>
              </div>
            </div>

          </div>
        </section>

        <CaseStudyContactCard />

        <AnimatePresence>
          {zoomedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[2000] bg-white/98 flex flex-col overflow-hidden"
              onClick={() => setZoomedImage(null)}
            >
              <div className="absolute top-6 right-6 flex items-center gap-4 z-50">
                <div className="hidden md:flex flex-col items-end mr-4">
                  <span className="text-sm font-medium text-ink/60">Click to {scale === 1 ? 'Zoom In' : 'Zoom Out'}</span>
                  <span className="text-xs text-ink/40">Drag to pan while zoomed</span>
                </div>
                <button 
                  className="p-4 bg-ink/5 hover:bg-[#DE1C4D] hover:text-white rounded-full transition-all duration-300 shadow-sm cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImage(null);
                  }}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <motion.div 
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  drag={scale > 1}
                  dragConstraints={{ left: -1000, right: 1000, top: -1000, bottom: 1000 }}
                  dragElastic={0.1}
                  animate={{ 
                    scale: scale,
                    x: scale === 1 ? 0 : undefined,
                    y: scale === 1 ? 0 : undefined
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative origin-center"
                  onClick={() => {
                    if (scale > 1) {
                      setScale(1);
                    } else {
                      setScale(2.5);
                    }
                  }}
                >
                  <ResponsiveImage 
                    src={zoomedImage} 
                    alt="Zoomed View" 
                    sizes="95vw"
                    className="max-w-[90vw] max-h-[85vh] object-contain shadow-2xl rounded-xl border border-gray-100 pointer-events-none select-none"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </motion.div>
  );
};

export default SparrowCaseStudy;
