import { Route, Routes } from "react-router-dom";
import NavbarComponent from "./Navbar";
import { useState } from "react";
import Home from "./Home";
import Shop from "./Shop";
import CartPage from "./Cart";

function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <>
      <NavbarComponent cartCount={cartCount} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
