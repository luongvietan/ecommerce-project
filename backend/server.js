const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("statics")); // Thêm dòng này để truy cập thư mục tĩnh

mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Welcome to the e-commerce API");
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
const productRoutes = require("./routes/product");

app.use("/products", productRoutes); // Kết nối route sản phẩm
