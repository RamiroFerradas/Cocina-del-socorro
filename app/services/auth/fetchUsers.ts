"use server";
import api from "@/app/lib/axios";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";
import { User } from "@/app/models/User ";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await api("/auth/users");
    return response.data;
  } catch (error: any) {
    console.error(error);
    handleUnauthorizedError(error);
    throw error;
  }
}
