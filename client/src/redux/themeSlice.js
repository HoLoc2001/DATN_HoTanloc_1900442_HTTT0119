import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setThemeColorStore = createAsyncThunk(
  "theme/setThemeColorStore",
  async (themeColor) => {
    try {
      localStorage.setItem("themeColor", themeColor);

      return themeColor;
    } catch (error) {
      console.log(error);
    }
  }
);

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    color: localStorage.getItem("themeColor") || "dark",
  },
  extraReducers: (builder) => {
    builder.addCase(setThemeColorStore.fulfilled, (state, action) => {
      state.color = action.payload;
    });
  },
});
