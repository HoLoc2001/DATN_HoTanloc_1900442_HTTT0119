import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const addImage = createAsyncThunk("cloud/addImage", async (file) => {
  try {
    console.log(file);
    const res = await axiosPublic.post(`image/upload`, file);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const cloudSlice = createSlice({
  name: "cloud",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(addImage.fulfilled, (state, action) => {
      state.image = action.payload;
    });
  },
});
