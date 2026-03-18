# 🚧 Quality Gates - Sistema de Proteção Automático

## O Que São Quality Gates?

São **barreiras automáticas** que bloqueiam commits e pushes se houver erros. Nada quebrado chega ao GitHub! 

```
SUA MUDANÇA
    ↓
Você faz commit → Pre-commit hook testa → ❌ Erro? Bloqueado! / ✅ OK? Liberado
    ↓
Você faz push → Pre-push hook testa + valida versão → ❌ Erro? Bloqueado! / ✅ OK? Liberado
    ↓
GITHUB (sempre com qualidade garantida!)
```

---

## 🔒 Camada 1: Pre-Commit Hook

**Quando dispara:** Ao fazer `git commit`  
**O que testa:**
- ✅ JavaScript sintaxe (backend + frontend)
- ✅ Estrutura de pastas
- ✅ .gitignore e segurança

**Se falhar:**
```
❌ COMMIT BLOQUEADO - Testes falharam!
   Veja os erros acima
   Corrija o problema
   Tente commit novamente
```

**Exemplo:**
```bash
$ git add .
$ git commit -m "feat: adicionar busca"

╔════════════════════════════════════════════════════╗
║  🧪 PRE-COMMIT VALIDATION - Quick Check            ║
╚════════════════════════════════════════════════════╝

  JavaScript sintaxe (server.js)... ✅
  JavaScript sintaxe (controllers)... ❌ ERRO ENCONTRADO!

❌ COMMIT BLOQUEADO - Testes falharam!
   1. Corrija a sintaxe em packagesController.js
   2. Tente fazer commit novamente
```

---

## 🔒 Camada 2: Pre-Push Hook

**Quando dispara:** Ao fazer `git push`  
**O que testa:**
- ✅ TUDO do pre-commit
- ✅ Documentação (CHANGELOG, README, etc)
- ✅ Versionamento obrigatório (commit deve ter "chore(release):")

**Se falhar:**
```
❌ PUSH BLOQUEADO - Testes falharam!
   Para resolver:
   1. Veja os erros acima
   2. Corrija os problemas
   3. git add . && git commit -m "fix: ..."
   4. npm run release patch "Descrição"
   5. git push novamente
```

**Exemplo:**
```bash
$ npm run release patch "Corrigir busca"
$ git push origin main

╔════════════════════════════════════════════════════╗
║  🧪 PRE-PUSH VALIDATION - Testando antes de push   ║
╚════════════════════════════════════════════════════╝

📌 Verificando versionamento... ✅
🔍 Rodando testes locais...

  Arquivo VERSION existe... ✅
  Versões sincronizadas... ✅
  ... (todos passam)

✅ PUSH LIBERADO - Todos testes passaram!
   Enviando para GitHub...
```

---

## 🎯 Fluxo Correto: Como Fazer Deploy

```bash
# 1️⃣ Faça suas mudanças
code backend/src/server.js

# 2️⃣ Adicione e commite
git add .
git commit -m "feat: novo endpoint"  # 🧪 PRE-COMMIT testa automaticamente

# 3️⃣ Se passou o commit, agora versione
npm run release patch "Adicionar novo endpoint de busca"

# 4️⃣ Push para GitHub
git push origin main                  # 🧪 PRE-PUSH testa automaticamente
git push origin --tags               # Envia tag da versão

✅ PRONTO! Seu código está no GitHub com qualidade garantida!
```

---

## ⚠️ Erro: Como Resolver

### Erro: "COMMIT BLOQUEADO - Testes falharam"

```
1. Leia a mensagem de erro
2. Abra o arquivo indicado (ex: src/server.js)
3. Corrija a linha com erro
4. Salve o arquivo
5. git add .
6. git commit -m "fix: ..." (tenta novamente)
```

### Erro: "PUSH BLOQUEADO - Testes falharam"

```
1. Veja qual teste falhou
2. Corrija o problema
3. git add .
4. git commit -m "fix: descrição"
5. npm run release patch "Descrição fix"
6. git push origin main (tenta novamente)
```

### Erro: "Versão não foi atualizada"

```
Isso significa: Seu último commit não é de release
1. npm run release patch "Descrição da mudança"
   (Isso cria um novo commit de versão)
2. git push origin main
```

---

## 📊 Testes Automáticos: O Que é Validado?

### Backend (Quality Check)
- ✅ Sintaxe Node.js/JavaScript
- ✅ VERSION atualizado
- ✅ package.json sincronizado
- ✅ Estrutura de pastas completa
- ✅ API integration (se houver credenciais)

### Frontend
- ✅ HTML existe
- ✅ CSS válido
- ✅ JavaScript sem erros
- ✅ Tamanho de arquivos OK

### Segurança
- ✅ .gitignore correto (node_modules, .env)
- ✅ Sem credenciais no código
- ✅ Sem arquivos .env commitados

### Documentação
- ✅ README, SETUP, CHANGELOG existem
- ✅ Versionamento no CHANGELOG
- ✅ Datas de release presentes

---

## 🚀 Rodar Testes Manual (Sem Fazer Commit)

Se quiser testar antes de fazer commit:

```bash
# Todos os testes (como faz no GitHub)
npm run test:local
# ou
node ../test-local.js

# Apenas quick tests (backend + frontend)
npm run test:local:quick
# ou
node ../test-local.js quality frontend security

# Apenas um tipo
node ../test-local.js quality       # Backend
node ../test-local.js frontend      # Frontend
node ../test-local.js security      # Segurança
node ../test-local.js docs          # Documentação
```

---

## 🔧 Configurar Quality Gates (npm run setup-hooks)

Primeira vez usando o projeto:

```bash
npm run setup-hooks
```

Isso instala os Git Hooks. A partir daí, tudo é automático!

**Se você desabilitar os hooks** (não recomendado):
```bash
# Desabilitar temporariamente
git commit --no-verify -m "msg"

# Nunca fazemos isso em produção! Perigoso!
```

---

## 📈 Resumo: Fases de Proteção

| Fase | Dispara | Testa | Bloqueia Se |
|------|---------|-------|-------------|
| **Pre-Commit** | `git commit` | Backend + Frontend + Security | Erro em qualquer teste |
| **Pre-Push** | `git push` | TUDO acima + Docs + Version | Erro OR sem "chore(release):" |
| **GitHub Actions** | Push para GitHub | Mesmos testes + matriz Node 18/20 | Erro em qualquer teste |

**Resultado:** 3 camadas de proteção = Nada quebrado chega ao main! ✅

---

## ✅ Checklist: Você Está Pronto

- [ ] `npm run setup-hooks` foi executado
- [ ] Você fez uma mudança no código
- [ ] Tentou fazer `git commit` (testou automaticamente?)
- [ ] Se passou, fez `npm run release patch "descrição"`
- [ ] Tentou fazer `git push` (testou automaticamente?)
- [ ] Se passou, seu código está agora no GitHub

**Se tudo passou em ambas fases = Sistema funcionando perfeicamente! 🎉**
