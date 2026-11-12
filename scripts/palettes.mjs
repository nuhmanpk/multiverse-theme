// Single source of truth. Every theme variant is generated from one of these.
// Roles, not colors: change a role here and every UI + syntax surface follows.

export const palettes = {
  night: {
    label: 'Multiverse Night',
    kind: 'dark',
    bg: '#15171c', bgAlt: '#111317', bgRaise: '#1c1f26', bgHover: '#232731', border: '#262a33',
    fg: '#d5d8df', fgMuted: '#8b919e', fgFaint: '#5c6270',
    accent: '#6cb6ff', selection: '#2a3a52', lineHL: '#1b1e25',
    keyword: '#c49bff', func: '#6cb6ff', string: '#9ece6a', number: '#ffa45c', type: '#4fd1c5',
    variable: '#d5d8df', property: '#93c5fd', constant: '#ff8f8f', param: '#f0c674', comment: '#6f7787',
    operator: '#89ddff', tag: '#ff7b9c', attribute: '#f0c674', regex: '#5ad4b0', escape: '#ff9ed0',
    error: '#ff6b6b', warning: '#f5b94d', info: '#6cb6ff', success: '#7ed491',
    added: '#7ed491', modified: '#6cb6ff', deleted: '#ff6b6b',
  },
  dusk: {
    label: 'Multiverse Dusk',
    kind: 'dark',
    bg: '#22252d', bgAlt: '#1d2027', bgRaise: '#292d36', bgHover: '#30343f', border: '#343944',
    fg: '#cfd3db', fgMuted: '#8f95a3', fgFaint: '#646a78',
    accent: '#82b8f0', selection: '#364559', lineHL: '#272a33',
    keyword: '#c3a6f0', func: '#82b8f0', string: '#a8c98a', number: '#e8a76f', type: '#73cdc3',
    variable: '#cfd3db', property: '#a3c4ec', constant: '#ec9a9a', param: '#e3c785', comment: '#7c8394',
    operator: '#94d4ec', tag: '#ec8fa6', attribute: '#e3c785', regex: '#7ccfb4', escape: '#ecaacb',
    error: '#f07f7f', warning: '#e8b766', info: '#82b8f0', success: '#8fcf9c',
    added: '#8fcf9c', modified: '#82b8f0', deleted: '#f07f7f',
  },
  midnight: {
    label: 'Multiverse Midnight (OLED)',
    kind: 'dark',
    bg: '#000000', bgAlt: '#000000', bgRaise: '#0d0e11', bgHover: '#16181d', border: '#1d2027',
    fg: '#dcdfe5', fgMuted: '#8b919e', fgFaint: '#565c69',
    accent: '#6cb6ff', selection: '#1f3048', lineHL: '#0b0c0f',
    keyword: '#c49bff', func: '#6cb6ff', string: '#9ece6a', number: '#ffa45c', type: '#4fd1c5',
    variable: '#dcdfe5', property: '#93c5fd', constant: '#ff8f8f', param: '#f0c674', comment: '#6f7787',
    operator: '#89ddff', tag: '#ff7b9c', attribute: '#f0c674', regex: '#5ad4b0', escape: '#ff9ed0',
    error: '#ff6b6b', warning: '#f5b94d', info: '#6cb6ff', success: '#7ed491',
    added: '#7ed491', modified: '#6cb6ff', deleted: '#ff6b6b',
  },
  day: {
    label: 'Multiverse Day',
    kind: 'light',
    bg: '#fbfbf9', bgAlt: '#f2f2ef', bgRaise: '#ffffff', bgHover: '#e9e9e5', border: '#dcdcd6',
    fg: '#2b2f37', fgMuted: '#5f6571', fgFaint: '#9a9fa8',
    accent: '#1f6fd1', selection: '#cfe1f7', lineHL: '#f3f3ef',
    keyword: '#7a3fd1', func: '#1f63b8', string: '#3d7a1f', number: '#b05309', type: '#0d7a72',
    variable: '#2b2f37', property: '#2a5aa0', constant: '#c0313a', param: '#8a5a00', comment: '#6e7480',
    operator: '#0b6f8f', tag: '#c0245c', attribute: '#8a5a00', regex: '#0f7a5c', escape: '#b0287f',
    error: '#c62828', warning: '#8f5d00', info: '#1f6fd1', success: '#2e7d32',
    added: '#2e7d32', modified: '#1f6fd1', deleted: '#c62828',
  },
  contrast: {
    label: 'Multiverse High Contrast',
    kind: 'hc',
    bg: '#000000', bgAlt: '#000000', bgRaise: '#000000', bgHover: '#1a1a1a', border: '#6fc3ff',
    fg: '#ffffff', fgMuted: '#d0d0d0', fgFaint: '#a8a8a8',
    accent: '#6fc3ff', selection: '#264f78', lineHL: '#000000',
    keyword: '#d9b8ff', func: '#8fd0ff', string: '#b5f08a', number: '#ffc285', type: '#6ff2e2',
    variable: '#ffffff', property: '#b8dcff', constant: '#ffadad', param: '#ffe08a', comment: '#b0b8c4',
    operator: '#a8ecff', tag: '#ffa3bd', attribute: '#ffe08a', regex: '#7ff0cc', escape: '#ffbde2',
    error: '#ff8a8a', warning: '#ffd166', info: '#8fd0ff', success: '#9ff0a8',
    added: '#9ff0a8', modified: '#8fd0ff', deleted: '#ff8a8a',
  },
  'day-contrast': {
    label: 'Multiverse High Contrast Light',
    kind: 'hcLight',
    bg: '#ffffff', bgAlt: '#ffffff', bgRaise: '#ffffff', bgHover: '#ececec', border: '#0f4a85',
    fg: '#000000', fgMuted: '#2b2b2b', fgFaint: '#4f4f4f',
    accent: '#0f4a85', selection: '#b7d4f5', lineHL: '#ffffff',
    keyword: '#5a1fa8', func: '#0b4a94', string: '#245c0e', number: '#8a3b00', type: '#04574f',
    variable: '#000000', property: '#173f7a', constant: '#9e1620', param: '#6b4200', comment: '#4a4f58',
    operator: '#064f66', tag: '#99123f', attribute: '#6b4200', regex: '#0a5a42', escape: '#8c1563',
    error: '#b00020', warning: '#7a4f00', info: '#0f4a85', success: '#1b5e20',
    added: '#1b5e20', modified: '#0f4a85', deleted: '#b00020',
  },
};

