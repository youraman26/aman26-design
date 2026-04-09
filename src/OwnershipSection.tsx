import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, FileText } from 'lucide-react';

const XLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MediumLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41 3.38 2.87 3.38 6.41zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
  </svg>
);

const LinkedInLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="white"/>
    <path d="M9.42857 18.8571V10.2857H6.57143V18.8571H9.42857ZM8 9.14286C8.94286 9.14286 9.71429 8.37143 9.71429 7.42857C9.71429 6.48571 8.94286 5.71429 8 5.71429C7.05714 5.71429 6.28571 6.48571 6.28571 7.42857C6.28571 8.37143 7.05714 9.14286 8 9.14286ZM18.8571 18.8571V13.8571C18.8571 11.4 17.5429 10.2571 15.7714 10.2571C14.3429 10.2571 13.7143 11.0286 13.3429 11.6H13.3714V10.2857H10.5143C10.5429 11.0857 10.5143 18.8571 10.5143 18.8571H13.3714V14.0571C13.3714 13.8 13.3714 13.5429 13.4571 13.3429C13.6857 12.7714 14.2 12.1714 15.0857 12.1714C16.2571 12.1714 16.7143 13.0571 16.7143 14.3429V18.8571H19.5714L18.8571 18.8571Z" fill="#0077B5"/>
  </svg>
);

