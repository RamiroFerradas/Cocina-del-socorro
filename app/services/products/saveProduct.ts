"use server";
import { Product } from "@/app/models/Product";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";

type ProductAction = {
  data: Product;
  isEdit?: boolean;
  pathname?: string;
};

export async function saveProduct({
  data,
  pathname = "/products/inventory",
  isEdit = false,
}: ProductAction) {
  try {
    let response;
    if (isEdit) {
      response = await api.put(`/products/${data.id}`, data);
    } else {
      response = await api.post(`/products`, data);
    }
    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error saving product:",
      error.response?.data?.detail || error.message
    );
    handleUnauthorizedError(error);

    throw error;
  }
}