// Roles that must hit WCAG AA text contrast (4.5:1) on bg. Comments get 3:1 (AA large / UI)
// on normal variants, full 4.5 on high-contrast ones.
export const SYNTAX_ROLES = [
  'fg', 'keyword', 'func', 'string', 'number', 'type', 'property', 'constant', 'param',
  'operator', 'tag', 'attribute', 'regex', 'escape', 'error', 'warning',
];

// ---------------------------------------------------------------------------
// Pop-culture inspired variants. Original names & palettes (no trademarks).
// Only the signature colors are given; surfaces + muted tones are derived.

const hex = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const toHex = (rgb) => '#' + rgb.map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, '0')).join('');
export const mix = (a, b, t) => { const x = hex(a), y = hex(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)); };

function derive(label, type, c) {
  const light = type === 'light';
  const { bg, fg, accent } = c;
  return {
    label: `Multiverse ${label}`,
    kind: type,
    bgAlt: mix(bg, light ? '#000000' : '#000000', light ? 0.035 : 0.22),
    bgRaise: mix(bg, fg, light ? 0.02 : 0.05),
    bgHover: mix(bg, fg, 0.09),
    border: mix(bg, fg, light ? 0.14 : 0.13),
    fgMuted: mix(fg, bg, 0.33),
    fgFaint: mix(fg, bg, 0.58),
    selection: mix(bg, accent, light ? 0.22 : 0.28),
    lineHL: mix(bg, fg, light ? 0.03 : 0.035),
    variable: fg,
    info: accent,
    warning: c.warning ?? (light ? '#8f5d00' : '#f5b94d'),
    error: c.error ?? (light ? '#c62828' : '#ff6b6b'),
    success: c.success ?? c.string,
    added: c.success ?? c.string,
    modified: accent,
    deleted: c.error ?? (light ? '#c62828' : '#ff6b6b'),
    property: c.property ?? mix(c.func, fg, 0.4),
    operator: c.operator ?? mix(accent, fg, 0.35),
    attribute: c.attribute ?? c.param,
    regex: c.regex ?? c.type,
    escape: c.escape ?? c.keyword,
    tag: c.tag ?? c.keyword,
    comment: c.comment ?? mix(fg, bg, 0.5),
    ...c,
  };
}

