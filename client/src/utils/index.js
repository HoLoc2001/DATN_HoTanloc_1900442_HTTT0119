import axios from "axios";
import jwt_decode from "jwt-decode";

const APIurl = import.meta.env.VITE_API + "/api/";

export const axiosPublic = axios.create({
  baseURL: APIurl,
});
export const axiosPrivate = axios.create({
  baseURL: APIurl,
});

export const axiosRT = axios.create({
  baseURL: APIurl,
});

axiosRT.interceptors.request.use(
  async (config) => {
    const refreshToken = localStorage["RT"];
    if (!!refreshToken && refreshToken !== "undefined") {
      if (config?.headers) {
        config.headers["Authorization"] = `Bearer ${localStorage["RT"]}`;
      }
    } else {
      localStorage.removeItem("AT");
      localStorage.removeItem("RT");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosPrivate.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage["AT"];
    let currentDate = new Date();
    if (!!accessToken && accessToken !== "undefined") {
      const decodedToken = jwt_decode(accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const res = await axiosRT.get("auth/refreshToken");
        localStorage.setItem("AT", res.data.accessToken);
        localStorage.setItem("RT", res.data.refreshToken);
        if (config?.headers) {
          config.headers["Authorization"] = `Bearer ${localStorage["AT"]}`;
        }
      } else {
        if (config?.headers) {
          config.headers["Authorization"] = `Bearer ${localStorage["AT"]}`;
        }
      }
    } else {
      localStorage.removeItem("AT");
      localStorage.removeItem("RT");
    }

    return config;
  },
  (error) => {
    localStorage.removeItem("AT");
    localStorage.removeItem("RT");
    return Promise.reject(error);
  }
);

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
