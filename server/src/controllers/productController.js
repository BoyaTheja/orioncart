const Product = require("../models/Product");

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: "Product not found",
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let query = {};

    if (category) {
      query.category = category;
    }

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    const products = await Product.find(query);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
