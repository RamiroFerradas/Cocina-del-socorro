"use server";
import api from "@/app/lib/axios";
import { Product } from "@/app/models/Product";

export async function fetchProductsByCategory(
  category: string
): Promise<Product[]> {
  try {
    const response = await api(`/products/category/${category}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products by category:", error.message);
    throw error;
  }
}
