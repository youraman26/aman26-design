import React, { FC } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, Experience } from './constants';

interface ExperienceCardProps {
  exp: Experience;
  i: number;
}

const ExperienceCard: FC<ExperienceCardProps> = ({ exp, i }) => {
  const isEven = i % 2 === 0;
  
  // Subtle rotations for the "scattered" look from the image
  const rotations = [-2, 1.5, -1, 2];
  const rotation = rotations[i % rotations.length];

  return (
    <motion.div 
      initial={{ opacity: 0, x: isEven ? -50 : 50, rotate: 0 }}
      whileInView={{ opacity: 1, x: 0, rotate: rotation }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: i * 0.1,
        type: "spring",
        stiffness: 50
      }}
      className={`relative w-full flex ${isEven ? 'justify-start' : 'justify-end'} mb-8 md:mb-12 lg:mb-14`}
    >
      {/* Connecting Dot on the Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full z-30 hidden lg:block shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]" />
      
      <div className={`w-full lg:w-[40%] bg-white rounded-[32px] md:rounded-[40px] p-6 md:p-8 border border-border shadow-xl shadow-ink/5 flex flex-col group hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
        {/* Card Header */}
        <div className="mb-6">
          <div className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-accent uppercase mb-3">
            {exp.period}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-ink mb-4 leading-tight">{exp.role}</h3>
          
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <span className="text-muted/60 font-medium">Company:</span>
              <span className="text-ink/80 font-bold">{exp.company}</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="pt-6 border-t border-border/50 flex items-center justify-between mt-auto">
          <div className="text-[10px] md:text-xs font-medium tracking-[0.2em] text-muted/40 uppercase">
            {exp.location}
          </div>
          <div className="flex gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-muted/20" />
          </div>
        </div>

        {/* Subtle texture overlay to match the "physical card" feel */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-[#F8F8F8] py-16 md:py-24 px-6 md:px-12 lg:px-24 overflow-hidden relative">
      <div className="container-wide relative">
        <div className="mb-12 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">The Journey</span>
            <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.1] tracking-tight max-w-4xl mx-auto mb-8">
              My growth through <span className="italic-serif font-normal text-accent">experience</span>
            </h2>
            <p className="text-muted text-base md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
              From early explorations to building scalable products. Each role sharpened my approach to product thinking, systems, and real-world problem solving.
            </p>
          </motion.div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Central Vertical Journey Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent hidden lg:block" />
          
          <div className="flex flex-col relative z-10">
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
            href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-ink text-white font-bold rounded-full shadow-2xl hover:bg-accent transition-colors duration-300 text-sm md:text-base"
          >
            View Full Resume
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
