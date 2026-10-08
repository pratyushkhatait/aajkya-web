import { readFile, writeFile } from 'node:fs/promises';
import { html } from '../.prerender/prerender.js';
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
if (!template.includes('<!--app-html-->')) throw new Error('Missing prerender marker');
await writeFile(new URL('../dist/index.html', import.meta.url), template.replace('<!--app-html-->', html));
console.log('Prerendered landing page: content is available before JavaScript loads.');
