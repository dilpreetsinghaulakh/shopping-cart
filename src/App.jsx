import { Route, Routes } from "react-router-dom";
import NavbarComponent from "./Navbar";
import { useState } from "react";
import Home from "./Home";

function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <>
      <NavbarComponent cartCount={cartCount} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
