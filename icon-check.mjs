import fs from 'node:fs';
const c = fs.readFileSync('src/app/shared/components/app-icon/app-icon.ts', 'utf8');
const keys = ['rotate-ccw','rotate-cw','message-square','pen-tool','check-circle','align-center','user-check','paw-print','bell','user','bot','send','loader','square','maximize','wine','music','laptop','baby','dumbbell','map','mapPin','axe','cpu','scale','repeat','link','droplet','pen','recycle','gauge'];
for (const k of keys) {
  // a key is defined if it appears as "<key>:'"
  console.log((c.includes("'" + k + "':") || c.includes(k + ":")) ? 'OK  ' : 'MISS', k);
}
