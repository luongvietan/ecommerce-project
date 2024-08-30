import React, { useState } from "react";
import api from "../api";

const AddProduct = ({ onProductAdded }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, price, description };
    await api.post("/products", newProduct); // Gọi API để thêm sản phẩm
    setName("");
    setPrice("");
    setDescription("");
    onProductAdded(); // Gọi hàm để cập nhật danh sách sản phẩm
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Thêm sản phẩm mới</h2>
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Giá sản phẩm"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Mô tả sản phẩm"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Thêm sản phẩm
      </button>
    </form>
  );
};

export default AddProduct;
