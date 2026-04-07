import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/style=\{\{\s*imageRendering:\s*'-webkit-optimize-contrast'\s*\}\}/g, '');
fs.writeFileSync('src/App.tsx', content);
console.log('Fixed image styles!');
