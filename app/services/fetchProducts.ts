"use server";
import { Product } from "@/app/models/Product";
import productosMock from "@/app/mocks/products.json";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    // await delay(2000);
    return productosMock as Product[];
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
}
