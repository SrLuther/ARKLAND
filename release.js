#!/usr/bin/env node

/**
 * Script de Versionamento e Release
 * Uso: node release.js <major|minor|patch> "Descrição das mudanças"
 * 
 * Exemplo:
 *   node release.js patch "Corrigir erro de busca"
 *   node release.js minor "Adicionar sistema de avaliações"
 *   node release.js major "Refatoração completa da API"
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const VERSION_FILE = path.join(__dirname, 'VERSION');
const CHANGELOG_FILE = path.join(__dirname, 'CHANGELOG.md');
const PACKAGE_FILE = path.join(__dirname, 'backend', 'package.json');

// Cores do console
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(color, message) {
  console.log(`${color}${message}${colors.reset}`);
}

function getArguments() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    log(colors.red, '❌ Erro: Argumentos inválidos');
    log(colors.yellow, '\nUso: node release.js <major|minor|patch> "Descrição das mudanças"');
    log(colors.cyan, '\nExemplos:');
    log(colors.cyan, '  node release.js patch "Corrigir erro de busca"');
    log(colors.cyan, '  node release.js minor "Adicionar sistema de avaliações"');
    log(colors.cyan, '  node release.js major "Refatoração completa da API\n');
    process.exit(1);
  }

  return {
    type: args[0].toLowerCase(),
    description: args.slice(1).join(' ').trim()
  };
}

function validateReleaseType(type) {
  if (!['major', 'minor', 'patch'].includes(type)) {
    log(colors.red, `❌ Erro: Tipo de release inválido: ${type}`);
    log(colors.yellow, 'Use: major, minor ou patch');
    process.exit(1);
  }
}

function getCurrentVersion() {
  try {
    return fs.readFileSync(VERSION_FILE, 'utf-8').trim();
  } catch (error) {
    log(colors.red, '❌ Erro: Arquivo VERSION não encontrado');
    process.exit(1);
  }
}

function parseVersion(versionString) {
  const parts = versionString.split('.');
  return {
    major: parseInt(parts[0]),
    minor: parseInt(parts[1]) || 0,
    patch: parseInt(parts[2]) || 0
  };
}

function incrementVersion(currentVersion, releaseType) {
  const version = parseVersion(currentVersion);

  switch (releaseType) {
    case 'major':
      version.major++;
      version.minor = 0;
      version.patch = 0;
      break;
    case 'minor':
      version.minor++;
      version.patch = 0;
      break;
    case 'patch':
      version.patch++;
      break;
  }

  return `${version.major}.${version.minor}.${version.patch}`;
}

function updateVersionFile(newVersion) {
  fs.writeFileSync(VERSION_FILE, newVersion + '\n', 'utf-8');
  log(colors.green, `✅ VERSION atualizado para ${newVersion}`);
}

function updatePackageJson(newVersion) {
  try {
    const pkgPath = PACKAGE_FILE;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.version = newVersion;
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf-8');
    log(colors.green, `✅ package.json atualizado para ${newVersion}`);
  } catch (error) {
    log(colors.yellow, '⚠️  Aviso: Não foi possível atualizar package.json');
  }
}

function updateChangelog(newVersion, description, releaseType) {
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const changelog = fs.readFileSync(CHANGELOG_FILE, 'utf-8');

  const changelogEntry = `## [${newVersion}] - ${date}

### ${capitalize(releaseType === 'major' ? 'Alterado' : releaseType === 'minor' ? 'Adicionado' : 'Corrigido')}
- ${description}

---

`;

  const updatedChangelog = changelog.replace(
    '# Changelog - ARKLAND Store\n\nTodas as mudanças notáveis neste projeto serão documentadas neste arquivo.',
    `# Changelog - ARKLAND Store\n\nTodas as mudanças notáveis neste projeto serão documentadas neste arquivo.\n\n${changelogEntry}`
  );

  fs.writeFileSync(CHANGELOG_FILE, updatedChangelog, 'utf-8');
  log(colors.green, `✅ CHANGELOG.md atualizado`);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function gitAddAndCommit(newVersion, description) {
  try {
    // Stage files
    execSync('git add VERSION backend/package.json CHANGELOG.md', {
      cwd: __dirname,
      stdio: 'inherit'
    });

    // Commit
    const commitMessage = `chore(release): v${newVersion} - ${description}`;
    execSync(`git commit -m "${commitMessage}"`, {
      cwd: __dirname,
      stdio: 'inherit'
    });

    log(colors.green, `✅ Commit criado: ${commitMessage}`);
  } catch (error) {
    log(colors.red, '❌ Erro ao fazer commit');
    process.exit(1);
  }
}

function gitTag(newVersion) {
  try {
    execSync(`git tag -a v${newVersion} -m "Release v${newVersion}"`, {
      cwd: __dirname,
      stdio: 'inherit'
    });

    log(colors.green, `✅ Tag criada: v${newVersion}`);
  } catch (error) {
    log(colors.yellow, '⚠️  Aviso: Não foi possível criar tag');
  }
}

function main() {
  log(colors.blue, '\n═══════════════════════════════════════');
  log(colors.blue, '🏛️  ARKLAND Store - Release Manager');
  log(colors.blue, '═══════════════════════════════════════\n');

  // Parse arguments
  const { type, description } = getArguments();
  validateReleaseType(type);

  // Get current version
  const currentVersion = getCurrentVersion();
  const newVersion = incrementVersion(currentVersion, type);

  log(colors.cyan, `📍 Versão atual: ${currentVersion}`);
  log(colors.cyan, `🎯 Nova versão: ${newVersion}`);
  log(colors.cyan, `📝 Tipo: ${type.toUpperCase()}`);
  log(colors.cyan, `📋 Descrição: ${description}\n`);

  // Update files
  updateVersionFile(newVersion);
  updatePackageJson(newVersion);
  updateChangelog(newVersion, description, type);

  // Git operations
  gitAddAndCommit(newVersion, description);
  gitTag(newVersion);

  log(colors.green, '\n✨ Release pronto!\n');
  log(colors.yellow, '⏭️  Próximos passos:');
  log(colors.cyan, `  1. git push origin main`);
  log(colors.cyan, `  2. git push origin v${newVersion}`);
  log(colors.cyan, `  3. Criar Release no GitHub com os detalhes\n`);
}

main();