const OwnershipSection = () => {
  const cards = [
    {
      id: 'linkedin',
      type: 'social',
      title: 'LinkedIn',
      description: 'Let\'s connect professionally and share insights.',
      icon: <LinkedInLogo />,
      color: 'bg-[#0077B5]',
      link: 'https://www.linkedin.com/in/amanux26',
      rotation: -6
    },
    {
      id: 'x',
      type: 'social',
      title: 'X',
      description: 'Follow my design journey and daily thoughts.',
      icon: <XLogo />,
      color: 'bg-black',
      link: 'https://x.com/aman26ux',
      rotation: 4
    },
    {
      id: 'image',
      type: 'image',
      image: '/image/my_bottom_img_2x.webp',
      rotation: -2
    },
    {
      id: 'puzzle',
      type: 'puzzle',
      rotation: 5
    },
    {
      id: 'resume',
      type: 'resume',
      title: 'Product Designer',
      experience: '3+ years of experience',
      description: 'I work at the intersection of systems and AI-assisted design',
      color: 'bg-accent',
      rotation: -3
    }
  ];

  const puzzleLetters = [
    ['A', 'W', 'I', 'L', 'L', 'Y', 'W', 'X', 'Z'],
    ['D', 'E', 'S', 'L', 'O', 'V', 'E', 'D', 'A'],
    ['Q', 'E', 'D', 'T', 'O', 'F', 'E', 'N', 'E'],
    ['F', 'X', 'C', 'O', 'N', 'N', 'E', 'C', 'T'],
    ['C', 'L', 'A', 'I', 'W', 'I', 'T', 'H', 'M'],
    ['A', 'X', 'F', 'Y', 'O', 'U', 'O', 'U', 'R'],
    ['Q', 'Z', 'M', 'E', 'N', 'J', 'I', 'T', 'S'],
  ];

  const highlightedCells = [
    [0, 1], [0, 2], [0, 3], [0, 4], // WILL
    [1, 3], [1, 4], [1, 5], [1, 6], // LOVE
    [2, 3], [2, 4],                 // TO
    [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [3, 7], // CONNECT
    [4, 4], [4, 5], [4, 6], [4, 7], // WITH
    [5, 3], [5, 4], [5, 5]          // YOU
  ];

  const isHighlighted = (r: number, c: number) => {
    return highlightedCells.some(([row, col]) => row === r && col === c);
  };

  return (
    <section id="story" className="bg-ink py-16 md:py-32 px-6 md:px-12 lg:px-24 text-white overflow-hidden">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight mb-8">
              A journey from execution to <span className="italic-serif font-normal text-accent">product ownership</span>
            </h2>
            <p className="text-white/70 text-base md:text-xl font-light leading-relaxed">
              I began as an engineer learning design fundamentals, quickly moving into roles where I owned product decisions through research and data. Over time, I grew into mentoring designers while working on real products, which strengthened how I think and communicate design. Today, my focus is on building systems that bring consistency, scalability, and clarity to products going beyond screens to design how things actually work.
            </p>
          </motion.div>
        </div>

        {/* Interactive Cards Grid */}
        <div className="flex flex-nowrap lg:flex-row justify-start lg:justify-center items-center gap-3 md:gap-4 overflow-x-auto lg:overflow-visible pb-12 lg:pb-0 px-4 md:px-0 no-scrollbar perspective-1000">
          {cards.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: card.rotation }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ 
                scale: 1.1, 
                rotate: 0, 
                zIndex: 50,
                y: -10,
                transition: { duration: 0.2 }
              }}
              className={`relative shrink-0 w-[180px] md:w-[210px] h-[240px] md:h-[280px] rounded-[24px] md:rounded-[32px] shadow-2xl cursor-pointer overflow-hidden flex flex-col p-4 md:p-6 transition-shadow hover:shadow-accent/20`}
            >
              {card.type === 'social' && (
                <div className={`absolute inset-0 ${card.color} opacity-90`} />
              )}
              {card.type === 'resume' && (
                <div className={`absolute inset-0 ${card.color}`} />
              )}
              
              {card.type === 'social' && (
                <div className="relative h-full flex flex-col justify-between z-10">
                  <div>
                    <div className={`
                      w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 md:mb-6 backdrop-blur-md
                      ${card.id === 'linkedin' ? 'bg-[#0077B5] rounded-lg' : ''}
                      ${card.id === 'x' ? 'bg-black border border-white/20 rounded-full' : ''}
                      ${card.id !== 'linkedin' && card.id !== 'x' ? 'bg-white/20 rounded-xl md:rounded-2xl' : ''}
                    `}>
                      {React.cloneElement(card.icon as React.ReactElement, { size: card.id === 'x' ? 24 : 28 })}
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold mb-1 md:mb-2">{card.title}</h3>
                    <p className="text-white/80 text-[10px] md:text-sm font-light leading-tight md:leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <a 
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 md:py-3 bg-white text-ink rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 hover:bg-opacity-90 transition-all"
                  >
                    {card.id === 'linkedin' ? 'Open LinkedIn' : card.id === 'x' ? 'Open X' : 'Check this out'} <ArrowUpRight size={14} />
                  </a>
                </div>
              )}

              {card.type === 'image' && (
                <div className="absolute inset-0">
                  <img 
                    loading="lazy"
                    src={card.image} 
                    alt="Profile" 
                    width={630}
                    height={840}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                </div>
              )}

              {card.type === 'puzzle' && (
                <div className="absolute inset-0 bg-[#FDFCF8] p-3 md:p-4 flex flex-col justify-center items-center">
                  <div className="grid grid-cols-9 gap-0.5 md:gap-1 w-full">
                    {puzzleLetters.map((row, rIdx) => 
                      row.map((letter, cIdx) => (
                        <div 
                          key={`${rIdx}-${cIdx}`}
                          className={`
                            aspect-square flex items-center justify-center text-[7px] md:text-[9px] font-bold rounded-full transition-colors
                            ${isHighlighted(rIdx, cIdx) 
                              ? 'bg-accent/20 text-accent scale-110 z-10' 
                              : 'text-ink/10'}
                          `}
                        >
                          {letter}
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-4 md:mt-6 text-ink/40 text-[6px] md:text-[8px] font-bold uppercase tracking-widest text-center">
                    Will love to connect with you
                  </div>
                </div>
              )}

              {card.type === 'resume' && (
                <div className="relative h-full flex flex-col justify-between z-10">
                  <div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 backdrop-blur-md">
                      <FileText size={20} />
                    </div>
                    <h3 className="text-base md:text-xl font-bold mb-0.5 md:mb-1">{card.title}</h3>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold mb-2 md:mb-4 opacity-80">
                      {card.experience}
                    </p>
                    <p className="text-white/80 text-[10px] md:text-xs font-light leading-tight md:leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/11DBZZIxnBT9JSogtiCfP5ax6rG8M0lW4/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 md:py-3 bg-white text-ink rounded-xl md:rounded-2xl font-bold text-[10px] md:text-sm flex items-center justify-center gap-1 md:gap-2 hover:bg-opacity-90 transition-all"
                  >
                    View Resume <ArrowUpRight size={14} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OwnershipSection;
