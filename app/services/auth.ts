"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import api from "../lib/axios";
import { deleteUserCookie } from "./cookies/delete";
import nookies from "nookies";

export const loginUser = async (username: string, password: string) => {
  try {
    const params = new URLSearchParams({
      username,
      password,
    });

    const response = await api.post("auth/token", params);

    const { access_token } = response.data;
    nookies.set(null, "fromClient", "value", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

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
      error.response.data.detail.includes("Could not validate user")
        ? "Usuario o contraseña incorrectos."
        : error.response.data.detail
    );
  }
};

export const logoutUser = async () => {
  "use server";

  await deleteUserCookie();
  redirect("/login");
};
