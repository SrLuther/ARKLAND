# .github - Configuração GitHub

Este diretório contém configurações e workflows do GitHub.

## 📁 Estrutura

```
.github/
├── workflows/                    # GitHub Actions workflows
│   ├── quality-check.yml        # ✅ Testes de qualidade principais
│   ├── frontend.yml             # ✅ Testes do frontend
│   ├── security.yml             # 🔒 Verificações de segurança
│   └── docs.yml                 # 📚 Verificações de documentação
├── GITHUB_ACTIONS.md            # 📖 Guia completo de GitHub Actions
├── BADGES.md                    # 🎖️ Badges para README
├── SECRETS.md                   # 🔐 Configuração de Secrets
└── README.md                    # Este arquivo
```

## 🚀 Workflows Ativos

| Workflow | Trigger | Status |
|----------|---------|--------|
| Quality Check | Push/PR | ✅ Ativo |
| Frontend Tests | Push/PR | ✅ Ativo |
| Security Check | Push/PR/Weekly | ✅ Ativo |
| Documentation Check | Push/PR | ✅ Ativo |

## 📊 Status do Projeto

Veja todos os workflows rodando:

**GitHub → Actions**

https://github.com/SrLuther/ARKLAND/actions

## 📖 Documentação

- [GitHub Actions Guide](./GITHUB_ACTIONS.md)
- [Badges & Status](./BADGES.md)
- [Configuração de Secrets](./SECRETS.md)

## 🔐 Próximas Configurações

- [ ] Adicionar `TIP4SERV_API_KEY` aos Secrets (veja SECRETS.md)
- [ ] Habilitar Branch Protection (Settings → Branches)
- [ ] Adicionar badges ao README

## ✅ Checklist

- [x] Quality Check configurado
- [x] Frontend Tests configurado
- [x] Security Check configurado
- [x] Documentation Check configurado
- [ ] GitHub Secrets configurados (veja SECRETS.md)
- [ ] Badges adicionados ao README

