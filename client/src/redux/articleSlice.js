import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";
import axios from "axios";

export const getArticles = createAsyncThunk(
  "article/getArticles",
  async ({ page, type }, { getState }) => {
    try {
      const { articles } = getState().article;
      const { isAuthenticated } = getState().auth;
      const res = isAuthenticated
        ? await axiosPrivate.get(`article/auth?limit=6&offset=${page}&type=${type}`)
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
        `article/MyUser?limit=6&offset=${page}&type=new`
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

export const getTuyendung = createAsyncThunk(
  "article/getTuyendung",
  async ({ page, type }, { getState }) => {
    try {
      const { tuyendung } = getState().article;
      const res = await axiosPrivate.get(
        `article/tuyendung?limit=6&offset=${page}&type=${type}`
      );
      if (page === 0) {
        return [...res.data];
      }
      return [...tuyendung, ...res.data];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTintuc = createAsyncThunk(
  "article/getTintuc",
  async ({ page, type }, { getState }) => {
    try {
      const { tintuc } = getState().article;
      const res = await axiosPrivate.get(
        `article/tintuc?limit=6&offset=${page}&type=${type}`
      );
      if (page === 0) {
        return [...res.data];
      }
      return [...tintuc, ...res.data];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getHoidap = createAsyncThunk(
  "article/getHoidap",
  async ({ page, type }, { getState }) => {
    try {
      const { hoidap } = getState().article;
      const res = await axiosPrivate.get(
        `article/hoidap?limit=6&offset=${page}&type=${type}`
      );
      if (page === 0) {
        return [...res.data];
      }
      return [...hoidap, ...res.data];
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
          `article/auth/user/${userId}?limit=6&offset=${page}&type=new`
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

export const addArticle = createAsyncThunk(
  "article/addArticle",
  async (data) => {
    try {
      const arr = []
      if (data?.files?.length) {

        for (let i = 0; i < data.files.length; i++) {
          const data2 = await axios({
            method: "POST",
            url: `https://lv-directus.hotanloc.xyz/files`,
            data: data.files[i],
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer gxMtOafBAeY9SeByNghkKB5XysplUStn",
            },
          });
          arr.push(data2.data.data.id)
        }
      }
      // console.log("res1", arr);
      // console.log("data", data);
      const res = await axiosPrivate.post(`article`, { ...data, files: arr });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "article/updateArticle",
  async ({ articleId, title, thumbnail, chude, content }, { getState }) => {
    try {
      const { bookmarks, articles, userArticles, myArticles } =
        getState().article;

      const arr = []
      // if (data?.files?.length) {

      //   for (let i = 0; i < data.files.length; i++) {
      //     const data2 = await axios({
      //       method: "POST",
      //       url: `https://lv-directus.hotanloc.xyz/files`,
      //       data: data.files[i],
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "multipart/form-data",
      //         Authorization: "Bearer gxMtOafBAeY9SeByNghkKB5XysplUStn",
      //       },
      //     });
      //     arr.push(data2.data.data.id)
      //   }
      // }

      const res = await axiosPrivate.put(`article/${articleId}`, {
        title,
        thumbnail,

        content, chude
      });

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
        article: res.data,
        indexBookmark,
        indexArticle,
        indexUserArticle,
        indexMyArticle,
        articleId,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async ({ articleId }, { getState }) => {
    try {
      const { bookmarks, articles, userArticles, myArticles } =
        getState().article;
      await axiosPrivate.delete(`article/${articleId}`);
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
      return { indexBookmark, indexArticle, indexUserArticle, indexMyArticle };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateLike = createAsyncThunk(
  "article/updateLike",
  async (articleId, { getState }) => {
    try {
      const { bookmarks, articles, userArticles, myArticles, tintuc, hoidap, tuyendung } =
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
      const indexHoidap = hoidap.findIndex(
        (article) => article.id === articleId
      );
      const indexTintuc = tintuc.findIndex(
        (article) => article.id === articleId
      );
      const indexTuyendung = tuyendung.findIndex(
        (article) => article.id === articleId
      );

      return {
        ...res.data,
        indexBookmark,
        indexArticle,
        articleId,
        indexHoidap,
        indexTintuc,
        indexTuyendung,
        indexUserArticle,
        indexMyArticle,
      };
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLike = createAsyncThunk(
  "article/getLike",
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
  async ({ page, type }, { getState }) => {
    try {
      const { bookmarks } = getState().article;
      const res = await axiosPrivate.get(`bookmark?limit=6&offset=${page}&type=${type}`);
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

export const getCommentsArticle = createAsyncThunk(
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
        (article) => article.id === articleId
      );

      return { data: res.data, indexBookmark, indexArticle };
    } catch (error) {
      console.log(error);
    }
  }
);

export const addFlieComment = createAsyncThunk(
  "article/addFlieComment",
  async ({ articleId, file }, { getState }) => {
    try {
      const { bookmarks, articles } = getState().article;
      const res = await axios({
        method: "POST",
        url: `https://lv-directus.hotanloc.xyz/files`,
        data: file,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer gxMtOafBAeY9SeByNghkKB5XysplUStn",
        },
      });

      const comment = await axiosPrivate.post(`files`, {
        data: res.data,
        articleId,
      });
      const indexBookmark = bookmarks.findIndex(
        (bookmark) => bookmark.id === articleId
      );
      const indexArticle = articles.findIndex(
        (article) => article.id === articleId
      );

      return { data: comment.data, indexBookmark, indexArticle };
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

      return { indexComment, comment: comments[indexComment] };
    } catch (error) {
      console.log(error);
    }
  }
);

export const cancelUpdatingComment = createAsyncThunk(
  "article/cancelUpdatingComment",
  async (indexComment, { getState }) => {
    try {
      return { indexComment };
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateComment = createAsyncThunk(
  "article/updateComment",
  async ({ commentId, content, index }) => {
    try {
      const res = await axiosPrivate.patch(`comment/${commentId}`, { content });

      return { data: res.data, index };
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "article/deleteComment",
  async ({ commentId, articleId, index }, { getState }) => {
    try {
      const { bookmarks, articles } = getState().article;
      await axiosPrivate.delete(`comment/${commentId}`);
      const indexBookmark = bookmarks.findIndex(
        (bookmark) => bookmark.id === articleId
      );
      const indexArticle = articles.findIndex(
        (article) => article.id === articleId
      );
      return { index, indexBookmark, indexArticle };
    } catch (error) {
      console.log(error);
    }
  }
);

export const articleSearch = createAsyncThunk(
  "article/articleSearch",
  async ({ page, query }, { getState }) => {
    try {
      const { isAuthenticated } = getState().auth;

      const res = isAuthenticated
        ? await axiosPrivate.get(
          `search/auth?q=${query}`
        )
        : await axiosPublic.get(`search?q=${query}&limit=6&offset=${page}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const updateType = createAsyncThunk(
  "article/updateType",
  async (type) => {


    return type;

  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [],
    myArticles: [],
    userArticles: [],
    bookmarks: [],
    tuyendung: [],
    hoidap: [],
    tintuc: [],
    comments: [],
    article: null,
    articleSearch: [],
    type: "new"
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateType.fulfilled, (state, action) => {
        state.type = action.payload;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(getArticleByArticleId.fulfilled, (state, action) => {
        state.article = action.payload;
      })
      .addCase(getMyArticles.fulfilled, (state, action) => {
        state.myArticles = action.payload;
      })
      .addCase(getTuyendung.fulfilled, (state, action) => {
        state.tuyendung = action.payload;
      })
      .addCase(getHoidap.fulfilled, (state, action) => {
        state.hoidap = action.payload;
      })
      .addCase(getTintuc.fulfilled, (state, action) => {
        state.tintuc = action.payload;
      })
      .addCase(getArticleByUserId.fulfilled, (state, action) => {
        state.userArticles = action.payload;
      })
      .addCase(addArticle.fulfilled, (state, action) => {
        state.userArticles.unshift(action.payload);
        state.articles.unshift(action.payload);
        state.myArticles.unshift(action.payload);
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        if (state.articles[action.payload.indexArticle]) {
          state.articles[action.payload.indexArticle] = action.payload.article;
        }
        if (state.bookmarks[action.payload.indexBookmark]) {
          state.bookmarks[action.payload.indexBookmark] =
            action.payload.article;
        }
        if (state.userArticles[action.payload.indexUserArticle]) {
          state.userArticles[action.payload.indexUserArticle] =
            action.payload.article;
        }
        if (state.myArticles[action.payload.indexMyArticle]) {
          state.myArticles[action.payload.indexMyArticle] =
            action.payload.article;
        }
        if (state.article?.id === action.payload.articleId) {
          state.article = action.payload.article;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        if (state.articles[action.payload.indexArticle]) {
          state.articles[action.payload.indexArticle] = action.payload.article;
          state.articles.splice(action.payload.indexArticle, 1);
        }
        if (state.bookmarks[action.payload.indexBookmark]) {
          state.bookmarks[action.payload.indexBookmark] =
            state.bookmarks.splice(action.payload.indexBookmark, 1);
        }
        if (state.userArticles[action.payload.indexUserArticle]) {
          state.userArticles.splice(action.payload.indexUserArticle, 1);
        }
        if (state.myArticles[action.payload.indexMyArticle]) {
          state.myArticles.splice(action.payload.indexMyArticle, 1);
        }
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

        if (state.hoidap[action.payload.indexHoidap]) {
          state.hoidap[action.payload.indexHoidap].isLiked =
            action.payload?.isLiked;
          state.hoidap[action.payload.indexHoidap]._count.likes =
            action.payload?.likes;
        }
        if (state.tintuc[action.payload.indexTintuc]) {
          state.tintuc[action.payload.indexTintuc].isLiked =
            action.payload?.isLiked;
          state.tintuc[action.payload.indexTintuc]._count.likes =
            action.payload?.likes;
        }
        if (state.tuyendung[action.payload.indexTuyendung]) {
          state.tuyendung[action.payload.indexTuyendung].isLiked =
            action.payload?.isLiked;
          state.tuyendung[action.payload.indexTuyendung]._count.likes =
            action.payload?.likes;
        }


        if (state.article?.id === action.payload.articleId) {
          state.article.isLiked = action.payload?.isLiked;
          state.article._count.likes = action.payload?.likes;
        }
      })
      .addCase(getLike.fulfilled, (state, action) => {

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
      .addCase(getCommentsArticle.fulfilled, (state, action) => {
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
      .addCase(addFlieComment.fulfilled, (state, action) => {
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
      .addCase(cancelUpdatingComment.fulfilled, (state, action) => {
        state.comments[action.payload.indexComment].updatingComment = false;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.comments[action.payload.index] = action.payload.data;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments.splice(action.payload.index, 1);
        state.article._count.comments -= 1;
        if (state.articles[action.payload.indexArticle]) {
          state.articles[action.payload.indexArticle]._count.comments -= 1;
        }
        if (state.articles[action.payload.indexBookmark]) {
          state.articles[action.payload.indexBookmark]._count.comments -= 1;
        }
      })
      .addCase(articleSearch.fulfilled, (state, action) => {
        state.articleSearch = action.payload;
      });
  },
});
