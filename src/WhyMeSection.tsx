import { motion } from "motion/react";
import React from "react";

const WhyMeSection = () => {
  return (
    <section className="bg-white py-12 md:py-20 relative overflow-hidden w-full">
      <div className="w-full max-w-none px-3 sm:px-5 md:px-8 relative z-10 flex flex-col items-center justify-center">
        <div 
          className="w-full max-w-[1850px] mx-auto bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] rounded-[32px] md:rounded-[60px] overflow-hidden border border-[#DE1C4D]/25 relative shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
          
          {/* Dynamic lining grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />
          
          <div className="text-left w-full relative z-10 container-wide py-12 md:py-24">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white text-5xl md:text-[64px] font-semibold leading-tight tracking-tight mb-16 w-full"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <span className="text-[#DE1C4D]">Why Me ?</span> How I contribute to a team
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              
              {/* Card 1 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white/[0.04] border border-white/10 rounded-[24px] p-8 md:p-10 flex flex-col items-start min-h-[400px] relative overflow-hidden"
              >
                <h4 className="text-white text-2xl md:text-3xl font-medium leading-tight mb-8 relative z-10 w-[90%]">
                  I don't overcomplicate things; I make them make sense.
                </h4>
                
                <div className="mt-auto relative z-10 w-full pt-8">
                  <div className="flex gap-4 items-end">
                    <div className="w-10 h-10 rounded-full bg-[#EAB308]/20 flex-shrink-0 flex items-center justify-center overflow-hidden border border-[#EAB308]/30">
                      <div className="w-6 h-6 bg-[#EAB308] rounded-full flex items-center justify-center text-[10px]">&nbsp;</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl rounded-bl-sm p-4 text-sm text-white/90 leading-relaxed">
                      Can you tell me about a time when you received constructive feedback?
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4 items-end justify-end">
                    <div className="bg-[#DE1C4D]/30 backdrop-blur-md border border-[#DE1C4D]/40 rounded-2xl rounded-br-sm p-4 text-sm text-white/90 leading-relaxed w-2/3 h-6">
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/[0.04] border border-white/10 rounded-[24px] p-8 md:p-10 flex flex-col items-start min-h-[400px] relative overflow-hidden"
              >
                <h4 className="text-white text-2xl md:text-3xl font-medium leading-tight mb-8 relative z-10 w-[90%]">
                  I take ownership; I don't wait to be told everything
                </h4>
                
                <div className="mt-auto relative z-10 w-full pt-8 flex justify-center translate-y-12">
                  <div className="bg-white rounded-t-xl rounded-b-none p-6 md:p-8 w-[95%] shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex flex-col gap-4 min-h-[180px]">
                    <h5 className="text-ink font-bold text-xl border-b border-border/50 pb-3">Project Manager</h5>
                    <div className="mt-2">
                      <p className="text-ink/60 text-xs font-medium mb-4 uppercase tracking-wider">About the job</p>
                      <div className="w-full h-2 bg-border/80 rounded-full mb-3" />
                      <div className="w-5/6 h-2 bg-border/80 rounded-full mb-3" />
                      <div className="w-4/6 h-2 bg-border/80 rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/[0.04] border border-white/10 rounded-[24px] p-8 md:p-10 flex flex-col items-start min-h-[400px] relative overflow-hidden"
              >
                <h4 className="text-white text-2xl md:text-3xl font-medium leading-tight mb-8 relative z-10">
                  I can coordinate effortlessly with cross functional team.
                </h4>
                
                <div className="mt-auto relative z-10 w-full pt-8 grid grid-cols-2 gap-3 pb-4">
                  <div className="bg-[#EAB308] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg h-[90px]">
                    <div className="w-6 h-2 bg-black/20 rounded-full mb-2" />
                    <span className="text-black font-bold text-sm leading-tight">Project<br/>Manager</span>
                  </div>
                  <div className="bg-[#22C55E] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg h-[90px] translate-y-4">
                    <div className="w-6 h-2 bg-white/40 rounded-full mb-2" />
                    <span className="text-white font-bold text-sm leading-tight">Senior<br/>Designer</span>
                  </div>
                  <div className="bg-[#A855F7] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg h-[90px]">
                    <div className="w-6 h-2 bg-black/20 rounded-full mb-2" />
                    <span className="text-black font-bold text-sm leading-tight">Growth<br/>marketeer</span>
                  </div>
                  <div className="bg-[#EF4444] rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-lg h-[90px] translate-y-4">
                    <div className="w-6 h-2 bg-white/40 rounded-full mb-2" />
                    <span className="text-white font-bold text-sm leading-tight">Full-Stack<br/>Developer</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMeSection;
