// Core folder styles. A style plugin exports { [id]: { name, detail, draw(color, emblem, open) => svgBody, files?: 'badge'|'mono'|'minimal', fileIcon?(label, color, id) => fullSvg } }
import { emb, shade, tint, CLOSED, OPEN_BACK, OPEN_FRONT } from '../icon-kit.mjs';

export default {
  classic: {
    name: 'Classic', detail: 'solid folders, color-coded by purpose',
    draw: (c, e, open) => open
      ? `<path d="${OPEN_BACK}" fill="${shade(c, 0.25)}"/><path d="${OPEN_FRONT}" fill="${c}"/>${emb(e, 16.5, 24, '#ffffff', 9.5)}`
      : `<path d="${CLOSED}" fill="${c}"/><path d="M2.5 11h27" stroke="${tint(c, 0.25)}" stroke-width="1.2"/>${emb(e, 16, 22.5, '#ffffff', 10)}`,
  },
  comic: {
    name: 'Comic', detail: 'ink outline, hard shadow, speech-bubble emblems',
    draw: (c, e, open) => open
      ? `<path d="${OPEN_FRONT}" fill="#141414" transform="translate(1.6 1.6)"/><path d="${OPEN_BACK}" fill="${shade(c, 0.3)}" stroke="#141414" stroke-width="1.6"/><path d="${OPEN_FRONT}" fill="${c}" stroke="#141414" stroke-width="1.6" stroke-linejoin="round"/>${e ? `<circle cx="22" cy="21" r="8" fill="#fff8e6" stroke="#141414" stroke-width="1.6"/>${emb(e, 22, 25, '#141414', 9)}` : ''}`
      : `<path d="${CLOSED}" fill="#141414" transform="translate(1.6 1.6)"/><path d="${CLOSED}" fill="${c}" stroke="#141414" stroke-width="1.6" stroke-linejoin="round"/>${e ? `<circle cx="22" cy="20" r="8" fill="#fff8e6" stroke="#141414" stroke-width="1.6"/>${emb(e, 22, 24, '#141414', 9)}` : ''}`,
  },
  pixel: {
    name: 'Pixel', detail: '8-bit blocky folders',
    draw: (c, e, open) => {
      const body = open
        ? `<path d="M3 6h9v2h2v2h12v3H3z" fill="${shade(c, 0.3)}"/><path d="M6 13h24v2h-1v8h-1v3H4v-3h-1v-8h1v-2h2z" fill="${c}"/>`
        : `<path d="M3 6h9v2h2v2h14v2h1v13h-1v2H4v-2H3z" fill="${c}"/><path d="M3 12h26v2H3z" fill="${tint(c, 0.4)}"/><path d="M4 24h24v3H4z" fill="${shade(c, 0.35)}"/><path d="M3 6h9v2H3z" fill="${tint(c, 0.25)}"/>`;
      return `<g shape-rendering="crispEdges">${body}</g>${emb(e, 16, 24, '#ffffff', 9.5)}`;
    },
  },
  outline: {
    name: 'Outline', detail: 'minimal line folders',
    draw: (c, e, open) => open
      ? `<path d="${OPEN_BACK}" fill="none" stroke="${c}" stroke-width="1.8" stroke-linejoin="round" opacity="0.6"/><path d="${OPEN_FRONT}" fill="${c}" fill-opacity="0.12" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>${emb(e, 16.5, 24, c, 9.5)}`
      : `<path d="${CLOSED}" fill="${c}" fill-opacity="0.08" stroke="${c}" stroke-width="1.8" stroke-linejoin="round"/>${emb(e, 16, 22.5, c, 10)}`,
  },
  neon: {
    name: 'Neon', detail: 'glowing line folders for dark themes',
    draw: (c, e, open) => {
      const glow = `<filter id="g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
      const lc = tint(c, 0.35);
      return `<defs>${glow}</defs><g filter="url(#g)">${open
        ? `<path d="${OPEN_BACK}" fill="none" stroke="${lc}" stroke-width="1.5" opacity="0.6"/><path d="${OPEN_FRONT}" fill="none" stroke="${lc}" stroke-width="1.8" stroke-linejoin="round"/>${emb(e, 16.5, 24, lc, 9.5)}`
        : `<path d="${CLOSED}" fill="none" stroke="${lc}" stroke-width="1.8" stroke-linejoin="round"/>${emb(e, 16, 22.5, lc, 10)}`}</g>`;
    },
  },
  glass: {
    name: 'Glass', detail: 'frosted translucent folders with a sheen',
    draw: (c, e, open) => {
      const g = `<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${tint(c, 0.55)}" stop-opacity="0.95"/><stop offset="1" stop-color="${c}" stop-opacity="0.55"/></linearGradient></defs>`;
      return g + (open
        ? `<path d="${OPEN_BACK}" fill="${c}" fill-opacity="0.35"/><path d="${OPEN_FRONT}" fill="url(#s)" stroke="${tint(c, 0.6)}" stroke-width="1"/>${emb(e, 16.5, 24, '#ffffff', 9.5)}`
        : `<path d="${CLOSED}" fill="url(#s)" stroke="${tint(c, 0.6)}" stroke-width="1"/><path d="M4 12.5h24" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/>${emb(e, 16, 22.5, '#ffffff', 10)}`);
    },
  },
  gradient: {
    name: 'Gradient', detail: 'vivid two-tone gradient folders',
    draw: (c, e, open) => {
      const g = `<defs><linearGradient id="s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tint(c, 0.25)}"/><stop offset="1" stop-color="${shade(c, 0.35)}"/></linearGradient></defs>`;
      return g + (open
        ? `<path d="${OPEN_BACK}" fill="${shade(c, 0.45)}"/><path d="${OPEN_FRONT}" fill="url(#s)"/>${emb(e, 16.5, 24, '#ffffff', 9.5)}`
        : `<path d="${CLOSED}" fill="url(#s)"/>${emb(e, 16, 22.5, '#ffffff', 10)}`);
    },
  },
  pastel: {
    name: 'Pastel', detail: 'soft candy-colored folders',
    draw: (c, e, open) => open
      ? `<path d="${OPEN_BACK}" fill="${tint(c, 0.35)}"/><path d="${OPEN_FRONT}" fill="${tint(c, 0.55)}"/>${emb(e, 16.5, 24, shade(c, 0.35), 9.5)}`
      : `<path d="${CLOSED}" fill="${tint(c, 0.5)}"/>${emb(e, 16, 22.5, shade(c, 0.35), 10)}`,
  },
  sticker: {
    name: 'Sticker', detail: 'die-cut stickers with a white border',
    draw: (c, e, open) => open
      ? `<path d="${OPEN_FRONT}" fill="#000" opacity="0.25" transform="translate(0.8 1.2)"/><path d="${OPEN_BACK}" fill="${shade(c, 0.2)}" stroke="#ffffff" stroke-width="2.4" stroke-linejoin="round"/><path d="${OPEN_FRONT}" fill="${c}" stroke="#ffffff" stroke-width="2.4" stroke-linejoin="round"/>${emb(e, 16.5, 24, '#ffffff', 9.5)}`
      : `<path d="${CLOSED}" fill="#000" opacity="0.25" transform="translate(0.8 1.2)"/><path d="${CLOSED}" fill="${c}" stroke="#ffffff" stroke-width="2.4" stroke-linejoin="round"/>${emb(e, 16, 22.5, '#ffffff', 10)}`,
  },
  blueprint: {
    name: 'Blueprint', detail: 'dashed technical-drawing folders',
    draw: (c, e, open) => {
      const lc = tint(c, 0.25);
      return open
        ? `<path d="${OPEN_BACK}" fill="none" stroke="${lc}" stroke-width="1.4" stroke-dasharray="2.5 1.8" opacity="0.7"/><path d="${OPEN_FRONT}" fill="${c}" fill-opacity="0.1" stroke="${lc}" stroke-width="1.6" stroke-dasharray="2.5 1.8"/>${emb(e, 16.5, 24, lc, 9.5)}`
        : `<path d="${CLOSED}" fill="${c}" fill-opacity="0.08" stroke="${lc}" stroke-width="1.6" stroke-dasharray="2.5 1.8" stroke-linejoin="round"/><path d="M2.5 11h27" stroke="${lc}" stroke-width="0.8" opacity="0.6"/>${emb(e, 16, 22.5, lc, 10)}`;
    },
  },
  mono: {
    name: 'Mono', detail: 'monochrome folders and file badges: zero distraction', files: 'mono',
    draw: (c, e, open) => {
      const g = '#9aa3b2';
      return open
        ? `<path d="${OPEN_BACK}" fill="${g}" opacity="0.35"/><path d="${OPEN_FRONT}" fill="${g}" opacity="0.75"/>${emb(e, 16.5, 24, '#1e1e1e', 9.5)}`
        : `<path d="${CLOSED}" fill="${g}" opacity="0.75"/>${emb(e, 16, 22.5, '#1e1e1e', 10)}`;
    },
  },
  dots: {
    name: 'Dots', detail: 'ultra-minimal: outline folders and files marked by a colored dot', files: 'minimal',
    draw: (c, e, open) => (open
      ? `<path d="${OPEN_BACK}" fill="none" stroke="#8b9bb4" stroke-width="1.6" stroke-linejoin="round" opacity="0.6"/><path d="${OPEN_FRONT}" fill="none" stroke="#8b9bb4" stroke-width="1.6" stroke-linejoin="round"/>`
      : `<path d="${CLOSED}" fill="none" stroke="#8b9bb4" stroke-width="1.6" stroke-linejoin="round"/>`) + `<circle cx="16" cy="${open ? 20 : 19}" r="4" fill="${c}"/>`,
  },
};

