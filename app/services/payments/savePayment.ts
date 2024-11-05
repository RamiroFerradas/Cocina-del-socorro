"use server";
import { Payment } from "@/app/models/Payment";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";

type PaymentAction = {
  data: Payment;
  pathname?: string;
};

export async function savePayment({
  data,
  pathname = "/Payments",
}: PaymentAction) {
  try {
    data.amount = Number(data.amount);
    let response = await api.post(`/payments`, data);

    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error saving Payment:",
      error.response?.data?.detail || error.message
    );
    throw error;
  }
}
