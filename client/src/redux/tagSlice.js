import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getTags = createAsyncThunk("tag/tags", async () => {
  try {
    const res = await axiosPublic.get("tags");

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getMyTags = createAsyncThunk("tag/getMyTags", async () => {
  try {
    const res = await axiosPrivate.get("tags/myTags");

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
      const res = await axiosPublic.get(`tags/${_tag}?limit=6&offset=${_page}`);

      const data = [...tag, ...res.data[0].articles];
      return { data, _tag };
    } catch (error) {
      console.log(error);
    }
  }
);

export const addMyTag = createAsyncThunk(
  "tag/addMyTag",
  async ({ tag, index }, { getState }) => {
    try {
      // const tag = getState().tag;
      const res = await axiosPrivate.post(`tags/myTag/add/${tag}`);

      // const data = [...tag, ...res.data[0].articles];
      return { tag, index };
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeMyTag = createAsyncThunk(
  "tag/removeMyTag",
  async ({ tag, index }, { getState }) => {
    try {
      // const tag = getState().tag;
      const res = await axiosPrivate.post(`tags/myTag/remove/${tag}`);

      return { tag, index };
    } catch (error) {
      console.log(error);
    }
  }
);

export const tagSlice = createSlice({
  name: "tag",
  initialState: {
    tags: [],
    popularTags: [],
    myTags: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.fulfilled, (state, action) => {
        state.tags = action.payload;
      })
      .addCase(getMyTags.fulfilled, (state, action) => {
        state.myTags = action.payload;
      })
      .addCase(popularTags.fulfilled, (state, action) => {
        state.popularTags = action.payload;
      })
      .addCase(getArticleByTag.fulfilled, (state, action) => {
        state[`${action.payload._tag}`] = action.payload.data;
      })
      .addCase(addMyTag.fulfilled, (state, action) => {
        state.myTags[action.payload.index].isFollowed = true;
      })
      .addCase(removeMyTag.fulfilled, (state, action) => {
        state.myTags[action.payload.index].isFollowed = false;
      });
  },
});
