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

import Footer from './Footer';
import OwnershipSection from './OwnershipSection';
import TestimonialsSection from './TestimonialsSection';
import GallerySection from './GallerySection';
import WhyMeSection from './WhyMeSection';
import ContactSection from './ContactSection';
import SparrowCaseStudy from './SparrowCaseStudy';
import TechBayLeafCaseStudy from './TechBayLeafCaseStudy';
import ElegantDiningCaseStudy from './ElegantDiningCaseStudy';

import { Project, PROJECTS, MINOR_PROJECTS } from './constants';
import { ResponsiveImage } from './components/ResponsiveImage';

const CustomCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const springConfig = { damping: 30, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) setHasMoved(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      let interactive = false;

      while (target && target !== document.body) {
        const tagName = target.tagName.toLowerCase();
        const classes = target.className ? String(target.className) : '';
        const isClickable = classes.includes('cursor-pointer') || 
                           classes.includes('cursor-zoom-in') ||
                           classes.includes('pointer-events-auto') ||
                           getComputedStyle(target).cursor === 'pointer';
        
        if (tagName === 'button' || tagName === 'a' || isClickable) {
          interactive = true;
          break;
        }

        if (tagName === 'input' || tagName === 'textarea' || getComputedStyle(target).cursor === 'text') {
          interactive = true;
          break;
        }
        target = target.parentElement;
      }

      setIsHovered(interactive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [mouseX, mouseY, hasMoved]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex"
      animate={{
        scale: isClicking ? 0.85 : 1,
      }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      style={{
        x: cursorX,
        y: cursorY,
        opacity: hasMoved ? 1 : 0,
      }}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div
              key="hover-circle"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="absolute top-0 left-0 w-11 h-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#DE1C4D]/15 border-2 border-[#DE1C4D]/40 shadow-[0_0_15px_rgba(222,28,77,0.15)] pointer-events-none"
            />
          ) : (
            <motion.div
              key="default-cursor"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              className="flex items-start"
            >
              {/* Figma-style Arrow */}
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.3)]"
              >
                <path 
                  d="M5.5 3.5L19 12.5L12.5 14L16 20.5L13.5 22L10 15.5L5.5 19.5V3.5Z" 
                  fill="#DE1C4D" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinejoin="round"
                />
              </svg>
              
              {/* Always only "You" text, no dynamic changes */}
              <div 
                className="ml-1 mt-4 px-3 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap drop-shadow-sm bg-accent text-white"
              >
                You
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
      <div className="sticky top-0 z-30 bg-bg/80 backdrop-blur-md border-b border-border py-4">
        <div className="container-wide flex items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">All case studies</h2>
          <button 
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-bg flex items-center justify-center hover:bg-border transition-colors"
          >
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="container-wide py-32 md:py-48">
        <div className="space-y-12">
          {[...PROJECTS, ...MINOR_PROJECTS].map((project, i) => (
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
              className={`group flex flex-col md:flex-row gap-8 bg-bg rounded-[40px] p-3 md:p-8 hover:shadow-xl transition-all border border-transparent hover:border-border md:h-[400px] ${project.hasCaseStudy || project.pdfUrl ? 'cursor-pointer' : ''}`}
            >
              <div className="w-full md:w-[300px] lg:w-[360px] h-[250px] md:h-full shrink-0 rounded-[24px] overflow-hidden">
                <ResponsiveImage 
                  src={project.image} 
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 300px, 360px"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 transform-gpu will-change-transform rounded-[24px]"
                />
              </div>
              <div className="flex flex-col justify-center py-4">
                <h3 className="text-[22px] sm:text-2xl md:text-2xl font-medium mb-4 leading-tight group-hover:text-accent transition-colors">{project.title}</h3>
                <p className="text-zinc-500 text-[12px] sm:text-[14px] md:text-[15px] font-normal leading-relaxed mb-6 max-w-2xl whitespace-pre-line">
                  {project.description}
                </p>
                {project.role && (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-ink/10 border border-ink/10 text-ink text-[10px] md:text-xs uppercase tracking-wider rounded-full mb-5 backdrop-blur-sm">
                    <div className="w-4 h-4 rounded-full bg-ink/5 flex items-center justify-center">
                      <User size={10} className="text-ink" />
                    </div>
                    <span className="font-medium text-ink">{project.role}</span>
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

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    width={size} 
    height={size}
    className="inline-block"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const lenis = (window as any).lenis;
    if (!lenis) return;
    if (sideMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [sideMenuOpen]);

  const mainLinks = [
    { label: "Home", num: "01", href: "#home" },
    { label: "Work", num: "02", href: "#work" },
    { label: "Story", num: "03", href: "#story" },
    { label: "Contact", num: "04", href: "#contact" },
  ];

  const socials = [
    { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/amanux26", label: "LinkedIn" },
    { 
      icon: (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true" className="w-[16px] h-[16px]">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ), 
      href: "https://x.com/aman26ux", 
      label: "X" 
    },
    { icon: <span className="font-bold text-xs font-sans">M</span>, href: "https://medium.com/@chourasiyaaman76", label: "Medium" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-3 bg-transparent">
        <div className="container-wide flex items-center justify-between relative">
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1.5 sm:gap-3 group cursor-pointer relative z-10 w-auto"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img 
              src="/image/mylogo.webp" 
              alt="Logo"
              referrerPolicy="no-referrer"
              className="w-[52px] h-[52px] rounded-full object-cover border border-[#DE1C4D]/30 shadow-[0_4px_15px_rgba(222,28,77,0.35)] duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_22px_rgba(222,28,77,0.55)]"
            />
            <span className="hidden sm:inline font-bold text-[22px] tracking-tight transition-colors duration-300 text-black group-hover:text-[#DE1C4D]">
              aman
            </span>
          </motion.div>
          
          <div className="flex items-center gap-4 relative z-10">
            {/* Crimson Premium 3d Button changed to Resume Link */}
            <motion.a
              href="https://drive.google.com/file/d/18MAWgK4jLlFAnEy8ORVvHVmUfRCDslWk/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#FF2A54] via-[#DE1C4D] to-[#B60E36] hover:from-[#DE1C4D] hover:to-[#9A0B31] text-white text-[18px] md:text-[18px] font-normal font-sans tracking-wider rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(222,28,77,0.25),0_2px_5px_rgba(222,28,77,0.12),inset_0_-1px_0_rgba(0,0,0,0.12)] hover:shadow-[0_6px_16px_rgba(222,28,77,0.35),0_3px_8px_rgba(222,28,77,0.18),inset_0_-1px_0_rgba(0,0,0,0.12)] select-none cursor-pointer text-center"
            >
              <span>View Resume</span>
              <ArrowUpRight size={18} />
            </motion.a>

            {/* Premium Hamburger Toggle */}
            <button 
              id="hamburger-btn"
              className="w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center gap-1.5 cursor-pointer select-none transition-all duration-300 border border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0 group"
              onClick={() => setSideMenuOpen(true)}
            >
              <div className="flex flex-col items-end gap-[5px] w-5">
                <span className="w-5 h-[2px] bg-ink rounded-full transition-all duration-300 group-hover:bg-[#DE1C4D]" />
                <span className="w-3.5 h-[2px] bg-ink rounded-full transition-all duration-300 group-hover:bg-[#DE1C4D] group-hover:w-5" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Side Menu Overlay Drawer */}
      <AnimatePresence>
        {sideMenuOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSideMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-ink/30 backdrop-blur-sm"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 33, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[70] shadow-[0_0_60px_rgba(0,0,0,0.15)] sm:rounded-l-[40px] flex flex-col justify-between p-8 sm:p-12 overflow-y-auto"
              data-lenis-prevent
            >
              {/* Top Drawer Header with Close Button */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DE1C4D] animate-pulse" />
                  <span className="text-xs uppercase tracking-widest font-normal text-[#121212]">NAVIGATION</span>
                </div>
                <button 
                  id="side-menu-close"
                  onClick={() => setSideMenuOpen(false)}
                  className="w-10 h-10 rounded-full bg-[#F5F5F7] hover:bg-[#E8E8ED] flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm border border-black/5"
                >
                  <X size={18} className="text-ink" />
                </button>
              </div>

              {/* Large Navigation Links */}
              <div className="flex flex-col gap-5 py-2">
                {mainLinks.map((link) => (
                  <div 
                    key={link.label}
                    onClick={() => {
                      setSideMenuOpen(false);
                      const lenis = (window as any).lenis;
                      if (lenis) {
                        lenis.start();
                      }
                      
                      setTimeout(() => {
                        const target = document.querySelector(link.href);
                        if (target) {
                          if (lenis) {
                            lenis.scrollTo(target, { duration: 1.2 });
                          } else {
                            target.scrollIntoView({ behavior: 'smooth' });
                          }
                        }
                      }, 100);
                    }}
                    className="flex items-center justify-start py-1.5 group cursor-pointer"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl md:text-4xl font-light tracking-tight text-[#111] group-hover:text-[#DE1C4D] group-hover:font-medium transition-all duration-300">
                        {link.label}
                      </span>
                      <span className="text-[10px] font-sans text-ink/40 ml-1 group-hover:text-[#DE1C4D] transition-colors">{link.num}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cover Letter & Resume Grid Section removed from here */}

              {/* Creative Project CTA with WhatsApp */}
              <div className="bg-[#F5F5F7]/80 p-[14px] rounded-3xl border border-black/[0.03] my-4">
                <h4 className="text-slate-950 font-semibold text-[15px] mb-3">Lets have a quick chat.</h4>
                <a 
                  href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setSideMenuOpen(false)}
                  className="cursor-pointer bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#2ecc71] hover:to-[#1abc9c] text-white py-2.5 px-5 rounded-full flex items-center justify-between select-none relative overflow-hidden group/talk transition-all duration-300 shadow-[0_6px_15px_rgba(37,211,102,0.3),inset_0_-2px_0_rgba(0,0,0,0.15)] hover:shadow-[0_10px_22px_rgba(37,211,102,0.45),inset_0_-2px_0_rgba(0,0,0,0.15)] hover:-translate-y-0.5"
                >
                  <span className="font-normal text-sm pl-1">Say Hii!</span>
                  <WhatsAppIcon size={20} />
                </a>
              </div>

              {/* View Resume & Cover Letter stacked at the bottom */}
              <div className="flex flex-col gap-3 mt-2 mb-4">
                <motion.a 
                  href="https://drive.google.com/file/d/18MAWgK4jLlFAnEy8ORVvHVmUfRCDslWk/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-[#FF2A54] via-[#DE1C4D] to-[#B60E36] hover:from-[#DE1C4D] hover:to-[#9A0B31] text-white text-xs md:text-sm font-medium rounded-full text-center flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_4px_10px_rgba(222,28,77,0.2),inset_0_-1px_0_rgba(0,0,0,0.12)] hover:shadow-[0_6px_16px_rgba(222,28,77,0.3)] select-none cursor-pointer"
                >
                  <FileText size={14} /> View Resume <ArrowUpRight size={14} />
                </motion.a>
                <motion.a 
                  href="https://drive.google.com/file/d/1N5huXNJN99LOMFtFcMoA4MCjsgg5-wXh/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, borderColor: "#DE1C4D", color: "#DE1C4D" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 bg-white text-ink border-2 border-ink font-medium text-xs md:text-sm rounded-full text-center flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer"
                >
                  <Mail size={14} /> Cover Letter <ArrowUpRight size={14} />
                </motion.a>
              </div>

              {/* Bottom Footer Social Media Icons */}
              <div className="flex items-center justify-between pt-5 border-t border-black/5 mt-auto">
                <span className="text-xs text-[#121212] font-normal tracking-wider uppercase">CONNECT</span>
                <div className="flex items-center gap-2.5">
                  {socials.map((soc) => (
                    <a 
                      key={soc.label}
                      href={soc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#DE1C4D] text-[#555] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm border border-black/5"
                      title={soc.label}
                    >
                      {soc.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

// Liquid particle-based canvas that responds to hover and interacts like fluid/water
const LiquidCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Structure list of fluid liquid elements that swell, morph, and flow
    interface Blob {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      baseX: number;
      baseY: number;
      angle: number;
      speed: number;
    }

    const blobs: Blob[] = [
      {
        x: width * 0.25,
        y: height * 0.35,
        vx: 0,
        vy: 0,
        radius: Math.min(width, height) * 0.28,
        color: "rgba(222, 28, 77, 0.16)", // Brand accent color
        baseX: width * 0.25,
        baseY: height * 0.35,
        angle: Math.random() * Math.PI * 2,
        speed: 0.007,
      },
      {
        x: width * 0.75,
        y: height * 0.65,
        vx: 0,
        vy: 0,
        radius: Math.min(width, height) * 0.32,
        color: "rgba(96, 6, 25, 0.32)", // Burgundy/red dark blend
        baseX: width * 0.75,
        baseY: height * 0.65,
        angle: Math.random() * Math.PI * 2,
        speed: 0.005,
      },
      {
        x: width * 0.5,
        y: height * 0.5,
        vx: 0,
        vy: 0,
        radius: Math.min(width, height) * 0.22,
        color: "rgba(255, 42, 84, 0.12)",
        baseX: width * 0.5,
        baseY: height * 0.5,
        angle: Math.random() * Math.PI * 2,
        speed: 0.012,
      },
    ];

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const container = canvas.parentElement; // Uses bento container bounds
    if (container) {
      container.addEventListener("mousemove", onMouseMove);
      container.addEventListener("mouseleave", onMouseLeave);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Interpolate mouse movement with speed inertia
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      // Enable liquid screen additive layering
      ctx.globalCompositeOperation = "screen";

      blobs.forEach((blob) => {
        // Organic sinusoidal floating
        blob.angle += blob.speed;
        const driftX = Math.cos(blob.angle) * 35;
        const driftY = Math.sin(blob.angle) * 25;

        const targetX = blob.baseX + driftX;
        const targetY = blob.baseY + driftY;

        if (mouse.active) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.min(width, height) * 0.45;

          if (dist < maxDist) {
            // Liquid magnetism: warp, repel or pull gently
            const ratio = 1 - dist / maxDist;
            const force = ratio * ratio * 0.15;
            blob.vx += dx * force;
            blob.vy += dy * force;
          }
        }

        // Apply drag/friction so particles settle smoothly
        blob.vx *= 0.84;
        blob.vy *= 0.84;

        blob.x += blob.vx;
        blob.y += blob.vy;

        // Restore back to original anchor point
        blob.x += (targetX - blob.x) * 0.035;
        blob.y += (targetY - blob.y) * 0.035;

        // Radial gradient blend
        const grad = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.radius
        );
        grad.addColorStop(0, blob.color);
        grad.addColorStop(0.5, blob.color.replace("0.", "0.05"));
        grad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Liquid cursor tracking blob
      if (mouse.active) {
        const cursorRadius = Math.min(width, height) * 0.35;
        const cursorGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          cursorRadius
        );
        cursorGrad.addColorStop(0, "rgba(222, 28, 77, 0.28)");
        cursorGrad.addColorStop(0.4, "rgba(96, 6, 25, 0.12)");
        cursorGrad.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = cursorGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, cursorRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", onMouseMove);
        container.removeEventListener("mouseleave", onMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
};

const Hero = ({ onViewWork }: { onViewWork: () => void }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -70]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <section id="home" className="relative h-[1039px] md:h-[1040px] flex items-center justify-center overflow-hidden bg-bg p-3 sm:p-5 md:p-8 pt-[80px] md:pt-24 select-none">
      
      {/* Immersive Dark Gradient bento card frame with 45-degree angle or 0A0A0C to 7B0B27 layout */}
      <div className="absolute inset-x-3 sm:inset-x-5 md:inset-x-8 top-[80px] md:top-24 bottom-3 sm:bottom-5 md:bottom-8 h-[958px] md:h-auto bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] rounded-[32px] md:rounded-[48px] border border-[#DE1C4D]/25 overflow-hidden shadow-none z-0">
        
        {/* Interactive Liquid Canvas layer */}
        <LiquidCanvas />

        {/* Dynamic ambient grid overlay inside the frame */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[2]" />
        
        {/* Subtle noise/grain texture */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-[3]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Soft radial spot-light behind heading */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-[#FF2D6F]/12 to-transparent blur-[70px] pointer-events-none z-[1]" />

        {/* Soft radial glow to stabilize background depth */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[35%] bg-gradient-radial from-[#DE1C4D]/10 to-transparent blur-[80px] pointer-events-none z-[2]" />

        {/* Peeking Bottom Center Portrait and Backdrop Card - positioned inside bento card for perfect bottom flush clipping */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full sm:w-[300px] md:w-[510px] h-[340px] sm:h-[266px] bg-transparent rounded-t-[20px] sm:rounded-t-[32px] md:rounded-t-[40px] flex items-end justify-center z-10 select-none overflow-hidden pointer-events-none"
        >
          <motion.img 
            src="/image/myimg.webp" 
            alt="Aman peeking portrait" 
            className="w-full sm:w-[300px] md:w-[510px] h-auto object-cover grayscale brightness-[0.95] translate-y-3 hover:scale-[1.04] transition-all duration-500 ease-out will-change-transform"
            referrerPolicy="no-referrer"
          />
        </motion.div>

      </div>

      <motion.div 
        style={{ y, opacity, scale }}
        className="w-full max-w-[1400px] px-0 text-center z-10 flex flex-col items-center justify-center relative mt-16 md:mt-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center relative w-full pt-0 h-[800px] md:h-[615px]"
        >
          {/* Top red elegant sub-title exactly as designed */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="text-[#DE1C4D] font-serif italic text-[22px] md:text-[35px] font-bold tracking-wide mb-3 select-none"
            style={{ fontFamily: "Playfair Display, Libre Baskerville, serif", fontWeight: 'bold', color: '#DE1C4D' }}
          >
            Hey, I am Aman
          </motion.div>

          {/* Bold Core Heading: Product Designer in Semibold as requested */}
          <motion.h1
            className="text-white text-[64px] sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[145px] font-semibold tracking-[-0.04em] leading-[64.2px] sm:leading-[0.9] mb-8 select-none font-sans drop-shadow-[0_2px_12px_rgba(255,255,255,0.06)] flex flex-col sm:flex-row flex-wrap items-center justify-center sm:gap-x-4 md:gap-x-6 overflow-visible"
            style={{ marginBottom: '32px' }}
          >
            {[{ word: "Product", startIdx: 0 }, { word: "Designer", startIdx: 8 }].map(({ word, startIdx }, wordIdx) => (
              <span key={wordIdx} className="block sm:inline-block whitespace-nowrap">
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + (startIdx + charIdx) * 0.05, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: "inline-block" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Descriptive text lines centered with large line height and max width */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-col gap-1 items-center mb-8 md:mb-14 max-w-[90%] md:max-w-[900px] mx-auto text-center"
          >
            <p className="text-white text-[16px] sm:text-[20px] md:text-[24px] font-normal tracking-wide leading-relaxed" style={{ borderColor: '#ffffff', color: '#ffffff' }}>
              Product Thinking, UX Research, Design System, User/Human Centric Design, AI Powered Workflow, Vibe Coding
            </p>
          </motion.div>

          {/* Wide premium transparent glassmorphism capsule container wrapping descriptors and Say hellooo action */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8 md:gap-14 border border-[#adadad] bg-transparent rounded-[28px] sm:rounded-full p-[16px] sm:p-4 md:p-8 w-[324px] sm:max-w-none sm:w-[306px] md:w-[auto] shadow-none backdrop-blur-xl z-20 pointer-events-auto mx-0 sm:mx-auto"
            style={{}}
          >
            <div 
              className="text-center sm:text-left py-0.5 sm:pr-6 md:pr-10 select-none pb-2 sm:pb-0"
            >
              <div className="text-[#d3d3d3] text-[14px] font-normal font-sans tracking-wide leading-normal">
                Designing products people understand.
              </div>
              <div className="text-[#d3d3d3] text-[14px] font-normal font-sans tracking-wide leading-normal">
                Building systems teams can scale.
              </div>
            </div>

            <motion.a 
              href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-[279px] md:w-[200px] py-3 sm:py-3 mx-auto max-w-[280px] sm:max-w-none bg-gradient-to-r from-[#FF2A54] via-[#DE1C4D] to-[#B60E36] hover:from-[#DE1C4D] hover:to-[#9A0B31] text-white text-sm md:text-base font-normal rounded-full transition-all duration-300 shadow-[0_4px_12px_rgba(222,28,77,0.25),0_2px_5px_rgba(222,28,77,0.12),inset_0_-1px_0_rgba(0,0,0,0.12)] hover:shadow-[0_6px_16px_rgba(222,28,77,0.35),0_3px_8px_rgba(222,28,77,0.18),inset_0_-1px_0_rgba(0,0,0,0.12)] select-none cursor-pointer flex items-center justify-center gap-2 text-center"
              style={{ fontWeight: 'normal', fontSize: '16px' }}
            >
              <span>Say hellooo</span>
              <ArrowUpRight size={18} />
            </motion.a>
          </motion.div>



        </motion.div>
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
            <div className="w-1.5 h-1.5 rounded-full bg-accent/40 blur-[1px]" />
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
    <section className="py-32 md:py-48 bg-bg relative z-10 w-full">
      <div className="container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row bg-bg rounded-[24px] md:rounded-[32px] overflow-hidden shadow-sm border border-border"
        >
          {/* Left colored part */}
          <div className="w-full md:w-1/3 bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] grid place-items-center min-h-[200px] md:min-h-[280px] relative overflow-hidden">
            <span className="text-[200px] md:text-[280px] font-black text-white leading-none select-none transform -translate-y-[0.08em]">
              a
            </span>
          </div>
          {/* Right text part */}
          <div className="w-full md:w-2/3 p-3 md:p-12 flex flex-col justify-center items-start">
            <h3 className="text-xl md:text-4xl font-semibold text-ink mb-4 md:mb-6 leading-tight md:leading-[1.1] tracking-tighter">
              This is just a part of my work.
            </h3>
            <p className="text-ink/60 text-base md:text-xl font-normal leading-relaxed mb-8 md:mb-12 max-w-xl">
              There’s more to explore. You’ll find more projects, flows, and explorations here.
            </p>
            <motion.a 
              href="https://www.figma.com/design/ZE2zBJKz1u6qJPuIkZtGC6/Aman-s-All-Work-file?node-id=136-2212&t=qsSuV2jRqm8mzsmU-1"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, borderColor: "#DE1C4D", color: "#DE1C4D" }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 md:px-8 md:py-3 rounded-full border-2 border-ink text-ink text-base md:text-lg font-medium transition-all duration-300 flex items-center gap-2 group/workbtn cursor-pointer"
            >
              Explore more work <ArrowUpRight size={18} />
            </motion.a>
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
        "--card-top": `${80 + (index * 24)}px`,
        zIndex: index + 1,
        scale,
        opacity,
        transformOrigin: "top center"
      } as React.CSSProperties}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      className="md:sticky relative md:[top:var(--card-top)] group bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] rounded-[24px] md:rounded-[32px] shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(222,28,77,0.25)] transition-all duration-700 flex flex-col md:flex-row items-stretch cursor-pointer border border-[#DE1C4D]/20 h-auto md:h-[460px] lg:h-[500px] xl:h-[560px] 2xl:h-[640px] p-4 sm:p-5 md:p-6 lg:p-8 gap-5 md:gap-8 lg:gap-10 overflow-hidden"
    >
      {/* Text Content */}
      <div className="w-full md:w-[38%] flex flex-col justify-between p-0 bg-transparent relative z-10 order-2 md:order-1">
        <div className="max-w-xl flex flex-col h-full justify-between py-1 md:py-2">
          <div>
            <h3 className="text-[22px] sm:text-2xl md:text-2xl lg:text-[26px] xl:text-3xl 2xl:text-[36px] font-medium text-white mb-2 md:mb-2 lg:mb-3 leading-tight tracking-tight">
              {project.title}
            </h3>
            {project.subtext && (
              <p className="text-[14px] sm:text-[14px] md:text-[15px] lg:text-[16px] font-medium text-white/90 mb-3 md:mb-5 lg:mb-6">
                {project.subtext}
              </p>
            )}
            <p className="text-[12px] sm:text-[14px] font-normal text-[#cfcfcf] leading-relaxed max-w-sm md:max-w-none mb-6">
              {project.description}
            </p>
            
            {project.tags && project.tags.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 text-white/90 text-xs rounded-full border border-white/10">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-5 md:mt-auto">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-max px-6 py-3 md:py-3.5 bg-white text-[#0A0A0C] font-semibold text-sm rounded-full transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 shadow-sm relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-accent translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300 pointer-events-none" />
              <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
                {project.buttonLabel || (project.hasCaseStudy ? "View Case Study" : "View Project")}
              </span>
              <ArrowUpRight size={18} className="relative z-10 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Content */}
      <div className="w-full md:w-[62%] h-[240px] sm:h-[300px] md:h-full overflow-hidden relative shrink-0 rounded-[16px] md:rounded-[24px] lg:rounded-[28px] order-1 md:order-2 bg-white/5 border border-white/10 [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        <ResponsiveImage 
          src={project.image} 
          alt={project.title} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 65vw, 850px"
          priority={index === 0}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out [backface-visibility:hidden] [transform:translate3d(0,0,0)] [image-rendering:-webkit-optimize-contrast] will-change-transform" 
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>
    </motion.div>
  );
};

const MinorProjectCard = ({ project, onClick }: { project: Project, onClick: (p: Project) => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(project)}
      className="group bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] rounded-[24px] md:rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(222,28,77,0.25)] transition-all duration-500 cursor-pointer border border-[#DE1C4D]/25 flex flex-col h-full overflow-hidden p-3 md:p-4 lg:p-5"
    >
      <div className="w-full h-[240px] md:h-[280px] lg:h-[320px] overflow-hidden relative rounded-[18px] md:rounded-[24px] lg:rounded-[28px] bg-white/5 border border-white/10 shrink-0 [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
        <ResponsiveImage 
          src={project.image} 
          alt={project.title} 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out [backface-visibility:hidden] [transform:translate3d(0,0,0)] [image-rendering:-webkit-optimize-contrast] will-change-transform" 
        />
        <div className="absolute inset-0 bg-black/15 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>
      
      <div className="flex flex-col flex-1 pt-5 md:pt-6 pb-2 justify-between">
        <div>
          <h3 className="text-[22px] md:text-[24px] lg:text-[28px] font-medium text-white mb-3 leading-tight tracking-tight">
            {project.title}
          </h3>
          <p className="text-[12px] sm:text-base font-normal text-[#cfcfcf] leading-relaxed">
            {project.description}
          </p>
        </div>
        <div className="mt-8">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-max px-6 py-3 bg-white text-[#0A0A0C] font-semibold rounded-full transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 shadow-sm relative overflow-hidden group/btn text-[14px] md:text-[15px]"
          >
            <div className="absolute inset-0 bg-accent translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-300 pointer-events-none" />
            <span className="relative z-10 group-hover/btn:text-white transition-colors duration-300">
              {project.buttonLabel || (project.externalLink?.includes('medium.com') ? "Read On Medium" : "View Project")}
            </span>
            <ArrowUpRight size={16} className="relative z-10 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const WorkSection = ({ onSelectProject }: { onSelectProject: (p: Project) => void }) => {
  const handleProjectClick = (project: Project) => {
    if (project.externalLink) {
      window.open(project.externalLink, '_blank');
      return;
    }
    if (project.pdfUrl) {
      window.open(`${project.pdfUrl}#toolbar=0`, '_blank');
    } else {
      onSelectProject(project);
    }
  };

  return (
    <section id="work" className="relative z-20 bg-bg py-32 md:py-48 overflow-x-clip w-full px-3 md:px-0">
      <div className="container-wide max-sm:!px-0">
        <div className="mb-16 md:mb-24 text-left w-full">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
              hidden: {}
            }}
            className="text-5xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight w-full"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {"Things I’ve".split(" ").map((word, index) => (
              <span key={`w1-${index}`} className="inline-flex overflow-hidden mr-[0.25em] pt-2 pb-6 -mt-2 -mb-6 align-bottom">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: "150%" },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            {"worked deeply on".split(" ").map((word, index) => (
              <span key={`w2-${index}`} className="inline-flex overflow-hidden mr-[0.25em] pt-2 pb-6 -mt-2 -mb-6 align-bottom text-accent">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: "150%" },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h2>
        </div>

        <div className="flex flex-col gap-6 md:gap-32 relative pb-24 md:pb-32">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              onClick={handleProjectClick} 
            />
          ))}
        </div>

        <div className="mb-12 md:mb-16 mt-8 text-left w-full">
          <motion.h3 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
              hidden: {}
            }}
            className="text-5xl md:text-[72px] font-medium leading-tight tracking-tight w-full"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {"Other things".split(" ").map((word, index) => (
              <span key={`w1-${index}`} className="inline-flex overflow-hidden mr-[0.25em] pt-2 pb-6 -mt-2 -mb-6 align-bottom">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: "150%" },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br />
            {"on my desk".split(" ").map((word, index) => (
              <span key={`w2-${index}`} className="inline-flex overflow-hidden mr-[0.25em] pt-2 pb-6 -mt-2 -mb-6 align-bottom text-accent">
                <motion.span
                  variants={{
                    hidden: { opacity: 0, y: "150%" },
                    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {MINOR_PROJECTS.map((project) => (
            <div key={project.id} className="w-full">
              <MinorProjectCard 
                project={project} 
                onClick={handleProjectClick} 
              />
            </div>
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
      duration: 1.8,
      easing: (t) => 1 - Math.pow(1 - t, 5), // Premium quintic ease-out for ultra-buttery inertial scroll stops
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.8,
      infinite: false,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);
    
    // Force lenis to start at top on initial load
    lenis.scrollTo(0, { immediate: true });

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
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
    if (project.externalLink) {
      window.open(project.externalLink, '_blank');
      return;
    }
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
      const project = [...PROJECTS, ...MINOR_PROJECTS].find(p => p.title.toLowerCase().replace(/\s+/g, '-') === projectSlug);
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
            {selectedProject.id === 11 || selectedProject.id === 10 ? (
              <SparrowCaseStudy 
                project={selectedProject} 
                onClose={() => {
                  setSelectedProject(null);
                  window.history.pushState(null, '', '/');
                }} 
              />
            ) : selectedProject.id === 1 ? (
              <TechBayLeafCaseStudy 
                project={selectedProject} 
                onClose={() => {
                  setSelectedProject(null);
                  window.history.pushState(null, '', '/');
                }} 
              />
            ) : selectedProject.id === 8 ? (
              <ElegantDiningCaseStudy 
                project={selectedProject} 
                onClose={() => {
                  setSelectedProject(null);
                  window.history.pushState(null, '', '/');
                }} 
              />
            ) : null}
          </Suspense>
        )}
      </AnimatePresence>

      <main>
        <Hero 
          onViewWork={() => setShowWorkPage(true)} 
        />
        <WorkSection onSelectProject={handleSelectProject} />
        <MoreWorkBanner />
        <Suspense fallback={<div className="h-20" />}>
          <OwnershipSection />
          <TestimonialsSection />
          <WhyMeSection />
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
