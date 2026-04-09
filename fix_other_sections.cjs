const fs = require('fs');

const skillsTsx = fs.readFileSync('src/SkillsSection.tsx', 'utf-8');
const importsSkills = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Users, Sparkles, Palette, MessageSquare, ChevronRight } from 'lucide-react';
import { SKILLS, TOOLS } from './constants';

`;

const linesSkills = skillsTsx.split('\n');
const startIdxSkills = linesSkills.findIndex(line => line.startsWith('const SkillsSection ='));
if (startIdxSkills !== -1) {
  const code = linesSkills.slice(startIdxSkills).join('\n');
  fs.writeFileSync('src/SkillsSection.tsx', importsSkills + code);
  console.log('Fixed SkillsSection.tsx imports');
}

const expTsx = fs.readFileSync('src/ExperienceSection.tsx', 'utf-8');
const importsExp = `import React, { FC } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { EXPERIENCES, Experience } from './constants';

`;

const linesExp = expTsx.split('\n');
const startIdxExp = linesExp.findIndex(line => line.startsWith('interface ExperienceCardProps'));
if (startIdxExp !== -1) {
  const code = linesExp.slice(startIdxExp).join('\n');
  fs.writeFileSync('src/ExperienceSection.tsx', importsExp + code);
  console.log('Fixed ExperienceSection.tsx imports');
}

const ownTsx = fs.readFileSync('src/OwnershipSection.tsx', 'utf-8');
const importsOwn = `import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, FileText } from 'lucide-react';

`;

const linesOwn = ownTsx.split('\n');
const startIdxOwn = linesOwn.findIndex(line => line.startsWith('const XLogo ='));
if (startIdxOwn !== -1) {
  const code = linesOwn.slice(startIdxOwn).join('\n');
  fs.writeFileSync('src/OwnershipSection.tsx', importsOwn + code);
  console.log('Fixed OwnershipSection.tsx imports');
}
