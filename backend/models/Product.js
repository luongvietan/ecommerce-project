const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: Array, required: true },
  sizes: { type: Array, required: true },
  pid: { type: String, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
});

module.exports = mongoose.model("Product", productSchema);
