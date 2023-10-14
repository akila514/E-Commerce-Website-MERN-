import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import connectDb from "./config/db.js";
import { Order } from "./models/orderModel.js";
import Product from "./models/productModel.js";
import User from "./models/userModel.js";
import users from "./data/users.js";
import products from "./data/products.js";

dotenv.config();

connectDb();

const importData = async () => {
  try {
    await mongoose.model("Order").deleteMany();
    await mongoose.model("Product").deleteMany();
    await mongoose.model("User").deleteMany();

    const createdUsers = await mongoose.model("User").insertMany(users);
    const adminUser = createdUsers.find((user) => user.isAdmin);
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await mongoose.model("Product").insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (err) {
    console.log("Data not Imported".red.inverse);
    console.log(err.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await mongoose.model("Order").deleteMany();
    await mongoose.model("Product").deleteMany();
    await mongoose.model("User").deleteMany();

    console.log("Data Deleted".green.inverse);
    process.exit();
  } catch (err) {
    console.log("Data not Deleted".red.inverse);
    console.log(err.message);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
