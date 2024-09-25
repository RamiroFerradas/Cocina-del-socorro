"use server";
import { Branch } from "@/app/models/Branch";
import { revalidatePath } from "next/cache";
import api from "@/app/lib/axios";

type BranchAction = {
  data: Branch;
  isEdit?: boolean;
  pathname?: string;
};

export async function saveBranch({
  data,
  pathname = "/branches",
  isEdit = false,
}: BranchAction) {
  try {
    let response;
    if (isEdit) {
      response = await api.put(`/branchs/${data.id}`, data);
    } else {
      response = await api.post(`/branchs`, data);
    }

    revalidatePath(pathname);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error saving branch:",
      error.response?.data?.detail || error.message
    );
    throw error;
  }
}
