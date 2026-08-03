import fs from 'node:fs';
import path from 'node:path';

const iconsDir = 'node_modules/lucide-angular/icons';
const wanted = ['medal','quote','compare','carve','hand','tree','truck','whatsapp','hammer','shield'];

function decodePreview(file) {
  const text = fs.readFileSync(file, 'utf8');
  const m = text.match(/@preview !\[img\]\((data:image\/svg\+xml;base64,([A-Za-z0-9+/=]+))\)/);
  if (!m) return null;
  return Buffer.from(m[2], 'base64').toString('utf8');
}

function extractPaths(svg) {
  const out = [];
  for (const m of svg.matchAll(/<path d="([^"]*)"/g)) out.push(m[1]);
  for (const m of svg.matchAll(/<line x1="([\d.]+)" y1="([\d.]+)" x2="([\d.]+)" y2="([\d.]+)"/g))
    out.push(`M${m[1]} ${m[2]}L${m[3]} ${m[4]}`);
  for (const m of svg.matchAll(/<polyline points="([^"]*)"/g))
    out.push('M' + m[1].trim().replace(/[\s,]+/g, ' ').replace(/ /g, ' ') + '');
  for (const m of svg.matchAll(/<polygon points="([^"]*)"/g)) {
    const pts = m[1].trim().split(/[\s,]+/);
    const d = pts.map((v, i) => (i % 2 === 0 ? (i === 0 ? 'M' : 'L') : '') + v).join('');
    out.push(d + 'Z');
  }
  for (const m of svg.matchAll(/<circle cx="([\d.]+)" cy="([\d.]+)" r="([\d.]+)"/g)) {
    const cx = +m[1], cy = +m[2], r = +m[3];
    out.push(`M${cx} ${cy}m-${r} 0a${r} ${r} 0 1 1 ${r*2} 0a${r} ${r} 0 1 1 ${-(r*2)} 0Z`);
  }
  for (const m of svg.matchAll(/<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"(?: rx="([\d.]+)")?(?: ry="([\d.]+)")?/g)) {
    const x = +m[1], y = +m[2], w = +m[3], h = +m[4];
    const rx = m[5] ? +m[5] : 0;
    out.push(`M${x+rx} ${y}H${x+w-rx}A${rx} ${rx} 0 0 1 ${x+w} ${y+rx}V${y+h-rx}A${rx} ${rx} 0 0 1 ${x+w-rx} ${y+h}H${x+rx}A${rx} ${rx} 0 0 1 ${x} ${y+h-rx}V${y+rx}A${rx} ${rx} 0 0 1 ${x+rx} ${y}Z`);
  }
  return out;
}

for (const name of wanted) {
  const file = path.join(iconsDir, name + '.d.ts');
  if (!fs.existsSync(file)) { console.log('--- ' + name + ': FILE MISSING'); continue; }
  const svg = decodePreview(file);
  if (!svg) { console.log('--- ' + name + ': NO PREVIEW'); continue; }
  const paths = extractPaths(svg);
  console.log('--- ' + name + ':');
  console.log(paths.map(p => `'${p}'`).join(', '));
}