Object.assign(palettes, {
  vigilante: derive('Night Vigilante', 'dark', { // caped detective: black, steel, signal yellow
    bg: '#0f1013', fg: '#d3d6dc', accent: '#f5c518',
    keyword: '#f5c518', func: '#8fb3d9', string: '#c8d68a', number: '#ffb347', type: '#9aa7b8',
    constant: '#ff8a65', param: '#e8d29a', tag: '#f5c518', comment: '#6e737d',
  }),
  web: derive('Crimson Web', 'dark', { // wall-crawler: deep navy, web red, hero blue
    bg: '#0e1530', fg: '#e3e6f0', accent: '#ff4d5e',
    keyword: '#ff5c6c', func: '#5aa9ff', string: '#ffd166', number: '#ff9f6b', type: '#7cc4ff',
    constant: '#ff8fa0', param: '#c7d2ff', tag: '#ff5c6c', operator: '#9fbfff',
  }),
  armor: derive('Iron Sentinel', 'dark', { // armored genius: hot-rod red, gold, arc-reactor cyan
    bg: '#1a0f11', fg: '#f0e1d8', accent: '#ffc94a',
    keyword: '#ff5a4f', func: '#ffc94a', string: '#7fe7ff', number: '#ffa069', type: '#ffd98a',
    constant: '#ff8c7a', param: '#f3c9a6', tag: '#ff5a4f', operator: '#7fe7ff',
  }),
  thunder: derive('Storm Hammer', 'dark', { // thunder god: storm slate, lightning, red cape
    bg: '#121723', fg: '#dfe6f2', accent: '#8fd3ff',
    keyword: '#8fd3ff', func: '#ffd36e', string: '#b9e48c', number: '#ff8c69', type: '#a6b8ff',
    constant: '#ff6b6b', param: '#d6c6ff', tag: '#ff6b6b',
  }),
  shield: derive('Star Shield', 'dark', { // super-soldier: navy, star white, stripe red
    bg: '#101a2e', fg: '#e8edf5', accent: '#5c9dff',
    keyword: '#ff5f63', func: '#6fb0ff', string: '#e8edf5', number: '#ffb36b', type: '#9fd0ff',
    constant: '#ff8a8e', param: '#cfd9ea', tag: '#ff5f63', operator: '#a8c7ff',
  }),
  emerald: derive('Emerald Oath', 'dark', { // willpower ring: void black, emerald light
    bg: '#0a1410', fg: '#d9f2e4', accent: '#3ee08f',
    keyword: '#3ee08f', func: '#7fd6ff', string: '#b6f09c', number: '#f2c46d', type: '#5ef0c8',
    constant: '#ff8f8f', param: '#c9e8a8', comment: '#5f7a6c',
  }),
  krypton: derive('Steel Hope', 'dark', { // last son: cape red, suit blue, crest yellow
    bg: '#0f1a33', fg: '#e6ecf7', accent: '#ffd23f',
    keyword: '#ff5a5f', func: '#5fb4ff', string: '#ffd23f', number: '#ff9e58', type: '#8ad0ff',
    constant: '#ff8a8e', param: '#c5d3f0', tag: '#ff5a5f',
  }),
  amazon: derive('Warrior Princess', 'dark', { // amazon warrior: crimson, gold, star blue
    bg: '#1b1016', fg: '#f3e6e8', accent: '#ffcc4d',
    keyword: '#ff5470', func: '#ffcc4d', string: '#8ec5ff', number: '#ffa36b', type: '#ffd98a',
    constant: '#ff8ca0', param: '#e8c4cc', tag: '#ff5470',
  }),
  jade: derive('Jade Fury', 'dark', { // gamma rage: torn purple, rage green
    bg: '#16111f', fg: '#e8e2f2', accent: '#7dff6b',
    keyword: '#b98cff', func: '#7dff6b', string: '#c4f29a', number: '#ffb86b', type: '#9ff0d0',
    constant: '#ff8fb0', param: '#d6c4ff',
  }),
  speedster: derive('Scarlet Speed', 'dark', { // fastest alive: scarlet, lightning gold
    bg: '#1a0d0d', fg: '#f5e4e0', accent: '#ffd23f',
    keyword: '#ff4d4d', func: '#ffd23f', string: '#ffe8a3', number: '#ff9a5c', type: '#ffb38a',
    constant: '#ff8080', param: '#f0c4b8', operator: '#ffd23f',
  }),
  jester: derive('Wild Card', 'dark', { // chaos clown villain: purple suit, acid green
    bg: '#150f1f', fg: '#ece4f5', accent: '#9bff5a',
    keyword: '#c27cff', func: '#9bff5a', string: '#ffe066', number: '#ff7ab8', type: '#7ef0e0',
    constant: '#ff6b8a', param: '#dcc4ff',
  }),
  cartoon: derive('Saturday Morning', 'light', { // cartoon: cream paper, bold primaries
    bg: '#fff8e8', fg: '#1f1d2b', accent: '#e63946',
    keyword: '#c2185b', func: '#1d5fd1', string: '#2a7a1c', number: '#c25400', type: '#7b2fd0',
    constant: '#c62828', param: '#8a5300', tag: '#c2185b', comment: '#6d6a60',
  }),
  toon: derive('Toon Night', 'dark', { // cartoon after dark: candy colors on grape
    bg: '#1d1636', fg: '#f4efff', accent: '#ff7ae0',
    keyword: '#ff7ae0', func: '#6ee7ff', string: '#b8f56e', number: '#ffb35c', type: '#ffe45c',
    constant: '#ff8a8a', param: '#cbb8ff',
  }),
  tokyo: derive('Neon Tokyo', 'dark', { // cyberpunk anime: rain-black, magenta, cyan
    bg: '#0c0a1d', fg: '#e6e3ff', accent: '#ff4fd8',
    keyword: '#ff4fd8', func: '#3df2ff', string: '#f9f871', number: '#ff9e64', type: '#a78bff',
    constant: '#ff6e9c', param: '#b8f2ff', comment: '#6c6890',
  }),
  sakura: derive('Sakura', 'light', { // slice-of-life anime: cherry blossom paper
    bg: '#fff5f7', fg: '#3a2a33', accent: '#d6336c',
    keyword: '#b0246a', func: '#4a5fc1', string: '#3f7a3a', number: '#b4542a', type: '#7a4bbf',
    constant: '#c02a3c', param: '#8a5a2b', comment: '#8a7280',
  }),
  shonen: derive('Shonen Flame', 'dark', { // battle anime: orange gi, sky-blue energy
    bg: '#131824', fg: '#eef1f7', accent: '#ff9a3c',
    keyword: '#ff9a3c', func: '#5cc8ff', string: '#ffe066', number: '#ff6b6b', type: '#7ae0c3',
    constant: '#ff8f6b', param: '#c8d6ff',
  }),
  spirit: derive('Spirit Forest', 'dark', { // hand-painted fantasy: moss, sky, lantern
    bg: '#17201b', fg: '#e6efe2', accent: '#8fd19e',
    keyword: '#d8a7e0', func: '#8cc7f0', string: '#b8d98a', number: '#f2b880', type: '#8fd19e',
    constant: '#f29a9a', param: '#e8d8a8', comment: '#728274',
  }),
  synthwave: derive('Synthwave Sunset', 'dark', { // 80s retro: grid purple, sunset pink/orange
    bg: '#1a1033', fg: '#f2e9ff', accent: '#ff6ac1',
    keyword: '#ff6ac1', func: '#36f9f6', string: '#fede5d', number: '#ff8b39', type: '#b893ff',
    constant: '#fe4450', param: '#f5c4ff',
  }),
  matrixish: derive('Green Rain', 'dark', { // hacker terminal: phosphor on black
    bg: '#050a06', fg: '#c8f5d0', accent: '#39ff6a',
    keyword: '#39ff6a', func: '#9dffb5', string: '#d4ff8a', number: '#7affd4', type: '#5ce6a0',
    constant: '#e0ff6a', param: '#b0e8bc', comment: '#4c7a56', error: '#ff6b6b',
  }),
});

