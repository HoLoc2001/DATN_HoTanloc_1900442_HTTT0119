import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const tags = createAsyncThunk("tag/tags", async () => {
  try {
    const res = await axiosPublic.get("tags");

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const popularTags = createAsyncThunk("tag/popularTags", async () => {
  try {
    const res = await axiosPublic.get("tags/popular");

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getArticleByTag = createAsyncThunk(
  "tag/getArticleByTag",
  async ({ tag: _tag, page: _page }, { getState }) => {
    try {
      const tag = getState().tag?._tag || [];
      const res = await axiosPublic.get(
        `tags/${_tag}?limit=10&offset=${_page}`
      );

      const data = [...tag, ...res.data[0].articles];
      return { data, _tag };
    } catch (error) {
      console.log(error);
    }
  }
);

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(tags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(popularTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(getArticleByTag.fulfilled, (state, action) => {
        state[`${action.payload._tag}`] = action.payload.data;
      });
  },
});
