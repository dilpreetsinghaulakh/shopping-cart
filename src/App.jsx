import NavbarComponent from "./Navbar";
import { useState } from "react";

function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <>
      <NavbarComponent cartCount={cartCount} />
    </>
  );
}

export default App;
