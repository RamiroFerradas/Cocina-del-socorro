"use server";
import { Product } from "@/app/models/Product";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";

const addProduct = async (data: Product) => {
  try {
    // Envía la solicitud POST directamente con Axios
    const response = await api.post(`/products`, data);
    revalidatePath("/products");
  } catch (error: any) {
    console.error("Error adding product:", error.response.data.detail);
  }
};

export default addProduct;
