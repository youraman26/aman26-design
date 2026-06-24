import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail, Linkedin, Dribbble, ArrowUp } from 'lucide-react';

const ContactSection = () => {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="bg-white pt-[192px] pb-32 md:pb-48 relative overflow-hidden w-full">
      {/* Huge Background Text */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none select-none opacity-[0.03] z-0">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[45vw] md:text-[40vw] xl:text-[35vw] font-bold text-black leading-none lowercase tracking-tight"
        >
          aman
        </motion.h2>
      </div>

      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />
      
      <div className="w-full max-w-none px-3 sm:px-5 md:px-8 relative z-10 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-[1850px] mx-auto bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] rounded-[32px] md:rounded-[60px] overflow-hidden border border-[#DE1C4D]/25 relative shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col"
        >
          {/* Subtle Shine Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

          {/* Dynamic lining grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />

        <div className="text-left w-full relative z-10 container-wide py-12 md:py-24">
          <motion.img 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/image/mylogo.webp" 
            alt="Aman"
            referrerPolicy="no-referrer"
            className="w-[52px] h-[52px] rounded-full object-cover border border-[#DE1C4D]/30 shadow-[0_4px_15px_rgba(222,28,77,0.35)] mb-8"
          />
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
              hidden: {}
            }}
            className="text-5xl md:text-[72px] font-medium text-white leading-tight md:leading-[1.1] tracking-tight w-full mb-6 md:mb-8"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {"Let’s build something that".split(" ").map((word, index) => (
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
            {"actually works.".split(" ").map((word, index) => (
              <span key={`w2-${index}`} className="inline-flex overflow-hidden mr-[0.25em] pt-2 pb-6 -mt-2 -mb-6 align-bottom text-white/90">
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

          <div className="flex flex-col items-start gap-8 mb-10 md:mb-16 w-full">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-white/70 text-base md:text-lg max-w-xl md:max-w-[800px] leading-relaxed m-0"
            >
              Thanks for scrolling. If you’re looking for someone who thinks beyond interfaces and designs with users, business, and growth in mind, I’d love to connect.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="border border-white/15 bg-white/[0.02] backdrop-blur-md rounded-[28px] p-4 flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto shrink-0 z-10"
            >
              <motion.a
                href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you."
                target="_blank" 
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 md:px-8 py-3 bg-white text-ink font-medium rounded-full flex items-center justify-center gap-3 transition-all duration-300 group text-base md:text-lg relative overflow-hidden cursor-pointer"
                style={{ fontSize: '16px' }}
              >
                <motion.span 
                  variants={{
                    initial: { x: "-100%" },
                    hover: { x: 0 }
                  }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                  className="absolute inset-0 w-full h-full bg-ink pointer-events-none" 
                />
                <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                  Let's Connect
                  <motion.span
                    variants={{
                      initial: { x: 0 },
                      hover: { x: 2, y: -2 }
                    }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.span>
                </span>
              </motion.a>
              
              <motion.a
                href="mailto:chourasiyaaman76@gmail.com"
                whileHover={{ scale: 1.02, background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 md:px-8 py-3 bg-transparent border-2 border-white/20 text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center text-base md:text-lg cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">Mail Me <ArrowUpRight size={20} /></span>
              </motion.a>
            </motion.div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-start gap-8">
            <div className="flex items-center justify-start gap-5">
              <a href="https://www.linkedin.com/in/amanux26" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-white text-white flex items-center justify-center hover:bg-white/10 transition-all">
                <Linkedin size={22} strokeWidth={1.5} />
              </a>
              <a href="https://x.com/aman26ux" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-white text-white flex items-center justify-center hover:bg-white/10 transition-all">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" className="w-[22px] h-[22px]">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://medium.com/@chourasiyaaman76" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full border border-white text-white flex items-center justify-center hover:bg-white/10 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6.5" cy="12" r="6.5" />
                  <ellipse cx="17.5" cy="12" rx="3.5" ry="6.5" />
                  <ellipse cx="23" cy="12" rx="1" ry="5.5" />
                </svg>
              </a>
            </div>
          </div>
          </div>
        </motion.div>

        {/* Rotating "Back to Top" Button outside the contact card */}
        <div className="mt-16 flex flex-col items-center">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center group">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="transparent"
                />
                <text className="text-[10px] font-medium uppercase tracking-[0.2em] fill-ink/40 group-hover:fill-[#DE1C4D] transition-colors">
                  <textPath xlinkHref="#circlePath">
                    Thanks for your time • 
                  </textPath>
                </text>
              </svg>
            </motion.div>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10 w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-ink border border-ink/10 flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] text-white hover:bg-[#DE1C4D] hover:border-[#DE1C4D] transition-all shadow-xl shadow-black/20 text-center leading-tight cursor-pointer"
            >
              Back to top
            </motion.button>
          </div>
        </div>

      </div>

      <style>{`
        .font-script {
          font-family: var(--font-script);
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
