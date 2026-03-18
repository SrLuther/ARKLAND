# Changelog - ARKLAND Store

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/) 
e este projeto segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.7] - 2026-03-18

### Corrigido
- Validação obrigatória de CHANGELOG em cada push

---

## [1.0.6] - 2026-03-18

### Corrigido
- CHANGELOG corrigido com histórico completo de todas as versões

---

## [1.0.5] - 2026-03-18

### Adicionado
- ✨ Documentação completa do sistema de testes locais
- ✨ Documentação de quality gates e proteção automática
- ✨ Exemplos práticos de uso do sistema de proteção

---

## [1.0.4] - 2026-03-18

### Adicionado
- ✨ Sistema de testes locais completo (test-local.js)
- ✨ Pre-commit hook com validação rápida (10 testes)
- ✨ Pre-push hook com validação completa (30 testes)
- ✨ Scripts npm para testes: `npm run test:local` e `npm run test:local:quick`

### Alterado
- 🔧 Corrigido .env.example para remover exemplo de credenciais reais
- 🔧 Melhorado test-local.js para compatibilidade Windows

---

## [1.0.3] - 2026-03-18

### Corrigido
- 🐛 Corrigido aviso de secret não configurado no GitHub Actions
- 🐛 Removido requisito de env variable no workflow quality-check
- 🐛 Tornada testes de API opcional com continue-on-error

### Adicionado
- 📚 Documentação de GitHub Secrets em .github/SECRETS.md

---

## [1.0.2] - 2026-03-18

### Adicionado
- 📚 Documentação completa do projeto
- 📚 Arquivo STATUS.md com visão geral do projeto
- 📚 Guias de setup e quickstart

### Alterado
- 🔧 Melhorado pre-push hook para usar shell script compatível com Windows

---

## [1.0.1] - 2026-03-18

### Adicionado
- ✨ Sistema de versionamento automático (release.js)
- ✨ Pre-push hook que valida versionamento
- ✨ Git hook setup script (npm run setup-hooks)
- ✨ Arquivo VERSIONING.md com documentação do sistema
- ✨ Arquivo COMMITS.md com convenções de commits
- ✨ Enforcement de semantic versioning em cada push

### Alterado
- 🔧 VERSION file como fonte única de verdade

---

### Adicionado
- ✨ Estrutura inicial do projeto
- ✨ Backend Express com integração Tip4Serv API
- ✨ Frontend com tema primitivo ARK (terra, pedra, madeira)
- ✨ Sistema de busca dinâmica de pacotes
- ✨ Filtros por categoria (VIP, Recursos, Dinossauros, Cosméticos)
- ✨ Endpoints da API REST:
  - `GET /api/packages` - List all packages
  - `GET /api/packages/:id` - Get package details
  - `GET /api/packages/search?q=term` - Search packages
  - `GET /api/packages/category/:category` - Filter by category
  - `GET /api/health` - Health check
- ✨ Integração completa com Tip4Serv API
- ✨ Sistema de cache e sincronização com API
- ✨ Documentação completa (README, SETUP, QUICKSTART)
- ✨ Tema responsivo para mobile e desktop
- ✨ Links diretos para compra no Tip4Serv

### Tecnologias
- Backend: Node.js 16+ com Express.js
- Frontend: HTML5, CSS3, JavaScript vanilla
- API: Tip4Serv (REST)
- Versionamento: Semantic Versioning

---

## Guia de Versionamento

### Versão Semântica: MAJOR.MINOR.PATCH

**MAJOR** (X.y.z) - Mudanças incompatíveis / breaking changes
**MINOR** (x.Y.z) - Novas funcionalidades compatíveis
**PATCH** (x.y.Z) - Correções de bugs

### Exemplos

```
1.0.0 → 1.0.1  (Fix)
1.0.0 → 1.1.0  (Nova feature)
1.0.0 → 2.0.0  (Breaking change)
```

---

## Como dokumentar mudanças

Adicione uma seção `[X.X.X] - YYYY-MM-DD` no topo com:

### Adicionado
- Nova funcionalidade

### Alterado
- Comportamento modificado

### Removido
- Feature descontinuada

### Corrigido
- Bug fix

### Segurança
- Vulnerabilidade encontrada e corrigida

Exemplo completo:

```markdown
## [1.1.0] - 2026-03-20

### Adicionado
- ✨ Novo endpoint de avaliações
- ✨ Sistema de likes para pacotes

### Corrigido
- 🐛 Erro ao filtrar por categoria vazia
- 🐛 Crash ao buscar com caracteres especiais
```
