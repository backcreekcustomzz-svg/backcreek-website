// Product detail page
let currentProduct = null;
let selectedOptions = {};

updateCartCount();

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (!productId) {
  window.location.href = 'shop.html';
} else {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) {
    window.location.href = 'shop.html';
  } else {
    displayProduct(currentProduct);
  }
}

function displayProduct(product) {
  const container = document.getElementById('productContainer');
  
  let optionsHtml = '';
  if (product.options && Object.keys(product.options).length > 0) {
    optionsHtml = '<div class="product-options">';
    
    for (const [optionName, optionValues] of Object.entries(product.options)) {
      if (Array.isArray(optionValues) && optionValues.length > 0) {
        optionsHtml += `
          <div class="option-group">
            <label for="${optionName}">${optionName.charAt(0).toUpperCase() + optionName.slice(1)}:</label>
            <select id="${optionName}" name="${optionName}" onchange="updateOption('${optionName}', this.value)">
              ${optionValues.map(val => `<option value="${val}">${val}</option>`).join('')}
            </select>
          </div>
        `;
        selectedOptions[optionName] = optionValues[0];
      }
    }
    
    optionsHtml += '</div>';
  }
  
  container.innerHTML = `
    <div class="product-detail">
      <div class="product-detail-image">📦</div>
      <div>
        <div class="product-category">${product.category}</div>
        <h2>${product.name}</h2>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <p style="color: var(--light-gray); margin: 1.5rem 0; line-height: 1.8;">
          ${product.description}
        </p>
        ${optionsHtml}
        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button class="btn btn-primary" onclick="addToCartFromProduct()" style="flex: 1;">
            Add to Cart
          </button>
          <a href="shop.html" class="btn btn-secondary">Continue Shopping</a>
        </div>
        <div id="addToCartMessage" style="margin-top: 1rem;"></div>
      </div>
    </div>
  `;
}

function updateOption(optionName, value) {
  selectedOptions[optionName] = value;
}

function addToCartFromProduct() {
  if (!currentProduct) return;
  
  const cartItem = {
    id: currentProduct.id,
    name: currentProduct.name,
    price: currentProduct.price,
    quantity: 1,
    selectedOptions: { ...selectedOptions },
    category: currentProduct.category
  };
  
  addToCart(cartItem);
  
  const messageDiv = document.getElementById('addToCartMessage');
  messageDiv.innerHTML = '<div class="message success">✓ Product added to cart!</div>';
  
  setTimeout(() => {
    messageDiv.innerHTML = '';
  }, 3000);
}
