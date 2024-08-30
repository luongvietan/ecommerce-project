const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Xóa sản phẩm theo PID
router.delete("/:pid", async (req, res) => {
  const { pid } = req.params; // Lấy PID từ tham số
  console.log("PID received:", pid); // Thêm log để kiểm tra PID
  try {
    await Product.findOneAndDelete({ pid: pid }); // Sử dụng trường pid thay vì _id
    const products = await Product.find(); // Lấy lại danh sách sản phẩm
    res.json(products); // Trả về danh sách sản phẩm mới
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Thêm sản phẩm mới
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    const products = await Product.find(); // Lấy lại danh sách sản phẩm
    res.status(201).json(products); // Trả về danh sách sản phẩm mới
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

console.log("product");

module.exports = router;
