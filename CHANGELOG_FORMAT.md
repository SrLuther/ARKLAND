# 📝 Formato Obrigatório do CHANGELOG

## Regra: CHANGELOG Detalhado com Arquivos

A partir de agora, **cada versão no CHANGELOG deve incluir:**

1. ✅ **Seção com tipo de mudança** (Adicionado, Alterado, Removido, Corrigido, Segurança)
2. ✅ **Nome do arquivo** com path relativo em backticks
3. ✅ **Descrição resumida** do que mudou ou a função do arquivo
4. ✅ **Mínimo 2-3 arquivos** por versão (a menos que seja micro-fix)

---

## ✅ Formato Correto

```markdown
## [1.0.8] - 2026-03-18

### Adicionado
- arquivo: `backend/src/utils/validators.js` - Novo módulo com funções de validação de email, telefone e CPF
- arquivo: `frontend/js/modules/search.js` - Módulo de busca avançada com debounce e cache

### Alterado
- arquivo: `backend/src/server.js` - Adicionado middleware de rate-limiting
- arquivo: `frontend/css/style.css` - Melhorado tema primitivo com novas paletas de cores
- arquivo: `VERSIONING.md` - Documentação atualizada com novos exemplos

### Corrigido
- arquivo: `backend/src/controllers/packagesController.js` - Fix: erro na paginação de resultados
- arquivo: `frontend/js/main.js` - Fix: memory leak em event listeners

### Removido
- arquivo: `backend/src/utils/deprecated.js` - Removido módulo descontinuado
```

---

## ❌ Formato Incorreto (Será Bloqueado)

```markdown
## [1.0.8] - 2026-03-18

### Adicionado
- Nova funcionalidade adicionada
- Melhorias gerais no sistema
```
**Problemas:**
- ❌ Sem referência a arquivos
- ❌ Descrição genérica demais
- ❌ Não especifica o que mudou (aonde?)

---

## 🎯 Guia Detalhado

### Para NOVO ARQUIVO (Adicionado)

Use formato:
```
- arquivo: `path/to/new-file.js` - [Tipo] Descrição da função/propósito do arquivo
```

Exemplos:
```
- arquivo: `backend/src/services/emailService.js` - Service: Integração com SendGrid
- arquivo: `frontend/components/Modal.js` - Component: Modal reutilizável com backdrop
- arquivo: `backend/scripts/migrate-users.js` - Script: Migração de usuários legados
- arquivo: `DEPLOYMENT.md` - Documentação: Guia de deploy em produção
```

### Para ARQUIVO ALTERADO (Alterado)

Use formato:
```
- arquivo: `path/to/file.js` - Alterado: O que especificamente mudou
```

Exemplos:
```
- arquivo: `backend/src/server.js` - Alterado: Adicionado rate-limiting middleware
- arquivo: `frontend/css/style.css` - Alterado: Melhorado responsividade para mobile < 480px
- arquivo: `backend/src/routes/packages.js` - Alterado: Endpoint de busca agora suporta filtros avançados
- arquivo: `README.md` - Alterado: Documentação de setup atualizada
```

### Para ARQUIVO REMOVIDO (Removido)

Use formato:
```
- arquivo: `path/to/old-file.js` - Removido: Por que foi removido
```

Exemplos:
```
- arquivo: `backend/src/utils/legacy-adapter.js` - Removido: Deprecated em v1.0.5
- arquivo: `frontend/css/old-theme.css` - Removido: Substituído por novo tema primitivo
```

### Para BUG FIX (Corrigido)

Use formato:
```
- arquivo: `path/to/file.js` - Corrigido: Descrição do bug e fix
```

Exemplos:
```
- arquivo: `backend/src/controllers/packagesController.js` - Corrigido: Erro 500 em paginação com página inválida
- arquivo: `frontend/js/main.js` - Corrigido: Memory leak em event listeners de busca
```

---

## 🤖 Como Gerar com Facilidade

### Passo 1: Verificar quais arquivos mudaram
```bash
# Ver arquivos que foram alterados
git diff --name-only origin/main

# Ver arquivos que serão commitados
git diff --cached --name-only
```

### Passo 2: Ver exatamente o que mudou
```bash
# Ver diff de um arquivo específico
git diff backend/src/server.js

# Ver apenas linhas adicionadas/removidas
git diff --stat
```

### Passo 3: Atualizar CHANGELOG
```
1. Abra CHANGELOG.md
2. Adicione seção [X.X.X] - DATA
3. Liste os arquivos com descrição
4. Commit: git add .
5. Release: npm run release patch "mensagem"
```

---

## ⚠️ Validações Automáticas

O **pre-push hook** vai verificar:

1. ✅ CHANGELOG contém versão nova
2. ✅ CHANGELOG tem seção (Adicionado/Alterado/etc)
3. ✅ CHANGELOG menciona pelo menos 1 arquivo
4. ✅ CHANGELOG tem descrição após o arquivo (mínimo 10 caracteres)

**Se falhar qualquer validação = PUSH BLOQUEADO**

---

## 📊 Exemplos Completos

### ✅ Exemplo BOM - v1.0.8

```markdown
## [1.0.8] - 2026-03-20

### Adicionado
- arquivo: `backend/src/services/emailService.js` - Service para envio de emails via SendGrid com template support
- arquivo: `backend/src/routes/notifications.js` - Endpoint para gerenciar notificações de usuário
- arquivo: `frontend/js/modules/notifications.js` - UI para badge de notificações em tempo real

### Alterado
- arquivo: `backend/src/controllers/packagesController.js` - Melhorado endpoint de busca com cache Redis
- arquivo: `frontend/css/style.css` - Atualizado paleta de cores para melhor contraste WCAG AA
- arquivo: `README.md` - Documentação de setup adicionada

### Corrigido
- arquivo: `backend/src/services/tip4servService.js` - Fix retorno correto de timestamp na API
```

### ❌ Exemplo RUIM - Será Bloqueado

```markdown
## [1.0.8] - 2026-03-20

### Adicionado
- Nova feature de notificações
- Melhorias de performance

### Alterado
- Sistema de busca otimizado
- Interface melhorada
```

---

## 🔧 Checklist Antes de Push

- [ ] Rodei `npm run release patch "mensagem"`?
- [ ] CHANGELOG tem versão nova `## [X.X.X]`?
- [ ] CHANGELOG lista arquivos alterados em backticks?
- [ ] Cada arquivo tem descrição (10+ caracteres)?
- [ ] Testei com `node test-local.js all` e passou?
- [ ] Pronto para `git push`!

---

**Regra de Ouro:** Se o CHANGELOG não detalhar exatamente o que mudou em cada arquivo, o push será bloqueado automaticamente! 🛡️
