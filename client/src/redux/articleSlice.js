import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getArticles = createAsyncThunk("article/getArticles", async () => {
  try {
    const res = await axiosPublic.get("article?limit=10&offset=30");
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const getArticleByArticleId = createAsyncThunk(
  "article/getArticleByArticleId",
  async (articleId) => {
    try {
      const res = await axiosPublic.get(`article/${articleId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: null,
    article: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(getArticleByArticleId.fulfilled, (state, action) => {
        state.article = action.payload;
      });
  },
});
