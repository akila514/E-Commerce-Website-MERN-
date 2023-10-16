import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

//@desc     Auth users
//@route    POST /api/users/login
//@access   Public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE, {
      expiresIn: "30d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("Email or password is invalid.");
  }
});

//@desc     Register users
//@route    POST /api/users/
//@access   Public
export const registerUser = asyncHandler(async (req, res, next) => {
  res.send("register user");
});

//@desc     Logout users
//@route    POST /api/users/logout
//@access   Private
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.send("logout user");
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  res.send("get user profile");
});

//@desc     Get user by ID
//@route    GET /api/users/:id
//@access   Private
export const getUserById = asyncHandler(async (req, res, next) => {
  res.send("get user by id");
});

//@desc     Update user profile
//@route    PUT /api/users/profile
//@access   Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  res.send("update user profile");
});

//@desc     Get all users
//@route    GET /api/users
//@access   Private/Admin
export const getUsers = asyncHandler(async (req, res, next) => {
  res.send("get users");
});

//@desc     Delete user
//@route    DELETE /api/users
//@access   Private/Admin
export const deleteUser = asyncHandler(async (req, res, next) => {
  res.send("delete user");
});

//@desc     Update user
//@route    PUT /api/users/:id
//@access   Private/Admin
export const updateUser = asyncHandler(async (req, res, next) => {
  res.send("update user");
});
