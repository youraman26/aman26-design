import fs from 'fs';

const files = [
  'src/TechBayLeafCaseStudy.tsx',
  'src/SparrowCaseStudy.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(
    /<h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-10( text-white)?">/g,
    '<h2 \n              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-10 w-full$1"\n              style={{ fontFamily: \'var(--font-sans)\' }}\n            >'
  );

  content = content.replace(
    /<h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight mb-12( text-white)?">/g,
    '<h2 \n              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight mb-12 w-full$1"\n              style={{ fontFamily: \'var(--font-sans)\' }}\n            >'
  );

  content = content.replace(
    /<h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-\[1\.2\] mb-8 tracking-tight( text-white)?">/g,
    '<h2 \n              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] mb-8 tracking-tight w-full$1"\n              style={{ fontFamily: \'var(--font-sans)\' }}\n            >'
  );

  content = content.replace(
    /<h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight">/g,
    '<h2 \n              className="text-left text-4xl md:text-[72px] font-medium leading-tight md:leading-[1.1] tracking-tight w-full"\n              style={{ fontFamily: \'var(--font-sans)\' }}\n            >'
  );

  // also remove italic font-serif text-accent spans and replace with just text-accent
  content = content.replace(
    /<span className="italic font-serif text-accent">/g,
    '<span className="text-accent">'
  );
  
  content = content.replace(
    /<span className="font-serif italic text-\[#DE1C4D\]">/g,
    '<span className="text-[#DE1C4D]">'
  );

  fs.writeFileSync(file, content);
});
console.log('Script completed');
