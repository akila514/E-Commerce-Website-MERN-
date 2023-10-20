import express from "express";
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updatOrderToDeliverd,
  getAllOrders,
} from "../controller/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const orderRouter = express.Router();

orderRouter
  .route("/")
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);
orderRouter.route("/mine").get(protect, getMyOrders);
orderRouter.route("/:id").get(protect, admin, getOrderById);
orderRouter.route("/:id/pay").put(protect, updateOrderToPaid);
orderRouter.route("/:id/deliver").put(protect, admin, updatOrderToDeliverd);

export default orderRouter;
