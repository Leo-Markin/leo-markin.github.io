const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'pages');
const pages = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const replacements = [
  { p: /\(1\)/g, r: '<FRef id="darcy">(1)</FRef>' },
  { p: /\(2\)/g, r: '<FRef id="continuity">(2)</FRef>' },
  { p: /\(3\)/g, r: '<FRef id="char_values">(3)</FRef>' },
  { p: /\(4\)/g, r: '<FRef id="dimensionless">(4)</FRef>' },
  { p: /\(1'\)/g, r: '<FRef id="dim_darcy">(1\')</FRef>' },
  { p: /\(5\)/g, r: '<FRef id="laplace">(5)</FRef>' },
  { p: /\(6\)/g, r: '<FRef id="bc_velocity">(6)</FRef>' },
  { p: /\(7\)/g, r: '<FRef id="fundamental">(7)</FRef>' },
  { p: /\(7'\)/g, r: '<FRef id="fundamental_q">(7\')</FRef>' },
  { p: /\(8\)/g, r: '<FRef id="total_potential">(8)</FRef>' },
  { p: /\(9\)/g, r: '<FRef id="jump_cond_p">(9)</FRef>' },
  { p: /\(10\)/g, r: '<FRef id="infinity_cond">(10)</FRef>' },
  { p: /\(11\)/g, r: '<FRef id="double_layer">(11)</FRef>' },
  { p: /\(12\)/g, r: '<FRef id="double_layer_limit">(12)</FRef>' },
  { p: /\(13\)/g, r: '<FRef id="integral">(13)</FRef>' },
  { p: /\(14\)/g, r: '<FRef id="param_curve">(14)</FRef>' },
  { p: /\(15\)/g, r: '<FRef id="normal_vec">(15)</FRef>' },
  { p: /\(16\)/g, r: '<FRef id="integral_param">(16)</FRef>' },
  { p: /\(17\)/g, r: '<FRef id="kernel_param">(17)</FRef>' },
  { p: /\(18\)/g, r: '<FRef id="discrete">(18)</FRef>' },
  { p: /\(19\)/g, r: '<FRef id="velocity_discrete">(19)</FRef>' }
];

for (const file of pages) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Let's replace only if not inside an XML tag
  // A naive approach:
  for (const {p, r} of replacements) {
    // Avoid replacing inside FRef tags
    // By using a split strategy or just applying safely.
    // Let's just avoid replacing if it's already exactly the FRef
    // Replace all occurrences of (x) with a placeholder, then replace placeholder
    // Wait, let's just do an replace on text that isn't inside <...>.
    
    let parts = content.split(/(<[^>]+>)/g);
    for (let i = 0; i < parts.length; i++) {
        // Even indices are outside tags
        if (i % 2 === 0) {
            // Also avoid replacing if the text is inside the child of FRef?
            // Actually it's fine, if the child becomes `<FRef ...>(1)</FRef>`, React will throw Error or we shouldn't nest Tooltips.
            // Let's check if the previous tag was <FRef ...> and the next is </FRef>
            let skip = false;
            if (i > 0 && i < parts.length - 1) {
                if (parts[i-1].startsWith('<FRef') && parts[i+1].startsWith('</FRef>')) {
                    skip = true;
                }
            }
            if (!skip) {
                parts[i] = parts[i].replace(p, r);
            }
        }
    }
    content = parts.join('');
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
