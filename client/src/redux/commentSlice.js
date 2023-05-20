import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getComments = createAsyncThunk(
  "comment/getComments",
  async ({ articleId }, { getState }) => {
    try {
      const res = await axiosPublic.get(`comment/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comment/updateComment",
  async (articleId) => {
    try {
      const res = await axiosPrivate.post(`comment/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (articleId) => {
    try {
      const res = await axiosPrivate.delete(`comment/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(updateComment.fulfilled, (state, action) => {})
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      });
  },
});
