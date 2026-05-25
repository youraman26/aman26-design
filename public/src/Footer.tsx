import React from 'react';
import { LinkedInLogo, XLogo, MediumLogo } from './Logos';

const Footer = () => {
  return (
    <footer className="bg-bg py-12 border-t border-border relative w-full">
      <div className="container-wide">
        <div className="flex flex-col items-center justify-center gap-4">
          <img 
            src="/image/mylogo.webp" 
            alt="Logo"
            referrerPolicy="no-referrer"
            className="w-[52px] h-[52px] rounded-full object-cover border border-[#DE1C4D]/25 shadow-sm"
          />
          <p className="text-sm md:text-base text-muted font-medium text-center">
            I design with systems in mind, so products don’t break as they grow.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
