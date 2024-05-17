import { Route, Routes } from "react-router-dom";
import NavbarComponent from "./Navbar";
import Home from "./Home";
import Shop from "./Shop";
import CartPage from "./Cart";
import { createContext, useEffect, useState } from "react";
import getCart, { addToCart, removeFromCart, updateCart } from "./cartLogic";

export const CartContext = createContext({
  cartCount: 0,
  adjustCount: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateCart: () => {},
  getCart: () => {},
});

function App() {
  const [cartCount, setCartCount] = useState(0);

  function getCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let count = 0;

    for (const key in cart) {
      count += cart[key];
    }
    useEffect(() => {
      setCartCount(count);
    }, [cart]);

    return cartCount;
  }


  const changeCartCount = (count) =>{
    setCartCount(count);
  }

  return (
    <>
      <NavbarComponent cartCount={getCartCount()} />
      <CartContext.Provider
        value={{
          cartCount: cartCount,
          adjustCount: changeCartCount,
          addToCart: addToCart,
          removeFromCart: removeFromCart,
          updateCart: updateCart,
          getCart: getCart,
        }}
      >
        <Routes>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
