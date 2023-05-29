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

export const updateInfoUser = createAsyncThunk(
  "user/updateInfoUser",
  async (data) => {
    try {
      const res = await axiosPrivate.patch(`user/edit`, data);
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

export const userSearch = createAsyncThunk(
  "user/userSearch",
  async ({ query }) => {
    try {
      const res = await axiosPublic.get(`search/user?q=${query}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    otherUser: {},
    authorPost: {},
    userSearch: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUserByUserId.fulfilled, (state, action) => {
        state.otherUser = action.payload;
      })
      .addCase(updateInfoUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(follow.fulfilled, (state, action) => {
        state.authorPost = { ...action.payload };
      })
      .addCase(getHasFollow.fulfilled, (state, action) => {
        state.authorPost = { ...action.payload };
      })
      .addCase(userSearch.fulfilled, (state, action) => {
        state.userSearch = action.payload;
      });
  },
});
