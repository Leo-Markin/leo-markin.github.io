const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace <M m="\something" /> with <M m={"\\something"} />
  // Be careful with existing {"\\something"} or <BM m="..." />
  
  content = content.replace(/<M m="([^"]+)" \/>/g, (match, p1) => {
    // Escape backslashes properly for a JS string literal
    // If it was already written as \vec, in file it physically has \vec
    // But reading it gives physical \ e c.
    // Wait, fs.readFileSync gets exactly what is in the file.
    // If the file has `<M m="\vec" />`, then p1 is `\vec`.
    // We want to replace it with `<M m={"\\vec"} />`
    const escaped = p1.replace(/\\/g, '\\\\');
    return `<M m={"${escaped}"} />`;
  });

  content = content.replace(/<BM m="([^"]+)" \/>/g, (match, p1) => {
    const escaped = p1.replace(/\\/g, '\\\\');
    return `<BM m={"${escaped}"} />`;
  });

  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed latex m props in src/pages/*.tsx');
