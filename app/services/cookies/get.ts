"use server";

import { cookies } from "next/headers";

export async function getCookie(data: string) {
  return cookies().get(data);
}
