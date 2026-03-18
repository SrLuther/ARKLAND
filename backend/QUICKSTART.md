## 🚀 QUICKSTART - ARKLAND STORE

### ⚡ 5 minutos para rodar

#### Passo 1: Prepare a chave API
Acesse: https://tip4serv.com/dashboard/api-keys
Copie sua chave (começa com `sk_live_`)

#### Passo 2: Configure o ambiente
```bash
# Dentro de AKL_STORE/backend/
copy .env.example .env

# Edite .env e adicione:
# TIP4SERV_API_KEY=sk_live_sua_chave_aqui
```

#### Passo 3: Instale dependências
```bash
npm install
```

#### Passo 4: Teste a API
```bash
npm test
```

Você deve ver: ✅ TODOS OS TESTES PASSARAM!

#### Passo 5: Inicie o servidor
```bash
npm start
```

Você deve ver:
```
🏛️  ARKLAND Store rodando em http://localhost:3000
📡 API disponível em http://localhost:3000/api
```

#### Passo 6: Abra no navegador
http://localhost:3000

---

## 🔗 Links Úteis

- **API Tip4Serv**: https://tip4serv.gitbook.io/tip4serv-api
- **Dashboard**: https://tip4serv.com/dashboard
- **Suporte**: contact@tip4serv.com

## ❓ Dúvidas?

### Erro de chave API?
- Copie corretamente de: https://tip4serv.com/dashboard/api-keys
- Certifique que começa com `sk_live_`

### Nenhum pacote aparece?
- Acesse seu dashboard e crie alguns produtos
- Execute `npm test` para validar conexão

### Erro 403?
- Chave pode estar inválida
- Tente gerar uma nova chave
