import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  res.send("API is runnning");
});

app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port);
