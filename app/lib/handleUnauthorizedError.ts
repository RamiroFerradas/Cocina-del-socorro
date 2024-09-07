import { AxiosError } from "axios";
import { logoutUser } from "../services/auth";

export function handleUnauthorizedError(error: AxiosError) {
  if (error.response?.status === 401) {
    return logoutUser();
  } else {
    console.log("Error no autorizado:", error.message);
  }

  return Promise.reject(error);
}
