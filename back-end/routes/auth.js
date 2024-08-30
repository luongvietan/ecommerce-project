const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Route đăng ký
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra xem người dùng đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Người dùng đã tồn tại" });
    }

    // Tạo người dùng mới
    user = new User({ username, email, password });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Lưu người dùng vào database
    await user.save();

    // Tạo JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Route đăng nhập
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại không
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Thông tin đăng nhập không hợp lệ" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Thông tin đăng nhập không hợp lệ" });
    }

    // Tạo JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(payload, "your_jwt_secret", { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;
