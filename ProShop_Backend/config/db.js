import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongo connected".green.inverse);
  } catch (error) {
    console.log("Mongo not connected".red);

    process.exit(1);
  }
};

export default connectDB;
