// Character styles: kawaii folder creatures, little animal critters and friendly monsters.
// Faces are tuned for 16px: dot eyes r>=1.6, mouth strokes >=1.3, thick #2b2440 ink outline.
import { svg, tint, shade, lumOf, xmlEsc, FONT, CLOSED, OPEN_BACK, OPEN_FRONT } from '../icon-kit.mjs';

const INK = '#2b2440';
const CHEEK = '#ff7a9c';
const st = (w = 1.4) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

// kawaii face centered at (x, y); open = surprised/happy "o" mouth
function face(x, y, open, gap = 4) {
  const eyes = `<circle cx="${x - gap}" cy="${y}" r="1.8" fill="${INK}"/><circle cx="${x + gap}" cy="${y}" r="1.8" fill="${INK}"/>` +
    `<circle cx="${x - gap + 0.6}" cy="${y - 0.6}" r="0.6" fill="#fff"/><circle cx="${x + gap + 0.6}" cy="${y - 0.6}" r="0.6" fill="#fff"/>`;
  const cheeks = `<ellipse cx="${x - gap - 1.6}" cy="${y + 2.6}" rx="1.7" ry="1.1" fill="${CHEEK}" opacity="0.85"/><ellipse cx="${x + gap + 1.6}" cy="${y + 2.6}" rx="1.7" ry="1.1" fill="${CHEEK}" opacity="0.85"/>`;
  const mouth = open
    ? `<ellipse cx="${x}" cy="${y + 3}" rx="1.8" ry="2" fill="${INK}"/><ellipse cx="${x}" cy="${y + 3.8}" rx="1" ry="0.8" fill="${CHEEK}"/>`
    : `<path d="M${x - 1.8} ${y + 2}q1.8 2 3.6 0" fill="none" ${st(1.4)}/>`;
  return eyes + cheeks + mouth;
}

// folder body (closed or open) with ink outline
const body = (c, open) => open
  ? `<path d="${OPEN_BACK}" fill="${shade(tint(c, 0.25), 0.2)}" ${st()}/><path d="${OPEN_FRONT}" fill="${tint(c, 0.3)}" ${st()}/>`
  : `<path d="${CLOSED}" fill="${tint(c, 0.3)}" ${st()}/>`;

// label chip for file characters (bottom half), readable at 16px
function chip(label, c) {
  const n = label.length;
  const size = n <= 2 ? 11.5 : n === 3 ? 9.5 : 7.6;
  const ink = lumOf(c) > 0.62 ? '#141414' : '#ffffff';
  return `<rect x="1.2" y="17.2" width="29.6" height="13.4" rx="4" fill="${c}" ${st(1.3)}/>` +
    `<text x="16" y="27.6" text-anchor="middle" font-size="${size}" font-weight="900" fill="${ink}" ${FONT}>${xmlEsc(label)}</text>`;
}

