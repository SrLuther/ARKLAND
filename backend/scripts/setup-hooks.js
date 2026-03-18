#!/usr/bin/env node

/**
 * Script de Configuração de Git Hooks
 * Executa automaticamente após npm install
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '../../');
const gitHooksDir = path.join(rootDir, '.git/hooks');
const prePopushHookSrc = path.join(rootDir, '.git/hooks/pre-push.js');
const prePopushHookDest = path.join(gitHooksDir, 'pre-push');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

console.log(`${colors.blue}🔧 Configurando Git Hooks...${colors.reset}\n`);

try {
  // Criar diretório se não existir
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir, { recursive: true });
  }

  // Copiar pre-push hook
  if (fs.existsSync(prePopushHookSrc)) {
    fs.copyFileSync(prePopushHookSrc, prePopushHookDest);
    
    // Adicionar shebang e tornar executável
    let content = fs.readFileSync(prePopushHookDest, 'utf-8');
    if (!content.startsWith('#!/usr/bin/env node')) {
      content = '#!/usr/bin/env node\n' + content;
      fs.writeFileSync(prePopushHookDest, content, 'utf-8');
    }

    // Tornar executável (Windows não suporta, mas deixamos o script)
    try {
      fs.chmodSync(prePopushHookDest, 0o755);
    } catch (e) {
      // Windows - ignore chmod errors
    }

    console.log(`${colors.green}✅ Git hook 'pre-push' configurado${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  Arquivo pre-push.js não encontrado${colors.reset}`);
  }

  console.log(`${colors.green}\n✨ Git hooks configurados com sucesso!${colors.reset}`);
  console.log(`${colors.cyan}\n📝 Próximas releases:${colors.reset}`);
  console.log(`${colors.cyan}  npm run release patch "Descrição"${colors.reset}\n`);

} catch (error) {
  console.error(`${colors.red}❌ Erro ao configurar hooks: ${error.message}${colors.reset}`);
  process.exit(1);
}
