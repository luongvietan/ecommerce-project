import React, { useEffect, useState } from "react";
import api from "../api";

const ProductList = ({ refresh }) => {
  const [products, setProducts] = useState([]);

  const removeProduct = async (pid) => {
    await api.delete(`/products/${pid}`); // Gọi API để xóa sản phẩm
    setProducts(products.filter((product) => product.pid !== pid)); // Cập nhật danh sách sản phẩm
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get("/products"); // Gọi API để lấy danh sách sản phẩm
      setProducts(response.data);
    };
    fetchProducts();
  }, [refresh]);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">PID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">SubCategory</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              key={product.pid}
            >
              <td className="px-6 py-4">{product.pid}</td>
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">${product.price}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.subCategory}</td>
              <td className="px-6 py-4">
                <img
                  src={`http://localhost:5000/assets/${product.image[0]}.png`}
                  alt={product.name}
                  style={{ width: "70px", height: "auto" }}
                />
              </td>
              <td className="px-6 py-4">
                <button
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={() => removeProduct(product.pid)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
