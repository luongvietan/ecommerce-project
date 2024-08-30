const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User");

// Route lấy thông tin người dùng hiện tại
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Route cập nhật thông tin người dùng
router.put("/update", auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

// Route đổi mật khẩu
router.put("/change-password", auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    // Kiểm tra mật khẩu hiện tại
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Mật khẩu hiện tại không đúng" });
    }

    // Mã hóa mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ msg: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;
