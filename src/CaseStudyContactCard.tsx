import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const CaseStudyContactCard = () => {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-12 lg:px-24">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto w-full bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] rounded-[24px] md:rounded-[32px] p-6 md:p-16 border border-[#DE1C4D]/25 relative overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        {/* Dynamic lining grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />
        <div className="relative z-10 text-left text-white w-full">
          <h2 
            className="text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-6 md:mb-8 w-full"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Let’s build something that<br />
            <span className="text-white/90">actually works.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-start justify-start gap-4">
            <a
              href="https://wa.me/917225905369?text=Hello%20Aman%2C%0A%0AI%20recently%20reviewed%20your%20portfolio%20and%20was%20impressed%20with%20your%20experience%20and%20approach%20to%20product%20design.%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20potential%20opportunity%20and%20explore%20how%20your%20skills%20align%20with%20our%20current%20requirements.%20I%20would%20appreciate%20the%20chance%20to%20connect%20and%20discuss%20this%20further%20at%20your%20convenience.%0A%0APlease%20let%20me%20know%20a%20suitable%20time%20for%20a%20conversation.%0A%0AThank%20you."
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white text-[#0A0A0C] font-semibold rounded-full flex items-center gap-2 hover:bg-gray-100 transition-all duration-300"
            >
              Let's Connect <ArrowUpRight size={20} />
            </a>
          </div>
          <div className="mt-8 text-white/70">
            Mail : <a href="mailto:chourasiyaaman76@gmail.com" className="text-white hover:underline underline-offset-4">chourasiyaaman76@gmail.com</a>
          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudyContactCard;
