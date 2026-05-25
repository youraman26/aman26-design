import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import Lenis from 'lenis';
import CaseStudyContactCard from './CaseStudyContactCard';
import { Project } from './constants';
import { ResponsiveImage } from './components/ResponsiveImage';

const TechBayLeafCaseStudy = ({ project, onClose }: { project: Project, onClose: () => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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
        
        {/* HERO SECTION */}
        <section className="pt-24 pb-10 px-4 md:px-12 lg:px-24 w-full max-w-[1200px] mx-auto">
          <h2 
            className="text-left text-5xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-12 tracking-tight w-full"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.title}
          </h2>
        </section>
        
        <div className="w-full h-auto mb-20 overflow-hidden shadow-sm max-w-[1200px] mx-auto rounded-3xl">
          <ResponsiveImage 
            src="/image/top_mockup_2x.webp" 
            alt="B2B Website Redesign Top Mockup" 
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority={true}
            className="w-full h-auto object-cover block" 
          />
        </div>
          
        <section className="py-12 px-4 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* OVERVIEW */}
            <div>
              <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
                Overview
              </h4>
              <div className="text-base md:text-lg text-ink/80 leading-relaxed font-normal space-y-6">
                <p>
                  Tech Bay Leaf is a Mumbai-based digital marketing agency with 10+ years of experience, 50+ clients, and over $20M in ad spend managed across global markets. Despite strong business performance, the website did not reflect this credibility. It lacked clear service structure, visible proof, and a defined path for users to understand the offering or take action.
                </p>
                <p>
                  I led the UX/UI redesign over an 8–10 week timeline, transforming the website into a 15+ page conversion-focused system. The new experience is designed to build trust within seconds, help users quickly identify relevant services, and guide them smoothly from exploration to action.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-gray-100 text-sm md:text-base">
              <div>
                <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Role</span>
                <strong className="font-medium">Product Designer (UX/UI)</strong>
              </div>
              <div>
                <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Product</span>
                <strong className="font-medium">Tech Bay Leaf Website</strong>
              </div>
              <div>
                <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Timeline</span>
                <strong className="font-medium">8–10 Week Redesign</strong>
              </div>
              <div>
                <span className="block text-ink/50 uppercase tracking-wider text-xs font-semibold mb-2">Impact</span>
                <strong className="font-medium">3× CTA Coverage</strong>
              </div>
            </div>
          </div>
        </section>

        {/* THE BRIEF */}
        <section className="py-24 px-4 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              The Brief
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Redesign the website, but solve the real problem
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
              <p>
                At the start, the ask was simple: redesign the website. But once I evaluated the current experience, the real issue became clear.
              </p>
              <div className="grid md:grid-cols-2 gap-8 my-8">
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <h5 className="font-semibold text-ink mb-3">The agency had everything:</h5>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Proven results</li>
                    <li>Real clients</li>
                    <li>Recognized certifications</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-2xl">
                  <h5 className="font-semibold text-ink mb-3">But the website:</h5>
                  <ul className="list-disc pl-6 space-y-2 text-red-900">
                    <li>Did not communicate scale</li>
                    <li>Did not guide users</li>
                    <li>Did not convert</li>
                  </ul>
                </div>
              </div>
              <div className="mt-12">
                <h3 className="text-2xl font-semibold text-ink mb-4">What client says about it :</h3>
                <p>
                  The business was growing through referrals and relationships. That worked, but it also meant the website was not contributing to inbound growth. In many cases, it was probably doing the opposite. Visitors were landing, getting confused, and leaving before building enough confidence to enquire.
                </p>
              </div>
              
              <h3 className="text-2xl font-semibold text-ink mt-16 mb-8">Key Questions That I Asked Before Starting :</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl border border-gray-200">
                  <h6 className="text-sm font-medium text-ink mb-2 leading-snug">What is the primary goal of redesigning the website?</h6>
                  <p className="text-xs text-ink/80">The goal was to turn the website into a working sales touchpoint. It needed to communicate value clearly, establish credibility quickly, and guide users toward starting a conversation.</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-200">
                  <h6 className="text-sm font-medium text-ink mb-2 leading-snug">Why was a redesign needed?</h6>
                  <p className="text-xs text-ink/80">There was a clear gap between the agency’s actual capability and how it was perceived online. The website lacked structure, did not highlight real outcomes, and gave users no clear next step. As a result, it was not contributing to inbound growth.</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-200">
                  <h6 className="text-sm font-medium text-ink mb-2 leading-snug">What are the brand’s mission, vision, and goals?</h6>
                  <p className="text-xs text-ink/80">The agency’s mission is to help brands grow through performance-led marketing. Its vision is to become a long-term partner for scaling businesses. From a product perspective, this translated into three clear goals for the website. Increase inbound leads, build trust quickly for new visitors, and clearly communicate services along with outcomes.</p>
                </div>
                <div className="p-6 rounded-2xl border border-gray-200">
                  <h6 className="text-sm font-medium text-ink mb-2 leading-snug">What would a user do after landing on the website?</h6>
                  <p className="text-xs text-ink/80">A user does not explore randomly. They try to make a decision quickly. First, they check whether the agency looks credible. Then they look for a service that matches their need. After that, they validate through past work or case studies. If they find enough confidence, they take action. If not, they leave.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 p-8 bg-transparent rounded-2xl border border-[#DE1C4D] flex flex-col gap-2">
              <p className="font-sans font-medium text-sm text-ink/80">
                So the brief shifted from a website redesign to something more valuable:
              </p>
              <p className="text-[#DE1C4D] text-base md:text-lg font-semibold">
                Create a digital system that can turn a curious visitor into a warm lead without needing a sales call.
              </p>
            </div>
          </div>
        </section>

        {/* UNDERSTANDING THE BUSINESS */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-100 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Understanding the Business
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Before design, understand what the business actually do
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
              <p>
                Tech Bay Leaf is not a generalist agency. It operates across five distinct service areas, each with its own purpose, metrics, and client expectations. Each service solves a different kind of problem for a business.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
                  <h5 className="font-semibold text-ink">Ad Operations</h5>
                  <p className="text-sm flex-1">Campaign execution across platforms, focused on performance and scale</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Multi-Platform Execution</span>
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Performance Scaling</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
                  <h5 className="font-semibold text-ink">Paid Creatives</h5>
                  <p className="text-sm flex-1">Creative and strategy driven by CTR, conversion, and funnel efficiency</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Conversion-Focused</span>
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Creative Optimization</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
                  <h5 className="font-semibold text-ink">Email Automation + CRM</h5>
                  <p className="text-sm flex-1">Lifecycle systems focused on retention and revenue</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Lifecycle Automation</span>
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Revenue Retention</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
                  <h5 className="font-semibold text-ink">Lifecycle Retention</h5>
                  <p className="text-sm flex-1">Improving long-term customer value</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Customer Engagement</span>
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">LTV Growth</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 md:col-span-2 flex flex-col gap-4">
                  <h5 className="font-semibold text-ink">Managed Services</h5>
                  <p className="text-sm flex-1">Full outsourced marketing with structured onboarding</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">End-to-End Marketing</span>
                    <span className="border border-[#DE1C4D] text-[#DE1C4D] px-2 py-1 rounded text-xs">Structured Onboarding</span>
                  </div>
                </div>
              </div>
              
              <p>
                The issue was not that these services were unclear internally. The issue was that the website did not help a user connect their problem to the right service.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>What each service does?</li>
                <li>How they are different?</li>
                <li>Which one fits their need?</li>
              </ul>
              
              <div className="mt-12">
                <p className="font-semibold text-xl italic text-[#DE1C4D] mb-4">"A visitor had to read through everything to understand anything".</p>
                <p>That alone was enough to slow down decisions or stop them completely. I needed to make the structure do the heavy lifting, so users could quickly connect their own problem to the right service, without reading the entire site.</p>
              </div>
            </div>
          </div>
        </section>

      {/* THE BUSINESS PROBLEM */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-[#1A1A1A] text-white w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              THE BUSINESS PROBLEM
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Three missing systems that directly affected conversion
            </h2>
            <div className="text-base md:text-lg text-white/80 leading-relaxed space-y-6">
              <p>When I broke down the experience, the issues were not visual. They were tructural gaps affecting conversions :</p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="font-semibold text-xl text-white mb-2">1. No clear service architecture</h5>
                  <p className="text-sm text-white/70">Services were present but not structured. Everything felt similar, making it difficult to identify relevance.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="font-semibold text-xl text-white mb-2">2. Lack of conversion logic</h5>
                  <p className="text-sm text-white/70">There was no guided journey. Users were not told what to do next, even when interested.</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h5 className="font-semibold text-xl text-white mb-2">3. Invisible credibility system</h5>
                  <p className="text-sm text-white/70">Proof existed but was not surfaced early. Trust was delayed instead of immediate.</p>
                </div>
              </div>
              
              <div className="mt-12 p-8 border border-[#DE1C4D]/30 bg-transparent rounded-2xl flex flex-col gap-2">
                <p className="font-sans font-medium text-sm text-white/80">
                  This created a very specific problem:
                </p>
                <p className="text-[#DE1C4D] text-base md:text-lg font-semibold">
                  Users were not rejecting the agency. They were leaving before forming enough confidence to engage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* UNDERSTANDING THE USERS */}
        <section className="py-24 px-4 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Understanding the Users
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Defined two user types, two different decision modes
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
              <p>Instead of jumping into solutions, I focused on how users behave when they land on a website. Looking at behavior instead of assumptions. I did not want to treat the site like it had one audience. It had two very different ones.</p>
              
              <div className="mt-16 space-y-16">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-ink border-b pb-4">Decision Maker</h3>
                  <p><strong>Why ?</strong><br/>This user is not browsing casually. They are evaluating risk. They want to quickly understand if the agency can solve their problem and whether it is worth starting a conversation. Their decision depends heavily on early trust signals and proof of results. This user usually lands with intent.</p>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border border-gray-200 rounded-2xl">
                      <strong className="block mb-3 text-ink text-sm">They are either:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-ink/80">
                        <li>A founder looking to scale</li>
                        <li>A marketing lead evaluating agencies</li>
                        <li>Someone comparing multiple options</li>
                      </ul>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-2xl">
                      <strong className="block mb-3 text-ink text-sm">How they behave:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-ink/80">
                        <li>Scans quickly, does not read everything</li>
                        <li>Looks for proof before claims</li>
                        <li>Tries to identify relevance fast</li>
                      </ul>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-2xl">
                      <strong className="block mb-3 text-ink text-sm">What they are thinking:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-ink/80">
                        <li>“Can this agency solve my problem?”</li>
                        <li>“Have they done this before?”</li>
                        <li>“Can I trust them with my budget?”</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-6 mt-6 border border-[#DE1C4D] p-6 rounded-2xl bg-transparent">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-ink">Mindset :</span>
                      <span className="text-base text-[#DE1C4D]">“I need to know if this agency is worth my time and budget.”</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-ink">Critical moment :</span>
                      <span className="text-base text-[#DE1C4D]">If trust is not built in the first few seconds, they leave.</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-ink border-b pb-4">Job Seeker</h3>
                  <p><strong>Why ?</strong><br/>This user is not just looking for roles. They are trying to understand the company. They want to know what the culture is like, how the team operates, and whether they see themselves working there. Their engagement depends on emotional connection before opportunity. This user is exploring, but with intent.</p>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 border border-gray-200 rounded-2xl">
                      <strong className="block mb-3 text-ink text-sm">They are evaluating:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-ink/80">
                        <li>Culture</li>
                        <li>Growth</li>
                        <li>Work environment</li>
                      </ul>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-2xl">
                      <strong className="block mb-3 text-ink text-sm">How they behave:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-ink/80">
                        <li>Looks for company story first</li>
                        <li>Then explores roles</li>
                        <li>Then evaluates application flow</li>
                      </ul>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-2xl">
                      <strong className="block mb-3 text-ink text-sm">What they are thinking:</strong>
                      <ul className="list-disc pl-4 space-y-1 text-sm text-ink/80">
                        <li>“What kind of company is this?”</li>
                        <li>“Will I fit here?”</li>
                        <li>“Is this worth applying to?”</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6 mt-6 border border-[#DE1C4D] p-6 rounded-2xl bg-transparent">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-ink">Mindset :</span>
                      <span className="text-base text-[#DE1C4D]">“I want to know if this is a place I want to work at.”</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-ink">Critical moment :</span>
                      <span className="text-base text-[#DE1C4D]">If they don’t feel connected, they don’t apply.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REFRAMING THE PROBLEM */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-100 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              REFRAMING THE PROBLEM
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Designing for how decisions actually happen
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
              <p>I reframed the problem in a more useful way.</p>
              <div className="flex flex-col gap-4 my-8">
                <div className="bg-transparent border border-gray-200 p-6 rounded-2xl flex flex-col gap-2">
                  <span className="font-medium text-sm text-ink/80">The real question was not:</span>
                  <span className="text-base text-ink">How do we make the website look better?</span>
                </div>
                <div className="bg-transparent border border-[#DE1C4D] p-6 rounded-2xl flex flex-col gap-2">
                  <span className="font-medium text-sm text-ink/80">The real question was:</span>
                  <span className="text-[#DE1C4D] text-base md:text-lg font-semibold">How do we help a first-time visitor understand the offering, trust the agency, and decide to reach out without relying on external validation?</span>
                </div>
              </div>
              <p>That one shift changed the design direction completely. This led to four clear principles:</p>
              
              <div className="grid sm:grid-cols-2 gap-6 mt-12">
                <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col h-full">
                  <h5 className="font-bold text-ink mb-3">Trust is Immediate :</h5>
                  <p className="text-sm text-ink/80 mb-6">Users form an opinion within the first few seconds. If credibility is not visible immediately, they do not continue.</p>
                  <p className="text-sm font-medium border border-[#DE1C4D] bg-transparent px-4 py-3 rounded-xl text-[#DE1C4D] mt-auto"><span className="font-normal">Approach :</span> Lead with metrics & logos.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col h-full">
                  <h5 className="font-bold text-ink mb-3">Quick Identification :</h5>
                  <p className="text-sm text-ink/80 mb-6">Users do not want to read through all services. They want to quickly identify what is relevant to them.</p>
                  <p className="text-sm font-medium border border-[#DE1C4D] bg-transparent px-4 py-3 rounded-xl text-[#DE1C4D] mt-auto"><span className="font-normal">Approach :</span> Build structured architecture.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col h-full">
                  <h5 className="font-bold text-ink mb-3">Proof Drives Decisions :</h5>
                  <p className="text-sm text-ink/80 mb-6">Users rely heavily on proof. Case studies, results, and recognizable clients influence their decisions more than descriptive text.</p>
                  <p className="text-sm font-medium border border-[#DE1C4D] bg-transparent px-4 py-3 rounded-xl text-[#DE1C4D] mt-auto"><span className="font-normal">Approach :</span> Proof embedded everywhere.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-gray-200 flex flex-col h-full">
                  <h5 className="font-bold text-ink mb-3">Need Guided Direction :</h5>
                  <p className="text-sm text-ink/80 mb-6">Users need direction. If the next step is not obvious, they drop off.</p>
                  <p className="text-sm font-medium border border-[#DE1C4D] bg-transparent px-4 py-3 rounded-xl text-[#DE1C4D] mt-auto"><span className="font-normal">Approach :</span> Guided journey + CTAs.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USER FLOW */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-100 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              User Flow
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Two visitors. One website.
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed mb-16">
              <p>Two primary visitor types with distinct intent, different entry points, different conversion goals. No dead ends; every page carried a persistent "Talk to our expert" CTA.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-ink mb-6 tracking-wide">THE DECISION MAKER</h3>
                
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">01</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Lands on homepage</strong>
                    <p className="text-sm text-ink/70 mt-1">Sees $20M+ and client logos. Credibility in 5 seconds.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">02</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Navigates to service page</strong>
                    <p className="text-sm text-ink/70 mt-1">Finds the service relevant to their business need.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">03</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Reads case studies</strong>
                    <p className="text-sm text-ink/70 mt-1">Sees proof of results in their industry.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">04</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Checks About page</strong>
                    <p className="text-sm text-ink/70 mt-1">Validates the team, offices, and company story.</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-6 pt-4 border-t border-ink">
                  <div className="text-[#DE1C4D] font-mono text-sm shrink-0 pt-0.5">✓</div>
                  <div>
                    <strong className="block text-[#DE1C4D] text-sm md:text-base font-medium">Requests a proposal</strong>
                    <p className="text-sm text-[#DE1C4D]/80 mt-1">Converts via "Talk to our expert" CTA.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-ink mb-6 tracking-wide">THE JOB SEEKER</h3>
                
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">01</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Lands on homepage</strong>
                    <p className="text-sm text-ink/70 mt-1">Sees agency brand and culture signals.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">02</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Goes to Careers page</strong>
                    <p className="text-sm text-ink/70 mt-1">Reads values and benefits before listings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">03</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Browses open roles</strong>
                    <p className="text-sm text-ink/70 mt-1">Filtered by department.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-ink/40 font-mono text-sm shrink-0 pt-0.5">04</div>
                  <div>
                    <strong className="block text-ink text-sm md:text-base font-medium">Clicks a role</strong>
                    <p className="text-sm text-ink/70 mt-1">Clean job detail with requirements.</p>
                  </div>
                </div>
                <div className="flex gap-4 mt-6 pt-4 border-t border-ink">
                  <div className="text-[#DE1C4D] font-mono text-sm shrink-0 pt-0.5">✓</div>
                  <div>
                    <strong className="block text-[#DE1C4D] text-sm md:text-base font-medium">Completes application</strong>
                    <p className="text-sm text-[#DE1C4D]/80 mt-1">Multi-step form with resume + portfolio upload.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-[1200px] mx-auto mt-16 overflow-hidden rounded-3xl">
            <ResponsiveImage 
              src="/image/common_user_flow_2x.webp" 
              alt="User Flow" 
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full h-auto object-cover block" 
            />
          </div>
        </section>

        {/* INFORMATION ARCHITECTURE */}
        <section className="py-24 px-4 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Information Architecture
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              15 pages. One structure, repeated with intent
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6 mb-12">
              <p>That pattern shows up across the whole system. It helps users know where they are, what they are reading, why they should believe it, and what to do next.</p>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-xs font-bold uppercase text-ink/50 tracking-wider">8 sections</span>
                  <h5 className="font-bold text-lg text-ink mt-2 mb-3">Homepage</h5>
                  <p className="text-sm text-ink/70">Intro · Our Work · Scale CTA · Clients · Testimonials · Certifications · Blog · Footer</p>
                </div>
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-xs font-bold uppercase text-ink/50 tracking-wider">8 sections × 5</span>
                  <h5 className="font-bold text-lg text-ink mt-2 mb-3">Service Pages</h5>
                  <p className="text-sm text-ink/70">Hero · Services · Case Studies · Clients · Testimonials · Certifications · Blog · Footer</p>
                </div>
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-xs font-bold uppercase text-ink/50 tracking-wider">7 sections</span>
                  <h5 className="font-bold text-lg text-ink mt-2 mb-3">About Us</h5>
                  <p className="text-sm text-ink/70">Hero · Who we are · Why us · Clients · Offices · Team · Footer</p>
                </div>
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-xs font-bold uppercase text-ink/50 tracking-wider">6 sections</span>
                  <h5 className="font-bold text-lg text-ink mt-2 mb-3">Careers</h5>
                  <p className="text-sm text-ink/70">Hero · Team values · Benefits · Current openings · Who we are · CTA · Footer</p>
                </div>
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-xs font-bold uppercase text-ink/50 tracking-wider">7 sections</span>
                  <h5 className="font-bold text-lg text-ink mt-2 mb-3">Case Study Single</h5>
                  <p className="text-sm text-ink/70">Hero · Intro · What we did · How we did it · Value provided · Related cases · Footer</p>
                </div>
                <div className="p-6 bg-gray-50 border border-gray-100 rounded-2xl">
                  <span className="text-xs font-bold uppercase text-ink/50 tracking-wider">6 sections</span>
                  <h5 className="font-bold text-lg text-ink mt-2 mb-3">Blog System</h5>
                  <p className="text-sm text-ink/70">Blog listing · Categories · Featured · Single post · Related posts · Footer</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-[1200px] mx-auto mt-16 overflow-hidden rounded-3xl">
            <ResponsiveImage 
              src="/image/information_architecture_2x.webp" 
              alt="Information Architecture" 
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full h-auto object-cover block" 
            />
          </div>
        </section>

        {/* KEY DESIGN DECISIONS */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-100 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              KEY DESIGN DECISIONS
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-12 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Decisions that directly impacted conversion
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-gray-200 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DE1C4D]/10 shrink-0 flex items-center justify-center text-base font-bold text-[#DE1C4D]">1</div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-1">Leading with metrics ($20M+)</h3>
                  <p className="text-ink/70 text-sm">Removes doubt instantly → Trust in first 5 seconds</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-200 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DE1C4D]/10 shrink-0 flex items-center justify-center text-base font-bold text-[#DE1C4D]">2</div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-1">Consistent service page structure</h3>
                  <p className="text-ink/70 text-sm">No relearning required → Faster comparison and clarity</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-200 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DE1C4D]/10 shrink-0 flex items-center justify-center text-base font-bold text-[#DE1C4D]">3</div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-1">Visible onboarding (Managed Services)</h3>
                  <p className="text-ink/70 text-sm">Shows how process works → Reduces hesitation</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-200 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DE1C4D]/10 shrink-0 flex items-center justify-center text-base font-bold text-[#DE1C4D]">4</div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-1">Case studies as sales tools</h3>
                  <p className="text-ink/70 text-sm">Structured like real conversations → Improves decision confidence</p>
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-gray-200 md:col-span-2 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#DE1C4D]/10 shrink-0 flex items-center justify-center text-base font-bold text-[#DE1C4D]">5</div>
                <div>
                  <h3 className="text-base font-semibold text-ink mb-1">Social proof as a system</h3>
                  <p className="text-ink/70 text-sm">Present across pages, not isolated → Continuous trust building</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WIREFRAME */}
        <section className="py-24 px-4 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Wireframe
            </h4>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed mb-12">
              <p>The majority of time was spent on structure rather than visuals. Low-fidelity wireframes were used to define layout and hierarchy. Multiple variations were explored, answering one question: Does the structure make it easy for users to understand and move forward?</p>
            </div>
          </div>
          
          <div className="max-w-[1200px] mx-auto mt-16 overflow-hidden rounded-3xl">
            <ResponsiveImage 
              src="/image/wireframe_2x.webp" 
              alt="Wireframe" 
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="w-full h-auto object-cover block" 
            />
          </div>
        </section>

        {/* FINAL DESIGNS */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-gray-50 border-y border-gray-100 w-full">
          <div className="max-w-4xl mx-auto mb-16">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Final Designs
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              A complete system designed for clarity and conversion
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed mb-12 space-y-6">
              <ul className="list-disc pl-6 space-y-2">
                <li>A conversion-focused homepage</li>
                <li>5 structured service pages</li>
                <li>Case study templates</li>
                <li>A careers system with application flow</li>
                <li>A blog and content system</li>
                <li>Fully responsive layouts across devices</li>
              </ul>
              <p>The final output included a complete website system covering over 15 pages. The homepage acts as the primary entry point, focusing on credibility and quick understanding. Service pages provide detailed breakdowns while maintaining consistency. Case studies support validation and decision-making. The blog system supports content and SEO. The careers page focuses on culture and hiring.</p>
            </div>
          </div>
          
          <div className="max-w-[1200px] mx-auto space-y-8">
            <div className="w-full rounded-2xl overflow-hidden">
              <ResponsiveImage 
                src="/image/tbl_final_ui_mock_3x.webp" 
                alt="Final UI Mockup" 
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="w-full h-auto block" 
              />
            </div>
            <div className="w-full rounded-2xl overflow-hidden">
              <ResponsiveImage 
                src="/image/ui_design_one_2x.webp" 
                alt="UI Design Part 1" 
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="w-full h-auto block" 
              />
            </div>
            <div className="w-full rounded-2xl overflow-hidden">
              <ResponsiveImage 
                src="/image/ui_design_two_2x.webp" 
                alt="UI Design Part 2" 
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="w-full h-auto block" 
              />
            </div>
            <div className="w-full rounded-2xl overflow-hidden">
              <ResponsiveImage 
                src="/image/tbl_all_ui_design_3x.webp" 
                alt="All UI Designs" 
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="w-full h-auto block" 
              />
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="py-24 px-4 md:px-12 lg:px-24 w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              Impact
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Measurable improvements in clarity and conversion readiness
            </h2>
            <div className="text-base md:text-lg text-ink/80 leading-relaxed space-y-6">
              <p>The redesign led to a stronger structure that directly supported conversion readiness.</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
                <div className="bg-gray-50 p-6 rounded-2xl text-left flex flex-col justify-start">
                  <h3 className="text-4xl font-bold text-[#DE1C4D] mb-2">15+</h3>
                  <p className="text-sm font-medium text-ink">pages designed and shipped</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl text-left flex flex-col justify-start">
                  <h3 className="text-4xl font-bold text-[#DE1C4D] mb-2">3x</h3>
                  <p className="text-sm font-medium text-ink">average CTAs per page</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl text-left flex flex-col justify-start">
                  <h3 className="text-4xl font-bold text-[#DE1C4D] mb-2">100%</h3>
                  <p className="text-sm font-medium text-ink">consistent design system</p>
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl text-left flex flex-col justify-start">
                  <h3 className="text-4xl font-bold text-[#DE1C4D] mb-2">&lt;30s</h3>
                  <p className="text-sm font-medium text-ink">Service identification time</p>
                </div>
              </div>

              <p className="text-[#DE1C4D] text-xl md:text-2xl font-medium leading-relaxed mt-12">
                That combination matters. It means the site now helps a new visitor understand what the agency does, what makes it credible, and what to do next, without needing a sales call first.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT CHANGED IN ME */}
        <section className="py-24 px-4 md:px-12 lg:px-24 bg-[#1A1A1A] text-white w-full">
          <div className="max-w-4xl mx-auto">
            <h4 className="text-[18px] font-bold text-[#DE1C4D] uppercase tracking-widest mb-6">
              What Changed in Me
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full text-white"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              How this project changed my thinking
            </h2>
            <div className="text-base md:text-lg text-white/80 leading-relaxed space-y-6">
              <p>This project changed how I think about design.</p>
              <p>I stopped seeing websites as visual assets and started seeing them as decision systems. I became more intentional about information architecture, trust-building, and the order in which users need information. I also learned that in B2B, structure does more work than decoration.</p>
              <p className="text-2xl font-semibold text-[#DE1C4D] mt-8 pt-8 border-t border-white/10">Good design is not only about looking strong. It is about helping users move.</p>
            </div>
          </div>
        </section>

        <CaseStudyContactCard />
      </main>
    </motion.div>
  );
};

export default TechBayLeafCaseStudy;
