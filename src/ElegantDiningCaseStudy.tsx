import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, ZoomIn, Maximize2 } from 'lucide-react';
import Lenis from 'lenis';
import CaseStudyContactCard from './CaseStudyContactCard';
import { Project } from './constants';
import { ResponsiveImage } from './components/ResponsiveImage';

const ZoomableImage = ({ src, alt, setZoomedImage, className = "", sizes = "100vw" }: { src: string, alt: string, setZoomedImage: (s: string) => void, className?: string, sizes?: string }) => (
  <div 
    className={`w-full overflow-hidden rounded-2xl md:rounded-3xl border border-ink/10 cursor-zoom-in bg-white transition-opacity duration-200 hover:opacity-95 ${className}`}
    onClick={() => setZoomedImage(src)}
  >
    <ResponsiveImage 
      src={src} 
      alt={alt} 
      sizes={sizes}
      className="w-full h-auto block" 
    />
  </div>
);

const ElegantDiningCaseStudy = ({ project, onClose }: { project: Project, onClose: () => void }) => {
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
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <span className="text-xs md:text-sm lg:text-base font-semibold text-zinc-900 max-w-[200px] md:max-w-none truncate">Case Study: {project.title}</span>
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
        <section className="pt-12 md:pt-24 pb-6 md:pb-10 px-4 md:px-6 max-w-6xl mx-auto">
          <h2 
            className="text-left text-5xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-6 md:mb-12 tracking-tight whitespace-normal w-full"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.title}
          </h2>
        </section>
        
        <div className="w-full max-w-6xl mx-auto md:px-6 mb-12 md:mb-20 overflow-hidden shadow-sm md:rounded-3xl bg-[#000000] flex items-center justify-center border border-ink/5">
          <video 
            src="/image/Scene.mp4" 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-auto max-h-[400px] md:max-h-[600px] object-contain block py-4 md:py-12"
            onCanPlay={(e) => {
              e.currentTarget.playbackRate = 0.8;
            }}
          />
        </div>
          
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 mb-12 md:mb-40 px-4 md:px-6">
          {/* OVERVIEW */}
          <section className="py-8 md:py-12">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">
              Overview
            </h4>
            <div className="text-sm md:text-lg text-ink/80 leading-relaxed font-normal space-y-4 md:space-y-6">
              <p>
                In this project, I designed a shared expense and bill splitting experience for restaurant group dining. The goal was to help users split bills fairly, track shared expenses clearly, and manage payments more easily within a group without relying on manual calculations or external apps.
              </p>
            </div>
          </section>
 
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20 py-8 md:py-16 border-y border-gray-100 text-sm md:text-base">
            <div className="w-full">
              <span className="block text-ink/50 uppercase tracking-wider text-[10px] md:text-xs font-semibold mb-1 md:mb-2">Role</span>
              <strong className="font-medium text-ink">Product Designer</strong>
            </div>
            <div className="w-full">
              <span className="block text-ink/50 uppercase tracking-wider text-[10px] md:text-xs font-semibold mb-1 md:mb-2">Methods</span>
              <strong className="font-medium text-ink">Research and HMW</strong>
            </div>
            <div className="w-full">
              <span className="block text-ink/50 uppercase tracking-wider text-[10px] md:text-xs font-semibold mb-1 md:mb-2">Platform</span>
              <strong className="font-medium text-ink">Mobile Application</strong>
            </div>
            <div className="w-full">
              <span className="block text-ink/50 uppercase tracking-wider text-[10px] md:text-xs font-semibold mb-1 md:mb-2">Time</span>
              <strong className="font-medium text-ink">1 week</strong>
            </div>
          </div>
        </div>

        {/* SECTION 01 */}
        <section className="py-12 md:py-24 bg-gray-50 border-y border-gray-100 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">
              WHAT I WAS SOLVING?
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight text-ink mb-6 md:mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Why does paying the bill feel like the hardest part of dining out?
            </h2>
            <div className="text-sm md:text-lg text-ink/80 leading-relaxed space-y-4 md:space-y-6 text-left">
              <p>
                Dining out with friends is easy until the bill arrives. People often struggle to calculate individual shares, track who ordered what, split taxes and tips fairly, and settle pending payments later. In most cases, one person ends up managing the entire split, making the experience confusing, time-consuming, and awkward for the group.
              </p>
              <p>
                This project focused on simplifying group bill splitting by creating a clearer and easier way for users to manage shared expenses and payments.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 03 */}
        <section className="pt-12 md:pt-24 pb-0 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">
              UX Research
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight text-ink mb-6 md:mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Understanding the space through <span className="text-accent">multiple lenses</span>
            </h2>
            <p className="text-sm md:text-lg text-ink/80 leading-relaxed mb-8 md:mb-12">
              To build a bill-splitting experience rooted in real behaviour, three research methods were combined: AI-assisted exploration, direct user surveys, and secondary source validation.
            </p>

            <div className="mb-16 md:mb-24 flex flex-col items-start text-left">
              <span className="text-accent text-2xl md:text-4xl font-medium mb-1 md:mb-2 block leading-none">01</span>
              <h3 className="text-xl md:text-2xl font-semibold text-ink mb-4 md:mb-6">AI Exploration</h3>
              <p className="text-sm md:text-base text-ink/70 mb-8 md:mb-10">
                 Used AI to rapidly map user expectations, fears, and trust-building needs before committing to a survey, helping frame better questions and identify blind spots early.
              </p>

              <ZoomableImage 
                src="/image/user_expectations.webp" 
                alt="User Expectations mapped by AI exploration" 
                setZoomedImage={setZoomedImage}
                className="mb-6"
              />

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                <ZoomableImage 
                  src="/image/user_fears_and_motivation.webp" 
                  alt="User Fears and Motivations" 
                  setZoomedImage={setZoomedImage}
                />
                <ZoomableImage 
                  src="/image/trust_and_confidence.webp" 
                  alt="Trust and Confidence" 
                  setZoomedImage={setZoomedImage}
                />
              </div>
            </div>
          </div>

          <div className="bg-ink text-white py-12 md:py-24 px-4 md:px-6 rounded-t-[1.5rem] md:rounded-t-[3rem]">
            <div className="max-w-6xl mx-auto">
               <div className="flex flex-col items-start text-left">
                 <span className="text-accent text-2xl md:text-4xl font-medium mb-1 md:mb-2 block leading-none">02</span>
                 <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Online Survey: 18 Respondents</h3>
                 <p className="text-sm md:text-base text-white/70 mb-10 md:mb-16">A direct survey to validate assumptions and uncover real-world behaviour around dining and bill splitting in India.</p>
               </div>

               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
                  <div className="bg-white/5 border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-start text-left shadow-lg shadow-black/20">
                    <h5 className="text-2xl md:text-5xl font-bold text-accent mb-2 md:mb-4">Weekly</h5>
                    <p className="text-white/80 text-[10px] md:text-sm leading-relaxed">How often people dine out with friends and family.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-start text-left shadow-lg shadow-black/20">
                    <h5 className="text-2xl md:text-5xl font-bold text-accent mb-2 md:mb-4">55.6%</h5>
                    <p className="text-white/80 text-[10px] md:text-sm leading-relaxed">Pay via GPay, PhonePe, or Paytm which shows digital wallets are already dominant.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-start text-left shadow-lg shadow-black/20">
                    <h5 className="text-2xl md:text-5xl font-bold text-accent mb-2 md:mb-4">11.1%</h5>
                    <p className="text-white/80 text-[10px] md:text-sm leading-relaxed">Only split evenly by default meaning the majority prefer proportional splits.</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-5 md:p-10 rounded-2xl md:rounded-3xl flex flex-col justify-start text-left shadow-lg shadow-black/20">
                    <h5 className="text-2xl md:text-5xl font-bold text-accent mb-2 md:mb-4">61%</h5>
                    <p className="text-white/80 text-[10px] md:text-sm leading-relaxed">of adults have paid a group expense expecting repayment, and 59% reported a negative experience.</p>
                  </div>
               </div>

               <ZoomableImage 
                 src="/image/survey_result_image.webp" 
                 alt="Survey Results" 
                 setZoomedImage={setZoomedImage}
                 className="mb-12 md:mb-20"
               />

               <div className="flex flex-col gap-12 md:gap-24">
                  <div className="w-full">
                     <div className="text-left">
                        <h4 className="text-xl md:text-2xl font-medium text-white mb-4 md:mb-6">Key challenges users faced while splitting bills</h4>
                        <p className="text-white/70 mb-8 md:mb-10 leading-relaxed text-sm md:text-base">
                          Through the survey, I found that most challenges during bill splitting came from manual effort, unclear expense tracking, and delayed payments within groups.
                        </p>
                     </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-start gap-3 md:gap-4 h-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span className="text-white/80 leading-relaxed text-sm md:text-base">Users struggled to split bills fairly when everyone ordered different items, especially while calculating taxes, tips, and individual shares.</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-start gap-3 md:gap-4 h-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span className="text-white/80 leading-relaxed text-sm md:text-base">Groups often faced confusion around who ordered what, which sometimes led to unequal splits and disagreements.</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-start gap-3 md:gap-4 h-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span className="text-white/80 leading-relaxed text-sm md:text-base">Managing the entire split usually became the responsibility of one person, making the process stressful and time-consuming.</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-start gap-3 md:gap-4 h-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span className="text-white/80 leading-relaxed text-sm md:text-base">Many users relied on external tools like calculators or shared bill photos manually to calculate expenses.</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl flex flex-col items-start gap-3 md:gap-4 h-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span className="text-white/80 leading-relaxed text-sm md:text-base">Delayed payments were another common issue. People often chose to pay later due to low balance at that moment, but eventually forgot the amount they owed.</span>
                        </div>
                     </div>
                  </div>
                  <div className="w-full">
                     <h4 className="text-xl md:text-2xl font-medium text-white mb-6 md:mb-10">Most Requested Features</h4>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
                       <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex flex-col justify-between h-full">
                         <div>
                          <strong className="block text-white mb-1.5 md:mb-2 text-sm md:text-base leading-snug">Ability to input individual orders per participant</strong>
                         </div>
                         <span className="text-white/40 text-[10px] md:text-xs mt-3 md:mt-4 block">Highest priority (22.2%)</span>
                       </div>
                       <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex flex-col justify-between h-full">
                         <div>
                          <strong className="block text-white mb-1.5 md:mb-2 text-sm md:text-base leading-snug">Real-time calculation of each person's share</strong>
                         </div>
                         <span className="text-white/40 text-[10px] md:text-xs mt-3 md:mt-4 block">22.2% Request rate</span>
                       </div>
                       <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex flex-col justify-between h-full">
                         <div>
                          <strong className="block text-white mb-1.5 md:mb-2 text-sm md:text-base leading-snug">Option to split bills proportionally</strong>
                         </div>
                         <span className="text-white/40 text-[10px] md:text-xs mt-3 md:mt-4 block">22.2% Request rate</span>
                       </div>
                       <div className="bg-white/5 border border-white/10 p-5 md:p-6 rounded-2xl flex flex-col justify-between h-full">
                         <div>
                          <strong className="block text-white mb-1.5 md:mb-2 text-sm md:text-base leading-snug">Integration with payment platforms</strong>
                         </div>
                         <span className="text-white/40 text-[10px] md:text-xs mt-3 md:mt-4 block">11.1% Request rate</span>
                       </div>
                     </div>
                     
                     <div className="mt-12 md:mt-20">
                        <h4 className="text-xl md:text-2xl font-medium text-white mb-6 md:mb-10">User Habits</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                           <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl flex flex-col gap-6 md:gap-8">
                              <h5 className="text-lg md:text-xl font-medium text-white opacity-90">Most Used App For Book Dining</h5>
                              <div className="flex flex-wrap gap-3 md:gap-4">
                                 {['Zomato', 'Swiggy'].map((app) => (
                                    <span key={app} className="px-4 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white font-semibold text-sm md:text-base">
                                       {app}
                                    </span>
                                 ))}
                              </div>
                           </div>
                           <div className="bg-white/5 border border-white/10 p-6 md:p-10 rounded-2xl flex flex-col gap-6 md:gap-8">
                              <h5 className="text-lg md:text-xl font-medium text-white opacity-90">Most Used App For Payment</h5>
                              <div className="flex flex-wrap gap-3 md:gap-4">
                                 {['GPay', 'PhonePe'].map((app) => (
                                    <span key={app} className="px-4 md:px-6 py-2 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-white font-semibold text-sm md:text-base">
                                       {app}
                                    </span>
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-gray-50 py-12 md:py-24 px-4 md:px-6 border-b border-gray-100 pb-16 md:pb-32">
            <div className="max-w-6xl mx-auto">
               <div className="flex flex-col items-start text-left">
                 <span className="text-accent text-2xl md:text-4xl font-medium mb-1 md:mb-2 block leading-none">03</span>
                 <h3 className="text-xl md:text-2xl font-semibold text-ink mb-4 md:mb-6">Secondary Research: Online Sources</h3>
                 <p className="text-sm md:text-base text-ink/70 mb-8 md:mb-16">I explored published articles, etiquette guides, and financial research to better understand user behaviour and common patterns around bill splitting.</p>
               </div>

               <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  {[
                    {
                      title: "The debt problem is bigger than expected",
                      desc: "61% of adults had paid for a group expense expecting repayment, and 59% reported negative experiences like unpaid dues, damaged relationships, or conflicts caused by money.",
                      source: "CreditCards.com Survey",
                      link: "https://www.creditcards.com/statistics/lending-money-poll/"
                    },
                    {
                      title: "People avoid uncomfortable money conversations",
                      desc: "Many people hesitate to speak up even when a split feels unfair because they want to avoid awkward social situations. Users often prioritize social comfort over discussing budgets openly.",
                      source: "CNBC Etiquette Experts",
                      link: "https://www.cnbc.com/2022/11/13/etiquette-experts-best-way-to-split-the-bill.html"
                    },
                    {
                      title: "Taxes and tips create confusion",
                      desc: "Even when food expenses are divided proportionally, people still have different expectations around splitting taxes and tips, which often creates disagreements during pay settlement.",
                      source: "Mind Your Decisions",
                      link: "https://mindyourdecisions.com/blog/2008/01/29/game-theory-tuesdays-dividing-a-restaurant-bill/"
                    },
                    {
                      title: "Existing bill splitting still feels manual",
                      desc: "Most current experiences still rely heavily on calculators, screenshots, reminders, and multiple payment apps to settle shared expenses, making the process stressful and inconvenient.",
                      source: "POSist Research",
                      link: "https://www.posist.com/restaurant-times/features/splitting-bills-going-the-dutch-way.html"
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 p-6 md:p-8 rounded-2xl md:rounded-3xl">
                      <strong className="text-ink font-semibold text-base md:text-lg block mb-2 md:mb-3">{item.title}</strong>
                      <p className="text-ink/70 text-xs md:text-sm mb-4 md:mb-6 leading-relaxed">{item.desc}</p>
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-accent text-[10px] md:text-xs font-mono font-medium uppercase tracking-wider flex items-center gap-1.5 hover:underline decoration-accent/30 decoration-1 underline-offset-4 transition-all">
                        Source: {item.source}
                        <ExternalLink size={10} className="opacity-70" />
                      </a>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </section>


        <section className="py-12 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">
              Problem Space
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight text-ink mb-6 md:mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Mapping the friction points
            </h2>
            <p className="text-sm md:text-lg text-ink/80 leading-relaxed mb-8 md:mb-12">
              After analyzing survey responses, user behaviour, and secondary research, I grouped similar pain points into broader themes to identify where most friction occurs during group dining experiences.
            </p>

            <div className="w-full overflow-hidden rounded-xl border border-gray-100">
              <ResponsiveImage 
                src="/image/affinity_mapping.webp" 
                alt="Affinity Mapping Visualization" 
                sizes="(max-width: 1200px) 100vw, 1150px"
                className="w-full h-auto block" 
              />
            </div>
          </div>
        </section>

        {/* SECTION 05: PROBLEM STATEMENT */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-ink text-white text-left">
           <div className="max-w-6xl mx-auto">
               <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-8 md:mb-12">
                 Defined Problem Statement
               </h4>
               <p className="text-sm md:text-lg lg:text-xl leading-relaxed text-white/90 font-medium">
                 People dining out with friends and family often face confusion once the bill arrives. Calculating individual shares, splitting taxes and tips, tracking pending payments, and reminding others to pay later turns a simple dining experience into a frustrating process. Most existing solutions still rely on manual calculations, multiple payment apps, and uncomfortable money conversations, making bill splitting time-consuming, unclear, and stressful for the entire group.
               </p>
           </div>
        </section>

        {/* HOW MIGHT WE SECTION */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-left">
              <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-3 md:mb-6">
                How Might We
              </h4>
              <h2 
                className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight text-ink mb-6 md:mb-12 w-full"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Framing the right questions
              </h2>
            </div>

            <div className="space-y-6 md:space-y-8 mt-10 md:mt-16">
              <ZoomableImage 
                src="/image/hmw_1.webp" 
                alt="How Might We Exploration Phase 01" 
                setZoomedImage={setZoomedImage}
                className="rounded-none border-none"
              />
              <ZoomableImage 
                src="/image/hmw_2.webp" 
                alt="How Might We Exploration Phase 02" 
                setZoomedImage={setZoomedImage}
                className="rounded-none border-none"
              />
            </div>
          </div>
        </section>


        {/* SECTION 06: USER FLOW */}
        <section className="py-12 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-left">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">
              User Flow
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight text-ink mb-6 md:mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Mapping the user journey
            </h2>
            <p className="text-sm md:text-lg text-ink/80 leading-relaxed mb-8 md:mb-12">
              With the problem statement defined, I mapped out the end-to-end user journey to visualize how diners interact with the app—from joining a dining session to finalizing the bill split and processing payments.
            </p>

            <ZoomableImage 
              src="/image/elegnt_dining_userflow.webp" 
              alt="End-to-end User Flow Diagram" 
              sizes="(max-width: 1200px) 100vw, 1150px"
              setZoomedImage={setZoomedImage}
              className="border-ink/10"
            />
          </div>
        </section>


        {/* SECTION 07 / UI SCREENS */}
        <section className="py-12 md:py-24 px-4 md:px-6">
          <div className="max-w-6xl mx-auto text-left">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">
              UI Screens
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight text-ink mb-10 md:mb-16 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Full design flow overview
            </h2>
            
            {/* Long Full Width UI Overview */}
            <div className="w-full">
              <ZoomableImage 
                src="/image/elegant_dining_ui_design_flow_.webp" 
                alt="Full UI Design Flow" 
                sizes="(max-width: 1200px) 100vw, 1150px"
                setZoomedImage={setZoomedImage}
                className="border-ink/10"
              />
            </div>
          </div>
        </section>
      
        {/* FINAL OUTCOME SECTION */}
        <section className="py-12 md:py-24 px-4 md:px-6 bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto text-left">
            <h4 className="text-[18px] font-bold text-accent uppercase tracking-widest mb-4 md:mb-6">
              Final Outcome
            </h4>
            <h2 
              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight text-ink mb-8 md:mb-10 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Results and Reflections
            </h2>
            
            <div className="text-sm md:text-lg text-ink/80 leading-relaxed space-y-8 md:space-y-12">
              <div className="space-y-4 md:space-y-6 text-left">
                <p>
                  The final solution transforms bill splitting from a stressful post-dinner task into a smoother and more transparent group experience.
                </p>
                <p>
                  Instead of relying on manual calculations, screenshots, reminders, and multiple payment apps, users can split expenses, track payments, and settle bills directly within a single flow.
                </p>
              </div>
                
                <div className="bg-[#F9F9F9] border border-gray-100 p-6 md:p-16 lg:p-20 rounded-[1.5rem] md:rounded-[2.5rem]">
                  <div className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-24">
                    <div>
                      <h5 className="text-lg md:text-xl font-semibold text-ink mb-4 md:mb-6">The solution helped reduce</h5>
                      <ul className="space-y-3 md:space-y-4">
                        {[
                          "Confusion around who owes what",
                          "Manual calculation errors",
                          "Unequal bill splits",
                          "Delayed or forgotten repayments",
                          "Awkward money conversations within groups",
                          "Dependency on external calculators and payment apps"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 md:gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 md:mt-2 shrink-0" />
                            <span className="text-ink/80 leading-snug text-xs md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-lg md:text-xl font-semibold text-ink mb-4 md:mb-6">The experience focused on</h5>
                      <ul className="space-y-3 md:space-y-4">
                        {[
                          "Accurate item-level bill splitting",
                          "Real-time payment tracking",
                          "Transparent tax and tip distribution",
                          "Faster group settlement through QR-based payments",
                          "Building trust through clear payment visibility"
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3 md:gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 md:mt-2 shrink-0" />
                            <span className="text-ink/80 leading-snug text-xs md:text-base">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-8 md:pt-12 border-t border-gray-100 text-left">
                  <p className="text-lg md:text-2xl font-sans font-semibold text-accent leading-relaxed italic">
                    "This project helped me understand that the biggest challenge in bill splitting is not just payments, but the social friction and coordination that happens around them. The final experience was designed to make group dining feel less stressful, more fair, and easier to manage for everyone involved."
                  </p>
                </div>
              </div>
          </div>
        </section>

      </main>

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
                className="p-4 bg-ink/5 hover:bg-accent hover:text-white rounded-full transition-all duration-300 shadow-sm cursor-pointer"
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

      <CaseStudyContactCard onClose={onClose} />
    </motion.div>
  );
};

export default ElegantDiningCaseStudy;
