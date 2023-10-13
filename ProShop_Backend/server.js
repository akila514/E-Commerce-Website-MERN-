import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.send("API is runnning");
});

app.get("/api/products", (req, res, next) => {
  res.json(products);
  console.log(products);
});

app.get("/api/products/:id", (req, res, next) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.listen(port);
