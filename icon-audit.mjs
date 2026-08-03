import fs from 'node:fs';
import path from 'node:path';

const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? walk(path.join(dir, e.name)) : (e.name.endsWith('.ts') || e.name.endsWith('.html')) ? [path.join(dir, e.name)] : []);

const used = new Set();
for (const f of walk('src')) {
  const c = fs.readFileSync(f, 'utf8');
  for (const m of c.matchAll(/app-icon[^>]*name="([a-zA-Z-]+)"/g)) used.add(m[1]);
  for (const m of c.matchAll(/app-button[^>]*icon="([a-zA-Z-]+)"/g)) used.add(m[1]);
  for (const m of c.matchAll(/\bicon:\s*'([a-zA-Z-]+)'/g)) used.add(m[1]);
}
// remove false positives from app-icon/app-button source itself
used.delete('name');
const iconFile = fs.readFileSync('src/app/shared/components/app-icon/app-icon.ts', 'utf8');

const missing = [...used].filter(n => !(iconFile.includes("'" + n + "':") || iconFile.includes(n + ":")));
console.log('TOTAL distinct used names:', used.size);
console.log('GENUINELY MISSING (' + missing.length + '):', missing);
console.log('ALL USED NAMES:', [...used].sort().join(', '));
