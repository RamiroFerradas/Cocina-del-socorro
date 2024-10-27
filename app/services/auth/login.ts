"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { deleteUserCookie } from "@/app/services/cookies/delete";
import api from "@/app/lib/axios";

export const loginUser = async (username: string, password: string) => {
  const maxRetries = 5;
  const retryDelay = 2000; // Tiempo de espera entre reintentos en milisegundos

  const params = new URLSearchParams({
    username,
    password,
  });

  const retryRequest = async (retries: number): Promise<any> => {
    try {
      const response = await api.post("auth/token", params);
      return response;
    } catch (error: any) {
      if (
        retries > 0 &&
        error.message.includes("FUNCTION_INVOCATION_TIMEOUT")
      ) {
        console.warn(`Retrying login request... (${maxRetries - retries + 1})`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return retryRequest(retries - 1);
      } else {
        throw error;
      }
    }
  };

  try {
    const response = await retryRequest(maxRetries);
    const { access_token } = response.data;

    cookies().set({
      name: "access_token",
      value: access_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return access_token;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.detail.includes("Could not validate user")
        ? "Usuario o contraseña incorrectos."
        : error.response?.data?.detail || "Error desconocido."
    );
  }
};

export const logoutUser = async () => {
  "use server";

  await deleteUserCookie();
  redirect("/login");
};
