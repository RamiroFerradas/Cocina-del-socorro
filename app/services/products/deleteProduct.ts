"use server";
import api from "@/app/lib/axios";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: number) {
  try {
    const response = await api.delete(`/products/${id}`);
    revalidatePath("/products");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.detail || "Failed to delete product");
  }
}
