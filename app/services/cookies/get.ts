"use server";

import { cookies } from "next/headers";

export async function getCookie(data?: string) {
  if (!data) {
    return cookies().getAll();
  }
  return cookies().get(data);
}
