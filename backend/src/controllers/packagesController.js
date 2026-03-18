import {
  getPackagesFromTip4Serv,
  getPackageById,
  getPackagesByCategory,
  searchPackages
} from '../services/tip4servService.js';

/**
 * GET /api/packages - Lista todos os pacotes com cache
 */
export async function listPackages(req, res) {
  try {
    const packages = await getPackagesFromTip4Serv();
    
    res.json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * GET /api/packages/:id - Obtém detalhes de um pacote
 */
export async function getPackage(req, res) {
  try {
    const { id } = req.params;
    const pkg = await getPackageById(id);
    
    res.json({
      success: true,
      data: pkg
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * GET /api/packages/category/:category - Lista pacotes de uma categoria
 */
export async function getCategory(req, res) {
  try {
    const { category } = req.params;
    const packages = await getPackagesByCategory(category);
    
    res.json({
      success: true,
      count: packages.length,
      category: category,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

/**
 * GET /api/packages/search - Busca pacotes
 */
export async function searchHandler(req, res) {
  try {
    const { q } = req.query;
    
    if (!q || q.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Query deve ter no mínimo 2 caracteres'
      });
    }
    
    const packages = await searchPackages(q);
    
    res.json({
      success: true,
      count: packages.length,
      query: q,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
