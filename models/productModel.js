const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productImageAddress: String,
  description: String,
  price: Number,
  status: String,
  rating: Number,
});

const Products = mongoose.model("Product", productSchema);

module.exports = Products;
