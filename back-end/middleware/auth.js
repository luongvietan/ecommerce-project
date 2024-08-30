const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Lấy token từ header
  const token = req.header("x-auth-token");

  // Kiểm tra xem có token không
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Không có token, quyền truy cập bị từ chối" });
  }

  try {
    // Xác thực token
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token không hợp lệ" });
  }
};
