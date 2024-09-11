"use server";
import { Product } from "@/app/models/Product";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";

type ProductAction = {
  data: Product;
  isEdit?: boolean;
};

export const saveProduct = async ({ data, isEdit = false }: ProductAction) => {
  try {
    let response;
    if (isEdit) {
      response = await api.put(`/products/${data.id}`, data);
    } else {
      response = await api.post(`/products`, data);
    }
    if (response) revalidatePath("/products");
  } catch (error: any) {
    console.error(
      "Error saving product:",
      error.response?.data?.detail || error.message
    );
  }
};
