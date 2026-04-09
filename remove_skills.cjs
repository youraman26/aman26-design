const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = appTsx.split('\n');

const startIndex = lines.findIndex(line => line.startsWith('const SkillsSection = () => {'));
const endIndex = lines.findIndex(line => line.startsWith('const ProjectCard: React.FC'));

if (startIndex !== -1 && endIndex !== -1) {
  const newAppTsx = [...lines.slice(0, startIndex), ...lines.slice(endIndex)].join('\n');
  fs.writeFileSync('src/App.tsx', newAppTsx);
  console.log('Removed SkillsSection from App.tsx');
} else {
  console.log('Could not find boundaries', startIndex, endIndex);
}
