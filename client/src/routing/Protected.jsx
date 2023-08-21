import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { signIn } from "../redux/authSlice";

const ProtectedRoute = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
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
  }, []);
  if (!localStorage["AT"] || !localStorage["RT"] || isAuthenticated === false) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
