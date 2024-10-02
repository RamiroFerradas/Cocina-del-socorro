"use server";
import api from "@/app/lib/axios";
import { Sale } from "@/app/models/Sale";

export async function fetchAllSales(): Promise<Sale[]> {
  try {
    const response = await api("/sales");

    return response.data;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
