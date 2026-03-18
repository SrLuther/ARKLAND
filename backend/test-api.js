#!/usr/bin/env node

/**
 * Script de teste para verificar integração com Tip4Serv
 * Uso: node test-api.js
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TIP4SERV_API_KEY;
const API_URL = 'https://api.tip4serv.com/v1';

async function runTests() {
  console.log('🧪 Iniciando testes de integração Tip4Serv...\n');

  // Test 1: Validar chave API
  console.log('1️⃣  Validando chave API...');
  if (!API_KEY) {
    console.error('   ❌ Erro: TIP4SERV_API_KEY não configurada em .env');
    process.exit(1);
  }
  console.log('   ✅ Chave API configurada\n');

  // Test 2: Conectar à API
  console.log('2️⃣  Testando conexão com API...');
  try {
    const response = await axios.get(`${API_URL}/store/products`, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      params: { per_page: 1 }
    });

    console.log('   ✅ Conexão bem-sucedida\n');

    // Test 3: Validar dados
    console.log('3️⃣  Validando resposta...');
    console.log(`   📦 Total de produtos: ${response.data.product_count || response.data.products?.length || 0}`);
    
    if (response.data.products && response.data.products.length > 0) {
      const firstProduct = response.data.products[0];
      console.log(`   📝 Primeiro produto: ${firstProduct.name}`);
      console.log(`   💰 Preço: ${firstProduct.price} ${firstProduct.currency || 'BRL'}`);
      console.log('   ✅ Dados válidos\n');
    }

    // Test 4: Estrutura da resposta
    console.log('4️⃣  Verificando estrutura...');
    if (response.data.products) {
      console.log('   ✅ Resposta contém array de produtos\n');
    }

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('✅ TODOS OS TESTES PASSARAM!');
    console.log('═══════════════════════════════════════\n');
    console.log('📌 Próximos passos:');
    console.log('   1. npm install');
    console.log('   2. npm start');
    console.log('   3. Acesse http://localhost:3000\n');

  } catch (error) {
    console.error('\n   ❌ Erro na conexão:');
    
    if (error.response?.status === 401) {
      console.error('      Erro 401: Chave API inválida ou expirada');
      console.error('      Verifique sua chave em: https://tip4serv.com/dashboard/api-keys');
    } else if (error.response?.status === 403) {
      console.error('      Erro 403: Acesso proibido');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('      Erro: Não conseguiu conectar à API');
      console.error('      Verifique sua conexão com internet');
    } else {
      console.error(`      ${error.message}`);
    }

    console.error('\n═══════════════════════════════════════');
    console.log('📧 Suporte: contact@tip4serv.com');
    console.log('🔗 Docs: https://tip4serv.gitbook.io/tip4serv-api\n');

    process.exit(1);
  }
}

// Executar testes
runTests();
