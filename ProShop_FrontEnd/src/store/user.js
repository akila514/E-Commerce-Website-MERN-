import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
