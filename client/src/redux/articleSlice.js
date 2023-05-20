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

      if (page === 0) {
        return [...res.data];
      }
      return [...articles, ...res.data];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getArticleByArticleId = createAsyncThunk(
  "article/getArticleByArticleId",
  async (articleId, { getState }) => {
    try {
      const { isAuthenticated } = getState().auth;
      const res = isAuthenticated
        ? await axiosPrivate.get(`article/auth/${articleId}`)
        : await axiosPublic.get(`article/${articleId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateLike = createAsyncThunk(
  "article/updateLike",
  async (articleId, { getState }) => {
    try {
      const { bookmarks, articles } = getState().article;

      const res = await axiosPrivate.post(`like/${articleId}`);
      const indexBookmark = bookmarks.findIndex(
        (bookmark) => bookmark.id === articleId
      );
      const indexArticle = articles.findIndex(
        (bookmark) => bookmark.id === articleId
      );

      return { ...res.data, indexBookmark, indexArticle, articleId };
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
  async ({ articleId, index = null }, { getState }) => {
    try {
      const { articles } = getState().article;
      const res = await axiosPrivate.post(`bookmark/${articleId}`);
      if (!index) {
        index = articles.findIndex((article) => article.id === articleId);
      }
      return { ...res.data, index, articleId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const removeBookmark = createAsyncThunk(
  "article/removeBookmark",
  async ({ articleId }, { getState }) => {
    try {
      const { bookmarks, articles } = getState().article;
      const res = await axiosPrivate.delete(`bookmark/${articleId}`);

      const indexBookmark = bookmarks.findIndex(
        (bookmark) => bookmark.id === articleId
      );
      const indexArticle = articles.findIndex(
        (bookmark) => bookmark.id === articleId
      );

      return { ...res.data, indexBookmark, indexArticle, articleId };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getComments = createAsyncThunk(
  "article/getComments",
  async ({ articleId }, { getState }) => {
    try {
      const res = await axiosPublic.get(`comment/${articleId}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addComment = createAsyncThunk(
  "article/addComment",
  async ({ articleId, content }, { getState }) => {
    try {
      const { bookmarks, articles } = getState().article;
      const res = await axiosPrivate.post(`comment/${articleId}`, { content });
      const indexBookmark = bookmarks.findIndex(
        (bookmark) => bookmark.id === articleId
      );
      const indexArticle = articles.findIndex(
        (bookmark) => bookmark.id === articleId
      );

      return { data: res.data, indexBookmark, indexArticle };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "article/updateComment",
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
  "article/deleteComment",
  async (articleId) => {
    try {
      const res = await axiosPrivate.delete(`comment/${articleId}`);

      return res.data;
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
    comments: [],
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
        if (state.articles[action.payload.indexArticle]) {
          state.articles[action.payload.indexArticle].isLiked =
            action.payload.isLiked;
          state.articles[action.payload.indexArticle]._count.likes =
            action.payload.likes;
        }
        if (state.bookmarks[action.payload.indexBookmark]) {
          state.bookmarks[action.payload.indexBookmark].isLiked =
            action.payload?.isLiked;
          state.bookmarks[action.payload.indexBookmark]._count.likes =
            action.payload?.likes;
        }
        if (state.article?.id === action.payload.articleId) {
          state.article.isLiked = action.payload?.isLiked;
          state.article._count.likes = action.payload?.likes;
        }
      })
      .addCase(getBookmark.fulfilled, (state, action) => {
        state.bookmarks = action.payload;
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
        if (state.articles[action.payload.index]) {
          state.articles[action.payload.index].isBookmarked = true;
        }
        if (state.article?.id === action.payload.articleId) {
          state.article.isBookmarked = true;
        }
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.bookmarks.splice(action.payload.indexBookmark, 1);
        if (state.articles[action.payload.indexArticle]) {
          state.articles[action.payload.indexArticle].isBookmarked = false;
        }
        if (state.article?.id === action.payload.articleId) {
          state.article.isBookmarked = false;
        }
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload.data);
        state.article._count.comments += 1;
        if (state.articles[action.payload.indexArticle]) {
          state.articles[action.payload.indexArticle]._count.comments += 1;
        }
        if (state.articles[action.payload.indexBookmark]) {
          state.articles[action.payload.indexBookmark]._count.comments += 1;
        }
      })
      .addCase(updateComment.fulfilled, (state, action) => {})
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      });
  },
});
