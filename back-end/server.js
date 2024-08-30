const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

// Cấu hình middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kết nối với MongoDB
mongoose
  .connect("mongodb://localhost:27017/your_database_name", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Đã kết nối thành công với MongoDB"))
  .catch((error) => console.error("Lỗi kết nối MongoDB:", error));

// Phục vụ các file tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, "public")));

// Route mặc định sẽ phục vụ index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Các route API
app.get("/api/products", (req, res) => {
  // Xử lý lấy danh sách sản phẩm
  res.json({ message: "Danh sách sản phẩm" });
});

app.post("/api/orders", (req, res) => {
  // Xử lý tạo đơn hàng mới
  res.json({ message: "Đơn hàng đã được tạo" });
});

// Xử lý lỗi 404
app.use((req, res, next) => {
  res.status(404).send("Không tìm thấy trang");
});

// Xử lý lỗi server
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Đã xảy ra lỗi server");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
