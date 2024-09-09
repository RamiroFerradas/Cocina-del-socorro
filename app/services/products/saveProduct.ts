"use server";
import { Product } from "@/app/models/Product";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";

type ProductAction = {
  data: Product;
  isEdit?: boolean; // Prop para determinar si es una edición
};

export const saveProduct = async ({ data, isEdit = false }: ProductAction) => {
  try {
    let response;
    if (isEdit) {
      response = await api.put(`/products/${data.id}`, data); // Editar producto
    } else {
      response = await api.post(`/products`, data); // Agregar nuevo producto
    }
    if (response) revalidatePath("/products");
  } catch (error: any) {
    console.error(
      "Error saving product:",
      error.response?.data?.detail || error.message
    );
  }
};
