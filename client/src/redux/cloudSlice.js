import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";
import axios from "axios";

export const addImage = createAsyncThunk("cloud/addImage", async (file) => {
  try {
    console.log(file);
    const res = await axiosPublic.post(`image/upload`, file);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
});

export const addFile = createAsyncThunk("cloud/addFile", async (file) => {
  try {
    console.log(file);
    const res = await axios({
      method: "POST",
      url: `http://localhost:8057/files`,
      data: file,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer gxMtOafBAeY9SeByNghkKB5XysplUStn",
      },
    });

    const comment = await axiosPublic.post(`files`, { data: res.data });
    console.log(comment);
    return comment.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const cloudSlice = createSlice({
  name: "cloud",
  initialState: {
    flie: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addImage.fulfilled, (state, action) => {
        state.image = action.payload;
      })
      .addCase(addFile.fulfilled, (state, action) => {
        state.file = action.payload;
      });
  },
});
