import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Users, Sparkles, Palette, MessageSquare, ChevronRight } from 'lucide-react';
import { SKILLS, TOOLS } from './constants';

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'tools'>('skills');

  return (
    <section id="skills" className="bg-ink py-32 md:py-64 overflow-hidden relative text-white w-full">
      <div className="container-wide">
        <div className="mb-24 md:mb-32 text-left w-full">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-[72px] font-medium leading-[1.1] tracking-tight py-12 md:py-24 text-white"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            What I bring to<br />
            <span className="text-accent">the table</span>
          </motion.h2>

          {/* Minimal Tabs */}
          <div className="flex justify-center gap-8 md:gap-12 border-b border-white/5 w-fit mx-auto mb-20">
            <motion.button
              onClick={() => setActiveTab('skills')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`pb-4 text-sm md:text-base font-bold tracking-wider uppercase transition-all relative group ${
                activeTab === 'skills' ? 'text-white' : 'text-white/30 hover:text-white/50'
              }`}
            >
              Core design skills
              {activeTab === 'skills' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                />
              )}
            </motion.button>
            <motion.button
              onClick={() => setActiveTab('tools')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`pb-4 text-sm md:text-base font-bold tracking-wider uppercase transition-all relative group ${
                activeTab === 'tools' ? 'text-white' : 'text-white/30 hover:text-white/50'
              }`}
            >
              Tools & software
              {activeTab === 'tools' && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'skills' ? (
            <motion.div
              key="skills-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-6 md:gap-8"
            >
              {SKILLS.map((group, i) => (
                <motion.div 
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white/5 p-3 md:p-10 rounded-[32px] border-l-4 border-white/5 flex flex-col gap-6 group hover:bg-white/[0.08] transition-all duration-500 shadow-xl`}
                >
                  <div className="flex flex-col gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 border border-white/10 group-hover:border-white/20`}>
                      <group.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">{group.category}</h3>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed font-light">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {group.items.map(item => (
                      <div 
                        key={item}
                        className="px-4 py-2 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border bg-white/5 text-white/50 border-white/5 hover:border-white/20 hover:text-white/80"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="tools-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-16"
            >
              {TOOLS.map((categoryGroup, categoryIndex) => (
                <div key={categoryGroup.category} className="space-y-8">
                  <div className="flex items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-black text-white/90 tracking-tight">{categoryGroup.category}</h3>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                    {categoryGroup.items.map((tool, i) => (
                      <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8, shadow: "0 20px 25px -5px rgb(0 0 0 / 0.3)" }}
                        className="bg-white/5 p-3 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/10 flex flex-col items-center justify-center text-center gap-4 group transition-all duration-500"
                      >
                        <div className="p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/5 group-hover:bg-white/10 transition-all duration-500 group-hover:rotate-6 text-white/40 group-hover:text-white">
                          <tool.icon size={28} className="md:w-8 md:h-8" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-sm md:text-base font-bold text-white/90 group-hover:text-white transition-colors">{tool.name}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;
