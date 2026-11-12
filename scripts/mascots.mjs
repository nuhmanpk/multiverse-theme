// Kawaii mascot for every palette: round blob, dot eyes, rosy cheeks, plus a prop
// picked from the theme's group (and id, via an optional override map). All original.
// Writes images/mascots/<id>.svg, images/mascots.svg (animated grid) and mascots.png.
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { palettes, GROUPS } from './palettes.mjs';

const INK = '#141414', PAPER = '#f3ead6';
const SANS = `font-family="'Inter','Segoe UI',-apple-system,Helvetica,Arial,sans-serif"`;

// ---- color helpers ----------------------------------------------------------
const rgb = (h) => { h = h.replace('#', ''); if (h.length === 3) h = [...h].map((c) => c + c).join(''); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const toHex = (a) => '#' + a.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
const mix = (a, b, t) => toHex(rgb(a).map((v, i) => v + (rgb(b)[i] - v) * t));
const lum = (h) => { const [r, g, b] = rgb(h); return (0.299 * r + 0.587 * g + 0.114 * b) / 255; };
const hash = (s) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);

const groupOf = {};
for (const [g, ids] of Object.entries(GROUPS)) for (const id of ids) groupOf[id] = g;

// ---- props (drawn in a 64×64 box; face centred ~ (32,38)) -------------------
// Each returns { back, front, eyes?, head? } SVG fragments.
const st = `stroke="${INK}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
const P = {
  sprout: (c) => ({ front: `<path d="M32 23 q0 -6 0 -7" fill="none" ${st}/><path d="M32 17 q-6 -5 -9 -1 q4 4 9 1z" fill="${c.string}" ${st}/><path d="M32 17 q6 -6 9 -2 q-4 4 -9 2z" fill="${c.string}" ${st}/>` }),
  star: (c) => ({ front: `<path d="M32 9 l2.6 5.4 5.9 .8 -4.3 4.1 1 5.8 -5.2 -2.8 -5.2 2.8 1 -5.8 -4.3 -4.1 5.9 -.8z" fill="${c.warning}" ${st}/>` }),
  nightcap: (c) => ({ front: `<path d="M17 30 q4 -14 22 -12 q8 2 9 -6 q4 10 -4 16 q-10 -4 -27 2z" fill="${c.keyword}" ${st}/><circle cx="48" cy="12" r="3" fill="#fff" ${st}/>` }),
  glasses: () => ({ front: `<g fill="#ffffff55" ${st}><circle cx="25.5" cy="37" r="5"/><circle cx="38.5" cy="37" r="5"/></g><path d="M30.5 37 h3" ${st}/>` }),
  sun: (c) => ({ front: `<g ${st}>${Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return `<path d="M${50 + Math.cos(a) * 6.5} ${15 + Math.sin(a) * 6.5} L${50 + Math.cos(a) * 9} ${15 + Math.sin(a) * 9}"/>`; }).join('')}</g><circle cx="50" cy="15" r="5" fill="${c.warning}" ${st}/>` }),
  moon: (c) => ({ front: `<path d="M48 8 a8 8 0 1 0 6 13 a6.5 6.5 0 1 1 -6 -13z" fill="${c.warning}" ${st}/><circle cx="14" cy="17" r="1.2" fill="${c.fg}"/><circle cx="20" cy="11" r="0.9" fill="${c.fg}"/>` }),
  headphones: (c) => ({ front: `<path d="M15 38 q0 -20 17 -20 q17 0 17 20" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/><rect x="11.5" y="34" width="7" height="11" rx="3.5" fill="${c.accent}" ${st}/><rect x="45.5" y="34" width="7" height="11" rx="3.5" fill="${c.accent}" ${st}/>` }),
  cape: (c) => ({ back: `<path d="M18 40 q-4 14 -8 18 q22 4 44 0 q-4 -4 -8 -18z" fill="${c.tag}" ${st}/>` }),
  mask: (c) => ({ front: `<path d="M17 35 q15 -6 30 0 q1 6 -4 7 q-5 0 -7 -3 h-8 q-2 3 -7 3 q-5 -1 -4 -7z" fill="${c.keyword}" ${st}/>`, eyes: 'mask' }),
  emblem: (c, id) => {
    const k = hash(id) % 3, x = 32, y = 50;
    const shape = [`<path d="M${x - 1} ${y - 4} l-3 5 h3 l-1 4 4 -6 h-3 l1 -3z" fill="${c.warning}" ${st}/>`,
      `<path d="M${x} ${y - 4} l1.2 2.6 2.8 .3 -2.1 2 .6 2.8 -2.5 -1.4 -2.5 1.4 .6 -2.8 -2.1 -2 2.8 -.3z" fill="${c.warning}" ${st}/>`,
      `<path d="M${x} ${y - 4} l4 4 -4 4 -4 -4z" fill="${c.warning}" ${st}/>`][k];
    return { front: shape };
  },
  horns: (c) => ({ front: `<path d="M20 27 q-6 -6 -4 -14 q5 6 10 9z M44 27 q6 -6 4 -14 q-5 6 -10 9z" fill="${c.constant}" ${st}/>` }),
  jesterHat: (c) => ({ front: `<path d="M17 29 q-6 -10 -10 -12 q10 -2 15 6 q4 -12 10 -14 q6 2 10 14 q5 -8 15 -6 q-4 2 -10 12 q-15 -4 -30 0z" fill="${c.keyword}" ${st}/><circle cx="7" cy="17" r="2.2" fill="${c.warning}" ${st}/><circle cx="32" cy="9" r="2.2" fill="${c.warning}" ${st}/><circle cx="57" cy="17" r="2.2" fill="${c.warning}" ${st}/>` }),
  beret: (c) => ({ front: `<path d="M16 28 q2 -10 18 -10 q12 0 13 7 q-14 -2 -31 3z" fill="${c.keyword}" ${st}/><path d="M33 18 v-3" ${st}/><path d="M50 50 l7 -12" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/><path d="M57 38 l1.5 -3" stroke="${c.tag}" stroke-width="3" stroke-linecap="round"/>` }),
  bolt: (c) => ({ front: `<path d="M51 6 l-6 10 h5 l-3 9 9 -12 h-5 l3 -7z" fill="${c.warning}" ${st}><animate attributeName="opacity" values="1;.4;1" dur="1.2s" repeatCount="indefinite"/></path>` }),
  crown: (c) => ({ front: `<path d="M22 25 l-2 -10 6 5 6 -8 6 8 6 -5 -2 10z" fill="${c.warning}" ${st}/>` }),
  catEars: (c) => ({ back: `<path d="M17 30 l1 -13 10 8z M47 30 l-1 -13 -10 8z" fill="${c.face}" ${st}/>` }),
  tuft: (c) => ({ front: `<path d="M24 25 q2 -12 9 -14 q-2 5 1 7 q3 -6 9 -6 q-4 4 -2 10 q-8 -3 -17 3z" fill="${c.keyword}" ${st}/>`, eyes: 'sparkle' }),
  headband: (c) => ({ front: `<path d="M16 31 q16 -6 32 0 v4 q-16 -6 -32 0z" fill="${c.func}" ${st}/><path d="M48 32 l8 -3 -2 6z" fill="${c.func}" ${st}/><rect x="29" y="28.5" width="6" height="4" rx="1" fill="#d9dde5" ${st}/>`, eyes: 'sparkle' }),
  wand: (c) => ({ front: `<path d="M51 52 L56 38" ${st}/><path d="M56 31 l1.6 3.3 3.6 .5 -2.6 2.5 .6 3.6 -3.2 -1.7 -3.2 1.7 .6 -3.6 -2.6 -2.5 3.6 -.5z" fill="${c.warning}" ${st}/>`, eyes: 'sparkle' }),
  antenna: (c) => ({ front: `<path d="M32 23 v-9" ${st}/><circle cx="32" cy="12" r="3" fill="${c.error}" ${st}><animate attributeName="opacity" values="1;.35;1" dur="1.4s" repeatCount="indefinite"/></circle>` }),
  helmet: (c) => ({ front: `<ellipse cx="32" cy="37" rx="21.5" ry="20" fill="#ffffff2a" ${st}/><path d="M18 29 q5 -8 12 -9" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>` , back: `<rect x="17" y="49" width="30" height="8" rx="4" fill="${c.fgMuted}" ${st}/>` }),
  pixel: (c) => ({ front: [[10, 14, c.error], [14, 10, c.warning], [50, 12, c.string], [54, 16, c.func]].map(([x, y, f]) => `<rect x="${x}" y="${y}" width="4" height="4" fill="${f}" ${st}/>`).join('') }),
  crt: (c) => ({ head: 'crt', front: `<path d="M26 22 l-5 -8 M38 22 l5 -8" ${st}/><g opacity=".18" stroke="${INK}" stroke-width=".8">${[28, 32, 36, 40, 44].map((y) => `<path d="M17 ${y} h30"/>`).join('')}</g>` }),
  shoes: (c) => ({ front: `<ellipse cx="22" cy="54" rx="7.5" ry="4" fill="${c.error}" ${st}/><ellipse cx="42" cy="54" rx="7.5" ry="4" fill="${c.error}" ${st}/><path d="M18 52.5 q4 -2 8 0 M38 52.5 q4 -2 8 0" fill="none" stroke="#fff" stroke-width="1.2" stroke-linecap="round" opacity=".8"/>` }),
  bubbles: (c) => ({ front: [[12, 22, 3.5], [8, 14, 2.2], [52, 18, 2.8]].map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff55" stroke="${c.func}" stroke-width="1.3"><animate attributeName="cy" values="${y};${y - 4};${y}" dur="${2 + i * .6}s" repeatCount="indefinite"/></circle>`).join('') }),
  claws: (c) => ({ back: `<path d="M14 44 q-6 -2 -7 -8 q4 0 5 3 q0 -5 4 -6 q1 6 -2 11z M50 44 q6 -2 7 -8 q-4 0 -5 3 q0 -5 -4 -6 q-1 6 2 11z" fill="${c.error}" ${st}/>`, front: `<path d="M26 23 q-2 -7 -5 -8 M38 23 q2 -7 5 -8" fill="none" ${st}/><circle cx="21" cy="15" r="2" fill="${INK}"/><circle cx="43" cy="15" r="2" fill="${INK}"/>` }),
  gopher: (c) => ({ back: `<circle cx="18" cy="26" r="4.5" fill="${c.face}" ${st}/><circle cx="46" cy="26" r="4.5" fill="${c.face}" ${st}/>`, front: `<rect x="29.5" y="43" width="5" height="4" rx="1" fill="#fff" ${st}/>`, mouth: 'none' }),
  snake: (c) => ({ front: `<path d="M10 56 q8 -6 14 0 t14 0 t14 0" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M10 56 q8 -6 14 0 t14 0 t14 0" fill="none" stroke="${c.string}" stroke-width="3.6" stroke-linecap="round"/><circle cx="52" cy="56" r="3.6" fill="${c.warning}" ${st}/><circle cx="53" cy="55" r=".9" fill="${INK}"/>` }),
  braces: (c) => ({ front: `<text x="8" y="22" font-size="13" font-weight="800" fill="${c.keyword}" font-family="monospace">{</text><text x="49" y="22" font-size="13" font-weight="800" fill="${c.keyword}" font-family="monospace">}</text>` }),
  coffee: (c) => ({ front: `<path d="M44 46 h12 l-1.5 10 h-9z" fill="#fff" ${st}/><path d="M55.5 48 q4 0 3 4 q-1 2 -3.5 2" fill="none" ${st}/><path d="M48 43 q-2 -3 0 -5 M52 43 q-2 -3 0 -5" fill="none" stroke="${c.fgMuted}" stroke-width="1.2" stroke-linecap="round"><animate attributeName="opacity" values=".2;1;.2" dur="2s" repeatCount="indefinite"/></path>` }),
  cloud: (c) => ({ front: `<path d="M38 18 q-1 -7 6 -8 q3 -5 9 -2 q6 0 5 6 q4 3 -1 6 h-16 q-4 0 -3 -2z" fill="#e8edf5" ${st}/>${[42, 48, 54].map((x, i) => `<path d="M${x} 24 l-1 3" stroke="${c.func}" stroke-width="1.6" stroke-linecap="round"><animate attributeName="opacity" values="1;0;1" dur="1s" begin="${i * .3}s" repeatCount="indefinite"/></path>`).join('')}` }),
  vinyl: (c) => ({ front: `<g><circle cx="50" cy="16" r="9" fill="${INK}"/><circle cx="50" cy="16" r="6" fill="none" stroke="#444" stroke-width=".8"/><circle cx="50" cy="16" r="2.6" fill="${c.number}"/><animateTransform attributeName="transform" type="rotate" values="0 50 16;360 50 16" dur="4s" repeatCount="indefinite"/></g><path d="M12 18 v-6 l5 -1 v6" fill="none" ${st}/><circle cx="10.5" cy="18" r="1.8" fill="${INK}"/><circle cx="15.5" cy="17" r="1.8" fill="${INK}"/>` }),
  pumpkin: (c) => ({ head: 'pumpkin', front: `<path d="M32 23 q1 -6 5 -7" fill="none" stroke="${c.string}" stroke-width="2.6" stroke-linecap="round"/><path d="M26 25 q-2 13 0 26 M38 25 q2 13 0 26" fill="none" stroke="${INK}" stroke-width="1" opacity=".35"/>` }),
  pine: (c) => ({ front: `<path d="M50 6 l7 10 h-4 l6 8 h-18 l6 -8 h-4z" fill="${c.string}" ${st}/><rect x="48.5" y="24" width="3" height="4" fill="${c.number}" ${st}/><circle cx="50" cy="6" r="1.6" fill="${c.warning}"/><path d="M19 28 q13 -6 26 0" fill="none" stroke="${c.error}" stroke-width="3" stroke-linecap="round"/>` }),
  earmuffs: (c) => ({ front: `<path d="M15 36 q0 -19 17 -19 q17 0 17 19" fill="none" stroke="${c.func}" stroke-width="2.6"/><circle cx="15" cy="38" r="5" fill="#fff" ${st}/><circle cx="49" cy="38" r="5" fill="#fff" ${st}/>`, back: '' }),
  flame: (c) => ({ front: `<path d="M32 26 q-9 -6 -4 -14 q1 4 4 4 q-1 -6 5 -10 q-1 6 4 10 q3 6 -9 10z" fill="${c.number}" ${st}><animateTransform attributeName="transform" type="scale" values="1 1;1 1.06;1 1" dur="0.9s" additive="sum" repeatCount="indefinite"/></path>` }),
  leaf: (c) => ({ front: `<path d="M32 24 q-2 -10 8 -13 q2 9 -8 13z" fill="${c.string}" ${st}/><path d="M32 24 q3 -6 7 -11" fill="none" stroke="${INK}" stroke-width="1"/>` }),
  laurel: (c) => ({ front: `<path d="M17 32 q2 -10 15 -12 q13 2 15 12" fill="none" stroke="${c.string}" stroke-width="1.6"/>${[[19, 28, -40], [23, 23, -25], [28, 20.5, -10], [36, 20.5, 10], [41, 23, 25], [45, 28, 40]].map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="3.2" ry="1.7" transform="rotate(${r} ${x} ${y})" fill="${c.string}" ${st}/>`).join('')}` }),
  nemes: (c) => ({ back: `<path d="M14 50 l3 -22 q15 -10 30 0 l3 22 q-6 -2 -8 -10 h-20 q-2 8 -8 10z" fill="${c.warning}" ${st}/>`, front: `<path d="M17 30 q15 -9 30 0" fill="none" stroke="${c.func}" stroke-width="3"/>` }),
};

// group → prop list (generic fallback by hash), plus optional per-id override.
const BY_GROUP = {
  'Core': [['sprout'], ['star'], ['catEars']],
  'Accessibility': [['glasses']],
  'Focus & Workflow': [['headphones']],
  'Heroes & Villains': [['cape', 'mask', 'emblem']],
  'Anime': [['tuft'], ['catEars', 'tuft']],
  'Cartoons': [['shoes', 'bubbles'], ['shoes']],
  'Sci-fi & Games': [['helmet', 'antenna'], ['pixel', 'antenna']],
  'Retro': [['crt']],
  'Dev Culture': [['braces']],
  'Moods & Seasons': [['cloud'], ['coffee']],
  'Nature, Food & Myth': [['leaf']],
  'Art & Design': [['beret']],
  'Neon & Electric': [['bolt'], ['bolt', 'antenna'], ['bolt', 'tuft']],
  'Luxe & Cinematic': [['crown'], ['star', 'catEars']],
};
const OVERRIDE = {
  night: ['nightcap'], midnight: ['star', 'catEars'], day: ['sprout'], dusk: ['catEars'],
  nightshift: ['glasses', 'moon'], sunlight: ['glasses', 'sun'],
  jester: ['jesterHat'], trickster: ['cape', 'horns'], titan: ['cape', 'crown'], symbiote: ['horns', 'mask'], panther: ['catEars', 'mask'], mystic: ['cape', 'emblem', 'star'],
  shinobi: ['headband'], mecha: ['antenna', 'tuft'], magical: ['tuft', 'wand'], highseas: ['tuft', 'bubbles'], toon: ['shoes', 'tuft'],
  reef: ['bubbles'], arcade: ['pixel'], blocks: ['pixel', 'crt'], saber: ['helmet'], mars: ['helmet', 'antenna'], nebula: ['helmet', 'star'],
  rustforge: ['claws'], gopher: ['gopher'], pythonista: ['snake', 'glasses'],
  lofi: ['headphones', 'coffee'], rainy: ['cloud'], vinyl: ['vinyl'], pumpkin: ['pumpkin'], pine: ['pine'],
  arctic: ['earmuffs'], volcano: ['flame'], espresso: ['coffee'], matcha: ['leaf', 'coffee'], olympus: ['laurel'], pharaoh: ['nemes'],
};
function propsFor(id) {
  if (OVERRIDE[id]) return OVERRIDE[id];
  const opts = BY_GROUP[groupOf[id]] || [['sprout'], ['star'], ['catEars'], ['antenna'], ['tuft']];
  return opts[hash(id) % opts.length];
}

/** Inner SVG for one mascot in a 0..64 box. `uid` keeps ids unique when inlined. */
export function mascotBody(id, { animate = true, begin = 0 } = {}) {
  const p = palettes[id];
  const light = lum(p.bg) > 0.5;
  const c = { ...p, face: mix(p.accent, '#ffffff', light ? 0.25 : 0.45) };
  const parts = propsFor(id).map((k) => P[k](c, id));
  const pick = (k) => parts.map((x) => x[k]).find(Boolean);
  const head = pick('head'), eyes = pick('eyes'), mouth = pick('mouth');
  const disc = mix(p.bg, p.accent, light ? 0.12 : 0.18);
  const h = hash(id);
  const b = (Number(begin) + (h % 10) / 10).toFixed(1);

  const face = head === 'crt' ? `<rect x="14" y="22" width="36" height="32" rx="8" fill="${c.face}" ${st}/>`
    : head === 'pumpkin' ? `<path d="M32 24 q-17 -2 -18 14 q1 15 18 15 q17 0 18 -15 q-1 -16 -18 -14z" fill="${p.number}" ${st}/>`
      : `<path d="M32 22 q-18 0 -18 17 q0 15 18 15 q18 0 18 -15 q0 -17 -18 -17z" fill="${c.face}" ${st}/>`;
  const ey = 37, ex = [25.5, 38.5];
  const blink = (ry) => (animate ? `<animate attributeName="ry" values="${ry};${ry};0.4;${ry}" keyTimes="0;0.9;0.95;1" dur="4.2s" begin="${b}s" repeatCount="indefinite"/>` : '');
  const eyeSvg = eyes === 'sparkle'
    ? ex.map((x) => `<ellipse cx="${x}" cy="${ey}" rx="3" ry="3.8" fill="${INK}">${blink(3.8)}</ellipse><circle cx="${x + 1}" cy="${ey - 1.5}" r="1.2" fill="#fff"/><circle cx="${x - 1}" cy="${ey + 1.4}" r=".6" fill="#fff"/>`).join('')
    : ex.map((x) => `<ellipse cx="${x}" cy="${ey + (eyes === 'mask' ? 0.5 : 0)}" rx="${eyes === 'mask' ? 1.8 : 2.2}" ry="2.4" fill="${eyes === 'mask' ? '#fff' : INK}">${blink(2.4)}</ellipse>${eyes === 'mask' ? '' : `<circle cx="${x + .8}" cy="${ey - .9}" r=".7" fill="#fff"/>`}`).join('');
  const cheeks = `<ellipse cx="21" cy="43" rx="3.2" ry="2" fill="${mix(p.tag, '#ff8fa8', .5)}" opacity=".65"/><ellipse cx="43" cy="43" rx="3.2" ry="2" fill="${mix(p.tag, '#ff8fa8', .5)}" opacity=".65"/>`;
  const mouthSvg = mouth === 'none' ? '' : (h % 3 === 0
    ? `<path d="M29.5 43 q2.5 3.4 5 0z" fill="${mix(p.error, '#c0394f', .5)}" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>`
    : `<path d="M29.5 42.5 q1.25 2 2.5 0 q1.25 2 2.5 0" fill="none" stroke="${INK}" stroke-width="1.3" stroke-linecap="round"/>`);

  const bob = animate ? `<animateTransform attributeName="transform" type="translate" values="0 0;0 -1.6;0 0" dur="2.6s" begin="${b}s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/>` : '';
  return `<circle cx="32" cy="32" r="30" fill="${disc}" stroke="${INK}" stroke-width="2"/>
<g>${bob}${parts.map((x) => x.back || '').join('')}${face}${eyeSvg}${cheeks}${mouthSvg}${parts.map((x) => x.front || '').join('')}</g>`;
}

