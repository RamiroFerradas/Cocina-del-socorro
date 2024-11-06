import { fetchAllSessions } from "@/app/services/sessions/fetchSessions";
import { Suspense } from "react";
import { SessionsLoadUi, Sessions } from "./components";
export const dynamic = "force-dynamic";

export default async function sessionsServer() {
  const sessionsPromise = fetchAllSessions();

  return (
    <Suspense fallback={<SessionsLoadUi />}>
      {sessionsPromise.then((sessions) => (
        <Sessions sessions={sessions} />
      ))}
    </Suspense>
  );
}
