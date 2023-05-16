import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const signInLocal = createAsyncThunk(
  "auth/signInLocal",
  async (signInForm, thunkAPI) => {
    try {
      const res = await axiosPublic.post("auth/signInLocal", signInForm);
      return { ...res.data, status: res.status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const signUpLocal = createAsyncThunk(
  "auth/signUpLocal",
  async (signUpForm) => {
    try {
      const res = await axiosPublic.post("auth/signUpLocal", signUpForm);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async () => {
  try {
    const res = await axiosPrivate.get("auth/signout");

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const article = createAsyncThunk("user/article", async () => {
  try {
    const res = await axiosPublic.get("article?limit=1&offset=4");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const signIn = createAsyncThunk("user/signIn", async (signUpForm) => {
  try {
    return true;
  } catch (error) {
    console.log(error);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: {
      accessToken: localStorage["AT"] || null,
      refreshToken: localStorage["RT"] || null,
    },
    validateEmail: false,
    isAuthenticated: localStorage["RT"] ? true : false,
    article: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInLocal.fulfilled, (state, action) => {
        localStorage.setItem("AT", action.payload?.accessToken || "");
        localStorage.setItem("RT", action.payload?.refreshToken || "");
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(signInLocal.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      })
      .addCase(signUpLocal.fulfilled, (state, action) => {
        localStorage.setItem("AT", action.payload?.accessToken || "");
        localStorage.setItem("RT", action.payload?.refreshToken || "");
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(signUpLocal.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        localStorage.removeItem("AT");
        localStorage.removeItem("RT");
        state.isAuthenticated = false;
      })
      .addCase(article.fulfilled, (state, action) => {
        state.article = action.payload[0].content;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
      });
  },
});
