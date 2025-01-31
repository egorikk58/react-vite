import axios from "axios";
import apiRoutes from "@/api/routes";

export const axiosClient = axios.create({});


const publicEndpoints = [
  apiRoutes.AUTH.SIGN_IN,
  apiRoutes.AUTH.SIGN_UP,
  apiRoutes.AUTH.REFRESH_TOKEN,
];

axiosClient.interceptors.request.use((config) => {
    if (config.url && publicEndpoints.includes(config.url)) {
      return config;
    }

    config.headers.contentType = "application/json";

    const authToken = localStorage.getItem("accessToken");

    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

    return config;
})