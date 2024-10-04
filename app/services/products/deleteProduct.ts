"use server";
import api from "@/app/lib/axios";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";
import { revalidatePath } from "next/cache";

export async function deleteProduct(
  id: number,
  pathname: string = "/products"
) {
  try {
    const response = await api.delete(`/products/${id}`);
    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    handleUnauthorizedError(error);
    throw new Error(error.response?.data.detail || "Failed to delete product");
  }
}
