// Multiverse Theme — commands: grouped picker with live preview, random/next/previous,
// daily universe, time-of-day schedule, status bar indicator. No dependencies.
const vscode = require('vscode');
const catalog = require('./themes/catalog.json');

const PREFIX = 'Multiverse ';
const cfg = () => vscode.workspace.getConfiguration('multiverse');
const current = () => vscode.workspace.getConfiguration('workbench').get('colorTheme');
const apply = (label) => vscode.workspace.getConfiguration('workbench').update('colorTheme', label, vscode.ConfigurationTarget.Global);
const short = (label) => label.replace(PREFIX, '');
let extUri; // set in activate(); used for mascot icons in the picker
const mascotIcon = (t) => (extUri && t.id ? vscode.Uri.joinPath(extUri, 'images', 'mascots', `${t.id}.svg`) : undefined);

function pool() {
  const groups = cfg().get('randomPool') || [];
  const kinds = cfg().get('randomKinds') || ['dark', 'light'];
  return catalog.filter((t) => (!groups.length || groups.includes(t.group)) && kinds.includes(t.kind === 'hc' ? 'dark' : t.kind === 'hcLight' ? 'light' : t.kind));
}

async function pick() {
  const before = current();
  const items = [];
  let lastGroup;
  for (const t of catalog) {
    if (t.group !== lastGroup) { items.push({ label: t.group, kind: vscode.QuickPickItemKind.Separator }); lastGroup = t.group; }
    items.push({ label: short(t.label), iconPath: mascotIcon(t), description: t.kind, detail: t.vibe, theme: t.label, picked: t.label === before });
  }
  const qp = vscode.window.createQuickPick();
  qp.title = 'Multiverse: pick a universe (↑↓ previews live)';
  qp.placeholder = 'Search by name, vibe or group…';
  qp.matchOnDetail = true;
  qp.items = items;
  const active = items.find((i) => i.theme === before);
  if (active) qp.activeItems = [active];
  let accepted = false;
  qp.onDidChangeActive(([i]) => i?.theme && apply(i.theme));
  qp.onDidAccept(() => { accepted = true; qp.hide(); });
  qp.onDidHide(() => { if (!accepted) apply(before); qp.dispose(); });
  qp.show();
}

async function pickIcons() {
  const wb = vscode.workspace.getConfiguration('workbench');
  const before = wb.get('iconTheme');
  const iconCatalog = require('./icons/catalog.json');
  const items = iconCatalog.map((s) => ({ label: s.name, detail: s.detail, id: s.id }));
  const qp = vscode.window.createQuickPick();
  qp.title = 'Multiverse: folder icon style (↑↓ previews live)';
  qp.items = items;
  const active = items.find((i) => i.id === before);
  if (active) qp.activeItems = [active];
  let accepted = false;
  const set = (id) => wb.update('iconTheme', id, vscode.ConfigurationTarget.Global);
  qp.onDidChangeActive(([i]) => i && set(i.id));
  qp.onDidAccept(() => { accepted = true; qp.hide(); });
  qp.onDidHide(() => { if (!accepted) set(before); qp.dispose(); });
  qp.show();
}

function step(dir) {
  const list = catalog.map((t) => t.label);
  const i = list.indexOf(current());
  const next = list[(i + dir + list.length) % list.length];
  apply(next);
  vscode.window.setStatusBarMessage(`Multiverse → ${short(next)}`, 2500);
}

function random() {
  const list = pool().filter((t) => t.label !== current());
  if (!list.length) return;
  const t = list[Math.floor(Math.random() * list.length)];
  apply(t.label);
  vscode.window.setStatusBarMessage(`Multiverse → ${short(t.label)} · ${t.vibe}`, 4000);
}

function daily() {
  const list = pool();
  const d = new Date();
  const seed = d.getFullYear() * 1000 + Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 864e5);
  return list[(seed * 2654435761) % list.length]?.label;
}

/** Returns the theme the schedule wants right now, or undefined. */
function scheduled() {
  const sched = cfg().get('schedule') || {};
  const entries = Object.entries(sched)
    .map(([hm, label]) => { const [h, m] = hm.split(':').map(Number); return { at: h * 60 + (m || 0), label }; })
    .filter((e) => Number.isFinite(e.at))
    .sort((a, b) => a.at - b.at);
  if (!entries.length) return undefined;
  const now = new Date().getHours() * 60 + new Date().getMinutes();
  const hit = [...entries].reverse().find((e) => e.at <= now) || entries[entries.length - 1];
  const label = hit.label.startsWith(PREFIX) ? hit.label : PREFIX + hit.label;
  return catalog.some((t) => t.label === label) ? label : undefined;
}

function activate(context) {
  extUri = context.extensionUri;
  const reg = (id, fn) => context.subscriptions.push(vscode.commands.registerCommand(id, fn));
  reg('multiverse.pick', pick);
  reg('multiverse.pickIcons', pickIcons);
  reg('multiverse.random', random);
  reg('multiverse.next', () => step(1));
  reg('multiverse.previous', () => step(-1));
  reg('multiverse.daily', () => { const t = daily(); if (t) apply(t); });

  // status bar
  const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
  item.command = 'multiverse.pick';
  const refresh = () => {
    const c = current() || '';
    const on = cfg().get('statusBar') && c.startsWith(PREFIX);
    if (!on) return item.hide();
    const t = catalog.find((x) => x.label === c);
    item.text = `$(color-mode) ${short(c)}`;
    item.tooltip = `Multiverse: ${t?.group ?? ''} · ${t?.vibe ?? ''}\nClick to switch universe`;
    item.show();
  };
  context.subscriptions.push(item, vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration('workbench.colorTheme') || e.affectsConfiguration('multiverse')) refresh();
  }));
  refresh();

  // startup behaviours: schedule wins over daily
  const tick = () => { const want = scheduled(); if (want && want !== current()) apply(want); };
  if (Object.keys(cfg().get('schedule') || {}).length) {
    tick();
    const timer = setInterval(tick, 60_000);
    context.subscriptions.push({ dispose: () => clearInterval(timer) });
  } else if (cfg().get('dailyUniverse')) {
    const t = daily();
    if (t && t !== current()) apply(t);
  }
}

module.exports = { activate, deactivate() {} };
