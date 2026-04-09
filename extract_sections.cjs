const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = appTsx.split('\n');

function extractComponent(startStr, endStr, filename, imports) {
  const startIndex = lines.findIndex(line => line && line.startsWith(startStr));
  const endIndex = lines.findIndex(line => line && line.startsWith(endStr));
  
  if (startIndex !== -1 && endIndex !== -1) {
    const code = lines.slice(startIndex, endIndex).join('\n');
    fs.writeFileSync(filename, imports + code + '\nexport default ' + startStr.split(' ')[1] + ';\n');
    
    for (let i = startIndex; i < endIndex; i++) {
      lines[i] = null;
    }
    console.log('Extracted', filename);
  } else {
    console.log('Could not find boundaries for', filename, startIndex, endIndex);
  }
}

// 2. ExperienceSection (including ExperienceCard)
const expStartIndex = lines.findIndex(line => line && line.startsWith('const ExperienceCard: FC<ExperienceCardProps> = ({ exp, i }) => {'));
const expEndIndex = lines.findIndex(line => line && line.startsWith('const XLogo = ({ size = 24 }: { size?: number }) => ('));

if (expStartIndex !== -1 && expEndIndex !== -1) {
  const code = lines.slice(expStartIndex, expEndIndex).join('\n');
  fs.writeFileSync('src/ExperienceSection.tsx', `import React, { FC } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, Experience } from './constants';

interface ExperienceCardProps {
  exp: Experience;
  i: number;
}

` + code + '\nexport default ExperienceSection;\n');
  for (let i = expStartIndex; i < expEndIndex; i++) {
    lines[i] = null;
  }
  console.log('Extracted ExperienceSection');
}

// 3. OwnershipSection (including Logos)
const ownStartIndex = lines.findIndex(line => line && line.startsWith('const XLogo = ({ size = 24 }: { size?: number }) => ('));
const ownEndIndex = lines.findIndex(line => line && line.startsWith('const TestimonialsSection = () => {'));

if (ownStartIndex !== -1 && ownEndIndex !== -1) {
  const code = lines.slice(ownStartIndex, ownEndIndex).join('\n');
  fs.writeFileSync('src/OwnershipSection.tsx', `import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

` + code + '\nexport default OwnershipSection;\n');
  for (let i = ownStartIndex; i < ownEndIndex; i++) {
    lines[i] = null;
  }
  console.log('Extracted OwnershipSection');
}

// 4. TestimonialsSection
extractComponent(
  'const TestimonialsSection = () => {',
  'const GallerySection = () => {',
  'src/TestimonialsSection.tsx',
  `import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from './constants';

`
);

// 5. GallerySection
extractComponent(
  'const GallerySection = () => {',
  'const ContactSection = () => {',
  'src/GallerySection.tsx',
  `import React from 'react';
import { motion } from 'motion/react';
import { GALLERY_ITEMS } from './constants';

`
);

// 6. ContactSection
extractComponent(
  'const ContactSection = () => {',
  'const ProjectCard: React.FC',
  'src/ContactSection.tsx',
  `import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail, Linkedin, Twitter, Dribbble, ArrowUp } from 'lucide-react';

`
);

// Write back App.tsx
const newAppTsx = lines.filter(line => line !== null).join('\n');
fs.writeFileSync('src/App.tsx', newAppTsx);
console.log('Updated App.tsx');
