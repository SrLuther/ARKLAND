/**
 * ARKLAND Store - JavaScript Principal
 * Responsável por: Carregar pacotes, filtros, busca
 */

const API_URL = '/api';
let allPackages = [];
let currentCategory = 'todos';

// ========================================
// Inicialização
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  loadPackages();
  setupEventListeners();
});

// ========================================
// Event Listeners
// ========================================

function setupEventListeners() {
  // Filtros de categoria
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', handleCategoryFilter);
  });

  // Busca
  const searchInput = document.getElementById('searchInput');
  searchInput?.addEventListener('input', handleSearch);
}

// ========================================
// Carregamento de pacotes
// ========================================

async function loadPackages() {
  const loading = document.getElementById('loading');
  const packagesContainer = document.getElementById('packages');

  try {
    loading?.classList.remove('hidden');
    packagesContainer.innerHTML = '';

    const response = await fetch(`${API_URL}/packages`);

    if (!response.ok) {
      throw new Error('Erro ao carregar pacotes');
    }

    const data = await response.json();
    allPackages = data.data || [];

    if (allPackages.length === 0) {
      showNoResults();
    } else {
      displayPackages(allPackages);
    }
  } catch (error) {
    console.error('Erro:', error);
    packagesContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #c2a88a;">
        <p>⚠️ Erro ao carregar pacotes. Tente renovar a página.</p>
        <p style="font-size: 0.9rem; margin-top: 0.5rem;">Erro: ${error.message}</p>
      </div>
    `;
  } finally {
    loading?.classList.add('hidden');
  }
}

// ========================================
// Exibição de pacotes
// ========================================

function displayPackages(packages) {
  const packagesContainer = document.getElementById('packages');
  const noResults = document.getElementById('noResults');

  if (!packages || packages.length === 0) {
    showNoResults();
    return;
  }

  noResults?.classList.add('hidden');
  packagesContainer.innerHTML = packages
    .map(pkg => createPackageCard(pkg))
    .join('');
}

function createPackageCard(pkg) {
  const badgeHTML = pkg.popular
    ? `<span class="package-badge">🔥 Popular</span>`
    : pkg.new
    ? `<span class="package-badge">✨ Novo</span>`
    : '';

  const itemsHTML =
    pkg.items && Array.isArray(pkg.items)
      ? `<div class="package-items"><strong>📦 Incluso:</strong> ${pkg.items.join(', ')}</div>`
      : '';

  return `
    <div class="package-card">
      <div class="package-image">
        ${pkg.image && pkg.image !== '/assets/placeholder.png' 
          ? `<img src="${pkg.image}" alt="${pkg.name}" style="width: 100%; height: 100%; object-fit: cover;">` 
          : '🦕'}
      </div>
      ${badgeHTML}
      
      <div class="package-content">
        <span class="package-category">${pkg.category || 'Geral'}</span>
        <h3 class="package-name">${pkg.name}</h3>
        <p class="package-description">${pkg.description || 'Pacote exclusivo do ARKLAND'}</p>
        ${itemsHTML}
      </div>

      <div class="package-footer">
        <div class="package-price">
          ${formatPrice(pkg.price, pkg.currency)}
          <small>${pkg.currency}</small>
        </div>
        <a href="${pkg.link}" target="_blank" rel="noopener noreferrer" class="btn-buy">
          Comprar 🛒
        </a>
      </div>
    </div>
  `;
}

function formatPrice(price, currency = 'BRL') {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency === 'BRL' ? 'BRL' : currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(price || 0);
}

// ========================================
// Filtros
// ========================================

function handleCategoryFilter(e) {
  const categoryBtn = e.currentTarget;
  const category = categoryBtn.getAttribute('data-category');

  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  categoryBtn.classList.add('active');

  currentCategory = category;

  // Filter e display
  const filtered =
    category === 'todos'
      ? allPackages
      : allPackages.filter(pkg => 
          pkg.category?.toLowerCase() === category.toLowerCase()
        );

  displayPackages(filtered);
}

// ========================================
// Busca
// ========================================

function handleSearch(e) {
  const query = e.target.value.trim().toLowerCase();
  const searchResults = document.getElementById('searchResults');

  if (query.length < 2) {
    searchResults?.classList.add('hidden');
    return;
  }

  const results = allPackages.filter(pkg =>
    pkg.name.toLowerCase().includes(query) ||
    (pkg.description && pkg.description.toLowerCase().includes(query))
  );

  if (results.length === 0) {
    searchResults?.classList.add('hidden');
    return;
  }

  // Render search results
  searchResults.innerHTML = results
    .slice(0, 8)
    .map(pkg =>
      `<div class="search-result-item" data-id="${pkg.id}">
        <strong>${pkg.name}</strong>
        <div style="font-size: 0.85rem; color: #8b7d6b; margin-top: 0.25rem;">
          ${pkg.description?.substring(0, 50) || 'Pacote exclusivo'}...
        </div>
      </div>`
    )
    .join('');

  searchResults?.classList.remove('hidden');

  // Click handlers
  searchResults
    .querySelectorAll('.search-result-item')
    .forEach(item => {
      item.addEventListener('click', () => {
        const pkg = allPackages.find(
          p => p.id === item.getAttribute('data-id')
        );
        if (pkg) {
          window.location.href = pkg.link;
        }
      });
    });
}

// ========================================
// Utilitários
// ========================================

function showNoResults() {
  const noResults = document.getElementById('noResults');
  const packagesContainer = document.getElementById('packages');

  noResults?.classList.remove('hidden');
  packagesContainer.innerHTML = '';
}
