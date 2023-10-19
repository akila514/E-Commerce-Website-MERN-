import express from "express";
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controller/userController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/").post(registerUser).get(protect, admin, getUsers);
userRouter.post("/logout", protect, logoutUser);
userRouter.post("/auth", authUser);
userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
userRouter
  .route("/:id")
  .get(protect, admin, getUserById)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default userRouter;
