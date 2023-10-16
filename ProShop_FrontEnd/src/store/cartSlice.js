import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      itemsPrice: 0,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: 0,
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload.product._id
      );

      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].qty = Number(action.payload.qty);
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload.product, qty: Number(action.payload.qty) },
        ];
      }

      state.itemsPrice = state.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);

      state.shippingPrice = state.itemsPrice > 100 ? 10 : 0;

      state.taxPrice = ((state.itemsPrice * 15) / 100).toFixed(2);

      state.totalPrice = (
        parseFloat(state.itemsPrice) +
        parseFloat(state.taxPrice) +
        parseFloat(state.shippingPrice)
      ).toFixed(2);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeItemFromCart(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item._id == action.payload._id
      );

      if (index >= 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      localStorage.setItem("cart", JSON.stringify(state));
      state.itemsPrice = state.cartItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);

      state.shippingPrice = state.itemsPrice > 100 ? 10 : 0;

      state.taxPrice = ((state.itemsPrice * 15) / 100).toFixed(2);

      state.totalPrice = (
        parseFloat(state.itemsPrice) +
        parseFloat(state.taxPrice) +
        parseFloat(state.shippingPrice)
      ).toFixed(2);
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
