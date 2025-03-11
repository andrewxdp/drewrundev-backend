const mongoose = require("mongoose");
const Products = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    res.json(products);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      massage: error.massage,
    });
  }
};
const getProduct = async (req, res) => {
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
};
const createProduct = async (req, res) => {
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
};
const editProduct = async (req, res) => {
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
};
const deleteProduct = async (req, res) => {
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
};
module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
};
