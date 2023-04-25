import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const signInLocal = createAsyncThunk(
  "user/signInLocal",
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
  "user/signUpLocal",
  async (signUpForm) => {
    try {
      const res = await axiosPublic.post("auth/signUpLocal", signUpForm);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
    listUserSearch: [],
    otherUser: [],
    listFollower: [],
    listFollowing: [],
    notFollower: [],
    token: {
      accessToken: localStorage["AT"] || null,
      refreshToken: localStorage["RT"] || null,
    },
    validateEmail: false,
    isAuthenticated: null,
    isPassValue: null,
    isForgetPass: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInLocal.fulfilled, (state, action) => {
        localStorage.setItem("AT", action.payload?.tokens?.accessToken || "");
        localStorage.setItem("RT", action.payload?.tokens?.refreshToken || "");
        state.isAuthenticated = action.payload?.status === 200 ? true : false;
      })
      .addCase(signInLocal.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      })
      .addCase(signUpLocal.fulfilled, (state, action) => {
        // state.token = action.payload?.token;
        localStorage.setItem("AT", action.payload?.tokens?.accessToken || "");
        localStorage.setItem("RT", action.payload?.tokens?.refreshToken || "");
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(signUpLocal.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      });
  },
});
