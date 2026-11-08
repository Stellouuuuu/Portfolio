// Writes the rendered page into dist/index.html (run after the client and server builds).
import { readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const htmlPath = resolve(root, 'dist/index.html');
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);

const template = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) {
  throw new Error('dist/index.html has no empty #root to fill');
}
const html = render();
if (!html.includes('Stella') || !html.includes('Mnemo')) {
  throw new Error('The rendered page is missing its content');
}
await writeFile(htmlPath, template.replace(marker, `<div id="root">${html}</div>`));
await rm(resolve(root, 'dist-ssr'), { recursive: true, force: true });
console.log(`pre-rendered ${html.length} characters into dist/index.html`);
