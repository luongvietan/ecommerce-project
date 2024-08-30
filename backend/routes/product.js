const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Lấy danh sách sản phẩm
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
// Thêm sản phẩm mới
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  const products = await Product.find(); // Lấy lại danh sách sản phẩm
  res.status(201).json(products); // Trả về danh sách sản phẩm mới
});

module.exports = router;
