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
    await delay(11110);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    await handleUnauthorizedError(error);

    throw error;
  }
}
