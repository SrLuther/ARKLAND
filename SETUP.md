# ARKLAND Store - Guia de Configuração

## Passo a Passo de Setup

### 1️⃣ Obter Chave API Tip4Serv

1. Acesse https://tip4serv.com/dashboard/api-keys
2. Crie uma nova chave API
3. Copie a chave (começa com `sk_live_`)

### 2️⃣ Configurar Variáveis de Ambiente

No diretório `backend/`, crie um arquivo `.env`:

```bash
# Windows (PowerShell)
echo "TIP4SERV_API_KEY=sk_live_sua_chave_aqui" > .env
echo "TIP4SERV_API_URL=https://api.tip4serv.com/v1" >> .env
echo "PORT=3000" >> .env
echo "CORS_ORIGIN=http://localhost:3000" >> .env
```

### 3️⃣ Instalar Dependências

```bash
cd backend
npm install
```

### 4️⃣ Iniciar Servidor

```bash
npm start
```

Você deve ver:
```
🏛️  ARKLAND Store rodando em http://localhost:3000
📡 API disponível em http://localhost:3000/api
```

### 5️⃣ Testar

Abra no navegador: http://localhost:3000

## Estrutura de Resposta da API Tip4Serv

Nosso serviço converte a resposta do Tip4Serv para este formato:

```json
{
  "id": "123",
  "name": "Pacote VIP Completo",
  "description": "Descrição do pacote",
  "price": 49.99,
  "currency": "BRL",
  "category": "VIP",
  "image": "url_imagem",
  "items": ["Item 1", "Item 2"],
  "benefits": [],
  "link": "https://tip4serv.com/package/123",
  "popular": true,
  "new": false
}
```

## Manutenção

### Adicionar Rota API

No arquivo `backend/src/routes/packages.js`:

```javascript
router.get('/custom', customHandler);
```

No arquivo `backend/src/controllers/packagesController.js`:

```javascript
export async function customHandler(req, res) {
  // Sua lógica
}
```

### Personalizar Tema

Edite `frontend/css/style.css` seção `:root`:

```css
:root {
  --color-earth: #6b5344;  /* Mude para suas cores */
  --color-sand: #c2b280;
  --color-danger: #c85a3a;
}
```

## Checklist de Deploy

- [ ] `.env` configurado com credenciais reais
- [ ] Testado localmente com `npm start`
- [ ] Domínio adicionado em `CORS_ORIGIN`
- [ ] HTTPS habilitado em produção
- [ ] Rate limiting implementado
- [ ] Logs monitorados

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|----------|-----------|-----------|
| `TIP4SERV_API_KEY` | ✅ | Chave API do Tip4Serv |
| `TIP4SERV_API_URL` | ❌ | URL base (padrão: https://api.tip4serv.com/v1) |
| `PORT` | ❌ | Porta do servidor (padrão: 3000) |
| `NODE_ENV` | ❌ | development/production |
| `CORS_ORIGIN` | ❌ | Origens permitidas |

---

Para mais detalhes, leia o [README.md](README.md)
