"use server";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";
import { Sale } from "@/app/models/Sale";

type SaleAction = {
  data: Sale[];
  isEdit?: boolean;
  pathname?: string;
};

export async function saveSale({ data, pathname = "/sales" }: SaleAction) {
  console.log(data);
  try {
    const response = await api.post(`/sales`, data);
    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.detail?.[0]?.msg ||
      error.message ||
      "Ocurrió un error desconocido.";

    console.error("Error saving Sale:", errorMessage);
    throw new Error(errorMessage);
  }
}
