// Generates themes/*.json from palettes.mjs. Run: npm run build
import { writeFile, mkdir, readFile, rm } from 'node:fs/promises';
import { palettes, GROUPS } from './palettes.mjs';

/** Append alpha (0-1) to a #rrggbb color. */
const a = (hex, alpha) => hex + Math.round(alpha * 255).toString(16).padStart(2, '0');

function workbench(p) {
  const light = p.kind === 'light' || p.kind === 'hcLight';
  const hc = p.kind === 'hc' || p.kind === 'hcLight';
  const onAccent = light ? '#ffffff' : p.bg === '#000000' ? '#000000' : p.bg;
  return {
    // base
    foreground: p.fg, descriptionForeground: p.fgMuted, disabledForeground: p.fgFaint,
    errorForeground: p.error, focusBorder: a(p.accent, hc ? 1 : 0.6), 'icon.foreground': p.fgMuted,
    'widget.shadow': light ? '#00000014' : '#00000066', 'selection.background': a(p.accent, 0.35),
    'textLink.foreground': p.accent, 'textLink.activeForeground': p.accent,
    'textPreformat.foreground': p.string, 'textBlockQuote.background': p.bgAlt, 'textBlockQuote.border': p.border,
    'textCodeBlock.background': p.bgAlt, 'textSeparator.foreground': p.border,
    ...(hc ? { contrastBorder: p.border, contrastActiveBorder: p.accent } : {}),

    // window / title / activity / side bar
    'titleBar.activeBackground': p.bgAlt, 'titleBar.activeForeground': p.fg,
    'titleBar.inactiveBackground': p.bgAlt, 'titleBar.inactiveForeground': p.fgMuted, 'titleBar.border': p.border,
    'activityBar.background': p.bgAlt, 'activityBar.foreground': p.fg, 'activityBar.inactiveForeground': p.fgFaint,
    'activityBar.border': p.border, 'activityBar.activeBorder': p.accent, 'activityBar.activeBackground': p.bgAlt,
    'activityBarBadge.background': p.accent, 'activityBarBadge.foreground': onAccent,
    'sideBar.background': p.bgAlt, 'sideBar.foreground': p.fgMuted, 'sideBar.border': p.border,
    'sideBarTitle.foreground': p.fg, 'sideBarSectionHeader.background': p.bgAlt,
    'sideBarSectionHeader.foreground': p.fg, 'sideBarSectionHeader.border': p.border,

    // lists & trees
    'list.activeSelectionBackground': a(p.accent, light ? 0.18 : 0.22), 'list.activeSelectionForeground': p.fg,
    'list.inactiveSelectionBackground': p.bgHover, 'list.inactiveSelectionForeground': p.fg,
    'list.hoverBackground': a(p.bgHover, 0.7), 'list.hoverForeground': p.fg,
    'list.focusOutline': a(p.accent, 0.6), 'list.highlightForeground': p.accent,
    'list.errorForeground': p.error, 'list.warningForeground': p.warning,
    'tree.indentGuidesStroke': p.border, 'tree.inactiveIndentGuidesStroke': a(p.border, 0.5),

    // tabs & editor groups
    'editorGroupHeader.tabsBackground': p.bgAlt, 'editorGroupHeader.tabsBorder': p.border,
    'editorGroup.border': p.border, 'editorGroup.dropBackground': a(p.accent, 0.15),
    'tab.activeBackground': p.bg, 'tab.activeForeground': p.fg, 'tab.activeBorderTop': p.accent,
    'tab.activeBorder': p.bg, 'tab.inactiveBackground': p.bgAlt, 'tab.inactiveForeground': p.fgMuted,
    'tab.border': p.border, 'tab.hoverBackground': p.bgHover, 'tab.unfocusedActiveForeground': p.fgMuted,
    'tab.unfocusedActiveBorderTop': a(p.accent, 0.4), 'tab.activeModifiedBorder': p.warning,
    'breadcrumb.foreground': p.fgMuted, 'breadcrumb.focusForeground': p.fg,
    'breadcrumb.activeSelectionForeground': p.accent, 'breadcrumbPicker.background': p.bgRaise,

    // editor
    'editor.background': p.bg, 'editor.foreground': p.fg,
    'editorLineNumber.foreground': p.fgFaint, 'editorLineNumber.activeForeground': p.fg,
    'editorCursor.foreground': p.accent,
    'editor.selectionBackground': p.selection, 'editor.inactiveSelectionBackground': a(p.selection, 0.6),
    'editor.selectionHighlightBackground': a(p.accent, 0.15), 'editor.wordHighlightBackground': a(p.accent, 0.14),
    'editor.wordHighlightStrongBackground': a(p.keyword, 0.18),
    'editor.findMatchBackground': a(p.warning, 0.4), 'editor.findMatchHighlightBackground': a(p.warning, 0.2),
    'editor.findMatchBorder': p.warning, 'editor.findRangeHighlightBackground': a(p.accent, 0.08),
    'editor.lineHighlightBackground': p.lineHL, 'editor.lineHighlightBorder': hc ? p.border : '#00000000',
    'editor.rangeHighlightBackground': a(p.accent, 0.08),
    'editorWhitespace.foreground': a(p.fgFaint, 0.5),
    'editorIndentGuide.background1': a(p.border, 0.9), 'editorIndentGuide.activeBackground1': p.fgFaint,
    'editorRuler.foreground': p.border, 'editorCodeLens.foreground': p.fgFaint,
    'editorBracketMatch.background': a(p.accent, 0.18), 'editorBracketMatch.border': a(p.accent, 0.6),
    'editorBracketHighlight.foreground1': p.param, 'editorBracketHighlight.foreground2': p.keyword,
    'editorBracketHighlight.foreground3': p.func, 'editorBracketHighlight.foreground4': p.type,
    'editorBracketHighlight.foreground5': p.tag, 'editorBracketHighlight.foreground6': p.number,
    'editorBracketHighlight.unexpectedBracket.foreground': p.error,
    'editorError.foreground': p.error, 'editorWarning.foreground': p.warning, 'editorInfo.foreground': p.info,
    'editorHint.foreground': p.success,
    'editorInlayHint.background': a(p.bgHover, 0.7), 'editorInlayHint.foreground': p.fgMuted,
    'editorGutter.addedBackground': p.added, 'editorGutter.modifiedBackground': p.modified,
    'editorGutter.deletedBackground': p.deleted, 'editorGutter.background': p.bg,
    'editorOverviewRuler.border': p.border, 'editorOverviewRuler.errorForeground': p.error,
    'editorOverviewRuler.warningForeground': p.warning, 'editorOverviewRuler.addedForeground': a(p.added, 0.6),
    'editorOverviewRuler.modifiedForeground': a(p.modified, 0.6), 'editorOverviewRuler.deletedForeground': a(p.deleted, 0.6),
    'editorStickyScroll.background': p.bg, 'editorStickyScrollHover.background': p.bgHover,
    'editorLink.activeForeground': p.accent,

    // widgets
    'editorWidget.background': p.bgRaise, 'editorWidget.border': p.border, 'editorWidget.foreground': p.fg,
    'editorSuggestWidget.background': p.bgRaise, 'editorSuggestWidget.border': p.border,
    'editorSuggestWidget.foreground': p.fg, 'editorSuggestWidget.highlightForeground': p.accent,
    'editorSuggestWidget.selectedBackground': a(p.accent, light ? 0.16 : 0.22),
    'editorHoverWidget.background': p.bgRaise, 'editorHoverWidget.border': p.border,
    'peekView.border': p.accent, 'peekViewEditor.background': p.bgAlt, 'peekViewResult.background': p.bgRaise,
    'peekViewTitle.background': p.bgRaise, 'peekViewEditor.matchHighlightBackground': a(p.warning, 0.3),
    'peekViewResult.matchHighlightBackground': a(p.warning, 0.3),
    'quickInput.background': p.bgRaise, 'quickInput.foreground': p.fg,
    'quickInputList.focusBackground': a(p.accent, light ? 0.16 : 0.22),
    'pickerGroup.foreground': p.accent, 'pickerGroup.border': p.border,
    'menu.background': p.bgRaise, 'menu.foreground': p.fg, 'menu.selectionBackground': a(p.accent, 0.22),
    'menu.separatorBackground': p.border, 'menu.border': p.border,
    'notifications.background': p.bgRaise, 'notifications.border': p.border, 'notificationCenterHeader.background': p.bgHover,
    'notificationsErrorIcon.foreground': p.error, 'notificationsWarningIcon.foreground': p.warning,
    'notificationsInfoIcon.foreground': p.info,

    // inputs & buttons
    'input.background': light ? p.bgRaise : p.bgAlt, 'input.foreground': p.fg, 'input.border': p.border,
    'input.placeholderForeground': p.fgFaint, 'inputOption.activeBorder': p.accent,
    'inputOption.activeBackground': a(p.accent, 0.2),
    'inputValidation.errorBorder': p.error, 'inputValidation.errorBackground': p.bgRaise,
    'inputValidation.warningBorder': p.warning, 'inputValidation.warningBackground': p.bgRaise,
    'dropdown.background': p.bgRaise, 'dropdown.border': p.border, 'dropdown.foreground': p.fg,
    'button.background': p.accent, 'button.foreground': onAccent, 'button.hoverBackground': a(p.accent, 0.85),
    'button.secondaryBackground': p.bgHover, 'button.secondaryForeground': p.fg,
    'checkbox.background': p.bgAlt, 'checkbox.border': p.border,
    'badge.background': a(p.accent, 0.25), 'badge.foreground': p.fg,
    'progressBar.background': p.accent,
    'scrollbarSlider.background': a(p.fgFaint, 0.25), 'scrollbarSlider.hoverBackground': a(p.fgFaint, 0.4),
    'scrollbarSlider.activeBackground': a(p.fgFaint, 0.55), 'scrollbar.shadow': '#00000000',

    // panel / terminal / status
    'panel.background': p.bgAlt, 'panel.border': p.border, 'panelTitle.activeForeground': p.fg,
    'panelTitle.inactiveForeground': p.fgMuted, 'panelTitle.activeBorder': p.accent,
    'statusBar.background': p.bgAlt, 'statusBar.foreground': p.fgMuted, 'statusBar.border': p.border,
    'statusBar.debuggingBackground': p.warning, 'statusBar.debuggingForeground': light ? '#ffffff' : '#000000',
    'statusBar.noFolderBackground': p.bgAlt, 'statusBarItem.hoverBackground': p.bgHover,
    'statusBarItem.remoteBackground': p.accent, 'statusBarItem.remoteForeground': onAccent,
    'statusBarItem.errorBackground': p.error, 'statusBarItem.warningBackground': p.warning,
    'terminal.background': p.bgAlt, 'terminal.foreground': p.fg, 'terminalCursor.foreground': p.accent,
    'terminal.selectionBackground': p.selection,
    'terminal.ansiBlack': light ? '#2b2f37' : p.bgHover, 'terminal.ansiBrightBlack': p.fgFaint,
    'terminal.ansiRed': p.error, 'terminal.ansiBrightRed': p.constant,
    'terminal.ansiGreen': p.string, 'terminal.ansiBrightGreen': p.success,
    'terminal.ansiYellow': p.warning, 'terminal.ansiBrightYellow': p.param,
    'terminal.ansiBlue': p.func, 'terminal.ansiBrightBlue': p.property,
    'terminal.ansiMagenta': p.keyword, 'terminal.ansiBrightMagenta': p.escape,
    'terminal.ansiCyan': p.type, 'terminal.ansiBrightCyan': p.operator,
    'terminal.ansiWhite': p.fgMuted, 'terminal.ansiBrightWhite': light ? '#000000' : '#ffffff',

    // git / diff / merge / debug / testing
    'gitDecoration.addedResourceForeground': p.added, 'gitDecoration.modifiedResourceForeground': p.modified,
    'gitDecoration.deletedResourceForeground': p.deleted, 'gitDecoration.untrackedResourceForeground': p.success,
    'gitDecoration.ignoredResourceForeground': p.fgFaint, 'gitDecoration.conflictingResourceForeground': p.warning,
    'diffEditor.insertedTextBackground': a(p.added, 0.15), 'diffEditor.removedTextBackground': a(p.deleted, 0.15),
    'diffEditor.insertedLineBackground': a(p.added, 0.08), 'diffEditor.removedLineBackground': a(p.deleted, 0.08),
    'merge.currentHeaderBackground': a(p.added, 0.35), 'merge.currentContentBackground': a(p.added, 0.12),
    'merge.incomingHeaderBackground': a(p.modified, 0.35), 'merge.incomingContentBackground': a(p.modified, 0.12),
    'debugToolBar.background': p.bgRaise, 'debugIcon.breakpointForeground': p.error,
    'editor.stackFrameHighlightBackground': a(p.warning, 0.15),
    'testing.iconPassed': p.success, 'testing.iconFailed': p.error, 'testing.iconQueued': p.warning,
    'minimap.background': p.bg, 'minimap.selectionHighlight': a(p.accent, 0.5),
    'minimapGutter.addedBackground': p.added, 'minimapGutter.modifiedBackground': p.modified,
    'minimapGutter.deletedBackground': p.deleted,
    'charts.foreground': p.fg, 'charts.red': p.error, 'charts.blue': p.func, 'charts.yellow': p.warning,
    'charts.orange': p.number, 'charts.green': p.success, 'charts.purple': p.keyword,
    'welcomePage.tileBackground': p.bgRaise, 'walkThrough.embeddedEditorBackground': p.bgAlt,
  };
}

