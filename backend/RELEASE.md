# 🚀 Guia Rápido: Release & Versionamento

## ⚡ TL;DR (5 segundos)

```bash
# Dentro de AKL_STORE/backend/
npm run release patch "Descrição da mudança"
git push origin main --tags
```

---

## 📋 Tipos de Release

### 🐛 PATCH - Correção de Bug
```bash
npm run release patch "Corrigir erro ao buscar pacotes"
```
**Exemplo:** 1.0.0 → 1.0.1

### ✨ MINOR - Nova Funcionalidade
```bash
npm run release minor "Adicionar sistema de ratings"
```
**Exemplo:** 1.0.0 → 1.1.0

### 🔨 MAJOR - Breaking Change
```bash
npm run release major "Refatorar estrutura da API"
```
**Exemplo:** 1.0.0 → 2.0.0

---

## 📝 O que o comando faz automaticamente:

1. ✅ Incrementa a versão (MAJOR/MINOR/PATCH)
2. ✅ Atualiza arquivo `VERSION`
3. ✅ Atualiza `CHANGELOG.md`
4. ✅ Atualiza `backend/package.json`
5. ✅ Cria commit automático
6. ✅ Cria git tag (v1.X.X)

---

## 🔒 Proteção: Pre-push Hook

Se você tentar fazer `push` sem versionar:

```bash
$ git push origin main

❌ ERRO: Versão não foi atualizada!
Use: npm run release <major|minor|patch>
```

**Solução:** Execute o comando de release antes!

---

## 📁 Estrutura de Versão

```
ARKLAND/
├── VERSION              ← Versão central (1.0.0)
├── CHANGELOG.md         ← Histórico de mudanças
├── backend/
│   └── package.json     ← Versão npm sincronizada
└── release.js           ← Script de release
```

---

## 🎯 Fluxo Trabalho Completo

```bash
# 1. Acesse a pasta backend
cd backend

# 2. Fazer mudanças em um arquivo
# vim src/server.js

# 3. Commitar suas mudanças
git add .
git commit -m "feat(api): novo endpoint"

# 4. Criar release
npm run release minor "Novo endpoint de avaliações"

# 5. Fazer push (com proteção automática)
git push origin main
git push origin --tags

# ✨ Release concluído!
```

---

## 📊 Exemplos de Releases

### Release Patch
```bash
$ npm run release patch "Corrigir validação de email"

✅ VERSION atualizado para 1.0.1
✅ package.json atualizado para 1.0.1
✅ CHANGELOG.md atualizado
✅ Commit criado: chore(release): v1.0.1
✅ Tag criada: v1.0.1
```

### Release Minor
```bash
$ npm run release minor "Adicionar filtro por preço"

✅ VERSION atualizado para 1.1.0
✅ package.json atualizado para 1.1.0
✅ CHANGELOG.md atualizado
✅ Commit criado: chore(release): v1.1.0
✅ Tag criado: v1.1.0
```

### Release Major
```bash
$ npm run release major "Refatoração completa da API"

✅ VERSION atualizado para 2.0.0
✅ package.json atualizado para 2.0.0
✅ CHANGELOG.md atualizado
✅ Commit criado: chore(release): v2.0.0
✅ Tag criada: v2.0.0
```

---

## ✅ Verificação

```bash
# Ver versão atual
cat ../VERSION

# Ver tags no Git
git tag

# Ver histórico de releases
cat ../CHANGELOG.md
```

---

## 🔧 Configuração Inicial

Se os hooks não foram instalados automaticamente:

```bash
npm run setup-hooks
```

---

## ❓ Troubleshooting

### "Permissão negada para pre-push hook"
No Windows, ignore - é normal. O hook funcionará mesmo assim.

### "npm: command not found"
Certifique-se de estar na pasta `backend/`

### "Arquivo VERSION não encontrado"
O arquivo deve estar na raiz do projeto, não em `backend/`

---

**Pronto para fazer release? 🚀**

```bash
npm run release patch "Descrição"
```
