"use server";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";

export async function deleteCookie(data: string) {
  cookies().delete(data);
}

export async function deleteUserCookie() {
  "use server";

  cookies().delete("access_token");
}
