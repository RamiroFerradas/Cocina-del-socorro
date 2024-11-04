"use server";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";
import { SaleItem } from "@/app/models/Sale";
import { PaymentMethod } from "@/app/models/PaymentMethod";

type SaleAction = {
  items: SaleItem[];
  paymentMethod: PaymentMethod;
  isEdit?: boolean;
  pathname?: string;
};

export async function saveSale({
  items,
  paymentMethod,
  pathname = "/sales",
}: SaleAction) {
  const saleItems = items.map((sale) => ({
    ...sale,
    price: Number(sale.price) || 0,
  }));

  try {
    const response = await api.post(`/sales`, {
      branch: "string",
      sale_items: saleItems,
      payment_method: String(paymentMethod),
    });
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
