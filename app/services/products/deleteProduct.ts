"use server";
import api from "@/app/lib/axios"; // Si ya tienes axios configurado
import { revalidatePath } from "next/cache";

export const deleteProduct = async (id: number) => {
  try {
    const response = await api.delete(`/products/${id}`);
    revalidatePath("/products");
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data.detail || "Failed to delete product");
  }
};
