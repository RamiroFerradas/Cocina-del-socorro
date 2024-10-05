// "use server";
import { cookies } from "next/headers";
import { handleUnauthorizedError } from "./handleUnauthorizedError";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL;

interface ApiOptions extends RequestInit {
  // Puedes agregar otras propiedades específicas que necesites aquí
}

const api = {
  async get<T>(url: string, options?: ApiOptions): Promise<T> {
    return await this.request<T>(url, { method: "GET", ...options });
  },

  async post<T>(url: string, body: unknown, options?: ApiOptions): Promise<T> {
    return await this.request<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  },

  async put<T>(url: string, body: unknown, options?: ApiOptions): Promise<T> {
    return await this.request<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  },

  async delete<T>(url: string, options?: ApiOptions): Promise<T> {
    return await this.request<T>(url, { method: "DELETE", ...options });
  },

  async request<T>(url: string, options: ApiOptions): Promise<T> {
    const cookieStore = cookies();
    const token = cookieStore.get("access_token");

    // Agregar el token de autorización si está disponible
    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json", // Agregar el Content-Type por defecto
      };
    }

    // Realizar la solicitud fetch
    try {
      const response = await fetch(`${baseURL}${url}`, options);

      // Manejar el error de autorización
      // if (!response.ok) {
      //   await handleUnauthorizedError(response);
      // }

      return (await response.json()) as T; // Retorna la respuesta en formato JSON
    } catch (error) {
      return Promise.reject(error); // Manejo de errores
    }
  },
};

export default api;
