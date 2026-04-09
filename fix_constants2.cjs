const fs = require('fs');

const constantsTsx = fs.readFileSync('src/constants.tsx', 'utf-8');
const lines = constantsTsx.split('\n');

const secondProjectsIndex = lines.findIndex((line, index) => index > 20 && line.startsWith('const PROJECTS: Project[] = ['));
if (secondProjectsIndex !== -1) {
  const endSecondProjectsIndex = lines.findIndex((line, index) => index > secondProjectsIndex && line.startsWith('];'));
  if (endSecondProjectsIndex !== -1) {
    for (let i = secondProjectsIndex - 1; i <= endSecondProjectsIndex; i++) {
      lines[i] = null;
    }
  }
}

let newContent = lines.filter(line => line !== null).join('\n');
newContent = newContent.replace('interface Skill {', 'export interface Skill {');
newContent = newContent.replace('interface Experience {', 'export interface Experience {');
newContent = newContent.replace('interface Testimonial {', 'export interface Testimonial {');

fs.writeFileSync('src/constants.tsx', newContent);
console.log('Fixed constants.tsx again');
