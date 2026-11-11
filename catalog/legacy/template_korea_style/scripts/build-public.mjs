import { cpSync, mkdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'public');

// public/ is generated: publish the website and media without build tooling.
rmSync(output, { recursive: true, force: true });
mkdirSync(join(output, 'assets'), { recursive: true });
for (const file of ['index.html', 'assets/app.js', 'assets/styles.css']) {
  cpSync(join(root, file), join(output, file));
}
for (const directory of ['Image', 'Songs']) {
  cpSync(join(root, directory), join(output, directory), { recursive: true });
}
console.log('Static website built in public/');
