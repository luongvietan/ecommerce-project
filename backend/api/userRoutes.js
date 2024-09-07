const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users); // Sử dụng return để ngăn chặn việc gửi phản hồi nhiều lần
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Đảm bảo chỉ gửi phản hồi một lần
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const users = await User.findById(id);
    return res.json(users); // Sử dụng return để ngăn chặn việc gửi phản hồi nhiều lần
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Đảm bảo chỉ gửi phản hồi một lần
  }
});

// Lấy người dùng bằng email
router.get("/email/:email", async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const user = await User.findOne({ email: email });
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message }); // Đảm bảo chỉ gửi phản hồi một lần
  }
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint đăng nhập
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Nếu đăng nhập thành công, bạn có thể trả về thông tin người dùng hoặc token
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
