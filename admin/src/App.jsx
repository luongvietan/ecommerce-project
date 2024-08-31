import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleProductAdded = () => {
    setRefresh((prev) => !prev); // Đảo ngược giá trị để trigger useEffect trong ProductList
  };

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<AddProduct onProductAdded={handleProductAdded} />}
        />
        <Route path="/list" element={<ProductList refresh={refresh} />} />
      </Routes>
    </div>
  );
};

export default App;
