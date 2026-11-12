// Premium folder styles: isometric 3D, clay, holographic foil, hand sketch, retro OS bevel, paper cut.
// Contract: see top of scripts/icons.mjs.
import { emb, shade, tint, lumOf, CLOSED, OPEN_BACK, OPEN_FRONT } from '../icon-kit.mjs';

// emblem with a contrasting outline so it stays legible on any fill
const embO = (e, x, y, fill, stroke, size, sw = 2.2) => (e
  ? emb(e, x, y, fill, size).replace('<text ', `<text stroke="${stroke}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke" `)
  : '');
const inkOn = (c) => (lumOf(c) > 0.62 ? shade(c, 0.7) : '#ffffff');

export default {
  iso: {
    name: 'Isometric', detail: '3D isometric boxes: lit top face, shaded side, real depth',
    draw: (c, e, open) => {
      const top = tint(c, 0.35), side = shade(c, 0.38), edge = shade(c, 0.55);
      if (!open) {
        return `<path d="M2 12 8 6.5h21L24 12z" fill="${top}"/><path d="M9 6.5l1.6-2.5h6.4l1.6 2.5z" fill="${top}"/>`
          + `<path d="M24 12l5-5.5v16.5L24 29z" fill="${side}"/>`
          + `<path d="M2 12h22v17H2z" fill="${c}"/><path d="M2 12h22" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.2"/>`
          + `<path d="M2 12 8 6.5h21v16.5L24 29H2z" fill="none" stroke="${edge}" stroke-width="1.2" stroke-linejoin="round"/>`
          + embO(e, 13, 24.5, '#ffffff', edge, 9.5, 1.8);
      }
      // open: dark interior on top, paper sticking out, front flap tilted forward
      return `<path d="M2 14 8 6.5h21L24 14z" fill="${edge}"/><path d="M8.5 13 11 4.5h12L21 13z" fill="#f4f1ea" stroke="${shade(c, 0.6)}" stroke-width="1"/>`
        + `<path d="M24 14l5-7.5v16.5L24 29z" fill="${side}"/>`
        + `<path d="M0.5 16.5h22L24 29H2z" fill="${c}"/><path d="M0.5 16.5h22" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1.2"/>`
        + `<path d="M2 14 8 6.5h21v16.5L24 29H2L0.5 16.5z" fill="none" stroke="${edge}" stroke-width="1.2" stroke-linejoin="round"/>`
        + embO(e, 12.5, 26.3, '#ffffff', edge, 8.5, 1.8);
    },
  },
  clay: {
    name: 'Clay', detail: 'puffy claymorphism: soft highlight, inner shade, cushioned shadow',
    draw: (c, e, open) => {
      const d = `<defs><radialGradient id="cg" cx="0.35" cy="0.25" r="0.9"><stop offset="0" stop-color="${tint(c, 0.45)}"/><stop offset="0.55" stop-color="${c}"/><stop offset="1" stop-color="${shade(c, 0.25)}"/></radialGradient>`
        + `<filter id="cs" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.1" flood-color="${shade(c, 0.6)}" flood-opacity="0.55"/></filter></defs>`;
      const hl = (x, y, w) => `<rect x="${x}" y="${y}" width="${w}" height="2.6" rx="1.3" fill="#ffffff" opacity="0.55"/>`;
      const ink = inkOn(c), so = shade(c, 0.45);
      return d + (open
        ? `<path d="M3 9a3.5 3.5 0 0 1 3.5-3.5h5l3 3h10.5a3.5 3.5 0 0 1 3.5 3.5v2H3z" fill="${shade(c, 0.3)}"/>`
          + `<path d="M7.5 13.5h20.5a2.6 2.6 0 0 1 2.5 3.3l-2 7.4a3.6 3.6 0 0 1-3.5 2.8H5.4a2.6 2.6 0 0 1-2.5-3.3l1.6-7.4a3.6 3.6 0 0 1 3-2.8z" fill="url(#cg)" filter="url(#cs)"/>${hl(8, 15.3, 14)}${embO(e, 16.5, 24.6, ink, so, 9, 1.6)}`
        : `<path d="M2.5 9a3.5 3.5 0 0 1 3.5-3.5h5.2l3 3h11.8a3.5 3.5 0 0 1 3.5 3.5v11a4 4 0 0 1-4 4h-19a4 4 0 0 1-4-4z" fill="url(#cg)" filter="url(#cs)"/>${hl(5.5, 11, 15)}${embO(e, 16, 23.3, ink, so, 10, 1.6)}`);
    },
  },
  holo: {
    name: 'Holo', detail: 'iridescent holographic foil with a diagonal sheen',
    draw: (c, e, open) => {
      const d = `<defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${tint(c, 0.5)}"/><stop offset="0.3" stop-color="#f0abfc"/><stop offset="0.5" stop-color="${c}"/><stop offset="0.72" stop-color="#67e8f9"/><stop offset="1" stop-color="${shade(c, 0.15)}"/></linearGradient>`
        + `<linearGradient id="hs" x1="0" y1="0" x2="1" y2="0.6"><stop offset="0.35" stop-color="#fff" stop-opacity="0"/><stop offset="0.5" stop-color="#fff" stop-opacity="0.7"/><stop offset="0.65" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
      const edge = shade(c, 0.5);
      return d + (open
        ? `<path d="${OPEN_BACK}" fill="${shade(c, 0.35)}" stroke="${edge}" stroke-width="1.2"/><path d="${OPEN_FRONT}" fill="url(#hg)" stroke="${edge}" stroke-width="1.2" stroke-linejoin="round"/><path d="${OPEN_FRONT}" fill="url(#hs)"/>${embO(e, 16.5, 24, '#ffffff', edge, 9.5, 2)}`
        : `<path d="${CLOSED}" fill="url(#hg)" stroke="${edge}" stroke-width="1.2" stroke-linejoin="round"/><path d="${CLOSED}" fill="url(#hs)"/><path d="M4 11.2h24" stroke="#fff" stroke-opacity="0.7" stroke-width="1.2" stroke-linecap="round"/>${embO(e, 16, 22.5, '#ffffff', edge, 10, 2)}`);
    },
  },
  sketch: {
    name: 'Sketch', detail: 'hand-drawn wobbly ink with crosshatch shading',
    draw: (c, e, open) => {
      const ink = shade(c, 0.55), fill = tint(c, 0.35);
      const hatch = `<defs><pattern id="hp" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v3.2" stroke="${shade(c, 0.2)}" stroke-width="1.1"/></pattern></defs>`;
      const s = `fill="none" stroke="${ink}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"`;
      if (!open) {
        const body = 'M3 7.2c0-1 .6-1.7 1.6-1.6l7.2-.2 2.9 3.1 12.9-.1c1.2 0 2 .7 1.9 1.9l.3 14.6c0 1.2-.7 1.9-1.8 1.8l-23.1.3c-1 0-1.7-.7-1.6-1.8z';
        return hatch + `<path d="${body}" fill="${fill}"/><path d="M3.5 18.5 28.8 18.2V26l-25.3.4z" fill="url(#hp)" opacity="0.8"/>`
          + `<path d="${body}" ${s}/><path d="M2.2 11.4c8-.5 18-.2 27.6-.3M27.5 4.8l1.4 1.2" ${s}/>`
          + embO(e, 16, 22.5, ink, fill, 10, 2.4);
      }
      const back = 'M3 7.4c0-1 .6-1.8 1.6-1.7l7.1-.1 2.8 3 11-.2c1.1 0 1.9.7 1.9 1.8v2.4';
      const front = 'M5.6 13.2l25-.3-3.3 12.5c-.3 1-.9 1.5-1.9 1.5l-21.6.2c-.9 0-1.4-.8-1.2-1.7z';
      return hatch + `<path d="${back}V13H3z" fill="${shade(c, 0.15)}"/><path d="${back}" ${s}/><path d="M3 7.4v6" ${s}/>`
        + `<path d="${front}" fill="${fill}"/><path d="M3.5 21l25.5-.4-1.7 4.8c-.3 1-.9 1.5-1.9 1.5L4 27.1z" fill="url(#hp)" opacity="0.8"/><path d="${front}" ${s}/><path d="M29 11.6l2 .9" ${s}/>`
        + embO(e, 16.5, 23.5, ink, fill, 9.5, 2.4);
    },
  },
  retro: {
    name: 'Retro OS', detail: '90s desktop: chunky bevels, light top-left, dark bottom-right',
    draw: (c, e, open) => {
      const hi = tint(c, 0.55), lo = shade(c, 0.45), ol = '#1a1a1a';
      const g = (b) => `<g shape-rendering="crispEdges">${b}</g>`;
      if (!open) {
        return g(`<path d="M2 6h10l2 3h16v19H2z" fill="${ol}"/><path d="M3.5 7.5h8l2 3h15v16h-25z" fill="${c}"/>`
          + `<path d="M3.5 7.5h8v2h-6v15.5h-2z" fill="${hi}"/><path d="M5.5 10.5h23v2h-23z" fill="${hi}"/>`
          + `<path d="M26.5 12.5h2v14h-25v-2h23z" fill="${lo}"/>`)
          + embO(e, 16, 22.5, '#ffffff', ol, 9.5, 2);
      }
      return g(`<path d="M2 6h10l2 3h14v5H2z" fill="${ol}"/><path d="M3.5 7.5h8l2 3h13v3.5h-23z" fill="${lo}"/><path d="M3.5 7.5h8v2h-8z" fill="${c}"/>`
        + `<path d="M8 6h17v8H8z" fill="${ol}"/><path d="M9.5 7.5h14v6.5h-14z" fill="#ffffff"/><path d="M11 9.5h9v1.5h-9zM11 12h7v1.5h-7z" fill="#9ca3af"/>`
        + `<path d="M5 13h26l-3 15H1z" fill="${ol}"/><path d="M6.2 14.5h23l-2.5 12H3z" fill="${c}"/>`
        + `<path d="M6.2 14.5h23l-.4 2H5.8l-2.4 10H3z" fill="${hi}"/><path d="M29.2 14.5l-2.5 12H3l.4-2h21.6l2-10z" fill="${lo}"/>`)
        + embO(e, 16, 24.5, '#ffffff', ol, 9, 2);
    },
  },
  paper: {
    name: 'Paper Cut', detail: 'layered paper cut-outs with a folded corner and drop shadow',
    draw: (c, e, open) => {
      const d = `<defs><filter id="ps" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0.6" dy="1.4" stdDeviation="0.8" flood-color="#000" flood-opacity="0.4"/></filter></defs>`;
      const back = shade(c, 0.3), ink = inkOn(c), so = shade(c, 0.4);
      if (!open) {
        return d + `<path d="M2.5 6h9.5l2.5 3h15v17.5h-27z" fill="${back}" filter="url(#ps)"/>`
          + `<path d="M5 8.5h22v6H5z" fill="#fbf7ef" filter="url(#ps)"/>`
          + `<path d="M2.5 12h20.5l6.5 5v10.5h-27z" fill="${c}" filter="url(#ps)"/><path d="M23 12v5h6.5z" fill="${tint(c, 0.45)}" filter="url(#ps)"/>`
          + embO(e, 15, 24.3, ink, so, 9.5, 1.8);
      }
      return d + `<path d="M2.5 6h9.5l2.5 3h15v9h-27z" fill="${back}" filter="url(#ps)"/>`
        + `<path d="M7 3.5h13l4 4V16H7z" fill="#fbf7ef" filter="url(#ps)" transform="rotate(-6 15 10)"/><path d="M10 7.5h8M10 10.5h10" stroke="${tint(c, 0.2)}" stroke-width="1.5" transform="rotate(-6 15 10)"/>`
        + `<path d="M5.5 15h25l-3.5 12.5h-25z" fill="${c}" filter="url(#ps)"/><path d="M5.5 15l-1.2 5 7-5z" fill="${tint(c, 0.45)}"/>`
        + embO(e, 16.5, 25, ink, so, 9, 1.8);
    },
  },
};
