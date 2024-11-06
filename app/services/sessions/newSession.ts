"use server";
import { NewSession } from "@/app/models/Session";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";

type SessionAction = {
  data: NewSession;
  pathname?: string;
};

export async function newSession({
  data,
  pathname = "/sales/sessions",
}: SessionAction) {
  try {
    let response = await api.post(`/sessions`, data);

    revalidatePath("sales");
  } catch (error: any) {
    console.error(
      "Error saving Session:",
      error.response?.data?.detail || error.message
    );
    throw error;
  }
}
