"use server";
import api from "@/app/lib/axios";
import { Product } from "@/app/models/Product";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    const response = await api("/products");
    await delay(3000);
    return response.data;
  } catch (error: any) {
    console.error(error.message);

    throw error;
  }
}
