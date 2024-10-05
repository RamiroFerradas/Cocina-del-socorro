import { redirect } from "next/navigation";

export async function handleUnauthorizedError(response: Response) {
  if (response.status === 401) {
    redirect("/login");
  } else {
    const errorData = await response.json().catch(() => ({})); // Manejo seguro en caso de que la respuesta no sea JSON
    console.log(
      "Error no autorizado:",
      errorData.message || "No hay mensaje de error"
    );
  }

  return response;
}
