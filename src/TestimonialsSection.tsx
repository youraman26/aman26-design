import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from './constants';

const TestimonialsSection = () => {
  return (
    <section className="bg-white py-16 md:py-32 overflow-hidden">
      <div className="container-wide px-6 mb-12 md:mb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          A few words from <span className="italic-serif font-normal text-accent">people I’ve worked with</span>
        </h2>
        <p className="text-muted text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed">
          A few words from people I’ve worked with
        </p>
      </div>
      
      <div className="flex gap-4 md:gap-8 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
          <div key={i} className="inline-block w-[300px] md:w-[400px] p-6 md:p-8 bg-bg rounded-[24px] md:rounded-[32px] border border-border whitespace-normal">
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
              <img loading="lazy" src={t.avatar} alt={t.name} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-bold text-xs md:text-sm">{t.name}</h4>
                <p className="text-[10px] md:text-xs text-muted">{t.role}</p>
              </div>
            </div>
            <p className="text-ink/80 text-xs md:text-sm italic leading-relaxed">"{t.content}"</p>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
