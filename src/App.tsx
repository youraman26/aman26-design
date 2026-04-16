/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, type FC, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  AnimatePresence,
  useInView,
  useMotionValue
} from 'motion/react';
import { 
  ArrowUpRight, 
  FileText,
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  ExternalLink, 
  ChevronRight,
  Code,
  Palette,
  Layout,
  Cpu,
  Zap,
  MessageSquare,
  Instagram,
  Globe,
  Search,
  Sparkles,
  Wrench,
  Layers,
  Monitor,
  Users,
  Users2,
  MousePointer2,
  BookOpen,
  BarChart3,
  Dribbble,
  Trello,
  Code2,
  Check,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Type,
  X,
  Framer,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  FlaskConical,
  Tally3,
  ArrowLeft,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Quote,
  User,
  Workflow,
  Loader2,
  Brain,
  Activity,
  PieChart,
  Database,
  Settings2,
  Bell,
  Bug,
  UserCircle,
  ClipboardList,
  Eye,
  Shield,
  Maximize2,
  Lightbulb,
  Phone
} from 'lucide-react';

const Footer = lazy(() => import('./Footer'));
const AboutSection = lazy(() => import('./AboutSection'));
const SkillsSection = lazy(() => import('./SkillsSection'));
const ExperienceSection = lazy(() => import('./ExperienceSection'));
const OwnershipSection = lazy(() => import('./OwnershipSection'));
const TestimonialsSection = lazy(() => import('./TestimonialsSection'));
const GallerySection = lazy(() => import('./GallerySection'));
const ContactSection = lazy(() => import('./ContactSection'));
const CaseStudy = lazy(() => import('./CaseStudy'));

import { Project, PROJECTS } from './constants';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasMoved, setHasMoved] = useState(false);

  const springConfig = { damping: 30, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, hasMoved]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-start"
      style={{
        x: cursorX,
        y: cursorY,
        opacity: hasMoved ? 1 : 0,
      }}
    >
      <div className="relative flex items-start">
        {/* Figma-style Arrow (Refined shape and size) */}
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-md"
        >
          <path 
            d="M5.5 3.5L19 12.5L12.5 14L16 20.5L13.5 22L10 15.5L5.5 19.5V3.5Z" 
            fill="#4D85FF" 
            stroke="white" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
        </svg>
        
        {/* "You" Label (White text, blue background) */}
        <div className="ml-1 mt-4 px-2 py-0.5 bg-[#4D85FF] text-white text-[12px] font-bold whitespace-nowrap rounded-full drop-shadow-sm">
          You
        </div>
      </div>
    </motion.div>
  );
};

