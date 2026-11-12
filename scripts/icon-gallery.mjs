// Generates an always-up-to-date icon gallery from whatever is in icons/:
//   images/icons-styles.svg  one explorer panel per icon style (from icons/catalog.json)
//   images/icons-files.svg   every file badge (icons/files) + every folder kind (classic)
// Icons are embedded as data: URIs (GitHub renders README SVGs via <img>, which
// blocks external refs), then rasterized to PNG with headless Chrome for the Marketplace.
import { readFile, writeFile, readdir, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { posix } from 'node:path';

const root = (p) => new URL(`../${p}`, import.meta.url);
const out = (f) => root(`images/${f}`);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
const FONT = `font-family="'JetBrains Mono','SF Mono',Menlo,Consolas,monospace"`;
const SANS = `font-family="'Inter','Segoe UI',-apple-system,Helvetica,Arial,sans-serif"`;
const INK = { paper: '#f3ead6', ink: '#141414', red: '#e0301e', blue: '#1d4ed8', yellow: '#f2b705' };
await mkdir(out(''), { recursive: true });

const catalog = JSON.parse(await readFile(root('icons/catalog.json'), 'utf8'));
let FILES = [];
try { ({ FILES } = await import('./icon-data.mjs')); } catch { /* captions fall back to ids */ }

const uriCache = new Map();
async function dataUri(rel) {
  if (!uriCache.has(rel)) {
    let svg = '';
    try { svg = await readFile(root(`icons/${rel}`)); } catch { /* missing icon -> blank */ }
    uriCache.set(rel, svg ? `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}` : '');
  }
  return uriCache.get(rel);
}
const img = (uri, x, y, s) => (uri ? `<image href="${uri}" x="${x}" y="${y}" width="${s}" height="${s}"/>` : '');

// shared comic-print page frame
function page(w, h, title, sub, body) {
  const dots = Array.from({ length: 7 }, (_, r) => Array.from({ length: 10 }, (_, c) =>
    `<circle cx="${w - 30 - c * 14}" cy="${22 + r * 14}" r="${Math.max(0.6, 4 - (c * 0.3 + r * 0.5))}"/>`).join('')).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<rect width="${w}" height="${h}" rx="18" fill="${INK.paper}"/>
<g fill="${INK.ink}" opacity="0.12">${dots}</g>
<rect x="6" y="6" width="${w - 12}" height="${h - 12}" rx="14" fill="none" stroke="${INK.ink}" stroke-width="4"/>
<text x="32" y="58" font-size="30" font-weight="900" fill="${INK.ink}" ${SANS}>${esc(title)}</text>
<rect x="32" y="70" width="${Math.min(260, title.length * 17)}" height="6" fill="${INK.red}"/>
<text x="32" y="100" font-size="14" fill="${INK.ink}" opacity="0.75" ${FONT}>${esc(sub)}</text>
${body}
</svg>`;
}

// ---- 1. styles: explorer tree per style ------------------------------------
const TREE = [
  [0, 'd', 'apps'], [0, 'o', 'src'], [1, 'd', 'api'], [1, 'd', 'auth'], [1, 'd', 'components'],
  [1, 'f', 'main.ts'], [1, 'f', 'app.controller.ts'], [1, 'f', 'user.service.ts'],
  [0, 'd', 'test'], [0, 'd', 'assets'], [0, 'd', 'node_modules'], [0, 'd', '.github'],
  [0, 'f', '.env'], [0, 'f', 'package.json'], [0, 'f', 'README.md'], [0, 'f', 'Dockerfile'],
  [0, 'f', 'main.py'], [0, 'f', 'lib.rs'],
];
async function loadTheme(style) {
  try { return JSON.parse(await readFile(root(`icons/${style}/theme.json`), 'utf8')); } catch { return null; }
}
function resolve(t, kind, name, style) {
  if (!t) return null;
  const n = name.toLowerCase();
  let id;
  if (kind === 'f') {
    id = t.fileNames?.[n] ?? t.fileNames?.[name];
    const parts = n.split('.');
    for (let i = 1; !id && i < parts.length; i++) id = t.fileExtensions?.[parts.slice(i).join('.')];
    id ??= t.file;
  } else if (kind === 'o') id = t.folderNamesExpanded?.[n] ?? t.folderExpanded;
  else id = t.folderNames?.[n] ?? t.folder;
  const p = t.iconDefinitions?.[id]?.iconPath;
  return p ? posix.normalize(`${style}/${p}`) : null;
}

async function stylePanel(entry, x, y, w, h, i) {
  const t = await loadTheme(entry.style);
  const ROW = 22, top = y + 64;
  let rows = '';
  for (const [k, [depth, kind, name]] of TREE.entries()) {
    const rel = resolve(t, kind, name, entry.style);
    const ry = top + k * ROW, ix = x + 22 + depth * 16;
    const arrow = kind === 'f' ? '' : `<text x="${ix - 12}" y="${ry + 15}" font-size="10" fill="#8b93a7" ${FONT}>${kind === 'o' ? '▾' : '▸'}</text>`;
    rows += `${arrow}${img(rel ? await dataUri(rel) : '', ix, ry + 3, 16)}<text x="${ix + 22}" y="${ry + 16}" font-size="12.5" fill="#d6dae4" ${FONT}>${esc(name)}</text>`;
  }
  // selection bar walking down the tree (SMIL); static first frame sits on row 1
  const vals = TREE.map((_, k) => top + k * ROW).join(';');
  const sel = `<rect x="${x + 8}" y="${top + ROW}" width="${w - 16}" height="${ROW}" rx="4" fill="#3b82f6" opacity="0.28"><animate attributeName="y" values="${vals}" dur="${TREE.length * 0.9}s" begin="${(i * 0.37).toFixed(2)}s" calcMode="discrete" repeatCount="indefinite"/></rect>`;
  return `<g>
<rect x="${x + 6}" y="${y + 6}" width="${w}" height="${h}" rx="10" fill="${INK.ink}"/>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#1b1f2a" stroke="${INK.ink}" stroke-width="3"/>
<rect x="${x}" y="${y}" width="${w}" height="50" rx="10" fill="${[INK.yellow, INK.red, INK.blue][i % 3]}" stroke="${INK.ink}" stroke-width="3"/>
<text x="${x + 14}" y="${y + 19}" font-size="15" font-weight="900" fill="${i % 3 === 0 ? INK.ink : '#fff'}" ${SANS}>${esc(entry.name)}</text>
${wrap(entry.detail || '', Math.floor((w - 28) / 5.6), 2).map((ln, k) => `<text x="${x + 14}" y="${y + 33 + k * 11}" font-size="9.5" fill="${i % 3 === 0 ? INK.ink : '#fff'}" opacity="0.9" ${FONT}>${esc(ln)}</text>`).join('')}
${sel}${rows}</g>`;
}

/** Greedy word-wrap into at most `max` lines of `width` chars; ellipsis if it still overflows. */
function wrap(text, width, max) {
  const lines = [''];
  for (const word of text.split(/\s+/)) {
    const cur = lines[lines.length - 1];
    if (!cur) lines[lines.length - 1] = word;
    else if ((cur + ' ' + word).length <= width) lines[lines.length - 1] = cur + ' ' + word;
    else lines.push(word);
  }
  if (lines.length > max) { lines.length = max; lines[max - 1] = lines[max - 1].slice(0, width - 1) + '…'; }
  return lines;
}

async function stylesSvg() {
  const COLS = Math.min(4, catalog.length), PW = 300, PH = 64 + TREE.length * 22 + 14, GAP = 30;
  const rowsN = Math.ceil(catalog.length / COLS);
  const W = 32 * 2 + COLS * PW + (COLS - 1) * GAP, H = 130 + rowsN * (PH + GAP) + 10;
  const panels = await Promise.all(catalog.map((e, i) =>
    stylePanel(e, 32 + (i % COLS) * (PW + GAP), 130 + Math.floor(i / COLS) * (PH + GAP), PW, PH, i)));
  return page(W, H, 'Icon styles', `${catalog.length} folder styles · pick one in Preferences: File Icon Theme`, panels.join('\n'));
}

// ---- 2. every file badge + every folder kind --------------------------------
async function filesSvg() {
  const fileIds = (await readdir(root('icons/files'))).filter((f) => f.endsWith('.svg')).map((f) => f.slice(0, -4)).sort();
  const info = new Map(FILES.map((f) => [f[0], f]));
  const caption = (id) => { const f = info.get(id); return f?.[3]?.[0] ? `.${f[3][0]}` : f?.[4]?.[0] ?? id; };
  // group: known language/ext badges first, then special filenames, then anything new
  const group = (id) => (info.get(id)?.[3]?.length ? 0 : info.get(id)?.[4]?.length ? 1 : info.has(id) ? 1 : 2);
  fileIds.sort((a, b) => group(a) - group(b) || a.localeCompare(b));
  const folderIds = (await readdir(root('icons/classic'))).filter((f) => /^folder-.*\.svg$/.test(f) && !f.endsWith('-open.svg'))
    .map((f) => f.slice(7, -4)).sort();

  const COLS = 12, CW = 96, CH = 74, X0 = 32;
  const W = X0 * 2 + COLS * CW;
  let y = 130, body = '';
  const section = (label, n) => { body += `<text x="${X0}" y="${y + 18}" font-size="18" font-weight="900" fill="${INK.ink}" ${SANS}>${esc(label)} <tspan fill="${INK.red}">· ${n}</tspan></text>`; y += 34; };
  async function grid(ids, rel, cap, bg) {
    for (const [k, id] of ids.entries()) {
      const cx = X0 + (k % COLS) * CW, cy = y + Math.floor(k / COLS) * CH;
      const label = cap(id); const fs = label.length > 12 ? 9 : 10.5;
      body += `<rect x="${cx + 4}" y="${cy}" width="${CW - 8}" height="${CH - 8}" rx="8" fill="${bg}" stroke="${INK.ink}" stroke-width="2"/>`
        + img(await dataUri(rel(id)), cx + CW / 2 - 16, cy + 8, 32)
        + `<text x="${cx + CW / 2}" y="${cy + 56}" text-anchor="middle" font-size="${fs}" fill="#d6dae4" ${FONT}>${esc(label.slice(0, 15))}</text>`;
    }
    y += Math.ceil(ids.length / COLS) * CH + 20;
  }
  section('File icons', fileIds.length);
  await grid(fileIds, (id) => `files/${id}.svg`, caption, '#1b1f2a');
  section('Folder kinds (classic)', folderIds.length);
  await grid(folderIds, (id) => `classic/folder-${id}.svg`, (id) => id, '#1b1f2a');
  // subtle highlight sweep across the page
  const sweep = `<defs><linearGradient id="gal-sweep" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.18"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
<rect x="-300" y="120" width="240" height="${y - 120}" fill="url(#gal-sweep)" pointer-events="none"><animate attributeName="x" values="-300;${W + 60}" dur="6s" repeatCount="indefinite"/></rect>`;
  return page(W, y + 16, 'Every icon', `${fileIds.length} file icons · ${folderIds.length} folder kinds × ${catalog.length} styles`, body + sweep);
}

const files = { 'icons-styles.svg': await stylesSvg(), 'icons-files.svg': await filesSvg() };
for (const [f, svg] of Object.entries(files)) {
  await writeFile(out(f), svg + '\n');
  const mb = Buffer.byteLength(svg) / 1e6;
  console.log(`${mb > 2 ? '! ' : '✔ '}images/${f} (${mb.toFixed(2)} MB${mb > 2 ? ' — over 2MB' : ''})`);
}

// ---- rasterize with headless Chrome (same approach as art.mjs) ------------
const CHROME = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (CHROME) {
  const html = out('.render-icons.html');
  for (const [f, svg] of Object.entries(files)) {
    const [w, h] = svg.match(/width="(\d+)" height="(\d+)"/).slice(1).map(Number);
    await writeFile(html, `<html><body style="margin:0;background:transparent"><img src="${f}" width="${w}" height="${h}"></body></html>`);
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
      `--window-size=${w},${h}`, `--screenshot=${fileURLToPath(out(f.replace('.svg', '.png')))}`, fileURLToPath(html)], { stdio: 'ignore' });
  }
  await rm(html, { force: true });
  console.log('✔ images: icons-styles.png, icons-files.png');
} else {
  console.log('! Chrome not found: wrote SVGs only (set CHROME_PATH to rasterize)');
}
