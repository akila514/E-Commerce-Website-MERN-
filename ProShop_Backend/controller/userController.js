import asyncHandler from "../middleware/asyncHandler.js";

//@desc     Auth users
//@route    POST /api/users/login
//@access   Public
export const authUser = asyncHandler(async (req, res, next) => {
  res.send("auth user");
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
