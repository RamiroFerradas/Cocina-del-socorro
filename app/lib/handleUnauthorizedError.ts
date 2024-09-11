import { AxiosError } from "axios";
import { redirect } from "next/navigation";

export function handleUnauthorizedError(error: AxiosError) {
  if (error.response?.status === 401) {
    return redirect("/login");
  } else {
    console.log("Error no autorizado:", error.message);
  }

  return Promise.reject(error);
}
