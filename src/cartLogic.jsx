function createCart() {
  localStorage.setItem("cart", JSON.stringify({}));
}

export function addToCart(productId, count) {
  console.log(productId, count);
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart[productId]) {
    cart[productId] += count;
  } else {
    cart[productId] = count;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

export function updateCart(productId, count) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart[productId] = count;
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  delete cart[productId];
  localStorage.setItem("cart", JSON.stringify(cart));
}

export default function getCart() {
  if (!JSON.parse(localStorage.getItem("cart"))) createCart();

  return JSON.parse(localStorage.getItem("cart"));
}
