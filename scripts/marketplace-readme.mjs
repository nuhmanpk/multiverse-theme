// The VS Code Marketplace rejects SVG images, so publish a copy of README with PNGs
// (every images/*.svg reference becomes the matching images/*.png).
import { readFile, writeFile } from 'node:fs/promises';
const md = await readFile(new URL('../README.md', import.meta.url), 'utf8');
await writeFile(new URL('../README.marketplace.md', import.meta.url), md.replace(/(images\/[\w./-]+?)\.svg\b/g, '$1.png'));
console.log('✔ README.marketplace.md');
