"use server";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";
import { SaleItem } from "@/app/models/Sale";
import { PaymentMethod } from "@/app/models/PaymentMethod";

type SaleAction = {
  sale_items: SaleItem[];
  paymentMethod: PaymentMethod;
  isEdit?: boolean;
  pathname?: string;
};

export async function saveSale({
  sale_items,
  paymentMethod,
  pathname = "/sales",
}: SaleAction) {
  const saleItems = sale_items.map((sale) => ({
    ...sale,
    price: Number(sale.price) || 0,
  }));
  const body = {
    sale_items: saleItems,
    payment_method: Number(paymentMethod),
  };
  try {
    const response = await api.post(`/sales`, {
      body,
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
