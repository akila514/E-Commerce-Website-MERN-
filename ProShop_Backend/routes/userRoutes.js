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

userRouter.route("/").post(registerUser).get(admin, protect, getUsers);
userRouter.post("/logout", protect, logoutUser);
userRouter.post("/login", authUser);
userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
userRouter
  .route("/:id")
  .get(admin, protect, getUserById)
  .delete(admin, protect, deleteUser)
  .put(admin, protect, updateUser);

export default userRouter;
