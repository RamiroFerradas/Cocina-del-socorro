"use server";
import api from "@/app/lib/axios";
import { Session } from "@/app/models/Session";

export async function fetchAllSessions(): Promise<Session[]> {
  try {
    const response = await api("/sessions");

    // Ordenar por `session_created` en orden ascendente
    const sessions = response.data.sort((a: Session, b: Session) => {
      return (
        new Date(b.session_created).getTime() -
        new Date(a.session_created).getTime()
      );
    });

    return sessions;
  } catch (error: any) {
    console.error(error);
    throw error;
  }
}
