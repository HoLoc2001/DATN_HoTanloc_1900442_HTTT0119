import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getLikes = createAsyncThunk(
  "like/getLikes",
  async ({}, { getState }) => {
    try {
      const res = await axiosPrivate.get(`like`);

      const data = [...bookmarks, ...res.data];
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateLike = createAsyncThunk(
  "like/updateLike",
  async (articleId) => {
    try {
      const res = await axiosPrivate.post(`like/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeLike = createAsyncThunk(
  "like/removeLike",
  async (articleId) => {
    try {
      const res = await axiosPrivate.delete(`like/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const likeSlice = createSlice({
  name: "like",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikes.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      })
      .addCase(updateLike.fulfilled, (state, action) => {})
      .addCase(removeLike.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      });
  },
});
