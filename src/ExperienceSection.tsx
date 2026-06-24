import React, { FC } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, Experience } from './constants';

interface ExperienceCardProps {
  exp: Experience;
  i: number;
}

const ExperienceCard: FC<ExperienceCardProps> = ({ exp, i }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        delay: i * 0.1,
        ease: "easeOut"
      }}
      className="relative flex h-full group"
    >
      <div className="w-full bg-white/40 hover:bg-white backdrop-blur-sm rounded-[24px] p-3 md:p-6 lg:p-8 border border-border/40 hover:border-border shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
        {/* Card Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
            <div className="text-[10px] sm:text-xs font-semibold tracking-[0.1em] text-ink/40 uppercase">
              {exp.period}
            </div>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-medium text-ink mb-2 leading-tight">{exp.role}</h3>
          <p className="text-sm font-medium text-ink/60">{exp.company}</p>
        </div>

        {/* Card Footer */}
        <div className="pt-5 border-t border-border/30 flex items-center justify-between mt-auto">
          <div className="text-[10px] font-semibold tracking-[0.1em] text-ink/40 uppercase">
            {exp.location}
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20 group-hover:bg-accent/40 transition-colors" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20 group-hover:bg-accent/70 transition-colors delay-75" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20 group-hover:bg-accent transition-colors delay-150" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-[#F8F8F8] py-32 md:py-48 overflow-hidden relative w-full">
      <div className="container-wide relative">
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
            {"My growth through".split(" ").map((word, index) => (
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
            {"experience".split(" ").map((word, index) => (
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

        <div className="relative w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-stretch">
            {EXPERIENCES.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} i={i} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 md:mt-32 text-center"
        >
          <motion.a
            href="https://drive.google.com/file/d/1PqPwi_zIHhfrCgeqNWZXvnYeNsKj32et/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-6 py-1.5 md:px-8 md:py-2.5 bg-ink text-white font-medium rounded-full transition-all duration-300 text-[18px] relative overflow-hidden group"
          >
            <motion.span 
              variants={{
                initial: { x: "-100%" },
                hover: { x: 0 }
              }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="absolute inset-0 w-full h-full bg-accent pointer-events-none" 
            />
            <span className="relative z-10 flex items-center gap-2">
              View Full Resume
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
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
