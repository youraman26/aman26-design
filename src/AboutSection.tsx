import React from 'react';
import { motion } from 'motion/react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-ink py-24 md:py-32 px-6 md:px-12 lg:px-24 text-white overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -ml-48 -mb-48" />

      <div className="container-wide relative z-10">
        {/* Full Width Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-black leading-[1.1] tracking-tight max-w-4xl mx-auto text-white">
            If users are <span className="italic-serif font-normal text-accent">confused</span>, it’s not them it’s the <span className="italic-serif font-normal text-accent">product</span> & I can <span className="italic-serif font-normal text-accent">fix</span> that.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            <motion.div 
              whileHover={{ 
                rotate: -2,
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              className="aspect-[4/5] md:aspect-square rounded-[32px] overflow-hidden border border-white/10 shadow-2xl relative group cursor-pointer"
            >
              {/* Internal Blue Outline */}
              <div className="absolute inset-3 border-2 border-accent/20 rounded-[24px] pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <img 
                loading="lazy"
                src="/image/my_main_img_2x.webp" 
                alt="Aman Chourasiya" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
            
            {/* Experience Badge */}
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-accent to-accent/80 rounded-full flex flex-col items-center justify-center p-4 text-white text-center shadow-2xl border-4 border-ink z-20 cursor-default"
            >
              <span className="text-2xl md:text-4xl font-bold tracking-tighter leading-none mb-1">3+</span>
              <span className="text-[7px] md:text-[9px] font-medium uppercase tracking-[0.2em] leading-tight opacity-90">years of<br/>experience</span>
            </motion.div>
          </motion.div>

          {/* Description Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full"
          >
            <div className="space-y-6 text-white/70 text-lg md:text-xl font-light leading-relaxed">
              <p>
                I’m a <span className="text-white font-medium">Product & UX/UI Designer</span> with 3+ years of experience working across <span className="text-accent">SaaS, enterprise, and mobile products</span>.
                I started with an interest in how things are built, but over time, my focus shifted to how they actually work for people.
              </p>
              <p>
                Today, I design with <span className="text-white font-medium">structure in mind</span> simplifying complex workflows, improving how products perform, and building systems that keep things consistent as they grow.
                Now actively using <span className="text-accent">AI</span> as part of my workflow to move faster, iterate better, and think more clearly.
              </p>
              <p>
                I work closely with <span className="text-white font-medium">product, engineering, and stakeholder teams</span> to turn ideas into solutions that are <span className="text-accent">practical, thoughtful, and built to last</span>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
