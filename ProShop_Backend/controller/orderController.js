import asyncHandler from "../middleware/asyncHandler.js";
import { Order } from "../models/orderModel.js";

const addOrderItems = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (cartItems && cartItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
  }
});

const getMyOrders = asyncHandler(async (req, res, next) => {
  res.send("get order items");
});

const getOrderById = asyncHandler(async (req, res, next) => {
  res.send("get order by id");
});

const updateOrderToPaid = asyncHandler(async (req, res, next) => {
  res.send("Update order to paid");
});

const updatOrderToDeliverd = asyncHandler(async (req, res, next) => {
  res.send("Update order to deliverd");
});

const getAllOrders = asyncHandler(async (req, res, next) => {
  res.send("get all order items");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updatOrderToDeliverd,
  getAllOrders,
};
