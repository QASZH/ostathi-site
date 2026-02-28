import { getProductById } from './data.js';
import { getCurrentUser } from './auth.js';

const CART_KEY = 'store_cart';

// Get cart items
export function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

// Save cart items
export function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add item to cart
export function addToCart(productId) {
  const user = getCurrentUser();
  if (!user) {
    alert('يرجى تسجيل الدخول أولاً لإضافة منتجات إلى السلة.');
    window.location.href = 'login.html';
    return;
  }

  const cart = getCart();
  const existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  saveCart(cart);
  updateCartCountUI();
  alert('تمت إضافة المنتج إلى السلة بنجاح.');
}

// Remove item from cart
export function removeFromCart(productId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.productId !== productId);
  saveCart(updatedCart);
  updateCartCountUI();
}

// Update item quantity
export function updateQuantity(productId, quantity) {
  if (quantity < 1) return removeFromCart(productId);

  const cart = getCart();
  const item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
    updateCartCountUI();
  }
}

// Clear cart (after checkout)
export function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCountUI();
}

// Calculate total price
export function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

// Update Cart Count Badge in UI
export function updateCartCountUI() {
  const cartCountEl = document.getElementById('cart-count');
  if (!cartCountEl) return;

  const cart = getCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCountEl.textContent = totalItems;
}
