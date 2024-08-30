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
  }, [refresh]); // Thêm refresh vào dependency array
  // console.log(`products : ${JSON.stringify(products[0].image[0], null, 2)}`);
  // console.log(`products : ${JSON.stringify(products, null, 2)}`);
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Product List</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">PID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Price</th>
            <th className="border border-gray-300 p-2">Category</th>
            <th className="border border-gray-300 p-2">SubCategory</th>
            <th className="border border-gray-300 p-2">Image</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pid}>
              <td className="border border-gray-300 p-2">{product.pid}</td>
              <td className="border border-gray-300 p-2">{product.name}</td>
              <td className="border border-gray-300 p-2">${product.price}</td>
              <td className="border border-gray-300 p-2">{product.category}</td>
              <td className="border border-gray-300 p-2">
                {product.subCategory}
              </td>
              <td className="border border-gray-300 p-2">
                <img
                  src={`http://localhost:5000/assets/${product.image[0]}.png`}
                  alt={product.name}
                  style={{ width: "70px", height: "auto" }}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => removeProduct(product.pid)}
                  className="text-red-500"
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
