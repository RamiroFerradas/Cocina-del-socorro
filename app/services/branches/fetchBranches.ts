"use server";
import api from "@/app/lib/axios";

export async function fetchAllBranches(): Promise<any[]> {
  try {
    const response = await api("/branchs");

    return response.data;
  } catch (error: any) {
    console.error(error);

    throw error;
  }
}
