import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Mail, Phone } from 'lucide-react';

const Hero = ({ onViewWork }: { onViewWork: () => void }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.9]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
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
                loading="lazy"
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
            ].map((tab) => (
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
          loading="lazy"
          src="/image/mock_hero_img_3x.webp" 
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
          loading="lazy"
          src="/image/my_hero_img_3x.webp" 
          alt="Aman Chourasiya Work" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-accent/10 group-hover:bg-transparent transition-colors duration-500" />
      </motion.div>
      
    </section>
  );
};

export default Hero;
