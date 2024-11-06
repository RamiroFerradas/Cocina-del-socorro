"use server";
import api from "@/app/lib/axios";

export async function isSessionActive(): Promise<boolean> {
  try {
    const response = await api.get("/sessions/active/");

    return response.data.active === true;
  } catch (error: any) {
    if (error.response && error.response.data.detail === "No session active.") {
      return false;
    }
    console.error(error);
    throw error;
  }
}
