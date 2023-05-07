import React from "react";
import Navbar from "../layouts/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../layouts/Sidebar";

const Home = () => {
  return (
    <div style={{ height: "100vh", backgroundColor: "#0E1217" }}>
      <Navbar />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Home;
