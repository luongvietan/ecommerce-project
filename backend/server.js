const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp"); // Thêm thư viện sharp để xử lý ảnh
const loginRoute = require("./api/login");
const protectedRoute = require("./api/protectedRoute"); // Đảm bảo rằng đường dẫn và tên file chính xác
const productRoutes = require("./api/productRoutes"); // Thêm dòng này để import productRoutes
const userRoutes = require("./api/userRoutes"); // Giả sử bạn cũng có userRoutes
const app = express();
app.use(cors()); // Đảm bảo rằng CORS được cấu hình đúng
app.use(express.json());
app.use(express.static("statics"));
app.use("/api", loginRoute);
app.use("/api", protectedRoute);
app.use("/products", productRoutes); // Sử dụng productRoutes
app.use("/users", userRoutes); // Sử dụng userRoutes
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const storage = multer.memoryStorage(); // Sử dụng bộ nhớ tạm để lưu trữ file ảnh

const upload = multer({ storage });

app.post("/upload", upload.single("file"), async (req, res) => {
  const filename = `${path.parse(req.file.originalname).name}.png`; // Đổi tên file thành .png
  const filePath = `statics/assets/${filename}`;

  try {
    await sharp(req.file.buffer).png().toFile(filePath); // Chuyển đổi và lưu file ảnh thành .png
    res.json({ filePath });
    console.log(filename);
  } catch (err) {
    res.status(500).json({ error: "Error processing image" });
    console.error("Error processing image:", err);
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the e-commerce API");
});

const PORT = process.env.PORT || 5000; // Thay đổi cổng từ 5000 sang 5001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
