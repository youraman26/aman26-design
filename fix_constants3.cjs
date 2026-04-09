const fs = require('fs');

const constantsTsx = fs.readFileSync('src/constants.tsx', 'utf-8');
const lines = constantsTsx.split('\n');

// 1. Export interfaces
let newContent = constantsTsx.replace('interface Skill {', 'export interface Skill {');
newContent = newContent.replace('interface Experience {', 'export interface Experience {');
newContent = newContent.replace('interface Testimonial {', 'export interface Testimonial {');

// 2. Remove duplicate PROJECTS
const secondProjectsIndex = newContent.indexOf('const PROJECTS: Project[] = [', 100);
if (secondProjectsIndex !== -1) {
  const endSecondProjectsIndex = newContent.indexOf('];', secondProjectsIndex);
  if (endSecondProjectsIndex !== -1) {
    newContent = newContent.substring(0, secondProjectsIndex) + newContent.substring(endSecondProjectsIndex + 2);
  }
}

fs.writeFileSync('src/constants.tsx', newContent);
console.log('Fixed constants.tsx again');
