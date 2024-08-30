const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  PId: { type: String },
  category: { type: String },
  subCategory: { type: String }, // Đảm bảo trường này có giá trị
});

module.exports = mongoose.model("Product", productSchema);
