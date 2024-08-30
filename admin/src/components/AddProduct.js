import React, { useState } from "react";
import api from "../api";

const AddProduct = ({ onProductAdded }) => {
  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProduct = {
      pid: pid,
      name: name,
      price: price,
      description: description,
      category: category,
      subCategory: subCategory,
    };
    const response = await api.post("/products", newProduct);
    setPid("");
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setSubCategory("");
    onProductAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Product ID"
        value={pid}
        onChange={(e) => setPid(e.target.value)}
        required
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Product Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="number"
        placeholder="Product Price"
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
        Add Product
      </button>
    </form>
  );
};

export default AddProduct;
