import { createSlice } from "@reduxjs/toolkit";

const orderInitialState = {};

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {},
});

export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
