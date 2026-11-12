// Generates SVG artwork from the palettes: logo, banner, full variant gallery.
// Then rasterizes them to PNG with headless Chrome (for the Marketplace, which rejects SVG).
import { writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { palettes } from './palettes.mjs';
import { mascotBody } from './mascots.mjs';
const idOf = new Map(Object.entries(palettes).map(([k, p]) => [p, k]));

const out = (f) => new URL(`../images/${f}`, import.meta.url);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const FONT = `font-family="'JetBrains Mono','SF Mono',Menlo,Consolas,monospace"`;
const SANS = `font-family="'Inter','Segoe UI',-apple-system,Helvetica,Arial,sans-serif"`;
await mkdir(out(''), { recursive: true });

// ---- logo: a bold "M" printed three times, off-register (three universes) ----
const INK = { paper: '#f3ead6', ink: '#141414', red: '#e0301e', blue: '#1d4ed8', yellow: '#f2b705' };
const M_PATH = 'M58 196 V62 H96 L128 118 L160 62 H198 V196 H164 V122 L136 168 H120 L92 122 V196 Z';
function logoBody() {
  return `<rect width="256" height="256" rx="48" fill="${INK.paper}"/>
  <g fill="${INK.ink}" opacity="0.14">${Array.from({ length: 6 }, (_, r) => Array.from({ length: 6 }, (_, c) =>
    `<circle cx="${172 + c * 13}" cy="${18 + r * 13}" r="${Math.max(0.6, 4.2 - (c * 0.35 + r * 0.55))}"/>`).join('')).join('')}</g>
  <path d="${M_PATH}" fill="${INK.blue}" transform="translate(-9 -7)" style="mix-blend-mode:multiply"><animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;-4 -3;0 0" keyTimes="0;0.1;0.2" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/></path>
  <path d="${M_PATH}" fill="${INK.red}" transform="translate(9 7)" style="mix-blend-mode:multiply"><animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;4 3;0 0" keyTimes="0;0.1;0.2" dur="2.4s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/></path>
  <path d="${M_PATH}" fill="${INK.yellow}" stroke="${INK.ink}" stroke-width="7" stroke-linejoin="round"/>`;
}
function logo(size = 256) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 256 256">${logoBody()}</svg>`;
}

