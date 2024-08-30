import React, { useEffect, useState } from "react";
import api from "../api";

const ProductList = ({}) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products"); // Gọi API để lấy danh sách sản phẩm
      setProducts(response.data);
    };
    fetchProducts();
  }, []); // Chỉ gọi một lần khi component được mount

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Danh sách sản phẩm</h2>
      <ul className="border rounded shadow-md">
        {products.map((product) => (
          <li key={product._id} className="p-4 border-b last:border-b-0">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