function tokens(p) {
  const t = (name, scope, color, fontStyle) => ({ name, scope, settings: fontStyle != null ? { foreground: color, fontStyle } : { foreground: color } });
  return [
    t('Comment', ['comment', 'punctuation.definition.comment', 'string.comment'], p.comment, 'italic'),
    t('Doc tag', ['comment storage.type', 'comment keyword.other', 'comment.block.documentation entity.name.type'], p.keyword, 'italic'),
    t('Keyword', ['keyword', 'storage.type', 'storage.modifier', 'keyword.control', 'keyword.other.using', 'keyword.other.import'], p.keyword),
    t('Operator', ['keyword.operator', 'punctuation.accessor', 'punctuation.separator.key-value', 'storage.type.function.arrow'], p.operator),
    t('Word operators', ['keyword.operator.new', 'keyword.operator.expression', 'keyword.operator.logical.python', 'keyword.operator.word'], p.keyword),
    t('Function', ['entity.name.function', 'support.function', 'meta.function-call entity.name.function', 'variable.function', 'entity.name.method'], p.func),
    t('Type', ['entity.name.type', 'entity.name.class', 'support.type', 'support.class', 'entity.other.inherited-class', 'storage.type.primitive', 'entity.name.namespace'], p.type),
    t('String', ['string', 'punctuation.definition.string', 'string.template'], p.string),
    t('Template expression', ['punctuation.definition.template-expression', 'punctuation.section.embedded'], p.keyword),
    t('Escape', ['constant.character.escape', 'constant.character.format.placeholder', 'constant.other.placeholder'], p.escape),
    t('Regex', ['string.regexp', 'constant.other.character-class.regexp'], p.regex),
    t('Number', ['constant.numeric', 'keyword.other.unit'], p.number),
    t('Constant', ['constant.language', 'support.constant', 'variable.other.constant', 'constant.other', 'variable.other.enummember'], p.constant),
    t('Variable', ['variable', 'variable.other.readwrite', 'meta.definition.variable'], p.variable),
    t('Language variable', ['variable.language', 'variable.language.this', 'variable.language.self', 'variable.language.super'], p.keyword, 'italic'),
    t('Parameter', ['variable.parameter', 'meta.parameter variable'], p.param),
    t('Property', ['variable.other.property', 'variable.other.object.property', 'support.variable.property', 'meta.object-literal.key', 'entity.name.field'], p.property),
    t('Punctuation', ['punctuation', 'meta.brace', 'punctuation.terminator'], p.fgMuted),
    t('Decorator', ['meta.decorator', 'entity.name.function.decorator', 'punctuation.decorator', 'meta.attribute.rust', 'storage.type.annotation'], p.number),
    t('Tag', ['entity.name.tag', 'punctuation.definition.tag', 'support.class.component'], p.tag),
    t('Component tag', ['support.class.component.tsx', 'support.class.component.jsx', 'entity.name.tag.custom'], p.type),
    t('Attribute', ['entity.other.attribute-name', 'entity.other.attribute-name.html'], p.attribute),
    t('CSS selector', ['entity.other.attribute-name.class.css', 'entity.other.attribute-name.id.css', 'entity.name.tag.css'], p.tag),
    t('CSS property', ['support.type.property-name.css', 'support.type.vendored.property-name', 'support.type.property-name'], p.property),
    t('CSS value', ['support.constant.property-value', 'support.constant.color', 'constant.other.color'], p.number),
    t('JSON key 1', ['source.json meta.structure.dictionary.json support.type.property-name.json'], p.func),
    t('JSON key 2', ['source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'], p.keyword),
    t('JSON key 3', ['source.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json'], p.type),
    t('YAML key', ['entity.name.tag.yaml'], p.func),
    t('Markdown heading', ['markup.heading', 'entity.name.section.markdown', 'markup.heading punctuation.definition.heading'], p.func, 'bold'),
    t('Markdown bold', ['markup.bold'], p.number, 'bold'),
    t('Markdown italic', ['markup.italic'], p.keyword, 'italic'),
    t('Markdown strike', ['markup.strikethrough'], p.fgMuted, 'strikethrough'),
    t('Markdown code', ['markup.inline.raw', 'markup.fenced_code.block', 'markup.raw'], p.string),
    t('Markdown link', ['markup.underline.link', 'string.other.link', 'meta.link'], p.accent, 'underline'),
    t('Markdown quote', ['markup.quote'], p.fgMuted, 'italic'),
    t('Markdown list', ['punctuation.definition.list.begin.markdown', 'beginning.punctuation.definition.list'], p.tag),
    t('Diff inserted', ['markup.inserted', 'meta.diff.header.to-file'], p.added),
    t('Diff deleted', ['markup.deleted', 'meta.diff.header.from-file'], p.deleted),
    t('Diff changed', ['markup.changed'], p.modified),
    t('Diff range', ['meta.diff.range', 'meta.diff.header'], p.keyword),
    t('Shell variable', ['variable.other.normal.shell', 'punctuation.definition.variable.shell'], p.param),
    t('Python self/cls', ['variable.parameter.function.language.special.self.python', 'variable.parameter.function.language.special.cls.python'], p.keyword, 'italic'),
    t('Python fstring braces', ['constant.character.format.placeholder.other.python', 'meta.fstring.python punctuation'], p.escape),
    t('Rust lifetime', ['entity.name.type.lifetime', 'storage.modifier.lifetime'], p.escape, 'italic'),
    t('Rust macro', ['entity.name.function.macro', 'support.function.macro'], p.number),
    t('Go package', ['entity.name.package.go', 'entity.name.import.go'], p.type),
    t('SQL keyword', ['keyword.other.DML.sql', 'keyword.other.DDL.create.II.sql', 'keyword.other.sql'], p.keyword),
    t('Invalid', ['invalid', 'invalid.illegal'], p.error, 'underline'),
    t('Deprecated', ['invalid.deprecated'], p.warning, 'strikethrough'),
  ];
}

