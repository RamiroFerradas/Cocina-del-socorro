"use server";
import api from "@/app/lib/axios";
import { revalidatePath } from "next/cache";

export async function deleteSale(id: number, pathname: string = "/sales") {
  try {
    const response = await api.delete(`/sales/${id}`);
    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.detail || "Failed to delete sale");
  }
}
