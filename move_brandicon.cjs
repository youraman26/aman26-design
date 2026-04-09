const fs = require('fs');

const appTsx = fs.readFileSync('src/App.tsx', 'utf-8');
const lines = appTsx.split('\n');

const startIndex = lines.findIndex(line => line.startsWith('const BrandIcon ='));
const endIndex = lines.findIndex(line => line.startsWith('const CustomCursor ='));

if (startIndex !== -1 && endIndex !== -1) {
  const code = lines.slice(startIndex, endIndex).join('\n');
  const constantsTsx = fs.readFileSync('src/constants.tsx', 'utf-8');
  
  const exportableCode = code
    .replace('const BrandIcon =', 'export const BrandIcon =')
    .replace('const BRAND_PATHS =', 'export const BRAND_PATHS =');
    
  fs.writeFileSync('src/constants.tsx', constantsTsx + '\n' + exportableCode);
  
  const newAppTsx = [...lines.slice(0, startIndex), ...lines.slice(endIndex)].join('\n');
  fs.writeFileSync('src/App.tsx', newAppTsx);
  console.log('Moved BrandIcon and BRAND_PATHS');
} else {
  console.log('Could not find boundaries');
}
