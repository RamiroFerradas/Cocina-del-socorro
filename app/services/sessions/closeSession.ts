"use server";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";

type CloseSessionAction = {
  sessionId: number;
  pathname?: string;
};

export async function closeSession({
  sessionId,
  pathname = "/sessions",
}: CloseSessionAction) {
  try {
    const response = await api.post(`/sessions/close/${sessionId}`);

    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error closing session:",
      error.response?.data?.detail || error.message
    );
    throw error;
  }
}
