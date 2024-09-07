"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
export const loginUser = async (username: string, password: string) => {
  try {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const response = await axios.post(BASE_URL + "auth/token", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { access_token } = response.data;
    cookies().set({
      name: "access_token",
      value: access_token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return access_token;
  } catch (error) {
    throw new Error("Usuario o contraseña incorrectos.");
  }
};

export const logoutUser = async () => {
  "use server";
  redirect("/login");
};
