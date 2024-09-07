const express = require("express");
const authenticateToken = require("../middleware/auth");
const Product = require("../models/Product");

const router = express.Router();

router.get("/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Định nghĩa các route cho sản phẩm
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products); // Gửi phản hồi ở đây
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params; // Lấy PID từ tham số
  try {
    await Product.findOneAndDelete({ pid: pid });
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

module.exports = router;
