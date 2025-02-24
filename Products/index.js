const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;
const mongoURI =
  "mongodb://andrewxdp:andrewxdp993@localhost:27017/test?authSource=admin";
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

app.get("/products", async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    console.log("error", error);

    res.status(400).json({
      massage: error.massage,
    });
  }
});
app.get("/product", async (req, res) => {
  try {
    const productId = req.query.id;
    console.log(productId);
    const product = await Products.findById(productId);
    console.log(product);
    res.json(product);
  } catch (error) {
    console.log("error", error);

    res.status(400).json({
      massage: error.massage,
    });
  }
});
app.post("/products/create", async (req, res) => {
  try {
    const {
      productName,
      productImageAddress,
      description,
      price,
      status,
      rating,
    } = req.body;
    const product = new Products({
      productName,
      productImageAddress,
      description,
      price,
      status,
      rating,
    });
    await product.save();
    res.json({
      product,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      massage: error.massage,
    });
  }
});
app.put("/products/edit", async (req, res) => {
  try {
    const productId = req.query.id;

    const {
      productName,
      productImageAddress,
      description,
      price,
      status,
      rating,
    } = req.body;
    const product = await Products.updateOne(
      { _id: productId },
      {
        $set: {
          productName,
          productImageAddress,
          description,
          price,
          status,
          rating,
        },
      }
    );
    res.json({
      message: `successfully`,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      massage: error.massage,
    });
  }
});

app.delete("/products/delete", async (req, res) => {
  try {
    const productId = req.query.id;
    const product = await Products.deleteOne({ _id: productId });
    res.json({ message: `delete success` });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      massage: error.massage,
    });
  }
});

app.listen(PORT, async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log(`Sever is running on port ${PORT}`);
  } catch (error) {
    console.log("Server fail", error);
  }
});
