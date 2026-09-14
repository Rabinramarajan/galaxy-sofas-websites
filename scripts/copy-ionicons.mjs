/**
 * Copies the Ionicons runtime and only the SVGs this site uses into
 * `public/ionicons/`, so a static export can serve them from its own origin
 * (no CDN, no third-party request).
 *
 * Runs automatically on `npm run build` and after `npm install`.
 * The icon list comes from src/constants/icons.ts — the same file the
 * components import, so the two can never drift apart.
 */
import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "node_modules", "ionicons", "dist", "ionicons");
const dest = path.join(root, "public", "ionicons");

if (!existsSync(src)) {
  console.error("[ionicons] package not found — run `npm install` first.");
  process.exit(1);
}

// Read the icon names without importing TypeScript.
const registry = await readFile(path.join(root, "src", "constants", "icons.ts"), "utf8");
const names = [...new Set([...registry.matchAll(/:\s*"([a-z0-9-]+)"/g)].map((m) => m[1]))];

if (names.length === 0) {
  console.error("[ionicons] no icon names found in src/constants/icons.ts");
  process.exit(1);
}

await rm(dest, { recursive: true, force: true });
await mkdir(path.join(dest, "svg"), { recursive: true });

// Runtime: the ESM loader plus its lazily-imported chunks.
const runtime = (await readdir(src)).filter((file) => file.endsWith(".js"));
for (const file of runtime) {
  await cp(path.join(src, file), path.join(dest, file));
}

const missing = [];
for (const name of names) {
  const file = `${name}.svg`;
  const from = path.join(src, "svg", file);
  if (!existsSync(from)) {
    missing.push(name);
    continue;
  }
  await cp(from, path.join(dest, "svg", file));
}

if (missing.length > 0) {
  console.error(`[ionicons] unknown icon name(s): ${missing.join(", ")}`);
  process.exit(1);
}

// Keep the folder out of source control; it is generated.
await writeFile(path.join(dest, ".gitignore"), "*\n");

console.log(
  `[ionicons] copied ${runtime.length} runtime files and ${names.length} icons to public/ionicons`,
);
