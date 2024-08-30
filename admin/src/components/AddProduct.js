import React, { useState } from "react";
import api from "../api";

const AddProduct = ({ onProductAdded }) => {
  const [PId, setPId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = { name, price, description };
    await api.post("/products", newProduct); // Gọi API để thêm sản phẩm
    setPId("");
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setSubCategory("");
    onProductAdded(); // Gọi hàm để cập nhật danh sách sản phẩm
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Thêm sản phẩm mới</h2>
      <input
        type="text"
        placeholder="ID"
        value={PId}
        onChange={(e) => setPId(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Tên sản phẩm"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Mô tả sản phẩm"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
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
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="subCategory"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
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