Object.assign(palettes, {
  // ---- villains & more heroes --------------------------------------------
  titan: derive('Mad Titan', 'dark', { // cosmic conqueror: purple skin, golden gauntlet, six gems
    bg: '#16102a', fg: '#ece4ff', accent: '#ffc83d',
    keyword: '#c78bff', func: '#ffc83d', string: '#6fe39b', number: '#ff8a5c', type: '#5cc8ff',
    constant: '#ff5c7a', param: '#e3d2ff',
  }),
  trickster: derive('Trickster', 'dark', { // god of mischief: emerald cloak, gold horns
    bg: '#0c1712', fg: '#e3efe6', accent: '#e8c25a',
    keyword: '#3fd68a', func: '#e8c25a', string: '#a9dd8a', number: '#f0a868', type: '#7fd9c4',
    constant: '#ff8f8f', param: '#d9e6b0',
  }),
  symbiote: derive('Black Symbiote', 'dark', { // alien goo: ink black, white sigil, slime
    bg: '#0a0a0c', fg: '#f2f2f5', accent: '#ffffff',
    keyword: '#f2f2f5', func: '#8be36b', string: '#b8b8c8', number: '#ff6b8a', type: '#9dd6ff',
    constant: '#ff4d6d', param: '#cfcfdc', comment: '#6a6a78',
  }),
  panther: derive('Panther Royal', 'dark', { // jungle king: night black, royal purple glow
    bg: '#0f0c17', fg: '#ebe6f5', accent: '#b07cff',
    keyword: '#b07cff', func: '#d9c2ff', string: '#9fe0c0', number: '#ffb36b', type: '#8fb8ff',
    constant: '#ff8fb8', param: '#c9c0dc',
  }),
  mystic: derive('Mystic Arts', 'dark', { // sorcerer supreme: blue cloak, orange spell rings
    bg: '#0e1626', fg: '#e4ebf5', accent: '#ff9a2e',
    keyword: '#ff9a2e', func: '#5fd4ff', string: '#ffd27a', number: '#ff6b5c', type: '#8fe3d0',
    constant: '#ff8f6b', param: '#c4d4ee',
  }),
  tide: derive('Tide King', 'dark', { // ocean ruler: deep sea, orange scales, kelp
    bg: '#071a1f', fg: '#dff3f2', accent: '#ff9f43',
    keyword: '#ff9f43', func: '#3fe0c5', string: '#9be38a', number: '#ffd166', type: '#5cc8ff',
    constant: '#ff7a7a', param: '#bfe6df',
  }),
  academy: derive('Mutant Academy', 'dark', { // gifted school: blue-and-gold uniforms
    bg: '#0d1530', fg: '#e5ebf8', accent: '#ffd23f',
    keyword: '#ffd23f', func: '#5fa8ff', string: '#b9e38a', number: '#ff8f5c', type: '#8ad0ff',
    constant: '#ff6b7a', param: '#cfd9f0',
  }),

  // ---- anime ---------------------------------------------------------------
  crimsonmoon: derive('Crimson Moon', 'dark', { // demon hunters: blood moon, haori checks
    bg: '#120a0d', fg: '#f2e4e6', accent: '#ff3d5a',
    keyword: '#ff3d5a', func: '#4fd6a0', string: '#ffd0a3', number: '#ff9e4f', type: '#8fd0ff',
    constant: '#ff8fa3', param: '#e6c8cf',
  }),
  shinobi: derive('Shadow Ninja', 'dark', { // hidden village: night navy, scroll red, kunai steel
    bg: '#0f1422', fg: '#e3e8f2', accent: '#ff5a4a',
    keyword: '#ff5a4a', func: '#ffa94d', string: '#b9d98a', number: '#ffd166', type: '#9fb8d9',
    constant: '#ff8fa0', param: '#c8d0e0',
  }),
  mecha: derive('Mecha Unit', 'dark', { // giant robot pilot: violet armor, neon green
    bg: '#140f22', fg: '#ece6f7', accent: '#8cff5a',
    keyword: '#a77bff', func: '#8cff5a', string: '#ffb347', number: '#ff6b6b', type: '#5ce1e6',
    constant: '#ff8fb3', param: '#d4c8f0',
  }),
  highseas: derive('High Seas', 'dark', { // pirate adventure: ocean blue, straw gold, red vest
    bg: '#0b1a2e', fg: '#e8f0fa', accent: '#ffd166',
    keyword: '#ff5a5f', func: '#ffd166', string: '#8fe3c0', number: '#ff9e58', type: '#6fc3ff',
    constant: '#ff8a8e', param: '#cfe0f2',
  }),
  magical: derive('Magical Girl', 'light', { // transformation sequence: pastel sparkle
    bg: '#fdf6ff', fg: '#3b2a4a', accent: '#d63ab0',
    keyword: '#b0249a', func: '#4a55d1', string: '#2f7f5f', number: '#c2541e', type: '#7a3fd0',
    constant: '#c2244a', param: '#8a5520', comment: '#8a7898',
  }),

  // ---- cartoons --------------------------------------------------------------
  reef: derive('Bubble Reef', 'light', { // undersea cartoon: sunny yellow, lagoon teal
    bg: '#fffbe6', fg: '#1f2d33', accent: '#0a8f8f',
    keyword: '#c2185b', func: '#0a6fa8', string: '#3d7a1f', number: '#c25400', type: '#0a7f7f',
    constant: '#c62828', param: '#7a5a00', comment: '#6d6a58',
  }),
  desert: derive('Desert Chase', 'light', { // roadrunner cartoon: canyon sand, sky, dynamite
    bg: '#fbf1df', fg: '#2e2418', accent: '#d1495b',
    keyword: '#b0306a', func: '#1f63b8', string: '#3d7a1f', number: '#c04a00', type: '#7b4fb8',
    constant: '#c0313a', param: '#7a4f1a', comment: '#7a6a55',
  }),
  mysteryvan: derive('Mystery Van', 'dark', { // meddling kids: van green, ascot orange, flower blue
    bg: '#14201a', fg: '#eef2e6', accent: '#ff9f2e',
    keyword: '#ff9f2e', func: '#7fd36b', string: '#7fc8ff', number: '#ffd166', type: '#b98cff',
    constant: '#ff7a7a', param: '#d8e2c4',
  }),
  comicstrip: derive('Comic Strip', 'light', { // Sunday funnies: newsprint, halftone CMYK
    bg: '#f7f3ea', fg: '#1a1a1a', accent: '#e4002b',
    keyword: '#c8102e', func: '#005eb8', string: '#2a7a1c', number: '#b05309', type: '#6a2fb0',
    constant: '#c0313a', param: '#6b4f00', comment: '#6a6a6a',
  }),

  // ---- sci-fi & space ------------------------------------------------------
  saber: derive('Saber Duel', 'dark', { // space knights: void, red vs blue blades
    bg: '#0a0b10', fg: '#e6e8ef', accent: '#4fa3ff',
    keyword: '#ff4d4d', func: '#4fa3ff', string: '#7dff8a', number: '#ffb84d', type: '#b38cff',
    constant: '#ff8080', param: '#c8cde0',
  }),
  mars: derive('Mars Colony', 'dark', { // red planet: rust dust, habitat white, oxygen teal
    bg: '#1d110d', fg: '#f3e6df', accent: '#ff7a45',
    keyword: '#ff7a45', func: '#5fd4c8', string: '#ffd0a0', number: '#ffb84d', type: '#9fc8ff',
    constant: '#ff8f80', param: '#e6cfc4',
  }),
  nebula: derive('Deep Nebula', 'dark', { // deep space: nebula pink, star blue, gas gold
    bg: '#0b0d1f', fg: '#e8e8ff', accent: '#ff79c6',
    keyword: '#ff79c6', func: '#79b8ff', string: '#ffd479', number: '#ff9f79', type: '#9f8cff',
    constant: '#ff6e8a', param: '#c8ccff',
  }),

  // ---- games ---------------------------------------------------------------
  arcade: derive('Pixel Arcade', 'dark', { // 8-bit cabinet: CRT black, sprite colors
    bg: '#0b0b14', fg: '#f0f0ff', accent: '#ffe14d',
    keyword: '#ff4dc4', func: '#4dd8ff', string: '#7dff6b', number: '#ffe14d', type: '#ff944d',
    constant: '#ff4d6a', param: '#c8c8ff',
  }),
  blocks: derive('Block World', 'dark', { // voxel survival: grass, dirt, diamond, redstone
    bg: '#16130f', fg: '#ede6da', accent: '#5fd35f',
    keyword: '#5fd35f', func: '#5ee1e6', string: '#e0c48a', number: '#ff5a4a', type: '#c9a06a',
    constant: '#ff7a6a', param: '#d6ccb8',
  }),
  pipes: derive('Pipe Dream', 'light', { // platformer: sky, brick red, pipe green, coin gold
    bg: '#f2f8ff', fg: '#1f2433', accent: '#e52521',
    keyword: '#c41e1a', func: '#0f5fc2', string: '#2a7a1c', number: '#a85d00', type: '#7a3fc0',
    constant: '#c0313a', param: '#6b4f00', comment: '#68707e',
  }),

  // ---- nature, food & myth -------------------------------------------------
  arctic: derive('Arctic Frost', 'light', { // glacier: snow, ice blue, aurora
    bg: '#f4f9fc', fg: '#1d2b36', accent: '#1f7fbf',
    keyword: '#5a3fc0', func: '#0f62a8', string: '#0f7a62', number: '#b0541e', type: '#0a7894',
    constant: '#b8324a', param: '#5a5f1a', comment: '#6a7a86',
  }),
  volcano: derive('Volcano', 'dark', { // magma: basalt black, lava orange, ember yellow
    bg: '#140c0a', fg: '#f2e2da', accent: '#ff6a2a',
    keyword: '#ff6a2a', func: '#ffc04d', string: '#ffd9a8', number: '#ff4d4d', type: '#ff9a6b',
    constant: '#ff8080', param: '#e0c4b8', comment: '#7a6660',
  }),
  espresso: derive('Espresso', 'dark', { // coffee bar: dark roast, crema, steamed milk
    bg: '#1a1411', fg: '#efe4d8', accent: '#d9a066',
    keyword: '#d9a066', func: '#e8c9a0', string: '#a8c98a', number: '#e8826b', type: '#c9a8e0',
    constant: '#f29a8a', param: '#d8c4b0', comment: '#7a6a5e',
  }),
  matcha: derive('Matcha Latte', 'light', { // tea house: oat milk, matcha green, red bean
    bg: '#f6f4ea', fg: '#25301f', accent: '#4f7a28',
    keyword: '#8a2f4a', func: '#2f6a28', string: '#5a6a10', number: '#a8541e', type: '#2a6a6a',
    constant: '#b0303a', param: '#6a5520', comment: '#6f7566',
  }),
  olympus: derive('Olympus', 'light', { // greek myth: marble, laurel gold, aegean blue
    bg: '#fbfaf6', fg: '#1f2230', accent: '#1f5fbf',
    keyword: '#1f4fa8', func: '#8a5a00', string: '#3a6a2a', number: '#b0451e', type: '#6a3fa8',
    constant: '#b02a3a', param: '#5a4f2a', comment: '#727380',
  }),
  pharaoh: derive('Pharaoh', 'dark', { // ancient egypt: lapis, gold leaf, turquoise
    bg: '#0d1430', fg: '#f2ead8', accent: '#e8b84a',
    keyword: '#e8b84a', func: '#3fd0c0', string: '#f2d9a0', number: '#ff8f5c', type: '#7fa8ff',
    constant: '#ff7a7a', param: '#d8cfb8',
  }),
});

