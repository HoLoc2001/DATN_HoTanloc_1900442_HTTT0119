import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getFollowers = createAsyncThunk(
  "follow/getFollowers",
  async () => {
    try {
      const res = await axiosPrivate.get(`user/followers`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getFollowings = createAsyncThunk(
  "follow/getFollowings",
  async () => {
    try {
      const res = await axiosPrivate.get(`user/followings`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const followSlice = createSlice({
  name: "follow",
  initialState: {
    followers: [],
    followings: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFollowers.fulfilled, (state, action) => {
        state.followers = action.payload;
      })
      .addCase(getFollowings.fulfilled, (state, action) => {
        state.followings = action.payload;
      });
  },
});
