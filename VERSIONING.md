# 📦 Guia de Versionamento - ARKLAND Store

## 🎯 Semantic Versioning (SemVer)

Nosso projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/):

```
MAJOR.MINOR.PATCH
  ↓     ↓      ↓
Mudanças incompatíveis | Novas funcionalidades | Correções de bugs
```

### Exemplos

| Versão Atual | Tipo   | Nova Versão | Quando usar |
|-------------|--------|------------|-----------|
| 1.0.0      | PATCH  | 1.0.1      | Correção de bug |
| 1.0.0      | MINOR  | 1.1.0      | Nova feature |
| 1.0.0      | MAJOR  | 2.0.0      | Breaking change |

---

## 📝 Como fazer uma Release

### Passo 1: Faça suas mudanças

```bash
# Edite os arquivos
git add .
git commit -m "feat(user): adicionar sistema de avaliações"
```

### Passo 2: Execute o comando de release

```bash
# Desde a pasta raiz do projeto

# Para correção de bug
npm run release patch "Corrigir erro de validação"

# Para nova feature
npm run release minor "Adicionar sistema de ratings"

# Para mudança incompatível
npm run release major "Refatoração completa da API"
```

### O que o comando faz:

1. ✅ Lê a versão atual do arquivo `VERSION`
2. ✅ Incrementa automaticamente (MAJOR/MINOR/PATCH)
3. ✅ Atualiza `CHANGELOG.md` com as mudanças
4. ✅ Atualiza `backend/package.json`
5. ✅ Cria commit automático com tipo `chore(release)`
6. ✅ Cria git tag com a nova versão

### Passo 3: Faça o push

```bash
# Push para o repositório
git push origin main

# Push das tags
git push origin --tags
```

---

## 📋 Estrutura do Changelog

Novo arquivo `CHANGELOG.md` documenta cada release:

```markdown
## [1.2.0] - 2026-03-20

### Adicionado
- ✨ Sistema de avaliações de pacotes
- ✨ Endpoint POST /api/ratings

### Alterado
- 🎨 Redesign da página de detalhes

### Corrigido
- 🐛 Erro ao filtrar por categoria vazia

### Removido
- 🗑️  Endpoint deprecated /api/packages/old
```

---

## 🔒 Proteções Implementadas

### ✅ Pre-push Hook

O Git impede automaticamente fazer `push` sem atualizar a versão:

```bash
$ git push origin main

❌ ERRO: Versão não foi atualizada!
📋 A versionagem é obrigatória para cada push.
```

### ✅ Arquivo VERSION

Versão centralizada em um arquivo simples:

```
1.0.0
```

Facilita integração com CI/CD, Docker builds, etc.

---

## 📁 Arquivos Versionados

Três arquivos são sincronizados automaticamente:

| Arquivo | Propósito | Atualizado por |
|---------|---------|---|
| `VERSION` | Versão central | `npm run release` |
| `CHANGELOG.md` | Histórico de mudanças | `npm run release` |
| `backend/package.json` | Versão do npm | `npm run release` |

---

## 🏷️ Git Tags

Tags são criadas automaticamente:

```bash
# Ver todas as tags
git tag

# Ver informações de uma tag
git show v1.0.0

# Fazer checkout de uma tag
git checkout v1.0.0
```

---

## 📊 Exemplos Reais

### Exemplo 1: Correção de Bug

```bash
npm run release patch "Corrigir busca com acentos"
```

```
1.0.0 → 1.0.1
Commit: chore(release): v1.0.1 - Corrigir busca com acentos
Tag: v1.0.1
```

### Exemplo 2: Nova Feature

```bash
npm run release minor "Adicionar filtro por preço"
```

```
1.0.1 → 1.1.0
Commit: chore(release): v1.1.0 - Adicionar filtro por preço
Tag: v1.1.0
```

### Exemplo 3: Breaking Change

```bash
npm run release major "Refatoração completa da API"
```

```
1.1.0 → 2.0.0
Commit: chore(release): v2.0.0 - Refatoração completa da API
Tag: v2.0.0
```

---

## 🛠️ Setup (já implementado)

Os scripts já foram configurados automaticamente:

```bash
# Script de release
node release.js <major|minor|patch> "Descrição"

# Ou via npm (atualize package.json):
npm run release patch "Descrição"
```

---

## 📈 Fluxo Completo

```
┌─────────────────────────────────────────────┐
│ 1. Fazer mudanças e commitar                │
│    git add .                                │
│    git commit -m "feat: ..."                │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 2. Executar release                         │
│    npm run release minor "Descrição"        │
│    - Incrementa versão                      │
│    - Atualiza CHANGELOG.md                  │
│    - Cria commit e tag                      │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 3. Fazer push (com proteção)                │
│    git push origin main                     │
│    git push origin --tags                   │
│    - Pre-push hook valida versão            │
└─────────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────────┐
│ 4. Versão registrada no GitHub              │
│    - Commit com chore(release)              │
│    - Tag v1.X.X criada                      │
│    - CHANGELOG atualizado                   │
└─────────────────────────────────────────────┘
```

---

## ❓ Perguntas Frequentes

### P: Posso fazer push sem versionar?
**R:** Não! O pre-push hook impede automiticamente.

### P: E se eu esquecer de versionar?
**R:** A mensagem te guiará:
```
❌ ERRO: Versão não foi atualizada!
📋 A versionagem é obrigatória.
Use: npm run release <major|minor|patch> "Descrição"
```

### P: Posso editar o CHANGELOG manualmente?
**R:** Sim, mas é melhor usar o script para manter consistência.

### P: Como reverter uma release?
**R:** 
```bash
git reset --soft HEAD~1  # Desfaz o commit
npm run release patch "Nova descrição"  # Cria novo
```

---

## 🚀 Dica Pro

Crie um alias para facilitar:

```bash
# No seu .bashrc ou .powershell
alias release='npm run release'

# Uso:
release patch "Descrição"
```

---

**Versionamento rigoroso = Código melhor rastreado e histórico claro! 📚**
