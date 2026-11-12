// Generates every file-icon theme.
//   data:    scripts/icon-data.mjs     (which files/folders get which icon)
//   kit:     scripts/icon-kit.mjs      (shared shapes + helpers)
//   styles:  scripts/icon-styles/*.mjs (plugins; each default-exports { id: style })
// A style = { name, detail, draw(color, emblem, open, folderId), files?: 'badge'|'mono'|'minimal',
//             fileIcon?(label, color, fileId) => full svg string, defaultFileIcon?() => full svg string }
// Run: node scripts/icons.mjs
import { writeFile, mkdir, rm, readFile, readdir } from 'node:fs/promises';
import { FILES, FOLDERS } from './icon-data.mjs';
import { svg, fileBadge, PAGE } from './icon-kit.mjs';

// ICONS_OUT=/some/dir builds into a scratch dir and leaves package.json alone (safe for parallel work).
import { pathToFileURL } from 'node:url';
const OUT = process.env.ICONS_OUT;
const root = OUT ? pathToFileURL(OUT.replace(/\/?$/, '/')) : new URL('../icons/', import.meta.url);
await rm(root, { recursive: true, force: true });
await mkdir(root, { recursive: true });

// ---- load style plugins (core first, then alphabetical) --------------------
const dir = new URL('./icon-styles/', import.meta.url);
const mods = (await readdir(dir)).filter((f) => f.endsWith('.mjs')).sort((a, b) => (a === 'core.mjs' ? -1 : b === 'core.mjs' ? 1 : a.localeCompare(b)));
const STYLES = {};
for (const f of mods) {
  const styles = (await import(new URL(f, dir))).default;
  for (const [id, s] of Object.entries(styles)) {
    if (STYLES[id]) throw new Error(`Duplicate icon style id "${id}" in ${f}`);
    if (typeof s.draw !== 'function') throw new Error(`Style "${id}" in ${f} has no draw()`);
    STYLES[id] = { ...s, source: f };
  }
}

// ---- associations ------------------------------------------------------------
const fileExtensions = {};
const fileNames = {};
for (const [id, , , exts = [], names = []] of FILES) {
  for (const e of exts) fileExtensions[e.toLowerCase()] = `file_${id}`;
  for (const n of names) fileNames[n.toLowerCase()] = `file_${id}`;
}
const folderNames = {};
const folderNamesExpanded = {};
for (const [id, , , names] of FOLDERS) {
  for (const n of names) { folderNames[n.toLowerCase()] = `folder_${id}`; folderNamesExpanded[n.toLowerCase()] = `folder_${id}_open`; }
}

// ---- file icon sets (shared variants, or per-style custom renderers) --------
const defaultFile = (variant) => svg(`<path d="${PAGE}" fill="#8b9bb4" opacity="${variant === 'minimal' ? 0 : 0.25}"/><path d="${PAGE}" fill="none" stroke="#8b9bb4" stroke-width="1.8" stroke-linejoin="round"/><path d="M19.5 2.5V10H27" fill="none" stroke="#8b9bb4" stroke-width="1.8" stroke-linejoin="round"/>`);
const fileSets = {};
async function fileSet(key, render, dirName, defaultIcon) {
  if (fileSets[key]) return fileSets[key];
  await mkdir(new URL(`${dirName}/`, root), { recursive: true });
  const defs = {};
  for (const [id, label, color] of FILES) {
    await writeFile(new URL(`${dirName}/${id}.svg`, root), render(label, color, id));
    defs[`file_${id}`] = { iconPath: `../${dirName}/${id}.svg` };
  }
  await writeFile(new URL(`${dirName}/default.svg`, root), defaultIcon ?? defaultFile(key));
  defs.file_default = { iconPath: `../${dirName}/default.svg` };
  return (fileSets[key] = defs);
}

// ---- one icon theme per style ----------------------------------------------
const themes = [];
const iconCatalog = [];
for (const [styleId, style] of Object.entries(STYLES)) {
  await mkdir(new URL(`${styleId}/`, root), { recursive: true });
  let fileDefs, filesDir;
  if (style.fileIcon) {
    filesDir = `files-${styleId}`;
    fileDefs = await fileSet(`custom-${styleId}`, (l, c, id) => style.fileIcon(l, c, id), filesDir, style.defaultFileIcon?.());
  } else {
    const v = style.files ?? 'badge';
    filesDir = v === 'badge' ? 'files' : `files-${v}`;
    fileDefs = await fileSet(v, (l, c) => fileBadge(l, c, v), filesDir);
  }
  const defs = { ...fileDefs };
  for (const [id, color, emblem] of FOLDERS) {
    await writeFile(new URL(`${styleId}/folder-${id}.svg`, root), svg(style.draw(color, emblem, false, id)));
    await writeFile(new URL(`${styleId}/folder-${id}-open.svg`, root), svg(style.draw(color, emblem, true, id)));
    defs[`folder_${id}`] = { iconPath: `./folder-${id}.svg` };
    defs[`folder_${id}_open`] = { iconPath: `./folder-${id}-open.svg` };
  }
  const theme = {
    iconDefinitions: defs,
    file: 'file_default',
    folder: 'folder_default',
    folderExpanded: 'folder_default_open',
    rootFolder: 'folder_app',
    rootFolderExpanded: 'folder_app_open',
    folderNames,
    folderNamesExpanded,
    fileExtensions,
    fileNames,
    languageIds: {
      typescript: 'file_ts', typescriptreact: 'file_tsx', javascript: 'file_js', javascriptreact: 'file_jsx',
      json: 'file_json', jsonc: 'file_json', markdown: 'file_md', python: 'file_py', go: 'file_go', rust: 'file_rs',
      shellscript: 'file_sh', yaml: 'file_yaml', dockerfile: 'file_docker', html: 'file_html', css: 'file_css',
    },
    hidesExplorerArrows: false,
  };
  await writeFile(new URL(`${styleId}/theme.json`, root), JSON.stringify(theme, null, 2) + '\n');
  themes.push({ id: `multiverse-icons-${styleId}`, label: `Multiverse Icons: ${style.name}`, path: `./icons/${styleId}/theme.json` });
  iconCatalog.push({ id: `multiverse-icons-${styleId}`, style: styleId, name: style.name, detail: style.detail, files: filesDir });
}
await writeFile(new URL('catalog.json', root), JSON.stringify(iconCatalog, null, 2) + '\n');

// ---- register in package.json ------------------------------------------------
if (OUT) { console.log(`✔ icons → ${OUT} (${themes.length} styles)`); process.exit(0); }
const pkgUrl = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(await readFile(pkgUrl, 'utf8'));
pkg.contributes = { ...pkg.contributes, iconThemes: themes };
await writeFile(pkgUrl, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✔ icons: ${FILES.length + 1} file types, ${FOLDERS.length} folder kinds × ${themes.length} styles (${Object.values(STYLES).map((s) => s.name).join(', ')})`);
