import { useEffect, useState } from "react";

export function createCart() {
  localStorage.setItem("cart", JSON.stringify({}));
}

export function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const [cartCount, setCartCount] = useState(0);
  let count = 0;

  for (const key in cart) {
    count += cart[key];
  }
  useEffect(() => {
    setCartCount(count);
  }, [cart]);

  return cartCount;
}

export function addToCart(productId, count) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart[productId]) {
    cart[productId] += count;
  } else {
    cart[productId] = count;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  getCartCount();
}

export function updateCart(productId, count) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  cart[productId] = count;
  localStorage.setItem("cart", JSON.stringify(cart));
  getCartCount();
}

export function removeFromCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart"));
  delete cart[productId];
  localStorage.setItem("cart", JSON.stringify(cart));
  getCartCount();
}

export default function getCart() {
  if (!JSON.parse(localStorage.getItem("cart"))) createCart();

  return JSON.parse(localStorage.getItem("cart"));
}