// ---- mini editor card ------------------------------------------------------
// Pass one palette for a static card, or a list + duration for a card that
// flips through variants (SVG <animate>, plays on GitHub; first frame = static PNG).
function card(pp, x, y, w = 300, h = 132, dur = 0, delay = 0, fx = false) {
  const ps = Array.isArray(pp) ? pp : [pp];
  const live = ps.length > 1 && dur > 0;
  const anim = (attr, vals) => (live ? `<animate attributeName="${attr}" values="${vals.join(';')}" dur="${dur}s" begin="${delay}s" calcMode="discrete" repeatCount="indefinite"/>` : '');
  const paint = (role) => `fill="${ps[0][role]}"`;
  const paintAnim = (role) => anim('fill', ps.map((p) => p[role]));
  const el = (tag, attrs, role, inner = '') => `<${tag} ${attrs} ${paint(role)}>${inner}${paintAnim(role)}</${tag}>`;
  const line = (yy, parts) => `<text x="${x + 16}" y="${y + yy}" font-size="13" xml:space="preserve" ${FONT}>${parts.map(([role, s]) => el('tspan', '', role, esc(s))).join('')}</text>`;
  const names = ps.map((p, i) => {
    const vis = ps.map((_, j) => (j === i ? 1 : 0));
    return `<text x="${x + w - 12}" y="${y + 17}" text-anchor="end" font-size="11" font-weight="600" ${paint('fgMuted')} opacity="${vis[0]}" ${SANS}>${esc(p.label.replace(/^Multiverse /, ''))}${paintAnim('fgMuted')}${anim('opacity', vis)}</text>`;
  }).join('');
  // mascot peeking over the bottom-right corner (cycles with the card when live)
  const ms = 54, mx = x + w - 44, my = y + h - 44;
  const pals = live ? ps : [ps[0]];
  const mascots = pals.map((p, i) => {
    const id = idOf.get(p);
    if (!id) return '';
    const vis = pals.map((_, j) => (j === i ? 1 : 0));
    return `<g opacity="${vis[0]}">${anim('opacity', vis)}<g transform="translate(${mx} ${my}) scale(${ms / 64})">${mascotBody(id, { begin: delay })}</g></g>`;
  }).join('');
  return `<g>
  <rect x="${x + 6}" y="${y + 6}" width="${w}" height="${h}" rx="10" fill="${INK.ink}"/>
  ${el('rect', `x="${x}" y="${y}" width="${w}" height="${h}" rx="10" stroke="${INK.ink}" stroke-width="3"`, 'bg')}
  ${el('rect', `x="${x + 1.5}" y="${y + 1.5}" width="${w - 3}" height="25" rx="9"`, 'bgAlt')}
  ${el('rect', `x="${x + 1.5}" y="${y + 14}" width="${w - 3}" height="12"`, 'bgAlt')}
  ${el('circle', `cx="${x + 14}" cy="${y + 13}" r="4"`, 'error')}${el('circle', `cx="${x + 27}" cy="${y + 13}" r="4"`, 'warning')}${el('circle', `cx="${x + 40}" cy="${y + 13}" r="4"`, 'success')}
  ${names}
  ${line(48, [['comment', '// save the multiverse']])}
  ${line(68, [['keyword', 'const '], ['variable', 'hero '], ['operator', '= '], ['func', 'summon'], ['fgMuted', '('], ['string', "'origin'"], ['fgMuted', ', '], ['number', '42'], ['fgMuted', ');']])}
  ${line(88, [['keyword', 'if '], ['fgMuted', '('], ['variable', 'hero'], ['fgMuted', '.'], ['property', 'power '], ['operator', '> '], ['constant', 'MAX'], ['fgMuted', ') {']])}
  ${line(108, [['fgMuted', '  '], ['keyword', 'return new '], ['type', 'Legend'], ['fgMuted', '('], ['param', 'hero'], ['fgMuted', ');']])}
  ${live || fx ? el('rect', `x="${x + 222}" y="${y + 97}" width="7" height="14"`, 'accent', '<animate attributeName="opacity" values="1;0" dur="1s" calcMode="discrete" repeatCount="indefinite"/>') : ''}
  ${el('rect', `x="${x + 16}" y="${y + h - 12}" width="${w - 32}" height="3" rx="1.5" opacity="0.9"`, 'accent', fx ? `<animate attributeName="width" values="0;${w - 32};${w - 32}" keyTimes="0;0.25;1" dur="4s" begin="${delay}s" repeatCount="indefinite"/>` : '')}
  ${mascots}
</g>`;
}

