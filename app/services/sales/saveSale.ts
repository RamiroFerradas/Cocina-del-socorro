"use server";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";
import { SaleItem } from "@/app/models/Sale";

type SaleAction = {
  data: SaleItem[];
  isEdit?: boolean;
  pathname?: string;
};

export async function saveSale({ data, pathname = "/sales" }: SaleAction) {
  data = data.map((sale) => ({
    ...sale,
    price: Number(sale.price) || 0,
  }));

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
