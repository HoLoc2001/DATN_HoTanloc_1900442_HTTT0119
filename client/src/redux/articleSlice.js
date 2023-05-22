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

export const getMyArticles = createAsyncThunk(
  "article/getMyArticle",
  async ({ page }, { getState }) => {
    try {
      const { myArticles } = getState().article;
      const res = await axiosPrivate.get(
        `article/MyUser?limit=6&offset=${page}`
      );
      if (page === 0) {
        return [...res.data];
      }
      return [...myArticles, ...res.data];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getArticleByUserId = createAsyncThunk(
  "article/getArticleByUserId",
  async ({ userId, page }, { getState }) => {
    try {
      const { isAuthenticated } = getState().auth;
      const { userArticles } = getState().article;

      const res = isAuthenticated
        ? await axiosPrivate.get(
            `article/auth/user/${userId}?limit=6&offset=${page}`
          )
        : await axiosPublic.get(
            `article/user/${userId}?limit=6&offset=${page}`
          );

      if (page === 0) {
        return [...res.data];
      }
      return [...userArticles, ...res.data];
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateLike = createAsyncThunk(
  "article/updateLike",
  async (articleId, { getState }) => {
    try {
      const { bookmarks, articles, userArticles, myArticles } =
        getState().article;

      const res = await axiosPrivate.post(`like/${articleId}`);
      const indexBookmark = bookmarks.findIndex(
        (bookmark) => bookmark.id === articleId
      );
      const indexArticle = articles.findIndex(
        (article) => article.id === articleId
      );
      const indexUserArticle = userArticles.findIndex(
        (article) => article.id === articleId
      );
      const indexMyArticle = myArticles.findIndex(
        (article) => article.id === articleId
      );

      return {
        ...res.data,
        indexBookmark,
        indexArticle,
        articleId,
        indexUserArticle,
        indexMyArticle,
      };
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
      if (page === 0) {
        return [...res.data];
      }
      return [...bookmarks, ...res.data];
    } catch (error) {
      console.log(error);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "article/addBookmark",
  async ({ articleId }, { getState }) => {
    try {
      const { articles } = getState().article;
      const res = await axiosPrivate.post(`bookmark/${articleId}`);
      const indexArticle = articles.findIndex(
        (article) => article.id === articleId
      );
      return { ...res.data, indexArticle, articleId };
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

export const updatingComment = createAsyncThunk(
  "article/updatingComment",
  async (indexComment, { getState }) => {
    try {
      const { comments } = getState().article;
      console.log(indexComment);
      return { indexComment, comment: comments[indexComment] };
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

export const articleSearch = createAsyncThunk(
  "article/articleSearch",
  async ({ page, query }, { getState }) => {
    try {
      const { articles } = getState().article;
      const { isAuthenticated } = getState().auth;

      const res = isAuthenticated
        ? await axiosPrivate.get(
            `search/auth?q=${query}&limit=6&offset=${page}`
          )
        : await axiosPublic.get(`search?q=${query}&limit=6&offset=${page}`);

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
    myArticles: [],
    userArticles: [],
    bookmarks: [],
    comments: [],
    article: null,
    articleSearch: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(getArticleByArticleId.fulfilled, (state, action) => {
        state.article = action.payload;
      })
      .addCase(getMyArticles.fulfilled, (state, action) => {
        state.myArticles = action.payload;
      })
      .addCase(getArticleByUserId.fulfilled, (state, action) => {
        state.userArticles = action.payload;
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
        if (state.userArticles[action.payload.indexUserArticle]) {
          state.userArticles[action.payload.indexUserArticle].isLiked =
            action.payload?.isLiked;
          state.userArticles[action.payload.indexUserArticle]._count.likes =
            action.payload?.likes;
        }
        if (state.myArticles[action.payload.indexMyArticle]) {
          state.myArticles[action.payload.indexMyArticle].isLiked =
            action.payload?.isLiked;
          state.myArticles[action.payload.indexMyArticle]._count.likes =
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
        state.bookmarks.unshift(action.payload);
        if (state.articles[action.payload.indexArticle]) {
          state.articles[action.payload.indexArticle].isBookmarked = true;
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
      .addCase(updatingComment.fulfilled, (state, action) => {
        state.comments[action.payload.indexComment] = {
          ...action.payload.comment,
          updatingComment: true,
        };
      })
      .addCase(updateComment.fulfilled, (state, action) => {})
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.bookmarks.push(action.payload);
      })
      .addCase(articleSearch.fulfilled, (state, action) => {
        state.articleSearch = action.payload;
      });
  },
});
