import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPublic, axiosPrivate } from "../utils";
import axios from "axios";
const directus = 'https://lv-directus.hotanloc.xyz/items/'

export const getchats = createAsyncThunk(
    "chat/getchats",
    async (id) => {
        try {
            const res = await axios.get(`${directus}chat?filter[user][_in]=${id}&fields=*.users_id.*`)

            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getchat = createAsyncThunk(
    "chat/getchat",
    async (id, { getState }) => {
        try {
            const { chats } = getState().chat;
            const { data } = await axios.get(`${directus}chat/${id}?fields=*.users_id.*`)
            const indexChat = chats.findIndex(
                (chat) => chat.id === data.data.id
            );

            return { data: data.data, indexChat };
        } catch (error) {
            console.log(error);
        }
    }
);

export const createchat = createAsyncThunk(
    "chat/createchat",
    async ({ chatId, content, userId, isChat, file = null }, { getState }) => {
        try {
            const { chats } = getState().chat;

            const { data } = await axios.get(`${directus}chat/${chatId}`)
            let indexChat = null
            let res

            if (data?.data?.content) {

                if (isChat) {
                    res = await axios.patch(`${directus}chat/${chatId}?fields=*.users_id.*`, {
                        content: [
                            ...data?.data?.content,
                            {
                                user: userId,
                                content: content,
                                create_at: new Date()
                            }
                        ]
                    });

                } else {
                    res = await axios.patch(`${directus}chat/${chatId}?fields=*.users_id.*`, {
                        content: [
                            ...data?.data?.content,
                            {
                                user: userId,
                                file: file,
                                create_at: new Date()
                            }
                        ]
                    });
                }
            } else {
                if (isChat) {

                    res = await axios.patch(`${directus}chat/${chatId}?fields=*.users_id.*`, {
                        content: [

                            {
                                user: userId,
                                content: content,
                                create_at: new Date()
                            }
                        ]
                    });
                } else {
                    res = await axios.patch(`${directus}chat/${chatId}?fields=*.users_id.*`, {
                        content: [

                            {
                                user: userId,
                                file: file,
                                create_at: new Date()
                            }
                        ]
                    });
                }
            }


            await axiosPrivate.get(`/chat/${chatId}`)
            indexChat = chats.findIndex(
                (chat) => chat.id === res.data.data.id
            );



            return { data: res.data.data, indexChat }
        } catch (error) {
            console.log(error);
        }
    }
);

export const updatechat = createAsyncThunk(
    "chat/updatechat",
    async ({ chatId, createAt }, { getState }) => {
        try {
            const { chats } = getState().chat;

            const { data } = await axios.get(`${directus}chat/${chatId}`)

            for (let i = 0; i < data.data.content.length; i++) {

                if (data.data.content[i].create_at == createAt) {
                    data.data.content[i] = { ...data.data.content[i], content: "Tin nhắn đã xóa" };

                }
            }
            console.log(data.data.content);
            const res = await axios.patch(`${directus}chat/${chatId}?fields=*.users_id.*`, {
                content: [
                    ...data.data.content,
                ]
            });
            const indexChat = chats.findIndex(
                (chat) => chat.id === res.data.data.id
            );


            return { data: res.data.data, indexChat }
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
            .addCase(getchat.fulfilled, (state, action) => {
                state.chats[action.payload?.indexChat] = action.payload?.data;

            })
            .addCase(createchat.fulfilled, (state, action) => {
                if (action.payload.indexChat != null) {

                    state.chats[action.payload?.indexChat] = action.payload?.data;
                }
            })
            .addCase(updatechat.fulfilled, (state, action) => { state.chats[action.payload.indexChat] = action.payload.data; })
            .addCase(deletechat.fulfilled, (state, action) => {
                // state.bookmarks.push(action.payload);
            });
    },
});
