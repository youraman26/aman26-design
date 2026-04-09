const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = appTsx.split('\n');

// Find start and end of CaseStudy
const startIndex = lines.findIndex(line => line.startsWith('const CaseStudy = ({ project, onClose }'));
const endIndex = lines.findIndex(line => line.startsWith('const VideoPreview = () => {'));

if (startIndex !== -1 && endIndex !== -1) {
  const caseStudyCode = lines.slice(startIndex, endIndex).join('\n');
  
  const imports = `import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, ExternalLink, CheckCircle2, AlertCircle, AlertTriangle, Type, Framer, FlaskConical, Tally3, Clock, ShieldCheck, ShieldAlert, Quote, User, Workflow, Loader2, Brain, Activity, PieChart, Database, Settings2, Bell, Bug, UserCircle, ClipboardList, Eye, Shield, Maximize2, Lightbulb } from 'lucide-react';
import { Project } from './constants';

`;

  fs.writeFileSync('src/CaseStudy.tsx', imports + caseStudyCode + '\nexport default CaseStudy;\n');
  
  // Remove from App.tsx
  const newAppTsx = [...lines.slice(0, startIndex), ...lines.slice(endIndex)].join('\n');
  fs.writeFileSync('src/App.tsx', newAppTsx);
  console.log('Successfully extracted CaseStudy');
} else {
  console.log('Could not find CaseStudy boundaries', startIndex, endIndex);
}
