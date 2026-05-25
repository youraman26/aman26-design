import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CARDS_DATA = [
  {
    index: 0,
    name: "Shibin John",
    role: "Tech Lead @ Hackerkernel",
    content: "Worked together on the same project, and it was a great experience. He understands requirements deeply and focuses on what actually matters for the client. Collaborative, easy to work with, and always open to feedback.",
    avatar: "/image/shibin_jhon_img_2x.webp",
    rotate: "-rotate-[4deg]",
    translateY: "translate-y-[12px]",
  },
  {
    index: 1,
    name: "Lokesh Mali",
    role: "Flutter Developer @ Hackerkernel",
    content: "Highly motivated and takes strong ownership of his work. Has a sharp eye for detail, especially in user journeys and overall experience. Great collaborator; reliable, proactive, and always brings a positive attitude to the team.",
    avatar: "/image/lokesh_mali_2x.webp",
    rotate: "-rotate-[1.5deg]",
    translateY: "-translate-y-[2px]",
  },
  {
    index: 2,
    name: "Aditya Pratap Singh",
    role: "Lead Designer @ Techdome",
    content: "Aman takes time to truly understand the problem before designing. His work is thoughtful, structured, and never overcomplicated. He’s also someone you can collaborate with openly and honestly.",
    avatar: "/image/aditya_singh_2x.webp",
    rotate: "rotate-[2deg]",
    translateY: "translate-y-[8px]",
  },
  {
    index: 3,
    name: "Sahiba Jain",
    role: "HR Manager @ Engineersahab Education",
    content: "Very dependable and easy to work well. He takes ownership, communicates well, and connects naturally with people around him . He brings a calm and positive energy to the team.",
    avatar: "/image/sahiba_jain_img_2x.webp",
    rotate: "-rotate-[1deg]",
    translateY: "-translate-y-[6px]",
  },
  {
    index: 4,
    name: "Monika Nagwani",
    role: "UI/UX Designer & Mentor @ Engineersahab",
    content: "Aman has a very grounded approach to design. He doesn’t get carried away by trends and focuses more on what actually works for users. I’ve noticed he’s quite consistent with his process.",
    avatar: "/image/monika_nagwani_2x.webp",
    rotate: "rotate-[3deg]",
    translateY: "translate-y-[2px]",
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(2); // Start with active index = 2 (Aditya)
  const [mobileOrderedIndices, setMobileOrderedIndices] = useState<number[]>(
    CARDS_DATA.map((_, i) => i)
  );
  const [isShuffling, setIsShuffling] = useState(false);

  // Tablet/Desktop active transitions
  const handleSelectCard = (index: number) => {
    setActiveIndex(index);
  };

  // Mobile specific sliding/shuffling stack logic: shuffles top element to bottom
  const handleMobileShuffleNext = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    
    setTimeout(() => {
      setMobileOrderedIndices((prev) => {
        const next = [...prev];
        const top = next.shift();
        if (top !== undefined) {
          next.push(top);
        }
        return next;
      });
      setIsShuffling(false);
    }, 280);
  };

  return (
    <section id="testimonials" className="bg-bg py-20 lg:py-32 overflow-hidden w-full relative">
      {/* Soft elegant subtle background glowing lights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/3 rounded-full blur-[140px] pointer-events-none select-none" />

      {/* Header Description */}
      <div className="container-wide mb-14 md:mb-20 text-left relative z-10 w-full">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
            hidden: {}
          }}
          className="text-5xl md:text-[72px] font-medium tracking-tight leading-tight md:leading-[1.1] w-full text-zinc-900"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {"A few words from".split(" ").map((word, index) => (
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
          {"people I’ve worked with".split(" ").map((word, index) => (
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

      {/* 🖥️ DESKTOP + LAPTOP VIEW: Stretched overlapping cascade row matching the exact layout structure */}
      <div className="hidden md:flex flex-col items-center justify-center w-full max-w-[1300px] mx-auto px-6 relative z-10">
        <div className="flex flex-row items-center justify-center w-full py-10 relative">
          
          {CARDS_DATA.map((card) => {
            const isActive = activeIndex === card.index;
            
            // Apply slight stagger translation based on actual active states
            const dynamicRotateStyle = isActive 
              ? "rotate-0 scale-[1.05]" 
              : `${card.rotate} scale-95 opacity-70 hover:opacity-95 hover:scale-[0.98]`;
            
            const dynamicTranslateStyle = isActive 
              ? "-translate-y-8" 
              : card.translateY;

            return (
              <motion.div
                key={card.index}
                onClick={() => handleSelectCard(card.index)}
                onMouseEnter={() => handleSelectCard(card.index)}
                layoutId={`desktop-card-${card.index}`}
                className={`relative w-[260px] lg:w-[300px] xl:w-[320px] h-[280px] lg:h-[300px] rounded-[24px] cursor-pointer transition-all duration-300 select-none ease-out shrink-0
                  ${card.index > 0 ? "-ml-[38px] lg:-ml-[50px] xl:-ml-[65px]" : ""}
                  ${isActive ? 'z-30' : 'z-10'} ${dynamicRotateStyle} ${dynamicTranslateStyle}`}
                style={{
                  zIndex: isActive ? 30 : 10 + (2 - Math.abs(2 - card.index))
                }}
              >
                {isActive ? (
                  /* Highlighted Active white card with subtle focus ring or accent border shadow */
                  <div className="w-full h-full p-[1px] rounded-[24px] bg-zinc-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.08)] ring-1 ring-accent/10">
                    <div className="w-full h-full bg-white rounded-[23px] p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden">
                      
                      <div className="absolute inset-x-0 top-0 h-[3px] bg-accent/40" />

                      {/* Content Area */}
                      <div className="pt-2">
                        <p className="text-zinc-700 text-xs lg:text-[13px] leading-relaxed font-normal">
                          "{card.content}"
                        </p>
                      </div>

                      {/* Author Info */}
                      <div className="flex items-center gap-3 border-t border-zinc-100 pt-4 mt-auto">
                        <img 
                          loading="lazy" 
                          src={card.avatar} 
                          alt={card.name} 
                          className="w-10 h-10 rounded-full object-cover border border-zinc-150 shrink-0" 
                        />
                        <div className="overflow-hidden">
                          <h4 className="font-semibold text-xs lg:text-sm text-zinc-900 truncate leading-tight">
                            {card.name}
                          </h4>
                          <p className="text-[10px] text-zinc-500 truncate font-medium mt-0.5">
                            {card.role}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  /* Standard fanned white background cards styled consistently */
                  <div className="w-full h-full bg-white rounded-[24px] p-6 lg:p-7 flex flex-col justify-between relative overflow-hidden border border-zinc-200/50 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:border-zinc-300 transition-colors duration-200">
                    
                    {/* Content Area */}
                    <div className="pt-2">
                      <p className="text-zinc-400 text-xs leading-relaxed font-normal line-clamp-[6]">
                        "{card.content}"
                      </p>
                    </div>

                    {/* Author Details */}
                    <div className="flex items-center gap-3 border-t border-zinc-100 pt-4 mt-auto">
                      <img 
                        loading="lazy" 
                        src={card.avatar} 
                        alt={card.name} 
                        className="w-10 h-10 rounded-full object-cover border border-zinc-150 grayscale shrink-0 opacity-60" 
                      />
                      <div className="overflow-hidden">
                        <h4 className="font-semibold text-xs lg:text-sm text-zinc-650 truncate leading-tight">
                          {card.name}
                        </h4>
                        <p className="text-[10px] text-zinc-500 truncate font-medium mt-0.5">
                          {card.role}
                        </p>
                      </div>
                    </div>

                  </div>
                )}
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* 📱 MOBILE VIEW: Stacked cycle-on-tap card deck representation */}
      <div className="flex md:hidden flex-col items-center w-full px-4 select-none relative z-10">
        
        <div 
          className="relative w-full max-w-[340px] h-[240px] cursor-pointer"
          onClick={handleMobileShuffleNext}
        >
          <AnimatePresence mode="popLayout">
            {mobileOrderedIndices.map((originalIndex, relativeIdx) => {
              const card = CARDS_DATA[originalIndex];
              const isTop = relativeIdx === 0;

              // Stack cards vertically offset to emulate depth
              let x = 0;
              let y = relativeIdx * 14;
              let scale = 1 - (relativeIdx * 0.04);
              let opacity = relativeIdx === 0 ? 1 : relativeIdx === 1 ? 0.9 : relativeIdx === 2 ? 0.7 : 0;
              let rotate = relativeIdx * 1.5;
              let zIndex = 30 - relativeIdx;

              if (isTop && isShuffling) {
                x = 240;
                rotate = 10;
                opacity = 0;
                scale = 0.95;
              }

              return (
                <motion.div
                  key={card.index}
                  style={{ zIndex }}
                  animate={{
                    x,
                    y,
                    scale,
                    opacity,
                    rotate,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                  className="absolute inset-0 h-full w-full"
                >
                  {isTop ? (
                    /* Active mobile white card */
                    <div className="w-full h-full p-[1px] rounded-[24px] bg-zinc-200 shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
                      <div className="w-full h-full bg-white rounded-[23px] p-5 flex flex-col justify-between relative overflow-hidden">
                        
                        <div className="absolute inset-x-0 top-0 h-[3px] bg-accent/40" />

                        <div className="pt-2">
                          <p className="text-zinc-700 text-xs xs:text-[13px] leading-relaxed font-normal line-clamp-[6]">
                            "{card.content}"
                          </p>
                        </div>

                        <div className="flex items-center gap-2.5 border-t border-zinc-100 pt-3 mt-auto">
                          <img src={card.avatar} alt={card.name} className="w-8.5 h-8.5 rounded-full object-cover border border-zinc-150" />
                          <div>
                            <h4 className="font-semibold text-xs text-zinc-900 leading-tight">{card.name}</h4>
                            <p className="text-[9px] text-zinc-500 font-medium mt-0.5">{card.role}</p>
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    /* Layered stacked background cards */
                    <div className="w-full h-full bg-white rounded-[24px] p-5 flex flex-col justify-between relative overflow-hidden border border-zinc-250 shadow-sm">
                      <div className="pt-2">
                        <p className="text-zinc-300 text-xs font-normal line-clamp-5">"{card.content}"</p>
                      </div>
                      <div className="flex items-center gap-2.5 border-t border-zinc-100 pt-3 mt-auto opacity-40">
                        <div className="w-8.5 h-8.5 rounded-full bg-zinc-100 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-xs text-zinc-500 leading-tight">{card.name}</h4>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
