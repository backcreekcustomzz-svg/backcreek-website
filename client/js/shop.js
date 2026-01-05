// Shop page functionality
let currentCategory = 'all';

// Update cart count
updateCartCount();

// Load categories
const categoryFilter = document.getElementById('categoryFilter');
categories.forEach(category => {
  const button = document.createElement('button');
  button.className = 'category-btn';
  button.textContent = category;
  button.dataset.category = category;
  button.onclick = () => filterByCategory(category);
  categoryFilter.appendChild(button);
});

// Display all products initially
displayProducts(products);

// Display products
function displayProducts(productsToShow) {
  const container = document.getElementById('productsGrid');
  
  if (productsToShow.length === 0) {
    container.innerHTML = '<div class="empty-state"><h3>No products found</h3></div>';
    return;
  }
  
  container.innerHTML = productsToShow.map(product => `
    <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
      <div class="product-image">📦</div>
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description.substring(0, 100)}...</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
    </div>
  `).join('');
}

// Filter products by category
function filterByCategory(category) {
  currentCategory = category;
  
  // Update active button
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.category === category) {
      btn.classList.add('active');
    }
  });
  
  // Filter products
  if (category === 'all') {
    displayProducts(products);
  } else {
    const filtered = products.filter(p => p.category === category);
    displayProducts(filtered);
  }
}
