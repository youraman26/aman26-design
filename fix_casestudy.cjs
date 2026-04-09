const fs = require('fs');

const caseStudyTsx = fs.readFileSync('src/CaseStudy.tsx', 'utf-8');
const imports = `import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, ExternalLink, CheckCircle2, AlertCircle, AlertTriangle, Type, Framer, FlaskConical, Tally3, Clock, ShieldCheck, ShieldAlert, Quote, User, Workflow, Loader2, Brain, Activity, PieChart, Database, Settings2, Bell, Bug, UserCircle, ClipboardList, Eye, Shield, Maximize2, Lightbulb, MessageSquare, Search, Sparkles, Layers, BarChart3, MousePointer2, Zap, Layout, Globe, ChevronRight, Users2, Check } from 'lucide-react';
import { Project } from './constants';

`;

const lines = caseStudyTsx.split('\n');
const startIdx = lines.findIndex(line => line.startsWith('const CaseStudy ='));
if (startIdx !== -1) {
  const code = lines.slice(startIdx).join('\n');
  fs.writeFileSync('src/CaseStudy.tsx', imports + code);
  console.log('Fixed CaseStudy.tsx imports');
}
