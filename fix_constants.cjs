const fs = require('fs');

const constantsTsx = fs.readFileSync('src/constants.tsx', 'utf-8');
const imports = `import React from 'react';
import { Layout, Users, Sparkles, Palette, MessageSquare, BarChart3, Cpu, Layers, Code2 } from 'lucide-react';

`;

fs.writeFileSync('src/constants.tsx', imports + constantsTsx);
console.log('Fixed constants.tsx');
