"use server";
import api from "@/app/lib/axios";
import { Product } from "@/app/models/Product";

export async function fetchProductsByBrand(brand: string): Promise<Product[]> {
  try {
    const response = await api(`/products/brand/${brand}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching products by brand:", error.message);
    throw error;
  }
}
