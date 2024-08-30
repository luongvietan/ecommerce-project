import React, { useEffect, useState } from "react";
import api from "../api";

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products"); // Gọi API để lấy danh sách sản phẩm
      setProducts(response.data);
    };
    fetchProducts();
  }, [refresh]); // Thêm refresh vào dependency array

  console.log(products);
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Danh sách sản phẩm</h2>
      <ul className="border rounded shadow-md">
        {products.map((product) => (
          <li
            key={product.pid}
            className="p-4 border-b last:border-b-0 flex justify-between items-center"
          >
            <span>
              {product.pid} - {product.name} - ${product.price} -{" "}
              {product.category} - {product.subCategory}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
