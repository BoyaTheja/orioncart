const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductsById,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductsById);

module.exports = router;
