const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Lấy danh sách người dùng
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users); // Sử dụng return để ngăn chặn việc gửi phản hồi nhiều lần
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Đảm bảo chỉ gửi phản hồi một lần
  }
});

// Xóa user theo ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findOneAndDelete({ id: id });
    const users = await User.find(); // Lấy lại danh sách user
    res.json(users); // Trả về danh sách user mới
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

// Thêm user mới
router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    const users = await User.find(); // Lấy lại danh sách sản phẩm
    res.status(201).json(users); // Trả về danh sách sản phẩm mới
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

console.log("user");

module.exports = router;
