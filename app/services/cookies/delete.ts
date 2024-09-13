"use server";

import { cookies } from "next/headers";

export async function deleteCookie(data: string) {
  cookies().delete(data);
}

export async function deleteUserCookie() {
  ("use server");
  cookies().delete({
    name: "access_token",
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
}
