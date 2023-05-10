import React, { useState } from "react";
import Navbar from "../layouts/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";
import { useAppSelector } from "../redux/store";

const Home = () => {
  const themeColor = useAppSelector((state) => state.theme.color);

  return (
    <div
      style={{
        height: "100%",
        minHeight: "100vh",

        ...(themeColor === "light"
          ? { backgroundColor: "#fff", color: "#171717" }
          : { backgroundColor: "#0E1217", color: "#fff" }),
      }}
    >
      <Navbar />
      <Sidebar />
      <div style={{ padding: "0 0 0 18%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
