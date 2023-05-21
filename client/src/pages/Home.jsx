import React, { useEffect, useState } from "react";
import Navbar from "../layouts/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { getUser } from "../redux/userSlice";
import { signIn } from "../redux/authSlice";
import { Box } from "@mui/material";

const Home = () => {
  const dispatch = useAppDispatch();
  const themeColor = useAppSelector((state) => state.theme.color);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const tokens = getCookie("auth-cookie");

    if (tokens) {
      localStorage.setItem(
        "AT",
        JSON.parse(decodeURIComponent(tokens)).accessToken
      );
      localStorage.setItem(
        "RT",
        JSON.parse(decodeURIComponent(tokens)).refreshToken
      );
      (async () => {
        await dispatch(signIn());
      })();
    }
    if (localStorage["RT"]) {
      (async () => {
        await dispatch(getUser());
      })();
    }
  }, []);

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: "100vh",

        ...(themeColor === "light"
          ? { backgroundColor: "rgb(255 242 242)", color: "#171717" }
          : { backgroundColor: "#0E1217", color: "rgb(255 242 242)" }),
      }}
    >
      <Navbar />
      <Sidebar />
      <div style={{ padding: "0 0 0 14%" }}>
        <Outlet />
      </div>
    </Box>
  );
};

export default Home;