const WorkPage = ({ onClose, onSelectProject }: { onClose: () => void, onSelectProject: (p: Project) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[200] bg-white overflow-y-auto"
      data-lenis-prevent
    >
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-border px-6 py-6">
        <div className="container-wide flex items-center justify-between">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">All case studies</h2>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-bg flex items-center justify-center hover:bg-border transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="container-wide px-6 py-20">
        <div className="space-y-12">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {
                if (project.hasCaseStudy || project.pdfUrl) {
                  onSelectProject(project);
                }
              }}
              className={`group flex flex-col md:flex-row gap-8 bg-bg rounded-[40px] p-6 md:p-8 hover:shadow-xl transition-all border border-transparent hover:border-border ${project.hasCaseStudy || project.pdfUrl ? 'cursor-pointer' : ''}`}
            >
              <div className="w-full md:w-[320px] lg:w-[400px] shrink-0 aspect-[16/10] rounded-[24px] overflow-hidden">
                <img 
                  loading="lazy"
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu will-change-transform rounded-[24px]"
                  
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col justify-center py-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-[9px] font-bold uppercase tracking-[0.2em] rounded-full border border-accent/20">
                    {project.category || "Case Study"}
                  </div>
                  <div className="h-px w-8 bg-border"></div>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-widest text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-black mb-4 leading-tight group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-ink/80 text-base md:text-lg font-normal leading-relaxed mb-6 max-w-2xl whitespace-pre-line">
                  {project.description}
                </p>
                {project.role && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-ink/10 border border-ink/10 text-ink text-[10px] uppercase tracking-wider rounded-full mb-5 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-ink/5 flex items-center justify-center">
                      <User size={10} className="text-ink" />
                    </div>
                    <span className="font-bold text-ink">{project.role}</span>
                  </div>
                )}
                <div className="flex items-center gap-6">
                  {project.pdfUrl ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="flex items-center gap-2 text-sm font-black hover:gap-3 transition-all text-ink group/link"
                    >
                      View PDF Case Study <ChevronRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  ) : project.hasCaseStudy ? (
                    <button 
                      className="flex items-center gap-2 text-sm font-black hover:gap-3 transition-all text-ink"
                    >
                      View Case Study <ChevronRight size={16} />
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-muted italic">Case study coming soon</span>
                  )}
                  <a 
                    href="#" 
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm font-bold text-muted hover:text-ink transition-colors"
                  >
                    Live Link <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Work', href: '#work' },
    { name: 'Skills & Tools', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Story', href: '#story' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-bg/80 backdrop-blur-md border-b border-border' : 'py-8 bg-transparent'}`}>
        <div className="container-wide flex items-center justify-between px-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-accent group-hover:border-accent transition-all duration-300 shadow-sm">
              <img 
                loading="eager"
                src="/image/mascot_img_3x.webp" 
                alt="Mascot" 
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-2xl font-black text-accent tracking-tighter">ac.</span>
          </motion.div>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.querySelector(item.href);
                  if (target && window.lenis) {
                    (window.lenis as any).scrollTo(target);
                  }
                }}
                className="relative text-sm font-medium text-ink/70 hover:text-accent transition-colors group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <motion.a
              href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden sm:block px-6 py-2 bg-gradient-to-r from-accent to-blue-600 text-white text-sm font-semibold rounded-full shadow-md shadow-accent/20 hover:shadow-lg hover:shadow-accent/40 transition-all duration-300 transform hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
              <span className="relative z-10 flex items-center gap-2">Resume <ArrowUpRight size={16} /></span>
            </motion.a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div 
                animate={mobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-ink rounded-full origin-center"
              />
              <motion.div 
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-ink rounded-full"
              />
              <motion.div 
                animate={mobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-ink rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center p-6 md:hidden"
            data-lenis-prevent
          >
            <div className="flex flex-col items-center gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    const target = document.querySelector(item.href);
                    if (target && window.lenis) {
                      (window.lenis as any).scrollTo(target);
                    }
                  }}
                  className="text-4xl font-black text-ink hover:text-accent transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
              <motion.a
                href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 px-10 py-4 bg-gradient-to-r from-accent to-blue-600 text-white text-lg font-bold rounded-full shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/40 transition-all duration-300 relative overflow-hidden group text-center inline-block"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                <span className="relative z-10 flex items-center gap-2 justify-center">View Resume <ArrowUpRight size={18} /></span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = ({ onViewWork }: { onViewWork: () => void }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <section className="relative min-h-[80vh] md:h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#11111108_1px,transparent_1px),linear-gradient(to_bottom,#11111108_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Background Large Text - Subtle Product Designer */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.02]">
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[15vw] font-black text-ink uppercase whitespace-nowrap text-center leading-none"
        >
          Product <br /> Designer
        </motion.h1>
      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="container-wide text-center z-10 px-6 mt-32 md:mt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Centered Mascot */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-4 md:mb-6"
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-accent bg-white shadow-lg relative z-10">
              <img 
                loading="eager"
                src="/image/mascot_img_3x.webp" 
                alt="Aman's Mascot" 
                className="w-full h-full object-contain hover:scale-110 transition-transform duration-500 [image-rendering:auto]"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Name Text below Mascot */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-[14px] md:text-[18px] font-medium text-accent tracking-tight mb-8"
          >
            Hey, I am Aman Chourasiya
          </motion.h2>

          {/* New Tabs Section - 2x2 Grid on Mobile */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-[340px] md:max-w-none mx-auto"
          >
            {[
              "Product First Thinking",
              "Systems & Workflows",
              "Agile Design Process",
              "AI First Design"
            ].map((tab, i) => (
              <motion.div
                key={tab}
                whileHover={{ y: -2, scale: 1.02 }}
                className="px-3 md:px-5 py-2.5 bg-white border border-border rounded-xl text-[11px] md:text-[13px] font-medium text-muted hover:text-accent hover:border-accent transition-all cursor-default shadow-sm text-center flex items-center justify-center"
              >
                {tab}
              </motion.div>
            ))}
          </motion.div>

          {/* New Main Heading with Micro-animations - Editorial Style */}
          <h1 className="text-[18px] sm:text-[24px] md:text-[30px] lg:text-[36px] font-serif leading-[1.15] mb-8 max-w-4xl mx-auto tracking-tight text-ink text-center">
            <div className="flex flex-wrap justify-center gap-x-[0.3em] mb-4">
              {"I design products and the systems behind them across SaaS, enterprise, mobile, and B2B.".split(" ").map((word, i) => {
                let color = "inherit";
                if (word.includes("SaaS")) color = "#8B5CF6";
                else if (word.includes("enterprise")) color = "#10B981";
                else if (word.includes("mobile")) color = "#F97316";
                else if (word.includes("B2B")) color = "#D946EF";
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 1, 
                      delay: 0.4 + (i * 0.04),
                      ease: [0.215, 0.61, 0.355, 1]
                    }}
                    className="italic-serif inline-block hover:text-accent transition-colors duration-500 cursor-default"
                    style={{ color }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.05,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {word}
                  </motion.span>
                );
              })}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
                className="italic-serif inline-block cursor-default"
                style={{ color: "#111111" }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: -2,
                  transition: { duration: 0.3 }
                }}
              >
                Powered by <span className="text-[#2F6BFF] font-bold">AI-Assisted Workflow</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
                className="italic-serif inline-block"
              >
                and built for real operational scale.
              </motion.span>
            </div>
          </h1>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you." target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-gradient-to-r from-ink to-zinc-800 text-white rounded-full font-bold hover:from-accent hover:to-blue-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5 relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-white/10 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
              <span className="relative z-10 flex items-center gap-2">Say Hi 👋 <ArrowRight size={18} /></span>
            </a>
            <a href="mailto:chourasiyaaman76@gmail.com" className="hidden md:flex px-8 py-3 bg-white text-ink border border-ink rounded-full font-bold hover:bg-ink hover:text-white transition-colors items-center justify-center gap-2">
              Get in touch <Mail size={18} />
            </a>
            <a href="tel:+917225905369" className="flex md:hidden px-8 py-3 bg-white text-ink border border-ink rounded-full font-bold hover:bg-ink hover:text-white transition-colors items-center justify-center gap-2">
              Get On A Call <Phone size={18} />
            </a>
          </div>

        </motion.div>
      </motion.div>

      {/* Floating Visual Panels */}
      <motion.div 
        initial={{ opacity: 0, x: -100, rotate: -15 }}
        animate={{ opacity: 1, x: 0, rotate: -12 }}
        whileHover={{ 
          rotate: -5,
          scale: 1.05,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        transition={{ delay: 0.5, duration: 1 }}
        className="absolute left-[-5%] top-[20%] w-64 h-80 rounded-[40px] border border-accent/20 hidden lg:block backdrop-blur-sm overflow-hidden group cursor-pointer shadow-2xl z-20"
      >
        <img 
          src="/image/mock_hero_img_2x.webp" 
          alt="Aman Chourasiya" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500" />
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 12 }}
        whileHover={{ 
          rotate: 5,
          scale: 1.05,
          transition: { duration: 0.4, ease: "easeOut" }
        }}
        transition={{ delay: 0.7, duration: 1 }}
        className="absolute right-[-5%] bottom-[20%] w-72 h-96 rounded-[40px] border border-accent/20 hidden lg:block backdrop-blur-sm overflow-hidden group cursor-pointer shadow-2xl z-20"
      >
        <img 
          src="/image/my_hero_img_2x.webp" 
          alt="Aman Chourasiya Work" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500" />
      </motion.div>
      
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}


