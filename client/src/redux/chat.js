import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";
import axios from "axios";
const directus = 'https://lv-directus.hotanloc.xyz/items/'

export const getchats = createAsyncThunk(
    "chat/getchats",
    async (id) => {
        try {
            const res = await axios.get(`${directus}chat?filter[user][_eq]=${id}&fields=*.*`)

            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const createchat = createAsyncThunk(
    "chat/createchat",
    async ({ chatId, content }) => {
        try {
            const { data } = await axios.get(`${directus}chat/${chatId}`)
            const res = await axios.patch(`${directus}chat/${chatId}`, {
                content: [
                    ...data.data.content,
                    {
                        from: "me",
                        content: content,
                        create_at: new Date()
                    }
                ]
            });

            return res.data
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
                state.chats = action.payload.data;
            })
            .addCase(createchat.fulfilled, (state, action) => {
                state.chats = action.payload.data;
            })
            .addCase(updatechat.fulfilled, (state, action) => { })
            .addCase(deletechat.fulfilled, (state, action) => {
                // state.bookmarks.push(action.payload);
            });
    },
});
