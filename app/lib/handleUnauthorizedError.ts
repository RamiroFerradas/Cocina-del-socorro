import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export function handleUnauthorizedError(error: AxiosError) {
  if (error.response?.status === 401) {
    redirect("/login");
  } else {
    console.log("Error no autorizado:", error.message);
  }

  return error;
}