Object.assign(palettes, {
  // ---- accessibility -------------------------------------------------------
  // Color-vision-deficiency safe: never relies on red vs green. Verified by simulation in contrast.mjs.
  cvd: derive('Clear Sight', 'dark', { // deuteranopia / protanopia safe (blue-orange axis)
    cvd: ['deutan', 'protan'],
    bg: '#16181d', fg: '#e2e4e9', accent: '#4ea3ff',
    keyword: '#4ea3ff', func: '#ffb000', string: '#9ab7ff', number: '#ff7a1a', type: '#e2e4e9',
    constant: '#ffd76a', param: '#c7c9d1', tag: '#4ea3ff', property: '#b9c6e0', operator: '#9aa3b5',
    regex: '#ff7a1a', escape: '#ffd76a', comment: '#808796',
    error: '#ff7a1a', warning: '#ffd76a', success: '#4ea3ff',
  }),
  cvdlight: derive('Clear Sight Light', 'light', { // deuteranopia / protanopia safe, light
    cvd: ['deutan', 'protan'],
    bg: '#fbfbfc', fg: '#1d2129', accent: '#005ac2',
    keyword: '#00337a', func: '#a85400', string: '#2b6fd0', number: '#5c4a00', type: '#1d2129',
    constant: '#7a5a00', param: '#3f4450', tag: '#005ac2', property: '#2f4a7a', operator: '#4a5160',
    regex: '#c24a00', escape: '#7a5a00', comment: '#6a707c',
    error: '#c24a00', warning: '#7a5a00', success: '#005ac2',
  }),
  tritan: derive('Clear Sight Tritan', 'dark', { // tritanopia safe (red-teal axis)
    cvd: ['tritan'],
    bg: '#17171a', fg: '#e6e4e6', accent: '#ff5a7a',
    keyword: '#ff5a7a', func: '#3fd0d0', string: '#ffa3b5', number: '#9fe6e6', type: '#e6e4e6',
    constant: '#ff8fa3', param: '#c9c6c9', tag: '#ff5a7a', property: '#bfe0e0', operator: '#a9a3a9',
    regex: '#3fd0d0', escape: '#ffa3b5', comment: '#85808a',
    error: '#ff5a7a', warning: '#ffa3b5', success: '#3fd0d0',
  }),
  nightshift: derive('Night Shift', 'dark', { // low blue light for 2am: amber & red only
    bg: '#1a120c', fg: '#f0d6b8', accent: '#ff9d3c',
    keyword: '#ff9d3c', func: '#ffc56b', string: '#e8b98a', number: '#ff7a5c', type: '#f5b47a',
    constant: '#ff8a6a', param: '#e0c4a4', tag: '#ff9d3c', property: '#f0cfa8', operator: '#d9a77a',
    regex: '#ffb37a', escape: '#ffd08a', comment: '#8a7260', warning: '#ffc56b', error: '#ff6a4a',
  }),
  sunlight: derive('Sunlight', 'light', { // outdoor / glare: pure white, deep saturated ink
    bg: '#ffffff', fg: '#000000', accent: '#0047b3',
    keyword: '#6a00b8', func: '#0040a8', string: '#0a5c00', number: '#a63a00', type: '#005a5a',
    constant: '#b0001e', param: '#5a3d00', comment: '#4a4a4a',
  }),

  // ---- focus & workflow ------------------------------------------------------
  focus: derive('Focus', 'dark', { // minimal: only definitions, strings, constants & comments stand out
    bg: '#18191c', fg: '#d4d6db', accent: '#e8c27a',
    keyword: '#a3a7b0', func: '#e8c27a', string: '#8fc1a0', number: '#d4a0e8', type: '#d4d6db',
    constant: '#d4a0e8', param: '#d4d6db', tag: '#a3a7b0', property: '#d4d6db', operator: '#a3a7b0',
    attribute: '#a3a7b0', regex: '#8fc1a0', escape: '#e8c27a', comment: '#7fa0c4',
  }),
  focuslight: derive('Focus Light', 'light', { // minimal highlighting, light
    bg: '#fafaf8', fg: '#26282d', accent: '#8a5a00',
    keyword: '#5c606a', func: '#8a5a00', string: '#2f6a40', number: '#7a3fa0', type: '#26282d',
    constant: '#7a3fa0', param: '#26282d', tag: '#5c606a', property: '#26282d', operator: '#5c606a',
    attribute: '#5c606a', regex: '#2f6a40', escape: '#8a5a00', comment: '#3f63a0',
  }),
  ink: derive('Ink', 'light', { // e-ink / paper: monochrome, comments in blue pencil
    bg: '#f4f1ea', fg: '#1a1a1a', accent: '#1a1a1a',
    keyword: '#1a1a1a', func: '#1a1a1a', string: '#4a4a4a', number: '#4a4a4a', type: '#1a1a1a',
    constant: '#4a4a4a', param: '#1a1a1a', tag: '#1a1a1a', property: '#2a2a2a', operator: '#4a4a4a',
    attribute: '#4a4a4a', regex: '#4a4a4a', escape: '#4a4a4a', comment: '#2f5f9f',
  }),
  stage: derive('Stage', 'dark', { // streaming & screen share: survives video compression
    bg: '#101216', fg: '#ffffff', accent: '#ffd23f',
    keyword: '#ff6ec7', func: '#5ccfff', string: '#a6f06b', number: '#ffb347', type: '#ffd23f',
    constant: '#ff7070', param: '#ffffff', comment: '#a0a8b8',
  }),
  stagelight: derive('Stage Light', 'light', { // projectors & classrooms: washed-out-proof
    bg: '#ffffff', fg: '#0a0a0a', accent: '#0050d0',
    keyword: '#b0008a', func: '#0050d0', string: '#1a6a00', number: '#b04000', type: '#6a1ab8',
    constant: '#c0001a', param: '#0a0a0a', comment: '#4f5562',
  }),

  // ---- retro IDEs ------------------------------------------------------------
  turbo: derive('Turbo Blue', 'dark', { // 90s DOS IDE: blue screen, yellow & white text
    bg: '#0a1a8c', fg: '#e8e8e8', accent: '#ffff55',
    keyword: '#ffffff', func: '#ffff55', string: '#55ffff', number: '#55ff55', type: '#ffffff',
    constant: '#ff8fff', param: '#e8e8e8', comment: '#aab4ff', tag: '#ffff55', error: '#ff8a8a', warning: '#ffff55',
  }),
  amber: derive('Amber CRT', 'dark', { // monochrome amber terminal
    bg: '#120b00', fg: '#ffb000', accent: '#ffcc4d',
    keyword: '#ffcc4d', func: '#ffd98a', string: '#e89f00', number: '#ffc233', type: '#ffd98a',
    constant: '#ffe0a3', param: '#f0a800', comment: '#a87400', error: '#ff7a3c', warning: '#ffd98a',
  }),

  // ---- dev culture ---------------------------------------------------------
  rustforge: derive('Rust Forge', 'dark', { // crab-orange forge, tuned for lifetimes & macros
    bg: '#17110e', fg: '#efe2d8', accent: '#f74c00',
    keyword: '#ff7a3c', func: '#ffc66d', string: '#a8d08d', number: '#7fc8ff', type: '#e8b0ff',
    constant: '#ff8f8f', param: '#e6cdb8', escape: '#ff9ed0',
  }),
  gopher: derive('Gopher Burrow', 'dark', { // simple and fast: cyan mascot, tan burrow
    bg: '#0f1a1f', fg: '#e2eef2', accent: '#00add8',
    keyword: '#00add8', func: '#7fe0c0', string: '#e8d29a', number: '#ff9f6b', type: '#5dc9e2',
    constant: '#ff8a8a', param: '#c8dce4',
  }),
  pythonista: derive('Pythonista', 'dark', { // snake blue & yellow, decorators pop
    bg: '#121820', fg: '#e3e9f0', accent: '#ffd43b',
    keyword: '#5a9fd4', func: '#ffd43b', string: '#a6d98a', number: '#ff9e64', type: '#7fd0d0',
    constant: '#ff8a8a', param: '#f0c8a0',
  }),

  // ---- moods & seasons -------------------------------------------------------
  lofi: derive('Lo-fi Study', 'dark', { // late-night beats: dusty lavender, warm lamp
    bg: '#1e1b26', fg: '#e6e0ef', accent: '#f2b880',
    keyword: '#c3a6e0', func: '#f2b880', string: '#a8d4b0', number: '#f0a0a0', type: '#9ac4e8',
    constant: '#f0a0a0', param: '#d8cfe6', comment: '#857d96',
  }),
  rainy: derive('Rainy Window', 'dark', { // grey rain, streetlight yellow, neon sign
    bg: '#161a1f', fg: '#d8dfe6', accent: '#ffd36e',
    keyword: '#8fb4d9', func: '#ffd36e', string: '#a8c8b8', number: '#ff8fb0', type: '#a8d8e8',
    constant: '#ff8fb0', param: '#c4ccd6', comment: '#6f7a86',
  }),
  vinyl: derive('Vinyl Jazz', 'dark', { // smoky club: walnut, brass, velvet
    bg: '#1a1412', fg: '#efe3d6', accent: '#d9a441',
    keyword: '#d9a441', func: '#e8c8a0', string: '#b8c88a', number: '#e8826b', type: '#c79ad9',
    constant: '#f29a8a', param: '#dccab8', comment: '#857060',
  }),
  pumpkin: derive('Pumpkin Patch', 'dark', { // spooky season: night purple, jack-o-lantern
    bg: '#15101c', fg: '#f0e6f5', accent: '#ff8c1a',
    keyword: '#ff8c1a', func: '#b98cff', string: '#c4f06b', number: '#ffcc4d', type: '#ff9eb8',
    constant: '#ff6b6b', param: '#d6c8e6',
  }),
  pine: derive('Festive Pine', 'dark', { // winter holidays: pine green, berry red, candle gold
    bg: '#0d1712', fg: '#eef2e8', accent: '#e63946',
    keyword: '#ff5a65', func: '#ffd166', string: '#9fd8a0', number: '#ffb38a', type: '#a8d8ff',
    constant: '#ff8f8f', param: '#d8e2cc',
  }),

  // ---- wow: art & design movements ---------------------------------------
  brutal: derive('Neo Brutal', 'light', { // stark white, pure black ink, one loud hazard orange
    bg: '#ffffff', fg: '#000000', accent: '#ff3d00',
    keyword: '#d62a00', func: '#000000', string: '#1f6b2a', number: '#5a2fd6', type: '#0047ff',
    constant: '#c2005a', param: '#6b5200', comment: '#6b6b6b',
  }),
  bauhaus: derive('Bauhaus', 'light', { // primaries on unbleached canvas: red square, blue circle, yellow triangle
    bg: '#f2ede1', fg: '#1b1b1b', accent: '#d12a1f',
    keyword: '#c4241a', func: '#1f45a8', string: '#7a5a00', number: '#b04a00', type: '#1b1b1b',
    constant: '#a0207a', param: '#3d6b2a', comment: '#7a7466',
  }),
  riso: derive('Risograph', 'light', { // two-tone print: fluorescent pink & federal blue on newsprint
    bg: '#f6f1e7', fg: '#22264a', accent: '#ff48b0',
    keyword: '#d61f8a', func: '#2a3fbf', string: '#0f7a6a', number: '#c2470f', type: '#6a2fbf',
    constant: '#b0165a', param: '#5a5a20', comment: '#857f8f',
  }),
  memphis: derive('Memphis Squiggle', 'light', { // 80s postmodern: confetti squiggles, teal, pink, yellow
    bg: '#fff8ec', fg: '#1d1a3a', accent: '#00a6a6',
    keyword: '#e0247a', func: '#0a7f9a', string: '#4a7a00', number: '#d14800', type: '#6b3fd6',
    constant: '#c21a3a', param: '#8a6400', comment: '#8a8098',
  }),
  sumi: derive('Sumi Ink', 'light', { // ink-wash on rice paper: grey washes, one red seal stamp
    bg: '#f4f0e6', fg: '#2a2824', accent: '#b8231a',
    keyword: '#b8231a', func: '#1f3a52', string: '#4f5f3a', number: '#7a4a2a', type: '#3a4a5a',
    constant: '#8a1f3a', param: '#5a4f3f', comment: '#8f8a7e',
  }),
  candy: derive('Candy Pop', 'light', { // sugar rush: bubblegum, grape soda, sour apple
    bg: '#fff5fa', fg: '#3a1838', accent: '#ff2e93',
    keyword: '#d4127a', func: '#6a2fe0', string: '#1f8a3a', number: '#e05a00', type: '#0a74c4',
    constant: '#c2183a', param: '#8a5a00', comment: '#9a7894',
  }),
  fjord: derive('Nordic Fjord', 'light', { // scandi minimal: birch white, fjord blue, lingonberry
    bg: '#f5f7f8', fg: '#25313a', accent: '#2f6f9f',
    keyword: '#a3243f', func: '#2a5f94', string: '#3f7550', number: '#9a5a1f', type: '#2f7a85',
    constant: '#8a3a6a', param: '#5f5a47', comment: '#7f8a92',
  }),
  goldenhour: derive('Golden Hour', 'light', { // last sun of the day: honey light, dusty rose, long shadows
    bg: '#fff3dc', fg: '#3a2414', accent: '#e0761a',
    keyword: '#b8402a', func: '#2f5a9a', string: '#4f7a1f', number: '#b05a00', type: '#8a3f8a',
    constant: '#b02a4a', param: '#7a5a2a', comment: '#94806a',
  }),

  // ---- wow: neon & electric --------------------------------------------------
  aurora: derive('Aurora Borealis', 'dark', { // polar night lit by green-violet curtains
    bg: '#07121c', fg: '#dff5ef', accent: '#3dffb0',
    keyword: '#b28cff', func: '#3dffb0', string: '#8fe8ff', number: '#ff9ed2', type: '#5ad6c8',
    constant: '#ffd36b', param: '#c8e0dc', comment: '#5a7a80',
  }),
  abyss: derive('Abyssal Glow', 'dark', { // bioluminescent deep sea: jellyfish cyan, anglerfish lure
    bg: '#020a14', fg: '#cfe8f5', accent: '#00f0ff',
    keyword: '#00f0ff', func: '#7affc4', string: '#ff7ae0', number: '#ffe066', type: '#8aa8ff',
    constant: '#ff9a6b', param: '#a8c8d8', comment: '#3f6a80',
  }),
  vapormall: derive('Vapor Mall', 'dark', { // 1993 food court: teal tile, hot pink, marble bust
    bg: '#1a1033', fg: '#f2e6ff', accent: '#ff71ce',
    keyword: '#ff71ce', func: '#01cdfe', string: '#05ffa1', number: '#fffb96', type: '#b967ff',
    constant: '#ff9a8a', param: '#d8c8f0',
  }),
  glitch: derive('Glitch', 'dark', { // corrupted signal: RGB split, scanline black, dead-pixel white
    bg: '#000000', fg: '#f0f0f0', accent: '#ff0055',
    keyword: '#ff0055', func: '#00e5ff', string: '#c6ff00', number: '#ffea00', type: '#d580ff',
    constant: '#ff8a3d', param: '#bdbdbd', comment: '#6a6a6a',
  }),
  samurai: derive('Cyber Ronin', 'dark', { // neon katana: lacquer black, blood red, chrome, circuit gold
    bg: '#0c0a0d', fg: '#e8e2e2', accent: '#ff1f3d',
    keyword: '#ff3b52', func: '#e8c76a', string: '#9fd3c7', number: '#ff8f5a', type: '#a8b4d6',
    constant: '#ff6b9a', param: '#cbbfbf',
  }),
  lanterns: derive('Lantern Market', 'dark', { // night market: paper lanterns, steam, chili oil, jade
    bg: '#1a0e0a', fg: '#f5e6d3', accent: '#ff6a2a',
    keyword: '#ff6a2a', func: '#ffd166', string: '#7fd6a8', number: '#ff9ec4', type: '#8fc8ff',
    constant: '#ff5a5a', param: '#e0c8b0',
  }),

  // ---- wow: luxe & cinematic -------------------------------------------------
  deco: derive('Art Deco', 'dark', { // gatsby ballroom: onyx, gold leaf fans, emerald, champagne
    bg: '#0d0d0f', fg: '#efe6d2', accent: '#d4af37',
    keyword: '#d4af37', func: '#f2d9a0', string: '#5fc9a0', number: '#e8a07a', type: '#9ab8e0',
    constant: '#e07a8a', param: '#cfc3a8', comment: '#6f6858',
  }),
  velvet: derive('Royal Velvet', 'dark', { // throne room: deep plum velvet, ermine, crown gold, ruby
    bg: '#1c0b22', fg: '#f0e4f2', accent: '#f0c75e',
    keyword: '#f0c75e', func: '#ff8ab0', string: '#a8e0b8', number: '#ffb08a', type: '#c8a8ff',
    constant: '#ff6b7a', param: '#dcc8e0',
  }),
  jazz: derive('Midnight Jazz', 'dark', { // blue note: indigo smoke, saxophone brass, neon sign
    bg: '#0b0f24', fg: '#e2e6f5', accent: '#5a8cff',
    keyword: '#5a8cff', func: '#f2b84b', string: '#e88ac8', number: '#7fe0d0', type: '#a8a0ff',
    constant: '#ff8a7a', param: '#c8cce0',
  }),
  noir: derive('Desert Noir', 'dark', { // neo-western dusk: burnt sienna sky, cactus, tail-light red
    bg: '#1a1210', fg: '#f0dfcc', accent: '#ff5a36',
    keyword: '#ff5a36', func: '#f2c46b', string: '#9fc87a', number: '#ff9a7a', type: '#d8a0ff',
    constant: '#7ad0e0', param: '#d8c0a8',
  }),
  crystal: derive('Frozen Crystal', 'dark', { // ice palace: glacier blue, prism refractions
    bg: '#0a1626', fg: '#e8f6ff', accent: '#9be7ff',
    keyword: '#9be7ff', func: '#c8b6ff', string: '#b8ffd8', number: '#ffc8e8', type: '#7ab8ff',
    constant: '#ffe08a', param: '#c0d4e4',
  }),
  solarpunk: derive('Solar Punk', 'dark', { // hopeful future: rooftop gardens, solar gold, sky glass
    bg: '#0f1a14', fg: '#ecf5e0', accent: '#ffcc33',
    keyword: '#ffcc33', func: '#7fe0a0', string: '#a8e0ff', number: '#ff9a6a', type: '#c8a8ff',
    constant: '#ff7a9a', param: '#d0dcc4',
  }),
});

