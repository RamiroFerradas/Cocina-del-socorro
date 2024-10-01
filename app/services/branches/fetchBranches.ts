"use server";
import api from "@/app/lib/axios";
import { Branch } from "@/app/models/Branch";

export async function fetchAllBranches(): Promise<Branch[]> {
  try {
    const response = await api("/branches");

    return response.data;
  } catch (error: any) {
    console.error(error);

    throw error;
  }
}
