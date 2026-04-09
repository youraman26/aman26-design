import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail, Linkedin, Twitter, Dribbble, ArrowUp } from 'lucide-react';

const ContactSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="bg-ink relative overflow-hidden py-32 md:py-60 px-6">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white rounded-[40px] md:rounded-[60px] p-8 md:p-24 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.3)] border border-white/50 relative overflow-hidden"
        >
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-accent/5 pointer-events-none" />

          <div className="relative z-10 text-center">
            <span className="text-accent text-[12px] font-medium uppercase tracking-[0.2em] mb-6 block">Let's Connect</span>
            <h2 className="text-3xl md:text-5xl font-black text-ink mb-10 leading-[1.1] tracking-tight max-w-3xl mx-auto">
              Let’s build something that <span className="italic-serif font-normal text-accent">actually works.</span>
            </h2>
            
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-lg font-normal leading-[1.6] text-ink/80 tracking-tight">
                Looking to <span className="text-accent">improve your product experience</span>? I <span className="text-accent">design and freelance</span> and when I step away from screens, I’m often exploring new environments, observing behavior, and finding patterns in everyday moments that shape how I think about design. <span className="text-accent">Let’s chat.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
              <motion.a
                href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you."
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 md:px-16 py-[18px] md:py-[22px] bg-gradient-to-r from-accent to-blue-600 text-white font-bold rounded-full flex items-center justify-center gap-3 shadow-lg shadow-accent/20 hover:shadow-2xl hover:shadow-accent/40 transition-all duration-300 group text-lg relative overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-500 ease-out skew-x-12" />
                <span className="relative z-10 flex items-center gap-2">Say Hello 👋</span>
              </motion.a>
              
              <motion.a
                href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, backgroundColor: "#f8f8f8" }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-10 md:px-16 py-[18px] md:py-[22px] bg-white border-2 border-ink/10 text-ink font-bold rounded-full shadow-xl shadow-ink/5 hover:shadow-2xl transition-all flex items-center justify-center text-lg"
              >
                <span className="relative z-10 flex items-center gap-2">View Resume <ArrowUpRight size={18} /></span>
              </motion.a>
            </div>
            <div className="mt-8 text-ink/60 font-medium text-lg">
              Mail Me : <a href="mailto:chourasiyaaman76@gmail.com" className="text-accent hover:underline">chourasiyaaman76@gmail.com</a>
            </div>
          </div>
        </motion.div>

        {/* Rotating "Back to Top" Button */}
        <div className="flex flex-col items-center mt-20 md:mt-32">
          <div className="relative w-40 h-40 flex items-center justify-center group">
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
                <text className="text-[10px] font-medium uppercase tracking-[0.2em] fill-white/40 group-hover:fill-accent transition-colors">
                  <textPath xlinkHref="#circlePath">
                    Thanks for your time • 
                  </textPath>
                </text>
              </svg>
            </motion.div>
            <button
              onClick={scrollToTop}
              className="relative z-10 w-20 h-20 rounded-full bg-white border border-border flex items-center justify-center text-[10px] font-bold uppercase tracking-[0.2em] text-ink hover:bg-accent hover:text-white hover:border-accent transition-all shadow-xl shadow-ink/5 text-center leading-tight"
            >
              Back to top
            </button>
          </div>
        </div>

        {/* Huge Background Text at Bottom */}
        <div className="absolute bottom-10 left-0 right-0 w-full text-center pointer-events-none select-none z-0">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.03, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            className="text-[30vw] font-black text-white leading-none lowercase tracking-tighter inline-block"
          >
            aman
          </motion.h2>
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

// --- Main App ---

export default ContactSection;
