# ✅ GitHub Actions - CI/CD Automático

Sistema de testes e qualidade automatizado que roda a cada push/PR.

## 🔄 Workflows Implementados

### 1️⃣ **Quality Check** (Principal)
**Arquivo:** `.github/workflows/quality-check.yml`

Roda em: `push` e `pull_request` para `main` e `develop`

**Verifica:**
- ✅ Sintaxe JavaScript em todos arquivos backend
- ✅ Integração com API Tip4Serv
- ✅ Estrutura de pastas
- ✅ Arquivo VERSION existe
- ✅ CHANGELOG.md atualizado
- ✅ Sincronização de versões

**Node.js:** Testa em 18.x e 20.x

```yaml
Triggers:
- Push para main/develop
- Pull Requests para main/develop
```

### 2️⃣ **Frontend Tests**
**Arquivo:** `.github/workflows/frontend.yml`

Roda quando há mudanças em `frontend/`

**Verifica:**
- ✅ HTML válido
- ✅ CSS compilável
- ✅ JavaScript sintaxe
- ✅ Tamanho de arquivos

### 3️⃣ **Security Check**
**Arquivo:** `.github/workflows/security.yml`

Roda toda semana + em cada push

**Verifica:**
- 🔒 Dependências npm (audit)
- 🔒 Credenciais expostas (API keys, senhas)
- 🔒 .gitignore configurado
- 🔒 Segurança de código

### 4️⃣ **Documentation Check**
**Arquivo:** `.github/workflows/docs.yml`

Roda quando há mudanças em `.md` files

**Verifica:**
- 📚 Markdown válido
- 📚 Links funcionando
- 📚 CHANGELOG atualizado
- 📚 Documentação completa

---

## 📊 Dashboard de Status

No seu repositório GitHub, você verá:

```
✅ Quality Check (main)
✅ Frontend Tests 
✅ Security Check
✅ Documentation Check
```

Clique em qualquer check para ver detalhes.

---

## 🎯 Como Funciona

### Quando você faz PUSH:

```
1. GitHub detecta push
2. Dispara workflows automaticamente
3. Roda testes em paralelo
4. Gera relatório
5. Mostra status ✅ ou ❌
```

### Quando você abre um PR:

```
1. GitHub detecta novo PR
2. Roda todos os workflows
3. Mostra status na PR
4. Você só pode mergear se passar ✅
```

---

## 📋 Check-list Automática

Cada workflow gera um relatório como este:

```
## ✅ Quality Check Report

### Node.js Versions Tested
- Testado em: 18.x
- Testado em: 20.x

### Verificações
- ✅ Sintaxe JavaScript
- ✅ Integração API
- ✅ Estrutura de pastas
- ✅ CHANGELOG.md
```

---

## 🔐 Secrets do GitHub

Para o workflow de security, você precisa configurar:

### GitHub Secrets

1. Vá para: Repository → Settings → Secrets and variables → Actions
2. Clique em "New repository secret"
3. Adicione:

```
Nome: TIP4SERV_API_KEY
Valor: sk_live_sua_chave_aqui
```

Isso permite rodar testes de API sem expor credenciais.

---

## ❌ O que causa falha?

Um workflow falha se:

```
❌ Sintaxe JavaScript com erro
❌ npm test falha
❌ Credenciais expostas
❌ Arquivo obrigatório falta
❌ VERSION não atualizado
❌ CHANGELOG desatualizado
```

---

## 📌 No Seu Repositório

Visite: `https://github.com/SrLuther/ARKLAND/actions`

Lá você verá:

```
🟢 All checks passed
🟠 Some checks failed
🔴 Critical errors
```

---

## 🚀 Melhorias Futuras

Você pode adicionar:

- 📈 Coverage de testes
- 🤖 Deploy automático
- 📦 Build de Docker
- 🚢 Deploy para Heroku/Azure
- 📱 Testes de responsividade
- ⚡ Performance check

---

## 💡 Dicas

### 1. Veja logs locais antes de fazer push
```bash
cd backend
npm test
```

### 2. Verifique todos os erros localmente
```bash
node -c src/server.js
```

### 3. Atualize a versão!
```bash
npm run release patch "Descrição"
```

### 4. Sempre escreva descritivo no commit
```bash
git commit -m "feat(api): novo endpoint"
```

---

## 📚 Referências

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions)
- [ESLint](https://eslint.org/docs/rules/)

---

**Seu código é verificado automaticamente! ✅**
