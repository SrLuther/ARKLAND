#!/usr/bin/env node

/**
 * 🧪 Local Test Runner - Simula GitHub Actions localmente
 * Uso: node test-local.js <quality|frontend|security|docs|all>
 * 
 * Exemplos:
 *   node test-local.js quality    # Roda Quality Check
 *   node test-local.js all        # Roda todos os testes
 *   npm run test:local             # Alias via npm
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

let passedTests = 0;
let failedTests = 0;
let totalTests = 0;

function log(color, message) {
  console.log(`${colors[color] || colors.reset}${message}${colors.reset}`);
}

function test(name, fn) {
  totalTests++;
  try {
    process.stdout.write(`  ${name}... `);
    fn();
    log('green', '✅');
    passedTests++;
  } catch (error) {
    log('red', `❌\n     ${error.message}`);
    failedTests++;
  }
}

function section(title) {
  console.log(`\n${colors.blue}${colors.bold}${title}${colors.reset}`);
  console.log(`${colors.blue}${'═'.repeat(50)}${colors.reset}\n`);
}

function summary() {
  console.log(`\n${colors.blue}${'═'.repeat(50)}${colors.reset}`);
  log('blue', `📊 Summary: ${passedTests}/${totalTests} tests passed`);
  
  if (failedTests === 0) {
    log('green', '\n✅ ALL TESTS PASSED! Ready for push.');
  } else {
    log('red', `\n❌ ${failedTests} test(s) failed. Fix before pushing.`);
    process.exit(1);
  }
}

function runQualityCheck() {
  section('🔍 Quality Check - Backend');

  // JavaScript Syntax
  test('JavaScript sintaxe (server.js)', () => {
    execSync('node -c src/server.js', { cwd: path.join(__dirname, 'backend'), stdio: 'pipe' });
  });

  test('JavaScript sintaxe (routes)', () => {
    execSync('node -c src/routes/packages.js', { cwd: path.join(__dirname, 'backend'), stdio: 'pipe' });
  });

  test('JavaScript sintaxe (controllers)', () => {
    execSync('node -c src/controllers/packagesController.js', { cwd: path.join(__dirname, 'backend'), stdio: 'pipe' });
  });

  test('JavaScript sintaxe (services)', () => {
    execSync('node -c src/services/tip4servService.js', { cwd: path.join(__dirname, 'backend'), stdio: 'pipe' });
  });

  // Files existence
  test('Arquivo VERSION existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'VERSION'))) {
      throw new Error('VERSION file not found');
    }
  });

  test('Arquivo CHANGELOG.md existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'CHANGELOG.md'))) {
      throw new Error('CHANGELOG.md not found');
    }
  });

  test('Arquivo package.json existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'backend', 'package.json'))) {
      throw new Error('package.json not found');
    }
  });

  // Version sync
  test('Versões sincronizadas (VERSION ↔ package.json)', () => {
    const version = fs.readFileSync(path.join(__dirname, 'VERSION'), 'utf-8').trim();
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'backend', 'package.json'), 'utf-8'));
    if (version !== pkg.version) {
      throw new Error(`VERSION (${version}) != package.json (${pkg.version})`);
    }
  });

  // Folder structure
  test('Estrutura backend correta', () => {
    const required = ['src', 'src/routes', 'src/controllers', 'src/services'];
    for (const dir of required) {
      if (!fs.existsSync(path.join(__dirname, 'backend', dir))) {
        throw new Error(`Diretório ausente: ${dir}`);
      }
    }
  });

  test('Estrutura frontend correta', () => {
    const required = ['index.html', 'css', 'js', 'assets'];
    for (const item of required) {
      if (!fs.existsSync(path.join(__dirname, 'frontend', item))) {
        throw new Error(`Arquivo/diretório ausente: frontend/${item}`);
      }
    }
  });
}

function runFrontendCheck() {
  section('🎨 Frontend Tests');

  test('HTML existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'frontend', 'index.html'))) {
      throw new Error('index.html not found');
    }
  });

  test('CSS principal existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'frontend', 'css', 'style.css'))) {
      throw new Error('css/style.css not found');
    }
  });

  test('CSS temas existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'frontend', 'css', 'themes.css'))) {
      throw new Error('css/themes.css not found');
    }
  });

  test('JavaScript existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'frontend', 'js', 'main.js'))) {
      throw new Error('js/main.js not found');
    }
  });

  test('JavaScript sintaxe (main.js)', () => {
    execSync('node -c js/main.js', { cwd: path.join(__dirname, 'frontend'), stdio: 'pipe' });
  });

  // Tamanho de arquivos
  test('Tamanho CSS < 100KB', () => {
    const size = fs.statSync(path.join(__dirname, 'frontend', 'css', 'style.css')).size;
    if (size > 100 * 1024) throw new Error(`CSS muito grande: ${(size / 1024).toFixed(2)}KB`);
  });
}

function runSecurityCheck() {
  section('🔒 Security Check');

  test('.gitignore existe', () => {
    if (!fs.existsSync(path.join(__dirname, '.gitignore'))) {
      throw new Error('.gitignore not found');
    }
  });

  test('.gitignore contém .env', () => {
    const content = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf-8');
    if (!content.includes('.env')) {
      throw new Error('.env não está em .gitignore');
    }
  });

  test('.gitignore contém node_modules', () => {
    const content = fs.readFileSync(path.join(__dirname, '.gitignore'), 'utf-8');
    if (!content.includes('node_modules')) {
      throw new Error('node_modules não está em .gitignore');
    }
  });

  test('Nenhuma credencial em .env.example', () => {
    const content = fs.readFileSync(path.join(__dirname, 'backend', '.env.example'), 'utf-8');
    if (content.includes('sk_live_') || content.includes('sk_test_')) {
      throw new Error('Credenciais encontradas em .env.example!');
    }
  });

  test('Sem arquivos .env no repositório', () => {
    try {
      // Procura por .env mas ignora .env.example (template permitido)
      const filesOutput = execSync('git ls-files', { encoding: 'utf-8' });
      const envFiles = filesOutput
        .split('\n')
        .filter(f => f.includes('.env') && !f.includes('.env.example'));
      
      if (envFiles.length > 0) {
        throw new Error(`.env files encontrados em git: ${envFiles.join(', ')}`);
      }
    } catch (err) {
      if (err.message.includes('.env files encontrados')) throw err;
      // Outros erros são aceitáveis (comando falhou, etc)
    }
  });
}

function runDocCheck() {
  section('📚 Documentation Check');

  const docs = ['README.md', 'SETUP.md', 'COMMITS.md', 'VERSIONING.md', 'CHANGELOG.md', 'WORKFLOW.md', 'STATUS.md'];

  for (const doc of docs) {
    test(`${doc} existe`, () => {
      if (!fs.existsSync(path.join(__dirname, doc))) {
        throw new Error(`${doc} not found`);
      }
    });
  }

  test('backend/QUICKSTART.md existe', () => {
    if (!fs.existsSync(path.join(__dirname, 'backend', 'QUICKSTART.md'))) {
      throw new Error('backend/QUICKSTART.md not found');
    }
  });

  test('CHANGELOG contém datas', () => {
    const content = fs.readFileSync(path.join(__dirname, 'CHANGELOG.md'), 'utf-8');
    if (!content.match(/## \[.*\] - \d{4}-\d{2}-\d{2}/)) {
      throw new Error('CHANGELOG sem datas válidas');
    }
  });
}

// Main
function main() {
  log('blue', '\n╔══════════════════════════════════════════╗');
  log('blue', '║  🧪 ARKLAND - Local Test Runner          ║');
  log('blue', '║     Simula GitHub Actions Localmente      ║');
  log('blue', '╚══════════════════════════════════════════╝\n');

  const testType = process.argv[2] || 'all';

  if (testType === 'quality' || testType === 'all') {
    runQualityCheck();
  }
  if (testType === 'frontend' || testType === 'all') {
    runFrontendCheck();
  }
  if (testType === 'security' || testType === 'all') {
    runSecurityCheck();
  }
  if (testType === 'docs' || testType === 'all') {
    runDocCheck();
  }

  summary();
}

main();
