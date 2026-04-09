const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = appTsx.split('\n');

const startSkills = lines.findIndex(line => line.startsWith('interface Skill {'));
const endGallery = lines.findIndex(line => line.startsWith('const BrandIcon ='));

if (startSkills !== -1 && endGallery !== -1) {
  const constantsCode = lines.slice(startSkills, endGallery).join('\n');
  const constantsTs = fs.readFileSync('src/constants.ts', 'utf-8');
  
  // Replace 'const SKILLS' with 'export const SKILLS' etc.
  let exportableCode = constantsCode
    .replace('const SKILLS =', 'export const SKILLS =')
    .replace('const TOOLS =', 'export const TOOLS =')
    .replace('const EXPERIENCES: Experience[] =', 'export const EXPERIENCES: Experience[] =')
    .replace('const TESTIMONIALS: Testimonial[] =', 'export const TESTIMONIALS: Testimonial[] =')
    .replace('const GALLERY_ITEMS =', 'export const GALLERY_ITEMS =');
  
  // Append to constants.ts
  fs.writeFileSync('src/constants.ts', constantsTs + '\n' + exportableCode);
  
  // Remove from App.tsx
  const newAppTsx = [...lines.slice(0, startSkills), ...lines.slice(endGallery)].join('\n');
  fs.writeFileSync('src/App.tsx', newAppTsx);
  console.log('Moved constants');
} else {
  console.log('Could not find constants boundaries');
}
