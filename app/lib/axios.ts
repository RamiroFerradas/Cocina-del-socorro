"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { handleUnauthorizedError } from "./handleUnauthorizedError";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  function (config) {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    handleUnauthorizedError(error);

    return Promise.reject(error);
  }
);

export default api;
