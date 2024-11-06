"use server";
import api from "@/app/lib/axios";
import { Session } from "@/app/models/Session";

export async function fetchAllSessions(): Promise<Session[]> {
  try {
    const response = await api("/sessions");

    // Ordenar: primero las sesiones activas
    const sessions = response.data.sort((a: Session, b: Session) => {
      // Si `active` es `true`, restar `-1` para que aparezca antes
      return a.active === b.active ? 0 : a.active ? -1 : 1;
    });

    return sessions;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
