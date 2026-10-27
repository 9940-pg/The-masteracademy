import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.join(__dirname, 'Frontend');
const uaeFrontendDir = path.join(__dirname, 'The-Master-Academy-UAE', 'Frontend');

// 1. Ensure dependencies are installed (crucial for clean Vercel CI environment)
if (!fs.existsSync(path.join(frontendDir, 'node_modules'))) {
  console.log('📦 Installing dependencies for English Frontend...');
  execSync('npm --prefix Frontend install', { stdio: 'inherit', cwd: __dirname });
}

if (!fs.existsSync(path.join(uaeFrontendDir, 'node_modules'))) {
  console.log('📦 Installing dependencies for UAE Frontend...');
  execSync('npm --prefix The-Master-Academy-UAE/Frontend install', { stdio: 'inherit', cwd: __dirname });
}

// 2. Build English Frontend
console.log('\n🚀 [1/3] Building English Frontend...');
execSync('npm --prefix Frontend run build', { stdio: 'inherit', cwd: __dirname });

// 3. Build UAE Frontend
console.log('\n🚀 [2/3] Building UAE (Arabic) Frontend...');
execSync('npm --prefix The-Master-Academy-UAE/Frontend run build', { stdio: 'inherit', cwd: __dirname });

// 4. Bundle UAE dist into Frontend/dist/uae
console.log('\n📦 [3/3] Bundling UAE site into dist/uae...');
const frontendDist = path.join(frontendDir, 'dist');
const uaeDist = path.join(uaeFrontendDir, 'dist');
const targetUaeDir = path.join(frontendDist, 'uae');

if (fs.existsSync(targetUaeDir)) {
  fs.rmSync(targetUaeDir, { recursive: true, force: true });
}

fs.cpSync(uaeDist, targetUaeDir, { recursive: true });

console.log('\n✅ Deployment bundle created successfully at Frontend/dist!');
console.log('   - English site: /');
console.log('   - UAE site:     /uae/\n');
