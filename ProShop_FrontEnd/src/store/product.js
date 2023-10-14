import { createSlice } from "@reduxjs/toolkit";

const productInitialState = {};

const productSlice = createSlice({
  name: "product",
  initialState: productInitialState,
  reducers: {},
});

export const productReducer = productSlice.reducer;
export const productActoins = productSlice.actions;