// ---- banner: comic-print poster ------------------------------------------
function banner() {
  const W = 1280, H = 400;
  const all = Object.values(palettes);
  const per = Math.ceil(all.length / 4);
  const picks = [0, 1, 2, 3].map((i) => all.filter((_, j) => j % 4 === i).slice(0, per));
  const dots = Array.from({ length: 14 }, (_, r) => Array.from({ length: 30 }, (_, c) =>
    `<circle cx="${560 + c * 24}" cy="${8 + r * 24}" r="${Math.max(0.5, 5 - r * 0.3 - (29 - c) * 0.12)}"/>`).join('')).join('');
  const jitter = (dx, dy) => `<animateTransform attributeName="transform" type="translate" values="0 0;${dx} ${dy};0 0;${-dx} ${dy / 2};0 0" keyTimes="0;0.08;0.16;0.2;1" dur="3s" repeatCount="indefinite"/>`;
  const title = (dx, dy, fill) => `<text x="${56 + dx}" y="${236 + dy}" font-size="84" font-weight="900" letter-spacing="-2" fill="${fill}" ${SANS}>MULTIVERSE${dx ? jitter(dx * 0.8, dy * 0.8) : ''}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${INK.paper}"/>
  <g fill="${INK.ink}" opacity="0.09">${dots}<animateTransform attributeName="transform" type="translate" values="0 0;-24 0" dur="6s" repeatCount="indefinite"/></g>
  <g transform="translate(56 40) scale(0.42)">${logoBody()}</g>
  ${title(-5, -4, INK.blue)}${title(5, 4, INK.red)}${title(0, 0, INK.ink)}
  <rect x="56" y="262" width="470" height="44" fill="${INK.yellow}" stroke="${INK.ink}" stroke-width="3"/>
  <text x="72" y="292" font-size="22" font-weight="800" fill="${INK.ink}" ${SANS}>${Object.keys(palettes).length} VS CODE THEMES IN ONE</text>
  <text x="56" y="342" font-size="20" fill="#3a3a3a" ${SANS}>Color-blind safe · focus · retro · heroes · anime · cartoons</text>
  <text x="56" y="370" font-size="16" fill="#6a6358" ${SANS}>Every variant contrast-checked for readability</text>
  ${picks.map((ps, i) => card(ps, 600 + (i % 2) * 330, 36 + Math.floor(i / 2) * 170, 300, 132, ps.length * 1.6, i * 0.4)).join('')}
  <rect x="0" y="${H - 8}" width="${W}" height="8" fill="${INK.ink}"/>
</svg>`;
}

// ---- gallery of every variant --------------------------------------------
function gallery() {
  const list = Object.values(palettes);
  const cols = 4, cw = 300, ch = 132, gap = 26, pad = 28;
  const rows = Math.ceil(list.length / cols);
  const W = pad * 2 + cols * cw + (cols - 1) * gap;
  const H = pad * 2 + rows * ch + (rows - 1) * gap;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" rx="16" fill="${INK.paper}"/>
  ${list.map((p, i) => {
    const col = i % cols, row = Math.floor(i / cols);
    const d = ((row + col) * 0.18).toFixed(2); // diagonal wave
    return `<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0;0 0" keyTimes="0;0.06;0.14;1" dur="5s" begin="${d}s" repeatCount="indefinite" calcMode="spline" keySplines="0.3 0 0.2 1;0.3 0 0.2 1;0 0 1 1"/>${card(p, pad + col * (cw + gap), pad + row * (ch + gap), cw, ch, 0, d, true)}</g>`;
  }).join('')}
</svg>`;
}

const files = { 'logo.svg': logo(), 'banner.svg': banner(), 'gallery.svg': gallery() };
for (const [f, svg] of Object.entries(files)) await writeFile(out(f), svg + '\n');

// ---- rasterize with headless Chrome --------------------------------------
const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find((p) => p && existsSync(p));

function raster(svgFile, pngFile, w, h) {
  const html = new URL(`../images/.render.html`, import.meta.url);
  return writeFile(html, `<html><body style="margin:0;background:transparent"><img src="${svgFile}" width="${w}" height="${h}"></body></html>`)
    .then(() => execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
      `--window-size=${w},${h}`, `--screenshot=${fileURLToPath(out(pngFile))}`, fileURLToPath(html)], { stdio: 'ignore' }));
}

if (CHROME) {
  const dims = (svg) => svg.match(/width="(\d+)" height="(\d+)"/).slice(1).map(Number);
  await raster('logo.svg', 'icon.png', 256, 256);
  for (const f of ['banner', 'gallery']) {
    const [w, h] = dims(files[`${f}.svg`]);
    await raster(`${f}.svg`, `${f}.png`, w, h);
  }
  const { rm } = await import('node:fs/promises');
  await rm(new URL('../images/.render.html', import.meta.url), { force: true });
  console.log('✔ images: logo/banner/gallery .svg + icon/banner/gallery .png');
} else {
  console.log('! Chrome not found: wrote SVGs only (set CHROME_PATH to rasterize)');
}
