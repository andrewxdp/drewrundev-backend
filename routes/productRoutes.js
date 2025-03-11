const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/products", productController.getAllProducts);
router.get("/product", productController.getProduct);
router.post("/products/create", productController.createProduct);
router.put("/products/edit", productController.editProduct);
router.delete("/products/delete", productController.deleteProduct);

module.exports = router;