// ---- critter accessories (drawn behind = 'b', in front = 'f') -------------
const CRIT = {
  default: (c) => ({ b: `<circle cx="9" cy="6" r="3.4" fill="${tint(c, 0.3)}" ${st()}/><circle cx="23" cy="8.5" r="3.4" fill="${tint(c, 0.3)}" ${st()}/>` }), // bear ears
  git: (c) => ({ b: `<path d="M6 8L7.5 1.5L12.5 6z" fill="${tint(c, 0.3)}" ${st()}/><path d="M20 8.5L25.5 2.5L27 9z" fill="${tint(c, 0.3)}" ${st()}/>`, f: `<path d="M3 20h4M3.5 22.5l3.5-0.8M29 20h-4M28.5 22.5l-3.5-0.8" ${st(1.2)}/>` }), // cat
  test: () => ({ b: `<path d="M12 8Q10 3 7 2M20 8.5Q22 3 25 2" fill="none" ${st(1.5)}/><circle cx="7" cy="2.3" r="1.9" fill="#ffd166" ${st(1.1)}/><circle cx="25" cy="2.3" r="1.9" fill="#ffd166" ${st(1.1)}/>`, f: `<circle cx="7" cy="25" r="1.2" fill="${INK}"/><circle cx="25" cy="25" r="1.2" fill="${INK}"/>` }), // bug
  ai: () => ({ b: `<path d="M21 8.5V3" ${st(1.5)}/><circle cx="21" cy="2.6" r="2.1" fill="#ff5c8a" ${st(1.1)}/><rect x="0.6" y="14" width="2.6" height="7" rx="1" fill="#c9c3e6" ${st(1.1)}/><rect x="28.8" y="14" width="2.6" height="7" rx="1" fill="#c9c3e6" ${st(1.1)}/>` }), // robot
  docker: (c) => ({ b: `<path d="M28 17q3.5-3 3.5-7l-2.4 2.4-2-2.4z" fill="${tint(c, 0.3)}" ${st()}/><path d="M19 6.5q0-3 -2-4.5M19 6.5q0-3 2-4.5" fill="none" stroke="#7cc8ff" stroke-width="1.5" stroke-linecap="round"/>` }), // whale
  db: (c) => ({ b: `<ellipse cx="3" cy="17" rx="3" ry="5" fill="${tint(c, 0.15)}" ${st()}/><ellipse cx="29" cy="17" rx="3" ry="5" fill="${tint(c, 0.15)}" ${st()}/>`, f: `<path d="M16 22v4.5q0 2 2 1.5" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/><path d="M16 22v4.5q0 2 2 1.5" fill="none" stroke="${tint(c, 0.3)}" stroke-width="1" stroke-linecap="round"/>` }), // elephant
  node: (c) => ({ b: `<ellipse cx="8" cy="27.5" rx="2.4" ry="2" fill="#8bd17c" ${st(1.2)}/><ellipse cx="24" cy="27.5" rx="2.4" ry="2" fill="#8bd17c" ${st(1.2)}/>`, f: `<path d="M6 13h4l2 2h-8zM22 13h4l2 2h-8z" fill="${shade(c, 0.25)}"/>` }), // turtle (legs + shell plates)
  assets: (c) => ({ b: `<ellipse cx="9" cy="3.5" rx="2" ry="4.5" fill="${tint(c, 0.3)}" ${st()}/><ellipse cx="22" cy="4.5" rx="2" ry="4.5" fill="${tint(c, 0.3)}" ${st()}/>` }), // bunny
  docs: (c) => ({ b: `<path d="M4 9L5 2.5L10 7.5zM28 10.5L27 3.5L22 8.5z" fill="${shade(c, 0.2)}" ${st()}/>` }), // owl tufts
  styles: () => ({ b: `<path d="M14.5 8.5L17.5 0.8L19.5 8.5z" fill="#ffe08a" ${st(1.2)}/>` }), // unicorn
  hooks: () => ({ b: `<circle cx="10" cy="7" r="3.6" fill="#a6e3a1" ${st()}/><circle cx="22" cy="8.5" r="3.6" fill="#a6e3a1" ${st()}/>` }), // frog
  config: (c) => ({ b: `<path d="M3 18q-3-2-1.5-5l2 1.5zM29 18q3-2 1.5-5l-2 1.5z" fill="${shade(c, 0.1)}" ${st(1.2)}/>` }), // crab claws
};

// ---- monster bits ----------------------------------------------------------
const hash = (s = '') => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);
function monster(x, y, open, k) {
  const eye = k % 3 === 2
    ? `<circle cx="${x - 3.6}" cy="${y}" r="2.6" fill="#fff" ${st(1.2)}/><circle cx="${x + 3.6}" cy="${y}" r="2.6" fill="#fff" ${st(1.2)}/><circle cx="${x - 3.2}" cy="${y + 0.4}" r="1.4" fill="${INK}"/><circle cx="${x + 4}" cy="${y + 0.4}" r="1.4" fill="${INK}"/>`
    : `<circle cx="${x}" cy="${y}" r="${open ? 4.4 : 4}" fill="#fff" ${st(1.3)}/><circle cx="${x + 0.6}" cy="${y + 0.6}" r="2.1" fill="${INK}"/><circle cx="${x + 1.3}" cy="${y - 0.2}" r="0.7" fill="#fff"/>`;
  const my = y + 6;
  const mouth = open
    ? `<path d="M${x - 4} ${my - 0.6}q4 5 8 0z" fill="${INK}" ${st(1.2)}/><path d="M${x - 2.6} ${my}l0.9 1.8 0.9-1.8zM${x + 0.8} ${my}l0.9 1.8 0.9-1.8z" fill="#fff"/>`
    : `<path d="M${x - 4} ${my}q4 2.4 8 0" fill="none" ${st(1.4)}/><path d="M${x - 2.6} ${my + 0.6}l0.9 1.8 0.9-1.6zM${x + 0.8} ${my + 0.9}l0.9 1.6 0.9-1.8z" fill="#fff" ${st(0.8)}/>`;
  return eye + mouth;
}
const horns = (k) => k % 2
  ? `<path d="M7 8q-3-4 0-7q0 4 4 6.5zM25 9q3-4 0-7q0 4-4 6.5z" fill="#fff1d6" ${st(1.2)}/>`
  : `<path d="M8 8l1-6.5 4 6zM24 8.5l-1-6.5-4 6z" fill="#fff1d6" ${st(1.2)}/>`;
