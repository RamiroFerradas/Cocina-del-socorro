"use server";
import { Product } from "@/app/models/Product";
import api from "../lib/axios";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAllProducts(): Promise<Product[]> {
  try {
    await delay(1000);

    const response = await api("/products");
    return response.data;
  } catch (error: any) {
    console.error(error.message);

    throw error;
  }
}
