# 📝 Convenção de Commits - ARKLAND Store

## Formato

```
<tipo>(<escopo>): <descrição>

<corpo>

<rodapé>
```

## Tipos de Commit

- **feat**: Nova funcionalidade
- **fix**: Correção de bug
- **docs**: Documentação
- **style**: Formatação (sem mudança de código)
- **refactor**: Refatoração de código
- **perf**: Melhoria de performance
- **test**: Testes
- **chore**: Dependências, build, CI/CD
- **ci**: Configuração CI/CD

## Exemplos

### Nova feature
```bash
git commit -m "feat(frontend): adicionar filtro por preço na vitrine"
```

### Correção de bug
```bash
git commit -m "fix(backend): corrigir erro ao buscar pacotes sem categoria"
```

### Documentação
```bash
git commit -m "docs: atualizar guia de instalação"
```

### Refatoração
```bash
git commit -m "refactor(service): simplificar lógica de formatação de pacotes"
```

## Emoji Convencionais (Opcional)

- 🎉 `:tada:` - Commit inicial
- ✨ `:sparkles:` - Nova feature
- 🐛 `:bug:` - Bug fix
- 📚 `:books:` - Documentação
- 🎨 `:art:` - UI/Style
- ⚡ `:zap:` - Performance
- ✅ `:white_check_mark:` - Testes
- 🔧 `:wrench:` - Configuração
- 📦 `:package:` - Dependências
- 🚀 `:rocket:` - Deploy/Release

## Fluxo de Trabalho

```bash
# Criar feature branch
git checkout -b feat/novo-recurso

# Fazer alterações e commits
git add .
git commit -m "feat(component): descrição"

# Enviar para GitHub
git push origin feat/novo-recurso

# Criar Pull Request no GitHub
# Após aprovação, fazer merge

# Voltar para main
git checkout main
git pull origin main
```

## Dicas

- Commits pequenos e focados
- Mensagens em inglês quando possível
- Use imperativo ("adicionar" não "adicionado")
- Referencie issues quando relevante: `fixes #123`
