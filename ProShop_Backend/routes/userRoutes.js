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

const userRouter = express.Router();

userRouter.route("/").post(registerUser).get(getUsers);
userRouter.post("/logout", logoutUser);
userRouter.post("/login", authUser);
userRouter.route("/profile").get(getUserProfile).put(updateUserProfile);
userRouter.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

export default userRouter;