export const mascot = (id, size = 64, opts) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">${mascotBody(id, opts)}</svg>`;

// ---- grid poster ---------------------------------------------------------------
function poster() {
  const ids = new Set(Object.keys(palettes));
  const groups = Object.entries(GROUPS).map(([g, list]) => [g, list.filter((i) => ids.has(i))]);
  const grouped = new Set(groups.flatMap(([, l]) => l));
  const rest = [...ids].filter((i) => !grouped.has(i));
  if (rest.length) groups.push(['More', rest]);
  const cols = 10, cell = 104, size = 72, pad = 32, headH = 34, titleH = 90;
  const W = pad * 2 + cols * cell;
  let y = pad + titleH, body = '';
  for (const [g, list] of groups) {
    if (!list.length) continue;
    body += `<rect x="${pad}" y="${y}" width="${g.length * 9.5 + 24}" height="24" fill="#f2b705" stroke="${INK}" stroke-width="2.5"/><text x="${pad + 12}" y="${y + 17}" font-size="14" font-weight="800" fill="${INK}" ${SANS}>${g.toUpperCase().replace(/&/g, '&amp;')}</text>`;
    y += headH;
    list.forEach((id, i) => {
      const cx = pad + (i % cols) * cell, cy = y + Math.floor(i / cols) * (size + 34);
      const name = palettes[id].label.replace(/^Multiverse /, '').replace(/&/g, '&amp;');
      body += `<g transform="translate(${cx + (cell - size) / 2} ${cy}) scale(${size / 64})">${mascotBody(id, { begin: i * 0.13 })}</g>
<text x="${cx + cell / 2}" y="${cy + size + 18}" text-anchor="middle" font-size="${name.length > 15 ? 10 : 11.5}" font-weight="600" fill="${INK}" ${SANS}>${name}</text>`;
    });
    y += Math.ceil(list.length / cols) * (size + 34) + 12;
  }
  const H = y + pad - 12;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="16" fill="${PAPER}"/>
<text x="${pad + 3}" y="${pad + 50}" font-size="44" font-weight="900" fill="#e0301e" ${SANS}>MEET THE MASCOTS</text>
<text x="${pad}" y="${pad + 47}" font-size="44" font-weight="900" fill="${INK}" ${SANS}>MEET THE MASCOTS</text>
<text x="${pad}" y="${pad + 74}" font-size="15" fill="#5a5348" ${SANS}>One tiny friend for each of the ${ids.size} universes, painted with its theme's own colors.</text>
${body}
<rect x="0" y="${H - 8}" width="${W}" height="8" fill="${INK}"/>
</svg>`;
}

// ---- main ------------------------------------------------------------------------
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const img = (f) => new URL(`../images/${f}`, import.meta.url);
  await mkdir(img('mascots/'), { recursive: true });
  for (const id of Object.keys(palettes)) await writeFile(img(`mascots/${id}.svg`), mascot(id, 64, { animate: false }) + '\n');
  const svg = poster();
  await writeFile(img('mascots.svg'), svg + '\n');
  const CHROME = [process.env.CHROME_PATH, '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((x) => x && existsSync(x));
  if (CHROME) {
    const [w, h] = svg.match(/width="(\d+)" height="(\d+)"/).slice(1).map(Number);
    const html = img('.mascots-render.html');
    await writeFile(html, `<html><body style="margin:0;background:transparent"><img src="mascots.svg" width="${w}" height="${h}"></body></html>`);
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--default-background-color=00000000',
      `--window-size=${w},${h}`, `--screenshot=${fileURLToPath(img('mascots.png'))}`, fileURLToPath(html)], { stdio: 'ignore' });
    await rm(html, { force: true });
  }
  console.log(`✔ mascots: ${Object.keys(palettes).length} × images/mascots/<id>.svg + mascots.svg${CHROME ? ' + mascots.png' : ''}`);
}
