import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("API is runnning");
});

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port);
