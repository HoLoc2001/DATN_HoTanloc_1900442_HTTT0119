import React, { useEffect, useRef, useState } from "react";
import Navbar from "../layouts/Navbar";
import { Outlet, useSearchParams } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getUser } from "../redux/userSlice";
import { signIn } from "../redux/authSlice";
import { getMyTags, getTags, popularTags } from "../redux/tagSlice";
// import { Box } from "@mui/material";
import socketIOClient from "socket.io-client";
import { getCommentsArticle, updateLike } from "../redux/articleSlice";
import { getComments } from "../redux/commentSlice";
const Home = () => {
  const dispatch = useAppDispatch();
  const queryParameters = new URLSearchParams(window.location.search)
  let tokens = queryParameters.get("token")
  const themeColor = useAppSelector((state) => state.theme.color);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  console.log(tokens);
  const host = import.meta.env.VITE_API;

  const socketRef = useRef();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host);
    // socketRef.current?.on("notification", (data) => {
    //   console.log(data);
    // });

    socketRef.current?.on(
      "comment",
      async ({ articleId }) => {

        await dispatch(getComments({ articleId }));
        await dispatch(getCommentsArticle({ articleId }));

      }
    );

    socketRef.current?.on(
      "notification-DeleteCommentPost",
      async ({ postId, userId, commentId }) => {
        if ("" + user.id !== userId) {
          await dispatch(getTotalComment(postId));
          await dispatch(getCommentPost(postId));
        }
      }
    );

    socketRef.current?.on(
      "notification-UpdateCommentPost",
      async ({ postId }) => {
        await dispatch(getCommentPost(postId));
      }
    );

    // socketRef.current?.on(
    //   "like",
    //   async ({ articleId }) => {

    //     await dispatch(updateLike(articleId));

    //   }
    // );

    socketRef.current?.on(
      "notification-UpdatePost",
      async ({ postId, userId }) => {
        if ("" + user.id !== userId) {
          await dispatch(getUpdatePost(postId));
        }
      }
    );

    socketRef.current?.on(
      "notification-addPost",
      async ({ postId, userId }) => {
        if ("" + user.id !== userId) {
          await dispatch(getPostSocket({ postId, userId }));
        }
      }
    );

    socketRef.current?.on("notification-updateUser", async (data) => {
      await dispatch(updateUserSocket(data));
    });
  }, []);

  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // const tokens = getCookie("auth-cookie");

    if (tokens) {
      localStorage.setItem(
        "AT",
        JSON.parse(tokens).accessToken
      );
      localStorage.setItem(
        "RT",
        JSON.parse(decodeURIComponent(tokens)).refreshToken
      );
      (async () => {
        await dispatch(signIn());
      })();
    }
  }, []);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        // await dispatch(getTags());
        await dispatch(getUser());
        // await dispatch(getMyTags());
      } else {
        // await dispatch(popularTags());
      }
    })();
  }, [isAuthenticated]);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",

        ...(themeColor === "light"
          ? { backgroundColor: "#fff", color: "#171717" }
          : { backgroundColor: "#0E1217", color: "rgb(255 242 242)" }),
      }}
    >
      <Navbar />
      <Sidebar />
      <div style={{ padding: "0 0 0 14%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
