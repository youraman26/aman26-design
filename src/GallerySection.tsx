import React from 'react';
import { motion } from 'motion/react';
import { GALLERY_ITEMS } from './constants';
import { ResponsiveImage } from './components/ResponsiveImage';

const GallerySection = () => {
  return (
    <section className="bg-bg py-20 md:py-32 overflow-hidden w-full">
      <div className="container-wide mb-16 md:mb-24 text-left w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight w-full mb-8 md:mb-16"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Beyond design files and conversations<br />
          that start with <span className="text-accent">“just one tweak”</span>
        </motion.h2>
      </div>

      <div className="relative w-full">
        <div className="flex gap-6 md:gap-12 animate-marquee-gallery items-center hover:[animation-play-state:paused] cursor-pointer pb-4">
          {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col gap-4 md:gap-6 w-[200px] md:w-[280px] group/item">
            {item.position === 'top' && (
              <motion.p 
                whileHover={{ y: -2, color: 'var(--color-accent)' }}
                className="text-[14px] md:text-sm font-medium text-ink/80 leading-relaxed px-2 text-center transition-colors"
              >
                {item.caption}
              </motion.p>
            )}
            
            <motion.div 
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className="rounded-[20px] md:rounded-[28px] overflow-hidden border border-border shadow-sm aspect-[3/4] relative"
            >
              <ResponsiveImage 
                src={item.image} 
                alt={item.caption} 
                sizes="(max-width: 768px) 200px, 280px"
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
              />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>

            {item.position === 'bottom' && (
              <motion.p 
                whileHover={{ y: -2, color: 'var(--color-accent)' }}
                className="text-[14px] md:text-sm font-medium text-ink/80 leading-relaxed px-2 text-center transition-colors"
              >
                {item.caption}
              </motion.p>
            )}
          </div>
        ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-gallery {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-gallery {
          display: flex;
          width: fit-content;
          animation: marquee-gallery 50s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee-gallery {
            animation: marquee-gallery 35s linear infinite;
          }
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
// updated
