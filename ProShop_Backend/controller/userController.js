import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import generateToken from "../util/genarateToken.js";
import bycrypt from "bcryptjs";

//@desc     Auth users
//@route    POST /api/users/login
//@access   Public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateToken(res, user._id);

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
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: false,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Something went wrong. Please try again later");
  }
});

//@desc     Logout users
//@route    POST /api/users/logout
//@access   Private
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out." });
});

//@desc     Get user profile
//@route    GET /api/users/profile
//@access   Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
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
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bycrypt.genSalt(10);
      user.password = await bycrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    password = res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      password: updatedUser.password,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
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