const VideoPreview = () => {
  return (
    <div className="relative w-full h-full bg-[#0a0a0a] overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a0b2e_0%,#0a0a0a_100%)]" />
      
      {/* Animated Orbs */}
      <motion.div 
        animate={{ 
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[80px]"
      />
      <motion.div 
        animate={{ 
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px]"
      />

      {/* Phone Mockup */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full max-w-[200px] aspect-[9/19.5] bg-[#121212] rounded-[40px] border-[6px] border-[#222] shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden relative"
        >
          {/* Glass Reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none z-20" />
          
          {/* Screen Content */}
          <div className="absolute inset-0 p-5 flex flex-col gap-4">
            {/* Status Bar */}
            <div className="flex justify-between items-center px-2 pt-1">
              <div className="w-8 h-2 bg-white/20 rounded-full" />
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white/20 rounded-full" />
                <div className="w-2 h-2 bg-white/20 rounded-full" />
              </div>
            </div>

            {/* Header */}
            <div className="h-8 w-2/3 bg-white/10 rounded-lg" />
            
            {/* Main Card */}
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="aspect-[4/5] w-full bg-gradient-to-br from-accent/40 to-purple-600/40 rounded-2xl border border-white/10 shadow-lg"
            />
            
            {/* List Items */}
            <div className="space-y-3">
              <div className="h-3 w-full bg-white/5 rounded-full" />
              <div className="h-3 w-4/5 bg-white/5 rounded-full" />
              <div className="h-3 w-1/2 bg-white/5 rounded-full" />
            </div>

            {/* Bottom Nav */}
            <div className="mt-auto flex justify-around py-2 border-t border-white/5">
              <div className="w-6 h-6 rounded-lg bg-white/10" />
              <div className="w-6 h-6 rounded-lg bg-accent/40" />
              <div className="w-6 h-6 rounded-lg bg-white/10" />
            </div>
          </div>

          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 blur-[1px]" />
          </div>
        </motion.div>

        {/* Floating UI Elements */}
        <motion.div 
          animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-4 w-24 h-16 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 shadow-xl z-30"
        />
        <motion.div 
          animate={{ y: [0, 10, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/3 -left-4 w-20 h-20 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-xl z-30"
        />
      </div>
    </div>
  );
};



const MoreWorkBanner = () => {
  return (
    <section className="py-12 md:py-24 bg-bg relative z-10 px-6">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row bg-white rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm border border-border max-w-5xl mx-auto"
        >
          {/* Left colored part */}
          <div className="w-full md:w-1/3 bg-accent flex items-center justify-center min-h-[200px] md:min-h-[280px] relative overflow-hidden">
            <span className="text-[200px] md:text-[280px] font-black text-white leading-[0.75] tracking-tighter select-none -mt-6 md:-mt-8">
              a
            </span>
          </div>
          {/* Right text part */}
          <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center items-start">
            <h3 className="text-2xl md:text-3xl font-black text-ink mb-3">
              This is just a part of my work.
            </h3>
            <p className="text-muted text-base mb-6 max-w-xl">
              There’s more to explore. You’ll find more projects, flows, and explorations here.
            </p>
            <a 
              href="https://www.figma.com/design/ZE2zBJKz1u6qJPuIkZtGC6/Aman-s-All-Work-file?node-id=136-2212&t=qsSuV2jRqm8mzsmU-1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border-2 border-border text-ink font-bold hover:border-accent hover:text-accent transition-colors flex items-center gap-2 text-sm"
            >
              Explore more work <ArrowUpRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project, index: number, onClick: (p: Project) => void }> = ({ project, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ 
        top: `${80 + (index * 24)}px`, 
        zIndex: index + 1,
        scale,
        opacity,
        transformOrigin: "top center"
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        backgroundColor: project.hoverColor,
        y: -5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      className="md:sticky relative group bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col-reverse md:flex-row gap-8 md:gap-12 items-stretch cursor-pointer overflow-hidden p-6 md:p-10 border border-ink/5"
    >
      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-between py-4 relative z-10">
        <div>
          <div className="inline-flex items-center px-3 py-1 bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-accent/20 mb-6">
            {project.category || "Case Study"}
          </div>
          <h3 className="text-2xl md:text-4xl font-bold text-ink mb-4 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="text-ink/80 text-base md:text-lg font-normal leading-relaxed mb-6 max-w-xl">
            {project.description}
          </p>
          {project.role && (
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-ink/10 border border-ink/10 text-ink text-[11px] uppercase tracking-wider rounded-full mb-6 backdrop-blur-sm">
              <div className="w-5 h-5 rounded-full bg-ink/5 flex items-center justify-center">
                <User size={12} className="text-ink" />
              </div>
              <span className="font-bold text-ink">{project.role}</span>
            </div>
          )}
        </div>
        
        <div className="bg-white text-ink px-8 py-4 rounded-full flex items-center justify-between w-full max-w-[280px] border border-ink/10 hover:border-ink/20 hover:shadow-xl hover:shadow-ink/5 hover:-translate-y-0.5 transition-all duration-300 group/btn">
          <span className="font-bold text-base tracking-wide">Open Case Study</span>
          <div className="w-8 h-8 rounded-full bg-ink/5 flex items-center justify-center group-hover/btn:bg-ink group-hover/btn:text-white transition-colors duration-300">
            <ArrowRight size={16} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full md:w-[60%] aspect-[4/3] md:aspect-auto rounded-3xl overflow-hidden relative shadow-inner">
        <img 
          loading="lazy"
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
          referrerPolicy="no-referrer" 
        />
        <div className="absolute inset-0 bg-ink/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    </motion.div>
  );
};

const WorkSection = ({ onSelectProject }: { onSelectProject: (p: Project) => void }) => {
  const handleProjectClick = (project: Project) => {
    if (project.pdfUrl) {
      window.open(`${project.pdfUrl}#toolbar=0`, '_blank');
    } else {
      onSelectProject(project);
    }
  };

  return (
    <section id="work" className="relative z-20 bg-bg py-16 md:py-40 px-4 md:px-6 overflow-x-clip">
      <div className="container-wide">
        <div className="mb-16 md:mb-24 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-6xl font-black leading-[1.1] tracking-tight max-w-4xl mx-auto mb-8"
          >
            A peek into my <span className="italic-serif font-normal text-accent">recent work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-ink/60 text-lg md:text-2xl max-w-3xl mx-auto font-light leading-relaxed"
          >
            Solutions built at the intersection of user needs, business impact, and system complexity.
          </motion.p>
        </div>

        {/* Stacking Cards Container */}
        <div className="flex flex-col gap-12 md:gap-24 relative pb-32">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={handleProjectClick} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [showWorkPage, setShowWorkPage] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    // Force lenis to start at top on initial load
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (!lenis) return;

    // Stop/Start Lenis based on overlay state
    if (showWorkPage || selectedProject) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [showWorkPage, selectedProject]);

  const handleSelectProject = (project: Project) => {
    if (project.hasCaseStudy) {
      setSelectedProject(project);
      const slug = project.title.toLowerCase().replace(/\s+/g, '-');
      window.history.pushState(null, '', `?project=${slug}`);
    } else if (project.pdfUrl) {
      // Directly open in new tab and hide toolbar to discourage downloading
      window.open(project.pdfUrl + '#toolbar=0', '_blank');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectSlug = params.get('project');
    if (projectSlug) {
      const project = PROJECTS.find(p => p.title.toLowerCase().replace(/\s+/g, '-') === projectSlug);
      if (project) {
        handleSelectProject(project);
      }
    }
  }, []);

  return (
    <div className="relative">
      <CustomCursor />
      <Navbar />
      
      <AnimatePresence>
        {showWorkPage && (
          <WorkPage 
            onClose={() => setShowWorkPage(false)} 
            onSelectProject={handleSelectProject}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <Suspense fallback={<div className="fixed inset-0 z-50 bg-bg flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>}>
            <CaseStudy 
              project={selectedProject} 
              onClose={() => {
                setSelectedProject(null);
                window.history.pushState(null, '', '/');
              }} 
            />
          </Suspense>
        )}
      </AnimatePresence>

      <main>
        <Hero onViewWork={() => setShowWorkPage(true)} />
        <Suspense fallback={<div className="min-h-screen bg-ink" />}>
          <AboutSection />
        </Suspense>
        <WorkSection onSelectProject={handleSelectProject} />
        <MoreWorkBanner />
        <Suspense fallback={<div className="h-20" />}>
          <SkillsSection />
          <ExperienceSection />
          <OwnershipSection />
          <TestimonialsSection />
          <GallerySection />
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={<div className="h-20" />}>
        <Footer />
      </Suspense>

      {/* Global Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[100]"
        style={{ scaleX: useSpring(useScroll().scrollYProgress, { stiffness: 100, damping: 30 }) }}
      />
    </div>
  );
}