// Collections, used by the extension's picker and the README.
export const GROUPS = {
  'Core': ['night', 'dusk', 'midnight', 'day', 'contrast', 'day-contrast'],
  'Accessibility': ['cvd', 'cvdlight', 'tritan', 'nightshift', 'sunlight'],
  'Focus & Workflow': ['focus', 'focuslight', 'ink', 'stage', 'stagelight'],
  'Heroes & Villains': ['vigilante', 'web', 'armor', 'thunder', 'shield', 'krypton', 'emerald', 'amazon', 'jade', 'speedster', 'jester', 'titan', 'trickster', 'symbiote', 'panther', 'mystic', 'tide', 'academy'],
  'Anime': ['tokyo', 'sakura', 'shonen', 'spirit', 'crimsonmoon', 'shinobi', 'mecha', 'highseas', 'magical', 'toon'],
  'Cartoons': ['cartoon', 'reef', 'desert', 'mysteryvan', 'comicstrip'],
  'Sci-fi & Games': ['saber', 'mars', 'nebula', 'arcade', 'blocks', 'pipes'],
  'Retro': ['synthwave', 'matrixish', 'turbo', 'amber'],
  'Dev Culture': ['rustforge', 'gopher', 'pythonista'],
  'Moods & Seasons': ['lofi', 'rainy', 'vinyl', 'pumpkin', 'pine'],
  'Nature, Food & Myth': ['arctic', 'volcano', 'espresso', 'matcha', 'olympus', 'pharaoh'],
  'Art & Design': ['brutal', 'bauhaus', 'riso', 'memphis', 'sumi', 'candy', 'fjord', 'goldenhour'],
  'Neon & Electric': ['aurora', 'abyss', 'vapormall', 'glitch', 'samurai', 'lanterns'],
  'Luxe & Cinematic': ['deco', 'velvet', 'jazz', 'noir', 'crystal', 'solarpunk'],
};

// ---------------------------------------------------------------------------
// Contrast guard: nudge any role that misses its WCAG target toward fg until it passes.
const lum = (h) => {
  const v = hex(h).map((c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; });
  return 0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2];
};
export const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

export function targetFor(p, role) {
  const hc = p.kind === 'hc' || p.kind === 'hcLight';
  if (role === 'comment') return hc ? 4.5 : 3;
  if (role === 'fgMuted') return hc ? 7 : 4.5;
  return hc ? 7 : 4.5;
}

for (const p of Object.values(palettes)) {
  const light = p.kind === 'light' || p.kind === 'hcLight';
  const pole = light ? '#000000' : '#ffffff';
  for (const role of [...SYNTAX_ROLES, 'comment', 'fgMuted']) {
    const need = targetFor(p, role);
    let c = p[role];
    for (let t = 0.04; Math.min(ratio(c, p.bg), ratio(c, p.lineHL)) < need && t <= 1; t += 0.04) c = mix(p[role], pole, t);
    p[role] = c;
  }
}
