// Shared drawing kit for icon styles. Every icon is a 32×32 SVG.
export const lumOf = (h) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  return 0.299 * r + 0.587 * g + 0.114 * b;
};
export const svg = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${body}</svg>\n`;
export const xmlEsc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const FONT = `font-family="'SF Mono','JetBrains Mono',Menlo,Consolas,monospace"`;

export const PAGE = 'M7 2.5h12.5L27 10v19.5H7z';
export function fileBadge(label, color, variant = 'badge') {
  const n = label.length;
  const size = n <= 2 ? 14 : n === 3 ? 11 : 8.6;
  const text = (fill) => `<text x="${n <= 2 ? 12.5 : 16}" y="23.6" text-anchor="middle" font-size="${size}" font-weight="800" fill="${fill}" ${FONT}>${xmlEsc(label)}</text>`;
  if (variant === 'mono') {
    return svg(`<path d="${PAGE}" fill="#9aa3b2" opacity="0.14"/><path d="M19.5 2.5V10H27" fill="none" stroke="#9aa3b2" stroke-width="2" stroke-linejoin="round" opacity="0.6"/>
  <rect x="1.5" y="12" width="${n <= 2 ? 22 : 29}" height="15" rx="3.5" fill="none" stroke="#9aa3b2" stroke-width="1.8"/>${text('#9aa3b2')}`);
  }
  if (variant === 'minimal') {
    return svg(`<path d="${PAGE}" fill="none" stroke="#8b9bb4" stroke-width="1.8" stroke-linejoin="round"/><path d="M19.5 2.5V10H27" fill="none" stroke="#8b9bb4" stroke-width="1.8" stroke-linejoin="round"/><circle cx="17" cy="20" r="5.5" fill="${color}"/>`);
  }
  const ink = lumOf(color) > 0.62 ? '#141414' : '#ffffff';
  return svg(`<path d="${PAGE}" fill="${color}" opacity="0.18"/>
  <path d="M19.5 2.5V10H27" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" opacity="0.7"/>
  <rect x="1.5" y="12" width="${n <= 2 ? 22 : 29}" height="15" rx="3.5" fill="${color}"/>${text(ink)}`);
}

export const shade = (h, t) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(h.slice(i, i + 2), 16) * (1 - t)).toString(16).padStart(2, '0')).join('');
export const tint = (h, t) => '#' + [1, 3, 5].map((i) => { const v = parseInt(h.slice(i, i + 2), 16); return Math.round(v + (255 - v) * t).toString(16).padStart(2, '0'); }).join('');
export function emb(e, x, y, fill, size = 11) {
  if (!e) return '';
  const single = e.length === 1; // single glyphs get drawn larger
  return `<text x="${x}" y="${single ? y + 1 : y}" text-anchor="middle" font-size="${single ? size + 3 : size}" font-weight="900" fill="${fill}" ${FONT}>${xmlEsc(e)}</text>`;
}

export const CLOSED = 'M2.5 7.5a2 2 0 0 1 2-2h7.2l2.8 3h13a2 2 0 0 1 2 2V25a2 2 0 0 1-2 2h-23a2 2 0 0 1-2-2z';
export const OPEN_BACK = 'M2.5 7.5a2 2 0 0 1 2-2h7.2l2.8 3h11a2 2 0 0 1 2 2v2.5h-25z';
export const OPEN_FRONT = 'M5.2 13h25.3l-3.2 12.3a2 2 0 0 1-1.9 1.5H3.8a1.4 1.4 0 0 1-1.35-1.8z';

