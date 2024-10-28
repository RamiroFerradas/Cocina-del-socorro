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
}: ProductAction & { quantity?: number }) {
  try {
    const { quantity, ...dataWithoutQuantity } = data;
    let response;

    // Guardar o actualizar el producto
    if (isEdit) {
      response = await api.put(`/products/${data.product_id}`, {
        ...dataWithoutQuantity,
      });
    } else {
      response = await api.post(`/products`, dataWithoutQuantity);
    }

    // Actualizar el stock
    await api.post(`/inventory`, {
      product_id: data.product_id,
      quantity: quantity,
    });

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