// fluffy fur tufts along the bottom edge
const fluff = (c, y) => `<path d="M4 ${y}l2 2.4 2-2.4 2 2.4 2-2.4 2 2.4 2-2.4 2 2.4 2-2.4 2 2.4 2-2.4 2 2.4 2-2.4" fill="${tint(c, 0.3)}" ${st(1.2)}/>`;

// file blob shared by all three: rounded body, character on top, label chip below
const fileChar = (top, c, label, extra = '') => svg(`${extra}<rect x="4" y="2.5" width="24" height="24" rx="10" fill="${tint(c, 0.45)}" ${st()}/>${top}${chip(label, c)}`);
const fileFace = (y) => `<circle cx="12" cy="${y}" r="1.7" fill="${INK}"/><circle cx="20" cy="${y}" r="1.7" fill="${INK}"/><ellipse cx="9" cy="${y + 3}" rx="1.6" ry="1" fill="${CHEEK}"/><ellipse cx="23" cy="${y + 3}" rx="1.6" ry="1" fill="${CHEEK}"/><path d="M14.4 ${y + 2}q1.6 1.8 3.2 0" fill="none" ${st(1.3)}/>`;

// monster file: big eye on top, fangs biting the label chip
const monFile = (label, c, k) => fileChar((k % 3 === 2
  ? `<circle cx="11.5" cy="10.5" r="3" fill="#fff" ${st(1.2)}/><circle cx="20.5" cy="10.5" r="3" fill="#fff" ${st(1.2)}/><circle cx="12" cy="11" r="1.6" fill="${INK}"/><circle cx="21" cy="11" r="1.6" fill="${INK}"/>`
  : `<circle cx="16" cy="10.5" r="4.6" fill="#fff" ${st(1.3)}/><circle cx="16.6" cy="11.1" r="2.3" fill="${INK}"/><circle cx="17.4" cy="10.2" r="0.8" fill="#fff"/>`), c, label, horns(k))
  + '';
const fangs = '<path d="M11 17.2l1.3 2.6 1.3-2.6zM18.4 17.2l1.3 2.6 1.3-2.6z" fill="#fff" stroke="#2b2440" stroke-width="0.9" stroke-linejoin="round"/>';

export default {
  buddies: {
    name: 'Buddies', detail: 'kawaii folder creatures with rosy cheeks',
    draw: (c, e, open) => body(c, open) + face(open ? 16.5 : 16, open ? 18.5 : 17.5, open),
    fileIcon: (label, c) => fileChar(fileFace(10), c, label),
    defaultFileIcon: () => fileChar(fileFace(10), '#8b9bb4', '··'),
  },
  critters: {
    name: 'Critters', detail: 'folders as little animals: cats, bugs, robots, whales…',
    draw: (c, e, open, id) => {
      const a = (CRIT[id] || CRIT.default)(c);
      return (a.b || '') + body(c, open) + (a.f || '') + face(open ? 16.5 : 16, open ? 18.5 : 17.5, open);
    },
    fileIcon: (label, c) => fileChar(fileFace(10.5), c, label, `<circle cx="8" cy="5" r="3" fill="${tint(c, 0.45)}" ${st()}/><circle cx="24" cy="5" r="3" fill="${tint(c, 0.45)}" ${st()}/>`),
    defaultFileIcon: () => fileChar(fileFace(10.5), '#8b9bb4', '··', `<circle cx="8" cy="5" r="3" fill="#c5cdd9" ${st()}/><circle cx="24" cy="5" r="3" fill="#c5cdd9" ${st()}/>`),
  },
  monsters: {
    name: 'Monsters', detail: 'friendly monsters: horns, big eyes, tiny fangs',
    draw: (c, e, open, id) => {
      const k = hash(id);
      return horns(k) + fluff(c, open ? 25.6 : 25.8) + body(c, open) + monster(open ? 16.5 : 16, open ? 17.5 : 16.5, open, k);
    },
    fileIcon: (label, c, id) => monFile(label, c, hash(id)).replace('</svg>', fangs + '</svg>'),
    defaultFileIcon: () => monFile('··', '#8b9bb4', 1).replace('</svg>', fangs + '</svg>'),
  },
};
