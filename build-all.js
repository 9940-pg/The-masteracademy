import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 [1/3] Building English Frontend...');
execSync('npm --prefix Frontend run build', { stdio: 'inherit', cwd: __dirname });

console.log('\n🚀 [2/3] Building UAE (Arabic) Frontend...');
execSync('npm --prefix The-Master-Academy-UAE/Frontend run build', { stdio: 'inherit', cwd: __dirname });

console.log('\n📦 [3/3] Bundling UAE site into dist/uae...');
const frontendDist = path.join(__dirname, 'Frontend', 'dist');
const uaeDist = path.join(__dirname, 'The-Master-Academy-UAE', 'Frontend', 'dist');
const targetUaeDir = path.join(frontendDist, 'uae');

if (fs.existsSync(targetUaeDir)) {
  fs.rmSync(targetUaeDir, { recursive: true, force: true });
}

fs.cpSync(uaeDist, targetUaeDir, { recursive: true });

console.log('\n✅ Deployment bundle created successfully at Frontend/dist!');
console.log('   - English site: /');
console.log('   - UAE site:     /uae/\n');
