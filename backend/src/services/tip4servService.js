import axios from 'axios';

const API_KEY = process.env.TIP4SERV_API_KEY;
const API_URL = 'https://api.tip4serv.com/v1';

const tip4servClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

/**
 * Busca todos os produtos/pacotes da loja no Tip4Serv
 * Endpoint: GET /store/products
 */
export async function getPackagesFromTip4Serv(page = 1) {
  try {
    const response = await tip4servClient.get('/store/products', {
      params: {
        page: page,
        per_page: 100
      }
    });
    
    // Formata os pacotes para o formato da vitrine
    const products = response.data.products || [];
    return products
      .filter(pkg => pkg.enabled !== false) // Filtra apenas produtos habilitados
      .map(pkg => formatPackage(pkg));
  } catch (error) {
    console.error('Erro ao buscar pacotes do Tip4Serv:', error.message);
    throw new Error('Falha ao conectar com Tip4Serv');
  }
}

/**
 * Busca um produto/pacote específico
 * Endpoint: GET /store/products/{id}
 */
export async function getPackageById(packageId) {
  try {
    const response = await tip4servClient.get(`/store/products/${packageId}`);
    return formatPackage(response.data);
  } catch (error) {
    console.error(`Erro ao buscar pacote ${packageId}:`, error.message);
    throw new Error('Pacote não encontrado');
  }
}

/**
 * Formata dados do Tip4Serv para o formato da vitrine
 * Converte de formato da API para formato exibição
 */
function formatPackage(pkg) {
  // Extrai categoria do nome ou usa valor padrão
  const categoryMap = {
    'vip': 'VIP',
    'recurso': 'Recursos',
    'dino': 'Dinossauros',
    'cosmetic': 'Cosméticos',
    'geral': 'Geral'
  };

  let category = 'Geral';
  for (const [key, value] of Object.entries(categoryMap)) {
    if (pkg.name?.toLowerCase().includes(key)) {
      category = value;
      break;
    }
  }

  // Analisa descrição para extrair itens
  const items = extrairItens(pkg.description);

  return {
    id: pkg.id,
    name: pkg.name || 'Pacote sem nome',
    description: pkg.description || 'Pacote exclusivo do ARKLAND',
    price: parseFloat(pkg.price) || 0,
    currency: pkg.currency || 'BRL',
    category: category,
    image: pkg.image || pkg.thumbnail || '/assets/placeholder.png',
    items: items,
    benefits: pkg.benefits || [],
    link: `https://tip4serv.com/package/${pkg.id}`,
    popular: (pkg.popularity_score || 0) > 1000 || false,
    new: pkg.created_at ? isNew(new Date(pkg.created_at)) : false
  };
}

/**
 * Extrai itens da descrição (procura por padrões comuns)
 */
function extrairItens(description) {
  if (!description) return [];

  const items = [];
  const patterns = [
    /•\s*(.+?)(?=•|$)/g,
    /[-]\s*(.+?)(?=[-]|$)/g,
    /\d+x?\s+(.+?)(?=,|\.|\n|$)/g
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(description)) !== null) {
      const item = match[1].trim();
      if (item && !items.includes(item) && item.length < 100) {
        items.push(item);
      }
    }
  }

  return items.slice(0, 5); // Máximo 5 itens
}

/**
 * Verifica se o pacote foi criado nos últimos 7 dias
 */
function isNew(createdDate) {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  return createdDate > sevenDaysAgo;
}

/**
 * Busca pacotes por categoria
 */
export async function getPackagesByCategory(category) {
  try {
    const packages = await getPackagesFromTip4Serv();
    return packages.filter(pkg => pkg.category === category);
  } catch (error) {
    console.error('Erro ao filtrar por categoria:', error.message);
    throw error;
  }
}

/**
 * Busca pacotes com filtro de busca
 */
export async function searchPackages(query) {
  try {
    const packages = await getPackagesFromTip4Serv();
    const searchLower = query.toLowerCase();
    
    return packages.filter(pkg => 
      pkg.name.toLowerCase().includes(searchLower) ||
      pkg.description.toLowerCase().includes(searchLower)
    );
  } catch (error) {
    console.error('Erro ao buscar pacotes:', error.message);
    throw error;
  }
}
