# 🧪 Testes Locais - Executar Antes do Push

## ⚡ Quick Start

```bash
# Rodar todos os testes
node test-local.js

# Ou via npm
npm run test:local

# Testes específicos
node test-local.js quality      # Testa backend
node test-local.js frontend     # Testa frontend
node test-local.js security     # Testa segurança
node test-local.js docs         # Testa documentação
```

## 📋 O Que Testa?

### Quality Check ✅
- ✅ Sintaxe JavaScript (todos arquivos)
- ✅ Arquivo VERSION existe
- ✅ CHANGELOG.md existe
- ✅ Versões sincronizadas (VERSION ↔ package.json)
- ✅ Estrutura de pastas correta

### Frontend Tests 🎨
- ✅ HTML file exists
- ✅ CSS files exist
- ✅ JavaScript syntax
- ✅ File size limits

### Security Check 🔒
- ✅ .gitignore configurado
- ✅ .env não commitado
- ✅ Sem credenciais expostas
- ✅ node_modules ignorado

### Docs Check 📚
- ✅ Todos documentos existem
- ✅ CHANGELOG com datas
- ✅ README, SETUP, etc.

## 🔄 Fluxo Automático: Commit → Push (Com Bloqueios)

```bash
# 1. Faça suas mudanças
vim src/server.js

# 2. Commit (TESTES AUTOMÁTICOS)
git add .
git commit -m "feat: nova feature"
# ❌ Se houver erro → Commit bloqueado!
# ✅ Se tudo OK → Commit liberado

# 3. Release versão (obrigatório)
npm run release patch "Descrição da mudança"
# Isso cria um novo commit com tag

# 4. Push (TESTES COMPLETOS AUTOMÁTICOS)
git push origin main
# ❌ Se houver erro → Push bloqueado!
# ✅ Se tudo OK → Push liberado

# 5. Tags também são enviadas
git push origin --tags
```

**⚠️ Sistema de 2 Camadas de Proteção:**
- **Pre-commit hook**: Testa antes do commit (quality + frontend + security)
- **Pre-push hook**: Testa COMPLETO antes do push (todos testes + versionamento)

## 📊 Saída Esperada

```
╔══════════════════════════════════════════╗
║  🧪 ARKLAND - Local Test Runner          ║
║     Simula GitHub Actions Localmente      ║
╚══════════════════════════════════════════╝

🔍 Quality Check - Backend
════════════════════════════════════════════

  JavaScript sintaxe (server.js)... ✅
  JavaScript sintaxe (routes)... ✅
  JavaScript sintaxe (controllers)... ✅
  JavaScript sintaxe (services)... ✅
  Arquivo VERSION existe... ✅
  Arquivo CHANGELOG.md existe... ✅
  ...

📊 Summary: 25/25 tests passed

✅ ALL TESTS PASSED! Ready for push.
```

## ❌ Corrigir Erros Comuns

### "JavaScript sintaxe erro"
```bash
# Verifique o arquivo
node -c backend/src/server.js

# Procure por erros de syntax
```

### "VERSION file not found"
```bash
# Deve estar na raiz, não em backend/
ls VERSION
```

### "Versões sincronizadas"
```bash
# Atualize versão
npm run release patch "Descrição"
```

### "Testes falharam"
```bash
# Veja detalhes
node test-local.js quality
```

## 🚀 Integração com Git Hooks (AUTOMÁTICO - Sistema de Bloqueio)

Uma vez você executa `npm run setup-hooks`, **os testes rodam automaticamente**:

### Pre-Commit Hook (Automático ao fazer commit)
```bash
git add .
git commit -m "feat: nova feature"
# 🧪 AUTOMÁTICO: Roda quality + frontend + security
# ❌ Erro? Commit bloqueado
# ✅ OK? Commit liberado
```

### Pre-Push Hook (Automático ao fazer push)
```bash
npm run release patch "Descrição"  # Cria novo commit com versão
git push origin main
# 🧪 AUTOMÁTICO: Roda TODOS os testes + valida versioning
# ❌ Erro? Push bloqueado completamente
# ✅ OK? Push liberado
```

**Resultado:** Nada quebrado chega ao GitHub por acidente!

## 📖 Equivalência com GitHub Actions

| Local | GitHub Actions |
|-------|---|
| `node test-local.js quality` | Quality Check workflow |
| `node test-local.js frontend` | Frontend Tests workflow |
| `node test-local.js security` | Security Check workflow |
| `node test-local.js docs` | Documentation Check workflow |

---

**Teste localmente = Menos surpresas no GitHub! ✅**
