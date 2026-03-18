# 🔐 GitHub Secrets - Configuração

## O que são GitHub Secrets?

Secrets são variáveis confidenciais armazenadas seguramente no GitHub. Elas são criptografadas e não aparecem em logs.

## 📋 Secrets Necessários para ARKLAND

### TIP4SERV_API_KEY ⭐ (Recomendado)

Permite testar a integração com a API do Tip4Serv nos workflows.

### Como Configurar

#### 1. Obtenha sua chave

- Acesse: https://tip4serv.com/dashboard/api-keys
- Copie uma chave existente ou crie uma nova
- Formato: `sk_live_xxxxxxxxxxxxx`

#### 2. Adicione ao GitHub

1. Vá ao repositório: https://github.com/SrLuther/ARKLAND
2. Clique em **Settings** (Configurações)
3. Procure por **Secrets and variables** → **Actions**
4. Clique em **New repository secret**
5. Preencha:
   - **Name:** `TIP4SERV_API_KEY`
   - **Secret:** `sk_live_sua_chave_aqui`
6. Clique em **Add secret**

#### 3. Pronto!

Agora os workflows podem acessar `${{ secrets.TIP4SERV_API_KEY }}`

---

## 🔒 Segurança

✅ **O que é seguro:**
- Armazenar secrets no GitHub
- Usar em variáveis de ambiente
- Refe renciar em workflows

❌ **O que NÃO fazer:**
- Commitar secrets no código
- Compartilhar API keys
- Colocar secrets em pull requests públicas

---

## 🔍 Verificar Secrets

Na aba **Settings → Secrets and variables → Actions**, você verá:

```
✓ TIP4SERV_API_KEY (Last used: Just now)
```

---

## 📖 Referência

- [GitHub Secrets Docs](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Tip4Serv API Keys](https://tip4serv.com/dashboard/api-keys)

---

## 💡 Dica

Seus tests rodarão sem o secret, mas com `continue-on-error: true`, o que significa:
- ✅ Outros testes continuam
- ⚠️ Teste de API pode falhar (esperado sem a chave)
- ✅ Build não para por causa disso

Quando você adicionar o secret, o teste passará completamente! 🎉
