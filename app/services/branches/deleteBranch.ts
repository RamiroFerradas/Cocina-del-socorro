"use server";
import api from "@/app/lib/axios";
import { revalidatePath } from "next/cache";

export async function deleteBranch(id: number, pathname: string = "/branches") {
  try {
    const response = await api.delete(`/branchs/${id}`);
    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.detail || "Failed to delete branch");
  }
}
