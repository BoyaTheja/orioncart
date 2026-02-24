const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductsById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:id", getProductsById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
