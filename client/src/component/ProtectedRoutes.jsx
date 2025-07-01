import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN, REFRESH_TOKEN, NAME } from "../utils/Common";
import api from "../utils/Api";
import Loader from "./Loader";

const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    auth();
  }, []);

  let tokenRefresh = () => {
    const Token = localStorage.getItem(REFRESH_TOKEN);
    if (!Token) return false;

    api
      .post("api/user/refresh/token", { refreshToken: Token })
      .then((response) => {
        const { accessToken } = response.data;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error("Error refreshing token:", error);
        setIsAuthenticated(false);
      });
  };

  const auth = async () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (!accessToken) return false;

    try {
      const decoded = jwtDecode(accessToken);
      sessionStorage.setItem(NAME, decoded.author);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decoded.exp > currentTime) {
        await tokenRefresh();
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsAuthenticated(false);
    }
  };

  // if (isAuthenticated === null) {
  //   return <Loader />; // or a loading spinner
  // }
  return isAuthenticated ? { children } : <Navigate to="/login" />;
};

export default ProtectedRoutes;
