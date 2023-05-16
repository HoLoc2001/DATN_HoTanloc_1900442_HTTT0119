import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const res = await axiosPrivate.get("user/profile");
    return res.data;
  } catch (error) {
    return error;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});
