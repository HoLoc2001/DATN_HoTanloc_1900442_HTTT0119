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

export const getUserByUserId = createAsyncThunk(
  "user/getUserByUserId",
  async ({ userId }) => {
    try {
      const res = await axiosPublic.get(`user/${userId}`);
      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const follow = createAsyncThunk("user/follow", async ({ userId }) => {
  try {
    const res = await axiosPrivate.post(`user/follow/${userId}`);
    return res.data;
  } catch (error) {
    return error;
  }
});

export const getHasFollow = createAsyncThunk(
  "user/getHasFollow",
  async ({ userId }) => {
    try {
      const res = await axiosPrivate.get(`user/follow/${userId}`);

      return res.data;
    } catch (error) {
      return error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    otherUser: {},
    authorPost: {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserByUserId.fulfilled, (state, action) => {
        state.otherUser = action.payload;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.authorPost = { ...action.payload };
      })
      .addCase(getHasFollow.fulfilled, (state, action) => {
        state.authorPost = { ...action.payload };
      });
  },
});
