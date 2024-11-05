"use server";
import api from "@/app/lib/axios";
import { Payment } from "@/app/models/Payment";

export async function fetchAllPayments(): Promise<Payment[]> {
  try {
    const response = await api("/payments");

    return response.data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
