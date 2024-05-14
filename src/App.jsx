import { Route, Routes } from "react-router-dom";
import NavbarComponent from "./Navbar";
import Home from "./Home";
import Shop from "./Shop";
import CartPage from "./Cart";
import { getCartCount } from "./cartLogic";

function App() {
  return (
    <>
      <NavbarComponent cartCount={getCartCount()} />
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
