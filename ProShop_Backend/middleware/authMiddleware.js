import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRETE);
      req.user = await User.findById(decoded.userId).select("-password");

      console.log(req.user);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized. Token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized. No token.");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    // console.log(req.user);
    res.status(404);
    throw new Error("Not authorized as admin.");
  }
};

export { protect, admin };