const semanticTokenColors = (p) => ({
  namespace: p.type, class: p.type, 'class.defaultLibrary': p.type, interface: { foreground: p.type, italic: true },
  enum: p.type, enumMember: p.constant, struct: p.type, typeParameter: { foreground: p.type, italic: true }, type: p.type,
  function: p.func, method: p.func, 'function.defaultLibrary': p.func, macro: p.number, decorator: p.number,
  parameter: p.param, variable: p.variable, 'variable.readonly': p.constant, 'variable.defaultLibrary': p.constant,
  property: p.property, 'property.readonly': p.property, keyword: p.keyword, selfKeyword: { foreground: p.keyword, italic: true },
  string: p.string, number: p.number, regexp: p.regex, operator: p.operator, comment: { foreground: p.comment, italic: true },
  lifetime: { foreground: p.escape, italic: true }, '*.deprecated': { strikethrough: true },
});

await rm(new URL('../themes/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('../themes/', import.meta.url), { recursive: true });
const contributes = [];
const groupOf = Object.fromEntries(Object.entries(GROUPS).flatMap(([g, ids]) => ids.map((id) => [id, g])));
// vibe = the comment written next to each derive(...) call; core variants described here
const src = await readFile(new URL('./palettes.mjs', import.meta.url), 'utf8');
const vibes = {
  night: 'everyday dark', dusk: 'soft dark for long sessions', midnight: 'true black for OLED',
  day: 'clean light', contrast: 'high contrast dark (7:1)', 'day-contrast': 'high contrast light (7:1)',
};
for (const m of src.matchAll(/^\s*'?([\w-]+)'?: derive\('[^']+', '\w+', \{\s*\/\/ (.+)$/gm)) vibes[m[1]] = m[2].trim();
const catalog = [];
for (const [id, p] of Object.entries(palettes)) {
  const theme = {
    $schema: 'vscode://schemas/color-theme',
    name: p.label,
    type: p.kind === 'hcLight' ? 'hcLight' : p.kind === 'hc' ? 'hc' : p.kind,
    semanticHighlighting: true,
    colors: workbench(p),
    tokenColors: tokens(p),
    semanticTokenColors: semanticTokenColors(p),
  };
  await writeFile(new URL(`../themes/multiverse-${id}.json`, import.meta.url), JSON.stringify(theme, null, 2) + '\n');
  catalog.push({ id, label: p.label, kind: p.kind, group: groupOf[id], vibe: vibes[id] ?? '' });
  contributes.push({ label: p.label, uiTheme: { dark: 'vs-dark', light: 'vs', hc: 'hc-black', hcLight: 'hc-light' }[p.kind], path: `./themes/multiverse-${id}.json` });
  console.log(`✔ themes/multiverse-${id}.json  (${Object.keys(theme.colors).length} UI colors, ${theme.tokenColors.length} token rules)`);
}

const order = Object.values(GROUPS).flat();
catalog.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
contributes.sort((a, b) => order.indexOf(a.path.slice(20, -5)) - order.indexOf(b.path.slice(20, -5)));
await writeFile(new URL('../themes/catalog.json', import.meta.url), JSON.stringify(catalog, null, 2) + '\n');

// keep package.json in sync with the generated variants
const pkgUrl = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(await readFile(pkgUrl, 'utf8'));
pkg.contributes = { ...pkg.contributes, themes: contributes };
// keep the randomPool setting's allowed groups in sync with GROUPS
const rp = pkg.contributes.configuration?.properties?.['multiverse.randomPool'];
if (rp) rp.items.enum = Object.keys(GROUPS);
await writeFile(pkgUrl, JSON.stringify(pkg, null, 2) + '\n');
console.log(`✔ package.json: ${contributes.length} themes`);
