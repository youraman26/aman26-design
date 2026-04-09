import React from 'react';
import { motion } from 'motion/react';
import { GALLERY_ITEMS } from './constants';

const GallerySection = () => {
  return (
    <section id="story" className="bg-white py-20 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="container-wide mb-16 md:mb-24 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-ink leading-[1.1] tracking-tight max-w-5xl mx-auto">
          Beyond design files and conversations that start with <span className="italic-serif font-normal text-accent">“just one tweak”</span>
        </h2>
      </div>

      <div className="flex gap-6 md:gap-12 animate-marquee-gallery items-center hover:[animation-play-state:paused] cursor-pointer">
        {[...GALLERY_ITEMS, ...GALLERY_ITEMS].map((item, i) => (
          <div key={i} className="flex-shrink-0 flex flex-col gap-4 md:gap-6 w-[200px] md:w-[280px] group/item">
            {item.position === 'top' && (
              <motion.p 
                whileHover={{ y: -2, color: 'var(--color-accent)' }}
                className="text-[10px] md:text-xs font-medium text-ink/80 leading-relaxed px-2 text-center transition-colors"
              >
                {item.caption}
              </motion.p>
            )}
            
            <motion.div 
              whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
              className="rounded-[20px] md:rounded-[28px] overflow-hidden border border-border shadow-sm aspect-[3/4] relative"
            >
              <img 
                src={item.image} 
                alt={item.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>

            {item.position === 'bottom' && (
              <motion.p 
                whileHover={{ y: 2, color: 'var(--color-accent)' }}
                className="text-[10px] md:text-xs font-medium text-ink/80 leading-relaxed px-2 text-center transition-colors"
              >
                {item.caption}
              </motion.p>
            )}
          </div>
        ))}
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
