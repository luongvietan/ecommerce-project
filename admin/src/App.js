import React, { useState } from "react";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleProductAdded = () => {
    setRefresh((prev) => !prev); // Đảo ngược giá trị để trigger useEffect trong ProductList
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Quản lý sản phẩm</h1>
      <AddProduct onProductAdded={handleProductAdded} />
      <ProductList refresh={refresh} />
    </div>
  );
};

export default App;
