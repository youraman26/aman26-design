import React from 'react';
import { LinkedInLogo, XLogo, MediumLogo } from './Logos';

const Footer = () => {
  return (
    <footer className="bg-bg py-12 border-t border-border relative">
      <div className="container-wide px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="text-2xl font-black text-accent">ac.</div>
            <div className="hidden md:block w-px h-4 bg-border" />
            <p className="text-xs text-muted font-medium text-center md:text-left">
              I design with systems in mind, so products don’t break as they grow.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/amanux26" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#0077B5] flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
              <LinkedInLogo size={20} />
            </a>
            <a href="https://x.com/aman26ux" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <XLogo size={18} />
            </a>
            <a href="https://medium.com/@chourasiyaaman76" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-black/20">
              <MediumLogo size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
