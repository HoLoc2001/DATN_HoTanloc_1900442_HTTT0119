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
      console.log(signUpForm);
      const res = await axiosPublic.post("auth/signUpLocal", signUpForm);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const article = createAsyncThunk("user/article", async () => {
  try {
    const res = await axiosPublic.get("article?limit=1&offset=4");
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const loginGoogle = createAsyncThunk(
  "user/loginGoogle",
  async (signUpForm) => {
    try {
      const res = await axiosPublic.get("auth");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

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
    signed: false,
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
        state.token = action.payload?.token;
        localStorage.setItem("AT", action.payload?.accessToken || "");
        localStorage.setItem("RT", action.payload?.refreshToken || "");
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(signUpLocal.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      })
      .addCase(article.fulfilled, (state, action) => {
        console.log(action.payload[0]);
        state.article = action.payload[0].content;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        localStorage.setItem("AT", action.payload?.tokens?.accessToken || "");
        localStorage.setItem("RT", action.payload?.tokens?.refreshToken || "");
      });
  },
});
