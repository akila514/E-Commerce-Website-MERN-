import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

//@desc     Fetch all products
//@route    Get /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc     Fetch product details
//@route    Get /api/products/:id
//@access   Public
const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resourse not found.");
  }
});

export { getProducts, getProductById };
