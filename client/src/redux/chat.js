import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";

export const getchats = createAsyncThunk(
    "chat/getchats",
    async ({ articleId }, { getState }) => {
        try {
            const res = await axiosPublic.get(`chat/${articleId}`);

            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const updatechat = createAsyncThunk(
    "chat/updatechat",
    async (articleId) => {
        try {
            const res = await axiosPrivate.post(`chat/${articleId}`);

            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const deletechat = createAsyncThunk(
    "chat/deletechat",
    async (articleId) => {
        try {
            const res = await axiosPrivate.delete(`chat/${articleId}`);

            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(getchats.fulfilled, (state, action) => {
                state.chats = action.payload;
            })
            .addCase(updatechat.fulfilled, (state, action) => { })
            .addCase(deletechat.fulfilled, (state, action) => {
                state.bookmarks.push(action.payload);
            });
    },
});
