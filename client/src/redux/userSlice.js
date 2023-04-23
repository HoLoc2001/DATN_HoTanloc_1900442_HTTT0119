import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const signIn = createAsyncThunk(
  "user/signIn",
  async (signInForm, thunkAPI) => {
    try {
      const res = await axiosPublic.post("auth/signIn", signInForm);
      return { ...res.data, status: res.status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const signUp = createAsyncThunk("user/signUp", async (signUpForm) => {
  try {
    const res = await axiosPublic.post("auth/signUp", signUpForm);
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

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
      .addCase(signIn.fulfilled, (state, action) => {
        localStorage.setItem("AT", action.payload?.tokens?.accessToken || "");
        localStorage.setItem("RT", action.payload?.tokens?.refreshToken || "");
        state.isAuthenticated = action.payload?.status === 200 ? true : false;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        // state.token = action.payload?.token;
        localStorage.setItem("AT", action.payload?.tokens?.accessToken || "");
        localStorage.setItem("RT", action.payload?.tokens?.refreshToken || "");
        state.isAuthenticated = action.payload?.success;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isAuthenticated = action.payload.data.success;
      });
  },
});
