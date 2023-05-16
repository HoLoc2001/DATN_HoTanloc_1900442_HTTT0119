import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getBookmark = createAsyncThunk(
  "bookmark/getBookmark",
  async ({ page }, { getState }) => {
    try {
      const { bookmarks } = getState().bookmark;
      const res = await axiosPrivate.get(`bookmark?limit=10&offset=${page}`);

      const data = [...bookmarks, ...res.data];
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "bookmark/addBookmark",
  async (articleId) => {
    try {
      const res = await axiosPrivate.post(`bookmark/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "bookmark/removeBookmark",
  async (articleId) => {
    try {
      const res = await axiosPrivate.delete(`bookmark/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarks: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBookmark.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      });
  },
});
