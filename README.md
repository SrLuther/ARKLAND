# 🏛️ ARKLAND Store - Sistema de Vitrine de Pacotes

Sistema completo de vitrine web para venda de pacotes em servidor **ARK: Survival Evolved** integrado com **Tip4Serv**.

## 🎯 Funcionalidades

- ✅ **Vitrine completa** com catálogo de pacotes
- ✅ **Integração Tip4Serv API** - puxa dados em tempo real
- ✅ **Busca dinâmica** de pacotes
- ✅ **Filtros por categoria** (VIP, Recursos, Dinossauros, Cosméticos)
- ✅ **Tema primitivo ARK** (terra, pedra, madeira)
- ✅ **Responsivo** para mobile/desktop
- ✅ **Links diretos** para compra no Tip4Serv
- ✅ **Backend Node.js/Express**
- ✅ **Frontend HTML5/CSS3/JavaScript puro**

## 🚀 Quick Start

### Pré-requisitos

- Node.js 16+ instalado
- Chave API do Tip4Serv (obtenha em https://tip4serv.com/dashboard/api-keys)

### Instalação

1. **Clone ou extraia o projeto**

```bash
cd AKL_STORE/backend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# Copie o arquivo de exemplo
copy .env.example .env

# Edite o arquivo .env com suas credenciais
notepad .env
```

Adicione suas credenciais:

```env
# Configuração do Tip4Serv
TIP4SERV_API_KEY=sk_live_sua_chave_aqui
TIP4SERV_API_URL=https://api.tip4serv.com/v1

# Configuração do Servidor
PORT=3000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000,https://seu-dominio.com
```

4. **Inicie o servidor**

```bash
npm start
```

Ou modo desenvolvimento com reload:

```bash
npm run dev
```

5. **Acesse a vitrine**

Abra no navegador: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
AKL_STORE/
├── backend/
│   ├── src/
│   │   ├── server.js                 # Servidor Express
│   │   ├── routes/
│   │   │   └── packages.js           # Rotas de pacotes
│   │   ├── controllers/
│   │   │   └── packagesController.js # Lógica de requisições
│   │   └── services/
│   │       └── tip4servService.js    # Integração com API
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── index.html                    # HTML principal
    ├── css/
    │   ├── style.css                 # Estilos primitivos
    │   └── themes.css                # Variações de tema
    └── js/
        └── main.js                   # Lógica cliente
```

## 📡 API Endpoints

### GET `/api/packages`

Lista todos os pacotes da loja.

```bash
curl http://localhost:3000/api/packages
```

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": 123,
      "name": "Pacote VIP",
      "description": "Acesso VIP completo",
      "price": 49.99,
      "currency": "BRL",
      "category": "VIP",
      "image": "/assets/vip.png",
      "items": ["Itens exclusivos"],
      "link": "https://tip4serv.com/package/123"
    }
  ]
}
```

### GET `/api/packages/search?q=termo`

Busca pacotes por termo.

```bash
curl "http://localhost:3000/api/packages/search?q=vip"
```

### GET `/api/packages/category/:category`

Lista pacotes de uma categoria específica.

```bash
curl http://localhost:3000/api/packages/category/vip
```

### GET `/api/packages/:id`

Obtém detalhes de um pacote específico.

```bash
curl http://localhost:3000/api/packages/123
```

### GET `/api/health`

Verifica status do servidor.

```bash
curl http://localhost:3000/api/health
```

## 🎨 Tema Primitivo

A paleta de cores foi escolhida para simular o visual primitivo e natural do ARK:

- **Terra** (#6b5344) - Cor principal
- **Pedra** (#8b8680) - Secundária
- **Madeira** (#5a3a2a) - Destacada
- **Areia** (#c2b280) - Acentos
- **Fogo** (#c85a3a) - Perigo/CTA

## 🔧 Troubleshooting

### "Erro ao carregar pacotes"

1. Verifique se `.env` está configurado corretamente
2. Teste a chave API: `https://api.tip4serv.com/v1/docs`
3. Verifique conexão: `ping api.tip4serv.com`

### "CORS Error"

Edite `.env` e adicione seu domínio em `CORS_ORIGIN`:

```env
CORS_ORIGIN=http://localhost:3000,https://seu-dominio.com
```

### Pacotes não aparecem

1. Verifique se existem produtos habilitados na sua loja Tip4Serv
2. Confirme a resposta da API: `curl -H "Authorization: Bearer YOUR_KEY" https://api.tip4serv.com/v1/store/products`

## 📊 Monitoramento

Para verificar logs em tempo real:

```bash
# Com npm run dev (modo watch)
npm run dev

# Ou com debug habilitado
$env:DEBUG='*'; npm start
```

## 🚀 Deploy

### Heroku

```bash
# Crie um arquivo Procfile
echo "web: node src/server.js" > Procfile

# Deploy
git push heroku main
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production

COPY . .
EXPOSE 3000

CMD ["npm", "start"]
```

## 📝 Notas de Segurança

- ⚠️ **Nunca versione o arquivo `.env`** com credenciais reais
- ⚠️ **Mantenha sua chave API segura**
- ✅ Use variáveis de ambiente em produção
- ✅ Implemente rate limiting antes de escalar
- ✅ Use HTTPS em produção

## 📧 Contato & Suporte

- **Tip4Serv Discord**: https://tip4serv.com/discord
- **Email**: contact@tip4serv.com
- **Docs API Tip4Serv**: https://tip4serv.gitbook.io/tip4serv-api

## 📄 Licença

MIT License - Veja LICENSE para detalhes

---

**Construído com ⚔️ para ARKLAND**
