import express from "express";
import products from "../data/products.js";
const productRouter = express.Router();

productRouter.get("/", (req, res, next) => {
  res.json(products);
  console.log(products);
});

productRouter.get("/:id", (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

export default productRouter;
