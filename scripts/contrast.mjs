// WCAG contrast audit for every variant. Fails (exit 1) if any syntax role is unreadable.
import { palettes, SYNTAX_ROLES, ratio, targetFor } from './palettes.mjs';

let failed = 0;
for (const p of Object.values(palettes)) {
  const bad = [];
  let worst = Infinity;
  for (const role of [...SYNTAX_ROLES, 'comment', 'fgMuted']) {
    for (const bgKey of ['bg', 'lineHL']) {
      const r = ratio(p[role], p[bgKey]);
      worst = Math.min(worst, r);
      if (r < targetFor(p, role)) bad.push(`${role} on ${bgKey} ${r.toFixed(2)}`);
    }
  }
  failed += bad.length;
  console.log(`${bad.length ? '✖' : '✔'} ${p.label.padEnd(36)} min ${worst.toFixed(2)}:1${bad.length ? '\n    ' + bad.join('\n    ') : ''}`);
}
process.exitCode = failed ? 1 : 0;

// ---- Color-vision-deficiency audit -----------------------------------------
// Simulates CVD (Machado et al. 2009, severity 1.0) and requires key roles to stay
// distinguishable (CIE76 ΔE ≥ 12) for variants that claim CVD safety.
const M = {
  protan: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
  deutan: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]],
  tritan: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.3039]],
};
const toLin = (h) => [1, 3, 5].map((i) => { const c = parseInt(h.slice(i, i + 2), 16) / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
const lab = ([r, g, b]) => {
  const f = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  const X = f((0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047), Y = f(0.2126 * r + 0.7152 * g + 0.0722 * b), Z = f((0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883);
  return [116 * Y - 16, 500 * (X - Y), 200 * (Y - Z)];
};
const sim = (h, m) => { const v = toLin(h); return m.map((row) => Math.min(1, Math.max(0, row[0] * v[0] + row[1] * v[1] + row[2] * v[2]))); };
const dE = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const PAIRS = [['keyword', 'func'], ['keyword', 'string'], ['func', 'string'], ['string', 'number'], ['func', 'number'], ['keyword', 'number'], ['error', 'success'], ['deleted', 'added']];
let cvdFail = 0;
for (const p of Object.values(palettes)) {
  if (!p.cvd) continue;
  for (const kind of p.cvd) {
    const bad = PAIRS.map(([a, b]) => [a, b, dE(lab(sim(p[a], M[kind])), lab(sim(p[b], M[kind])))]).filter(([, , d]) => d < 12);
    cvdFail += bad.length;
    console.log(`${bad.length ? '✖' : '✔'} ${p.label.padEnd(36)} ${kind}-safe${bad.length ? '\n    ' + bad.map(([a, b, d]) => `${a}/${b} ΔE ${d.toFixed(1)}`).join('\n    ') : ''}`);
  }
}
if (cvdFail) process.exitCode = 1;
