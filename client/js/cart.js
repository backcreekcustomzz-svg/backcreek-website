// Shopping cart functionality using localStorage
const CART_KEY = 'backcreek_cart';

// Get cart from localStorage
function getCart() {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

// Add item to cart
function addToCart(item) {
  const cart = getCart();
  
  // Check if item with same options already exists
  const existingItemIndex = cart.findIndex(cartItem => 
    cartItem.id === item.id && 
    JSON.stringify(cartItem.selectedOptions) === JSON.stringify(item.selectedOptions)
  );
  
  if (existingItemIndex > -1) {
    // Item exists, increase quantity
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // New item, add to cart
    cart.push(item);
  }
  
  saveCart(cart);
  return cart;
}

// Update item quantity
function updateCartItemQuantity(index, quantity) {
  const cart = getCart();
  
  if (quantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = quantity;
  }
  
  saveCart(cart);
  return cart;
}

// Remove item from cart
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  return cart;
}

// Clear entire cart
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}

// Get cart item count
function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

// Update cart count in navigation
function updateCartCount() {
  const count = getCartItemCount();
  const cartCountElements = document.querySelectorAll('#cartCount');
  cartCountElements.forEach(element => {
    element.textContent = count;
    element.style.display = count > 0 ? 'flex' : 'none';
  });
}

// Calculate cart subtotal
function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate order totals by asking the server (shippingState should be 2-letter code)
async function calculateOrder(shippingState) {
  const items = getCart().map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity }));
  try {
    const res = await fetch('/api/calculate-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, shippingState })
    });
    if (!res.ok) throw new Error('Calculate failed');
    const data = await res.json();
    // update DOM if present
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    if (subtotalEl) subtotalEl.textContent = `$${data.subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${data.shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${data.tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${data.total.toFixed(2)}`;
    return data;
  } catch (err) {
    console.error('calculateOrder error', err);
    alert('Unable to calculate order totals. Make sure the server is running.');
    throw err;
  }
}

// Create a Stripe Checkout session server-side and redirect
async function startCheckout(shippingState) {
  const items = getCart().map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity }));
  try {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, shippingState, success_url: window.location.origin + '/success.html', cancel_url: window.location.origin + '/cart.html' })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Checkout failed');
    }
    const data = await res.json();
    if (data.url) {
      // Clear cart client-side after starting checkout to avoid duplicate purchases
      clearCart();
      window.location.href = data.url;
    } else {
      throw new Error('No session URL returned');
    }
  } catch (err) {
    console.error('startCheckout error', err);
    alert('Unable to start checkout: ' + (err.message || 'unknown error'));
  }
}

// Expose helpers globally for inline handlers in cart.html
window.calculateOrder = calculateOrder;
window.startCheckout = startCheckout;
