"use server";
import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

// Crea una instancia de Axios personalizada
const api = axios.create({
  baseURL,
});

// Agrega un interceptor de solicitud
api.interceptors.request.use(
  function (config) {
    // Obtén las cookies y el token de acceso
    const cookieStore = cookies();
    const token = cookieStore.get("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token.value}`;
    }

    return config;
  },
  function (error) {
    // Maneja el error de solicitud
    return Promise.reject(error);
  }
);

// Agrega un interceptor de respuesta
api.interceptors.response.use(
  function (response) {
    // Maneja los datos de respuesta
    return response;
  },
  function (error) {
    // Maneja el error de respuesta
    return Promise.reject(error);
  }
);

export default api;
