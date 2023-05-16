import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async (page, { getState }) => {
    try {
      const { articles } = getState().article;
      const { isAuthenticated } = getState().auth;
      const res = isAuthenticated
        ? await axiosPrivate.get(`article/auth?limit=6&offset=${page}`)
        : await axiosPublic.get(`article?limit=6&offset=${page}`);
      const data = [...articles, ...res.data];
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

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

export const updateLike = createAsyncThunk(
  "article/updateLike",
  async (articleId) => {
    try {
      const res = await axiosPrivate.post(`like/${articleId}`);

      return { ...res.data, articleId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getBookmark = createAsyncThunk(
  "article/getBookmark",
  async ({ page }, { getState }) => {
    try {
      const { bookmarks } = getState().article;
      const res = await axiosPrivate.get(`bookmark?limit=6&offset=${page}`);

      const data = [...bookmarks, ...res.data];
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "article/addBookmark",
  async ({ articleId, index }) => {
    try {
      const res = await axiosPrivate.post(`bookmark/${articleId}`);

      return { ...res.data, index };
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "article/removeBookmark",
  async ({ articleId, article }, { getState }) => {
    try {
      const { bookmarks, articles } = getState().article;
      const res = await axiosPrivate.delete(`bookmark/${articleId}`);

      const indexBookmark = bookmarks.findIndex(
        (bookmark) => bookmark.id === articleId
      );
      const indexArticle = articles.findIndex(
        (bookmark) => bookmark.id === articleId
      );

      return { ...res.data, indexBookmark, indexArticle };
    } catch (error) {
      console.log(error);
    }
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    bookmarks: [],
    article: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(getArticleByArticleId.fulfilled, (state, action) => {
        state.article = action.payload;
      })
      .addCase(updateLike.fulfilled, (state, action) => {
        state.articles.find((element) => {
          if (element.id === action.payload.articleId) {
            element.isLiked = action.payload.isLiked;
            element._count.likes = action.payload.likes;
            return true;
          }
          return false;
        });
      })
      .addCase(getBookmark.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
        state.articles[action.payload.index].isBookmarked = true;
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.bookmarks.splice(action.payload.indexBookmark, 1);
        state.articles[action.payload.indexArticle].isBookmarked = false;
      });
  },
});
