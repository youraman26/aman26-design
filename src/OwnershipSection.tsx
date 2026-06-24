import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, FileText } from 'lucide-react';
import { ResponsiveImage } from './components/ResponsiveImage';

const XLogo = ({ size = 24, fill = "currentColor" }: { size?: number, fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const MediumLogo = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="white">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.41-3.38 6.41s-3.38-2.87-3.38-6.41 1.51-6.41 3.38-6.41 3.38 2.87 3.38 6.41zM24 12c0 3.17-.53 5.75-1.19 5.75s-1.19-2.58-1.19-5.75.53-5.75 1.19-5.75S24 8.83 24 12z" />
  </svg>
);

const LinkedInLogo = ({ size = 24, fill = "currentColor" }: { size?: number, fill?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.989v-11.569c0-8.96-10.05-8.74-11.02-6.946v-1.485z" fill={fill}/>
  </svg>
);

const OwnershipSection = () => {
  const timelineExperiences = [
    {
      company: "Umpteen Innovations",
      role: "UI/UX Design Intern",
      period: "Jul 2022 - Jan 2023",
      type: "INTERN",
      status: "done"
    },
    {
      company: "HackerKernel Pvt. Ltd.",
      role: "UI/UX Designer",
      period: "Mar 2023 - Feb 2024",
      type: "FULL-TIME",
      status: "done"
    },
    {
      company: "Engineer Sahab Education",
      role: "Sr. UI/UX Designer & Mentor",
      period: "Feb 2024 - May 2025",
      type: "FULL-TIME",
      status: "done"
    },
    {
      company: "Techdome Solutions",
      role: "Product Designer",
      period: "May 2025 - Present",
      type: "FULL-TIME",
      status: "current"
    }
  ];

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
      description: '',
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
    <section id="story" className="relative py-24 md:py-36 text-white overflow-hidden w-full select-none bg-bg p-3 sm:p-5 md:p-8">
      {/* Background Frame with gradient to match Hero section */}
      <div className="absolute inset-3 sm:inset-5 md:inset-8 bg-gradient-to-b from-[#0A0A0C] to-[#7B0B27] rounded-[32px] md:rounded-[48px] border border-[#DE1C4D]/25 overflow-hidden shadow-none z-0">
        {/* Dynamic ambient grid overlay inside the frame */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[1]" />
        
        {/* Subtle noise/grain texture */}
        <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none z-[2]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* Soft radial spot-light behind timeline header */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-radial from-[#FF2D6F]/12 to-transparent blur-[70px] pointer-events-none z-[1]" />

        {/* Soft radial glow to stabilize background depth */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[35%] bg-gradient-radial from-[#DE1C4D]/10 to-transparent blur-[80px] pointer-events-none z-[2]" />
      </div>

      <div className="container-wide relative z-10 py-12 md:py-16">
        {/* Section Heading */}
        <div className="w-full text-left mb-12 md:mb-16">
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
            {"A journey from execution to".split(" ").map((word, index) => (
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
            {"product ownership".split(" ").map((word, index) => (
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

        {/* Progress Timeline of Working Experience */}
        <div className="relative w-full mb-16 md:mb-20 overflow-x-auto md:overflow-visible no-scrollbar">
          <div className="min-w-[760px] md:min-w-0 relative">
            {/* The progress rail: mathematically centered horizontally through the columns */}
            <div className="absolute top-[12px] left-[12.5%] right-[12.5%] h-[2px] bg-white/10 z-0">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-white/20 via-white/50 to-white"
              />
            </div>

            <div className="grid grid-cols-4 gap-4 md:gap-6 relative z-10 pb-4 md:pb-0">
              {timelineExperiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col items-center relative text-center"
                >
                  {/* Node Step Marker: centered exactly over the progress rail */}
                  <div className="flex flex-col items-center mb-5 z-20">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      exp.status === 'current' 
                        ? 'border-white bg-ink ring-4 ring-white/20' 
                        : 'border-white/60 bg-white'
                    }`}>
                      {exp.status === 'current' ? (
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ) : (
                        <svg className="w-3.5 h-3.5 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span 
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: '12px',
                        color: idx === 1 ? '#f5f4f4' : '#ffffff'
                      }}
                      className="font-medium tracking-wider mt-2 bg-ink px-2"
                    >
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Minimal Card */}
                  <div 
                    className={`w-full bg-white/[0.02] border rounded-[16px] p-4 transition-all duration-300 group/timeline shadow-md ${
                      exp.status === 'current' 
                        ? 'border-accent bg-white/[0.04]' 
                        : 'border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                    }`}
                  >
                    <div className="flex flex-col h-full justify-between gap-1.5 text-left">
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-normal text-white group-hover/timeline:text-accent transition-colors truncate">
                            {exp.role}
                          </h4>
                        </div>
                        <p style={{ color: '#ababab' }} className="text-xs truncate mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] border-t border-white/5 pt-2 mt-1 text-white/40">
                        <span style={{ color: '#ababab', fontSize: '11px' }}>{exp.period}</span>
                        {exp.status === 'current' && (
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Text/Description */}
        <div className="w-full text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-base md:text-xl text-white/70 font-light leading-relaxed">
              I began as an engineer learning design fundamentals, quickly moving into roles where I owned product decisions through research and data. Over time, I grew into mentoring designers while working on real products, which strengthened how I think and communicate design. Today, my focus is on building systems that bring consistency, scalability, and clarity to products going beyond screens to design how things actually work.
            </p>
          </motion.div>
        </div>

        {/* Interactive Cards Grid */}
        <div className="flex flex-nowrap lg:flex-row justify-start lg:justify-center items-center gap-3 md:gap-4 overflow-x-auto lg:overflow-visible pb-12 lg:pb-0 no-scrollbar perspective-1000 h-[290px] md:h-[350px]">
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
              className={`relative shrink-0 w-[180px] md:w-[210px] h-[240px] md:h-[280px] rounded-[24px] md:rounded-[32px] shadow-2xl cursor-pointer overflow-hidden flex flex-col p-3 md:p-6 transition-shadow hover:shadow-accent/20`}
            >
              {card.type === 'social' && (
                <div className={`absolute inset-0 ${card.color}`} />
              )}
              {card.type === 'resume' && (
                <div className={`absolute inset-0 ${card.color}`} />
              )}
              
              {card.type === 'social' && (
                <div className="relative h-full flex flex-col justify-between z-10 text-white">
                  <div>
                    <div className={`
                      w-10 h-10 md:w-12 md:h-12 flex items-center justify-center mb-4 md:mb-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm
                    `}>
                      {React.cloneElement(card.icon as React.ReactElement, { size: card.id === 'x' ? 24 : 28, fill: 'white' })}
                    </div>
                    <h3 className="text-lg md:text-2xl font-normal mb-1 md:mb-2">{card.title}</h3>
                    <p style={{ fontSize: '14px' }} className="text-white/80 font-light leading-tight md:leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <a 
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white text-ink rounded-full font-medium text-sm md:text-base flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    {card.id === 'linkedin' ? 'Open LinkedIn' : card.id === 'x' ? 'Open X' : 'Check this out'} <ArrowUpRight size={16} />
                  </a>
                </div>
              )}

              {card.type === 'image' && (
                <div className="absolute inset-0">
                  <ResponsiveImage 
                    src={card.image} 
                    alt="Profile" 
                    sizes="(max-width: 768px) 180px, 210px"
                    className="w-full h-full object-cover"
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
                            aspect-square flex items-center justify-center text-[10px] md:text-xs font-bold rounded-full transition-colors
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
                  <div 
                    style={{ fontWeight: 'normal', fontSize: '14px', color: '#000000', lineHeight: '22.6667px' }}
                    className="mt-4 md:mt-6 text-center uppercase tracking-widest"
                  >
                    Will love to connect with you
                  </div>
                </div>
              )}

              {card.type === 'resume' && (
                <div className="relative h-full flex flex-col justify-between z-10 text-white">
                  <div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-4 md:mb-6 backdrop-blur-sm">
                      <FileText size={20} className="text-white" />
                    </div>
                    <h3 className="text-base md:text-xl font-normal mb-0.5 md:mb-1">{card.title}</h3>
                    <p 
                      style={{ fontWeight: 'normal', fontSize: '14px', lineHeight: '22px', color: '#dcdcdc' }}
                      className="uppercase tracking-widest mb-2 md:mb-4"
                    >
                      {card.experience}
                    </p>
                    <p className="text-white/80 text-xs md:text-sm font-light leading-tight md:leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                  <a 
                    href="https://drive.google.com/file/d/1PqPwi_zIHhfrCgeqNWZXvnYeNsKj32et/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-white text-ink rounded-full font-medium text-sm md:text-base flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all shadow-lg"
                  >
                    View Resume <ArrowUpRight size={16} />
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
