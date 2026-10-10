import { readFileSync, writeFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const script = readFileSync('assets/app.js', 'utf8');
const source = html + '\n' + script;
const names = new Set();
for (const match of source.matchAll(/<span\b[^>]*class="[^"]*material-symbols-outlined[^>]*>\s*([a-z_]+)\s*<\/span>/g)) {
  names.add(match[1]);
}
for (const match of script.matchAll(/modalIcon\.textContent\s*=\s*['"]([a-z_]+)['"]/g)) {
  names.add(match[1]);
}
if (!names.size) throw new Error('No Material Symbols icons found.');
const href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined' +
  '&amp;icon_names=' + [...names].sort().join(',') + '&amp;display=block';
const result = html.replace(/href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Outlined[^"]*"/, `href="${href}"`);
writeFileSync('index.html', result);
console.log(`Icon font: ${names.size} required symbols.`);
