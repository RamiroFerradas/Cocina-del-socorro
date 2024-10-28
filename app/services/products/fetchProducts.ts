"use server";
import api from "@/app/lib/axios";
import { handleUnauthorizedError } from "@/app/lib/handleUnauthorizedError";
import { Product } from "@/app/models/Product";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await api("/products");

    // Mapear productos para reemplazar id por product_id
    const products = response.data.map((product: any) => ({
      ...product,
      product_id: product.id,
    }));

    return products;
  } catch (error: any) {
    console.error(error);
    handleUnauthorizedError(error);
    throw error;
  }
}
