"use server";

import axios from "axios";
import { cookies } from "next/headers";
import { handleUnauthorizedError } from "./handleUnauthorizedError";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // await handleUnauthorizedError(error);
    return Promise.reject(error);
  }
);

export default api;
